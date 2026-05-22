#!/usr/bin/env node
/**
 * CDSS RCFE import — one-time / re-runnable build tool.
 *
 * Reads `assisted-living-sacramento-area.csv` (CA Community Care Licensing
 * Division RCFE roster for the Sacramento + Placer regions), and writes:
 *
 *   src/data/imported.generated.ts
 *     - IMPORTED_FACILITIES: Facility[] for the new license-verified records
 *     - LICENSE_ENRICHMENT: { [curatedId]: Partial<Facility> } adding license
 *       fields onto our pre-existing curated 24 where the CSV matched.
 *
 * It also updates the AUTOGEN block in src/data/cities.ts so any new city
 * with at least one imported facility gets a Tier-1 city record.
 *
 * The app reads the generated data; it never reads the CSV at runtime.
 *
 * Run:   node scripts/import-cdss.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT, 'assisted-living-sacramento-area.csv');
const CURATED_TS = path.join(ROOT, 'src/data/curated.ts');
const IMPORTED_TS = path.join(ROOT, 'src/data/imported.generated.ts');
const CITIES_TS = path.join(ROOT, 'src/data/cities.ts');

/* ----------------------------- CSV parser ----------------------------- */

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else if (c !== '\r') {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/* ----------------------------- normalizers ----------------------------- */

const titleCase = (s) =>
  s
    .toLowerCase()
    // Split on whitespace AND on '&' so "A&C" doesn't collapse to "A&c".
    .split(/(\s+|&|-|\/)/)
    .map((w) => {
      if (w.length === 0 || /^[\s&\-/]+$/.test(w)) return w;
      return w[0].toUpperCase() + w.slice(1);
    })
    .join('')
    .replace(/\b(Ii|Iii|Iv|Llc|Ii\.|Iii\.)\b/g, (m) => m.toUpperCase().replace('.', ''));

// Street-address title-case with light suffix abbreviations preserved.
const titleCaseAddress = (s) => {
  let out = titleCase(s);
  // Common street-suffix abbreviations stay uppercase only for short ones.
  out = out.replace(/\bSt\b/g, 'St');
  out = out.replace(/\bAve\b/g, 'Ave');
  out = out.replace(/\bDr\b/g, 'Dr');
  out = out.replace(/\bBlvd\b/g, 'Blvd');
  return out;
};

// Facility-name title-case that keeps a few all-caps tokens (RCFE etc).
const titleCaseName = (s) => {
  let out = titleCase(s);
  out = out.replace(/\bRcfe\b/g, 'RCFE');
  out = out.replace(/\bUsa\b/g, 'USA');
  out = out.replace(/\bAcc\b/g, 'ACC');
  return out;
};

const CITY_TYPOS = {
  SACRAMNETO: { city: 'Sacramento' },
  'CIRTUS HEIGHTS': { city: 'Citrus Heights' },
  'CITUS HEIGHTS': { city: 'Citrus Heights' },
  'EK GROVE': { city: 'Elk Grove' },
  // Neighborhood promoted into Sacramento — keeps directory routes clean.
  'EAST SACRAMENTO': { city: 'Sacramento', neighborhood: 'East Sacramento' },
};

const corrections = [];
function normalizeCity(rawCity) {
  const upper = rawCity.trim().toUpperCase();
  if (CITY_TYPOS[upper]) {
    const fix = CITY_TYPOS[upper];
    corrections.push({ from: rawCity, to: fix.city, neighborhood: fix.neighborhood });
    return { city: fix.city, neighborhood: fix.neighborhood };
  }
  return { city: titleCase(upper), neighborhood: undefined };
}

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const toIsoDate = (mdY) => {
  if (!mdY) return undefined;
  const m = mdY.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!m) return undefined;
  const mm = m[1].padStart(2, '0');
  const dd = m[2].padStart(2, '0');
  let yyyy = m[3];
  if (yyyy.length === 2) yyyy = (parseInt(yyyy, 10) > 30 ? '19' : '20') + yyyy;
  return `${yyyy}-${mm}-${dd}`;
};

const yearOf = (iso) => (iso ? parseInt(iso.slice(0, 4), 10) : undefined);

