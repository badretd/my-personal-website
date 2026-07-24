# Site Completion Specification

## 1. Status of the existing website

The current header, homepage hero, procedural scene system, localization control, and animation behavior are approved.

They are not placeholders.

They must not be redesigned or replaced while completing the remaining website.

The current first viewport is a protected subsystem.

## 2. Brand rule

Primary website identity:

`[ badretd ]`

Use it throughout the normal website experience.

Transition identity:

`[ badretded ]`

Use it only during the existing one-second procedural-scene interstitial.

The two strings are intentionally different.

## 3. Homepage order

The final homepage order is:

1. persistent header;
2. existing procedural hero;
3. existing shortened About section;
4. Projects preview;
5. Music preview;
6. Blog preview;
7. footer.

Do not add other homepage sections.

## 4. General visual direction

Continue the current visual language:

- near-black backgrounds;
- compact navigation;
- visible grid relationships;
- precise alignment;
- editorial typography;
- controlled asymmetry;
- straight edges;
- restrained borders;
- limited accent colors;
- intentional negative space;
- technical but non-corporate presentation.

The new content should feel authored rather than template-generated.

Avoid:

- generic landing-page compositions;
- glass cards;
- default gradient backgrounds;
- glowing borders;
- excessive rounded corners;
- decorative terminal windows;
- generic code blocks;
- giant centered headings on every page;
- particle fields;
- WebGL;
- unnecessary hover effects;
- custom cursors;
- scroll hijacking.

## 5. Static architecture

The website must remain fully static.

Content is edited locally and committed to the repository.

There is no:

- backend;
- database;
- runtime CMS;
- admin route;
- authentication;
- upload API;
- server-side search;
- runtime file mutation.

Python scripts modify repository files locally.

A new static build and deployment is required after content changes.

## 6. Shared data

Repeated content must have one source of truth.

Recommended sources:

- `content/projects.ts`
- `content/socials.ts`
- `content/music/releases.json`
- `content/blog/<slug>/ru.md`
- `content/blog/<slug>/en.md`

The exact paths may be adapted to the current repository structure, but content must not be duplicated across pages.

## 7. Link behavior

Project cards linking to GitHub must open in the current tab.

Do not add:

```html
target="_blank"
```

Internal cards and buttons also open in the current tab.

Do not nest buttons inside linked cards.

## 8. Footer

The footer is calm and stable.

It contains:

- `[ badretd ]`
- GitHub
- YouTube
- Telegram
- SoundCloud
- Bandcamp
- localized copyright line

### Social links

GitHub:

`https://github.com/badretd`

YouTube:

`https://www.youtube.com/playlist?list=PLbwUX30QFDaM`

SoundCloud:

`https://soundcloud.com/logka419`

Bandcamp:

`https://logka.bandcamp.com`

Telegram:

No public URL is currently available.

Represent it in the social data as:

```ts
{
  id: "telegram",
  href: null
}
```

Render:

Russian:

`Telegram — скоро`

English:

`Telegram — soon`

It must not be an anchor with `href="#"`.

### Copyright

Russian:

`© 2026 И. Р. Бадретдинов`

English:

`© 2026 I. R. Badretdinov`

Do not add a slogan, contact form, newsletter or large footer animation.

## 9. Animation boundaries

Existing hero animations must not be modified.

New animation systems may be added only as isolated components for:

- Projects-page connecting lines;
- decorative Music equalizer;
- About timeline progression.

New animations must:

- not import themselves into the procedural hero;
- clean up timers and listeners;
- pause when hidden or offscreen;
- respect reduced motion;
- avoid changing layout every frame.

## 10. Responsive behavior

Mobile should simplify new visual systems.

On mobile:

- reduce equalizer-bar count;
- simplify connecting lines;
- use a single-column About timeline;
- show one Blog preview article;
- preserve clear touch targets;
- avoid horizontal scrolling.

Tablet shows two Blog preview articles.

Desktop shows three Blog preview articles.
