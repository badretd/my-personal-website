import type { Locale } from "./locale";

export type Dictionary = {
  navigation: {
    label: string;
    home: string;
    projects: string;
    music: string;
    blog: string;
    about: string;
    menu: string;
    close: string;
    language: string;
    homeLabel: string;
  };
  hero: { title: string; description: string };
  aboutPreview: {
    title: string;
    subtitle: string;
    paragraphs: readonly [string, string];
    action: string;
  };
  projects: {
    title: string;
    all: string;
    comment: string;
    repository: string;
    repositoryLabel: string;
  };
  music: {
    title: string;
    latest: string;
    archive: string;
    latestMark: string;
    coverAlt: string;
    listenOn: string;
  };
  blog: {
    title: string;
    search: string;
    searchPlaceholder: string;
    tags: string;
    reset: string;
    sort: string;
    newest: string;
    oldest: string;
    empty: string;
    back: string;
    readArticle: string;
  };
  about: {
    title: string;
    timelineLabel: string;
    contact: string;
    years: Record<"2023" | "2024" | "2025" | "2026", string>;
    imageAlts: readonly [string, string, string];
  };
  footer: { label: string; copyright: string; telegramSoon: string };
};

const ru: Dictionary = {
  navigation: {
    label: "Основная навигация",
    home: "Главная",
    projects: "Проекты",
    music: "Музыка",
    blog: "Блог",
    about: "Обо мне",
    menu: "Меню",
    close: "Закрыть",
    language: "Выбрать язык",
    homeLabel: "[ badretd ], главная",
  },
  hero: {
    title: "По красоте",
    description: "Личный сайт Бадретдинова И. Р.",
  },
  aboutPreview: {
    title: "Вот так вот",
    subtitle: "Кто я такой",
    paragraphs: [
      "Живу в городе Уфа. Талантливый программист, менее талантливый музыкант и ещё менее талантливый режиссёр. Мне 16 лет, и за 140000+ часов жизни я выпустил 3 музыкальных альбома, прошёл на региональный этап по 2 олимпиадам и выпустил 1 полноценное видео на YouTube.",
      "Программирую с 12 лет и за это время сделал пару SaaS, которые закрылись в тот же день, демку игры на WinAPI на C++ и решил 33 задачи на Codeforces. Сейчас активно готовлюсь к олимпиадам. Вы можете найти мои контакты в разделе «Обо мне», нажав на кнопку «Подробнее», или через меню.",
    ],
    action: "Подробнее",
  },
  projects: {
    title: "Проекты",
    all: "Все проекты",
    comment: "Комментарий",
    repository: "GitHub / репозиторий",
    repositoryLabel: "Открыть репозиторий",
  },
  music: {
    title: "Музыка",
    latest: "Последний релиз",
    archive: "Архив релизов",
    latestMark: "последний",
    coverAlt: "Обложка альбома COPY OST.",
    listenOn: "Слушать на",
  },
  blog: {
    title: "Блог",
    search: "Поиск по названию",
    searchPlaceholder: "Название статьи",
    tags: "Теги",
    reset: "Сбросить",
    sort: "Сортировка",
    newest: "Сначала новые",
    oldest: "Сначала старые",
    empty: "Ничего не найдено.",
    back: "Назад к блогу",
    readArticle: "Читать статью",
  },
  about: {
    title: "Обо мне",
    timelineLabel: "Творческая история, 2023–2026",
    contact: "Контакты",
    years: {
      "2023": "Впервые начинаю хоть какую-то публичную деятельность. Снимаю свой первый сериал «Исповедь школьника», всерьёз занимаюсь первым блогом, монтирую видео для себя и друзей.",
      "2024": "В начале года создаю собственный личный канал с желанием сделать что-то большое. Первого сентября запускаю Telegram-канал «Выжить в школе» и одноимённый сериал. Главным концептом было то, что зрители сами выбирали, куда пойдёт сюжет. Иногда монтировал до трёх часов ночи, чтобы успевать выпускать по три серии в неделю.",
      "2025": "Этот год сильно выбивает меня из жизни. Все творческие проекты заканчиваются, ничего создавать не хочется. Почти весь год я ничего не делаю в творческом плане.",
      "2026": "Возвращаюсь с новыми силами и запускаю новые Telegram- и YouTube-каналы. Следите за обновлениями — скоро.",
    },
    imageAlts: [
      "Кадр из сериала «Исповедь школьника».",
      "Постер сериала «Выжить в школе».",
      "Фотография И. Р. Бадретдинова.",
    ],
  },
  footer: {
    label: "Подвал сайта [ badretd ]",
    copyright: "© 2026 И. Р. Бадретдинов",
    telegramSoon: "Telegram — скоро",
  },
};