/* ----------------------- dedupe (name + address) ----------------------- */

const STOPWORDS = new Set([
  'THE', 'AND', 'OF', 'FOR', 'A', 'AT', 'AN',
  'ASSISTED', 'LIVING', 'CARE', 'HOME', 'HOMES', 'HOUSE',
  'ELDERLY', 'SENIOR', 'SENIORS', 'FACILITY', 'COMMUNITY',
  'LLC', 'INC', 'CO', 'LP', 'LTD',
  'ELDER',
]);

const STREET_SUFFIX_MAP = {
  STREET: 'ST', ST: 'ST',
  AVENUE: 'AVE', AVE: 'AVE',
  DRIVE: 'DR', DR: 'DR',
  BOULEVARD: 'BLVD', BLVD: 'BLVD',
  COURT: 'CT', CT: 'CT',
  CIRCLE: 'CIR', CIR: 'CIR',
  WAY: 'WAY',
  LANE: 'LN', LN: 'LN',
  ROAD: 'RD', RD: 'RD',
  PLACE: 'PL', PL: 'PL',
  TERRACE: 'TER', TER: 'TER',
};

function normNameTokens(name) {
  return name
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => !STOPWORDS.has(t));
}

function normNameKey(name) {
  return normNameTokens(name).sort().join(' ');
}

function normAddress(addr) {
  return addr
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => STREET_SUFFIX_MAP[t] || t)
    .join(' ');
}

function nameTokensOverlap(aTokens, bTokens) {
  if (aTokens.length === 0 || bTokens.length === 0) return 0;
  const aSet = new Set(aTokens);
  const bSet = new Set(bTokens);
  let inter = 0;
  for (const t of aSet) if (bSet.has(t)) inter++;
  return inter / Math.min(aSet.size, bSet.size);
}

/* ----------------------- curated record extraction ----------------------- */

/**
 * Parse the existing curated TS file to get the minimal fields we need for
 * matching (id, name, street_address, city, zip). Uses a forgiving regex
 * because the records are uniformly structured.
 */
function extractCuratedSummaries(curatedSource) {
  const out = [];
  // Find each object literal that starts with `id: "..."`.
  const re = /id:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*street_address:\s*"([^"]+)",\s*\n\s*city:\s*"([^"]+)",\s*\n\s*zip:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(curatedSource)) !== null) {
    out.push({
      id: m[1],
      name: m[2],
      street_address: m[3],
      city: m[4],
      zip: m[5],
    });
  }
  return out;
}

/* ----------------------- description templater ----------------------- */

function buildDescriptions(facility) {
  const { name, city, capacity, license_year, on_probation } = facility;
  const bcOrAl =
    capacity <= 6
      ? `a board and care home serving up to ${capacity} residents`
      : `an assisted living community with capacity for ${capacity} residents`;

  const sinceClause = license_year ? `Licensed since ${license_year}, ` : '';
  const probationClause = on_probation
    ? ` This facility's license is currently on probation with the California Department of Social Services.`
    : '';

  const description =
    `${name} is a licensed residential care facility for the elderly (RCFE) in ${city}, CA. ` +
    `${sinceClause}it is ${bcOrAl}.${probationClause}`;

  const shortBcOrAl =
    capacity <= 6
      ? 'board and care home'
      : 'assisted living community';
  const description_short = `${name} is an RCFE-licensed ${shortBcOrAl} in ${city}, CA${
    license_year ? `, licensed since ${license_year}` : ''
  }.`;

  return { description, description_short };
}

/* --------------------------------- main --------------------------------- */

