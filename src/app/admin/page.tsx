"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import {
  ShieldAlert,
  Users,
  CreditCard,
  Building,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Search,
  Activity,
  ArrowRight,
  Database,
  Lock,
  Key,
  DollarSign,
  Calendar,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  LogOut,
  Sliders,
  RefreshCw,
  Trash2,
  Edit3,
  Check,
  X,
  Layers,
  Bot,
  MapPin,
  Server,
  Globe,
  Radio,
  Eye,
  EyeOff,
  Plus,
  Download,
  Play,
  Zap,
  Clock,
  Cpu,
  LockKeyhole,
  CheckCheck,
  UserCheck,
  PauseCircle,
  PlayCircle,
  FileText,
  Mail,
  Phone,
} from "lucide-react";
import { ClientRecord, LeadRecord, PackageRecord, AdminActionRecord } from "@/lib/data/repository";

export default function AdminSuperPortalPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showAdminPasscode, setShowAdminPasscode] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showNewClientPassword, setShowNewClientPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [adminRole, setAdminRole] = useState<"Super Admin" | "Sales" | "Support">("Super Admin");

  // Active section tabs
  const [activeSection, setActiveSection] = useState<
    "overview" | "clients" | "leads" | "packages" | "billing" | "monitoring" | "logs"
  >("overview");

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [filterLeadStatus, setFilterLeadStatus] = useState<string>("all");
  const [filterLeadType, setFilterLeadType] = useState<string>("all");

  // Live Server Data
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [packages, setPackages] = useState<PackageRecord[]>([]);
  const [adminLogs, setAdminLogs] = useState<AdminActionRecord[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Modals & interactive overrides
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);
  const [resetPassModalClient, setResetPassModalClient] = useState<ClientRecord | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [editingPackage, setEditingPackage] = useState<PackageRecord | null>(null);
  const [newPackageFeature, setNewPackageFeature] = useState("");

  // Manual Client Creation Modal
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    businessName: "",
    domain: "",
    ownerName: "",
    ownerEmail: "",
    phone: "",
    plan: "Package 2 ($50/mo)",
    mode: "Auto",
    password: "",
  });

  // Detailed Lead View Modal
  const [viewLeadModal, setViewLeadModal] = useState<LeadRecord | null>(null);

  useEffect(() => {
    try {
      const auth = sessionStorage.getItem("omni_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Fetch all live data from APIs
  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [clientsRes, leadsRes, packagesRes] = await Promise.all([
        fetch("/api/clients"),
        fetch("/api/leads"),
        fetch("/api/packages"),
      ]);

      const clientsData = await clientsRes.json();
      const leadsData = await leadsRes.json();
      const packagesData = await packagesRes.json();

      if (clientsData.success && clientsData.clients) {
        setClients(clientsData.clients);
        if (clientsData.logs) setAdminLogs(clientsData.logs);
      }
      if (leadsData.success && leadsData.leads) {
        setLeads(leadsData.leads);
      }
      if (packagesData.success && packagesData.packages) {
        setPackages(packagesData.packages);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passcode.trim() === "admin2026" ||
      passcode.trim() === "omni_admin_2026" ||
      passcode.trim() === "admin"
    ) {
      setIsAuthenticated(true);
      setErrorMsg("");
      try {
        sessionStorage.setItem("omni_admin_auth", "true");
      } catch {
        // Ignore
      }
    } else {
      setErrorMsg("Access Denied: Invalid Master Admin Passcode.");
    }
  };

  const handleAdminLock = () => {
    setIsAuthenticated(false);
    setPasscode("");
    try {
      sessionStorage.removeItem("omni_admin_auth");
    } catch {
      // Ignore
    }
  };

  // Account Controls: Disable / Enable
  const handleToggleClientStatus = async (client: ClientRecord) => {
    const action = client.status === "Active" ? "disable" : "enable";
    try {
      const res = await fetch("/api/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: client.id,
          action,
          adminEmail: `${adminRole.toLowerCase().replace(" ", "")}@itibusinesssuite.online`,
        }),
      });
      const data = await res.json();
      if (data.success && data.client) {
        setClients((prev) => prev.map((c) => (c.id === client.id ? data.client : c)));
        triggerNotice(
          action === "disable"
            ? `Client "${client.businessName}" disabled. Automations paused immediately.`
            : `Client "${client.businessName}" enabled. Automations resumed.`
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  // Account Controls: Password Reset
  const handleConfirmPasswordReset = async () => {
    if (!resetPassModalClient || !newPasswordInput) return;
    try {
      const res = await fetch("/api/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: resetPassModalClient.id,
          action: "reset_password",
          payload: { newPassword: newPasswordInput },
          adminEmail: `${adminRole.toLowerCase().replace(" ", "")}@itibusinesssuite.online`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        triggerNotice(`Password reset for ${resetPassModalClient.ownerEmail}`);
        setResetPassModalClient(null);
        setNewPasswordInput("");
      }
    } catch (err) {
      console.error("Password reset error:", err);
    }
  };

  // Account Controls: Plan Change
  const handleChangeClientPlan = async (client: ClientRecord, newPlan: string) => {
    try {
      const res = await fetch("/api/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: client.id,
          action: "change_plan",
          payload: { plan: newPlan },
          adminEmail: `${adminRole.toLowerCase().replace(" ", "")}@itibusinesssuite.online`,
        }),
      });
      const data = await res.json();
      if (data.success && data.client) {
        setClients((prev) => prev.map((c) => (c.id === client.id ? data.client : c)));
        triggerNotice(`Updated ${client.businessName} plan to ${newPlan}`);
      }
    } catch (err) {
      console.error("Plan change error:", err);
    }
  };

  // Account Controls: Impersonation
  const handleImpersonateClient = (client: ClientRecord) => {
    try {
      localStorage.setItem(
        "omni_auth_user",
        JSON.stringify({
          name: client.ownerName,
          email: client.ownerEmail,
          businessName: client.businessName,
          domain: client.domain,
          plan: client.plan,
          impersonatedByAdmin: true,
          loggedInAt: new Date().toISOString(),
        })
      );
      triggerNotice(`Impersonating ${client.businessName}. Redirecting to dashboard...`);
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch {
      // Ignore
    }
  };

  // Leads Status Update
  const handleUpdateLeadStatus = async (leadId: string, status: LeadRecord["status"]) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status } : l))
        );
        triggerNotice(`Lead status updated to ${status}`);
      }
    } catch (err) {
      console.error("Lead status error:", err);
    }
  };

  // Package Pricing Save
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    try {
      const res = await fetch("/api/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPackage.id,
          updates: editingPackage,
          adminEmail: `${adminRole.toLowerCase().replace(" ", "")}@itibusinesssuite.online`,
        }),
      });
      const data = await res.json();
      if (data.success && data.package) {
        setPackages((prev) =>
          prev.map((p) => (p.id === editingPackage.id ? data.package : p))
        );
        triggerNotice(`Saved package pricing for ${editingPackage.name}`);
        setEditingPackage(null);
      }
    } catch (err) {
      console.error("Package save error:", err);
    }
  };

  // Manual Client Creation
  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientForm.businessName.trim() || !newClientForm.ownerEmail.trim()) {
      alert("Business Name and Owner Email are required.");
      return;
    }

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newClientForm,
          businessName: newClientForm.businessName.trim(),
          domain: newClientForm.domain.trim() || `${newClientForm.businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
          ownerEmail: newClientForm.ownerEmail.trim(),
          ownerName: newClientForm.ownerName.trim() || newClientForm.ownerEmail.split("@")[0],
        }),
      });
      const data = await res.json();
      if (data.success && data.client) {
        setClients((prev) => [data.client, ...prev]);
        triggerNotice(`Client "${data.client.businessName}" created successfully!`);
        setIsAddClientOpen(false);
        setNewClientForm({
          businessName: "",
          domain: "",
          ownerName: "",
          ownerEmail: "",
          phone: "",
          plan: "Package 2 ($50/mo)",
          mode: "Auto",
          password: "",
        });
      } else {
        alert(data.error || "Failed to create client.");
      }
    } catch (err: any) {
      console.error("Create client error:", err);
      alert(err.message || "Failed to create client.");
    }
  };

  // Client Deletion
  const handleDeleteClient = async (client: ClientRecord) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${client.businessName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(
        `/api/clients?id=${client.id}&adminEmail=${encodeURIComponent(
          `${adminRole.toLowerCase().replace(" ", "")}@itibusinesssuite.online`
        )}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        setClients((prev) => prev.filter((c) => c.id !== client.id));
        triggerNotice(`Client "${client.businessName}" deleted.`);
      } else {
        alert(data.error || "Failed to delete client.");
      }
    } catch (err: any) {
      console.error("Delete client error:", err);
      alert(err.message || "Failed to delete client.");
    }
  };

  // Lead Deletion
  const handleDeleteLead = async (lead: LeadRecord) => {
    if (!window.confirm(`Delete lead inquiry from "${lead.name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/leads?id=${lead.id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== lead.id));
        if (viewLeadModal?.id === lead.id) setViewLeadModal(null);
        triggerNotice(`Deleted lead from "${lead.name}".`);
      } else {
        alert(data.error || "Failed to delete lead.");
      }
    } catch (err: any) {
      console.error("Delete lead error:", err);
      alert(err.message || "Failed to delete lead.");
    }
  };

  // Lead Conversion to Client
  const handleConvertLeadToClient = (lead: LeadRecord) => {
    const rawDomain = (lead.websiteUrl || "").replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
    setNewClientForm({
      businessName: lead.businessName || lead.name,
      domain: rawDomain || `${(lead.businessName || lead.name).toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      ownerName: lead.name,
      ownerEmail: lead.email,
      phone: lead.phone || "",
      plan: "Package 2 ($50/mo)",
      mode: "Auto",
      password: "ClientPass2026!",
    });
    setViewLeadModal(null);
    setIsAddClientOpen(true);
    setActiveSection("clients");
  };

  // CSV Export for Leads
  const exportLeadsToCsv = () => {
    const headers = ["ID", "Type", "Name", "Email", "Phone", "Business", "Service", "Budget", "Health Score", "Status", "Date"];
    const rows = leads.map((l) => [
      l.id,
      l.type,
      `"${l.name || ""}"`,
      l.email,
      `"${l.phone || ""}"`,
      `"${l.businessName || ""}"`,
      `"${l.service || ""}"`,
      `"${l.budget || ""}"`,
      l.healthScore || "",
      l.status,
      `"${l.createdAt || ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Innovative_Leads_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotice("Exported leads to CSV");
  };

  // CSV Export for Clients
  const exportClientsToCsv = () => {
    const headers = ["ID", "Business", "Domain", "Owner", "Email", "Phone", "Plan", "MRR", "Status", "Automation", "GMB Connected", "Joined"];
    const rows = clients.map((c) => [
      c.id,
      `"${c.businessName}"`,
      c.domain,
      `"${c.ownerName}"`,
      c.ownerEmail,
      `"${c.phone || ""}"`,
      `"${c.plan}"`,
      c.mrr,
      c.status,
      c.automationPaused ? "Paused" : "Running",
      c.gmbConnected ? "Connected" : "Disconnected",
      `"${c.joinedDate}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Innovative_Clients_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotice("Exported clients to CSV");
  };

  // Metrics
  const activeClientsCount = clients.filter((c) => c.status === "Active").length;
  const totalMRR = clients
    .filter((c) => c.status === "Active")
    .reduce((acc, c) => acc + (c.mrr || (c.plan.includes("50") ? 50 : 20)), 0);
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;

  // Filtered lists
  const filteredClients = clients.filter((c) => {
    const matchQuery =
      c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPlan =
      filterPlan === "all" ||
      (filterPlan === "pkg_1" && c.plan.includes("20")) ||
      (filterPlan === "pkg_2" && c.plan.includes("50"));
    return matchQuery && matchPlan;
  });

  const filteredLeads = leads.filter((l) => {
    const matchQuery =
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.name && l.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.businessName && l.businessName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.service && l.service.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.message && l.message.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStatus = filterLeadStatus === "all" || l.status === filterLeadStatus;
    const matchType = filterLeadType === "all" || l.type === filterLeadType;
    return matchQuery && matchStatus && matchType;
  });

  // Locked Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative overflow-hidden">
        {/* Soft crystal background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="w-full max-w-md p-8 rounded-3xl bg-white/95 border border-slate-200/90 shadow-2xl space-y-6 text-center crystal-card relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 mx-auto shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 font-heading">
              Innovative Master Control
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Authorized personnel only. Enter root admin passcode.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showAdminPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. admin2026)"
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowAdminPasscode(!showAdminPasscode)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                title={showAdminPasscode ? "Hide passcode" : "Show passcode"}
              >
                {showAdminPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all"
            >
              Unlock Management Panel →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Toast Notice */}
      {actionNotice && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-teal-800 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-teal-700">
          <Sparkles className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-sm shadow-teal-600/20">
              Ω
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 font-heading tracking-wide">
                Innovative Control Center
              </span>
              <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                System 4
              </span>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-200">
            <span className="text-[11px] text-slate-500 mr-1 font-medium">Role:</span>
            {(["Super Admin", "Sales", "Support"] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setAdminRole(r);
                  triggerNotice(`Switched admin perspective to ${r}`);
                }}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors ${
                  adminRole === r
                    ? "bg-teal-50 text-teal-800 border border-teal-200 font-bold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            disabled={loadingData}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            title="Refresh database records"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin text-teal-600" : ""}`} />
          </button>

          <Link href="/" target="_blank">
            <button className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors">
              <span>Open Main Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          </Link>

          <button
            onClick={handleAdminLock}
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
            title="Lock session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200/80 bg-slate-50/60 p-4 space-y-1.5 shrink-0">
          {[
            { id: "overview", label: "Overview & KPI Metrics", icon: Activity },
            { id: "clients", label: `Clients (${clients.length})`, icon: Building },
            { id: "leads", label: `Leads Funnel (${leads.length})`, icon: Users },
            { id: "packages", label: "Packages & Pricing", icon: Sliders },
            { id: "monitoring", label: "Job Queue & Health", icon: Server },
            { id: "logs", label: "Admin Action Audit", icon: FileText },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-teal-700 to-teal-800 text-white shadow-md shadow-teal-700/20"
                  : "text-slate-600 hover:bg-teal-50/60 hover:text-teal-900"
              }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${activeSection === item.id ? "text-white" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-6 mt-6 border-t border-slate-200 px-3 py-3 rounded-2xl bg-teal-50/50 border border-teal-100/70 space-y-2 text-[11px] text-slate-600">
            <div className="flex justify-between">
              <span>Active Subscriptions:</span>
              <strong className="text-slate-900 font-bold">{activeClientsCount}</strong>
            </div>
            <div className="flex justify-between">
              <span>Current MRR:</span>
              <strong className="text-emerald-700 font-bold">${totalMRR}/mo</strong>
            </div>
            <div className="flex justify-between">
              <span>Pending Leads:</span>
              <strong className="text-teal-700 font-bold">{newLeadsCount}</strong>
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
          {/* =========================================================================
              SECTION 1: OVERVIEW & KPIS
             ========================================================================= */}
          {activeSection === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Executive Business Overview
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Real-time status across clients, monthly recurring revenue, and lead pipeline.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 crystal-card">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Total Active Clients
                  </span>
                  <div className="text-3xl font-black text-slate-900 font-heading">{activeClientsCount}</div>
                  <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Retained this month
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 crystal-card">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Monthly Recurring Revenue
                  </span>
                  <div className="text-3xl font-black text-emerald-700 font-heading">${totalMRR}</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    From Package 1 ($20) & Package 2 ($50)
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 crystal-card">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Total Captured Leads
                  </span>
                  <div className="text-3xl font-black text-teal-800 font-heading">{totalLeadsCount}</div>
                  <div className="text-[11px] text-teal-700 font-semibold">
                    {newLeadsCount} awaiting sales follow-up
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 crystal-card">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Automation Worker Health
                  </span>
                  <div className="text-3xl font-black text-emerald-700 font-heading">99.8%</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    All scheduled jobs nominal
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Leads Spotlight */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 crystal-card">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-700" /> Recent Inbound Leads
                    </h3>
                    <button
                      onClick={() => setActiveSection("leads")}
                      className="text-xs text-teal-700 hover:text-teal-800 hover:underline font-bold"
                    >
                      View All Leads →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {leads.slice(0, 4).map((l) => (
                      <div key={l.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{l.name} ({l.email})</div>
                          <div className="text-slate-500 text-[11px]">
                            {l.businessName || l.websiteUrl || "Direct Lead"} • {l.service || "Free SEO Check"}
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          l.status === "New" ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}>
                          {l.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 crystal-card">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-teal-700" /> Operational Short-Cuts
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={exportLeadsToCsv}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between transition-colors shadow-2xs"
                    >
                      <span>Export All Leads to CSV</span>
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={exportClientsToCsv}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between transition-colors shadow-2xs"
                    >
                      <span>Export All Clients to CSV</span>
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => setActiveSection("packages")}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between transition-colors shadow-2xs"
                    >
                      <span>Edit Package Pricing ($20 / $50)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION 2: CLIENTS TABLE & ACCOUNT CONTROLS (SECTION 4.2)
             ========================================================================= */}
          {activeSection === "clients" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 font-heading">
                    Registered Client Accounts
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Manage client credentials, disable/enable automation, switch plans, and impersonate.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAddClientOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white text-xs font-bold shadow-sm shadow-teal-700/20 transition-all active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Client Manually</span>
                  </button>
                  <Button
                    onClick={exportClientsToCsv}
                    variant="secondary"
                    size="sm"
                    className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-2xs"
                    leftIcon={<Download className="w-3.5 h-3.5 text-slate-400" />}
                  >
                    Export CSV
                  </Button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by business name, domain, or email..."
                    className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600 shadow-2xs"
                  />
                </div>

                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none shadow-2xs font-medium"
                >
                  <option value="all">All Packages</option>
                  <option value="pkg_1">Package 1 ($20/mo)</option>
                  <option value="pkg_2">Package 2 ($50/mo)</option>
                </select>
              </div>

              {/* Clients Table */}
              <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm crystal-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-4">Business & Owner</th>
                        <th className="py-3.5 px-4">Subscription Plan</th>
                        <th className="py-3.5 px-4">Status & Automation</th>
                        <th className="py-3.5 px-4">GMB State</th>
                        <th className="py-3.5 px-4">Health Score</th>
                        <th className="py-3.5 px-4 text-right">Account Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredClients.map((client) => (
                        <tr key={client.id} className="hover:bg-teal-50/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-sm">{client.businessName}</div>
                            <div className="text-slate-500 text-[11px]">{client.ownerEmail} • {client.domain}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{client.plan}</div>
                            <div className="text-[11px] text-emerald-700 font-semibold">${client.mrr || (client.plan.includes("50") ? 50 : 20)}/mo</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  client.status === "Active"
                                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                    : "bg-rose-50 text-rose-800 border border-rose-200"
                                }`}
                              >
                                {client.status}
                              </span>
                              {client.automationPaused && (
                                <span className="text-[10px] text-amber-700 flex items-center gap-1 font-semibold">
                                  <PauseCircle className="w-3 h-3" /> Paused
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-1">Mode: {client.mode || "Auto"}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            {client.gmbConnected ? (
                              <span className="text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> OAuth2 Active
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Not Connected</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900">{client.healthScore || 75}/100</span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Disable / Enable Button */}
                              <button
                                onClick={() => handleToggleClientStatus(client)}
                                className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                                  client.status === "Active"
                                    ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                                }`}
                                title={client.status === "Active" ? "Disable client & pause all automation" : "Enable client & resume automation"}
                              >
                                {client.status === "Active" ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                              </button>

                              {/* Reset Password */}
                              <button
                                onClick={() => {
                                  setResetPassModalClient(client);
                                  setNewPasswordInput("");
                                }}
                                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 transition-colors"
                                title="Reset client password"
                              >
                                <Key className="w-4 h-4" />
                              </button>

                              {/* Switch Plan */}
                              <select
                                value={client.plan}
                                onChange={(e) => handleChangeClientPlan(client, e.target.value)}
                                className="bg-white border border-slate-200 text-slate-800 text-[10px] font-medium rounded-lg px-2 py-1 focus:outline-none shadow-2xs"
                                title="Override plan"
                              >
                                <option value="Package 1 ($20/mo)">Package 1 ($20)</option>
                                <option value="Package 2 ($50/mo)">Package 2 ($50)</option>
                              </select>

                              {/* Impersonate */}
                              <button
                                onClick={() => handleImpersonateClient(client)}
                                className="p-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-colors"
                                title="Impersonate (login as client)"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* Delete Client */}
                              <button
                                onClick={() => handleDeleteClient(client)}
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
                                title="Delete client record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredClients.length === 0 && (
                    <div className="p-12 text-center space-y-3 bg-white">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto">
                        <Building className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">No client accounts yet</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Live clients who register via the pricing page or whom you onboard manually will appear here with full account controls.
                      </p>
                      <button
                        onClick={() => setIsAddClientOpen(true)}
                        className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white text-xs font-bold transition-all shadow-md shadow-teal-700/20 active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add First Client
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION 3: LEADS FUNNEL MANAGEMENT (SECTION 4.1 SEPARATE LEADS LIST)
             ========================================================================= */}
          {activeSection === "leads" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 font-heading">
                    Sales Leads Pipeline
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Captured from Free SEO Checker funnel and Website "Get a Quote" submissions.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={exportLeadsToCsv}
                    variant="secondary"
                    size="sm"
                    className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-2xs"
                    leftIcon={<Download className="w-3.5 h-3.5 text-slate-400" />}
                  >
                    Export Leads CSV
                  </Button>
                </div>
              </div>

              {/* Filter */}
              <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search leads by name, email, or service..."
                    className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600 shadow-2xs"
                  />
                </div>

                <select
                  value={filterLeadStatus}
                  onChange={(e) => setFilterLeadStatus(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none shadow-2xs font-medium"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Converted">Converted</option>
                </select>

                <select
                  value={filterLeadType}
                  onChange={(e) => setFilterLeadType(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none shadow-2xs font-medium"
                >
                  <option value="all">All Inquiries</option>
                  <option value="service_quote">Custom Software Quotes</option>
                  <option value="free_audit">Free SEO Audits</option>
                  <option value="contact">Contact Messages</option>
                </select>
              </div>

              {/* Leads Table */}
              <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm crystal-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-4">Contact & Brand</th>
                        <th className="py-3.5 px-4">Origin / Type</th>
                        <th className="py-3.5 px-4">Service & Budget</th>
                        <th className="py-3.5 px-4">Health / Notes</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-teal-50/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                            <div className="text-slate-500 text-[11px]">
                              {lead.email} {lead.phone ? `• ${lead.phone}` : ""}
                            </div>
                            {lead.businessName && (
                              <div className="text-teal-700 text-[11px] font-semibold">{lead.businessName}</div>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              lead.type === "free_audit"
                                ? "bg-teal-50 text-teal-800 border border-teal-200"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            }`}>
                              {lead.type === "free_audit" ? "Free SEO Checker" : "Quote Inquiry"}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-1">{lead.createdAt}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{lead.service || "Local SEO Audit"}</div>
                            {lead.budget && (
                              <div className="text-[11px] text-slate-500">Budget: {lead.budget}</div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            {lead.healthScore !== undefined ? (
                              <span className="font-bold text-teal-800">
                                Starting Score: {lead.healthScore}/100
                              </span>
                            ) : (
                              <p className="text-[11px] text-slate-500 truncate">{lead.message || "Standard inquiry"}</p>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                              className={`text-[10px] font-bold rounded-lg px-2.5 py-1 border focus:outline-none ${
                                lead.status === "New"
                                  ? "bg-amber-50 text-amber-800 border-amber-200"
                                  : lead.status === "Contacted"
                                  ? "bg-sky-50 text-sky-800 border-sky-200"
                                  : lead.status === "Qualified"
                                  ? "bg-teal-50 text-teal-800 border-teal-200"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Converted">Converted</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setViewLeadModal(lead)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-[11px] font-bold transition-colors"
                                title="View full inquiry details"
                              >
                                <Eye className="w-3 h-3" /> View
                              </button>

                              <a
                                href={`mailto:${lead.email}?subject=Regarding your ${lead.service || "Local SEO"} inquiry`}
                                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 text-[11px] font-bold transition-colors"
                                title="Send email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>

                              <button
                                onClick={() => handleDeleteLead(lead)}
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
                                title="Delete lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredLeads.length === 0 && (
                    <div className="p-12 text-center space-y-3 bg-white">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">No leads in the pipeline yet</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Inquiries submitted from Contact Us, Hire Us, Service Quote requests, and Free SEO Audits will arrive here in real time.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION 4: PACKAGES & PRICING MANAGEMENT (SECTION 4.3)
             ========================================================================= */}
          {activeSection === "packages" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Database-Driven Package & Pricing Management
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Edit prices, cadences, and bulleted features stored in the database. Changes reflect immediately on public pricing and onboarding pages without code deployments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 crystal-card">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">{pkg.id}</span>
                      <button
                        onClick={() => setEditingPackage({ ...pkg })}
                        className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors border border-slate-200 shadow-2xs"
                      >
                        <Edit3 className="w-3 h-3" /> Edit Package
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-heading">{pkg.name}</h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-black text-emerald-700 font-heading">${pkg.price}</span>
                        <span className="text-xs text-slate-500 font-medium">{pkg.cadence}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{pkg.description}</p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Features ({pkg.features.length})</span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION 5: OPERATIONAL MONITORING & JOB QUEUE (SECTION 4.4)
             ========================================================================= */}
          {activeSection === "monitoring" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Job Queue & Operational Health
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Status of scheduled BullMQ / background workers, Google Business Profile token statuses, and scraper rates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 crystal-card">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pending Scheduled Jobs</span>
                  <div className="text-2xl font-black text-slate-900 font-heading">4 Jobs</div>
                  <div className="text-[11px] text-slate-500">Weekly GBP posts & review scans</div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 crystal-card">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Running Jobs</span>
                  <div className="text-2xl font-black text-teal-700 font-heading">1 Scanning</div>
                  <div className="text-[11px] text-slate-500">5x5 Geo-Grid rank extraction</div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 crystal-card">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Failed / Expired Tokens</span>
                  <div className="text-2xl font-black text-emerald-700 font-heading">0 Alerts</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">All OAuth tokens valid</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 crystal-card">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Server className="w-4 h-4 text-teal-600" /> Automation Worker Queue Architecture
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The automation scheduler runs on the SaaS VPS server. Before initiating any automated action (weekly posts, review replies, Q&A responses, or Geo-Grid tracking), the worker verifies that the client's <code className="bg-slate-100 text-teal-800 px-1 py-0.5 rounded font-mono text-[11px]">status !== "Disabled"</code> and <code className="bg-slate-100 text-teal-800 px-1 py-0.5 rounded font-mono text-[11px]">automationPaused !== true</code>.
                </p>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION 6: ADMIN ACTION AUDIT LOG (SECTION 4.5)
             ========================================================================= */}
          {activeSection === "logs" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Administrative Action Audit Trail
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Immutable log of all password resets, account disable/enable actions, and package pricing overrides.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm crystal-card">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Admin Email</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Target</th>
                      <th className="py-3 px-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {adminLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-teal-50/30 transition-colors">
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-bold text-teal-700">{log.adminEmail}</td>
                        <td className="py-3 px-4 text-slate-900 font-bold">{log.action}</td>
                        <td className="py-3 px-4 text-slate-700">{log.target}</td>
                        <td className="py-3 px-4 text-slate-500">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Password Reset Modal */}
      {resetPassModalClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4 crystal-card">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-teal-600" /> Reset Client Password
            </h3>
            <p className="text-xs text-slate-500">
              Set a temporary password for <strong className="text-slate-900">{resetPassModalClient.ownerEmail}</strong> ({resetPassModalClient.businessName}).
            </p>
            <div className="relative">
              <input
                type={showResetPassword ? "text" : "password"}
                required
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                placeholder="e.g. TempPass2026!"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowResetPassword(!showResetPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                title={showResetPassword ? "Hide password" : "Show password"}
              >
                {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResetPassModalClient(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPasswordReset}
                disabled={!newPasswordInput}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 disabled:opacity-50 transition-all"
              >
                Confirm Password Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Edit Modal */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto crystal-card">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600" /> Edit {editingPackage.name}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Package Name</label>
                <input
                  type="text"
                  value={editingPackage.name}
                  onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Price ($ USD)</label>
                  <input
                    type="number"
                    value={editingPackage.price}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Billing Cadence</label>
                  <input
                    type="text"
                    value={editingPackage.cadence}
                    onChange={(e) => setEditingPackage({ ...editingPackage, cadence: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Description</label>
                <textarea
                  rows={2}
                  value={editingPackage.description}
                  onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Bullet Features</label>
                <div className="space-y-2">
                  {editingPackage.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...editingPackage.features];
                          updated[idx] = e.target.value;
                          setEditingPackage({ ...editingPackage, features: updated });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:ring-1 focus:ring-teal-600 shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingPackage.features.filter((_, i) => i !== idx);
                          setEditingPackage({ ...editingPackage, features: updated });
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={newPackageFeature}
                      onChange={(e) => setNewPackageFeature(e.target.value)}
                      placeholder="Add new feature bullet..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:ring-1 focus:ring-teal-600 shadow-2xs placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newPackageFeature.trim()) return;
                        setEditingPackage({
                          ...editingPackage,
                          features: [...editingPackage.features, newPackageFeature.trim()],
                        });
                        setNewPackageFeature("");
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-xs font-bold text-teal-800 border border-teal-200 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePackage}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all"
              >
                Save Package to Database
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Client Creation Modal */}
      {isAddClientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Add New Client Account
                  </h3>
                  <p className="text-xs text-slate-500">
                    Onboard a new client directly into the SaaS platform
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddClientOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientForm.businessName}
                    onChange={(e) =>
                      setNewClientForm({ ...newClientForm, businessName: e.target.value })
                    }
                    placeholder="e.g. Apex Legal Services"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Website Domain
                  </label>
                  <input
                    type="text"
                    value={newClientForm.domain}
                    onChange={(e) =>
                      setNewClientForm({ ...newClientForm, domain: e.target.value })
                    }
                    placeholder="e.g. apexlegal.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Owner Full Name
                  </label>
                  <input
                    type="text"
                    value={newClientForm.ownerName}
                    onChange={(e) =>
                      setNewClientForm({ ...newClientForm, ownerName: e.target.value })
                    }
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Owner Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newClientForm.ownerEmail}
                    onChange={(e) =>
                      setNewClientForm({ ...newClientForm, ownerEmail: e.target.value })
                    }
                    placeholder="client@business.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="text"
                    value={newClientForm.phone}
                    onChange={(e) =>
                      setNewClientForm({ ...newClientForm, phone: e.target.value })
                    }
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Initial Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewClientPassword ? "text" : "password"}
                      value={newClientForm.password}
                      onChange={(e) =>
                        setNewClientForm({ ...newClientForm, password: e.target.value })
                      }
                      placeholder="Default: ClientPass2026!"
                      className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewClientPassword(!showNewClientPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                      title={showNewClientPassword ? "Hide password" : "Show password"}
                    >
                      {showNewClientPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Subscription Plan
                  </label>
                  <select
                    value={newClientForm.plan}
                    onChange={(e) =>
                      setNewClientForm({ ...newClientForm, plan: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
                  >
                    <option value="Package 1 ($20/mo)">Package 1 — GMB SEO ($20/mo)</option>
                    <option value="Package 2 ($50/mo)">Package 2 — GMB + Website SEO ($50/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Automation Mode
                  </label>
                  <select
                    value={newClientForm.mode}
                    onChange={(e) =>
                      setNewClientForm({ ...newClientForm, mode: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
                  >
                    <option value="Auto">Auto Mode (Full Automation)</option>
                    <option value="Approval">Approval Mode (Requires Confirmation)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition-all active:scale-95"
                >
                  Create Client Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Lead Details & Convert Modal */}
      {viewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {viewLeadModal.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 uppercase">
                      {viewLeadModal.type === "free_audit"
                        ? "Free SEO Audit Lead"
                        : viewLeadModal.type === "contact"
                        ? "Contact Message"
                        : "Software House Quote"}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(viewLeadModal.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewLeadModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</span>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">{viewLeadModal.email}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</span>
                  <p className="font-bold text-slate-900 mt-0.5">{viewLeadModal.phone || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company</span>
                  <p className="font-bold text-slate-900 mt-0.5">{viewLeadModal.businessName || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Website</span>
                  <p className="font-bold text-teal-700 mt-0.5 truncate">
                    {viewLeadModal.websiteUrl ? (
                      <a
                        href={viewLeadModal.websiteUrl.startsWith("http") ? viewLeadModal.websiteUrl : `https://${viewLeadModal.websiteUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-teal-900"
                      >
                        {viewLeadModal.websiteUrl}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>
              </div>

              {(viewLeadModal.service || viewLeadModal.budget) && (
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-teal-50/40 border border-teal-100">
                  <div>
                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Service Requested</span>
                    <p className="font-bold text-slate-900 mt-0.5">{viewLeadModal.service || "General Inquiry"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Budget Scope</span>
                    <p className="font-bold text-slate-900 mt-0.5">{viewLeadModal.budget || "Flexible / Not Stated"}</p>
                  </div>
                </div>
              )}

              {viewLeadModal.message && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Scope / Message</span>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{viewLeadModal.message}</p>
                </div>
              )}

              {viewLeadModal.healthScore !== undefined && (
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
                  <span className="font-bold text-teal-900">Baseline Audit Health Score:</span>
                  <span className="text-base font-black text-teal-700">{viewLeadModal.healthScore}/100</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-slate-700">Lead Status:</span>
                <select
                  value={viewLeadModal.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as any;
                    handleUpdateLeadStatus(viewLeadModal.id, newStatus);
                    setViewLeadModal({ ...viewLeadModal, status: newStatus });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 font-bold text-xs text-slate-900"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Converted">Converted</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleDeleteLead(viewLeadModal)}
                className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>

              <div className="flex items-center gap-2">
                {viewLeadModal.phone && (
                  <a
                    href={`tel:${viewLeadModal.phone}`}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> Call
                  </a>
                )}
                <a
                  href={`mailto:${viewLeadModal.email}?subject=Regarding your inquiry at Innovative`}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Email
                </a>
                <button
                  type="button"
                  onClick={() => handleConvertLeadToClient(viewLeadModal)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" /> Convert to Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
