import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

export type CarePreset =
  | 'Assisted Living'
  | 'Memory Care'
  | 'Board & Care Home'
  | 'Not sure yet';

export interface InquiryFormProps {
  /** When rendered on a community page: shown back to family and stored on the lead. */
  communityName?: string;
  /** Stable id/slug for the community — used later for grouping in the dashboard. */
  communityId?: string;
  /** When rendered on a city page (e.g. "Roseville"). */
  city?: string;
  /** Pre-selects the care type dropdown (e.g. from a memory-care landing page). */
  defaultCareType?: CarePreset;
  /** Optional override for the heading. */
  heading?: string;
  /** Optional override for the supporting copy under the heading. */
  subheading?: string;
  /** Compact variant for sidebars. */
  compact?: boolean;
}

const RELATIONSHIPS = ['Self', 'Parent', 'Spouse', 'Other relative', 'Other'] as const;
const CARE_TYPES: CarePreset[] = [
  'Assisted Living',
  'Memory Care',
  'Board & Care Home',
  'Not sure yet',
];
const TIMELINES = [
  'Immediately',
  'Within 30 days',
  '1-3 months',
  'Just researching',
] as const;
const BUDGETS = [
  'Under $3,000 / mo',
  '$3,000 – $4,500 / mo',
  '$4,500 – $6,000 / mo',
  '$6,000 – $8,000 / mo',
  '$8,000+ / mo',
  'Not sure yet',
] as const;

const schema = z.object({
  full_name: z.string().trim().min(2, 'Please enter your full name').max(120),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number')
    .max(40),
  relationship: z.string().max(60).optional().or(z.literal('')),
  care_type: z.string().max(60).optional().or(z.literal('')),
  move_in_timeline: z.string().max(60).optional().or(z.literal('')),
  budget_range: z.string().max(60).optional().or(z.literal('')),
  message: z.string().max(2000).optional().or(z.literal('')),
});

