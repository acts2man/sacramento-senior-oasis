import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Search, MapPin, ShieldCheck } from 'lucide-react';
import { locations } from '../../data/locations';
import { BRAND_NAME } from '../../lib/constants';
import poster1 from '../../assets/hero/scene-1-family.jpg';

const FACILITY_COUNT = locations.length;
const CITY_COUNT = new Set(locations.map(f => f.city)).size;

// Cinematic 4-scene loop powering the hero background. Files live in /public
// so they ship with the production build (sandbox-only __l5e URLs don't deploy).
const HERO_CLIPS = [
  '/videos/hero/scene-1-family.mp4',
  '/videos/hero/scene-2-caregiver.mp4',
  '/videos/hero/scene-3-memory.mp4',
  '/videos/hero/scene-4-sacramento.mp4',
];

const CARE_TYPE_OPTIONS = [
  { value: 'assisted_living', label: 'Assisted Living', route: '/assisted-living' },
  { value: 'memory_care', label: 'Memory Care', route: '/memory-care' },
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
  // Dual <video> elements ping-pong so the next clip is preloaded and ready
  // to swap in without ever showing the poster or a freeze frame.
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [srcA, setSrcA] = useState(HERO_CLIPS[0]);
  const [srcB, setSrcB] = useState(HERO_CLIPS[1 % HERO_CLIPS.length]);
  const indexRef = useRef(0);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const handleEnded = (layer: 0 | 1) => {
    const nextIndex = (indexRef.current + 1) % HERO_CLIPS.length;
    const afterNextIndex = (nextIndex + 1) % HERO_CLIPS.length;
    indexRef.current = nextIndex;
    // Swap active layer; queue the *following* clip into the now-hidden layer
    if (layer === 0) {
      setActiveLayer(1);
      const v = videoBRef.current;
      if (v) { v.currentTime = 0; v.play().catch(() => {}); }
      setSrcA(HERO_CLIPS[afterNextIndex]);
    } else {
      setActiveLayer(0);
      const v = videoARef.current;
      if (v) { v.currentTime = 0; v.play().catch(() => {}); }
      setSrcB(HERO_CLIPS[afterNextIndex]);
    }
  };

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
    <section className="relative overflow-hidden bg-neutral-900">
      {/* Cinematic video background — dual-layer crossfade to avoid freeze frames */}
      <video
        ref={videoARef}
        key={srcA}
        src={srcA}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeLayer === 0 ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={poster1}
        onEnded={() => handleEnded(0)}
        aria-hidden="true"
      />
      <video
        ref={videoBRef}
        key={srcB}
        src={srcB}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeLayer === 1 ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
        preload="auto"
        onEnded={() => handleEnded(1)}
        aria-hidden="true"
      />


      {/* Legibility overlay — dark gradient bottom-up + subtle teal tint so the
          white hero copy and white search card stay WCAG-AA on any frame */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/55 to-neutral-900/80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-teal-900/20 mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 py-16 md:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow trust badge — glass on dark */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 text-white rounded-full px-4 py-2 text-sm font-medium shadow-sm">
            <ShieldCheck size={16} className="text-teal-200" aria-hidden="true" />
            <span>
              {FACILITY_COUNT} licensed communities · verified with CA Community Care Licensing
            </span>
          </div>

          <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
            Find Assisted Living, Memory Care &amp; Senior Living in Sacramento
            <span className="block mt-3 text-2xl md:text-3xl lg:text-4xl font-normal italic text-coral-300">
              with nothing hidden
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
            Compare assisted living, memory care, and board &amp; care homes across the Sacramento metro.
            Real costs, real licensing data, and a free local advisor to help your family decide.
          </p>

          {/* Smart search — opaque white card stays readable on any video frame */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/40 p-3 md:p-4 max-w-3xl mx-auto flex flex-col md:flex-row gap-3"
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

          {/* Quick chips — glass on dark */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {QUICK_CHIPS.map(chip => (
              <Link
                key={chip.label}
                to={chip.href}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          {/* Stats row */}
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 max-w-3xl mx-auto">
            <div className="text-center">
              <dt className="text-sm text-white/80">Communities</dt>
              <dd className="font-serif text-2xl md:text-3xl font-bold text-white mt-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">{FACILITY_COUNT}</dd>
            </div>
            <div className="text-center">
              <dt className="text-sm text-white/80">Cities &amp; neighborhoods</dt>
              <dd className="font-serif text-2xl md:text-3xl font-bold text-white mt-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">{CITY_COUNT}</dd>
            </div>
            <div className="text-center">
              <dt className="text-sm text-white/80">License-verified</dt>
              <dd className="font-serif text-2xl md:text-3xl font-bold text-white mt-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">100%</dd>
            </div>
            <div className="text-center">
              <dt className="text-sm text-white/80">For families</dt>
              <dd className="font-serif text-2xl md:text-3xl font-bold text-white mt-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">Free</dd>
            </div>
          </dl>
        </div>
      </div>

      <span className="sr-only">{BRAND_NAME}</span>
    </section>
  );
};

export default HeroHome;
