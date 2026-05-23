import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Building2, MessageSquare,
  BarChart3, Settings, LogOut, ChevronLeft
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/communities", label: "Communities", icon: Building2, soon: true },
  { to: "/admin/communications", label: "Communications", icon: MessageSquare, soon: true },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3, soon: true },
  { to: "/admin/settings", label: "Settings", icon: Settings, soon: true },
];

function NavBody({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const { signOut, user } = useAuth();
  const location = useLocation();
  return (
    <div className="flex flex-col h-full bg-teal-900 text-neutral-50">
      <div className={cn("flex items-center gap-3 px-5 py-5 border-b border-teal-800", collapsed && "px-3 justify-center")}>
        <img src={logo} alt="ElderCare" className="h-9 brightness-0 invert shrink-0" />
        {!collapsed && (
          <div className="text-xs leading-tight">
            <div className="font-semibold text-white">ElderCare</div>
            <div className="text-neutral-400">Admin</div>
          </div>
        )}
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active =
            item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors group",
                active
                  ? "bg-coral-500 text-white"
                  : "text-neutral-300 hover:bg-teal-800 hover:text-white",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="flex-1 flex items-center justify-between">
                  {item.label}
                  {item.soon && (
                    <span className="text-[10px] uppercase tracking-wider bg-teal-700 text-neutral-300 px-1.5 py-0.5 rounded">
                      Soon
                    </span>
                  )}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-teal-800 p-3">
        {!collapsed && user && (
          <div className="px-2 py-2 text-xs text-neutral-400 truncate">{user.email}</div>
        )}
        <button
          onClick={() => signOut()}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-neutral-300 hover:bg-coral-700 hover:text-white transition-colors",
            collapsed && "justify-center px-2"
          )}
          title="Sign out"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          "hidden md:flex flex-col relative shrink-0 transition-all duration-200",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <NavBody collapsed={collapsed} />
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-md hover:bg-coral-600"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={cn("w-3.5 h-3.5 transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>

      {/* Mobile */}
      <div className="md:hidden fixed top-3 left-3 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <button className="bg-teal-900 text-white p-2 rounded-md shadow-md">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-teal-900 border-r-teal-800">
            <NavBody collapsed={false} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