const InquiryForm = ({
  communityName,
  communityId,
  city,
  defaultCareType,
  heading,
  subheading,
  compact = false,
}: InquiryFormProps) => {
  const { toast } = useToast();
  const location = useLocation();

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    relationship: '',
    care_type: defaultCareType ?? '',
    move_in_timeline: '',
    budget_range: '',
    message: '',
  });
  // Honeypot: real users never fill this. Bots auto-fill every input.
  const [website, setWebsite] = useState('');
  // Time trap: bots submit forms in milliseconds. Humans take >3s.
  const [mountedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Spam guard: honeypot tripped OR form submitted suspiciously fast (<3s).
    // Fake-succeed so bots don't learn to bypass it.
    const elapsedMs = Date.now() - mountedAt;
    if (website.trim() !== '' || elapsedMs < 3000) {
      console.warn('[InquiryForm] Spam guard triggered', { honeypot: !!website, elapsedMs });
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSuccess(true);
      }, 600);
      return;
    }

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);

    const leadId = crypto.randomUUID();
    const submittedAt = new Date().toISOString();

    const payload = {
      id: leadId,
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      relationship: parsed.data.relationship || null,
      care_type: parsed.data.care_type || null,
      move_in_timeline: parsed.data.move_in_timeline || null,
      budget_range: parsed.data.budget_range || null,
      message: parsed.data.message || null,
      inquiry_for_community: communityName ?? null,
      inquiry_for_community_id: communityId ?? null,
      inquiry_for_city: city ?? null,
      source_page: location.pathname + location.search,
      status: 'new',
    };

    // 1) Save the lead. This MUST succeed for the submission to count.
    const { error: insertError } = await supabase
      .from('leads')
      .insert(payload);

    if (insertError) {
      console.error('Lead insert failed:', insertError);
      setSubmitting(false);
      toast({
        title: "We couldn't submit your inquiry",
        description:
          'Please try again in a moment, or email care@sacramentoelderlycare.com.',
        variant: 'destructive',
      });
      return;
    }

    // 2) Fire-and-handle notification. Email failure must NEVER lose the lead.
    // source_url is the full page href (not the relative source_page stored on
    // the row); it's passed only to the function so notify-lead can forward it
    // to the placement intake — the insert payload above is left untouched.
    try {
      const { error: fnError } = await supabase.functions.invoke('notify-lead', {
        body: {
          ...payload,
          created_at: submittedAt,
          source_url:
            typeof window !== 'undefined' ? window.location.href : null,
        },
      });
      if (fnError) console.error('notify-lead error (non-fatal):', fnError);
    } catch (err) {
      console.error('notify-lead threw (non-fatal):', err);
    }

    setSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="bg-white border border-teal-100 rounded-2xl shadow-sm p-6 md:p-8 text-center">
        <CheckCircle2 size={44} className="text-teal-600 mx-auto" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl font-bold text-neutral-800">
          Thank you — your inquiry is in.
        </h3>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          A care advisor will reach out shortly. We'll review what your family needs
          {communityName ? <> and {communityName}'s current availability</> : null}
          {!communityName && city ? <> and {city} options</> : null}, then follow up by email or phone.
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          This service is free for families and we never sell your information.
        </p>
      </div>
    );
  }

  const inputBase =
    'w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition';
  const errInput = 'border-rose-400 focus:ring-rose-400 focus:border-rose-400';

  const computedHeading =
    heading ??
    (communityName
      ? `Request information about ${communityName}`
      : city
      ? `Talk to a ${city} care advisor`
      : 'Talk to a care advisor');
  const computedSub =
    subheading ??
    'Free for families. A local advisor follows up the same day with options that have current availability.';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-white border border-neutral-200 rounded-2xl shadow-sm ${compact ? 'p-5' : 'p-6 md:p-8'}`}
      aria-label="Inquiry form"
    >
      {/* Honeypot: hidden from sighted users + screen readers; bots fill it and get silently dropped. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="website-url-hp">Website (leave blank)</label>
        <input
          id="website-url-hp"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <h3 className="font-serif text-xl md:text-2xl font-bold text-neutral-800">
        {computedHeading}
      </h3>
      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{computedSub}</p>

      {communityName && (
        <div className="mt-3 inline-flex items-center text-sm bg-teal-50 text-teal-800 px-3 py-1.5 rounded-md font-medium">
          Inquiring about: <span className="ml-1 font-semibold">{communityName}</span>
        </div>
      )}

      <div className={`mt-5 grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="full_name" className="block text-sm font-medium text-neutral-700 mb-1">
            Full name <span className="text-rose-600">*</span>
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            value={form.full_name}
            onChange={update('full_name')}
            aria-invalid={!!errors.full_name}
            aria-describedby={errors.full_name ? 'err-full_name' : undefined}
            className={`${inputBase} ${errors.full_name ? errInput : ''}`}
          />
          {errors.full_name && (
            <p id="err-full_name" className="mt-1 text-xs text-rose-600">{errors.full_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
            Phone <span className="text-rose-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={update('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'err-phone' : undefined}
            className={`${inputBase} ${errors.phone ? errInput : ''}`}
            placeholder="Best number to reach you"
          />
          {errors.phone && (
            <p id="err-phone" className="mt-1 text-xs text-rose-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email <span className="text-rose-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
            className={`${inputBase} ${errors.email ? errInput : ''}`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="err-email" className="mt-1 text-xs text-rose-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="relationship" className="block text-sm font-medium text-neutral-700 mb-1">
            Who is this for?
          </label>
          <select
            id="relationship"
            value={form.relationship}
            onChange={update('relationship')}
            className={inputBase}
          >
            <option value="">Select…</option>
            {RELATIONSHIPS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="care_type" className="block text-sm font-medium text-neutral-700 mb-1">
            Care type needed
          </label>
          <select
            id="care_type"
            value={form.care_type}
            onChange={update('care_type')}
            className={inputBase}
          >
            <option value="">Select…</option>
            {CARE_TYPES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="move_in_timeline" className="block text-sm font-medium text-neutral-700 mb-1">
            Move-in timeline
          </label>
          <select
            id="move_in_timeline"
            value={form.move_in_timeline}
            onChange={update('move_in_timeline')}
            className={inputBase}
          >
            <option value="">Select…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget_range" className="block text-sm font-medium text-neutral-700 mb-1">
            Monthly budget
          </label>
          <select
            id="budget_range"
            value={form.budget_range}
            onChange={update('budget_range')}
            className={inputBase}
          >
            <option value="">Select…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
            Tell us about your needs
          </label>
          <textarea
            id="message"
            name="message"
            rows={compact ? 3 : 4}
            value={form.message}
            onChange={update('message')}
            className={inputBase}
            placeholder="Care needs, mobility, location preferences, budget concerns…"
          />
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2 text-xs text-neutral-500">
        <ShieldCheck size={14} className="text-teal-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p>Your information is shared only with our care advisors — never sold.</p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-coral-700 hover:bg-coral-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-6 py-3 transition-colors"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Request a callback'
        )}
      </button>
    </form>
  );
};

export default InquiryForm;
