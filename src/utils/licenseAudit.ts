import type { Facility } from '../types/facility';

/**
 * Build-time verification that every licence claim the site renders is
 * substantiated by the CA Community Care Licensing roster.
 *
 * Licence verification is this directory's differentiator. In August 2026 two
 * curated records were found carrying another facility's licence number, and
 * both wrong numbers reported a CURRENT status that masked an ON PROBATION
 * licence at the real address — a green verified shield on a home families
 * were being invited to tour. The importer bug that caused it is fixed, but a
 * fix is not a guarantee. This gate is the guarantee: the build refuses to
 * ship a licence claim it cannot substantiate.
 *
 * Pure by design — the caller supplies the CSV text, so this module stays
 * free of `fs` and can be exercised anywhere.
 */

const STREET_SUFFIX_MAP: Record<string, string> = {
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

/** Must stay behaviourally identical to normAddress in scripts/import-cdss.mjs. */
export const normalizeAddress = (addr: string): string =>
  addr
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => STREET_SUFFIX_MAP[t] || t)
    .join(' ');

export interface RosterRow {
  licenseNumber: string;
  name: string;
  address: string;
  city: string;
  status: string;
}

export const parseRoster = (csvText: string): Map<string, RosterRow> => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < csvText.length; i++) {
    const c = csvText[i];
    if (inQuotes) {
      if (c === '"' && csvText[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }

  const header = rows[0].map((h) => h.replace(/^\uFEFF/, '').trim());
  const idx = (n: string) => header.indexOf(n);
  const out = new Map<string, RosterRow>();
  for (const r of rows.slice(1)) {
    if (r.length < header.length) continue;
    const licenseNumber = r[idx('facility_number')].trim();
    if (!licenseNumber) continue;
    out.set(licenseNumber, {
      licenseNumber,
      name: r[idx('facility_name')],
      address: r[idx('facility_address')],
      city: r[idx('facility_city')],
      status: r[idx('facility_status')],
    });
  }
  return out;
};

export interface LicenseViolation {
  id: string;
  name: string;
  licenseNumber: string;
  recordAddress: string;
  rosterAddress: string | null;
  reason: 'licence-not-in-roster' | 'address-disagrees';
}

export interface CorrectionDivergence {
  id: string;
  field: string;
  correctionValue: unknown;
  generatedValue: unknown;
}

export interface LicenseAuditResult {
  checked: number;
  violations: LicenseViolation[];
  divergentCorrections: CorrectionDivergence[];
  redundantCorrections: string[];
}

/**
 * @param facilities  every facility the site can render
 * @param csvText     the CCLD roster export
 * @param corrections LICENSE_CORRECTIONS — hand-applied licence overrides
 * @param generated   LICENSE_ENRICHMENT — what the importer produced
 */
export const auditLicenseClaims = (
  facilities: Facility[],
  csvText: string,
  corrections: Record<string, Partial<Facility>>,
  generated: Record<string, Partial<Facility>>,
): LicenseAuditResult => {
  const roster = parseRoster(csvText);
  const violations: LicenseViolation[] = [];
  let checked = 0;

  for (const f of facilities) {
    // No licence number means no licence claim is rendered — licenseBadge
    // returns null and LicensePanel does not mount. Nothing to substantiate.
    if (!f.license_number) continue;
    checked++;
    const row = roster.get(f.license_number);
    if (!row) {
      violations.push({
        id: f.id,
        name: f.name,
        licenseNumber: f.license_number,
        recordAddress: f.street_address,
        rosterAddress: null,
        reason: 'licence-not-in-roster',
      });
      continue;
    }
    if (normalizeAddress(row.address) !== normalizeAddress(f.street_address)) {
      violations.push({
        id: f.id,
        name: f.name,
        licenseNumber: f.license_number,
        recordAddress: f.street_address,
        rosterAddress: row.address,
        reason: 'address-disagrees',
      });
    }
  }

  // Every hand-applied correction must now be redundant — that is, the
  // importer must already produce the same values. A corrections file that
  // silently diverges from a fixed importer is how the original defect comes
  // back: the generated data regresses, the override hides it, and nobody
  // learns that the matcher broke again.
  const divergentCorrections: CorrectionDivergence[] = [];
  const redundantCorrections: string[] = [];
  for (const [id, correction] of Object.entries(corrections)) {
    const gen = (generated[id] ?? {}) as Record<string, unknown>;
    let divergent = false;
    for (const [field, value] of Object.entries(correction)) {
      if (gen[field] !== value) {
        divergentCorrections.push({ id, field, correctionValue: value, generatedValue: gen[field] });
        divergent = true;
      }
    }
    if (!divergent) redundantCorrections.push(id);
  }

  return { checked, violations, divergentCorrections, redundantCorrections };
};

/** Human-readable report; returns null when everything is substantiated. */
export const formatLicenseAuditFailure = (result: LicenseAuditResult): string | null => {
  if (result.violations.length === 0 && result.divergentCorrections.length === 0) return null;

  const lines: string[] = ['', 'LICENCE VERIFICATION GATE FAILED', ''];

  if (result.violations.length > 0) {
    lines.push(
      `${result.violations.length} record(s) render a licence claim the CCLD roster does not substantiate:`,
      '',
    );
    for (const v of result.violations) {
      lines.push(`  ${v.id}  (#${v.licenseNumber})`);
      lines.push(`    site   : ${v.name} — ${v.recordAddress}`);
      lines.push(
        v.reason === 'licence-not-in-roster'
          ? '    roster : licence number not present in assisted-living-sacramento-area.csv'
          : `    roster : that licence is at ${v.rosterAddress}`,
      );
      lines.push('');
    }
    lines.push(
      'A licence is tied to a building. If the roster address disagrees, the',
      'record is claiming a licence that belongs to a different facility.',
      '',
    );
  }

  if (result.divergentCorrections.length > 0) {
    lines.push(
      `${result.divergentCorrections.length} entry/entries in src/data/licenseCorrections.ts no longer match`,
      'what scripts/import-cdss.mjs generates:',
      '',
    );
    for (const d of result.divergentCorrections) {
      lines.push(
        `  ${d.id}.${d.field}: correction=${JSON.stringify(d.correctionValue)} generated=${JSON.stringify(d.generatedValue)}`,
      );
    }
    lines.push(
      '',
      'Corrections must stay redundant. Either fix the importer and re-run it so',
      'it produces these values, or delete the entry. Do not let an override',
      'quietly paper over a regression in the matcher.',
      '',
    );
  }

  return lines.join('\n');
};
