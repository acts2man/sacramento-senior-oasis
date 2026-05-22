import { Link } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { Search, MapPin, ShieldCheck } from 'lucide-react';
import { locations } from '../../data/locations';
import { BRAND_NAME } from '../../lib/constants';

const FACILITY_COUNT = locations.length;
const CITY_COUNT = new Set(locations.map(f => f.city)).size;

const CARE_TYPE_OPTIONS = [
  { value: 'assisted_living', label: 'Assisted Living', route: '/assisted-living' },
  { value: 'memory_care', label: 'Memory Care', route: '/memory-care' },
  // TODO: routes for these don't exist yet — fall back to /locations until built.
  { value: 'board_and_care', label: 'Board & Care Home (RCFE)', route: '/locations' },
  { value: 'independent_living', label: 'Independent Living', route: '/locations' },
  { value: 'skilled_nursing', label: 'Skilled Nursing', route: '/locations' },
  { value: 'respite_care', label: 'Respite Care', route: '/locations' },
] as const;

interface ChipLink {
  label: string;
  href: string;
  todo?: boolean;
}

// Quick-filter chips below the search. Where a real route exists we link
// directly; the rest carry TODO markers in code comments so we can wire
// them up once /board-and-care, /accepts-medicaid, /pet-friendly, and
// /spanish-speaking listing pages exist.
const QUICK_CHIPS: ChipLink[] = [
  { label: 'Assisted Living', href: '/assisted-living' },
  { label: 'Memory Care', href: '/memory-care' },
  { label: 'Board & Care Homes', href: '/locations', todo: true },
  { label: 'Accepts Medi-Cal', href: '/locations', todo: true },
  { label: 'Pet-Friendly', href: '/locations', todo: true },
  { label: 'Spanish-speaking', href: '/locations', todo: true },
];

const HeroHome = () => {
  const [careType, setCareType] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const selected = CARE_TYPE_OPTIONS.find(o => o.value === careType);
    const target = selected?.route ?? '/locations';
    const params = new URLSearchParams();
    if (locationQuery.trim()) params.set('search', locationQuery.trim());
    if (selected && selected.route === '/locations') params.set('care_type', selected.value);
    const qs = params.toString();
    window.location.href = qs ? `${target}?${qs}` : target;
  };

  return (
    <section className="relative bg-sage-50 overflow-hidden">
      {/* Soft brand-tinted radial glow, kept subtle so copy stays the focus */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] bg-coral-50/60 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-16 md:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow trust badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-800 rounded-full px-4 py-2 text-sm font-medium shadow-sm">
            <ShieldCheck size={16} className="text-teal-700" aria-hidden="true" />
            <span>
              {FACILITY_COUNT} licensed communities · verified with CA Community Care Licensing
            </span>
          </div>

          <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight">
            Find Assisted Living, Memory Care &amp; Senior Care in Sacramento
            <span className="block mt-3 text-2xl md:text-3xl lg:text-4xl font-normal italic text-coral-700">
              with nothing hidden
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neutral-700 leading-relaxed max-w-2xl mx-auto">
            Compare assisted living, memory care, and board &amp; care homes across the Sacramento metro.
            Real costs, real licensing data, and a free local advisor to help your family decide.
          </p>

          {/* Smart search */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 bg-white rounded-2xl shadow-lg border border-neutral-200 p-3 md:p-4 max-w-3xl mx-auto flex flex-col md:flex-row gap-3"
            role="search"
            aria-label="Find a senior living community"
          >
            <div className="flex-1 flex items-center gap-2 md:border-r md:border-neutral-200 md:pr-3">
              <ShieldCheck size={18} className="text-teal-700 flex-shrink-0" aria-hidden="true" />
              <label htmlFor="hero-care-type" className="sr-only">Care type</label>
              <select
                id="hero-care-type"
                value={careType}
                onChange={(e) => setCareType(e.target.value)}
                className="w-full bg-transparent text-neutral-800 py-2 focus:outline-none"
              >
                <option value="">Any care type</option>
                {CARE_TYPE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex items-center gap-2 md:px-3">
              <MapPin size={18} className="text-teal-700 flex-shrink-0" aria-hidden="true" />
              <label htmlFor="hero-location" className="sr-only">Location</label>
              <input
                id="hero-location"
                type="text"
                placeholder="City, neighborhood, or ZIP"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full bg-transparent text-neutral-800 py-2 placeholder:text-neutral-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn-primary inline-flex items-center justify-center gap-2 md:!py-3"
            >
              <Search size={18} aria-hidden="true" />
              <span>Search</span>
            </button>
          </form>

          {/* Quick chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {QUICK_CHIPS.map(chip => (
              <Link
                key={chip.label}
                to={chip.href}
                className="bg-white/70 hover:bg-white border border-teal-200 text-teal-800 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          {/* Stats row */}
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 max-w-3xl mx-auto">
            <div className="text-center">
              <dt className="text-sm text-neutral-600">Communities</dt>
              <dd className="font-serif text-2xl md:text-3xl font-bold text-teal-800 mt-1">{FACILITY_COUNT}</dd>
            </div>
            <div className="text-center">
              <dt className="text-sm text-neutral-600">Cities &amp; neighborhoods</dt>
              <dd className="font-serif text-2xl md:text-3xl font-bold text-teal-800 mt-1">{CITY_COUNT}</dd>
            </div>
            <div className="text-center">
              <dt className="text-sm text-neutral-600">License-verified</dt>
              <dd className="font-serif text-2xl md:text-3xl font-bold text-teal-800 mt-1">100%</dd>
            </div>
            <div className="text-center">
              <dt className="text-sm text-neutral-600">For families</dt>
              <dd className="font-serif text-2xl md:text-3xl font-bold text-teal-800 mt-1">Free</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Hidden brand-name reference for assistive tech; visible brand lives in the Header */}
      <span className="sr-only">{BRAND_NAME}</span>
    </section>
  );
};

export default HeroHome;
