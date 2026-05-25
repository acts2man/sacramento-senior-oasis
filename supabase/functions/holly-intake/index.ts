// Public webhook receiver for ElevenLabs post-call analysis from "Holly" voice agent.
// Builds a formatted intake email and sends via Resend. Returns 200 quickly so
// ElevenLabs does not retry. No JWT required.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const FROM_EMAIL = "Holly <holly@sacramentoelderlycare.com>";

// data_collection_results values may be plain strings/numbers OR objects with { value }
function v(x: unknown): string {
  if (x === null || x === undefined || x === "") return "—";
  if (typeof x === "object") {
    const o = x as Record<string, unknown>;
    if ("value" in o) return v(o.value);
    return JSON.stringify(o);
  }
  return String(x);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 14px 6px 0;color:#475569;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(label)}</td><td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:500;white-space:pre-wrap;">${esc(value)}</td></tr>`;
}

function section(title: string, rows: string): string {
  return `<div style="margin-top:18px;"><div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#0d9488;font-weight:700;margin-bottom:6px;">${esc(title)}</div><table style="width:100%;border-collapse:collapse;">${rows}</table></div>`;
}

interface Turn {
  role?: string;
  message?: string;
}

function transcriptHtml(turns: Turn[]): string {
  if (!Array.isArray(turns) || turns.length === 0) return "";
  const body = turns
    .map((t) => {
      const role = (t.role || "").toLowerCase();
      const who = role === "agent" || role === "assistant" ? "Holly" : role === "user" ? "Caller" : esc(t.role || "—");
      const color = who === "Holly" ? "#0d9488" : "#0f172a";
      return `<div style="margin:0 0 10px;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:${color};font-weight:700;margin-bottom:2px;">${esc(who)}</div><div style="font-size:13px;color:#334155;line-height:1.55;white-space:pre-wrap;">${esc(t.message || "")}</div></div>`;
    })
    .join("");
  return `<div style="margin-top:24px;padding-top:18px;border-top:1px solid #e2e8f0;"><div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#64748b;font-weight:700;margin-bottom:10px;">Full transcript</div>${body}</div>`;
}

function buildEmail(payload: any): { subject: string; html: string } {
  const analysis = payload?.data?.analysis ?? payload?.analysis ?? {};
  const summary: string = analysis.transcript_summary || "";
  const d = analysis.data_collection_results || {};

  const get = (k: string) => v(d[k]);

  const residentName = get("resident_name");
  const urgencyVal = get("urgency");
  const isUrgent = urgencyVal.toLowerCase().includes("urgent");

  const headerBg = isUrgent ? "#dc2626" : "#0d9488";
  const subject = `${isUrgent ? "🔴 URGENT — " : ""}New Placement Lead: ${residentName} (via Holly)`;

  const caller = section("Caller", [
    row("Name", get("caller_name")),
    row("Relationship", get("caller_relationship")),
    row("Phone", get("caller_phone")),
    row("Best callback time", get("preferred_callback_time")),
  ].join(""));

  const lovedOne = section("Loved One", [
    row("Name", residentName),
    row("DOB / age", get("resident_dob")),
    row("Current location", get("current_location")),
    row("Discharge date", get("discharge_date")),
    row("Preferred area", get("preferred_area")),
  ].join(""));

  const care = section("Care Picture", [
    row("Care level", get("care_level")),
    row("Mobility", get("mobility")),
    row("Memory / behavior", get("memory_behavior")),
    row("Medical flags", get("medical_flags")),
    row("Caregiver burnout", get("caregiver_burnout")),
  ].join(""));

  const money = section("Money & Fit", [
    row("Payer", get("payer_type")),
    row("Budget", get("budget")),
    row("Veteran", get("veteran")),
    row("Urgency", urgencyVal),
    row("Fit assessment", get("fit_assessment")),
  ].join(""));

  const transcript = transcriptHtml(payload?.data?.transcript ?? payload?.transcript ?? []);

  const summaryBlock = summary
    ? `<div style="margin-bottom:6px;padding:14px 16px;background:#f1f5f9;border-radius:8px;color:#0f172a;font-size:14px;line-height:1.55;white-space:pre-wrap;">${esc(summary)}</div>`
    : "";

  const html = `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;padding:24px;margin:0;">
  <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
    <div style="background:${headerBg};color:#ffffff;padding:18px 24px;">
      <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.9;">${isUrgent ? "Urgent placement lead" : "New placement lead from Holly"}</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px;">${esc(residentName)}</div>
    </div>
    <div style="padding:20px 24px;">
      ${summaryBlock}
      ${caller}
      ${lovedOne}
      ${care}
      ${money}
      ${transcript}
    </div>
  </div></body></html>`;

  return { subject, html };
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("Resend error", res.status, body);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const payload = await req.json().catch(() => ({}));
    const to = Deno.env.get("INTAKE_TO_EMAIL");
    if (!to) {
      console.error("INTAKE_TO_EMAIL not configured");
    } else {
      const { subject, html } = buildEmail(payload);
      // Fire and forget so we return fast — but await briefly to surface obvious errors in logs.
      sendEmail(to, subject, html).catch((e) => console.error("sendEmail failed", e));
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("holly-intake error", err);
    // Still 200 so ElevenLabs doesn't retry — we logged the error.
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
