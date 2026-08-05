
import { Helmet } from 'react-helmet-async';
import { BRAND_NAME } from '../lib/constants';

/**
 * Per-page head tags. This component is the ONLY place a canonical or a meta
 * description may be set.
 *
 * Why that matters, and why `index.html` must stay clear of both:
 *
 * `index.html` is the SPA shell Netlify serves for every route, so anything
 * hardcoded in it lands on all ~770 URLs. It used to carry
 * `<link rel="canonical" href="https://sacramentoelderlycare.com/">` and a
 * site-wide `<meta name="description">`, both from the original Lovable
 * scaffold. The effects were:
 *
 *   - Pre-JS, the HTML of every URL declared itself a duplicate of the
 *     homepage. That is what a crawler sees before it renders anything.
 *   - Post-JS, `react-helmet-async` APPENDS its tags; it does not remove
 *     pre-existing ones it did not author. So each page ended up with two
 *     conflicting canonicals, and Google discards conflicting canonicals
 *     outright. The correct per-page canonical never took effect either way.
 *
 * Both tags were removed in the `seo/canonical-shell-fix` branch. With no
 * canonical in the shell, pre-JS crawls carry none at all and Google
 * self-canonicalises each URL, which is the right default.
 *
 * Lovable's "Update site info for publish" panel rewrites the shell's <title>
 * and og:/twitter: tags. It has never written the canonical, but it HAS
 * written the description — if a future publish re-adds one, delete it.
 *
 * Still outstanding (needs prerendering, not fixable here): pre-JS every URL
 * still serves the homepage <title>, and the shell's og:/twitter: tags are
 * left in place deliberately, since social crawlers do not run JavaScript and
 * stripping them would remove previews rather than correct them.
 */

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
