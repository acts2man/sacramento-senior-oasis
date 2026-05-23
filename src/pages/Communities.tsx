import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, ArrowRight, Building2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import { BRAND_NAME, SITE_URL } from '../lib/constants';
import {
  CITIES_WITH_INVENTORY,
  CITIES_WITHOUT_INVENTORY,
  citiesGroupedByCounty,
  totalCommunityCount,
} from '../lib/cityInventory';
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
} from '../lib/schema';
import { locations } from '../data/locations';

/**
 * /communities — the central hub that resolves the orphan-page problem.
 *
 * This page is the one well-linked surface that points to every city page
 * the directory publishes. The header dropdown and footer both link here;
 * each city's /assisted-living/{slug} page is linked from here at least
 * once (usually twice — under its county AND in the alphabetical fallback
 * if any). That gives every city page real internal-link equity.
 *
 * SEO furniture: unique title, meta, self-canonical, BreadcrumbList +
 * ItemList JSON-LD. The ItemList lists the full directory so the page
 * carries the same crawlable inventory weight as /locations.
 */

const CANONICAL = `${SITE_URL}/communities`;
const TITLE = `Senior Care Communities Across the Sacramento Metro | ${BRAND_NAME}`;
const DESCRIPTION =
  "Browse every Sacramento-metro city we cover — assisted living, memory care, and licensed board & care homes — with community counts and direct links to each city page.";
const KEYWORDS =
  'senior living sacramento metro, sacramento assisted living cities, board and care homes sacramento, RCFE sacramento, communities directory';

