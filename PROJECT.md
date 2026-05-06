# PROJECT.md — Sacramento Senior Living Directory

The full strategic brief. Claude Code: refer to this when CLAUDE.md doesn't have enough context.

## 1. Mission

Build the most useful, trustworthy directory of senior living options in the Sacramento metro area, capturing organic search traffic from families researching assisted living, memory care, board & care homes (RCFEs), and related senior housing — and converting that traffic into qualified leads for partner facilities.

## 2. Competitive landscape

We are entering a category dominated by:
- **AplaceForMom.com** (DR ~80, ~18,000 partner communities)
- **Caring.com** (DR ~80)
- **Seniorly.com**, **AssistedLiving.org**, **SeniorAdvisor.com** (DR 60+)

We do not try to outrank them on head terms ("Sacramento assisted living"). We win on:

1. **Hyper-local long-tail** — neighborhoods, zip codes, specific intersections of care type + location
2. **Niche care-type intersections** — Christian, LGBTQ-friendly, Spanish-speaking, pet-friendly
3. **The board-and-care-home niche** (6-bed RCFEs) — almost ignored by national directories
4. **Specific-facility queries** — "[Facility Name] reviews/cost/photos" for every facility we list
5. **Comparison and decision-stage queries** — "X vs Y", "memory care vs assisted living"
6. **Practical local resource queries** — "Medi-Cal assisted living Sacramento", "VA Aid and Attendance Sacramento", "RCFE Sacramento", "Sacramento senior move managers"
7. **Spanish-language content** — Sacramento metro is 25%+ Hispanic and the national directories have weak Spanish content

