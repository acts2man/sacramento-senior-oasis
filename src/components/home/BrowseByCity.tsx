import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { locations } from '../../data/locations';

// Tier-1 cities now linked to the real /assisted-living/:citySlug routes.
// Cities with at least one community in the directory get the keyword-rich
// listing page populated; cities without data still get a real route with a
// graceful empty state, which is far better SEO than a placeholder search URL.
interface CityCard {
  name: string;
  href: string;
  count: number;
}

const countFor = (city: string) =>
  locations.filter(f => f.city.toLowerCase() === city.toLowerCase()).length;

const TIER_1_CITIES: { name: string; slug: string }[] = [
  { name: 'Sacramento', slug: 'sacramento' },
  { name: 'Elk Grove', slug: 'elk-grove' },
  { name: 'Roseville', slug: 'roseville' },
  { name: 'Folsom', slug: 'folsom' },
  { name: 'Citrus Heights', slug: 'citrus-heights' },
  { name: 'Carmichael', slug: 'carmichael' },
  { name: 'Rancho Cordova', slug: 'rancho-cordova' },
  { name: 'Fair Oaks', slug: 'fair-oaks' },
];

const CITIES: CityCard[] = TIER_1_CITIES.map(({ name, slug }) => ({
  name,
  href: `/assisted-living/${slug}`,
  count: countFor(name),
}));

const BrowseByCity = () => (
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
        {CITIES.map(({ name, href, count }) => (
          <li key={name}>
            <Link
              to={href}
              className="block bg-white border border-teal-100 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2 text-teal-700">
                <MapPin size={16} aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wide uppercase">Sacramento metro</span>
              </div>
              <p className="mt-2 font-serif text-lg font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
                Assisted Living in {name}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {count > 0
                  ? `${count} ${count === 1 ? 'community' : 'communities'} in our directory`
                  : 'Listings coming soon'}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default BrowseByCity;
