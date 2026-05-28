# Supawat Group Website

Marketing website for **Supawat Group Sole (SG)** — a Thai–Lao co-creation hub for
crispy-fruit processing, knowledge transfer, and sustainable agriculture.

Built with **Next.js 16 (App Router)** + **Tailwind CSS v4**.

---

## Features

- **Trilingual content** — ไทย / ລາວ / English with `app/[locale]` routing and a
  `NEXT_LOCALE` cookie. The `proxy.ts` redirects bare paths (e.g. `/`, `/about`)
  to the visitor's preferred locale.
- **Locale switcher** in the top NavBar.
- **Brand-aligned design** based on the official CI Manual (Quality · Sustainability ·
  Co-Creation), using PNG logos provided by the design team.
- **Admin area** at `/<locale>/admin` (protected by an HMAC-signed cookie session)
  to edit basic company info — name, tagline, vision/mission, story, and contact —
  per language. Saves write back to `content/company-profile.<locale>.json` and
  `revalidatePath()` refreshes every locale's public pages.

---

## Tech stack

| Layer        | Choice                                         |
|--------------|------------------------------------------------|
| Framework    | Next.js 16 (App Router, Server Actions)        |
| Styling      | Tailwind CSS v4                                |
| Fonts        | Kanit (display) + Sarabun (body)               |
| Auth         | HMAC-signed cookie session (no DB)             |
| Content      | JSON files per locale in `content/`            |
| i18n         | Local dictionaries in `i18n/dictionaries/`     |

---

## Getting started

```bash
npm install
cp .env.example .env.local   # set ADMIN_USERNAME / ADMIN_PASSWORD / AUTH_SECRET
npm run dev
# → http://localhost:3006
```

The default credentials in `.env.example`:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=supawat2026
```

Change these for any non-local environment, and set a long random `AUTH_SECRET`.

---

## Project layout

```
app/
  layout.tsx               # Root html/body, fonts, favicon
  [locale]/
    layout.tsx             # NavBar + Footer + metadata per locale
    page.tsx               # Home
    about/page.tsx
    services/page.tsx
    contact/page.tsx
    login/                 # Admin sign-in (Server Action)
    admin/                 # Admin editor (Server Action + revalidate)
components/site/
  NavBar.tsx
  Footer.tsx
  LocaleSwitcher.tsx       # Client component, cookies + router.replace
content/
  company-profile.th.json
  company-profile.lo.json
  company-profile.en.json
i18n/
  config.ts                # locales, default, names, flags
  dictionaries.ts          # server-only dictionary loader
  dictionaries/{th,lo,en}.json
lib/
  auth.ts                  # HMAC session + bcrypt-free credential check
  content.ts               # read/write profile JSON
proxy.ts                   # locale redirect (Next.js 16 replacement for middleware)
public/brand/logos/        # logo-01.png … logo-16.png from the CI Manual
```

---

## Content workflow

1. Sign in at `/<locale>/login` with the admin credentials.
2. The editor at `/<locale>/admin` lets you toggle between TH / LO / EN tabs and
   edit each language's content.
3. Hit **Save** — the corresponding `content/company-profile.<locale>.json` is
   rewritten and every public route is revalidated.

For richer fields (services, brand DNA, stats), edit the JSON files directly and
commit. The admin UI focuses on the most frequently changed copy.

---

## Notes

- The site is fully **light-mode** by design (matches the printed CI Manual).
- The admin filesystem writes work locally; if deployed to a read-only platform
  (e.g. Vercel) the content edits should be backed by a real CMS / database.
- Logo assets in `public/brand/logos/` come from the official Google Drive folder
  shared by the design team.
