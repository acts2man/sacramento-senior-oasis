import { Pill, HandHelping, Utensils, Clock, Sparkles, Shirt, ShieldCheck, type LucideIcon } from 'lucide-react';
import { TYPICAL_RCFE_SERVICES } from '../../lib/communityContent';
import type { Facility } from '../../types/facility';

const ICON_MAP: Record<typeof TYPICAL_RCFE_SERVICES[number]['icon'], LucideIcon> = {
  pill: Pill,
  hand: HandHelping,
  utensils: Utensils,
  clock: Clock,
  sparkles: Sparkles,
  shirt: Shirt,
};

/**
 * "Care services typically offered at homes like this."
 *
 * Category-level — true of every California RCFE by license. Framed
 * explicitly as typical-for-license-type, not verified for this specific
 * home. When owner-supplied amenities exist on the Facility record we
 * render those instead (with a "Verified by owner" badge) so this is the
 * fallback for the 99% of homes where no owner data exists yet.
 */
const TypicalCareServices = ({ facility }: { facility: Facility }) => {
  const hasOwnerVerified = !!facility.owner_amenities && facility.owner_amenities.length > 0;

  return (
    <section
      aria-labelledby="typical-services-heading"
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2
          id="typical-services-heading"
          className="text-2xl font-bold text-senior-slate"
        >
          {hasOwnerVerified
            ? `Care services at ${facility.name}`
            : 'Care services typically offered at homes like this'}
        </h2>
        {hasOwnerVerified && (
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200 rounded-full px-2.5 py-1 whitespace-nowrap">
            <ShieldCheck size={12} aria-hidden="true" />
            Verified by owner
          </span>
        )}
      </div>

      {hasOwnerVerified ? (
        <>
          <p className="text-neutral-600 mb-5 leading-relaxed">
            The community's owner has confirmed these services are offered.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {facility.owner_amenities!.map((a, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-senior-light rounded-lg">
                <ShieldCheck size={18} className="text-teal-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-neutral-800">{a}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-neutral-600 mb-5 leading-relaxed">
            Licensed RCFE homes like <strong>{facility.name}</strong> are
            generally expected to provide these core services.{' '}
            <span className="text-neutral-700">
              Contact the community to confirm its specific offerings.
            </span>
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TYPICAL_RCFE_SERVICES.map(s => {
              const Icon = ICON_MAP[s.icon];
              return (
                <li
                  key={s.title}
                  className="flex items-start gap-3 p-4 bg-senior-light rounded-lg"
                >
                  <Icon size={20} className="text-teal-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-senior-slate">{s.title}</p>
                    <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-xs text-neutral-500 leading-relaxed">
            These are the baseline services every California Residential Care
            Facility for the Elderly (RCFE) is regulated to provide. Specific
            amenities (activities, dietary specialties, transportation,
            on-site nursing arrangements) vary by home — contact{' '}
            {facility.name} to confirm.
          </p>
        </>
      )}
    </section>
  );
};

export default TypicalCareServices;
