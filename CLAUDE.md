# CLAUDE.md — Sacramento Senior Living Directory

This file is read by Claude Code at the start of every session. Keep it tight; deeper context lives in `PROJECT.md`.

## What this project is

Sacramento Senior Living Directory — a free directory helping families find assisted living, memory care, board & care homes (RCFEs), and other senior housing in the Sacramento metro area. Goal: become the most trusted local alternative to A Place for Mom and Caring.com, and the dominant local SEO presence in the Sacramento metro for senior care queries.

Domain: sacramentoelderlycare.com
Brand: **Sacramento Senior Living Directory**
(NOT "Sacramento Senior Care" — that is a different business owned by a partner. Strict separation: never use "Sacramento Senior Care" as the brand name anywhere in the site, meta tags, content, or copy. Listings of facilities owned by Sacramento Senior Care are fine, but the directory itself is a separate brand.)

## Tech stack

- **Frontend:** Vite + React (originally scaffolded by Lovable)
- **Hosting:** Netlify (auto-deploys from `main` branch)
- **Repo:** GitHub
- **Domain DNS:** points to Netlify

## SEO is the product

This is an SEO-driven directory. Every architectural decision must be evaluated through "does this help us rank and convert family-side senior care searches?" Specifically:

- **Every page must have unique, accurate `<title>`, `<meta description>`, canonical URL, and OG tags.** No defaults, no duplicates.
- **Every page must include valid JSON-LD schema** appropriate to its type (LodgingBusiness for facilities, ItemList for city pages, Article for guides, FAQPage where applicable).
- **URL structure uses subfolders, never subdomains or query params for canonical content.** See PROJECT.md §3.
- **No client-rendered-only content for indexable pages.** If a page should rank, its meaningful content must be in the initial HTML response. We are on Vite + React, which means we will need prerendering or eventual SSG migration — flag this when adding pages that depend on client fetch.
- **Internal links are mission-critical.** When you add a new page, also update relevant index pages, navigation, and breadcrumbs to link to it.
- **Site speed:** target LCP < 2.5s, INP < 200ms, CLS < 0.1. Optimize images aggressively. Lazy-load below the fold.
- **Mobile-first and accessible:** WCAG AA minimum. Our users include seniors and stressed family members.

## Working conventions

- **Branches:** `feat/`, `fix/`, `seo/`, `content/`, `chore/` prefixes. One logical change per branch.
- **Commits:** conventional commits (`feat:`, `fix:`, `seo:`, `content:`, `refactor:`, `chore:`).
- **PRs:** descriptive title, body explains the *why*, includes a checklist of what was changed, mentions any visual/SEO impact. Link to relevant PROJECT.md section.
- **Don't bundle unrelated changes.** A rebrand PR shouldn't also refactor the data layer.
- **Don't break existing rankings.** Before changing URLs, set up 301 redirects in `netlify.toml` or `_redirects`. Before removing pages, check if they have inbound links or organic traffic (ask the user).
- **Test before declaring done.** `npm run build` must pass. Visit the changed pages in the dev server. Check the browser console for errors.

## Content & voice

- **Tone:** clear, calm, helpful. We are talking to people in a stressful life situation (placing a parent in care). Never breezy, never salesy, never euphemistic. Direct and respectful.
- **Reading level:** ~8th grade. Short paragraphs, plain language.
- **No fake urgency, no clickbait, no manufactured testimonials.**
- **Cite authoritative sources** for cost data, regulations, medical info: California DSS, Genworth Cost of Care, AARP, Alzheimer's Association, Medicare.gov, CA HCD.
- **YMYL discipline:** senior care is Your Money or Your Life content. Be accurate, current, and conservative.

## Things to avoid

- Don't add new dependencies without flagging the reason — every dep is a future maintenance cost and potential bundle bloat.
- Don't write client-side-only landing pages for SEO content.
- Don't generate placeholder content like "Lorem ipsum" or "[city]" templates without filling them.
- Don't reference the previous brand "Sacramento Senior Care Directory" anywhere in new code or content.
- Don't add tracking pixels, ad SDKs, or social SDKs without explicit instruction.
- Don't change phone numbers, addresses, or facility information without confirming with the user.

## When you're unsure

- Read `PROJECT.md` for deeper context.
- Look at the relevant data file in `/data/` for facility/city info.
- If something feels ambiguous, ask a focused question rather than guessing.
- For SEO trade-offs, default to "what would Google's documentation tell us to do?" — not what feels clever.
