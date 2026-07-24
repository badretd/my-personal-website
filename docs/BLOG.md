# Blog Content and Management

## 1. Architecture

The Blog is a statically generated bilingual Markdown system.

There is no database and no runtime CMS.

Suggested structure:

```text
content/
  blog/
    test-post-1/
      ru.md
      en.md
    test-post-2/
      ru.md
      en.md
    test-post-3/
      ru.md
      en.md

public/
  blog/
    <slug>/
      images/
        <filename>
```

Every article must have both:

- `ru.md`
- `en.md`

There are no drafts.

## 2. Markdown frontmatter

Each localized file contains:

```yaml
---
title: "Localized title"
description: "Localized short description"
date: "2026-07-24"
tags:
  - "localized-tag"
---
```

Required fields:

- title;
- description;
- date;
- at least one tag.

The folder name is the article slug.

Both language versions must use the same date.

Do not add a `draft` field.

## 3. Supported Markdown

Article pages should support:

- headings;
- paragraphs;
- emphasis;
- strong text;
- ordered lists;
- unordered lists;
- links;
- blockquotes;
- inline code;
- fenced code blocks;
- images;
- horizontal rules.

Use a minimal compatible Markdown stack.

Do not build a custom Markdown parser.

Because content is local and trusted, a complex remote sanitization system is unnecessary, but raw unsafe HTML should not be enabled by default.

## 4. Article images

Article images are stored under:

`public/blog/<slug>/images/`

Markdown uses public paths:

```md
![Alternative text](/blog/<slug>/images/<filename>)
```

Images must be responsive.

They must not overflow the article column.

Preserve aspect ratio.

## 5. Homepage Blog preview

Section heading:

Russian:

`Блог`

English:

`Blog`

Show latest articles by date.

Responsive count:

- mobile: one;
- tablet: two;
- desktop: three.

Prefer rendering the latest three and controlling visibility through CSS media queries.

Do not use browser-width checks during server rendering.

Each card contains:

- title;
- description;
- localized date;
- tags.

Each card links to:

`/blog/<slug>`

## 6. Full Blog page

Page heading:

Russian:

`Блог`

English:

`Blog`

Required controls:

1. title search;
2. tag filters;
3. date sorting.

### Title search

Russian label:

`Поиск по названию`

English label:

`Search by title`

Search must match titles case-insensitively.

It may additionally match descriptions.

### Tag filters

Russian label:

`Теги`

English label:

`Tags`

Allow one or more active tags.

Multiple selected tags use OR behavior.

An article is shown when it contains at least one selected tag.

Provide a clear reset action.

Russian:

`Сбросить`

English:

`Reset`

### Sorting

Russian options:

- `Сначала новые`
- `Сначала старые`

English options:

- `Newest first`
- `Oldest first`

Default:

Newest first.

### Empty state

Russian:

`Ничего не найдено.`

English:

`Nothing found.`

Do not use a server endpoint for filters.

Use a small client-side filtering component over statically loaded metadata.

## 7. Article page

Route:

`/blog/[slug]`

Display:

- title;
- description;
- localized date;
- tags;
- rendered Markdown;
- back link.

Back link:

Russian:

`Назад к блогу`

English:

`Back to Blog`

Unknown slugs must produce a proper not-found state.

Generate static parameters for known slugs.

## 8. Placeholder article 1

Folder:

`content/blog/test-post-1`

### `ru.md`

```md
---
title: "Тестовая запись №1"
description: "Временная статья для проверки Markdown, списка публикаций и локального удаления."
date: "2026-07-24"
tags:
  - "тест"
  - "сайт"
---

# Тестовая запись №1

Это временный текст ради текста. Он нужен, чтобы проверить, как статья отображается на странице, находится через поиск и удаляется локальным Python-скриптом.

## Второй заголовок

Здесь находится ещё немного текста, потому что одной строки для проверки статьи недостаточно.

- первый пункт;
- второй пункт;
- третий пункт.

> Эта цитата не несёт глубокого смысла. Она проверяет оформление цитат.
```

### `en.md`

```md
---
title: "Test post No. 1"
description: "A temporary article for testing Markdown rendering, article listings, and local deletion."
date: "2026-07-24"
tags:
  - "test"
  - "website"
---

# Test post No. 1

This is temporary text for the sake of having text. It exists to test how an article is rendered, found through search, and removed with the local Python script.

## A second heading

Here is some additional text because one line is not enough to test an article layout.

- first item;
- second item;
- third item.

> This quote has no deep meaning. It tests blockquote styling.
```

