// Public edge function: sends team + family notification emails for a new lead.
// Called by the InquiryForm AFTER the lead row has been inserted to the DB,
// so an email failure here never causes lead loss.
//
// Structured so a future SMS channel (Pingram) can be added inside notify()
// without changing callers.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// Team recipients — keep care@ canonical; add the founder. Override via
// LEAD_TEAM_EMAILS secret (comma-separated) without redeploy.
const DEFAULT_TEAM_EMAILS = [
  "care@sacramentoelderlycare.com",
  "Troy@reputationguardians.net",
];

const FROM_EMAIL =
  Deno.env.get("LEAD_FROM_EMAIL") ??
  "Sacramento Assisted Living Directory <care@sacramentoelderlycare.com>";

const SITE_URL = "https://sacramentoelderlycare.com";

interface LeadPayload {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  inquiry_for_community?: string | null;
  inquiry_for_community_id?: string | null;
  inquiry_for_city?: string | null;
  care_type?: string | null;
  move_in_timeline?: string | null;
  budget_range?: string | null;
  relationship?: string | null;
  message?: string | null;
  source_page?: string | null;
  source_url?: string | null;
  created_at?: string | null;
}

const esc = (s: string | null | undefined) =>
  (s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

const teamEmails = (): string[] => {
  const raw = Deno.env.get("LEAD_TEAM_EMAILS");
  if (!raw) return DEFAULT_TEAM_EMAILS;
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
};

const subjectContext = (l: LeadPayload) =>
  l.inquiry_for_community || l.inquiry_for_city || "General";

function teamHtml(l: LeadPayload): string {
  const rows: Array<[string, string]> = [
    ["Name", esc(l.full_name)],
    ["Phone", `<a href="tel:${esc(l.phone)}">${esc(l.phone)}</a>`],
    ["Email", `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>`],
    ["Inquiring for", esc(l.relationship) || "—"],
    ["Care type", esc(l.care_type) || "—"],
    ["Move-in timeline", esc(l.move_in_timeline) || "—"],
    ["Budget", esc(l.budget_range) || "—"],
    ["Community", esc(l.inquiry_for_community) || "—"],
    ["Community ID", esc(l.inquiry_for_community_id) || "—"],
    ["City", esc(l.inquiry_for_city) || "—"],
    ["Source page", esc(l.source_page) || "—"],
    ["Submitted at", esc(l.created_at) || new Date().toISOString()],
    ["Lead ID", esc(l.id) || "—"],
  ];
  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#475569;font-size:13px;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:500;">${v}</td></tr>`
    )
    .join("");

  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
    <div style="background:#0d9488;color:#ffffff;padding:18px 24px;">
      <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.85;">New lead</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px;">${esc(l.full_name)} — ${esc(subjectContext(l))}</div>
    </div>
    <div style="padding:20px 24px;">
      <table style="width:100%;border-collapse:collapse;">${body}</table>
      ${l.message ? `<div style="margin-top:20px;padding:14px 16px;background:#f1f5f9;border-radius:8px;"><div style="font-size:12px;color:#475569;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">Message</div><div style="color:#0f172a;font-size:14px;line-height:1.55;white-space:pre-wrap;">${esc(l.message)}</div></div>` : ""}
    </div>
  </div>
  </body></html>`;
}

function familyHtml(l: LeadPayload): string {
  const ctx = l.inquiry_for_community
    ? `your inquiry about <strong>${esc(l.inquiry_for_community)}</strong>`
    : l.inquiry_for_city
    ? `your inquiry about senior care in <strong>${esc(l.inquiry_for_city)}</strong>`
    : `your inquiry`;

  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
    <div style="background:#0d9488;color:#ffffff;padding:22px 28px;">
      <div style="font-size:20px;font-weight:700;">Thank you, ${esc(l.full_name.split(" ")[0] || l.full_name)}</div>
      <div style="opacity:.9;font-size:14px;margin-top:4px;">We received ${ctx}.</div>
    </div>
    <div style="padding:24px 28px;font-size:15px;line-height:1.6;">
      <p style="margin:0 0 14px;">A local care advisor will reach out shortly to listen to what your loved one needs and shortlist communities that actually have availability.</p>
      <p style="margin:0 0 14px;">A few things worth knowing:</p>
      <ul style="margin:0 0 14px;padding-left:20px;color:#334155;">
        <li style="margin-bottom:6px;"><strong>This service is free for families.</strong></li>
        <li style="margin-bottom:6px;"><strong>Your information is never sold.</strong> It's shared only with our care advisors.</li>
        <li style="margin-bottom:6px;">Every community we recommend is license-verified with the CA Department of Social Services.</li>
      </ul>
      <p style="margin:0 0 18px;">If anything changes or you'd like to add more detail, simply reply to this email.</p>
      <a href="${SITE_URL}" style="display:inline-block;background:#0d9488;color:#ffffff;text-decoration:none;font-weight:600;padding:11px 20px;border-radius:8px;font-size:14px;">Back to Sacramento Assisted Living Directory</a>
    </div>
    <div style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
      Sacramento Assisted Living Directory · <a href="${SITE_URL}" style="color:#0d9488;text-decoration:none;">sacramentoelderlycare.com</a>
    </div>
  </div>
  </body></html>`;
}

