import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { locations } from "@/data/locations";
import { Users, UserPlus, CalendarRange, CheckCircle2, Home, Building2 } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, CartesianGrid,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";
import { Loader2 } from "lucide-react";

type Lead = {
  id: string; full_name: string; email: string; phone: string;
  status: string; created_at: string;
  inquiry_for_community: string | null; inquiry_for_city: string | null;
  care_type: string | null;
};

const STATUS_COLORS: Record<string, string> = {
  new: "#EE7048",
  contacted: "#16847F",
  qualified: "#3E9692",
  placed: "#0A5C5C",
  closed: "#6B7A7A",
};

const STAT_TILES = [
  { key: "total", label: "Total Leads", icon: Users, tile: "bg-coral-500" },
  { key: "new", label: "New Leads", icon: UserPlus, tile: "bg-coral-600" },
  { key: "week", label: "Leads This Week", icon: CalendarRange, tile: "bg-teal-500" },
  { key: "qualified", label: "Qualified", icon: CheckCircle2, tile: "bg-teal-600" },
  { key: "placed", label: "Placed", icon: Home, tile: "bg-teal-700" },
  { key: "communities", label: "Total Communities", icon: Building2, tile: "bg-neutral-700" },
] as const;

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[] | null>(null);

  useEffect(() => {
    supabase.from("leads").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setLeads((data as Lead[]) ?? []));
  }, []);

  if (!leads) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-coral-500" /></div>;
  }

  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    week: leads.filter((l) => new Date(l.created_at).getTime() >= weekAgo).length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    placed: leads.filter((l) => l.status === "placed").length,
    communities: locations.length,
  };

  // Leads over time (last 14 days)
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = startOfDay(subDays(new Date(), 13 - i));
    return { date: d, label: format(d, "MMM d"), count: 0 };
  });
  leads.forEach((l) => {
    const t = startOfDay(new Date(l.created_at)).getTime();
    const bucket = days.find((d) => d.date.getTime() === t);
    if (bucket) bucket.count++;
  });

  // Leads by status
  const statusBreakdown = ["new", "contacted", "qualified", "placed", "closed"].map((s) => ({
    status: s,
    count: leads.filter((l) => l.status === s).length,
  }));

  const recent = leads.slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-white">Dashboard</h1>
        <p className="text-sm text-neutral-400">Live snapshot of your lead pipeline and directory.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {STAT_TILES.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.key} className="bg-teal-900/60 border border-teal-800 rounded-lg p-4 relative overflow-hidden">
              <div className={`absolute top-3 right-3 w-9 h-9 rounded-md ${t.tile} flex items-center justify-center text-white shadow`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">{t.label}</div>
              <div className="text-3xl font-semibold text-white mt-2">
                {stats[t.key as keyof typeof stats].toLocaleString()}
              </div>
              {t.key === "week" && stats.week > 0 && (
                <div className="text-xs text-coral-300 mt-1">+{stats.week} in last 7 days</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-teal-900/60 border border-teal-800 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-white mb-1">Leads over time</h2>
          <p className="text-xs text-neutral-400 mb-4">Daily lead volume — last 14 days</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={days}>
                <CartesianGrid stroke="#0A5C5C" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#97A4A4" fontSize={11} />
                <YAxis stroke="#97A4A4" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#063838", border: "1px solid #0A5C5C", borderRadius: 6, color: "#fff" }} />
                <Line type="monotone" dataKey="count" stroke="#EE7048" strokeWidth={2} dot={{ fill: "#EE7048", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-teal-900/60 border border-teal-800 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-white mb-1">Leads by status</h2>
          <p className="text-xs text-neutral-400 mb-4">Pipeline breakdown</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusBreakdown}>
                <CartesianGrid stroke="#0A5C5C" strokeDasharray="3 3" />
                <XAxis dataKey="status" stroke="#97A4A4" fontSize={11} />
                <YAxis stroke="#97A4A4" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#063838", border: "1px solid #0A5C5C", borderRadius: 6, color: "#fff" }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {statusBreakdown.map((s) => (
                    <Bar key={s.status} dataKey="count" fill={STATUS_COLORS[s.status]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-teal-900/60 border border-teal-800 rounded-lg">
        <div className="flex items-center justify-between p-5 border-b border-teal-800">
          <div>
            <h2 className="text-sm font-semibold text-white">Recent leads</h2>
            <p className="text-xs text-neutral-400">Latest inquiries from the public site</p>
          </div>
          <Link to="/admin/leads" className="text-xs text-coral-300 hover:text-coral-200">View all →</Link>
        </div>
        <div className="divide-y divide-teal-800">
          {recent.length === 0 && (
            <div className="p-6 text-center text-sm text-neutral-400">No leads yet.</div>
          )}
          {recent.map((l) => (
            <Link
              key={l.id} to="/admin/leads"
              className="flex items-center justify-between px-5 py-3 hover:bg-teal-800/40 transition-colors"
            >
              <div className="min-w-0">
                <div className="text-sm text-white truncate">{l.full_name}</div>
                <div className="text-xs text-neutral-400 truncate">
                  {l.inquiry_for_community || l.inquiry_for_city || "General inquiry"}
                  {l.care_type && ` · ${l.care_type}`}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={l.status} />
                <span className="text-xs text-neutral-400 hidden sm:block">
                  {format(new Date(l.created_at), "MMM d")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? "#6B7A7A";
  return (
    <span
      className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded text-white"
      style={{ backgroundColor: color }}
    >
      {status}
    </span>
  );
}
