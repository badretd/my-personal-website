# About Timeline Content and Direction

## 1. Page purpose

The About page tells the author's creative history through a visual timeline.

It is not a formal résumé.

The timeline covers:

- 2023;
- 2024;
- 2025;
- 2026.

## 2. Visual concept

Interpret the timeline as a film-editing timeline or sequence of assembled scenes.

Use:

- large year markers resembling timecodes;
- a timeline rail;
- segment boundaries;
- small frame numbers or technical dividers when useful;
- images presented as film frames;
- alternating image and text placement;
- intentional empty regions;
- changes in rhythm between years.

Do not turn the page into a literal video-editor screenshot.

Do not copy an existing editing application interface.

### Desktop

Possible composition:

- one main vertical or slightly offset timeline rail;
- year markers attached to the rail;
- text and images occupying alternating grid regions;
- 2023 and 2024 feeling visually active;
- 2025 containing a visible pause or broken interval;
- 2026 resuming the rail;
- final large square image closing the sequence.

### Mobile

Use a clear single-column sequence.

Do not force alternating desktop positioning onto a narrow screen.

Keep the year visible before its content.

### Motion

A restrained progress state may follow scrolling:

- the rail fills or becomes active;
- the current year gains emphasis;
- film-frame content appears without bouncing.

Do not modify the existing homepage animation code.

Use an isolated component.

Reduced motion shows the complete static timeline.

## 3. Page heading

Russian:

`Обо мне`

English:

`About`

Do not add a corporate subtitle.

## 4. Year 2023

Image:

`/photo_2026-07-24_17-18-35.jpg`

Expected source:

`public/photo_2026-07-24_17-18-35.jpg`

Russian image alt:

`Кадр из сериала «Исповедь школьника».`

English image alt:

`A frame from the series “A Schoolkid's Confession.”`

### Russian text

`Впервые начинаю хоть какую-то публичную деятельность. Снимаю свой первый сериал «Исповедь школьника», всерьёз занимаюсь первым блогом, монтирую видео для себя и друзей.`

### English text

`For the first time, I begin doing something at least vaguely public. I make my first series, “A Schoolkid's Confession,” work seriously on my first blog, and edit videos for myself and my friends.`

## 5. Year 2024

Image:

`/photo_2026-07-24_17-22-13.jpg`

Expected source:

`public/photo_2026-07-24_17-22-13.jpg`

Russian image alt:

`Постер сериала «Выжить в школе».`

English image alt:

`The poster for the series “Surviving School.”`

### Russian text

`В начале года создаю собственный личный канал с желанием сделать что-то большое. Первого сентября запускаю Telegram-канал «Выжить в школе» и одноимённый сериал. Главным концептом было то, что зрители сами выбирали, куда пойдёт сюжет. Иногда монтировал до трёх часов ночи, чтобы успевать выпускать по три серии в неделю.`

### English text

`At the beginning of the year, I create my own personal channel with the intention of making something big. On September 1, I launch the Telegram channel “Surviving School” and a series with the same name. Its main concept is that the viewers choose where the story goes. Sometimes I edit until three in the morning to publish three episodes a week.`

## 6. Year 2025

No image is supplied for this year.

Do not invent one.

The absence of an image may be used intentionally in the composition.

### Russian text

`Этот год сильно выбивает меня из жизни. Все творческие проекты заканчиваются, ничего создавать не хочется. Почти весь год я ничего не делаю в творческом плане.`

### English text

`This year knocks me badly out of my rhythm. All of my creative projects come to an end, and I do not feel like making anything. For almost the entire year, I do practically nothing creative.`

The timeline may visually pause, break or lose density here.

Do not make the treatment melodramatic.

## 7. Year 2026

No timeline image is supplied specifically for this year.

Do not invent one.

### Russian text

`Возвращаюсь с новыми силами и запускаю новые Telegram- и YouTube-каналы. Следите за обновлениями — скоро.`

### English text

`I return with new energy and launch new Telegram and YouTube channels. Stay tuned — more is coming soon.`

The timeline should visually resume after the 2025 pause.

Do not invent channel links.

## 8. Final image

Image:

`/photo_2026-07-16_08-53-21.jpg`

Expected source:

`public/photo_2026-07-16_08-53-21.jpg`

The image has a square-oriented presentation.

Display it prominently near the bottom of the page.

Use:

```css
aspect-ratio: 1 / 1;
object-fit: cover;
```

Do not force unnecessary cropping when the source is already square.

Russian alt:

`Фотография И. Р. Бадретдинова.`

English alt:

`A photograph of I. R. Badretdinov.`

The image should close the visual narrative.

Do not place it in a small avatar circle.

## 9. Contacts

The About preview states that contacts can be found on the About page.

Therefore, include a calm contact row near or below the final image.

Use the same shared social data as the footer:

- GitHub;
- YouTube;
- Telegram status;
- SoundCloud;
- Bandcamp.

Do not add an email address or contact form.

Telegram has no URL yet.

Render:

Russian:

`Telegram — скоро`

English:

`Telegram — soon`

## 10. Image validation

Before implementation, verify that all supplied files exist.

If one is missing:

- report the missing exact path;
- preserve a valid layout;
- do not invent or download a replacement;
- do not silently use an unrelated image.

## 11. Forbidden patterns

Do not use:

- generic timeline circles;
- résumé cards;
- achievement badges;
- progress percentages;
- skill icons;
- employment history;
- education history;
- invented dates;
- invented metrics;
- fake film perforations repeated excessively;
- a heavy VHS overlay;
- autoplay video;
- audio.
