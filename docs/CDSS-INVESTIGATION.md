# CDSS Data Source Investigation — RCFE Licensing & Inspections

Background: PROJECT.md §2 names California Community Care Licensing data as our defensible moat. To deliver the "Licensing & Inspections" component on facility pages, we need a reliable feed of license metadata and (ideally) citation/inspection history. This document inventories the public CDSS sources, evaluates each, and recommends one.

> **Probe-environment caveat.** Every California state and federal `.gov` host is blocked from this investigation environment with `x-deny-reason: host_not_allowed` (verified across `data.chhs.ca.gov`, `data.ca.gov`, `www.ccld.dss.ca.gov`, `healthdata.gov`, `catalog.data.gov`). Findings below come from public web search results, including agency descriptions, third-party documentation, and dataset titles/URLs. **The numbered "probe" step in §6 was attempted but could not execute live HTTP** — recommended next action is for someone outside this environment to run the documented one-liner against the recommended source and confirm field shape before we wire up the backfill PR.

---

## TL;DR — recommended approach

- **Primary source for license metadata:** [Community Care Licensing — Residential Elder Care Facility Locations (CSV)](https://data.chhs.ca.gov/dataset/00d9608d-53ee-4e93-990a-57cd220a1d4b/resource/dc9ddc4b-f4cf-4196-8ffa-e5a6505f2b8e/download/community-care-licensing-residential-elder-care-facility-locations.csv) — direct CSV download from CalHHS Open Data Portal, covers RCFE (facility type 740) and RCFE/CCRC (741), Sacramento County included. Sister CKAN page: [data.chhs.ca.gov/dataset/ccl-facilities](https://data.chhs.ca.gov/dataset/ccl-facilities) (zip with sub-resources per facility category).
- **Source for citations / inspections:** [CCLD Facility Search "transparency" site](https://www.ccld.dss.ca.gov/carefacilitysearch/) — per-facility detail pages (`/FacDetail/{licenseNumber}`) link to PDF inspection reports back to **April 16, 2015**, and PDF complaint investigation reports back to **January 11, 2016**. There is **no bulk-download or API for citations/inspections** — accessing them requires either scraping the per-facility detail page for the report links, or making a public-records request to the regional office.
- **Effort estimate:** ~6–10 engineering hours for the license-metadata backfill (download → parse → fuzzy-match against our 24 records → write to `locations.ts`). **+12–20 hours** if we also scrape inspection PDFs in this PR; reasonable to defer that to a subsequent PR.
- **Hard blocker to verify before commercial display:** CalHHS Open Data Portal terms read **"All commercial uses must be approved and may be subject to a license."** This directory is a placement-agency lead-funnel — that's commercial. **Do not ship the backfill until counsel/operator has confirmed approval status with CDSS or determined that surfacing public-record license data on a commercial site is allowable under California Public Records Act / CCL transparency provisions** (which it almost certainly is, since the same data appears on third-party commercial directories). See §4.

---

## 1. Sources inventoried

| # | Source | URL | Type |
|---|---|---|---|
| A | CCLD Facility Search ("transparency") | <https://www.ccld.dss.ca.gov/carefacilitysearch/> | Web UI; per-facility detail pages |
| B | CCLD Data Hub | <https://cdss.ca.gov/inforesources/cdss-programs/community-care-licensing/ccld-data> | Landing page that links out to B′ and C |
| C | CalHHS Open Data Portal — *Community Care Licensing Facilities* (multi-resource CKAN dataset) | <https://data.chhs.ca.gov/dataset/ccl-facilities> | CKAN dataset; resources include a zip and per-category CSVs (incl. RCFE) |
| C-rcfe | C's RCFE-specific sub-resource | <https://data.chhs.ca.gov/dataset/46ffcbdf-4874-4cc1-92c2-fb715e3ad014/resource/744d1583-f9eb-45b6-b0f8-b9a9dab936a6> | CSV |
| D | CalHHS Open Data — *Community Care Licensing — Residential Elder Care Facility Locations* | Direct CSV: <https://data.chhs.ca.gov/dataset/00d9608d-53ee-4e93-990a-57cd220a1d4b/resource/dc9ddc4b-f4cf-4196-8ffa-e5a6505f2b8e/download/community-care-licensing-residential-elder-care-facility-locations.csv> | CSV; geocoded "Locations" variant of the RCFE dataset |
| E | data.ca.gov mirror of (C) | <https://data.ca.gov/dataset/community-care-licensing-facilities> | CKAN dataset (mirror of CalHHS) |
| F | data.gov federal mirror | <https://catalog.data.gov/dataset/community-care-licensing-facilities> | Federal catalog mirror |
| G | CDSS GIS portal | <https://gis.data.chhs.ca.gov/datasets/CDSS::cdss-ccl-facilities> | ArcGIS REST/feature service variant of the CCL Facilities data |
| H | sandbox.data.ca.gov + lab.data.ca.gov | <https://sandbox.data.ca.gov/dataset/community-care-licensing-residential-elder-care-facility-locations> | Pre-prod variant of (D) |
| I | healthdata.gov mirror | <https://healthdata.gov/widgets/ttpn-smf5> | Federal health-data mirror; same Socrata 4x4 pattern (`ttpn-smf5`) |
| J | CCLD Regional Office (public-files request) | <https://www.cdss.ca.gov/inforesources/community-care-licensing> | Email/phone request — for documents not surfaced online |

C, D, and G are the same upstream CDSS data exposed through different platforms. F, H, and I are downstream republications.

Sources for the inventory itself:
- [CCLD Data Hub description](https://cdss.ca.gov/inforesources/cdss-programs/community-care-licensing/ccld-data)
- [CCLD Facility Search "transparency" description](https://www.cdss.ca.gov/inforesources/community-care-licensing/facility-search-welcome)
- [How to look up California assisted living inspections — assisted-living-directory.com](https://www.assisted-living-directory.com/blog/finally-can-look-california-assisted-living-inspections/)

---

## 2. Per-source evaluation

### A. CCLD Facility Search (`ccld.dss.ca.gov/carefacilitysearch`)

- **Access pattern:** Web UI; deep-link by license number via `?Rewrite=FacDetail/{licenseNumber}` or `/FacDetail/{licenseNumber}`. **No documented API.** Has a "Download Data" button that exports the *filtered facility list* to Excel (handy for spot-checks; not a substitute for the bulk CSV).
- **Format:** HTML; per-facility detail pages link to PDF inspection / consultation / violation reports.
- **Refresh:** Live (the source of truth — what the bulk CSVs are derived from on a slower cadence).
- **Coverage:** All licensed CA facilities, including Sacramento County RCFEs.
- **Active vs closed:** Includes both, with status surfaced on the detail page.
- **Per-record fields visible on the detail page:** facility name, license number, address, license type, license status, original issue date, capacity, administrator name, licensee name, complaints/inspections section with PDF links going back to **April 16, 2015** (inspections) / **January 11, 2016** (complaint investigations).

Source: [CDSS Facility Search welcome page](https://www.cdss.ca.gov/inforesources/community-care-licensing/facility-search-welcome).

### B. CCLD Data Hub

Landing page only; navigates to (C), (D), and (G). Not a data source itself.

### C / D / G — the bulk CSV / API datasets

The three platforms (CalHHS Open Data, CalHHS GIS, data.ca.gov) republish the same upstream feed. (C) is a multi-resource CKAN dataset (one CSV per facility category plus a zip combining all of them). (D) is a focused single-CSV dataset filtered to RCFE + RCFE/CCRC (facility type codes 740 and 741). (G) is the same data wrapped as an ArcGIS feature service.

- **Access pattern:**
  - CSV direct download (no auth)
  - CKAN datastore_search API on data.chhs.ca.gov / data.ca.gov (`/api/3/action/datastore_search?resource_id={uuid}&limit=…`)
  - Socrata SODA API on chhs.data.ca.gov (`/resource/{4x4}.json`)
  - ArcGIS REST query endpoint on gis.data.chhs.ca.gov
- **Format:** CSV / JSON / GeoJSON / Esri JSON (depending on platform).
- **Refresh:** The CCLD Data Hub describes the data as "regularly updated"; community references and the CKAN metadata typically show a **monthly or quarterly** refresh. **Action item:** confirm the actual `metadata_modified` timestamp once the host can be reached. Slight staleness (≤90 days) is acceptable for license-status display.
- **Coverage:** Statewide. The (D) variant is filtered specifically to facility type codes **740 (Residential Care Elderly)** and **741 (RCFE - Continuing Care Retirement Community)**. Sacramento County records are included.
- **Active vs closed:** Includes both — status is a field, so we can filter at consume time.

Sources:
- [CalHHS dataset page](https://data.chhs.ca.gov/dataset/ccl-facilities)
- [CalHHS RCFE-specific resource](https://data.chhs.ca.gov/dataset/46ffcbdf-4874-4cc1-92c2-fb715e3ad014/resource/744d1583-f9eb-45b6-b0f8-b9a9dab936a6)
- [data.ca.gov mirror of CCL Facilities](https://data.ca.gov/dataset/community-care-licensing-facilities)
- [CDSS GIS portal](https://gis.data.chhs.ca.gov/datasets/CDSS::cdss-ccl-facilities)
- [Catalog reference noting facility type codes 740/741](https://catalog-prod-datagov.app.cloud.gov/dataset/community-care-licensing-residential-elder-care-facility-locations/resource/35c6a8d9-7f2f-476d-b1d1-0d7c019a86b2)
- [CalHHS Socrata blog tag](https://www.chhs.ca.gov/blog/tag/socrata/) (confirms the portal is Socrata-backed)

### J. Regional-office public-files request

Falls outside the scope of an automated backfill. Useful only for one-off data we can't get from (A)/(C)/(D). Worth noting because some pre-2015 inspection history lives only here.

---

## 3. Per-record fields available

> **Cannot directly probe the schema** (env blocks). The list below is the schema documented by upstream CDSS and the schema surface area visible on the facility-detail page. We must verify each column name against the header row of the actual CSV before relying on it in code. Standard CDSS naming conventions (per the public CCLD documentation and adjacent Socrata facility datasets) suggest fields like `FACID`, `FACNUM`, `FACILITY_NUMBER`, `FACNAME`, `LICENSE_TYPE`, `FACILITY_STATUS`, `TOTAL_CAPACITY`, `EFFECTIVE_DATE`, `STREET_ADDRESS`, `CITY`, `STATE`, `ZIP`, `COUNTY_NAME`, `ADMINISTRATOR`, plus `LATITUDE`/`LONGITUDE` on the "Locations" variant. **Do not bake these names into code without first confirming against the live CSV header.** A web search returned indirect confirmation that **`FACID`** is the linking key used across CDPH/HCAI and CDSS facility-data tables ([CalHHS source](https://data.chhs.ca.gov/dataset/healthcare-facility-locations)).

| Field requested | (A) Facility Search detail page | (C) CCL Facilities CSVs | (D) RCFE Locations CSV |
|---|---|---|---|
| Facility license number / FacID | ✓ | ✓ | ✓ |
| Facility name | ✓ | ✓ | ✓ |
| Street address | ✓ | ✓ | ✓ |
| City | ✓ | ✓ | ✓ |
| Zip | ✓ | ✓ | ✓ |
| County | shown via filter | ✓ | ✓ |
| License type (RCFE / ARF / GH / SNF) | ✓ | ✓ | ✓ (limited to 740/741) |
| License status (current / pending / on probation / closed) | ✓ | ✓ | ✓ |
| License effective / original issue date | ✓ | ✓ | ✓ |
| Capacity | ✓ | ✓ | ✓ |
| Administrator name | ✓ | likely ✓ — confirm | likely ✓ — confirm |
| Lat / Lng | not in UI; map is JS-rendered | not directly | **✓ — distinguishing feature of (D)** |
| **Citations / inspection history** | ✓ via PDF links (back to 2015/2016) | **✗** | **✗** |
| Type A / Type B citations | ✓ surfaced as deficiencies inside the inspection PDFs | ✗ | ✗ |
| Complaint investigations | ✓ via PDF links (back to 2016) | ✗ | ✗ |

**Bottom line on §3 — citations/inspections are the moat, and they are NOT in the bulk dataset.** They live only on (A) as PDFs linked from each facility's detail page. To surface them on our facility pages we have to:

1. **Scrape**: hit `https://www.ccld.dss.ca.gov/carefacilitysearch/FacDetail/{licenseNumber}` per facility, parse the HTML for the inspection/complaint PDF links, optionally fetch and OCR/parse the PDFs. Brittle: no documented API, structure can change.
2. **Manual entry**: pull the PDFs once, summarize the highlights in our own data file (e.g., `inspections.json`), keep refreshed monthly. Robust but ongoing labor.
3. **Aggregate provider**: there's no obvious paid feed for CDSS citation data (unlike CMS Nursing Home Compare for SNFs). CANHR and Cal Health Find publish summaries but only for nursing homes.

Sources:
- [CCLD Facility Search welcome](https://www.cdss.ca.gov/inforesources/community-care-licensing/facility-search-welcome) — confirms inspection/complaint PDF availability and earliest dates
- [assisted-living-directory.com on CA inspections](https://www.assisted-living-directory.com/blog/finally-can-look-california-assisted-living-inspections/) — third-party explanation of how to read the transparency site
- [CANHR on RCFE searching](https://canhr.org/searching-for-a-residential-care-facility-for-the-elderly-rcfe/)

---

## 4. Legal / TOS

### CalHHS Open Data Portal Terms of Use

Pulled from search-result excerpts of <https://data.chhs.ca.gov/pages/terms> (the page itself is host-blocked from this environment). Verbatim or near-verbatim text:

> "Anyone desiring to use or reproduce the data without modification for a noncommercial purpose may do so without obtaining approval. **All commercial uses must be approved and may be subject to a license.**"

> "Users of data files … shall not have the right to alter, enhance, or otherwise modify the data."

> "Users agree that they will not reproduce, modify, adapt, prepare derivative works based on, perform, display, publish, distribute, transmit, broadcast, sell, license or otherwise exploit the CalHHS Open Data Portal Content in a manner inconsistent with the Terms of Use."

> "Use of Content from a Content Source Organization will be subject to additional terms between the user and the Content Source Organization, and in the event of conflict … the Content Source Organization's terms will override and govern."

**Implications:**

- Sacramento Senior Living Directory is a placement-agency lead funnel — that is a commercial purpose under any plain reading of the CalHHS terms.
- The portal's "no modification" clause specifically restricts altering the data, not displaying it. We can present the data verbatim with attribution, but we cannot, e.g., recompute a "rating" from inspection counts and present it as license-derived without making clear what we did.
- The Source Organization (CDSS) is the controlling party. CDSS's own published guidance (see CCLD Data Hub) is that this data is public-record under California PRA and routinely republished by third parties — including commercial directories. In practice, the "may be subject to a license" language has not been enforced against directories displaying status / capacity / license number. **Still: get explicit written confirmation from CDSS before launching.**

### California Public Records Act

License-status, citation, and inspection records are public records under PRA (Cal. Gov. Code §6250 et seq.). Once released, redistribution generally tracks fair use plus the redistributing platform's own contractual terms (here, the CalHHS portal terms above). PRA does not, by itself, prohibit commercial republication of public records.

### Robots / scraping considerations for source (A)

The CCLD Facility Search is a public-facing transparency site. We should:
- Honor the site's `robots.txt` (TBD — can't fetch it from this env)
- Cache aggressively to avoid hammering the site (e.g., refresh monthly)
- Not scrape the facility list itself — use (D) for that and only deep-link into (A) for inspection PDFs by license number
- Add a User-Agent that identifies us and an opt-out email

### Attribution

Best-practice: a small "License data sourced from California Department of Social Services, Community Care Licensing Division (last updated *YYYY-MM-DD*)" line in the Licensing & Inspections component, with a deep link back to the CCLD facility-detail page. This both satisfies any de-facto attribution expectation and gives users a first-party verification path.

Sources:
- [CalHHS Open Data Portal terms (search-result excerpt)](https://data.chhs.ca.gov/pages/terms)
- [Open licenses guide — resources.data.gov](https://resources.data.gov/open-licenses/)

---

## 5. Recommendation

### Primary source for license metadata: **(D) Residential Elder Care Facility Locations CSV**

- It's already filtered to RCFE/RCFE-CCRC, so we don't have to filter on facility type code at consume time.
- It's the *Locations* variant, which carries lat/lng in addition to address — the geocoding alone is worth using this CSV over (C).
- It's a single CSV pull (one HTTP request, no pagination), which makes the backfill trivially deterministic.
- It's the same upstream data CDSS publishes through (C) and (G), so we're not picking up additional risk by choosing this view.

### Source for citations / inspections: **(A) CCLD Facility Search detail page (deep-link by license number)**

This is the *only* public source. Recommend deferring active scraping of inspection PDFs to a follow-up PR, and shipping the first version of the Licensing component with:
- License number, type, status, effective date, capacity (from (D))
- A "View inspection reports on CCLD" deep link to the facility's detail page on (A)

That gets us 80% of the moat with 20% of the work, and avoids a brittle dependency on (A)'s HTML structure in v1.

### Risks

| Risk | Severity | Mitigation |
|---|---|---|
| **Commercial-use license clause** | High (legal) | Get written confirmation from CDSS (`opendata@dss.ca.gov` or CCLD webmaster `cclwebmaster@dss.ca.gov`) before display. Almost certainly fine — multiple commercial directories already republish — but cheap insurance. |
| Unverified column names | Medium | The probe in §6 was blocked. Run the one-liner before the backfill PR and confirm header names; do not commit code that hardcodes `FACID` etc. without that check. |
| Refresh cadence is "regular," not specified | Low | Fine for license display; rebuild monthly via a GitHub Action or Netlify scheduled function. |
| Fuzzy-matching our 24 records to CDSS records | Medium | Strategy: match on `(street_address, zip)` first (high confidence), fall back to `(name, city, zip)` for any records that don't match. Hand-verify the result table before committing. The 24 facilities all have plausible-looking street addresses (audit confirmed) so direct address match should resolve most. |
| Closed/probation facilities | Low | Filter `LICENSE_STATUS != 'CURRENT'` for display. Keep the row, but show a "Currently not licensed" notice rather than the green badge. |
| Inspection PDF scraping (later PR) | Medium | Defer; build the deep-link CTA first. When we do scrape, set up monitoring on the per-page HTML structure and back off to manual on failure. |

### Effort estimate

| Task | Hours |
|---|---|
| Pull (D) CSV, parse, snapshot to repo as JSON or to a build-time fetch | 1 |
| Verify column names, write a `LicenseRecord` type | 1 |
| Fuzzy-match licenses to our 24 facilities; hand-verify | 2 |
| Backfill `Facility.license_*` fields in `src/data/locations.ts` | 1 |
| Build the "Licensing & Inspections" UI component (license number, type, status badge, capacity, effective date, deep link to CCLD detail page) | 2 |
| Wire JSON-LD: add `LicenseRecord` (or `additionalProperty`) to `LodgingBusiness` schema | 0.5 |
| Tests + screenshot review | 1 |
| **Total — license metadata + deep-link CTA** | **~8–9 hours** |
| **Optional follow-up:** scrape inspection PDFs for 24 facilities, store dates + summary, render a "recent inspections" list | +12–20 hours |

---

## 6. Probe (could not execute live)

The intended probe was:

```sh
# Pull the first row of the recommended source and inspect the header.
curl -sL "https://data.chhs.ca.gov/dataset/00d9608d-53ee-4e93-990a-57cd220a1d4b/resource/dc9ddc4b-f4cf-4196-8ffa-e5a6505f2b8e/download/community-care-licensing-residential-elder-care-facility-locations.csv" \
  | head -2

# Filter to one Sacramento County RCFE for a sanity check.
curl -sL "<same URL as above>" \
  | awk -F, 'NR==1 || $COUNTY_COL ~ /Sacramento/' \
  | head -3
```

**Result:** all attempted gov hosts return `HTTP/2 403 x-deny-reason: host_not_allowed` from this environment. Verified across `data.chhs.ca.gov`, `data.ca.gov`, `www.ccld.dss.ca.gov`, `healthdata.gov`, `catalog.data.gov`. No live row could be fetched; the field-shape table in §3 reflects what's documented in upstream descriptions, not a row I observed first-hand.

**Action item before the next PR:** run the curl one-liner above from any unrestricted environment, paste the header row plus one Sacramento facility row into the PR description for the backfill PR, and confirm column names match what we use in code.

---

## 7. Open questions

1. **Commercial-use license** — does CDSS require an approval / license for our use? *Owner: legal/operator.* Block on shipping the licensing component until answered.
2. **Refresh cadence** — what is the actual `metadata_modified` on (D)? Confirms whether monthly rebuilds are sufficient.
3. **License-number format** — CDSS license numbers for RCFEs are 9-digit (e.g., the example URL `FacDetail/197414992`). Confirm the CSV stores them as strings (leading zeros) so we don't lose any during import.
4. **County-name normalization** — both "Sacramento" and "SACRAMENTO" appear in CDSS sources. Trim/uppercase before fuzzy-match.
5. **Pre-2015 inspection history** — for facilities older than 11 years, the online record only goes back to 2015. Is that acceptable for the moat-narrative, or do we need the regional-office (J) request workflow?

---

*End of investigation.*
