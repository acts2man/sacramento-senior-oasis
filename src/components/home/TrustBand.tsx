import { ShieldCheck, DollarSign, Users, FileSearch } from 'lucide-react';

const ITEMS = [
  {
    icon: ShieldCheck,
    title: 'License-verified',
    body: 'Every community cross-checked against California Community Care Licensing (CDSS).',
  },
  {
    icon: DollarSign,
    title: 'Real cost ranges',
    body: 'Posted prices from operators — not blurred-out "call for pricing".',
  },
  {
    icon: Users,
    title: 'Local advisors',
    body: 'Sacramento-based placement team, not a national call center.',
  },
  {
    icon: FileSearch,
    title: 'Inspection history',
    body: 'Surface CCLD inspection and citation reports families would otherwise have to dig for.',
  },
];

const TrustBand = () => (
  <section
    aria-label="Why families trust this directory"
    className="bg-teal-900 text-white"
  >
    <div className="container-custom py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex flex-col gap-3">
            <div className="bg-white/10 rounded-lg w-12 h-12 flex items-center justify-center">
              <Icon size={24} className="text-coral-300" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-white">{title}</h3>
            <p className="text-white/80 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBand;
