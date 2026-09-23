# CUT & CO — React + Tailwind template

Минималистичный шаблон барбершопа без готовых фотографий.

## Запуск
npm install
npm run dev

## Сборка
npm run build

## Как добавить свои фото
Положите изображения в `public/images/` и замените компоненты `<Placeholder />` в `src/main.jsx` на обычные:
`<img src="/images/hero.jpg" alt="..." className="h-full w-full object-cover" />`

Все основные цвета, размеры и адаптивность сделаны Tailwind-классами. Можно спокойно менять текст, цены, контакты и фотографии.
