# Embedded Systems Portfolio

Personal portfolio for **Rithik Sharon A** — an embedded-systems / firmware–focused workstation UI powered by a Next.js frontend and static content.

Visitors get a HUD-style site (PCB backdrop, radar, oscilloscope, terminal assistant). All copy and project data live in a single TypeScript file — no CMS required.

---

## Architecture

```
my-portfolio/
└── portfolio-frontend/     # Next.js 16 + React 19 (App Router)
```

| Layer | Role |
|--------|------|
| **Frontend** | Marketing site, animations, Firmware Inspector, UART-style chat terminal |
| **Content** | `src/lib/portfolio-data.ts` — hero, about, projects, stack, services, contact, site settings |
| **Chat API** | `POST /api/chat` — builds context from static data, calls OpenRouter |

```
Browser ──► Next.js (localhost:3000)
               │
               ├── reads ──► src/lib/portfolio-data.ts
               └── /api/chat ──► OpenRouter (optional)
```

---

## Tech stack

**Frontend**

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4, Framer Motion
- Lucide icons

**AI assistant**

- OpenRouter (default free model: `google/gemini-2.0-flash-exp:free`)
- Portfolio facts loaded from `portfolio-data.ts` on each chat request

---

## Prerequisites

- **Node.js** 18+
- **npm** 6+
- Optional: [OpenRouter](https://openrouter.ai/keys) API key for the terminal assistant

---

## Quick start

### 1. Clone and install

```bash
git clone <your-repo-url>
cd my-portfolio/portfolio-frontend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | For chat | OpenRouter key; without it the terminal still works for slash commands |
| `OPENROUTER_MODEL` | No | Override chat model (default `google/gemini-2.0-flash-exp:free`) |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL for OpenRouter referer header |

### 3. Run locally

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)

---

## Editing content

All site content is in **`portfolio-frontend/src/lib/portfolio-data.ts`**.

| Export | Purpose |
|--------|---------|
| **hero** | Hero words, profile, pills, nav/CTAs, CORE & debugger rows, resume, tagline chrome |
| **about** | Section heading, bio rows, stats, focus / philosophy / learning |
| **projects** | Case studies + inspector fields (media optional via `MediaRef` URLs) |
| **stackItems** | Tech by domain (Firmware, MCU, RTOS, …) |
| **services** | Numbered service offerings |
| **contact** | Headings, CTA, social links, handshake labels |
| **siteSettings** | SEO, logo, marquee, section titles, boot screen, terminal copy & commands |

### Text field formats

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

Edit the file, save, and refresh — no publish step.

---

## Frontend structure

```
portfolio-frontend/src/
├── app/
│   ├── page.tsx              # Composes all sections from static data
│   ├── layout.tsx            # SEO / Open Graph from siteSettings
│   ├── api/chat/route.ts     # OpenRouter + portfolio context
│   └── globals.css           # Theme tokens, hero, responsive rules
├── components/
│   ├── sections/             # Hero, About, Projects, Stack, Services, Contact
│   ├── ChatBot/TerminalDock.tsx
│   ├── BootLoader.tsx
│   └── svg/                  # PCB background, dividers, radar helpers
├── context/InstrumentBus.tsx # Project inspector + tech filter bus
├── lib/
│   ├── portfolio-data.ts     # Single source of truth for all content
│   ├── strapi.ts             # Async fetch wrappers over static data
│   └── cmsText.ts            # Parsers for LABEL|VALUE blobs
└── types/index.ts            # Shared TypeScript types
```

### Notable UI pieces

- **Hero workstation** — 3-column HUD, oscilloscope, radar, resume CTA, PCB layered background
- **Firmware Inspector** — slide-over project detail panel
- **Terminal dock** — boot sequence, slash commands, free-form AI chat
- **Boot loader** — first-visit splash driven by siteSettings

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

---

## Deploy to Vercel

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Set **Root Directory** to `portfolio-frontend`
4. Add environment variables:
   - `OPENROUTER_API_KEY` = your OpenRouter key
   - `OPENROUTER_MODEL` = `google/gemini-2.0-flash-exp:free` (optional)
5. Deploy

### Production notes

1. Set `NEXT_PUBLIC_SITE_URL` to the public frontend URL.
2. Keep `OPENROUTER_API_KEY` server-side only (never `NEXT_PUBLIC_`).
3. Place `resume.pdf` in `portfolio-frontend/public/` (or set Hero `resumeUrl`).
4. Never commit `.env` / `.env.local` / `.env.production` (gitignored).

### Security checklist

- [ ] Chat route rate-limits (~20 req/min/IP) and caps message length
- [ ] Security headers enabled via `next.config.ts` (`X-Content-Type-Options`, `X-Frame-Options`, etc.)
- [ ] Run `npm audit` before each deploy

### Known dependency notes

- Remaining `postcss` advisory is inside Next.js itself; do **not** run `npm audit fix --force` (it downgrades Next).

---

## Design direction

- Palette: deep substrate `#070B0F` / `#010509`, cyan `#00D4FF`, teal `#00FFE5`
- Typography: Syne (display), Space Grotesk (body), DM Mono (instrument chrome)
- Mood: powered STM32-style board under a protective overlay — subtle copper traces, not neon wallpaper

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Chat says “not configured” | Set `OPENROUTER_API_KEY` in `.env.local` and restart Next |
| Content not updating | Edit `src/lib/portfolio-data.ts` and refresh / rebuild |
| Blank resume download | Add `public/resume.pdf` or update `hero.resumeUrl` |

---

## License

Private / personal portfolio — all rights reserved unless otherwise noted.
