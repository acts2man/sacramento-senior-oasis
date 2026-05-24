export const SITE_URL = 'https://sacramentoelderlycare.com';

/**
 * Public-facing directory brand. Imported by every component, page, schema
 * builder, and meta-tag emitter so a future rename is a one-line change here.
 *
 * BRAND_NAME_SHORT exists for tight surfaces (e.g., chip labels, ARIA labels)
 * where the full name doesn't fit. Today both values are identical; keep the
 * two exports separate so the abstraction is in place when we want one.
 */
export const BRAND_NAME = 'Sacramento ElderCare Directory';
export const BRAND_NAME_SHORT = 'Sacramento ElderCare Directory';

/**
 * Directory's master concierge line. All facility inquiries route here.
 *
 * Set to null until a tracked number is provisioned. When null, UI shows
 * form-only CTAs; when set, UI shows phone + form CTAs and the Organization
 * JSON-LD on the Contact page includes the number on its ContactPoint.
 *
 * The string format expected here is "(XXX) XXX-XXXX". Use formatPhoneForTel
 * for tel: links and formatPhoneForDisplay for visible UI text.
 */
export const DIRECTORY_PHONE: string | null = '(916) 270-1565';

const onlyDigits = (s: string) => s.replace(/\D+/g, '');

/**
 * Convert a US phone string to an E.164 tel: target ("+1XXXXXXXXXX").
 * Accepts inputs like "(916) 555-1234", "916-555-1234", "9165551234", or
 * already-prefixed "+19165551234". Throws on input with anything other
 * than 10 digits (or 11 starting with 1) so a malformed value is caught
 * at startup rather than producing a broken tel: link.
 */
export function formatPhoneForTel(phone: string): string {
  const digits = onlyDigits(phone);
  if (digits.length === 11 && digits.startsWith('1')) {
    return `tel:+${digits}`;
  }
  if (digits.length === 10) {
    return `tel:+1${digits}`;
  }
  throw new Error(`formatPhoneForTel: expected a 10-digit US number, got "${phone}"`);
}

/**
 * Format a US phone number for display: "(XXX) XXX-XXXX". Same input
 * tolerance as formatPhoneForTel. Throws on malformed input for the same
 * reason — silent fall-through to displaying a wrong number is worse than
 * a build break.
 */
export function formatPhoneForDisplay(phone: string): string {
  const digits = onlyDigits(phone);
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (ten.length !== 10) {
    throw new Error(`formatPhoneForDisplay: expected a 10-digit US number, got "${phone}"`);
  }
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}
