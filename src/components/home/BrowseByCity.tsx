import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { topCitiesByInventory } from '../../lib/cityInventory';

/**
 * Homepage "Browse by city" grid.
 *
 * Cities are pulled from the live inventory helper — top N by community
 * count, sorted desc — so the grid auto-expands as the directory grows and
 * never shows a "0 communities" tile. Links go straight to the keyword-rich
 * /assisted-living/{slug} pages (the main internal-linking target for SEO).
 * A final "All cities →" tile points to the /communities hub so families
 * who don't see their city still have one click into a list of everywhere
 * we cover.
 */
const BrowseByCity = () => {
  const cities = topCitiesByInventory(12);
  return (
    <section aria-labelledby="browse-city-heading" className="bg-sage-50">
      <div className="container-custom py-16 md:py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">Browse by city</p>
          <h2
            id="browse-city-heading"
            className="mt-2 font-serif text-3xl md:text-4xl font-bold text-neutral-800"
          >
            Senior living in your part of the Sacramento metro
          </h2>
          <p className="mt-4 text-lg text-neutral-700 leading-relaxed">
            Tour communities near family. Each Sacramento-area city has different licensing density, price range, and waitlist dynamics — your advisor can explain what's actually open this week.
          </p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map(c => (
            <li key={c.slug}>
              <Link
                to={`/assisted-living/${c.slug}`}
                className="block bg-white border border-teal-100 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all group h-full"
              >
                <div className="flex items-center gap-2 text-teal-700">
                  <MapPin size={16} aria-hidden="true" />
                  <span className="text-xs font-semibold tracking-wide uppercase">{c.county} County</span>
                </div>
                <p className="mt-2 font-serif text-lg font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
                  Assisted Living in {c.name}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {c.count} {c.count === 1 ? 'community' : 'communities'} in our directory
                </p>
              </Link>
            </li>
          ))}
          {/* Hub tile — keeps the orphan-fix circuit closed even for families
              who don't see their city in the top 12. */}
          <li>
            <Link
              to="/communities"
              className="block bg-teal-700 text-white border border-teal-700 rounded-xl p-5 hover:bg-teal-800 transition-all group h-full"
            >
              <div className="flex items-center gap-2 text-white/80">
                <MapPin size={16} aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wide uppercase">All cities</span>
              </div>
              <p className="mt-2 font-serif text-lg font-semibold">
                Browse every city
              </p>
              <p className="mt-1 text-sm text-white/90 inline-flex items-center">
                See all cities we cover
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BrowseByCity;
