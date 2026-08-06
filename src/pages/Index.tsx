import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import HeroHome from '../components/home/HeroHome';
import TrustBand from '../components/home/TrustBand';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedCommunities, { FEATURED_COMMUNITIES } from '../components/home/FeaturedCommunities';
import BrowseByCareType from '../components/home/BrowseByCareType';
import BrowseByCity from '../components/home/BrowseByCity';
import AdvisorCTA from '../components/home/AdvisorCTA';
import { BRAND_NAME, SITE_URL } from '../lib/constants';
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
  buildItemListSchema,
  buildBreadcrumbSchema,
} from '../lib/schema';

/**
 * Homepage title. Must stay byte-identical to the <title> in index.html — the
 * SPA shell serves that one to Googlebot's first pass and to every social
 * crawler, and Helmet swaps in this one after hydration. Two different titles
 * for one URL is a signal Google has to reconcile, and it resolved it by
 * showing neither reliably.
 *
 * Front-loaded on purpose. The previous version ran to 97 characters and
 * Google truncates display around 60, so "Assisted Living in Sacramento" is
 * the part that actually shows; the brand suffix is for the tab and for
 * disambiguation, not for the SERP. "assisted living facilities in sacramento"
 * is 1,300 searches/month at difficulty 4 and sat at position 28.
 *
 * SEO.tsx will not append the brand a second time — it skips the suffix when
 * the title already contains BRAND_NAME, which this one does.
 */
const HOME_TITLE = `Assisted Living in Sacramento | ${BRAND_NAME}`;
const HOME_DESCRIPTION =
  'Compare assisted living, memory care & senior living across Sacramento. License-verified communities, real costs, and free local advisors for families.';
const HOME_KEYWORDS =
  'assisted living sacramento, memory care sacramento, board and care homes sacramento, RCFE sacramento, senior living sacramento, residential care for the elderly, sacramento senior care advisor';

const Index = () => (
  <div className="flex flex-col min-h-screen">
    <SEO
      title={HOME_TITLE}
      description={HOME_DESCRIPTION}
      keywords={HOME_KEYWORDS}
      canonical={SITE_URL}
    />
    <JsonLd data={buildOrganizationSchema()} />
    <JsonLd data={buildWebsiteSchema()} />
    <JsonLd data={buildItemListSchema(FEATURED_COMMUNITIES, '/')} />
    <JsonLd data={buildBreadcrumbSchema([{ name: 'Home', url: '/' }])} />

    <Header />
    <main className="flex-grow">
      <HeroHome />
      <TrustBand />
      <HowItWorks />
      <FeaturedCommunities />
      <BrowseByCareType />
      <BrowseByCity />
      <AdvisorCTA />
    </main>
    <Footer />
  </div>
);

export default Index;
