import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { locations } from '../../data/locations';
import type { Facility } from '../../types/facility';
import { careTypeLabel } from '../../lib/careTypes';

// Featured set — first six records from locations.ts. Real communities only;
// no placeholders are ever invented. If/when an `is_partner` flag is set the
// selection logic can move to `locations.filter(f => f.is_partner).slice(0, 6)`.
const FEATURED: Facility[] = locations.slice(0, 6);

const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

// Show license status only when it's actually present in the data. Today
// every record has license_* undefined (filled by the upcoming CDSS backfill
// PR), so the card shows a neutral verified-line — no fabricated numbers.
const licenseLine = (f: Facility): string => {
  if (f.license_status === 'current') {
    return f.license_number ? `License #${f.license_number} · Current` : 'License current · CA CCLD';
  }
  if (f.license_status === 'on_probation') return 'License on probation · CA CCLD';
  if (f.license_status === 'closed') return 'License closed · CA CCLD';
  if (f.license_status === 'pending') return 'License pending · CA CCLD';
  return 'License-verified · CA CCLD';
};

const PhotoOrPlaceholder = ({ facility }: { facility: Facility }) => {
  const hero = facility.photos?.[0];
  if (hero) {
    return (
      <img
        src={hero.url}
        alt={hero.alt}
        loading="lazy"
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
      />
    );
  }
  // Tasteful gradient placeholder using brand tokens only.
  return (
    <div
      aria-hidden="true"
      className="w-full h-56 bg-gradient-to-br from-sage-100 via-teal-50 to-teal-100"
    />
  );
};

const Card = ({ facility }: { facility: Facility }) => (
  <Link
    to={`/${facility.id}`}
    className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    aria-label={`${facility.name} in ${facility.city}, California`}
  >
    <div className="relative overflow-hidden">
      <PhotoOrPlaceholder facility={facility} />
      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-teal-800 text-xs font-medium rounded-full px-3 py-1.5 shadow-sm">
        <ShieldCheck size={14} className="text-teal-700" aria-hidden="true" />
        {licenseLine(facility)}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-1 gap-3">
      <h3 className="font-serif text-xl font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
        {facility.name}
      </h3>

      <div className="flex items-center gap-2 text-neutral-600">
        <MapPin size={14} className="text-teal-700 flex-shrink-0" aria-hidden="true" />
        <span className="text-sm">
          {facility.neighborhood ? `${facility.neighborhood}, ` : ''}
          {facility.city}, CA
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {facility.care_types.map(t => (
          <span
            key={t}
            className="bg-teal-50 text-teal-800 rounded-full px-2.5 py-0.5 text-xs font-medium"
          >
            {careTypeLabel(t)}
          </span>
        ))}
      </div>

      {Number.isFinite(facility.price_range_low) && (
        <p className="text-neutral-700 text-sm mt-auto pt-2">
          From <span className="font-semibold text-neutral-800">
            {formatPrice(facility.price_range_low!)}
          </span>
          {Number.isFinite(facility.price_range_high) && (
            <>
              {' '}–{' '}
              <span className="font-semibold text-neutral-800">
                {formatPrice(facility.price_range_high!)}
              </span>
            </>
          )}
          <span className="text-neutral-600"> / month</span>
        </p>
      )}
    </div>
  </Link>
);

const FeaturedCommunities = () => (
  <section aria-labelledby="featured-heading" className="bg-neutral-50">
    <div className="container-custom py-16 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">
            Featured communities
          </p>
          <h2
            id="featured-heading"
            className="mt-2 font-serif text-3xl md:text-4xl font-bold text-neutral-800"
          >
            Sacramento communities families are touring this month
          </h2>
        </div>
        <Link
          to="/locations"
          className="inline-flex items-center gap-2 text-teal-700 font-medium hover:text-teal-800 transition-colors self-start md:self-end"
        >
          See all {locations.length} communities
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED.map(f => (
          <Card key={f.id} facility={f} />
        ))}
      </div>
    </div>
  </section>
);

export { FEATURED as FEATURED_COMMUNITIES };
export default FeaturedCommunities;
