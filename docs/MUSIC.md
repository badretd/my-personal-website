# Music Content and Management

## 1. Purpose

The Music sections present releases and link to external listening platforms.

The website does not play audio.

There is no embedded audio player.

## 2. Current release

Stable ID:

`copy-ost`

Title:

`COPY OST`

Artist:

`logka`

Stored date:

`2026-07-24`

Russian display date:

`24.07.2026`

English display date:

`July 24, 2026`

Cover:

`/cover.jpg`

The source file already exists at:

`public/cover.jpg`

Do not move, rename or delete it.

### External links

Bandcamp:

`https://logka.bandcamp.com/album/copy-ost`

SoundCloud:

`https://soundcloud.com/logka419/sets/copy-ost`

YouTube:

`https://www.youtube.com/playlist?list=PLbwUX30QFDaM`

## 3. Homepage Music preview

Main label:

Russian:

`Последний релиз`

English:

`Latest release`

Show:

- large cover;
- release title;
- artist;
- localized date;
- Bandcamp link;
- SoundCloud link;
- YouTube link.

Do not add:

- play button;
- pause button;
- progress bar;
- duration;
- volume;
- track list;
- download button;
- autoplay;
- hidden audio element;
- embedded third-party player.

The whole section should feel like a release presentation rather than a player UI.

## 4. Equalizer background

Use a decorative equalizer made from vertical bars.

It is not connected to audio.

The movement should look plausible rather than completely independent.

Suggested behavior:

1. generate a bounded target profile;
2. neighboring bars influence one another;
3. low-frequency broad movement affects groups of bars;
4. smaller random variation affects individual bars;
5. interpolate smoothly toward the target;
6. periodically create a new target.

Avoid:

- every bar jumping independently;
- update intervals below what is visually necessary;
- equal bar heights;
- nightclub neon styling;
- bright rainbow colors;
- audio APIs;
- microphone permissions;
- hidden media playback.

Suggested density:

Mobile:

- 12–20 bars.

Tablet:

- 20–32 bars.

Desktop:

- 28–48 bars.

The exact count should depend on the available section width.

Suggested target refresh interval:

- approximately 180–420 milliseconds;
- slight deterministic variation is allowed.

Use CSS transitions, the existing animation system, or a small isolated animation loop.

Do not rerender the full Music section on every frame.

Pause when:

- the section is far outside the viewport;
- the document is hidden.

Reduced motion:

- show a static but varied equalizer profile.

The equalizer must remain behind the release information and must not reduce readability.

## 5. Full Music page

Page heading:

Russian:

`Музыка`

English:

`Music`

Use the same latest-release presentation as the homepage at a larger scale.

Below it, add:

Russian:

`Архив релизов`

English:

`Release archive`

The archive reads from shared release data.

Do not invent older albums.

With one release, the archive may contain that one release, visually marked as the latest entry.

The layout must work naturally when more releases are added later.

Archive entries contain:

- cover;
- title;
- artist;
- localized date;
- available external links.

Archive entries do not contain audio controls.

## 6. Release data

Suggested file:

`content/music/releases.json`

Suggested schema:

```json
[
  {
    "id": "copy-ost",
    "title": "COPY OST",
    "artist": "logka",
    "date": "2026-07-24",
    "cover": "/cover.jpg",
    "links": {
      "bandcamp": "https://logka.bandcamp.com/album/copy-ost",
      "soundcloud": "https://soundcloud.com/logka419/sets/copy-ost",
      "youtube": "https://www.youtube.com/playlist?list=PLbwUX30QFDaM"
    }
  }
]
```

The latest release is the release with the newest valid date.

Do not identify the latest release by array position alone.

Validate:

- unique IDs;
- ISO dates;
- required title;
- required artist;
- cover path;
- at least one listening link;
- supported link keys.

## 7. Release-management script

Create:

`scripts/manage_releases.py`

Use Python 3.11+ and the standard library.

Required commands:

```bash
python scripts/manage_releases.py add
python scripts/manage_releases.py remove <release-id>
python scripts/manage_releases.py list
python scripts/manage_releases.py validate
```

### `add`

Interactively ask for:

- release ID or slug;
- title;
- artist;
- release date in `YYYY-MM-DD`;
- local cover-file path;
- optional Bandcamp URL;
- optional SoundCloud URL;
- optional YouTube URL.

Validate the release ID.

Reject:

- duplicate IDs;
- path separators;
- `..`;
- empty required fields;
- invalid dates;
- missing cover files.

For new releases, copy the cover to:

`public/music/<release-id>/cover.<original-extension>`

Use a safe normalized extension.

Do not overwrite an existing file without explicit confirmation.

Update `content/music/releases.json` in UTF-8.

Keep the JSON deterministic and human-readable.

### `remove`

Require exact release ID.

Display the release that will be removed.

Require confirmation.

Remove the JSON entry.

Remove its managed cover directory only when that directory belongs to the script.

Never remove `public/cover.jpg` automatically.

### `list`

Display:

- ID;
- title;
- artist;
- date;
- cover;
- available services.

### `validate`

Validate:

- JSON shape;
- unique IDs;
- date formats;
- referenced local cover files;
- at least one external link;
- allowed service keys.

Exit with a non-zero status when validation fails.

## 8. README documentation

Document all commands.

State clearly:

- releases are added locally;
- the script does not upload anything;
- the website must be rebuilt and redeployed afterward;
- no audio files are stored or played by this feature.