## 9. Placeholder article 2

Folder:

`content/blog/test-post-2`

### `ru.md`

~~~md
---
title: "Тестовая запись №2"
description: "Ещё один временный материал для проверки тегов и сортировки."
date: "2026-07-23"
tags:
  - "тест"
  - "markdown"
---

# Тестовая запись №2

Эта запись нужна для проверки сортировки, тегов и нескольких абзацев подряд.

Обычный текст может содержать **жирное выделение**, *курсив* и `встроенный код`.

## Небольшой пример кода

```python
def hello() -> str:
    return "Это всё ещё заглушка"
```

После проверки эту статью можно удалить через локальный скрипт.
~~~

### `en.md`

~~~md
---
title: "Test post No. 2"
description: "Another temporary article for testing tags and sorting."
date: "2026-07-23"
tags:
  - "test"
  - "markdown"
---

# Test post No. 2

This post exists to test sorting, tags, and several consecutive paragraphs.

Ordinary text may contain **bold emphasis**, *italics*, and `inline code`.

## A small code example

```python
def hello() -> str:
    return "This is still a placeholder"
```

After testing, this article can be removed with the local script.
~~~

## 10. Placeholder article 3

Folder:

`content/blog/test-post-3`

### `ru.md`

```md
---
title: "Тестовая запись №3"
description: "Последняя заглушка для проверки поиска и адаптивного количества карточек."
date: "2026-07-22"
tags:
  - "тест"
  - "интерфейс"
---

# Тестовая запись №3

Это третья временная публикация.

Она проверяет:

1. отображение трёх карточек на широком экране;
2. отображение двух карточек на планшете;
3. отображение одной карточки на телефоне;
4. поиск по названию;
5. фильтрацию по тегам.

На этом полезная нагрузка заглушки заканчивается.
```

### `en.md`

```md
---
title: "Test post No. 3"
description: "The final placeholder for testing search and responsive article-card counts."
date: "2026-07-22"
tags:
  - "test"
  - "interface"
---

# Test post No. 3

This is the third temporary publication.

It tests:

1. three cards on a wide screen;
2. two cards on a tablet;
3. one card on a phone;
4. title search;
5. tag filtering.

That concludes the useful purpose of this placeholder.
```

## 11. Blog-management script

Create:

`scripts/manage_blog.py`

Use Python 3.11+ and only the standard library.

Required commands:

```bash
python scripts/manage_blog.py add
python scripts/manage_blog.py remove <slug>
python scripts/manage_blog.py add-image <slug> <image-path>
python scripts/manage_blog.py list
python scripts/manage_blog.py validate
```

### `add`

Interactively ask for:

- slug;
- publication date;
- Russian title;
- English title;
- Russian description;
- English description;
- Russian tags;
- English tags.

Validate the slug.

Reject:

- path separators;
- `..`;
- absolute paths;
- an existing folder;
- empty required fields;
- invalid ISO dates;
- empty tag lists.

Create:

- `content/blog/<slug>/ru.md`
- `content/blog/<slug>/en.md`
- `public/blog/<slug>/images/`

Generate valid frontmatter and a small localized placeholder body.

Do not open an editor automatically.

### `remove`

Require the exact slug.

Display:

- Russian title;
- English title;
- date;
- image count.

Require explicit confirmation.

Remove:

- `content/blog/<slug>/`
- `public/blog/<slug>/`

Do not allow a path outside these roots.

### `add-image`

Arguments:

- article slug;
- local source-image path.

Validate that the article exists.

Copy the image to:

`public/blog/<slug>/images/<safe-filename>`

Handle filename collisions safely.

Prompt for:

- Russian alt text;
- English alt text.

After copying:

1. print the Russian Markdown snippet;
2. print the English Markdown snippet;
3. ask whether the snippets should be appended to the ends of the corresponding Markdown files.

Default answer:

No.

Do not modify article text without confirmation.

### `list`

Display:

- slug;
- date;
- Russian title;
- English title;
- tags;
- number of images.

Sort newest first.

### `validate`

Validate:

- each article has both language files;
- required frontmatter fields exist;
- dates are valid and equal between languages;
- titles are non-empty;
- descriptions are non-empty;
- tag lists are non-empty;
- slugs are safe;
- referenced local images exist when the script can detect them;
- no unexpected language file is missing.

Exit with non-zero status on validation errors.

## 12. README documentation

Explain:

- content-folder structure;
- supported Markdown;
- every script command;
- image handling;
- bilingual requirements;
- that there are no drafts;
- that changes require rebuilding and redeploying the static website.
