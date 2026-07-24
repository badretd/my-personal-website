#!/usr/bin/env python3
"""Manage bilingual static Blog articles."""
from __future__ import annotations
import argparse, datetime as date, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT, PUBLIC = ROOT / "content/blog", ROOT / "public/blog"
SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
IMAGE = re.compile(r"!\[[^\]]*\]\((/blog/[^)\s]+)\)")
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}

def safe(slug: str) -> bool: return bool(SLUG.fullmatch(slug)) and ".." not in slug and "/" not in slug and "\\" not in slug
def slugs() -> list[str]: return sorted(x.name for x in CONTENT.iterdir() if x.is_dir())

def parse(path: Path) -> tuple[dict[str, object], str]:
    match = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n?(.*)$", path.read_text(encoding="utf-8"), re.DOTALL)
    if not match: raise ValueError(f"{path}: missing frontmatter")
    values: dict[str, object] = {}; active = None
    for line in match.group(1).splitlines():
        item = re.match(r'^\s*-\s+"(.*)"\s*$', line)
        if item and active: values[active].append(item.group(1)); continue  # type: ignore[union-attr]
        field = re.match(r'^([a-z]+):\s*(?:"(.*)")?\s*$', line)
        if field:
            active = field.group(1) if field.group(2) is None else None
            values[field.group(1)] = [] if active else field.group(2)
    return values, match.group(2)

def errors() -> list[str]:
    found = []
    for slug in slugs():
        if not safe(slug): found.append(f"{slug}: unsafe slug"); continue
        metadata = {}
        for locale in ("ru", "en"):
            path = CONTENT / slug / f"{locale}.md"
            if not path.is_file(): found.append(f"{slug}: missing {locale}.md"); continue
            try: meta, body = parse(path); metadata[locale] = meta
            except (ValueError, OSError) as error: found.append(str(error)); continue
            for field in ("title", "description", "date"):
                if not isinstance(meta.get(field), str) or not str(meta[field]).strip(): found.append(f"{slug}/{locale}: missing {field}")
            if not isinstance(meta.get("tags"), list) or not meta["tags"]: found.append(f"{slug}/{locale}: tags required")
            try: date.date.fromisoformat(str(meta.get("date", "")))
            except ValueError: found.append(f"{slug}/{locale}: invalid date")
            for image in IMAGE.findall(body):
                target = (ROOT / "public" / image.lstrip("/")).resolve()
                if (ROOT / "public").resolve() not in target.parents or not target.is_file(): found.append(f"{slug}/{locale}: missing image {image}")
        if set(metadata) == {"ru", "en"} and metadata["ru"].get("date") != metadata["en"].get("date"): found.append(f"{slug}: dates differ")
    return found

def validate(_args: argparse.Namespace) -> int:
    found = errors()
    for error in found: print(f"ERROR: {error}", file=sys.stderr)
    if found: return 1
    print(f"Valid: {len(slugs())} bilingual article(s)."); return 0

def list_articles(_args: argparse.Namespace) -> int:
    rows = []
    for slug in slugs():
        ru, _ = parse(CONTENT / slug / "ru.md"); en, _ = parse(CONTENT / slug / "en.md")
        folder = PUBLIC / slug / "images"; count = sum(x.is_file() for x in folder.iterdir()) if folder.is_dir() else 0
        rows.append((str(ru["date"]), f"{slug} | {ru['date']} | {ru['title']} | {en['title']} | RU: {', '.join(ru['tags'])}; EN: {', '.join(en['tags'])} | images: {count}"))
    for _, row in sorted(rows, reverse=True): print(row)
    return 0

def required(label: str) -> str:
    value = input(f"{label}: ").strip()
    if not value: raise ValueError(f"{label} is required.")
    return value
def quoted(value: str) -> str: return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'
def markdown(title: str, description: str, released: str, tags: list[str], body: str) -> str:
    lines = "\n".join(f"  - {quoted(tag)}" for tag in tags)
    return f"---\ntitle: {quoted(title)}\ndescription: {quoted(description)}\ndate: {quoted(released)}\ntags:\n{lines}\n---\n\n# {title}\n\n{body}\n"

