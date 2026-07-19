# Embedded Systems Portfolio

Personal portfolio for **Rithik Sharon A** — an embedded-systems / firmware–focused workstation UI backed by a headless CMS.

Visitors get a HUD-style site (PCB backdrop, radar, oscilloscope, terminal assistant). Content is edited in Strapi and rendered by a Next.js frontend.

---

## Architecture

```
my-portfolio/
├── portfolio-frontend/     # Next.js 16 + React 19 (App Router)
└── portfolio-cms/          # Strapi 5 (SQLite in local dev)
```

| Layer | Role |
|--------|------|
| **Frontend** | Marketing site, animations, Firmware Inspector, UART-style chat terminal |
| **CMS** | All copy, projects, stack, services, SEO, boot/terminal chrome |
| **Chat API** | `POST /api/chat` — builds context from Strapi, calls OpenRouter |

```
Browser ──► Next.js (localhost:3000)
               │
               ├── fetch ──► Strapi REST (localhost:1337/api/*)
               └── /api/chat ──► OpenRouter (optional)
```

---

## Tech stack

**Frontend**

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4, Framer Motion
- Lucide icons

**CMS**

- Strapi 5
- SQLite (`better-sqlite3`) for development
- Draft & publish on content types

**AI assistant**

- OpenRouter (default free model: `google/gemini-2.0-flash-exp:free`)
- Portfolio facts loaded live from Strapi on each chat request

---

## Prerequisites

- **Node.js** `20`–`24` (required by Strapi)
- **npm** 6+
- Optional: [OpenRouter](https://openrouter.ai/keys) API key for the terminal assistant

---

## Quick start

### 1. Clone and install

```bash
git clone <your-repo-url>
cd my-portfolio

cd portfolio-cms && npm install && cd ..
cd portfolio-frontend && npm install && cd ..
```

### 2. Configure environment

**CMS** — copy and edit secrets:

```bash
cd portfolio-cms
cp .env.example .env
```

Generate secrets (run once, paste into `.env`):

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

Fill `APP_KEYS` (comma-separated), `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, and `ENCRYPTION_KEY`.

**Frontend** — copy and edit:

```bash
cd portfolio-frontend
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_STRAPI_URL` | Yes | Strapi base URL (default `http://localhost:1337`) |
| `OPENROUTER_API_KEY` | For chat | OpenRouter key; without it the terminal still works for slash commands |
| `OPENROUTER_MODEL` | No | Override chat model |

### 3. Run locally

Use two terminals.

**Terminal A — CMS**

```bash
cd portfolio-cms
npm run develop
```

- Admin: [http://localhost:1337/admin](http://localhost:1337/admin)
- API: [http://localhost:1337/api](http://localhost:1337/api)

On first run, create the Strapi admin user.

**Terminal B — Frontend**

```bash
cd portfolio-frontend
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)

### 4. Enable public API access

In Strapi Admin → **Settings → Users & Permissions → Roles → Public**, allow `find` / `findOne` (as needed) for:

- Hero, About, Project, Stack-item, Service, Contact, Site-setting

Without this, the frontend will render empty sections.

Publish your entries (draft & publish is enabled).

---

## Content model (Strapi)

| Content type | Purpose |
|--------------|---------|
| **Hero** | Hero words, profile, pills, nav/CTAs, CORE & debugger rows, resume, tagline chrome |
| **About** | Section heading, bio rows, stats, focus / philosophy / learning |
| **Project** | Case studies + media (images, diagrams, video), inspector fields |
| **StackItem** | Tech by domain (Firmware, MCU, RTOS, …), optional icon |
| **Service** | Numbered service offerings |
| **Contact** | Headings, CTA, social links, handshake labels |
| **SiteSettings** | SEO, logo, marquee, section titles, boot screen, terminal copy & commands |

### Text field formats

Used in Hero / SiteSettings text fields:

```text
# Nav / KV rows  (LABEL|VALUE per line)
SYSTEMS|#work
CORE|ARM Cortex-M4

# Terminal commands  (cmd|response per line)
help|Available: help · projects · …
contact|Email: you@example.com · …

# Lists
statusTags → comma-separated
typedLines / bootLines → one line per entry
marqueeLine1/2 → comma-separated words
```

Edit content in Admin, publish, refresh the Next site (fetches use `cache: 'no-store'`).

---

## Frontend structure

```
portfolio-frontend/src/
├── app/
│   ├── page.tsx              # Composes all sections from Strapi
│   ├── layout.tsx            # SEO / Open Graph from SiteSettings
│   ├── api/chat/route.ts     # OpenRouter + Strapi context
│   └── globals.css           # Theme tokens, hero, responsive rules
├── components/
│   ├── sections/             # Hero, About, Projects, Stack, Services, Contact
│   ├── ChatBot/TerminalDock.tsx
│   ├── BootLoader.tsx
│   └── svg/                  # PCB background, dividers, radar helpers
├── context/InstrumentBus.tsx # Project inspector + tech filter bus
├── lib/
│   ├── strapi.ts             # REST fetch helpers
│   └── cmsText.ts            # Parsers for LABEL|VALUE blobs
└── types/index.ts            # Shared CMS TypeScript types
```

### Notable UI pieces

- **Hero workstation** — 3-column HUD, oscilloscope, radar, resume CTA, PCB layered background
- **Firmware Inspector** — slide-over project detail panel
- **Terminal dock** — boot sequence, slash commands from CMS, free-form AI chat
- **Boot loader** — first-visit splash driven by SiteSettings

---

## Scripts

### Frontend (`portfolio-frontend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

### CMS (`portfolio-cms`)

| Command | Description |
|---------|-------------|
| `npm run develop` | Strapi with admin rebuild / watch |
| `npm run build` | Build admin panel |
| `npm run start` | Production Strapi |
| `npm run console` | Strapi REPL |

---

## Production notes

1. Point `NEXT_PUBLIC_STRAPI_URL` at your deployed Strapi URL.
2. Prefer **PostgreSQL** for Strapi in production (see comments in `portfolio-cms/.env.example`).
3. Keep `OPENROUTER_API_KEY` server-side only (never prefix with `NEXT_PUBLIC_`).
4. Configure CORS on Strapi for your frontend origin.
5. Place `resume.pdf` in `portfolio-frontend/public/` (or set Hero `resumeUrl` to an absolute URL).
6. Upload an **ogImage** under SiteSettings for social previews.

---

## Design direction

- Palette: deep substrate `#070B0F` / `#010509`, cyan `#00D4FF`, teal `#00FFE5`
- Typography: Syne (display), Space Grotesk (body), DM Mono (instrument chrome)
- Mood: powered STM32-style board under a protective overlay — subtle copper traces, not neon wallpaper

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank sections | Public permissions + publish content in Strapi |
| Chat says “not configured” | Set `OPENROUTER_API_KEY` in `.env.local` and restart Next |
| CORS / fetch errors | Confirm `NEXT_PUBLIC_STRAPI_URL` and Strapi is running |
| Schema changes not visible | Restart `npm run develop` in `portfolio-cms` |
| New CMS fields empty | Frontend uses defaults until you fill & publish in Admin |

---

## License

Private / personal portfolio — all rights reserved unless otherwise noted.
