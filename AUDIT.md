# Repository Audit — Sacramento Senior Living Directory

Date: 2026-05-06
Branch: `claude/audit-repo-structure-nP16D`
Scope: read-only audit of the current state of the repo against `CLAUDE.md` / `PROJECT.md`.

This is a survey of what exists, what's missing, and what would block a clean deploy. No code was changed.

---

## 1. File structure (top 3 levels)

```
sacramento-senior-oasis/
├── CLAUDE.md
├── PROJECT.md
├── README.md                       (default Lovable boilerplate, unchanged)
├── bun.lockb                       (bun lockfile alongside package-lock.json — pick one)
├── components.json                 (shadcn-ui config)
├── eslint.config.js
├── index.html                      (Lovable default meta tags, see §5)
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vite.config.ts
├── public/
│   ├── _redirects                  (single SPA rewrite, see §5)
│   ├── favicon.ico
│   ├── placeholder.svg
│   ├── robots.txt
│   ├── sitemap.xml                 (hardcoded, broken URLs — see §5)
│   └── lovable-uploads/            (~120 untyped PNGs, all uploaded by Lovable)
└── src/
    ├── App.css
    ├── App.tsx                     (BrowserRouter + 8 routes, see §6)
    ├── main.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── components/                 (16 components + ui/ shadcn primitives)
    ├── data/
    │   └── locations.ts            (single source of facility data, ~1170 lines)
    ├── hooks/                      (use-mobile, use-toast)
    ├── lib/
    │   └── utils.ts
    ├── pages/                      (Index, Locations, LocationDetail, About, Contact,
    │                                MemoryCare, AssistedLiving, NotFound)
    └── utils/
        ├── seoUtils.ts             (per-page title/desc + per-location JSON-LD builder)
        └── sitemapGenerator.ts     (function only — never wired to the build)
```

Notable absences (relative to PROJECT.md):

- **No `netlify.toml`** — no redirect rules for old URLs, no header config, no build settings checked into the repo.
- **No `/data/cities.json`, `/data/facilities.json`, `/data/care-types.json`, `/data/editorial/`** — PROJECT.md §4 mandates these; only `src/data/locations.ts` exists.
- **No `/lib/schema/`** — PROJECT.md §6 calls for reusable schema builders (`buildFacilitySchema`, `buildBreadcrumbSchema`, etc.). None exist.
- **No prerendering or SSG plugin** — see §5; this is a pure CSR app, which directly violates the "indexable content must be in the initial HTML response" rule in CLAUDE.md.
- **No `.env*` / no `import.meta.env` usage at all** (see §7).

---

## 2. Vite + React setup

From `package.json`:

| Package | Version | Notes |
|---|---|---|
| `vite` | `^5.4.1` | runtime resolved to 5.4.10 |
| `@vitejs/plugin-react-swc` | `^3.5.0` | SWC, not Babel |
| `react` / `react-dom` | `^18.3.1` | |
| `react-router-dom` | `^6.26.2` | |
| `react-helmet-async` | `^2.0.5` | head tag injection (CSR only) |
| `@tanstack/react-query` | `^5.56.2` | imported but no actual queries in code |
| `tailwindcss` | `^3.4.11` | + `@tailwindcss/typography` |
| `lovable-tagger` | `^1.1.7` | dev-mode plugin from Lovable, see below |
| `@emailjs/browser` | `^4.4.1` | contact form delivery, hardcoded keys (§7) |
| `typescript` | `^5.5.3` | |

Full Radix UI suite (~25 packages) plus `embla-carousel`, `recharts`, `vaul`, `cmdk`, `sonner`, `react-day-picker`, `input-otp`, `react-hook-form`, `zod`, `next-themes` — all from the shadcn template, most unused on actual pages.

`vite.config.ts`:

```ts
plugins: [
  react(),
  mode === 'development' && componentTagger(),  // lovable-tagger
].filter(Boolean),
resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
server: { host: "::", port: 8080 },
```

- `componentTagger()` from `lovable-tagger` only runs in dev. Safe to keep, but tied to Lovable.
- **No build-time prerender / SSG / sitemap / image-optimization plugins.**
- **No code splitting config.** The build outputs a single 528 KB JS chunk (155 KB gzip) and Vite warns about it.

Build status: `npm run build` succeeds locally (Vite 5.4.10, 1726 modules, ~5s). Dev server is not exercised in this audit.

