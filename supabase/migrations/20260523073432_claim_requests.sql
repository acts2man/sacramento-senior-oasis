-- claim_requests: interest-capture for community owners who want to claim
-- a listing. NOT an account system — just a row we save and email the admin
-- team about. Manual review and approval happens out of band.
--
-- RLS mirrors the leads table:
--   - public (anon + authenticated) can INSERT a claim request
--   - only admins (has_role(uid, 'admin')) can SELECT / UPDATE / DELETE
--
-- A "community owner role" intentionally does NOT exist yet — when a future
-- owner portal is built, that's when we'll add it and a separate
-- community_owners table mapping users to community_ids. Until then, this
-- table just captures interest.

CREATE TABLE public.claim_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- Which community is being claimed. community_id is the directory slug
  -- (matches Facility.id); community_name is captured at submit time so
  -- the row remains readable even if the slug is later renamed.
  community_name text NOT NULL,
  community_id   text,

  -- Claimant identity
  full_name text NOT NULL,
  role      text NOT NULL CHECK (role IN ('owner', 'administrator', 'manager', 'other')),
  email     text NOT NULL,
  phone     text NOT NULL,
  message   text,

  -- Admin workflow
  status         text NOT NULL DEFAULT 'new',
  internal_notes text,
  source_page    text
);

ALTER TABLE public.claim_requests ENABLE ROW LEVEL SECURITY;

-- Public can submit a claim request (anon and authenticated). This is the
-- only write path; everything else is admin-gated.
CREATE POLICY "Anyone can submit a claim request"
  ON public.claim_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admin-only read.
CREATE POLICY "Admins can view claim requests"
  ON public.claim_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update claim requests"
  ON public.claim_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete claim requests"
  ON public.claim_requests FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger — reuses public.set_updated_at() created in the
-- leads migration.
CREATE TRIGGER claim_requests_set_updated_at
  BEFORE UPDATE ON public.claim_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_claim_requests_status     ON public.claim_requests(status);
CREATE INDEX idx_claim_requests_created_at ON public.claim_requests(created_at DESC);
CREATE INDEX idx_claim_requests_community  ON public.claim_requests(community_id);

GRANT INSERT ON public.claim_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.claim_requests TO authenticated;
