# Prerendering scope

**Status:** scoped, not implemented. Recommendation below is Option A.
**Written:** August 2026.
**Owner decision required:** enable the Netlify Prerender extension (a UI action; no code change).

---

## 1. The problem, measured

This is a Vite + React SPA with no prerendering or SSG. Every title, heading,
meta tag and JSON-LD block on the site exists only after JavaScript executes.
`public/_redirects` maps `/*` to `index.html`, and `dist/` contains exactly one
HTML file, so **every URL on the domain serves the same shell**.

Measured against production with JavaScript disabled:

```
GET /love-and-serenity-iii-of-elk-grove     -> 2,854 bytes
GET /assisted-living/elk-grove              -> 2,854 bytes   (byte-identical)

  title               : Sacramento Assisted Living Directory — Assisted Living, …
  meta description    : Sacramento Assisted Living Directory helps families compare…
  og:url              : https://sacramentoelderlycare.com/
  plain_text_size     : 1        (one character of body text)
  internal_links_count: 1
  headings            : 0
  JSON-LD blocks      : 0
```

Rendered, the same community page carries 812 words and 26 internal links; the
Sacramento city page carries 811 words and 239. None of it is visible on a
first pass.

Two consequences that are easy to miss:

- **Discovery.** With one internal link per URL pre-JS, a crawler's first pass
  finds almost no link graph. `sitemap.xml` is the primary discovery mechanism
  on this site, not a supplement. (A `Sitemap:` directive was added to
  `robots.txt` in August 2026 for exactly this reason.)
- **Social previews are broken on every page.** Covered in §4 — this is a
  business problem, not a backlog item.

### Related: the fix that had to land first

Until August 2026 `index.html` also hardcoded
`<link rel="canonical" href="https://sacramentoelderlycare.com/">`, so the
pre-JS HTML of every URL declared itself a duplicate of the homepage, and the
post-JS DOM carried two conflicting canonicals (react-helmet-async appends
rather than replaces). Removed in PR #22. Prerendering does not depend on that
fix, but nothing else about this site's ranking behaviour made sense while it
was in place.

---

## 2. Where this is deployed

**Netlify.** Confirmed from the production response header (`server: Netlify`).

There is no `netlify.toml`. Deploy configuration is Netlify UI defaults plus
`public/_redirects`. `.nvmrc` pins Node 20 (added August 2026 specifically as
prerequisite work for Option A).

---

## 3. Options

| | Effort | Survives Lovable | Fixes OG | Fixes body HTML |
|---|---|---|---|---|
| **A. Netlify Prerender extension** | ~1 hour, zero repo changes | **Yes** | Yes¹ | Yes |
| **B. Prerender.io extension** | ~2 hours + vendor signup | Yes | Yes¹ | Yes |
| **C. Build-time prerender** | 1–3 days | **No** | Yes¹ | Yes |
| **D. Edge function, head tags only** | 1–2 days | Probably | Yes¹ | No |
| **E. Framework migration** | 2–6 weeks | **No** | Yes | Yes |

¹ None of these fixes Open Graph on its own. See §4.

### Context: the built-in feature people will tell you to use is dead

Netlify's legacy built-in prerendering — the one most blog posts and older
Stack Overflow answers refer to — was deprecated in December 2025 and **stopped
working for free-plan projects on 20 January 2026**, rolling out by plan tier
after that. If it was ever enabled on this project it has been inert since.
It should be switched off as cleanup: *Project configuration → Build & deploy →
Post processing → Prerendering*.

It was replaced by two extensions.

### A. Netlify Prerender extension — recommended

Generally available since December 2025. Available on **all plan tiers**.

How it works: an edge function detects crawler user-agents requesting HTML and
rewrites those requests to a serverless function, which loads the page in a
headless browser and returns fully-rendered HTML with cache headers. Human
visitors continue to receive the SPA untouched.

- Installed from `app.netlify.com/extensions/prerender`, enabled per project,
  then redeploy. **No files change in this repository.**
- No third-party API key, no vendor account.
- Cost: no additional charge beyond normal billing for the function
  invocations, on whatever plan the team is on.
- Functions run in our own account, so logs and metrics appear alongside every
  other function.
- Netlify scopes it to "AI agents, SEO crawlers, and preview services, such as
  for social media previews" — so it covers `facebookexternalhit` and
  `Twitterbot`.
- Requires **Node 20+**; the prerender function fails with Chromium launch
  errors below that. This is why `.nvmrc` exists.
