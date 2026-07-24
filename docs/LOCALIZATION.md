1. Supported languages

The website supports:

Russian: ru;
English: en.

Do not add additional languages in the first implementation.

2. Initial selection

Language-selection priority:

explicitly saved manual choice;
browser preferred language;
English fallback.

Browser-language behavior:

if the preferred browser language begins with ru, select Russian;
otherwise select English.

Examples:

ru → Russian;
ru-RU → Russian;
ru-KZ → Russian;
en-US → English;
sv-SE → English;
unknown or missing value → English. 3. Manual control

Provide a compact manual language control in the header.

Acceptable representations:

RU / EN;
a compact two-option text control;
an accessible select element if it fits the design.

Do not use country flags.

Languages are not countries.

The control must:

work with a keyboard;
have an accessible label;
visibly indicate the active language;
persist the user's choice;
update the page without a full reload where practical. 4. Persistence

Store the explicit manual choice.

Suggested key:

badretd-language

Allowed values:

ru;
en.

A saved manual choice has priority over browser detection.

Do not save an automatically detected language as though it were a manual choice unless this simplifies the architecture without changing behavior.

5. Document metadata

Update:

the root document lang attribute;
localized metadata where practical;
localized navigation labels;
localized button labels;
localized page placeholders.

Use:

lang="ru" for Russian;
lang="en" for English. 6. Translation storage

Use explicit typed dictionaries.

Suggested logical groups:

navigation;
home hero;
About preview;
route placeholders;
accessibility labels;
metadata.

Do not scatter untranslated strings through components.

Do not use runtime machine translation.

7. Required strings
   Russian

Navigation:

Главная
Проекты
Музыка
Блог
Обо мне

Hero:

По красоте
Личный сайт Бадретдинова И. Р.

About preview:

Вот так вот
Кто я такой
supplied Russian body copy;
Подробнее
English

Navigation:

Home
Projects
Music
Blog
About

Hero:

For the aesthetic
The personal website of I. R. Badretdinov.

About preview:

That's how it is
Who I am
supplied English body copy;
Learn more 8. Procedural system and language

Changing language must not generate a new procedural scene unless required by the implementation.

The background configuration should remain stable while text changes.

After switching language:

recalculate content fit if necessary;
preserve the current scene family;
preserve the current scene seed;
preserve the current scene timing where practical;
prevent text overlap;
use the placement strategy's language-specific width limits.

English and Russian strings have different lengths.

Every placement strategy must be validated for both languages.

9. Hydration

Avoid server/client text mismatches.

Acceptable strategies include:

locale-prefixed routes;
a cookie available during server rendering;
a stable default followed by a carefully handled client preference;
existing compatible internationalization infrastructure.

Prefer an approach that avoids visibly replacing the entire page after hydration.

Do not access navigator or localStorage during server rendering.

10. Unfinished routes

The Projects, Music, Blog, and About routes must use localized restrained placeholders until their real content is implemented.

Do not use generic “Coming soon” marketing language.

Suggested placeholders:

Russian
Проекты: Раздел проектов находится в разработке.
Музыка: Раздел музыки находится в разработке.
Блог: Раздел блога находится в разработке.
Обо мне: Полная страница обо мне находится в разработке.
English
Projects: The Projects section is currently being built.
Music: The Music section is currently being built.
Blog: The Blog section is currently being built.
About: The full About page is currently being built. 11. Accessibility

The language control must have an accessible name.

Examples:

Russian: Выбрать язык
English: Select language

Do not communicate the current language through color alone.
