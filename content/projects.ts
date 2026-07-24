export type LocalizedText = Readonly<{ ru: string; en: string }>;

export type Project = Readonly<{
  id: string;
  name: string;
  repository: string;
  symbol: string;
  description: LocalizedText;
  comment: LocalizedText;
}>;

export const projects: readonly Project[] = [
  {
    id: "web-radio",
    name: "Web Radio",
    repository: "https://github.com/badretd/web-radio",
    symbol: "◉",
    description: {
      ru: "Самостоятельно размещаемая синхронизированная веб-радиостанция с публичным плеером и приватной студией для загрузки музыки, публикации расписания и просмотра статистики прослушиваний.",
      en: "A self-hosted synchronized web-radio station with a public player and a private studio for uploading music, publishing schedules, and viewing listening statistics.",
    },
    comment: {
      ru: "Но у меня нет друзей для этого.",
      en: "But I don't have any friends for this.",
    },
  },
  {
    id: "bitp",
    name: "bitp",
    repository: "https://github.com/badretd/bitp-server",
    symbol: "⌖",
    description: {
      ru: "Сервер эксперимента с цифровым путешественником: клиент отправляет посещения и скриншоты, публикации проходят модерацию, а управление происходит через защищённую ролевую админку.",
      en: "The server for a digital-traveler experiment: a client submits visits and screenshots, publications pass through moderation, and management happens through a secured role-based admin interface.",
    },
    comment: {
      ru: "Идея прикольная, но все подумали, что это вирус.",
      en: "The idea is cool, but everyone thought it was a virus.",
    },
  },
  {
    id: "codecast",
    name: "CodeCast",
    repository: "https://github.com/badretd/codecast",
    symbol: "▤",
    description: {
      ru: "Расширение Visual Studio Code для временной read-only-трансляции исходного кода через веб-ссылку с деревом файлов, подсветкой синтаксиса, курсором ведущего и обновлениями в реальном времени.",
      en: "A Visual Studio Code extension for sharing a temporary read-only source-code view through a web link, with a file tree, syntax highlighting, presenter cursor tracking, and live updates.",
    },
    comment: {
      ru: "Красиво, но Microsoft справились раньше меня.",
      en: "It looks beautiful, but Microsoft got there before me.",
    },
  },
] as const;