---

## 3. Where facility data lives

The CLAUDE.md/PROJECT.md instruction is "All facility, city, and editorial data lives in structured form in `/data/`, NOT hardcoded in components." Current state: **all facility data lives in a single TypeScript module**, not the schema PROJECT.md §4 describes.

| Location | What's there |
|---|---|
| `src/data/locations.ts` | Single `LocationType` interface and a `locations: LocationType[]` array of **24 facilities**. Plus helper fns `getAllLocations`, `getLocationById`, `getFeaturedLocations`, `searchLocations`, and a `getCareTypes()` returning a hardcoded list of 4 care types. This is the only real "data" file. |
| `src/utils/seoUtils.ts` | A second hardcoded data structure `customLocationSEO: Record<string, {title, description}>` with 24 entries — but the **keys do not match the location IDs in `locations.ts`** for several entries (see §8 — silent SEO regressions). |
| `src/components/LocationAreas.tsx` | Hardcoded inline array of 4 Sacramento "areas" (Carmichael, Elk Grove, Midtown, Natomas) with descriptions, highlights, and **made-up facility counts** (12, 15, 8, 6) used in homepage cards. |
| `src/components/CareImageShowcase.tsx` | Hardcoded inline `careImages` array (image URLs and copy). |
| `src/components/CareTypes.tsx` | Pulls from `getCareTypes()` (which is a hardcoded array inside `locations.ts`). |
| `src/components/FeaturedLocations.tsx` | Pulls from `getFeaturedLocations()`. |
| `src/pages/MemoryCare.tsx` / `src/pages/AssistedLiving.tsx` | Filter `getAllLocations()` by string-matching service names — fragile, not driven by `care_types`. |
| `src/pages/Locations.tsx` | Hardcoded filter UI (care types, areas, price ranges) that **does nothing** — checkboxes are not wired to state. |
| `src/utils/sitemapGenerator.ts` | Function that would generate a sitemap from `getAllLocations()` — **never called**. The committed `public/sitemap.xml` was hand-written and is now drifted (§5, §8). |

The `LocationType` shape is far thinner than the `Facility` schema in PROJECT.md §4: missing `license_number`, `license_status`, `license_type`, `capacity`, `year_opened`, `care_types[]`, `room_types`, `languages`, `religious_affiliation`, `lgbtq_friendly`, `va_accepted`, `medicaid_accepted`, `pet_friendly`, `description_long`, `reviews[]`, `date_added`, `date_updated`, `is_partner`, `neighborhood`, `county`, `dba`. The current `pricing: { starting, average }` is also less expressive than the spec's `price_range_low/high`.

---

## 4. References to the old brand "Sacramento Senior Care" / "Sacramento Senior Care Directory"