async function sendEmail(opts: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean; status: number; body?: unknown }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return { ok: false, status: 500, body: "no-api-key" };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      reply_to: opts.replyTo,
    }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) console.error("Resend error", res.status, body);
  return { ok: res.ok, status: res.status, body };
}

/** Notify all channels. Today: email. Future: also SMS via Pingram. */
async function notify(lead: LeadPayload) {
  const subjectCtx = subjectContext(lead);
  const teamResult = await sendEmail({
    to: teamEmails(),
    subject: `New lead: ${lead.full_name} — ${subjectCtx}`,
    html: teamHtml(lead),
    replyTo: lead.email,
  });
  const familyResult = await sendEmail({
    to: [lead.email],
    subject: "We received your inquiry — Sacramento Assisted Living Directory",
    html: familyHtml(lead),
  });
  // TODO(pingram): await sendSms(teamPhones(), `New lead: ${lead.full_name} — ${subjectCtx}`);
  return { team: teamResult, family: familyResult };
}

/**
 * Forward a copy of the lead to our separate placement agency's intake
 * endpoint. Strictly additive and fault-tolerant: any missing config,
 * network error, or non-2xx response is logged and swallowed so it can
 * never break the lead save, the Resend emails, or the family's success
 * state. Fields map the directory's inquiry shape onto the placement
 * intake's expected keys.
 */
async function forwardToPlacement(l: LeadPayload): Promise<number | null> {
  try {
    const url = Deno.env.get("PLACEMENT_INGEST_URL");
    const secret = Deno.env.get("INGEST_SECRET");
    if (!url || !secret) {
      console.warn(
        "forwardToPlacement skipped: PLACEMENT_INGEST_URL / INGEST_SECRET not configured"
      );
      return null;
    }

    // The community name or page label the inquiry came from.
    const sourceDetail =
      l.inquiry_for_community || l.inquiry_for_city || l.source_page || "Directory inquiry";
    // Full URL of the page the inquiry was submitted on. Prefer the absolute
    // href threaded from the client; fall back to reconstructing from the site
    // origin + the stored relative source_page.
    const sourceUrl =
      l.source_url || (l.source_page ? `${SITE_URL}${l.source_page}` : SITE_URL);

    const body = {
      full_name: l.full_name,
      phone: l.phone,
      email: l.email,
      relationship_to_senior: l.relationship ?? null,
      care_type: l.care_type ?? null,
      preferred_area: l.inquiry_for_city ?? null,
      budget_range: l.budget_range ?? null,
      timeline: l.move_in_timeline ?? null,
      situation: l.message ?? null,
      source: "directory",
      source_detail: sourceDetail,
      source_url: sourceUrl,
      external_id: l.id ?? null,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ingest-secret": secret,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("forwardToPlacement non-2xx", res.status, text);
      return res.status;
    }
    console.log("forwardToPlacement ok", res.status, "external_id", l.id ?? "—");
    return res.status;
  } catch (err) {
    // Swallow everything — the forward is best-effort and must never surface.
    console.error("forwardToPlacement failed (non-fatal)", err);
    return null;
  }
}

Deno.serve(async (req) => {
  console.log("notify-lead INVOKED", { ts: new Date().toISOString(), hasPlacementUrl: !!Deno.env.get("PLACEMENT_INGEST_URL"), hasIngestSecret: !!Deno.env.get("INGEST_SECRET") });
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const lead = (await req.json()) as LeadPayload;
    if (!lead?.full_name || !lead?.email || !lead?.phone) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const result = await notify(lead);
    // Additive, best-effort forward to the placement agency intake. Self-
    // contained try/catch inside — it never throws, so it cannot affect the
    // response, the emails above, or the client's success state.
    console.log("notify-lead: about to forward to placement");
    const status = await forwardToPlacement(lead);
    console.log("notify-lead: forward finished", { status });
    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-lead error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