def add(_args: argparse.Namespace) -> int:
    slug = required("Slug")
    if not safe(slug) or (CONTENT / slug).exists(): raise ValueError("Unsafe or existing slug.")
    released = required("Date (YYYY-MM-DD)"); date.date.fromisoformat(released)
    rt, et, rd, ed = required("Russian title"), required("English title"), required("Russian description"), required("English description")
    rtags = [x.strip() for x in required("Russian tags (comma-separated)").split(",") if x.strip()]
    etags = [x.strip() for x in required("English tags (comma-separated)").split(",") if x.strip()]
    if not rtags or not etags: raise ValueError("Both tag lists are required.")
    (CONTENT / slug).mkdir(parents=True); (PUBLIC / slug / "images").mkdir(parents=True, exist_ok=True)
    (CONTENT / slug / "ru.md").write_text(markdown(rt, rd, released, rtags, "Начните текст статьи здесь."), encoding="utf-8")
    (CONTENT / slug / "en.md").write_text(markdown(et, ed, released, etags, "Start the article text here."), encoding="utf-8")
    print(f"Added {slug}. Rebuild and redeploy."); return 0

def remove(args: argparse.Namespace) -> int:
    slug = args.slug
    if not safe(slug) or not (CONTENT / slug).is_dir(): raise ValueError("Unknown or unsafe slug.")
    ru, _ = parse(CONTENT / slug / "ru.md"); en, _ = parse(CONTENT / slug / "en.md")
    folder = PUBLIC / slug / "images"; count = sum(x.is_file() for x in folder.iterdir()) if folder.is_dir() else 0
    print(f"RU: {ru['title']}\nEN: {en['title']}\nDate: {ru['date']}\nImages: {count}")
    if input("Type the exact slug to confirm: ").strip() != slug: print("Cancelled."); return 1
    content, public = (CONTENT / slug).resolve(), (PUBLIC / slug).resolve()
    if content.parent != CONTENT.resolve() or public.parent != PUBLIC.resolve(): raise ValueError("Refusing traversal.")
    shutil.rmtree(content)
    if public.is_dir(): shutil.rmtree(public)
    print(f"Removed {slug}."); return 0

def add_image(args: argparse.Namespace) -> int:
    if not safe(args.slug) or not (CONTENT / args.slug).is_dir(): raise ValueError("Unknown or unsafe slug.")
    source = Path(args.image_path).expanduser().resolve()
    if not source.is_file() or source.suffix.lower() not in EXTENSIONS: raise ValueError("Invalid image.")
    folder = PUBLIC / args.slug / "images"; folder.mkdir(parents=True, exist_ok=True)
    stem = re.sub(r"[^A-Za-z0-9._-]", "-", source.stem).strip(".-") or "image"; target = folder / f"{stem}{source.suffix.lower()}"; number = 2
    while target.exists(): target = folder / f"{stem}-{number}{source.suffix.lower()}"; number += 1
    shutil.copy2(source, target); ru, en = required("Russian alt text"), required("English alt text")
    public = f"/blog/{args.slug}/images/{target.name}"; snippets = {"ru": f"![{ru}]({public})", "en": f"![{en}]({public})"}
    print(f"RU: {snippets['ru']}\nEN: {snippets['en']}")
    if input("Append snippets to both articles? [y/N]: ").strip().lower() == "y":
        for locale in ("ru", "en"):
            with (CONTENT / args.slug / f"{locale}.md").open("a", encoding="utf-8", newline="\n") as file: file.write(f"\n\n{snippets[locale]}\n")
    return 0

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__); sub = parser.add_subparsers(required=True)
    sub.add_parser("add").set_defaults(func=add)
    command = sub.add_parser("remove"); command.add_argument("slug"); command.set_defaults(func=remove)
    command = sub.add_parser("add-image"); command.add_argument("slug"); command.add_argument("image_path"); command.set_defaults(func=add_image)
    sub.add_parser("list").set_defaults(func=list_articles); sub.add_parser("validate").set_defaults(func=validate)
    args = parser.parse_args()
    try: return args.func(args)
    except (ValueError, OSError) as error: print(f"ERROR: {error}", file=sys.stderr); return 1

if __name__ == "__main__": raise SystemExit(main())
