import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Mail, Phone, CalendarClock, ShieldCheck } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';
import JsonLd from './JsonLd';
import {
  BRAND_NAME,
  DIRECTORY_PHONE,
  SITE_URL,
  formatPhoneForDisplay,
  formatPhoneForTel,
} from '../lib/constants';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  type FaqEntry,
} from '../lib/schema';

type GuideSection = 'guides' | 'resources';

interface GuideCta {
  label: string;
  to: string;
}

interface GuideArticleProps {
  /** URL slug, no leading slash (e.g., "assisted-living-vs-memory-care"). */
  slug: string;
  section: GuideSection;
  /** <title> — keep ~60 chars, must contain the target keyword. */
  title: string;
  /** Meta description, target 150-160 chars. */
  metaDescription: string;
  /** Single H1 — natural-language question containing the keyword. */
  h1: string;
  /**
   * Short answer (2-3 sentences). Rendered as the lede directly under the H1
   * so Google's snippet extractor sees the question answered fast.
   */
  intro: ReactNode;
  /** ISO date — when the article was first published. */
  datePublished: string;
  /** ISO date — last meaningful content change. Drives "Last updated". */
  dateModified: string;
  faqEntries: FaqEntry[];
  primaryCta: GuideCta;
  /** Main editorial body. Use <h2 className="guide-h2"> for section headings. */
  children: ReactNode;
}

const SECTION_LABEL: Record<GuideSection, string> = {
  guides: 'Guides',
  resources: 'Resources',
};

const SECTION_PATH: Record<GuideSection, string> = {
  guides: '/guides',
  resources: '/resources',
};

const formatHumanDate = (iso: string): string => {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

const GuideArticle = ({
  slug,
  section,
  title,
  metaDescription,
  h1,
  intro,
  datePublished,
  dateModified,
  faqEntries,
  primaryCta,
  children,
}: GuideArticleProps) => {
  const path = `${SECTION_PATH[section]}/${slug}`;
  const canonical = `${SITE_URL}${path}`;
  const sectionLabel = SECTION_LABEL[section];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: sectionLabel, url: SECTION_PATH[section] },
    { name: h1, url: path },
  ];

  const articleSchema = buildArticleSchema({
    headline: h1,
    description: metaDescription,
    url: canonical,
    datePublished,
    dateModified,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={title}
        description={metaDescription}
        canonical={canonical}
        appendBrand={false}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema} />
      <JsonLd data={buildFaqSchema(faqEntries)} />

      <Header />
      <main className="flex-grow">

        {/* HERO */}
        <section className="bg-sage-50">
          <div className="container-custom py-12 md:py-16">
            <nav aria-label="Breadcrumb" className="text-sm text-neutral-600 mb-6">
              <ol className="flex items-center flex-wrap gap-1">
                <li><Link to="/" className="hover:text-teal-700">Home</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} className="text-neutral-400" /></li>
                <li>
                  <Link to={SECTION_PATH[section]} className="hover:text-teal-700">
                    {sectionLabel}
                  </Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={14} className="text-neutral-400" /></li>
                <li className="text-neutral-800 font-medium line-clamp-1">{h1}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">
                {sectionLabel}
              </p>
              <h1 className="mt-2 font-serif text-3xl md:text-5xl font-bold text-neutral-800 leading-tight">
                {h1}
              </h1>

              <div className="mt-5 text-lg text-neutral-700 leading-relaxed space-y-4">
                {intro}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock size={14} className="text-teal-700" aria-hidden="true" />
                  Last updated {formatHumanDate(dateModified)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-teal-700" aria-hidden="true" />
                  Written by the {BRAND_NAME} team
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLE BODY */}
        <section className="bg-white">
          <div className="container-custom py-12 md:py-16">
            <article className="prose-guide max-w-3xl">
              {children}
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="bg-sage-50">
          <div className="container-custom py-12 md:py-16">
            <h2
              id="faq-heading"
              className="font-serif text-2xl md:text-3xl font-bold text-neutral-800"
            >
              Frequently asked questions
            </h2>
            <dl className="mt-8 space-y-6 max-w-3xl">
              {faqEntries.map(({ question, answer }) => (
                <div key={question} className="bg-white border border-teal-100 rounded-2xl p-6">
                  <dt>
                    <h3 className="font-serif text-lg font-semibold text-neutral-800">
                      {question}
                    </h3>
                  </dt>
                  <dd className="mt-2 text-neutral-700 leading-relaxed">{answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="guide-cta-heading" className="bg-coral-700 text-white">
          <div className="container-custom py-16 md:py-20">
            <div className="grid md:grid-cols-5 gap-10 items-center">
              <div className="md:col-span-3">
                <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">
                  Compare communities
                </p>
                <h2
                  id="guide-cta-heading"
                  className="mt-2 font-serif text-3xl md:text-4xl font-bold leading-tight"
                >
                  Ready to look at real options in the Sacramento metro?
                </h2>
                <p className="mt-4 text-lg text-white/90 leading-relaxed max-w-2xl">
                  A Sacramento-based advisor calls you back the same day, listens to what
                  your loved one needs, and shortlists license-verified communities that
                  actually have availability. Free for families.
                </p>
              </div>
              <div className="md:col-span-2 flex flex-col gap-3">
                <Link
                  to={primaryCta.to}
                  className="bg-white text-coral-700 font-semibold rounded-lg px-6 py-4 inline-flex items-center justify-center gap-2 hover:bg-white/95 transition-colors"
                >
                  {primaryCta.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/15 text-white font-semibold rounded-lg px-6 py-4 inline-flex items-center justify-center gap-2 hover:bg-white/25 transition-colors border border-white/30"
                >
                  <Mail size={18} aria-hidden="true" />
                  Request advisor callback
                </Link>
                {DIRECTORY_PHONE && (
                  <a
                    href={formatPhoneForTel(DIRECTORY_PHONE)}
                    className="bg-white/15 text-white font-semibold rounded-lg px-6 py-4 inline-flex items-center justify-center gap-2 hover:bg-white/25 transition-colors border border-white/30"
                  >
                    <Phone size={18} aria-hidden="true" />
                    Call {formatPhoneForDisplay(DIRECTORY_PHONE)}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <span className="sr-only">{BRAND_NAME}</span>
    </div>
  );
};

export default GuideArticle;
