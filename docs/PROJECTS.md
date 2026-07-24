# Projects Content and Behavior

## 1. Shared project data

Create one typed source of truth for projects.

Suggested file:

`content/projects.ts`

Each project entry should contain:

- stable ID;
- name;
- repository URL;
- Unicode symbol;
- Russian description;
- English description;
- Russian personal comment;
- English personal comment.

Do not fetch GitHub data at runtime.

Do not depend on GitHub availability during the website build.

## 2. Project entries

### Web Radio

ID:

`web-radio`

Display name:

`Web Radio`

Repository:

`https://github.com/badretd/web-radio`

Unicode symbol:

`◉`

Russian description:

`Самостоятельно размещаемая синхронизированная веб-радиостанция с публичным плеером и приватной студией для загрузки музыки, публикации расписания и просмотра статистики прослушиваний.`

English description:

`A self-hosted synchronized web-radio station with a public player and a private studio for uploading music, publishing schedules, and viewing listening statistics.`

Russian comment:

`Но у меня нет друзей для этого.`

English comment:

`But I don't have any friends for this.`

### bitp

ID:

`bitp`

Display name:

`bitp`

Repository:

`https://github.com/badretd/bitp-server`

Unicode symbol:

`⌖`

Russian description:

`Сервер эксперимента с цифровым путешественником: клиент отправляет посещения и скриншоты, публикации проходят модерацию, а управление происходит через защищённую ролевую админку.`

English description:

`The server for a digital-traveler experiment: a client submits visits and screenshots, publications pass through moderation, and management happens through a secured role-based admin interface.`

Russian comment:

`Идея прикольная, но все подумали, что это вирус.`

English comment:

`The idea is cool, but everyone thought it was a virus.`

### CodeCast

ID:

`codecast`

Display name:

`CodeCast`

Repository:

`https://github.com/badretd/codecast`

Unicode symbol:

`▤`

Russian description:

`Расширение Visual Studio Code для временной read-only-трансляции исходного кода через веб-ссылку с деревом файлов, подсветкой синтаксиса, курсором ведущего и обновлениями в реальном времени.`

English description:

`A Visual Studio Code extension for sharing a temporary read-only source-code view through a web link, with a file tree, syntax highlighting, presenter cursor tracking, and live updates.`

Russian comment:

`Красиво, но Microsoft справились раньше меня.`

English comment:

`It looks beautiful, but Microsoft got there before me.`

## 3. Unicode-symbol rules

Use the supplied Unicode symbols directly.

Do not install an icon library.

Symbols are decorative and must use:

```html
aria-hidden="true"
```

Do not use emoji-style symbols whose rendering changes dramatically between operating systems.

Use a font stack that renders the symbols consistently with the current typography.

## 4. Homepage Projects preview

Section heading:

Russian:

`Проекты`

English:

`Projects`

Show a four-card composition:

1. Web Radio;
2. bitp;
3. CodeCast;
4. internal All Projects card.

The project cards link directly to GitHub.

They open in the current tab.

The entire card is the link.

Do not place another nested link or button inside the card.

The fourth card uses:

Unicode symbol:

`→`

Russian label:

`Все проекты`

English label:

`All projects`

Destination:

`/projects`

The fourth card should feel related to the project cards but clearly function as navigation.

## 5. Project-card content order

Recommended hierarchy:

1. Unicode symbol;
2. project name;
3. functional description;
4. personal comment;
5. subtle repository indication.

The personal comment should have its own visual treatment.

It may use:

- a separator;
- changed type style;
- a smaller label;
- a different grid row;
- restrained accent color.

Do not place the comment in a nested rounded quote card.

## 6. Full Projects page

Page heading:

Russian:

`Проекты`

English:

`Projects`

Render every project from the shared data source.

At present, there are three projects.

The architecture must allow future project entries without page rewrites.

Every project card links to GitHub in the current tab.

## 7. Projects-page animated background

Use a large SVG connecting-line system behind the cards.

The system should suggest that the projects belong to one evolving body of work.

It may contain:

- restrained nodes;
- straight or orthogonal paths;
- lines aligned to the page grid;
- slowly moving dash offsets;
- paths activating between project regions.

Interaction:

- hovering a project card activates its related lines;
- keyboard focus activates the same state;
- inactive lines remain low contrast;
- activation must not rely only on color;
- a small opacity or line-width change may be used.

Implementation:

- SVG or CSS;
- no Canvas;
- no WebGL;
- no particle simulation;
- no pointer-following system;
- no random line creation every frame.

The SVG must be decorative and hidden from assistive technology.

For reduced motion:

- stop dash or path movement;
- keep a stable connecting-line composition;
- preserve hover and focus clarity without animation.

On mobile:

- reduce the number of paths;
- keep the background subordinate;
- avoid lines crossing readable text.
