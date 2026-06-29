# Sacramento Assisted Living Directory

A free directory helping families find assisted living, memory care, board and care homes (RCFEs), and other senior housing in the Sacramento metro area.

Production domain: [sacramentoelderlycare.com](https://sacramentoelderlycare.com)

## Tech stack

- **Framework:** Vite 5 + React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn-ui (Radix primitives)
- **Routing:** React Router 6
- **Head tags:** `react-helmet-async`
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

## Branding

The directory is **Sacramento Assisted Living Directory**. Do **not** use "Sacramento Senior Care" as the brand anywhere — that is a separate business owned by a partner. Listings of facilities owned by Sacramento Senior Care are fine; the directory itself is a separate brand.
