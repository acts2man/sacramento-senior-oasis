import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * "Claim this listing" interest-capture modal.
 *
 * NOT an account system. We are not creating an owner login, role, or
 * editing dashboard here. This just inserts a row into claim_requests and
 * emails the admin team. A human verifies the role with the community
 * (using the number on the CDSS license, not the one in the form) before
 * any owner access is granted.
 *
 * Success state is intentionally explicit about "we'll follow up to set it
 * up" so claimants don't expect an instant self-serve flow.
 */

const ROLE_OPTIONS = [
  { value: 'owner', label: 'Owner' },
  { value: 'administrator', label: 'Administrator' },
  { value: 'manager', label: 'Manager' },
  { value: 'other', label: 'Other' },
] as const;

const schema = z.object({
  full_name: z.string().trim().min(2, 'Please enter your full name').max(120),
  role: z.enum(['owner', 'administrator', 'manager', 'other'], {
    errorMap: () => ({ message: 'Please select your role' }),
  }),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(40),
  message: z.string().max(2000).optional().or(z.literal('')),
});

interface ClaimListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  communityName: string;
  communityId: string;
}

const ClaimListingDialog = ({
  open,
  onOpenChange,
  communityName,
  communityId,
}: ClaimListingDialogProps) => {
  const { toast } = useToast();
  const location = useLocation();

  const [form, setForm] = useState({
    full_name: '',
    role: '' as '' | (typeof ROLE_OPTIONS)[number]['value'],
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetState = () => {
    setForm({ full_name: '', role: '', email: '', phone: '', message: '' });
    setErrors({});
    setSubmitting(false);
    setSuccess(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetState();
    onOpenChange(next);
  };

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value as typeof p[typeof k] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

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

    const claimId = crypto.randomUUID();
    const submittedAt = new Date().toISOString();

    const payload = {
      id: claimId,
      community_name: communityName,
      community_id: communityId,
      full_name: parsed.data.full_name,
      role: parsed.data.role,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message || null,
      source_page: location.pathname + location.search,
      status: 'new',
    };

    // 1) Save the claim request. This MUST succeed for the submission to count.
    const { error: insertError } = await supabase
      .from('claim_requests')
      .insert(payload);

    if (insertError) {
      console.error('claim_requests insert failed:', insertError);
      setSubmitting(false);
      toast({
        title: "We couldn't submit your claim",
        description:
          'Please try again in a moment, or email care@sacramentoelderlycare.com.',
        variant: 'destructive',
      });
      return;
    }

    // 2) Fire-and-handle admin notification. Email failure must NEVER lose the claim.
    try {
      const { error: fnError } = await supabase.functions.invoke('notify-claim', {
        body: { ...payload, created_at: submittedAt },
      });
      if (fnError) console.error('notify-claim error (non-fatal):', fnError);
    } catch (err) {
      console.error('notify-claim threw (non-fatal):', err);
    }

    setSubmitting(false);
    setSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="text-center py-4">
            <CheckCircle2 size={44} className="text-teal-600 mx-auto" aria-hidden="true" />
            <DialogHeader className="mt-4">
              <DialogTitle className="font-serif text-2xl text-neutral-800">
                Thanks — we'll verify your role and follow up to get your listing set up.
              </DialogTitle>
            </DialogHeader>
            <p className="mt-4 text-neutral-700 leading-relaxed text-sm">
              We typically follow up within one to two business days. Once
              verified, you'll be able to add real photos, amenities, and
              pricing for <strong>{communityName}</strong>.
            </p>
            <Button
              className="mt-6"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-neutral-800">
                Claim {communityName}
              </DialogTitle>
              <DialogDescription className="text-neutral-700">
                Owners, administrators, and managers can claim their listing
                to add verified photos, amenities, and pricing. There's no
                charge — we'll verify your role and follow up to set it up.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <label className="block text-xs font-semibold tracking-wide text-neutral-600 uppercase mb-1">
                  Community
                </label>
                <input
                  type="text"
                  value={communityName}
                  readOnly
                  className="w-full bg-neutral-100 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-700"
                />
              </div>

              <div>
                <label htmlFor="claim-full-name" className="block text-xs font-semibold tracking-wide text-neutral-600 uppercase mb-1">
                  Your full name <span className="text-red-600">*</span>
                </label>
                <input
                  id="claim-full-name"
                  type="text"
                  value={form.full_name}
                  onChange={update('full_name')}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                {errors.full_name && <p className="mt-1 text-xs text-red-600">{errors.full_name}</p>}
              </div>

              <div>
                <label htmlFor="claim-role" className="block text-xs font-semibold tracking-wide text-neutral-600 uppercase mb-1">
                  Your role at this community <span className="text-red-600">*</span>
                </label>
                <select
                  id="claim-role"
                  value={form.role}
                  onChange={update('role')}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select your role…</option>
                  {ROLE_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="claim-email" className="block text-xs font-semibold tracking-wide text-neutral-600 uppercase mb-1">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="claim-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="claim-phone" className="block text-xs font-semibold tracking-wide text-neutral-600 uppercase mb-1">
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="claim-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="claim-message" className="block text-xs font-semibold tracking-wide text-neutral-600 uppercase mb-1">
                  Anything we should know? (optional)
                </label>
                <textarea
                  id="claim-message"
                  rows={3}
                  value={form.message}
                  onChange={update('message')}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. preferred contact time, or anything you'd like updated first"
                />
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                We'll verify your role before granting any owner access. This
                form does not log you in — a member of our team will follow up
                directly.
              </p>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" aria-hidden="true" />
                      Submitting…
                    </>
                  ) : (
                    'Submit claim request'
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClaimListingDialog;
