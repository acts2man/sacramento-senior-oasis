
import { Helmet } from 'react-helmet-async';
import { BRAND_NAME } from '../lib/constants';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  /**
   * When false, the brand suffix is NOT auto-appended to the page title.
   * Used by long-tail SEO pages (city × care-type) where keyword + city + N
   * already burns through the 60-char title budget and the brand belongs in
   * the meta description / OG site_name instead. Defaults to true so static
   * pages keep their existing branding.
   */
  appendBrand?: boolean;
}

const SEO = ({
  title,
  description,
  keywords,
  ogImage = '/placeholder.svg',
  ogType = 'website',
  canonical,
  appendBrand = true,
}: SEOProps) => {
  const fullTitle = !appendBrand || title.includes(BRAND_NAME)
    ? title
    : `${title} | ${BRAND_NAME}`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default SEO;
