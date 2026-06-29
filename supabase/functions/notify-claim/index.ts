// Public edge function: emails the admin team when a community owner / operator
// submits a "claim this listing" interest form. Modelled on notify-lead so
// FROM_EMAIL, the team-recipients override pattern, and Resend setup are the
// same — keeps ops simple (one Resend key, one sender).
//
// Called by the ClaimListingDialog AFTER the claim_requests row has been
// inserted. An email failure here MUST NOT cause data loss; the row is
// already saved.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const DEFAULT_TEAM_EMAILS = [
  "care@sacramentoelderlycare.com",
  "Troy@reputationguardians.net",
];

const FROM_EMAIL =
  Deno.env.get("LEAD_FROM_EMAIL") ??
  "Sacramento Assisted Living Directory <care@sacramentoelderlycare.com>";

const SITE_URL = "https://sacramentoelderlycare.com";

interface ClaimPayload {
  id?: string;
  full_name: string;
  role: 'owner' | 'administrator' | 'manager' | 'other' | string;
  email: string;
  phone: string;
  community_name: string;
  community_id?: string | null;
  message?: string | null;
  source_page?: string | null;
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

const ROLE_LABEL: Record<string, string> = {
  owner: "Owner",
  administrator: "Administrator",
  manager: "Manager",
  other: "Other",
};

function teamHtml(c: ClaimPayload): string {
  const rows: Array<[string, string]> = [
    ["Community", esc(c.community_name)],
    ["Community ID", esc(c.community_id || "—")],
    ["Claimant name", esc(c.full_name)],
    ["Role at community", esc(ROLE_LABEL[c.role] ?? c.role)],
    ["Phone", `<a href="tel:${esc(c.phone)}">${esc(c.phone)}</a>`],
    ["Email", `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`],
    ["Source page", esc(c.source_page) || "—"],
    ["Submitted at", esc(c.created_at) || new Date().toISOString()],
    ["Claim request ID", esc(c.id) || "—"],
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
      <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.85;">New listing claim request</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px;">${esc(c.community_name)}</div>
    </div>
    <div style="padding:20px 24px;">
      <table style="width:100%;border-collapse:collapse;">${body}</table>
      ${c.message ? `<div style="margin-top:20px;padding:14px 16px;background:#f1f5f9;border-radius:8px;"><div style="font-size:12px;color:#475569;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">Message from claimant</div><div style="color:#0f172a;font-size:14px;line-height:1.55;white-space:pre-wrap;">${esc(c.message)}</div></div>` : ""}
      <div style="margin-top:20px;padding:14px 16px;background:#fef3c7;border-radius:8px;font-size:13px;color:#7c2d12;line-height:1.5;">
        <strong>Next step:</strong> verify the claimant's role with the community (call the
        number on their CDSS license, not the number they provided) before granting
        any owner access.
      </div>
    </div>
  </div>
  </body></html>`;
}

function claimantHtml(c: ClaimPayload): string {
  const firstName = (c.full_name || "").split(" ")[0] || c.full_name;
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
    <div style="background:#0d9488;color:#ffffff;padding:22px 28px;">
      <div style="font-size:20px;font-weight:700;">Thanks, ${esc(firstName)}</div>
      <div style="opacity:.9;font-size:14px;margin-top:4px;">We received your request to claim <strong>${esc(c.community_name)}</strong>.</div>
    </div>
    <div style="padding:24px 28px;font-size:15px;line-height:1.6;">
      <p style="margin:0 0 14px;">We'll verify your role with the community and follow up to get your listing set up — typically within one to two business days.</p>
      <p style="margin:0 0 14px;">A few things worth knowing:</p>
      <ul style="margin:0 0 14px;padding-left:20px;color:#334155;">
        <li style="margin-bottom:6px;">There is no charge to claim or verify your listing.</li>
        <li style="margin-bottom:6px;">Once verified, you'll be able to add real photos, amenities, and pricing.</li>
        <li style="margin-bottom:6px;">Family inquiries you receive through the directory are routed through our advisors.</li>
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

async function notify(claim: ClaimPayload) {
  const teamResult = await sendEmail({
    to: teamEmails(),
    subject: `New listing claim request: ${claim.community_name}`,
    html: teamHtml(claim),
    replyTo: claim.email,
  });
  const claimantResult = await sendEmail({
    to: [claim.email],
    subject: "We received your listing claim — Sacramento Assisted Living Directory",
    html: claimantHtml(claim),
  });
  return { team: teamResult, claimant: claimantResult };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const claim = (await req.json()) as ClaimPayload;
    if (!claim?.full_name || !claim?.email || !claim?.phone || !claim?.community_name) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const result = await notify(claim);
    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-claim error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
