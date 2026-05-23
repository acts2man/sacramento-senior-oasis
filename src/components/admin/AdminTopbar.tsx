import { Bell, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function AdminTopbar({ newLeadCount }: { newLeadCount: number }) {
  const { user } = useAuth();
  const name = user?.email?.split("@")[0] ?? "admin";
  return (
    <header className="h-16 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between px-6 md:pl-6 pl-16">
      <div>
        <div className="text-sm md:text-base font-semibold text-white">
          Welcome back, <span className="capitalize">{name}</span>
        </div>
        <div className="text-xs text-neutral-400">
          Here's what's happening with your directory today.
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-md hover:bg-neutral-800 text-neutral-300" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          {newLeadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-coral-500 text-white text-[10px] font-bold flex items-center justify-center">
              {newLeadCount > 99 ? "99+" : newLeadCount}
            </span>
          )}
        </button>
        <button className="p-2 rounded-md hover:bg-neutral-800 text-neutral-300" aria-label="Settings">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