**Our defensible moat:** California Community Care Licensing publishes RCFE data publicly (license #, status, capacity, citations). We surface this prominently on every facility page. The big directories don't, because it could embarrass paying advertisers.

## 3. Site architecture

URLs use subfolders. Never use subdomains or query parameters for canonical content.

```
sacramentoelderlycare.com/
├── /assisted-living/[city-slug]/
├── /memory-care/[city-slug]/
├── /board-and-care-homes/[city-slug]/
├── /independent-living/[city-slug]/
├── /nursing-homes/[city-slug]/
├── /respite-care/[city-slug]/
├── /communities/[facility-slug]/
├── /cost-of-care/[care-type]-[city]/
├── /guides/[topic-slug]/
├── /resources/[resource-slug]/
├── /compare/[facility-a]-vs-[facility-b]/
└── /es/  (Spanish-language section, mirrors structure)
```

### Sacramento metro cities to target

**Tier 1 (highest priority):** Sacramento, Elk Grove, Roseville, Folsom, Citrus Heights, Rancho Cordova, Carmichael, Arden-Arcade, Rocklin, Antelope, Fair Oaks, Orangevale, North Highlands, El Dorado Hills, West Sacramento, Davis

**Tier 2:** Lincoln, Granite Bay, Loomis, Auburn, Galt, Rio Linda, Cameron Park, Placerville, Yuba City, Marysville, Wheatland

**Tier 3 (Sacramento neighborhoods):** Land Park, East Sacramento, Pocket-Greenhaven, Natomas, Midtown, Tahoe Park, Curtis Park, College Greens, North Natomas, South Natomas, Meadowview, Oak Park

### Care types

- Assisted Living
- Memory Care (dementia / Alzheimer's)
- Board and Care Homes (RCFE 6-bed homes — IMPORTANT, this is our niche edge)
- Independent Living
- Nursing Homes / Skilled Nursing
- Respite Care
- Hospice (in residential settings)
- Continuing Care Retirement Communities (CCRC)

## 4. Data architecture

All facility, city, and editorial data lives in structured form in `/data/`, NOT hardcoded in components. Components consume data via typed imports (TypeScript preferred).

### Facility data schema (per facility)

```ts
type Facility = {
  id: string;                  // slug-friendly, kebab-case, immutable
  name: string;
  dba?: string;
  street_address: string;
  city: string;
  neighborhood?: string;
  zip: string;
  county: string;
  lat: number;
  lng: number;
  phone: string;
  website?: string;
  email?: string;
  license_number?: string;     // CA RCFE/SNF license
  license_type?: 'RCFE' | 'SNF' | 'ARF' | 'other';
  license_status?: 'current' | 'pending' | 'closed' | 'on-probation';
  capacity?: number;
  year_opened?: number;
  care_types: CareType[];      // multi-value
  price_range_low?: number;
  price_range_high?: number;
  amenities: string[];
  room_types: RoomType[];
  languages?: string[];
  religious_affiliation?: string;
  lgbtq_friendly?: boolean;
  va_accepted?: boolean;
  medicaid_accepted?: boolean;
  pet_friendly?: boolean;
  description_short: string;   // ~50 words, unique per facility
  description_long: string;    // ~300 words, unique per facility
  photos: { url: string; alt: string; caption?: string }[];
  review_count?: number;
  average_rating?: number;
  reviews?: Review[];
  date_added: string;          // ISO date
  date_updated: string;        // ISO date
  is_partner?: boolean;        // true for paid/featured
};
```

### City data schema

```ts
type City = {
  slug: string;
  name: string;
  county: string;
  population?: number;
  senior_population_pct?: number;
  description: string;         // unique, ~150 words
  hospitals_nearby: { name: string; address: string }[];
  notable_neighborhoods?: string[];
  lat: number;
  lng: number;
};
```

### Where data should live

```
/data/
├── facilities.json          (or facilities.ts)
├── cities.json
├── care-types.json
├── reviews.json
└── editorial/                (markdown for guides)
    ├── _index.json
    └── [slug].md
```

## 5. Page templates needed

### A. City + care type page
URL: `/[care-type]/[city-slug]/`
Title: `[Care Type] in [City], CA — [N] Communities, Reviews & Cost (2025)`
H1: `[Care Type] in [City], CA`
Sections:
1. Intro (city-specific stats: count, avg cost, avg capacity)
2. Cost section (local avg, range, vs nearby cities, vs state, vs national)
3. List of facilities in city/care-type, card grid, sortable
4. Local context (neighborhood character, hospitals, transit, parks, with map embed)
5. Local senior resources (Area Agency on Aging Region 8, senior centers, transit)
6. FAQs specific to that city (FAQ schema)
Schema: ItemList of LodgingBusiness + BreadcrumbList + FAQPage

### B. Individual facility page
URL: `/communities/[facility-slug]/`
Title: `[Facility Name] — Reviews, Pricing, Photos & Tours`
H1: `[Facility Name]`
Sections:
1. Hero (name, address, license #, rating, capacity, photos)
2. Quick facts (care types, price range, room types, languages, religious, payment)
3. Long description (300+ unique words)
4. Amenities checklist
5. Floor plans / room types
6. Photo gallery (minimum 10)
7. Reviews
8. License & inspection history (public CDSS data — our competitive moat)
9. Map + nearby points of interest
10. "Compare with similar facilities" — auto-link 3 facilities in same city/care-type
11. CTA: Request info / Schedule tour / Get pricing
Schema: LodgingBusiness + AggregateRating + Review + BreadcrumbList

### C. Cost-of-care page
URL: `/cost-of-care/[care-type]-[city]/`
Real local cost data, tables, calculator widget. High-converting decision-stage queries.

### D. Comparison page
URL: `/compare/[facility-a]-vs-[facility-b]/`
Side-by-side comparison. Build programmatically for top 10 × top 10 in each city/care-type.

### E. Editorial guide
URL: `/guides/[slug]/`
Long-form (1,500+ words), authored, with internal links to facilities and city pages.

### F. Resource page
URL: `/resources/[slug]/`
Practical guides: Medi-Cal, VA benefits, RCFE regs, etc.

### G. Homepage
Search bar (city + care type), featured cities, recent guides, social proof, lead capture.

## 6. Schema markup standards

Every indexable page gets JSON-LD in `<head>`. Validate with https://validator.schema.org and https://search.google.com/test/rich-results.

Reusable schema builders should live in `/lib/schema/`:
- `buildFacilitySchema(facility): LodgingBusiness`
- `buildCityListSchema(city, facilities): ItemList`
- `buildBreadcrumbSchema(path[]): BreadcrumbList`
- `buildFaqSchema(faqs): FAQPage`
- `buildArticleSchema(article): Article`
- `buildAggregateRatingSchema(reviews): AggregateRating`

## 7. Lead capture

Lead capture is on every facility page and most city pages. Forms collect:
- Name, phone, email
- Care type needed
- Move-in timeline
- Budget range
- Specific facility(ies) of interest (pre-filled when on facility page)
- Notes

Submissions go to:
- Email (primary, immediate)
- Spreadsheet/Airtable/CRM (for follow-up)
- Optionally directly to partner facility's CRM

Use Netlify Forms initially (free, simple). Migrate to a real CRM (HubSpot Free or Pipedrive) when volume justifies.

Phone tracking: every facility page should display a tracked phone number (CallRail or similar) so we can attribute leads. Phase 2 concern.

## 8. Phased build plan

### Phase 1: Foundation & rebrand (Week 1)
- Rename brand everywhere ("Sacramento Senior Living Directory")
- Fix all default Lovable meta tags, OG tags, favicon
- Add Google Search Console, GA4, Microsoft Clarity
- Set up `netlify.toml` with redirects, headers, build settings
- Add sitemap.xml and robots.txt (initial, will be regenerated as content grows)
- Update homepage hero, navigation, footer to reflect new brand
- Set up basic JSON-LD on existing pages

### Phase 2: Data refactor (Week 2)
- Move all hardcoded facility data to `/data/facilities.json`
- Define TypeScript types for Facility, City, Review, etc.
- Build `/data/cities.json` with all Tier 1 cities
- Refactor existing components to consume from data files
- No visible UI change — refactor only

### Phase 3: Templates (Week 3)
- Build City+CareType page template, render from cities × care-types data
- Build Facility page template, render from facilities data
- Build Cost-of-Care page template
- Each template emits proper meta tags, JSON-LD, breadcrumbs
- Decide on prerendering: vite-plugin-ssr / vite-plugin-prerender, OR migrate to Astro for true SSG

### Phase 4: Programmatic build-out (Weeks 4-6)
- Generate all Tier 1 city × care-type pages (~80 pages)
- Add 50+ more facilities (pull from CDSS public data)
- Build out 30+ comparison pages for top facilities
- Build cost-of-care section (8+ pages)
- Add Spanish-language section: 5 city pages + 3 flagship guides

### Phase 5: Editorial & link building (Weeks 6+)
- Publish 1-2 cornerstone editorial pieces per week
- Begin outreach: local nonprofits, hospitals, elder law attorneys
- Begin review collection (Google reviews of the directory)

## 9. Migration consideration: Vite → Astro

When we exceed ~150 pages or hit Lighthouse SEO ceiling on Vite + React, we migrate to **Astro**:
- Static-first, zero JS by default
- Keeps our React components as "islands" where interactivity is needed
- Native MDX for editorial
- Built-in image optimization, sitemap, RSS
- Proven at scale for content/directory sites

This migration is a Phase 3 or Phase 4 decision. Don't migrate prematurely. Don't avoid it forever.

## 10. Success metrics

90-day targets:
- 200+ indexed pages
- Ranking top-10 for 50+ long-tail queries
- 1,000+ monthly organic visits
- 20+ qualified leads/month

12-month targets:
- 800+ indexed pages
- Ranking top-3 for 100+ city × care-type queries
- 20,000+ monthly organic visits
- 200+ qualified leads/month
- DR 30+ via earned links

## 11. Out of scope (for now)

- User accounts / family dashboards
- Reviews submission system (initially we display, not collect on-site)
- Booking / scheduling integration
- Mobile native apps
- Paid ad platform integration

These come later. Do not add them unless explicitly scoped.
