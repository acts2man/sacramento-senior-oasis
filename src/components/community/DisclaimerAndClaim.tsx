import { useState } from 'react';
import { Info, Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import { BRAND_NAME } from '../../lib/constants';
import ClaimListingDialog from '../ClaimListingDialog';
import type { Facility } from '../../types/facility';

/**
 * Disclaimer + "Claim this listing" CTA shown near the bottom of every
 * community detail page. The disclaimer is the legally-honest framing for
 * a directory that hasn't (yet) gotten the operator's verified data: we
 * say plainly what's CDSS-sourced, what's category-typical, and that
 * neither has been confirmed by the owner.
 *
 * The claim CTA opens ClaimListingDialog, which inserts a row into the
 * claim_requests table and emails admin. It is NOT a login flow — just
 * interest capture.
 */
const DisclaimerAndClaim = ({ facility }: { facility: Facility }) => {
  const [claimOpen, setClaimOpen] = useState(false);

  return (
    <>
      <section
        aria-labelledby="disclaimer-heading"
        className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-6"
      >
        <div className="flex items-start gap-3">
          <Info size={20} className="text-neutral-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2
              id="disclaimer-heading"
              className="text-sm font-semibold text-neutral-700 uppercase tracking-wide"
            >
              About this listing
            </h2>
            <p className="mt-2 text-neutral-700 leading-relaxed text-sm">
              {BRAND_NAME} is an independent directory and is not affiliated
              with the owner or operator of <strong>{facility.name}</strong>.
              License and capacity data come from the California Community
              Care Licensing Division (CDSS). Care services and cost ranges
              shown are general information for this type of licensed home
              and have not been verified by the owner. For this community's
              verified details, contact us — our service is free to families.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="claim-heading"
        className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6"
      >
        <div className="flex items-start gap-3 md:items-center md:flex-row flex-col">
          <Building2
            size={24}
            className="text-teal-700 flex-shrink-0"
            aria-hidden="true"
          />
          <div className="flex-1">
            <h2
              id="claim-heading"
              className="font-serif text-lg font-bold text-senior-slate"
            >
              Are you the owner or operator of {facility.name}?
            </h2>
            <p className="mt-1 text-neutral-700 text-sm leading-relaxed">
              Claim this listing to add verified photos, amenities, and pricing. There's no charge.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setClaimOpen(true)}
            className="bg-teal-700 hover:bg-teal-800 text-white font-semibold whitespace-nowrap"
          >
            Claim this listing
          </Button>
        </div>
      </section>

      <ClaimListingDialog
        open={claimOpen}
        onOpenChange={setClaimOpen}
        communityName={facility.name}
        communityId={facility.id}
      />
    </>
  );
};

export default DisclaimerAndClaim;
