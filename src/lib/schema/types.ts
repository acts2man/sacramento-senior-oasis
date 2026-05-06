/**
 * Minimal TypeScript shapes for the schema.org JSON-LD objects we emit.
 * These are intentionally not exhaustive — only the fields the builders
 * actually produce are typed, so missing/optional data shows up as a
 * type error rather than silent stringification of `undefined`.
 */

interface SchemaThing {
  '@context'?: 'https://schema.org';
  '@type': string | string[];
  '@id'?: string;
}

export interface PostalAddress extends SchemaThing {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface GeoCoordinates extends SchemaThing {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface ContactPoint extends SchemaThing {
  '@type': 'ContactPoint';
  email?: string;
  telephone?: string;
  contactType: string;
}

export interface AdministrativeArea extends SchemaThing {
  '@type': 'AdministrativeArea';
  name: string;
}

export interface OrganizationSchema extends SchemaThing {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  areaServed: AdministrativeArea;
  sameAs: string[];
  contactPoint?: ContactPoint;
}

export interface SearchAction extends SchemaThing {
  '@type': 'SearchAction';
  target: string;
  'query-input': string;
}

export interface WebSiteSchema extends SchemaThing {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  url: string;
  name: string;
  potentialAction: SearchAction;
}

export interface LocalBusinessSchema extends SchemaThing {
  '@context': 'https://schema.org';
  '@type': 'LodgingBusiness';
  '@id': string;
  additionalType?: string[];
  name: string;
  url: string;
  description?: string;
  image?: string[];
  address?: PostalAddress;
  telephone?: string;
  geo?: GeoCoordinates;
  priceRange?: string;
}

export interface ListItem extends SchemaThing {
  '@type': 'ListItem';
  position: number;
  name: string;
  // schema.org canonical field for the linked thing on a ListItem entry.
  // Validators accept either a URL string or a Thing object; we always
  // emit the URL form.
  item: string;
}

export interface ItemListSchema extends SchemaThing {
  '@context': 'https://schema.org';
  '@type': 'ItemList';
  url: string;
  numberOfItems: number;
  itemListElement: ListItem[];
}

export interface BreadcrumbCrumb {
  name: string;
  url: string;
}

export interface BreadcrumbListSchema extends SchemaThing {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ArticleInput {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}

export interface ArticleSchema extends SchemaThing {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image: string;
  author: { '@type': 'Organization'; name: string; url: string };
  publisher: { '@type': 'Organization'; name: string; url: string; logo: { '@type': 'ImageObject'; url: string } };
}