function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV not found at ${CSV_PATH} — aborting (will not fabricate records).`);
    process.exit(1);
  }

  const csvText = fs.readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, '');
  const rows = parseCSV(csvText);
  const header = rows[0];
  const ci = (n) => header.indexOf(n);
  const data = rows.slice(1).filter((r) => r.length > 1);

  // 1. Filter LICENSED + ON PROBATION, no closed_date.
  const inScope = data.filter((r) => {
    const status = r[ci('facility_status')];
    const closed = r[ci('closed_date')];
    return (status === 'LICENSED' || status === 'ON PROBATION') && !closed;
  });

  // 2. Curated summaries for dedupe.
  if (!fs.existsSync(CURATED_TS)) {
    console.error(`Curated file not found at ${CURATED_TS} — run the curated-extraction step first.`);
    process.exit(1);
  }
  const curatedSource = fs.readFileSync(CURATED_TS, 'utf8');
  const curatedSummaries = extractCuratedSummaries(curatedSource);
  if (curatedSummaries.length === 0) {
    console.error(`No curated records found in ${CURATED_TS} — aborting.`);
    process.exit(1);
  }

  const curatedNameKeyIndex = curatedSummaries.map((c) => ({
    summary: c,
    nameTokens: normNameTokens(c.name),
    addrKey: normAddress(c.street_address),
    zip: c.zip,
  }));

  // 3. Build records.
  const importedRaw = [];
  const enrichmentMap = {}; // curatedId -> { license_* fields }
  const pendingEnrichmentSkips = []; // for stats
  const matchedCuratedIds = new Set();

  for (const r of inScope) {
    const facilityName = titleCaseName(r[ci('facility_name')]);
    const rawCity = r[ci('facility_city')];
    const { city, neighborhood } = normalizeCity(rawCity);
    const streetAddress = titleCaseAddress(r[ci('facility_address')]);
    const zip = r[ci('facility_zip')];
    const county = titleCase(r[ci('county_name')]);
    const status = r[ci('facility_status')];
    const license_number = r[ci('facility_number')];
    const capacity = parseInt(r[ci('facility_capacity')], 10);
    const license_effective_date = toIsoDate(r[ci('license_first_date')]);
    const license_status = status === 'ON PROBATION' ? 'on_probation' : 'current';

    // Dedupe against curated.
    const candidateTokens = normNameTokens(facilityName);
    const candidateAddr = normAddress(streetAddress);

    let match = null;
    for (const c of curatedNameKeyIndex) {
      const nameScore = nameTokensOverlap(candidateTokens, c.nameTokens);
      const addrMatch = candidateAddr === c.addrKey;
      const zipMatch = zip === c.zip;
      // Strong: addr match (different zips OK — curated zips have known errors) AND name overlap >= 50%.
      if (addrMatch && nameScore >= 0.5) {
        match = c.summary;
        break;
      }
      // Also strong: very high name overlap AND zip match.
      if (zipMatch && nameScore >= 0.8) {
        match = c.summary;
        break;
      }
    }

    if (match) {
      matchedCuratedIds.add(match.id);
      enrichmentMap[match.id] = {
        license_number,
        license_type: 'RCFE',
        license_status,
        license_effective_date,
        capacity,
        county,
      };
      continue;
    }

    importedRaw.push({
      facilityName,
      city,
      neighborhood,
      streetAddress,
      zip,
      county,
      capacity,
      license_number,
      license_status,
      license_effective_date,
      status,
    });
  }

  // Also: PENDING curated dedupe skips (informational). The user opted for
  // "don't enrich on pending matches", but we still want to report them.
  for (const r of data) {
    const status = r[ci('facility_status')];
    if (status !== 'PENDING') continue;
    const closed = r[ci('closed_date')];
    if (closed) continue;
    const candidateTokens = normNameTokens(titleCaseName(r[ci('facility_name')]));
    const candidateAddr = normAddress(titleCaseAddress(r[ci('facility_address')]));
    const zip = r[ci('facility_zip')];
    for (const c of curatedNameKeyIndex) {
      const nameScore = nameTokensOverlap(candidateTokens, c.nameTokens);
      const addrMatch = candidateAddr === c.addrKey;
      const zipMatch = zip === c.zip;
      if ((addrMatch && nameScore >= 0.5) || (zipMatch && nameScore >= 0.8)) {
        pendingEnrichmentSkips.push({
          curatedName: c.summary.name,
          curatedId: c.summary.id,
          csvName: titleCaseName(r[ci('facility_name')]),
          csvLicense: r[ci('facility_number')],
        });
        break;
      }
    }
  }

  // 4. Stable, unique slug per imported facility.
  const usedIds = new Set(curatedSummaries.map((c) => c.id));
  const finalImported = importedRaw.map((rec) => {
    const baseSlug = slugify(`${rec.facilityName}-${rec.city}`);
    let id = baseSlug;
    let n = 2;
    while (usedIds.has(id)) {
      id = `${baseSlug}-${n}`;
      n++;
    }
    usedIds.add(id);

    const license_year = yearOf(rec.license_effective_date);
    const { description, description_short } = buildDescriptions({
      name: rec.facilityName,
      city: rec.city,
      capacity: rec.capacity,
      license_year,
      on_probation: rec.license_status === 'on_probation',
    });

    const care_types =
      rec.capacity <= 6 ? ['board_and_care', 'assisted_living'] : ['assisted_living'];

    return {
      id,
      name: rec.facilityName,
      street_address: rec.streetAddress,
      city: rec.city,
      ...(rec.neighborhood ? { neighborhood: rec.neighborhood } : {}),
      zip: rec.zip,
      county: rec.county,
      care_types,
      description,
      description_short,
      license_number: rec.license_number,
      license_type: 'RCFE',
      license_status: rec.license_status,
      ...(rec.license_effective_date ? { license_effective_date: rec.license_effective_date } : {}),
      capacity: rec.capacity,
    };
  });

  // 5. Sort imported facilities for stable diffs (by city, then name).
  finalImported.sort((a, b) =>
    a.city.localeCompare(b.city) || a.name.localeCompare(b.name)
  );

  // 6. Determine new cities to add to cities.ts AUTOGEN block.
  const existingCitySlugs = extractExistingCitySlugs(fs.readFileSync(CITIES_TS, 'utf8'));
  const PLACER_CITIES = new Set(['Roseville', 'Rocklin', 'Auburn', 'Lincoln', 'Loomis', 'Colfax']);
  const SACRAMENTO_CITIES = new Set([
    'Sacramento', 'Elk Grove', 'Carmichael', 'Citrus Heights', 'Fair Oaks',
    'Orangevale', 'Antelope', 'Rancho Cordova', 'North Highlands', 'Elverta',
    'Galt', 'Folsom', 'Rio Linda', 'Gold River', 'Wilton', 'East Sacramento',
  ]);

  const importedByCity = {};
  for (const f of finalImported) {
    importedByCity[f.city] = (importedByCity[f.city] || 0) + 1;
  }
  const newCities = [];
  for (const cityName of Object.keys(importedByCity).sort()) {
    const slug = slugify(cityName);
    if (existingCitySlugs.has(slug)) continue;
    const county = PLACER_CITIES.has(cityName)
      ? 'Placer'
      : SACRAMENTO_CITIES.has(cityName)
        ? 'Sacramento'
        : 'Sacramento'; // CSV scope is Sacramento+Placer; fallback to Sacramento.
    newCities.push({ slug, name: cityName, county, count: importedByCity[cityName] });
  }

  /* -------------------------- write outputs -------------------------- */

  writeImportedFile(finalImported, enrichmentMap);
  writeCitiesAutogenBlock(newCities);

  /* ----------------------------- stats ----------------------------- */

  const total = finalImported.length;
  const licensed = finalImported.filter((f) => f.license_status === 'current').length;
  const onProbation = finalImported.filter((f) => f.license_status === 'on_probation').length;
  const boardAndCare = finalImported.filter((f) => f.care_types.includes('board_and_care')).length;
  const al = finalImported.filter((f) => !f.care_types.includes('board_and_care')).length;

  const byCity = {};
  for (const f of finalImported) byCity[f.city] = (byCity[f.city] || 0) + 1;

  console.log('\n=== CDSS RCFE import summary ===\n');
  console.log(`Imported facilities (new):           ${total}`);
  console.log(`  - status current (LICENSED):       ${licensed}`);
  console.log(`  - status on_probation:             ${onProbation}`);
  console.log(`  - board & care (capacity ≤ 6):     ${boardAndCare}`);
  console.log(`  - assisted living (capacity > 6):  ${al}`);
  console.log(`Curated records enriched:            ${Object.keys(enrichmentMap).length}`);
  console.log(`Curated records skipped (PENDING):   ${pendingEnrichmentSkips.length}`);
  console.log(`New cities added to cities.ts:       ${newCities.length}`);

  console.log('\n— by city —');
  Object.entries(byCity)
    .sort((a, b) => b[1] - a[1])
    .forEach(([c, n]) => console.log(`  ${n.toString().padStart(4)}  ${c}`));

  console.log('\n— curated enrichments —');
  for (const [id, fields] of Object.entries(enrichmentMap)) {
    console.log(`  ${id}  ->  lic ${fields.license_number} / ${fields.license_status} / cap ${fields.capacity}`);
  }

  if (pendingEnrichmentSkips.length) {
    console.log('\n— curated matches with PENDING CSV status (NOT enriched) —');
    for (const s of pendingEnrichmentSkips) {
      console.log(`  ${s.curatedId}  (curated "${s.curatedName}")  <-  CSV pending "${s.csvName}" lic ${s.csvLicense}`);
    }
  }

  if (corrections.length) {
    const uniq = {};
    for (const c of corrections) {
      const key = `${c.from} -> ${c.to}${c.neighborhood ? ` (neighborhood: ${c.neighborhood})` : ''}`;
      uniq[key] = (uniq[key] || 0) + 1;
    }
    console.log('\n— city normalizations applied —');
    Object.entries(uniq).forEach(([k, n]) => console.log(`  ${n}×  ${k}`));
  }

  if (newCities.length) {
    console.log('\n— new cities added —');
    newCities.forEach((c) => console.log(`  ${c.slug}  (${c.name}, ${c.county})  — ${c.count} facilities`));
  }

  console.log(`\nWrote ${IMPORTED_TS}`);
  console.log(`Updated AUTOGEN block in ${CITIES_TS}`);
}

/* ------------------------ output: imported.ts ------------------------ */

function tsValue(v) {
  if (v === undefined) return 'undefined';
  if (v === null) return 'null';
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : 'undefined';
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) return `[${v.map(tsValue).join(', ')}]`;
  if (typeof v === 'object') {
    const inner = Object.entries(v)
      .filter(([, val]) => val !== undefined)
      .map(([k, val]) => `    ${k}: ${tsValue(val)}`)
      .join(',\n');
    return `{\n${inner}\n  }`;
  }
  return JSON.stringify(v);
}

function emitFacility(rec) {
  const fields = [
    ['id', rec.id],
    ['name', rec.name],
    ['street_address', rec.street_address],
    ['city', rec.city],
    rec.neighborhood ? ['neighborhood', rec.neighborhood] : null,
    ['zip', rec.zip],
    ['county', rec.county],
    ['care_types', rec.care_types],
    ['description', rec.description],
    ['description_short', rec.description_short],
    ['license_number', rec.license_number],
    ['license_type', rec.license_type],
    ['license_status', rec.license_status],
    rec.license_effective_date ? ['license_effective_date', rec.license_effective_date] : null,
    ['capacity', rec.capacity],
  ].filter(Boolean);
  return (
    '  {\n' +
    fields.map(([k, v]) => `    ${k}: ${tsValue(v)},`).join('\n') +
    '\n  }'
  );
}

function writeImportedFile(facilities, enrichmentMap) {
  const enrichmentEntries = Object.entries(enrichmentMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, fields]) => {
      const inner = Object.entries(fields)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `    ${k}: ${tsValue(v)}`)
        .join(',\n');
      return `  ${JSON.stringify(id)}: {\n${inner},\n  }`;
    })
    .join(',\n');

  const facilitiesBlock = facilities.map(emitFacility).join(',\n');

  const banner = `// AUTOGENERATED — do not edit by hand.
