import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Home } from 'lucide-react';
import { locations } from '../../data/locations';

const counts = {
  assisted_living: locations.filter(f => f.care_types.includes('assisted_living')).length,
  memory_care: locations.filter(f => f.care_types.includes('memory_care')).length,
  board_and_care: locations.filter(f => f.care_types.includes('board_and_care')).length,
};

interface CareCard {
  icon: typeof Heart;
  title: string;
  href: string;
  todo?: boolean;
  blurb: string;
  count: number;
}

const CARDS: CareCard[] = [
  {
    icon: Heart,
    title: 'Assisted Living in Sacramento',
    href: '/assisted-living',
    blurb:
      'Day-to-day support — dressing, medications, meals, transportation — in a residential or campus setting across Sacramento and Elk Grove.',
    count: counts.assisted_living,
  },
  {
    icon: Brain,
    title: 'Memory Care in Sacramento',
    href: '/memory-care',
    blurb:
      "Secured environments and staff trained in dementia and Alzheimer's care. Compare Sacramento memory care homes with real licensing data.",
    count: counts.memory_care,
  },
  {
    icon: Home,
    // TODO: /board-and-care listing route doesn't exist yet — link to /locations for now.
    title: 'Board & Care Homes (RCFE) in Sacramento',
    href: '/locations',
    todo: true,
    blurb:
      'Small 6-bed residential care for the elderly with low staff-to-resident ratios. A Sacramento niche the national directories underserve.',
    count: counts.board_and_care,
  },
];

const BrowseByCareType = () => (
  <section aria-labelledby="browse-care-heading" className="bg-white">
    <div className="container-custom py-16 md:py-20">
      <div className="max-w-2xl mb-10">
        <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">Browse by care type</p>
        <h2
          id="browse-care-heading"
          className="mt-2 font-serif text-3xl md:text-4xl font-bold text-neutral-800"
        >
          What kind of senior care fits?
        </h2>
        <p className="mt-4 text-lg text-neutral-700 leading-relaxed">
          Each Sacramento community is licensed differently. Pick the care type that matches your loved one's needs to filter the directory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CARDS.map(({ icon: Icon, title, href, blurb, count }) => (
          <Link
            key={title}
            to={href}
            className="group bg-sage-50 border border-teal-100 rounded-2xl p-8 flex flex-col gap-4 hover:bg-white hover:shadow-md transition-all"
          >
            <div className="bg-white border border-teal-200 rounded-lg w-12 h-12 flex items-center justify-center">
              <Icon size={22} className="text-teal-700" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
              {title}
            </h3>
            <p className="text-neutral-700 leading-relaxed flex-1">{blurb}</p>
            <p className="flex items-center justify-between pt-2">
              <span className="text-sm text-neutral-600">
                {count > 0
                  ? `${count} ${count === 1 ? 'community' : 'communities'} in directory`
                  : 'Listings coming soon'}
              </span>
              <ArrowRight
                size={18}
                className="text-teal-700 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default BrowseByCareType;