CLAUDE.md is unambiguous: this name must not appear anywhere on the site (it's a different business owned by a partner). Current occurrences:

**Visible on every page (header/footer, mounted on every route):**

- `src/components/Header.tsx:22` — `alt="Sacramento Senior Care"` on the logo image.
- `src/components/Footer.tsx:14` — `<h3>Sacramento Senior Care</h3>` (footer column heading).
- `src/components/Footer.tsx:88` — `© {year} Sacramento Senior Care Directory.`

**Visible in body content:**

- `src/components/TrustedCareSection.tsx:17` — "Sacramento Senior Care helps families find the right Assisted living community…"
- `src/pages/About.tsx:25` — `<h1>About Sacramento Senior Care</h1>`
- `src/pages/About.tsx:28` — body copy "Welcome to Sacramento Senior Care, your trusted resource…"
- `src/pages/MemoryCare.tsx:170` — "Sacramento Senior Care makes it easy to find trusted memory care…"
- `src/pages/AssistedLiving.tsx:176` — "At Sacramento Senior Care, we help you explore…"

**SEO / meta tags (every page that uses `<SEO>`):**

- `src/components/SEO.tsx:23` — `const fullTitle = title.includes('Sacramento Senior Care') ? title : ${title} | Sacramento Senior Care;` — appends the wrong brand to every page title.
- `src/utils/seoUtils.ts:161` — homepage title `'Sacramento Senior Care - Find the Best Senior Living Communities'`.
- `src/utils/seoUtils.ts:163` — about title.
- `src/utils/seoUtils.ts:164` — contact title.
- `src/utils/seoUtils.ts:170` — about description.
- `src/utils/seoUtils.ts:171` — contact description.
- `src/utils/seoUtils.ts:175` — fallback title template.
- `src/utils/seoUtils.ts:176` — fallback description.
- All 24 entries in `customLocationSEO` end with `| Sacramento Assisted Living & Senior Care` — same brand stem.

**Email addresses and canonical URLs use `sacramentoseniorcare.com` (not the project domain `sacramentoelderlycare.com`):**

- `src/components/Footer.tsx:79` — `mailto:info@sacramentoseniorcare.com`
- `src/components/ContactSection.tsx:53-54` — `info@sacramentoseniorcare.com` (text + link)
- `src/pages/Contact.tsx:73` — `mailto:info@sacramentoseniorcare.com`
- `src/pages/Index.tsx:24` — `canonical="https://sacramentoseniorcare.com"`
- `src/pages/Locations.tsx:55` — `canonical="https://sacramentoseniorcare.com/locations"`
- `src/pages/About.tsx:16` — `canonical="https://sacramentoseniorcare.com/about"`
- `src/pages/Contact.tsx:18` — `canonical="https://sacramentoseniorcare.com/contact"`
- `src/pages/LocationDetail.tsx:94` — `canonical="https://sacramentoseniorcare.com/${location.id}"`

`public/sitemap.xml` and `src/utils/sitemapGenerator.ts` use the correct `sacramentoelderlycare.com`. **Canonical tags and the sitemap point at different domains.** Google will canonicalise inconsistently; this is an active SEO bug.

CLAUDE.md/PROJECT.md are the only files that legitimately mention the old brand name (in instructions about not using it). No production-relevant files should retain the name.

---

## 5. SEO basics — file by file

### `index.html` (the initial HTML response — the only HTML Google sees before JS executes)

| Tag | Current value | Status |
|---|---|---|
| `<title>` | `sacramento-senior-oasis` | ✗ default project slug |
| `<meta name="description">` | `Lovable Generated Project` | ✗ Lovable default |
| `<meta name="author">` | `Lovable` | ✗ |
| `<link rel="icon">` | `/lovable-uploads/d4c2190a-….png` | partial — favicon is a Lovable upload, not a real logo |
| `<meta property="og:title">` | `sacramento-senior-oasis` | ✗ |
| `<meta property="og:description">` | `Lovable Generated Project` | ✗ |
| `<meta property="og:image">` | `https://lovable.dev/opengraph-image-p98pqg.png` | ✗ external Lovable image |
| `<meta name="twitter:site">` | `@lovable_dev` | ✗ |
| `<meta name="twitter:image">` | `https://lovable.dev/opengraph-image-p98pqg.png` | ✗ |
| `<link rel="canonical">` | (none) | ✗ |
| JSON-LD | (none) | ✗ |
| 3rd-party script | `<script src="https://cdn.gpteng.co/gptengineer.js" type="module">` | external Lovable/GPT Engineer telemetry; explicit comment says "DO NOT REMOVE". Remove for production. |

Because the app is fully client-rendered, **the values above are what Googlebot sees first.** `react-helmet-async` rewrites them in the DOM after JS runs, but search crawlers and link previewers (Slack, iMessage, Twitter) routinely read the static HTML.

### `src/components/SEO.tsx`

A reusable `<SEO>` wrapper around `react-helmet-async`:

- ✓ accepts `title`, `description`, `keywords`, `ogImage`, `ogType`, `canonical`, `jsonLd`
- ✓ emits `<title>`, `description`, `og:*`, `twitter:*`, `canonical`, JSON-LD `<script>`
- ✗ appends "| Sacramento Senior Care" to every title (wrong brand)
- ✗ default `ogImage` is `/placeholder.svg` (a Vite template placeholder)
- ✗ no `og:url`, no `og:site_name`, no `og:locale`, no `robots` meta
- ✗ Helmet runs client-side only — these tags are absent in the initial HTML response

### `src/utils/seoUtils.ts`

- ✓ Per-location title/description objects for ~24 facilities, plus a JSON-LD builder for facility pages.
- ✗ JSON-LD type is `SeniorCareService` — PROJECT.md §6 mandates `LodgingBusiness` for facilities. Also missing `BreadcrumbList`, `AggregateRating` `reviewCount`, `Review` items, `priceRange` formatting issues.
- ✗ The `customLocationSEO` object keys don't match `locations.ts` IDs for at least 8 facilities (see §8). For those, code falls back to auto-generated SEO — silent quality regression.

### Per-page SEO coverage

| Page | `<SEO>` used | `title`/`description` source | `canonical` | JSON-LD |
|---|---|---|---|---|
| `/` (Index) | ✓ | `generatePageSEO('home')` | `sacramentoseniorcare.com` (wrong domain) | ✗ none |
| `/locations` | ✓ | `generatePageSEO('locations')` | wrong domain | ✗ none |
| `/about` | ✓ | `generatePageSEO('about')` | wrong domain | ✗ none |
| `/contact` | ✓ | `generatePageSEO('contact')` | wrong domain | ✗ none |
| `/memory-care` | ✗ no `<SEO>` import | — | ✗ none | ✗ none |
| `/assisted-living` | ✗ no `<SEO>` import | — | ✗ none | ✗ none |
| `/:id` (LocationDetail) | ✓ | `generateLocationSEO(location)` | wrong domain | ✓ `SeniorCareService` (wrong type per spec) |
| `/*` (NotFound) | ✗ | — | — | — |

`/memory-care` and `/assisted-living` have no `<SEO>` wrapper at all — they fall through to the `index.html` defaults ("sacramento-senior-oasis" / "Lovable Generated Project"). These are exactly the head-term landing pages you most need ranking, and they have zero SEO.

### `public/sitemap.xml`

- ✓ Exists, valid XML.
- ✓ Uses correct `sacramentoelderlycare.com`.
- ✗ Hand-written and out of date.
- ✗ **7 of the 24 facility URLs are broken** — see §8 for the diff between sitemap slugs and `locations.ts` IDs.
- ✗ Missing `golden-heritage` is actually present, but `villa-natomas-elderly-care` is the only "long-suffix" facility correctly listed; others (e.g., `vita-bella-elderly-care`) appear as their short stems and 404.
- ✗ `sitemapGenerator.ts` exists but is never called at build time — the file in `public/` is not auto-generated.
- ✗ `lastmod` is hardcoded to `2025-01-26` for every URL.
- ✗ Includes `/contact` but not, e.g., `/`-hreflang or any city × care-type pages (none exist yet).
- ✗ Sitemap is not declared in `robots.txt`.

### `public/robots.txt`

```
User-agent: Googlebot   Allow: /
User-agent: Bingbot     Allow: /
User-agent: Twitterbot  Allow: /
User-agent: facebookexternalhit  Allow: /
User-agent: *           Allow: /
```

- ✓ Doesn't accidentally block crawl.
- ✗ Missing `Sitemap: https://sacramentoelderlycare.com/sitemap.xml` directive.
- ✗ Per-bot allow blocks are pointless given the wildcard at the bottom — fine, just noise.

### `public/_redirects`

```
/* /index.html 200
```

- ✓ Standard Netlify SPA fallback.
- ✗ No 301s for legacy URLs. Once the site moves to PROJECT.md §3 URL structure (`/communities/[slug]/`, `/assisted-living/[city-slug]/`, etc.), this file must be expanded **before** the migration to preserve any inbound links.

### Favicon and OG image

- `public/favicon.ico` exists (size unverified).
- `<link rel="icon">` in `index.html` overrides it with `/lovable-uploads/d4c2190a-….png`.
- No real branded OG image — every share preview pulls from `lovable.dev/opengraph-image-p98pqg.png`.

### Schema / JSON-LD

- Only `LocationDetail` emits JSON-LD (and uses the wrong `@type`). No `BreadcrumbList`, no `Organization`, no `WebSite` with `SearchAction`, no `FAQPage`, no `LodgingBusiness`. The reusable schema builders mandated by PROJECT.md §6 do not exist.

---

## 6. Routing

Library: `react-router-dom@6.26.2`, used via `BrowserRouter` in `src/App.tsx`:

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/"                 element={<Index />} />
    <Route path="/locations"        element={<Locations />} />
    <Route path="/memory-care"      element={<MemoryCare />} />
    <Route path="/assisted-living"  element={<AssistedLiving />} />
    <Route path="/about"            element={<About />} />
    <Route path="/contact"          element={<Contact />} />
    <Route path="/:id"              element={<LocationDetail />} />
    <Route path="*"                 element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

Observations:

- **Facility pages live at `/:id` (root)** — e.g., `/abounding-love-ii` — not at `/communities/[slug]/` per PROJECT.md §3. Every facility URL will need to change, with 301s set up before the move.
- **`/:id` is a greedy catch-all** for any single-segment path. Adding any new top-level route (e.g., `/guides`, `/cost-of-care`, `/es`) requires inserting it **above** `/:id` or it'll be swallowed and rendered as "Location not found".
- No nested routes. No data loaders. No code splitting (`React.lazy` is unused). Every page imports its full data and components into the main bundle.
- The Locations page reads `?search=...` query params client-side, so direct hits to `/locations?search=foo` work but are not indexable as separate URLs (which is correct — query params should not be canonical).

---

## 7. Environment variables, config files, secrets

- **No `.env*` files.** No `import.meta.env` or `process.env` references in the source tree.
- **EmailJS keys are hardcoded** in `src/components/ContactForm.tsx:39-41`:
  - `serviceId = 'service_qklbs5m'`
  - `templateId = 'template_pgkwqc3'`
  - `publicKey  = 'VHqdZf6et7WQV3YAA'`
  - These are EmailJS's "public key" pattern (designed to be exposed to the browser), but they should still move to `import.meta.env.VITE_*` to allow per-environment swap and to remove "live keys" from PRs. The template's `to_email` is set to `your-business-email@example.com` — a placeholder; **submissions currently go nowhere meaningful**.
- **No Netlify config** (`netlify.toml`). All Netlify settings (build command, env vars, headers, redirects beyond `_redirects`) must currently be set via the Netlify UI.
- **No analytics / GA4 / Search Console verification / Microsoft Clarity** anywhere in the code. PROJECT.md §8 phase 1 calls for these.
- **Two lockfiles**: `package-lock.json` and `bun.lockb`. Pick one (npm seems to be the active one — `npm run build` works; the bun lockfile is likely a Lovable artifact).
- `tsconfig.json` is present but not reviewed for strictness here.

---

## 8. Bugs, broken links, deploy blockers

Confirmed problems, ordered roughly by severity:

1. **Sitemap URL drift — 7 broken URLs out of 24 facility entries.** `public/sitemap.xml` lists slugs that don't exist; the live IDs in `src/data/locations.ts` are different. All 7 sitemap URLs return the "Location not found" view (which itself returns HTTP 200 because of `_redirects` — Google will see "soft 404" pages from the sitemap).

   | Sitemap slug (broken) | Actual `locations.ts` id |
   |---|---|
   | `/abounding-love` | `abounding-love-home-care` |
   | `/abounding-peace` | `abounding-peace-elder-care` |
   | `/love-and-comfort` | `love-and-comfort-elderly-care` |
   | `/love-and-serenity-elk-grove-iii` | `love-and-serenity-iii-of-elk-grove` |
   | `/love-and-serenity-elk-grove-ii` | `love-and-serenity-of-elk-grove-ii` |
   | `/love-and-serenity-vintage-park` | `love-and-serenity-of-vintage-park` |
   | `/vita-bella` | `vita-bella-elderly-care` |
   | `/vita-bella-ii` | `vita-bella-elderly-care-ii` |

   The same eight stems are also the keys in `customLocationSEO`, so those facilities silently fall back to auto-generated SEO instead of the curated text.

2. **Canonical/domain mismatch.** Pages canonicalise to `sacramentoseniorcare.com`; sitemap and project brief use `sacramentoelderlycare.com`. Google will choose one; the loser's pages may be deindexed.

3. **Wrong brand throughout the UI and every page title.** See §4 — every page title, header, footer, and several body sections still say "Sacramento Senior Care", which CLAUDE.md explicitly forbids.

4. **`index.html` is still the Lovable default** — title, description, OG image, author, favicon. Anything that hits the site before JS runs (Googlebot fast-pass, link previewers) will see "sacramento-senior-oasis | Lovable Generated Project".

5. **No SSR / prerendering on a CSR-only React app.** CLAUDE.md: *"No client-rendered-only content for indexable pages."* Every page violates this. `react-helmet-async` only updates head tags after hydration. Mitigation will require either Vite SSG plugin, `vite-plugin-prerender`, or migration to Astro (PROJECT.md §9).

6. **`/memory-care` and `/assisted-living` have no `<SEO>` component.** The two highest-priority care-type landing pages have zero meta tags.

7. **404 page returns HTTP 200.** `NotFound.tsx` renders a "404" view but the SPA always returns 200 from Netlify (`/* /index.html 200`). Soft 404s hurt crawl budget.

8. **External Lovable script in `index.html`** (`https://cdn.gpteng.co/gptengineer.js`) ships to production. Third-party JS, telemetry, and slows TBT. Comment in the file says "DO NOT REMOVE" — that's a Lovable instruction, not a project requirement.

9. **528 KB single JS bundle**, 155 KB gzip. Vite warns about it. No `React.lazy`, no `manualChunks`. Will hurt LCP/INP targets in CLAUDE.md.

10. **24 facilities all have placeholder phone numbers.** Every entry uses `(916) 555-XXXX`. Per CLAUDE.md, phone numbers and addresses must not be invented. Either the phones are real and the numbers should be confirmed, or the directory is currently misleading visitors. (Addresses appear to be real Sacramento-area addresses; emails like `info@aboundinglove.com` look fabricated.)

11. **Footer contact address is a placeholder** — `1234 Capitol Avenue, Sacramento, CA 95814` (`Footer.tsx:75`). Same concern.

12. **Footer "Care Types" links all go to `/`** (`Footer.tsx:55-65`) — four dead links on every page. Bad for both UX and internal-link structure.

13. **`Locations.tsx` filter UI does nothing.** Care-type, area, and price-range checkboxes (lines ~152–217) are not wired to state — they're decorative. "Clear All" / "Apply Filters" buttons have no handlers.

14. **EmailJS `to_email` is `your-business-email@example.com`** (`ContactForm.tsx:68`). Contact-form submissions are not delivered to a real inbox. **This is a silent functional break, not just a config gap.**

15. **`Map.tsx` is a static placeholder** (no Google Maps / Mapbox integration) — every facility page shows "Map view would display here". The "Get Directions" link works, but there is no actual map embed. PROJECT.md §5B requires a real map with nearby POIs.

16. **`getCareTypes()` lists "Skilled Nursing" but no facility in `locations.ts` is tagged for it** — site advertises a category with no inventory.

17. **`MemoryCare` / `AssistedLiving` page filtering is fragile** — they string-match service strings (e.g., `service.toLowerCase().includes('memory')`) instead of reading a typed `care_types[]` field. PROJECT.md §4 requires a typed `care_types: CareType[]` enum.

18. **Two lockfiles** (`package-lock.json` + `bun.lockb`). CI / local installs may diverge depending on which tool is invoked.

19. **`@tanstack/react-query` is mounted via `<QueryClientProvider>` but no `useQuery` calls exist anywhere in `src/`.** It's pure dead weight in the bundle. Same pattern likely applies to several Radix packages (audit separately before pruning).

20. **README is the unmodified Lovable template** — no project-specific dev/deploy instructions.

Build itself: `npm run build` succeeds. Nothing in this list will *prevent* a deploy — but several items will actively damage SEO and one (#14) breaks the only conversion path on the site.

---

## Suggested first sweeps (not done in this PR)

These are not changes — just the natural sequencing for the rebrand/foundation phase in PROJECT.md §8:

1. Fix `index.html` defaults and remove the gpteng.co script.
2. Replace every "Sacramento Senior Care" string with "Sacramento Senior Living Directory" in components, pages, and `seoUtils.ts`. Update the SEO title-suffix logic in `SEO.tsx`.
3. Pick one canonical domain (`sacramentoelderlycare.com` per PROJECT.md). Replace all `sacramentoseniorcare.com` references.
4. Regenerate `sitemap.xml` from `sitemapGenerator.ts` (wire it into the build, or commit a corrected snapshot). Add `Sitemap:` to `robots.txt`.
5. Add `<SEO>` to `MemoryCare` and `AssistedLiving`. Add at least minimal JSON-LD (`Organization` + `WebSite`) to `index.html`.
6. Move EmailJS keys to `VITE_*` env vars and set a real `to_email`.
7. Decide on prerendering vs. Astro migration before adding the programmatic city × care-type pages.
8. Confirm or replace the 24 placeholder phone numbers and the footer address with the user before doing anything else with the data.

---

*End of audit.*
