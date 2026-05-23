import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const { session, isAdmin, loading, signOut } = useAuth();
  const [newLeadCount, setNewLeadCount] = useState(0);

  useEffect(() => {
    if (!isAdmin) return;
    let mounted = true;
    const load = async () => {
      const { count } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      if (mounted) setNewLeadCount(count ?? 0);
    };
    load();
    const channel = supabase
      .channel("admin-leads-count")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, load)
      .subscribe();
    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!session) return <Navigate to="/login" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-6">
        <div className="max-w-md text-center bg-teal-800 border border-teal-700 rounded-lg p-8">
          <ShieldAlert className="w-12 h-12 text-coral-400 mx-auto mb-4" />
          <h1 className="text-xl font-serif text-white mb-2">Access denied</h1>
          <p className="text-neutral-300 text-sm mb-6">
            Your account does not have admin access to this directory.
          </p>
          <Button onClick={() => signOut()} className="bg-coral-500 hover:bg-coral-600 text-white">
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-neutral-900 text-neutral-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar newLeadCount={newLeadCount} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