- Configuration after setup is stored in Netlify Blobs, so changes do not
  require a redeploy.

**Why it wins here, and it is not close.** Lovable's "Update site info for
publish" panel rewrites `index.html` on every publish from the Lovable UI, and
has already silently truncated the brand string once (commit `ed663f7`, which
shipped "Sacramento Assisted Living **Directo**"). Any approach that puts
prerendering machinery in the repository is exposed to that. Option A is the
only option where **there is nothing in the repository for Lovable to
overwrite.** That is the deciding factor, not a tiebreaker.

### B. Prerender.io extension

Same shape, external vendor. Requires a Netlify **Pro or Enterprise** plan plus
a Prerender.io subscription and API key. Buys vendor support and advanced
configuration. Reach for it only if A proves insufficient.

### C. Build-time prerender

Conceptually the best fit — the data is fully static (`src/data/curated.ts` +
`src/data/imported.generated.ts`), so all ~815 URLs *could* be real static HTML
with no per-request function cost and a faster experience for humans too.

Not recommended, because:

- ~815 routes through a headless browser adds roughly 3–7 minutes to every
  build, and Lovable's sandbox would need Chromium available to run
  `vite build` at all. This is precisely the "fights the platform" failure
  mode.
- `react-snap`, the tool most guides name, has been effectively unmaintained
  since 2020.
- Output would run to 100–200 MB of HTML.

A narrower variant is defensible: prerender only the ~60 high-value routes
(23 city pages, board-and-care pages, guides, statics) and leave the 765
community pages client-rendered. Cuts build cost to a minute or two, but still
carries the Lovable risk and leaves the best-performing community pages
unrendered.

### D. Edge function injecting head tags only

A Netlify Edge Function that rewrites the shell's `<head>` per route, computed
from the same data modules. No headless browser. Fixes titles, descriptions,
canonicals and OG for all crawlers including social; does **not** fix body
content or the missing link graph.

Only the right answer if A turns out to be unviable or too slow. It is
strictly more work than A for strictly less result.

### E. Framework migration

Next.js, Astro, Remix or similar. Ends the Lovable workflow entirely. This is a
tooling strategy decision, not an SEO task. Out of scope.

---

## 4. Open Graph: sequencing that must not be reordered

**Prerendering alone will not fix social previews, and enabling it may make
them look fixed while they are not.**

The shell's `og:title` and `og:description` appear *first* in `<head>`;
react-helmet-async appends its correct per-page ones *after*. Parsers take the
first. This is measured, not assumed: DataForSEO's parser, **with JavaScript
rendering enabled**, still reported the homepage's `og:title` on
`/love-and-serenity-iii-of-elk-grove`. A prerendered page contains both tags in
the same order and behaves identically.

So today, every deep link a family shares to Facebook, Slack or iMessage shows
a generic directory card instead of the community they are discussing. On this
site that is not cosmetic: families comparing care homes send links to siblings
and adult children, and that share is the moment of highest intent.

The fix is three steps, **in this order**:

1. **Enable prerendering** (Option A). Zero repo change. Verify that a
   community page returns rendered HTML to a crawler user-agent.
2. **Then** fix `src/components/SEO.tsx`. It never emits `og:url` at all, and
   defaults `og:image` to `/placeholder.svg` — a *relative* URL, which is
   invalid for Open Graph. Both need absolute values derived from the canonical.
3. **Then** delete the static `og:title`, `og:description`, `twitter:title`,
   `twitter:description` and `twitter:image` from `index.html`.

**Step 3 is unsafe before step 1 is verified.** Social crawlers do not execute
JavaScript, so removing the static tags without prerendering in place leaves
them with no OG tags at all — worse than wrong ones. Steps 2 and 3 together are
roughly 15 lines.

---

## 5. Companion work: city-page DOM size

`/assisted-living/sacramento` rendered all 212 listings on one URL: a 636 KB
DOM, a **0.8%** text-to-markup ratio, and a "more than 1500 nodes" warning from
crawlers. That is the page shape most likely to strain a prerender function's
headless browser, and the prerendered HTML would then be served to every
crawler at that size.

Pagination at 24 per page cuts page one to ~124 KB. Implemented separately
(`feat/city-page-pagination`).

Worth noting for whoever tunes the prerender function: the largest remaining
pages are city page ones, and Sacramento is the worst case.

---

## 6. Verification checklist

