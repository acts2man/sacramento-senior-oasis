# Sacramento Senior Living Directory

A free directory helping families find assisted living, memory care, board and care homes (RCFEs), and other senior housing in the Sacramento metro area.

Production domain: [sacramentoelderlycare.com](https://sacramentoelderlycare.com)

## Tech stack

- **Framework:** Vite 5 + React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn-ui (Radix primitives)
- **Routing:** React Router 6
- **Head tags:** `react-helmet-async`
- **Forms:** [Netlify Forms](https://docs.netlify.com/forms/setup/) (no third-party form/email SDK)
- **Hosting:** Netlify (auto-deploys from `main`)

## Local development

Requires Node.js 18+ and npm.

```sh
npm install
npm run dev      # dev server on http://localhost:8080
npm run build    # production build (also regenerates public/sitemap.xml)
npm run preview  # preview the production build locally
npm run lint     # ESLint
```

The sitemap is generated from `src/data/locations.ts` at build time via a Vite plugin in `vite.config.ts` — never edit `public/sitemap.xml` by hand.

## Project conventions

Read [CLAUDE.md](./CLAUDE.md) before contributing — it covers branding rules, content voice, SEO requirements, and the things to avoid. [PROJECT.md](./PROJECT.md) has the deeper strategic brief: site architecture, page templates, schema standards, and the phased build plan.

## Forms

The site uses Netlify Forms exclusively. Each form has a hidden static mirror in [`index.html`](./index.html) so Netlify's build-time scanner can register the fields, and the React component POSTs URL-encoded data to `/` with a matching `form-name`.

Current forms:

| `form-name` | Component | Purpose |
|---|---|---|
| `contact` | `src/components/ContactForm.tsx` | General contact / lead capture (used on `/contact` and on each facility detail page) |
| `care-recommendations` | `src/components/CareRecommendationsSection.tsx` | Personalized care recommendation request (longer form: care type, timeline, budget) |

**Notification routing is configured per-form in the Netlify dashboard**, not in this repo — Netlify → Site → Forms → *form-name* → Settings & usage → Form notifications.

## Branding

The directory is **Sacramento Senior Living Directory**. Do **not** use "Sacramento Senior Care" as the brand anywhere — that is a separate business owned by a partner. Listings of facilities owned by Sacramento Senior Care are fine; the directory itself is a separate brand.