// Source:  assisted-living-sacramento-area.csv
// Script:  scripts/import-cdss.mjs
// Run:     node scripts/import-cdss.mjs
//
// Contains license-verified RCFE facilities pulled from CA Community Care
// Licensing Division (CDSS / CCLD). Records carry only verifiable facts:
// name, address, city, county, license number/status/effective date, and
// CDSS-reported capacity. No invented amenities, prices, photos, ratings,
// languages, or room types — this is by design (see CLAUDE.md).`;

  const out = `${banner}

import type { Facility } from '../types/facility';

/** Imported RCFE communities (Sacramento + Placer regions). */
export const IMPORTED_FACILITIES: Facility[] = [
${facilitiesBlock}
];

/**
 * License-field enrichment for our hand-curated facilities. The curated
 * record stays the source of truth for description/photos/care_types/etc;
 * this map only adds objective license data found in the CCLD CSV.
 */
export const LICENSE_ENRICHMENT: Record<string, Partial<Facility>> = {
${enrichmentEntries}
};
`;
  fs.writeFileSync(IMPORTED_TS, out, 'utf8');
}

/* ------------------------ output: cities.ts ------------------------ */

const AUTOGEN_BEGIN = '  // === BEGIN AUTOGEN CITIES (regenerated by scripts/import-cdss.mjs) ===';
const AUTOGEN_END = '  // === END AUTOGEN CITIES ===';

