import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Loader2, Search, Mail, Phone, ArrowUpDown } from "lucide-react";
import { StatusBadge } from "./Dashboard";
import { toast } from "sonner";

type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
  inquiry_for_community: string | null;
  inquiry_for_community_id: string | null;
  inquiry_for_city: string | null;
  care_type: string | null;
  move_in_timeline: string | null;
  budget_range: string | null;
  relationship: string | null;
  message: string | null;
  source_page: string | null;
  internal_notes: string | null;
  assigned_to: string | null;
};

const STATUSES = ["new", "contacted", "qualified", "placed", "closed"];

export default function Leads() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortDesc, setSortDesc] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setLeads((data as Lead[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!leads) return [];
    const q = search.trim().toLowerCase();
    let out = leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      return (
        l.full_name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.inquiry_for_community ?? "").toLowerCase().includes(q) ||
        (l.inquiry_for_city ?? "").toLowerCase().includes(q)
      );
    });
    out = [...out].sort((a, b) => {
      const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sortDesc ? -diff : diff;
    });
    return out;
  }, [leads, search, statusFilter, sortDesc]);

  if (!leads) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-coral-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-white">Leads</h1>
        <p className="text-sm text-neutral-400">All inquiries from the public site. Click any row for details.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <Input
            placeholder="Search name, email, community, city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-teal-900/60 border-teal-800 text-white placeholder:text-neutral-500"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48 bg-teal-900/60 border-teal-800 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setSortDesc((v) => !v)}
          className="bg-teal-900/60 border-teal-800 text-white hover:bg-teal-800 hover:text-white"
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          {sortDesc ? "Newest first" : "Oldest first"}
        </Button>
      </div>

      <div className="bg-teal-900/60 border border-teal-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-teal-900 text-neutral-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Contact</th>
                <th className="text-left px-4 py-3 font-medium">Inquiry</th>
                <th className="text-left px-4 py-3 font-medium">Care type</th>
                <th className="text-left px-4 py-3 font-medium">Timeline</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-800">
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-neutral-400 py-10">No leads match the current filters.</td></tr>
              )}
              {filtered.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => setSelected(l)}
                  className="hover:bg-teal-800/40 cursor-pointer text-neutral-200"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-neutral-400">{format(new Date(l.created_at), "MMM d, yyyy")}</td>
                  <td className="px-4 py-3 text-white">{l.full_name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${l.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-coral-300 hover:text-coral-200">
                        <Mail className="w-3 h-3" /><span className="truncate max-w-[180px]">{l.email}</span>
                      </a>
                      <a href={`tel:${l.phone}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-neutral-300 hover:text-white">
                        <Phone className="w-3 h-3" /><span>{l.phone}</span>
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-300">
                    {l.inquiry_for_community || l.inquiry_for_city || <span className="text-neutral-500">—</span>}
                  </td>
                  <td className="px-4 py-3 text-neutral-300">{l.care_type ?? <span className="text-neutral-500">—</span>}</td>
                  <td className="px-4 py-3 text-neutral-300">{l.move_in_timeline ?? <span className="text-neutral-500">—</span>}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <LeadDetailDrawer
        lead={selected}
        onClose={() => setSelected(null)}
        onSaved={(updated) => {
          setLeads((prev) => prev?.map((p) => (p.id === updated.id ? updated : p)) ?? null);
          setSelected(updated);
        }}
      />
    </div>
  );
}

function LeadDetailDrawer({
  lead, onClose, onSaved,
}: { lead: Lead | null; onClose: () => void; onSaved: (l: Lead) => void }) {
  const [status, setStatus] = useState("new");
  const [notes, setNotes] = useState("");
  const [assigned, setAssigned] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      setNotes(lead.internal_notes ?? "");
      setAssigned(lead.assigned_to ?? "");
    }
  }, [lead]);

  if (!lead) return null;

  const save = async () => {
    setSaving(true);
    const { data, error } = await supabase
      .from("leads")
      .update({ status, internal_notes: notes || null, assigned_to: assigned || null })
      .eq("id", lead.id)
      .select()
      .single();
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Lead updated");
    onSaved(data as Lead);
  };

  return (
    <Sheet open={!!lead} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="bg-neutral-900 border-teal-800 text-neutral-100 w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-white font-serif">{lead.full_name}</SheetTitle>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Submitted {format(new Date(lead.created_at), "MMM d, yyyy 'at' h:mm a")}</span>
            <span>·</span>
            <StatusBadge status={lead.status} />
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          <Section title="Contact">
            <Field label="Email"><a className="text-coral-300 hover:text-coral-200" href={`mailto:${lead.email}`}>{lead.email}</a></Field>
            <Field label="Phone"><a className="text-coral-300 hover:text-coral-200" href={`tel:${lead.phone}`}>{lead.phone}</a></Field>
            {lead.relationship && <Field label="Relationship">{lead.relationship}</Field>}
          </Section>

          <Section title="Inquiry">
            {lead.inquiry_for_community && <Field label="Community">{lead.inquiry_for_community}</Field>}
            {lead.inquiry_for_city && <Field label="City">{lead.inquiry_for_city}</Field>}
            {lead.care_type && <Field label="Care type">{lead.care_type}</Field>}
            {lead.move_in_timeline && <Field label="Timeline">{lead.move_in_timeline}</Field>}
            {lead.budget_range && <Field label="Budget">{lead.budget_range}</Field>}
            {lead.source_page && <Field label="Source page"><span className="font-mono text-xs">{lead.source_page}</span></Field>}
            {lead.message && (
              <Field label="Message">
                <div className="text-sm text-neutral-200 whitespace-pre-wrap bg-teal-900/60 border border-teal-800 rounded p-3">{lead.message}</div>
              </Field>
            )}
          </Section>

          <Section title="Manage">
            <div className="space-y-3">
              <div>
                <Label className="text-neutral-300 text-xs uppercase tracking-wider">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="mt-1 bg-teal-900/60 border-teal-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-neutral-300 text-xs uppercase tracking-wider">Assigned to</Label>
                <Input
                  value={assigned}
                  onChange={(e) => setAssigned(e.target.value)}
                  placeholder="e.g. me, Troy, partner-name"
                  className="mt-1 bg-teal-900/60 border-teal-800 text-white"
                />
              </div>
              <div>
                <Label className="text-neutral-300 text-xs uppercase tracking-wider">Internal notes (private)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  placeholder="Call notes, next steps, partner placement details…"
                  className="mt-1 bg-teal-900/60 border-teal-800 text-white"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-neutral-500">
                  Last updated {format(new Date(lead.updated_at), "MMM d, h:mm a")}
                </span>
                <Button onClick={save} disabled={saving} className="bg-coral-500 hover:bg-coral-600 text-white">
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save changes
                </Button>
              </div>
            </div>
          </Section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-coral-400 font-semibold mb-2">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm">
      <div className="w-28 shrink-0 text-neutral-500 text-xs uppercase tracking-wider pt-0.5">{label}</div>
      <div className="flex-1 min-w-0 text-neutral-100">{children}</div>
    </div>
  );
}
