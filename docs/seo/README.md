
### Базовые метатеги (`index.html`)
- `<html lang="ru">` — язык страницы;
- `<meta charset="UTF-8">` и `<meta name="viewport">` — кодировка и адаптивность;
- `<title>CUT & CO — барбершоп в Новосибирске</title>` — уникальный заголовок вместо «Vite + React»;
- `<meta name="description">` — описание для сниппета;
- Open Graph (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`) — превью ссылки в соцсетях и мессенджерах. Картинка `public/images/og-cover.png` (1200×630) — скриншот прод-сборки сайта.

### Структура заголовков
- На странице ровно один `<h1>` («Хорошая стрижка начинается здесь.» в Hero);
- разделы (`Услуги`, `Команда`, `О нас`, `Контакты`) — `<h2>`, карточки внутри них — `<h3>`: уровни идут последовательно, без пропусков;
- логотип в шапке — ссылка, а не заголовок.

### robots.txt (`public/robots.txt`)
- `User-agent: *` + `Disallow: /api/` — API закрыто от сканирования;
- отдельная группа для Яндекса (`User-agent: Yandex`) с `Clean-param` для UTM-меток;
- строка `Sitemap: https://example.com/sitemap.xml`.

### sitemap.xml (`public/sitemap.xml`)
Приложение — SPA: одна страница, навигация якорями (`#services` и т.д.), поэтому в карте один URL главной страницы. Абсолютный адрес с доменом-заглушкой `https://example.com` — заменить на реальный домен при публикации. Добавлен `<lastmod>`.

### Закрытие API от индексации
- Заголовок `X-Robots-Tag: noindex, nofollow` добавлен:
  - в код Flask (`@app.after_request` для всех `/api/*`);
  - в конфигурацию nginx (`add_header ... always` в `location /api/` — покрывает ответы фронтенд-контейнера).
- Проверка: `curl -I http://localhost:5000/api/health` → заголовок присутствует в Response Headers.

### Скорость (базово)
- В nginx включено gzip-сжатие (`gzip on`, `gzip_types`, `gzip_min_length`) для текстовых ресурсов.

## Что не применимо / оставлено на потом

- **noindex на закрытых страницах** — в проекте нет страниц входа, регистрации и личного кабинета (SPA-лендинг), добавлять некуда. При появлении таких маршрутов метатег добавляется на них.
- **Генерация sitemap с бэкенда** — когда появятся динамические страницы (карточки барберов и т.п.), карту нужно будет генерировать на бэкенде из БД.
- Метрики Core Web Vitals, lazy loading и code splitting — по плану курса на следующих практических занятиях.

## Замеры Lighthouse (категория SEO, Desktop, прод-сборка)

| Этап | Оценка | Отчёт |
|------|--------|-------|
| До   | 73/100 | `before.report.html` / `.json` |
| После | см. `after.report.json` | `after.report.html` / `.json` |

Проваленные проверки «до»: отсутствовали `<title>`, meta description, валидный robots.txt.
Запуск замера: `npm run build && npm run preview`, затем Lighthouse по `http://localhost:4173`
(режим инкогнито, категория SEO).
