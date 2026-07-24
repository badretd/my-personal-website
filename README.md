# [ badretd ]

A fully static bilingual personal site. Local content changes require a new build and deployment.

## Development

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

## Blog content

Articles live in `content/blog/<slug>/ru.md` and `content/blog/<slug>/en.md`. Both UTF-8 files are required; there are no drafts. Markdown supports headings, paragraphs, emphasis, lists, links, blockquotes, code, images, and horizontal rules. Images live in `public/blog/<slug>/images/`.

```bash
python scripts/manage_blog.py add
python scripts/manage_blog.py remove <slug>
python scripts/manage_blog.py add-image <slug> <image-path>
python scripts/manage_blog.py list
python scripts/manage_blog.py validate
```

`add-image` copies an image locally, prints localized Markdown snippets, and appends them only after confirmation. The script never opens an editor.

## Music releases

Release metadata lives in `content/music/releases.json`; managed covers are copied to `public/music/<release-id>/`. Releases link to listening services: this site stores or plays no audio and the script uploads nothing.

```bash
python scripts/manage_releases.py add
python scripts/manage_releases.py remove <release-id>
python scripts/manage_releases.py list
python scripts/manage_releases.py validate
```

After any Blog or release change, run a new static build and redeploy the generated site.
