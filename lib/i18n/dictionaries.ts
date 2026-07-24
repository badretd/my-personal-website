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
  placeholders: Record<"projects" | "music" | "blog" | "about", readonly [string, string]>;
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
  placeholders: {
    projects: ["Проекты", "Раздел проектов находится в разработке."],
    music: ["Музыка", "Раздел музыки находится в разработке."],
    blog: ["Блог", "Раздел блога находится в разработке."],
    about: ["Обо мне", "Полная страница обо мне находится в разработке."],
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
  placeholders: {
    projects: ["Projects", "The Projects section is currently being built."],
    music: ["Music", "The Music section is currently being built."],
    blog: ["Blog", "The Blog section is currently being built."],
    about: ["About", "The full About page is currently being built."],
  },
};

export const dictionaries: Record<Locale, typeof ru> = { ru, en };
