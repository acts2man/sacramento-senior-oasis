import { SITE_URL } from '../constants';
import type { Facility } from '../../types/facility';
import type {
  ArticleInput,
  ArticleSchema,
  BreadcrumbCrumb,
  BreadcrumbListSchema,
  ItemListSchema,
  ListItem,
  LocalBusinessSchema,
  OrganizationSchema,
  PostalAddress,
  WebSiteSchema,
} from './types';

const ORG_NAME = 'Sacramento Senior Living Directory';
const ORG_DESCRIPTION =
  'Sacramento Senior Living Directory helps families compare assisted living, memory care, and board and care homes across the Sacramento metro.';
// Placeholder until a real brand logo asset exists.
const ORG_LOGO = `${SITE_URL}/og/default.png`;

const PLACEHOLDER_ADDRESS_PATTERNS = [/capitol avenue/i];
// Stock-photo CDNs that show up in seed photo data — these are not real
// facility photos, so they should not be advertised as such in schema.
const STOCK_IMAGE_HOSTS = ['images.unsplash.com'];

const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

const isReal = (value: string | undefined | null): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isRealAddress = (address: string | undefined): address is string => {
  if (!isReal(address)) return false;
  return !PLACEHOLDER_ADDRESS_PATTERNS.some(pattern => pattern.test(address));
};

const isRealImage = (url: string | undefined): url is string => {
  if (!isReal(url)) return false;
  return !STOCK_IMAGE_HOSTS.some(host => url.includes(host));
};

// Schema.org expects fully-qualified image URLs. Site-relative paths from
// `/public/` get prefixed with SITE_URL; absolute http(s) URLs pass through.
const toAbsoluteImageUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return absoluteUrl(url);
};

const facilityUrl = (facilityId: string) => absoluteUrl(`/${facilityId}`);

export const buildOrganizationSchema = (): OrganizationSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: ORG_NAME,
  url: SITE_URL,
  logo: ORG_LOGO,
  description: ORG_DESCRIPTION,
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Sacramento County, California',
  },
  sameAs: [],
});

export interface ContactPointInput {
  email?: string;
  telephone?: string;
}

export const buildOrganizationWithContactSchema = (
  contact: ContactPointInput | string,
): OrganizationSchema => {
  // Backwards-compat: callers used to pass a bare email string.
  const normalized: ContactPointInput =
    typeof contact === 'string' ? { email: contact } : contact;

  const contactPoint: OrganizationSchema['contactPoint'] = {
    '@type': 'ContactPoint',
    contactType: 'customer service',
  };
  if (normalized.email) contactPoint.email = normalized.email;
  if (normalized.telephone) contactPoint.telephone = normalized.telephone;

  return {
    ...buildOrganizationSchema(),
    contactPoint,
  };
};

export const buildWebsiteSchema = (): WebSiteSchema => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: SITE_URL,
  name: ORG_NAME,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/locations?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const buildLocalBusinessSchema = (facility: Facility): LocalBusinessSchema => {
  const url = facilityUrl(facility.id);

  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': url,
    additionalType: ['AssistedLiving'],
    name: facility.name,
    url,
  };

  if (isReal(facility.description)) {
    schema.description = facility.description;
  }

  const photoUrls = (facility.photos || []).map(p => p.url);
  const realImages = photoUrls.filter(isRealImage).map(toAbsoluteImageUrl);
  if (realImages.length > 0) {
    // Schema.org allows image to be a single URL or an array; we always
    // emit an array so consumers don't have to handle both shapes.
    schema.image = realImages;
  }

  if (isRealAddress(facility.street_address) && isReal(facility.city) && isReal(facility.zip)) {
    const address: PostalAddress = {
      '@type': 'PostalAddress',
      streetAddress: facility.street_address,
      addressLocality: facility.city,
      addressRegion: 'CA',
      postalCode: facility.zip,
      addressCountry: 'US',
    };
    schema.address = address;
  }

  // Telephone intentionally never emitted on facility schema; the
  // directory's master line is on the Organization schema. See
  // src/types/facility.ts for the full rationale.

  if (Number.isFinite(facility.lat) && Number.isFinite(facility.lng)) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: facility.lat,
      longitude: facility.lng,
    };
  }

  if (
    Number.isFinite(facility.price_range_low) &&
    Number.isFinite(facility.price_range_high)
  ) {
    schema.priceRange = `$${facility.price_range_low} - $${facility.price_range_high}`;
  }

  return schema;
};

export const buildItemListSchema = (
  facilities: Facility[],
  pageUrl: string,
): ItemListSchema => {
  const itemListElement: ListItem[] = facilities.map((facility, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: facility.name,
    item: facilityUrl(facility.id),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: pageUrl.startsWith('http') ? pageUrl : absoluteUrl(pageUrl),
    numberOfItems: itemListElement.length,
    itemListElement,
  };
};

export const buildBreadcrumbSchema = (crumbs: BreadcrumbCrumb[]): BreadcrumbListSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url.startsWith('http') ? crumb.url : absoluteUrl(crumb.url),
  })),
});

export const buildArticleSchema = (article: ArticleInput): ArticleSchema => {
  const author = { '@type': 'Organization' as const, name: ORG_NAME, url: SITE_URL };
  const publisher = {
    ...author,
    logo: { '@type': 'ImageObject' as const, url: ORG_LOGO },
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: article.url.startsWith('http') ? article.url : absoluteUrl(article.url),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    image: ORG_LOGO,
    author,
    publisher,
  };
};