const en: Dictionary = {
  navigation: {
    label: "Primary navigation",
    home: "Home",
    projects: "Projects",
    music: "Music",
    blog: "Blog",
    about: "About",
    menu: "Menu",
    close: "Close",
    language: "Select language",
    homeLabel: "[ badretd ], home",
  },
  hero: {
    title: "For the aesthetic",
    description: "The personal website of I. R. Badretdinov.",
  },
  aboutPreview: {
    title: "That's how it is",
    subtitle: "Who I am",
    paragraphs: [
      "I live in Ufa. I am a talented programmer, a less talented musician, and an even less talented director. I am 16, and in 140,000+ hours of life I have released 3 music albums, qualified for the regional stage in 2 olympiads, and published 1 full-length YouTube video.",
      "I have been programming since I was 12. Since then, I have built a couple of SaaS products that shut down on day zero, made a WinAPI game demo in C++, and solved 33 Codeforces problems. Right now, I am actively preparing for olympiads. You can find my contacts on the About page by clicking “Learn more”, or through the navigation menu.",
    ],
    action: "Learn more",
  },
  projects: {
    title: "Projects",
    all: "All projects",
    comment: "Comment",
    repository: "GitHub / repository",
    repositoryLabel: "Open repository",
  },
  music: {
    title: "Music",
    latest: "Latest release",
    archive: "Release archive",
    latestMark: "latest",
    coverAlt: "COPY OST album cover.",
    listenOn: "Listen on",
  },
  blog: {
    title: "Blog",
    search: "Search by title",
    searchPlaceholder: "Article title",
    tags: "Tags",
    reset: "Reset",
    sort: "Sort",
    newest: "Newest first",
    oldest: "Oldest first",
    empty: "Nothing found.",
    back: "Back to Blog",
    readArticle: "Read article",
  },
  about: {
    title: "About",
    timelineLabel: "Creative history, 2023–2026",
    contact: "Contacts",
    years: {
      "2023": "For the first time, I begin doing something at least vaguely public. I make my first series, “A Schoolkid's Confession,” work seriously on my first blog, and edit videos for myself and my friends.",
      "2024": "At the beginning of the year, I create my own personal channel with the intention of making something big. On September 1, I launch the Telegram channel “Surviving School” and a series with the same name. Its main concept is that the viewers choose where the story goes. Sometimes I edit until three in the morning to publish three episodes a week.",
      "2025": "This year knocks me badly out of my rhythm. All of my creative projects come to an end, and I do not feel like making anything. For almost the entire year, I do practically nothing creative.",
      "2026": "I return with new energy and launch new Telegram and YouTube channels. Stay tuned — more is coming soon.",
    },
    imageAlts: [
      "A frame from the series “A Schoolkid's Confession.”",
      "The poster for the series “Surviving School.”",
      "A photograph of I. R. Badretdinov.",
    ],
  },
  footer: {
    label: "[ badretd ] site footer",
    copyright: "© 2026 I. R. Badretdinov",
    telegramSoon: "Telegram — soon",
  },
};

export const dictionaries: Record<Locale, typeof ru> = { ru, en };
