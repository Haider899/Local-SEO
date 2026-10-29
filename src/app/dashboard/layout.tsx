"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { WorkspaceProvider, useWorkspace } from "@/lib/context/WorkspaceContext";
import { useAuth } from "@/lib/context/AuthContext";
import {
  Sparkles,
  LayoutDashboard,
  Bot,
  MapPin,
  Search,
  Layers,
  Users2,
  CheckSquare,
  FileBarChart2,
  Wrench,
  Settings,
  Zap,
  Menu,
  X,
  Building,
  ChevronDown,
  ShieldCheck,
  Crown,
  RotateCcw,
  Check,
  LogOut,
  User as UserIcon,
  ShieldAlert,
  Globe,
} from "lucide-react";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout: firebaseLogout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { workspace, resetToDemoWorkspace, hasCustomAudit } = useWorkspace();
  
  const [storedUser, setStoredUser] = useState<{
    name?: string;
    email?: string;
    avatar?: string;
    provider?: string;
  } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("omni_auth_user");
      if (raw) {
        setStoredUser(JSON.parse(raw));
      }
    } catch {
      // Ignore
    }
  }, [user]);

  // Displayed user name & email (prefers live Firebase User, then localStorage, then workspace)
  const displayName =
    user?.displayName || storedUser?.name || "Workspace Owner";
  const displayEmail =
    user?.email || storedUser?.email || "haider@doartenergy.com";
  const displayAvatar = user?.photoURL || storedUser?.avatar || null;
  const isGoogleAuth = Boolean(
    user?.providerData?.some((p) => p.providerId === "google.com") ||
      storedUser?.provider === "google"
  );

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      localStorage.removeItem("omni_auth_user");
    } catch {
      // Ignore
    }
    router.push("/login");
  };

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Local SEO & Grid", href: "/dashboard/local-seo", icon: MapPin },
    { label: "Website SEO", href: "/dashboard/website-seo", icon: Globe, badge: "Pkg 2" },
    { label: "AI Visibility", href: "/dashboard/ai-visibility", icon: Bot, badge: "AEO" },
    { label: "Rank Tracker", href: "/dashboard/rank-tracker", icon: Layers },
    { label: "Competitors", href: "/dashboard/competitors", icon: Users2 },
    { label: "Smart Tasks", href: "/dashboard/tasks", icon: CheckSquare, badge: `${workspace.tasks.length} Open` },
    { label: "Reports", href: "/dashboard/reports", icon: FileBarChart2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-600 via-emerald-600 to-sky-500 flex items-center justify-center text-white shadow-sm">
            <Globe className="w-4 h-4" />
          </div>
          <span className="font-black text-slate-900 text-base font-heading">
            Omni<span className="text-teal-600">Rank</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 transition-transform duration-200 shadow-xs ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Brand */}
          <div className="px-2 pt-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1 font-heading">
                  Omni<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-sky-600">Rank</span>
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-teal-50 text-teal-800 border border-teal-200">
                    SaaS
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Workspace Engine</span>
              </div>
            </Link>
          </div>

          {/* Project Switcher */}
          <div className="relative">
            <button
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100/80 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-xs">
                  {workspace.name.charAt(0).toUpperCase()}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 truncate">{workspace.name}</div>
                  <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {workspace.isLiveAudit ? "Live Scanned Domain" : "Austin, TX (Demo Workspace)"}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            {switcherOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 space-y-1 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400">Current Workspace</div>
                
                <button
                  onClick={() => setSwitcherOpen(false)}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-slate-900 bg-teal-50/80 border border-teal-200"
                >
                  <div className="truncate text-left">
                    <div className="truncate">{workspace.name}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{workspace.domain}</div>
                  </div>
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                </button>

                <Link
                  href="/#audit-section"
                  onClick={() => setSwitcherOpen(false)}
                  className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-teal-600 hover:bg-teal-50 transition-colors text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>+ Scan & Add New Business</span>
                </Link>
              </div>
            )}
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Intelligence
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-teal-600" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isActive ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="px-3 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Utilities & System
            </div>

            <Link
              href="/free-tools"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <Wrench className="w-4 h-4 text-sky-600" />
              <span>12 Free Tools</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                pathname === "/dashboard/settings"
                  ? "bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings & Plan</span>
            </Link>
          </nav>
        </div>

        {/* User Account & Logout Footer in Sidebar */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          {/* Plan Upgrade Box */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 border border-teal-100 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-500" /> Pro Workspace
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Active</span>
            </div>

            <Link
              href="/pricing"
              className="block text-xs font-bold text-teal-700 hover:underline pt-0.5"
            >
              Manage Subscription →
            </Link>
          </div>

          {/* User Profile + Logout Card */}
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 truncate">
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-8 h-8 rounded-full border border-slate-300 object-cover shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="truncate">
                <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                  <span>{displayName}</span>
                  {isGoogleAuth && (
                    <span className="text-[9px] font-bold px-1 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                      Google
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{displayEmail}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Log Out of OmniRank"
              className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Dashboard Header Bar */}
        <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shadow-2xs sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 hidden sm:inline">Active Workspace:</span>
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-600" />
              <span>{workspace.name}</span>
              <span className="text-slate-400 font-normal">({workspace.domain})</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#audit-section"
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scan New Site</span>
            </Link>

            {/* Profile Dropdown with Logout */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    className="w-7 h-7 rounded-lg border border-slate-300 object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 p-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 space-y-1 animate-in fade-in zoom-in-95">
                  <div className="p-2.5 border-b border-slate-100 flex items-center gap-2.5">
                    {displayAvatar ? (
                      <img
                        src={displayAvatar}
                        alt={displayName}
                        className="w-9 h-9 rounded-full border border-slate-200 object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">{displayName}</div>
                      <div className="text-[11px] text-slate-500 truncate">{displayEmail}</div>
                      {isGoogleAuth && (
                        <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-600" /> Verified Google Account
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href="/dashboard/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Workspace Settings</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </WorkspaceProvider>
  );
}