Run after enabling, before declaring done. A `200` is not sufficient evidence —
the shell returns `200` today. Look for **body content**.

```bash
UA='Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

for url in \
  https://sacramentoelderlycare.com/love-and-serenity-iii-of-elk-grove \
  https://sacramentoelderlycare.com/assisted-living/elk-grove \
  https://sacramentoelderlycare.com/locations?search=elk%20grove \
  https://sacramentoelderlycare.com/assisted-living/sacramento
do
  echo "=== $url"
  curl -sS -A "$UA" "$url" \
    | grep -oE '<title>[^<]*|<h1[^>]*>[^<]*|rel="canonical" href="[^"]*"|name="robots" content="[^"]*"' \
    | head -8
done
```

Expected after prerendering is live:

| URL | `<title>` | `<h1>` | robots |
|---|---|---|---|
| `/love-and-serenity-iii-of-elk-grove` | `Love and Serenity of Elk Grove III — Licensed RCFE Care Home` | `Love and Serenity of Elk Grove III` | absent |
| `/assisted-living/elk-grove` | `Assisted Living in Elk Grove, CA — Compare 95 Facilities & Costs` | `Assisted Living in Elk Grove, CA` | absent |
| `/assisted-living/sacramento` | `Assisted Living in Sacramento, CA — Compare 212 Facilities & Costs` | `Assisted Living in Sacramento, CA` | absent |
| `/locations?search=elk%20grove` | *(search results)* | — | `noindex,follow` |

Also confirm:

- A normal browser user-agent still receives the SPA shell, not prerendered
  HTML.
- JSON-LD blocks are present in the prerendered output (`LodgingBusiness` on a
  community page; `ItemList` + `FAQPage` + `BreadcrumbList` on a city page).
- Prerender function invocation count and duration in the Netlify function
  logs, especially for `/assisted-living/sacramento`.

Netlify also publishes a checker at <https://do-you-need-prerender.netlify.app/>.

---

## 7. Hard dependency: the licence matcher must be correct first

**No bulk community-page build may start until the CCLD matcher is correct and
the licence gate is in place.** A blocking prerequisite, not a sequencing
preference.

The strategy for this directory is a page per licensed community — roughly 133
of them — differentiated on printing the CA RCFE licence number, which A Place
for Mom, Caring.com and Seniorly do not do. That differentiator is worth having
only if the numbers are right.

An August 2026 audit of the 24 curated records found:

- **2 carrying another facility's licence number.** Both wrong numbers reported
  a `CURRENT` status that masked an `ON PROBATION` licence at the real address —
  a green verified shield on homes families were being invited to tour.
- **5 rendering "License-verified" with no licence data at all**, one featured
  on the homepage and absent from the CCLD roster entirely.

That is 7 of 24 — roughly a **29% wrong-or-unevidenced rate on the site's most
sensitive claim**, concentrated by construction in the hand-curated records
that are also the site's best-performing pages. Scaling that matcher to 133
pages multiplies the defect across the whole site.

Both prerequisites now exist:

- `scripts/import-cdss.mjs` requires street-address agreement and scores names
  with Jaccard. Covered by `npm run test:matcher`.
- `vite.config.ts` fails the build on any licence claim the roster cannot
  substantiate — see `src/utils/licenseAudit.ts`.

Keep both green before any bulk build. Prerendering makes every one of those
pages more legible to crawlers and AI agents, which raises the cost of a wrong
claim rather than lowering it.

## 8. Recommended order

0. Licence matcher + build gate (§7) — **done**, merged. Blocking prerequisite
   for any bulk community-page build.
1. `.nvmrc` pinning Node 20 — **done**, merged (#26).
2. Enable the Netlify Prerender extension. Disable the legacy built-in feature
   first if it is switched on. Verify with §6.
3. OG fix, steps 2 and 3 of §4, as its own branch. Blocked on step 2 above.
4. City-page pagination — **done**, merged (#29).

---

## Sources

- [Netlify — Prerendering](https://docs.netlify.com/build/post-processing/prerendering/)
- [Netlify changelog — Prerender extension GA](https://www.netlify.com/changelog/2025-12-16-prerender-extension-ga/)
- [Netlify changelog — Prerender.io extension](https://www.netlify.com/changelog/2026-01-08-prerenderio-support-updates/)
- [Netlify support — legacy prerendering migration guide](https://answers.netlify.com/t/legacy-prerendering-migration-guide/158938)
