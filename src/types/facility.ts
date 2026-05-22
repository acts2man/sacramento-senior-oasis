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
  lat: number;
  lng: number;

  // Care
  care_types: CareType[];
  description: string;

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

  // Metadata
  date_added?: string;
  date_updated?: string;
  is_partner?: boolean;

  // INTENTIONALLY ABSENT: telephone. See file header.
}