const Communities = () => {
  const grouped = citiesGroupedByCounty();
  const total = totalCommunityCount();
  const cityCount = CITIES_WITH_INVENTORY.length;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Communities', url: '/communities' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        keywords={KEYWORDS}
        canonical={CANONICAL}
        appendBrand={false}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      {/* ItemList of the full directory — same coverage as /locations so the
          hub carries comparable crawlable inventory weight. */}
      <JsonLd data={buildItemListSchema(locations, '/communities')} />

      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="bg-sage-50">
          <div className="container-custom py-12 md:py-16">
            <nav aria-label="Breadcrumb" className="text-sm text-neutral-600 mb-6">
              <ol className="flex items-center flex-wrap gap-1">
                <li><Link to="/" className="hover:text-teal-700">Home</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} className="text-neutral-400" /></li>
                <li className="text-neutral-800 font-medium">Communities</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">Directory hub</p>
              <h1 className="mt-2 font-serif text-3xl md:text-5xl font-bold text-neutral-800 leading-tight">
                Senior care communities across the Sacramento metro
              </h1>
              <p className="mt-5 text-lg text-neutral-700 leading-relaxed">
                The directory currently lists <strong>{total}</strong>{' '}
                license-verified senior care communities across <strong>{cityCount}</strong>{' '}
                Sacramento-metro cities — assisted living, memory care, and small
                board &amp; care homes (RCFEs). Pick a city to see who's open and what families pay.
              </p>
            </div>
          </div>
        </section>

        {/* BY CARE TYPE — entry points to the care-type variants */}
        <section aria-labelledby="care-types-heading" className="bg-white">
          <div className="container-custom py-12 md:py-16">
            <h2 id="care-types-heading" className="font-serif text-2xl md:text-3xl font-bold text-neutral-800">
              Browse by care type
            </h2>
            <p className="mt-3 text-neutral-700 max-w-2xl">
              Each care type runs the same Sacramento-first city coverage; start with the type that fits your situation.
            </p>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <li>
                <Link
                  to="/assisted-living"
                  className="block h-full bg-sage-50 border border-teal-100 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all group"
                >
                  <Building2 size={18} className="text-teal-700" aria-hidden="true" />
                  <p className="mt-2 font-serif text-lg font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
                    Assisted Living
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Help with daily living, with a private apartment and on-site staff.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  to="/memory-care"
                  className="block h-full bg-sage-50 border border-teal-100 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all group"
                >
                  <Building2 size={18} className="text-teal-700" aria-hidden="true" />
                  <p className="mt-2 font-serif text-lg font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
                    Memory Care
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Secured communities for Alzheimer's and dementia.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  to="/board-and-care-homes/sacramento"
                  className="block h-full bg-sage-50 border border-teal-100 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all group"
                >
                  <Building2 size={18} className="text-teal-700" aria-hidden="true" />
                  <p className="mt-2 font-serif text-lg font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
                    Board &amp; Care Homes
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Small, license-verified residential homes (6 residents or fewer).
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  to="/senior-living/sacramento"
                  className="block h-full bg-sage-50 border border-teal-100 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all group"
                >
                  <Building2 size={18} className="text-teal-700" aria-hidden="true" />
                  <p className="mt-2 font-serif text-lg font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
                    Senior Living
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    All care types together — assisted living, memory care, and board &amp; care.
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* BY CITY — grouped by county */}
        <section aria-labelledby="by-city-heading" className="bg-neutral-50">
          <div className="container-custom py-12 md:py-16">
            <h2 id="by-city-heading" className="font-serif text-2xl md:text-3xl font-bold text-neutral-800">
              Browse by city
            </h2>
            <p className="mt-3 text-neutral-700 max-w-2xl">
              Every Sacramento-metro city with at least one license-verified community in the directory, grouped by county. Each link goes to that city's assisted-living page.
            </p>
            <div className="mt-8 space-y-10">
              {grouped.map(({ county, cities }) => (
                <div key={county}>
                  <h3 className="font-serif text-xl font-semibold text-teal-800">
                    {county} County
                  </h3>
                  <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {cities.map(c => (
                      <li key={c.slug}>
                        <Link
                          to={`/assisted-living/${c.slug}`}
                          className="group flex items-center justify-between bg-white border border-neutral-200 rounded-lg px-4 py-3 hover:border-teal-300 hover:shadow-sm transition-all"
                        >
                          <span className="flex items-center gap-2">
                            <MapPin size={14} className="text-teal-700 flex-shrink-0" aria-hidden="true" />
                            <span className="font-medium text-neutral-800 group-hover:text-teal-700 transition-colors">
                              {c.name}
                            </span>
                          </span>
                          <span className="text-xs text-neutral-500 group-hover:text-teal-700">
                            {c.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tier-1 cities without listings yet — surfaced so we capture
                the search demand for those city names, with a graceful
                empty-state on the destination page. */}
            {CITIES_WITHOUT_INVENTORY.length > 0 && (
              <div className="mt-12 border-t border-neutral-200 pt-8">
                <h3 className="font-serif text-lg font-semibold text-neutral-800">
                  Cities we're actively adding
                </h3>
                <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
                  We don't list communities we haven't verified, so a few Tier-1 cities are still building inventory. Each link goes to a city page where a Sacramento advisor can shortlist nearby openings.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {CITIES_WITHOUT_INVENTORY.map(c => (
                    <li key={c.slug}>
                      <Link
                        to={`/assisted-living/${c.slug}`}
                        className="inline-flex items-center bg-white border border-neutral-200 text-neutral-700 rounded-full px-4 py-1.5 text-sm hover:border-teal-300 hover:text-teal-700 transition-colors"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="hub-cta-heading" className="bg-coral-700 text-white">
          <div className="container-custom py-12 md:py-16">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h2 id="hub-cta-heading" className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                  Not sure where to start?
                </h2>
                <p className="mt-3 text-white/90 leading-relaxed max-w-2xl">
                  A Sacramento-based advisor can listen to what your loved one needs, shortlist communities with current openings, and arrange tours — at no cost to your family.
                </p>
              </div>
              <div>
                <Link
                  to="/contact"
                  className="bg-white text-coral-700 font-semibold rounded-lg px-6 py-4 inline-flex items-center justify-center gap-2 hover:bg-white/95 transition-colors w-full md:w-auto"
                >
                  Request advisor callback
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Communities;
