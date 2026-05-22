import { Search, Phone, Calendar } from 'lucide-react';

const STEPS = [
  {
    n: 1,
    icon: Search,
    title: 'Search & compare',
    body:
      'Browse Sacramento communities by care type, neighborhood, and budget. See real prices, photos, and license status side by side.',
  },
  {
    n: 2,
    icon: Phone,
    title: 'Talk to a local advisor',
    body:
      'A Sacramento-based placement advisor calls back the same day. We listen first, then narrow the list to communities that actually fit.',
  },
  {
    n: 3,
    icon: Calendar,
    title: 'Tour & decide',
    body:
      "We schedule tours, attend with you if you'd like, and help interpret what you see. There's no fee to families — ever.",
  },
];

const HowItWorks = () => (
  <section aria-labelledby="how-it-works-heading" className="bg-white">
    <div className="container-custom py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">How it works</p>
        <h2
          id="how-it-works-heading"
          className="mt-2 font-serif text-3xl md:text-4xl font-bold text-neutral-800"
        >
          Three calm steps, no pressure
        </h2>
        <p className="mt-4 text-lg text-neutral-700 leading-relaxed">
          Finding senior care for a parent is a stressful, often urgent decision. We move at your pace — your advisor's job is to make the choice clearer, not faster.
        </p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STEPS.map(({ n, icon: Icon, title, body }) => (
          <li
            key={n}
            className="bg-sage-50 border border-teal-100 rounded-2xl p-8 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white border border-teal-200 rounded-full w-10 h-10 flex items-center justify-center font-serif text-lg font-bold text-teal-700">
                {n}
              </div>
              <Icon size={22} className="text-teal-700" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-neutral-800">{title}</h3>
            <p className="text-neutral-700 leading-relaxed">{body}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
