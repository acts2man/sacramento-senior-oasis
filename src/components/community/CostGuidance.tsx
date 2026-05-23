import { DollarSign, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Facility } from '../../types/facility';
import {
  SACRAMENTO_REGIONAL_COST,
  hasRegionalCostData,
} from '../../lib/communityContent';

const FORM_ANCHOR_ID = 'facility-lead-form';

const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);

/**
 * Cost-guidance section for the community detail page.
 *
 * Rule: NO per-home dollar figure is displayed unless the owner has
 * supplied verified room/care pricing (owner_room_pricing). For all other
 * homes we show:
 *   - Either a sourced REGIONAL range from communityContent.ts (clearly
 *     labelled as regional, not this home's price), or
 *   - Qualitative guidance only ("costs vary by room type and care level")
 *     when no sourced figure is wired in.
 *
 * Always: a strong CTA to the InquiryForm anchor on the same page that
 * promises to get the family the actual price directly from the operator.
 */
const CostGuidance = ({ facility }: { facility: Facility }) => {
  const hasOwnerPricing =
    !!facility.owner_room_pricing && facility.owner_room_pricing.length > 0;
  const regional = SACRAMENTO_REGIONAL_COST;
  const regionalReady = hasRegionalCostData(regional);

  return (
    <section
      aria-labelledby="cost-heading"
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 id="cost-heading" className="text-2xl font-bold text-senior-slate">
          Cost guidance for {facility.city}
        </h2>
        {hasOwnerPricing && (
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200 rounded-full px-2.5 py-1 whitespace-nowrap">
            <ShieldCheck size={12} aria-hidden="true" />
            Verified by owner
          </span>
        )}
      </div>

      {/* ---------- Owner-verified pricing path ---------- */}
      {hasOwnerPricing ? (
        <>
          <p className="text-neutral-700 leading-relaxed mb-4">
            Verified room and care-level pricing as supplied by the community owner. Final cost depends on assessed care level and current room availability.
          </p>
          <ul className="space-y-3">
            {facility.owner_room_pricing!.map((tier, i) => (
              <li key={i} className="bg-senior-light p-4 rounded-lg flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-senior-slate">{tier.label}</p>
                  {tier.notes && (
                    <p className="text-sm text-neutral-600 mt-0.5">{tier.notes}</p>
                  )}
                </div>
                {(Number.isFinite(tier.price_low) || Number.isFinite(tier.price_high)) && (
                  <p className="text-right font-semibold text-teal-700 whitespace-nowrap">
                    {Number.isFinite(tier.price_low) && formatPrice(tier.price_low!)}
                    {Number.isFinite(tier.price_high) && (
                      <> – {formatPrice(tier.price_high!)}</>
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : regionalReady ? (
        /* ---------- Regional-range path (sourced data) ---------- */
        <>
          <p className="text-neutral-700 leading-relaxed">
            We don't publish a per-home price for {facility.name} that we
            haven't verified. As a regional reference,{' '}
            <strong>
              monthly assisted-living rates across the Sacramento metro
              typically run from {formatPrice(regional.assistedLivingLow!)} to{' '}
              {formatPrice(regional.assistedLivingHigh!)}
            </strong>
            {regional.surveyYear ? <> ({regional.surveyYear} data)</> : null}.
            That's a regional range, not this community's quoted rate.
          </p>
          <p className="mt-3 text-xs text-neutral-500">
            Source: {regional.sourceUrl ? (
              <a
                href={regional.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:text-teal-800 underline-offset-2 hover:underline inline-flex items-center gap-0.5"
              >
                {regional.source}
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            ) : (
              regional.source
            )}. Pricing varies by room type (shared vs. private) and care level.
          </p>
        </>
      ) : (
        /* ---------- Qualitative-only fallback ---------- */
        <p className="text-neutral-700 leading-relaxed">
          We don't publish a per-home price for {facility.name} that we
          haven't verified. Senior care pricing in the Sacramento area
          varies considerably by{' '}
          <strong>room type (shared vs. private)</strong>,{' '}
          <strong>level of care needed</strong>, and current availability —
          the only honest way to know what this community costs today is to
          ask.
          {/* TODO: wire in a sourced regional range from Genworth/CareScout
              Cost of Care for the Sacramento-Roseville MSA in
              src/lib/communityContent.ts, and this block will switch to
              showing dollar figures (clearly labelled regional). */}
        </p>
      )}

      {/* ---------- Strong CTA into the InquiryForm ---------- */}
      <div className="mt-6 p-5 bg-teal-50 border border-teal-200 rounded-lg">
        <p className="font-semibold text-senior-slate">
          Get {facility.name}'s actual pricing &amp; availability
        </p>
        <p className="text-neutral-700 leading-relaxed mt-1.5 text-sm">
          Pricing for {facility.name} depends on room type, care level, and
          availability. We'll get you current, accurate pricing directly — at
          no cost to you.
        </p>
        <Link
          to={`#${FORM_ANCHOR_ID}`}
          className="mt-4 inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg px-5 py-2.5 transition-colors"
        >
          <DollarSign size={16} aria-hidden="true" />
          Get current pricing
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default CostGuidance;
