#!/usr/bin/env python3
"""Manage static music releases."""
from __future__ import annotations
import argparse, datetime as date, json, re, shutil, sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "content/music/releases.json"
PUBLIC = ROOT / "public"
ID = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SERVICES = ("bandcamp", "soundcloud", "youtube")
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}

def load() -> list[dict]:
    value = json.loads(DATA.read_text(encoding="utf-8"))
    if not isinstance(value, list): raise ValueError("Release data must be an array.")
    return value

def save(items: list[dict]) -> None:
    DATA.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def url(value: object) -> bool:
    parsed = urlparse(value) if isinstance(value, str) else None
    return bool(parsed and parsed.scheme in {"http", "https"} and parsed.netloc)

def validation_errors(items: list[dict]) -> list[str]:
    errors, seen = [], set()
    for index, item in enumerate(items):
        label = str(item.get("id", f"#{index + 1}")) if isinstance(item, dict) else f"#{index + 1}"
        if not isinstance(item, dict): errors.append(f"{label}: not an object"); continue
        release_id = item.get("id")
        if not isinstance(release_id, str) or not ID.fullmatch(release_id): errors.append(f"{label}: unsafe ID")
        elif release_id in seen: errors.append(f"{label}: duplicate ID")
        else: seen.add(release_id)
        for field in ("title", "artist", "cover"):
            if not isinstance(item.get(field), str) or not item[field].strip(): errors.append(f"{label}: missing {field}")
        try: date.date.fromisoformat(str(item.get("date", "")))
        except ValueError: errors.append(f"{label}: invalid date")
        cover = item.get("cover")
        if isinstance(cover, str):
            target = (PUBLIC / cover.lstrip("/")).resolve()
            if PUBLIC.resolve() not in target.parents or not target.is_file(): errors.append(f"{label}: missing cover {cover}")
        links = item.get("links")
        if not isinstance(links, dict) or not links: errors.append(f"{label}: listening link required")
        else:
            for service, href in links.items():
                if service not in SERVICES: errors.append(f"{label}: unsupported service {service}")
                if not url(href): errors.append(f"{label}: invalid {service} URL")
    return errors

def validate(_args: argparse.Namespace) -> int:
    errors = validation_errors(load())
    for error in errors: print(f"ERROR: {error}", file=sys.stderr)
    if errors: return 1
    print(f"Valid: {len(load())} release(s)."); return 0

def list_releases(_args: argparse.Namespace) -> int:
    for item in sorted(load(), key=lambda x: x.get("date", ""), reverse=True):
        print(f"{item['id']} | {item['title']} | {item['artist']} | {item['date']} | {item['cover']} | {', '.join(item['links'])}")
    return 0

def required(label: str) -> str:
    value = input(f"{label}: ").strip()
    if not value: raise ValueError(f"{label} is required.")
    return value

def add(_args: argparse.Namespace) -> int:
    items, release_id = load(), required("Release ID")
    if not ID.fullmatch(release_id) or ".." in release_id: raise ValueError("Unsafe release ID.")
    if any(x.get("id") == release_id for x in items): raise ValueError("Duplicate release ID.")
    title, artist, released = required("Title"), required("Artist"), required("Date (YYYY-MM-DD)")
    date.date.fromisoformat(released)
    source = Path(required("Local cover path")).expanduser().resolve()
    if not source.is_file() or source.suffix.lower() not in EXTENSIONS: raise ValueError("Invalid cover image.")
    links = {name: value for name in SERVICES if (value := input(f"{name.title()} URL (optional): ").strip())}
    if not links or any(not url(value) for value in links.values()): raise ValueError("A valid listening URL is required.")
    folder, destination = PUBLIC / "music" / release_id, PUBLIC / "music" / release_id / f"cover{source.suffix.lower()}"
    if destination.exists() and input("Cover exists. Overwrite? [y/N]: ").lower() != "y": raise ValueError("Not overwritten.")
    folder.mkdir(parents=True, exist_ok=True); shutil.copy2(source, destination)
    items.append({"id": release_id, "title": title, "artist": artist, "date": released, "cover": f"/music/{release_id}/{destination.name}", "links": links})
    save(items); print(f"Added {release_id}. Rebuild and redeploy."); return 0

def remove(args: argparse.Namespace) -> int:
    if not ID.fullmatch(args.release_id): raise ValueError("Unsafe release ID.")
    items, found = load(), None
    for item in items:
        if item.get("id") == args.release_id: found = item
    if not found: raise ValueError("Unknown release.")
    print(f"{found['id']} | {found['title']} | {found['artist']} | {found['date']}")
    if input("Type the exact release ID to confirm: ").strip() != args.release_id: print("Cancelled."); return 1
    save([item for item in items if item.get("id") != args.release_id])
    managed = (PUBLIC / "music" / args.release_id).resolve()
    if managed.parent == (PUBLIC / "music").resolve() and managed.is_dir(): shutil.rmtree(managed)
    print(f"Removed {args.release_id}."); return 0

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__); sub = parser.add_subparsers(required=True)
    sub.add_parser("add").set_defaults(func=add)
    command = sub.add_parser("remove"); command.add_argument("release_id"); command.set_defaults(func=remove)
    sub.add_parser("list").set_defaults(func=list_releases); sub.add_parser("validate").set_defaults(func=validate)
    args = parser.parse_args()
    try: return args.func(args)
    except (ValueError, OSError, json.JSONDecodeError) as error: print(f"ERROR: {error}", file=sys.stderr); return 1

if __name__ == "__main__": raise SystemExit(main())