function extractExistingCitySlugs(source) {
  // Skip slugs inside the AUTOGEN block so a re-run doesn't see its own
  // previously-written output as "already existing" and erase it.
  const beginIdx = source.indexOf(AUTOGEN_BEGIN);
  const endIdx = source.indexOf(AUTOGEN_END);
  const filtered =
    beginIdx >= 0 && endIdx > beginIdx
      ? source.slice(0, beginIdx) + source.slice(endIdx + AUTOGEN_END.length)
      : source;
  const out = new Set();
  const re = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(filtered)) !== null) out.add(m[1]);
  return out;
}

function emitCityRecord(c) {
  return (
    `  {\n` +
    `    name: '${c.name}',\n` +
    `    slug: '${c.slug}',\n` +
    `    county: '${c.county}',\n` +
    `    description: 'Sacramento-metro community with RCFE-licensed senior care homes pulled from the CA Community Care Licensing roster.',\n` +
    `    // TODO: replace with specific hospital names confirmed for ${c.name}.\n` +
    `    nearbyHospitals: [],\n` +
    `  },`
  );
}

function writeCitiesAutogenBlock(newCities) {
  let source = fs.readFileSync(CITIES_TS, 'utf8');

  const block =
    `${AUTOGEN_BEGIN}\n` +
    (newCities.length
      ? newCities.map(emitCityRecord).join('\n') + '\n'
      : '  // (no new cities at last run)\n') +
    `${AUTOGEN_END}`;

  if (source.includes(AUTOGEN_BEGIN)) {
    const re = new RegExp(
      `${escapeRegex(AUTOGEN_BEGIN)}[\\s\\S]*?${escapeRegex(AUTOGEN_END)}`,
      'm'
    );
    source = source.replace(re, block);
  } else {
    // Insert just before the closing "];" of the CITIES array. We anchor on
    // the array declaration to avoid colliding with the `string[]` inside
    // the City interface earlier in the file.
    const arrayDecl = 'export const CITIES: City[] = [';
    const arrayStart = source.indexOf(arrayDecl);
    if (arrayStart === -1) {
      throw new Error('cities.ts: cannot locate CITIES array declaration to insert autogen block.');
    }
    // Walk forward from the OPENING bracket of the array literal itself
    // (the `[` at the end of arrayDecl, not the `City[]` type annotation).
    let i = arrayStart + arrayDecl.length;
    let depth = 1;
    let inStr = false;
    let strCh = '';
    while (i < source.length && depth > 0) {
      const c = source[i];
      if (inStr) {
        if (c === '\\') { i += 2; continue; }
        if (c === strCh) inStr = false;
      } else {
        if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; }
        else if (c === '[') depth++;
        else if (c === ']') depth--;
      }
      if (depth === 0) break;
      i++;
    }
    // i now points at the closing ']' of the CITIES array.
    source = source.slice(0, i) + `${block}\n` + source.slice(i);
  }
  fs.writeFileSync(CITIES_TS, source, 'utf8');
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

main();
