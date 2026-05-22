import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { DIRECTORY_PHONE, formatPhoneForDisplay, formatPhoneForTel } from '../../lib/constants';

const AdvisorCTA = () => (
  <section
    aria-labelledby="advisor-cta-heading"
    className="bg-coral-700 text-white"
  >
    <div className="container-custom py-16 md:py-20">
      <div className="grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3">
          <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">
            Talk to a local advisor
          </p>
          <h2
            id="advisor-cta-heading"
            className="mt-2 font-serif text-3xl md:text-4xl font-bold leading-tight"
          >
            Sacramento senior care decisions are easier with a person on the phone.
          </h2>
          <p className="mt-4 text-lg text-white/90 leading-relaxed max-w-2xl">
            Free for families. A Sacramento-based advisor calls you back the same day, listens
            to what your loved one needs, and shortlists assisted living, memory care, or board
            &amp; care homes that actually have availability.
          </p>
        </div>

        <div className="md:col-span-2 flex flex-col gap-3">
          <Link
            to="/contact"
            className="bg-white text-coral-700 font-semibold rounded-lg px-6 py-4 inline-flex items-center justify-center gap-2 hover:bg-white/95 transition-colors"
          >
            <Mail size={18} aria-hidden="true" />
            Request advisor callback
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          {DIRECTORY_PHONE ? (
            <a
              href={formatPhoneForTel(DIRECTORY_PHONE)}
              className="bg-white/15 text-white font-semibold rounded-lg px-6 py-4 inline-flex items-center justify-center gap-2 hover:bg-white/25 transition-colors border border-white/30"
            >
              <Phone size={18} aria-hidden="true" />
              Call {formatPhoneForDisplay(DIRECTORY_PHONE)}
            </a>
          ) : (
            <p className="text-sm text-white/75 text-center md:text-right">
              No phone tag — we reply by your preferred channel.
            </p>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default AdvisorCTA;
