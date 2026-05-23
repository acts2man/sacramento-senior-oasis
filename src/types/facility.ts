/**
 * Facility data model.
 *
 * Why there is no `telephone` field:
 *
 * Sacramento ElderCare Directory is a placement-agency lead funnel.
 * Families never call individual facilities through this site. Every inquiry
 * routes to a single master directory line (see `DIRECTORY_PHONE` in
 * `src/lib/constants.ts`) and the lead form. Our team qualifies the lead
 * and refers to facilities — facilities themselves are never advertised
 * with a phone number on this site, and no facility phone is rendered in
 * the UI or emitted in JSON-LD schema.
 *
 * If anyone proposes adding `telephone` to this type, push back: the routing
 * pattern is the product, not an oversight.
 */

export type CareType =
  | 'assisted_living'
  | 'memory_care'
  | 'board_and_care'
  | 'independent_living'
  | 'skilled_nursing'
  | 'respite_care'
  | 'hospice';

export type LicenseStatus =
  | 'current'
  | 'pending'
  | 'closed'
  | 'on_probation'
  | 'unknown';

export type LicenseType = 'RCFE' | 'SNF' | 'ARF' | 'GH';

export interface FacilityPhoto {
  url: string;
  alt: string;
  caption?: string;
}

export interface Facility {
  id: string;
  name: string;

  // Address
  street_address: string;
  city: string;
  neighborhood?: string;
  zip: string;
  county: string;
  // Geo is optional: the CDSS roster has no lat/lng, and we don't fabricate
  // coordinates. Map components must guard with Number.isFinite before use.
  lat?: number;
  lng?: number;

  // Care
  care_types: CareType[];
  description: string;
  /**
   * One-sentence factual summary used in list cards and meta-description
   * fallbacks. Imported facilities get an auto-generated short form; curated
   * ones may omit and the longer `description` is truncated as needed.
   */
  description_short?: string;

  // CA Community Care Licensing — populated by the CDSS backfill in the next PR
  license_number?: string;
  license_type?: LicenseType;
  license_status?: LicenseStatus;
  license_effective_date?: string; // ISO date
  capacity?: number;

  // Business
  price_range_low?: number;
  price_range_high?: number;
  amenities?: string[];
  room_types?: string[];
  languages?: string[];
  religious_affiliation?: string;
  lgbtq_friendly?: boolean;
  pet_friendly?: boolean;
  va_accepted?: boolean;
  medicaid_accepted?: boolean;

  // Media
  photos?: FacilityPhoto[];

  // ---------------------------------------------------------------
  // OWNER-SUPPLIED FIELDS — populated when (and only when) a verified
  // community owner adds their own data via the future owner portal.
  //
  // The detail-page UI checks for these and renders them in place of
  // the honest category-level defaults. The portal does not exist yet;
  // these fields are wired now so a later owner-data merge is just a
  // data shape change, not a UI rewrite.
  //
  // Whatever shape the eventual portal lands on, the contract here is:
  //   - presence of the field = "verified by owner"
  //   - absence = "no verified data, show category default"
  // The UI must never claim "[Owner says]" content for unverified rows.
  // ---------------------------------------------------------------

  /** Verified, owner-confirmed amenities for THIS specific home. */
  owner_amenities?: string[];
  /** Verified room/care pricing tiers — replaces the regional cost block when set. */
  owner_room_pricing?: { label: string; price_low?: number; price_high?: number; notes?: string }[];
  /** Owner-uploaded photos (separate from any directory-curated photos in `photos`). */
  owner_photos?: FacilityPhoto[];
  /** Extended owner-written description shown alongside the directory description. */
  owner_extended_description?: string;
  /** ISO date of the most recent owner-supplied data refresh, for the "Verified by owner on …" badge. */
  owner_verified_at?: string;

  // Metadata
  date_added?: string;
  date_updated?: string;
  is_partner?: boolean;

  // INTENTIONALLY ABSENT: telephone. See file header.
}
