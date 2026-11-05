import fs from "fs";
import path from "path";

export interface LeadRecord {
  id: string;
  type: "free_audit" | "service_quote" | "contact";
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  websiteUrl?: string;
  service?: string;
  budget?: string;
  message?: string;
  healthScore?: number;
  status: "New" | "Contacted" | "Qualified" | "Converted";
  createdAt: string;
}

export interface ClientRecord {
  id: string;
  businessName: string;
  domain: string;
  ownerName: string;
  ownerEmail: string;
  phone?: string;
  plan: "Package 1 ($20/mo)" | "Package 2 ($50/mo)";
  mrr: number;
  status: "Active" | "Disabled" | "Past Due";
  automationPaused: boolean;
  mode: "Auto" | "Approval";
  gmbConnected: boolean;
  joinedDate: string;
  lastLoginDate: string;
  healthScore: number;
  lastActionTaken: string;
  password?: string;
}

export interface PackageRecord {
  id: string;
  name: string;
  price: number;
  cadence: string;
  badge: string;
  description: string;
  features: string[];
  highlight: boolean;
  ctaText: string;
  ctaLink: string;
}

export interface AdminActionRecord {
  id: string;
  adminEmail: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filename: string, defaultData: T): T {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf8");
      return defaultData;
    }
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultData;
  }
}

function writeJsonFile<T>(filename: string, data: T) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

// Initial Packages as per client documentation (Package 1: $20, Package 2: $50)
const DEFAULT_PACKAGES: PackageRecord[] = [
  {
    id: "pkg_1",
    name: "Package 1 — GMB SEO",
    price: 20,
    cadence: "per month / billed monthly",
    badge: "Core Automation",
    description: "Full Google Business Profile setup, weekly AI posting, review replies, and local ranking intelligence.",
    highlight: false,
    ctaText: "Get Started ($20/mo)",
    ctaLink: "/register?plan=pkg_1",
    features: [
      "Full Google Business Profile setup & optimization",
      "Weekly AI-generated posts (services/offers/seasonal)",
      "Automatic personalized replies to every review",
      "Review growth system (automated customer requests)",
      "Q&A monitoring & automated answer drafts",
      "5x5 Local ranking map across your service area",
      "AI-powered weekly action plan",
      "Monthly performance report (calls, clicks, directions)",
      "Auto Mode or Approval Mode (switchable anytime)",
    ],
  },
  {
    id: "pkg_2",
    name: "Package 2 — GMB + Website SEO",
    price: 50,
    cadence: "per month / billed monthly",
    badge: "Most Popular",
    description: "Everything in Package 1 plus complete technical website SEO auditing, on-page optimization, and combined reporting.",
    highlight: true,
    ctaText: "Get Full Dominance ($50/mo)",
    ctaLink: "/register?plan=pkg_2",
    features: [
      "Everything included in Package 1 ($20/mo)",
      "Full website SEO audit (speed, mobile-friendliness, meta tags)",
      "On-page SEO recommendations & schema code generation",
      "Combined GMB + Website monthly performance report",
      "Local landing page optimization guidance",
      "Priority API crawling & weekly change detection",
    ],
  },
];

const DEFAULT_CLIENTS: ClientRecord[] = [];

const DEFAULT_LEADS: LeadRecord[] = [];

const DEFAULT_LOGS: AdminActionRecord[] = [
  {
    id: "log_01",
    adminEmail: "admin@itibusinesssuite.online",
    action: "System Initialized",
    target: "Innovative SaaS & Agency Hub",
    details: "Production database initialized. Ready for real clients and inquiries.",
    timestamp: new Date().toISOString(),
  },
];

// Leads API
export function getLeads(): LeadRecord[] {
  return readJsonFile<LeadRecord[]>("leads.json", DEFAULT_LEADS);
}

export function saveLead(lead: Omit<LeadRecord, "id" | "createdAt" | "status">): LeadRecord {
  const leads = getLeads();
  const newLead: LeadRecord = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  writeJsonFile("leads.json", leads);
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadRecord["status"]): boolean {
  const leads = getLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return false;
  lead.status = status;
  writeJsonFile("leads.json", leads);
  return true;
}

export function deleteLead(id: string): boolean {
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  writeJsonFile("leads.json", filtered);
  return true;
}

// Clients API
export function getClients(): ClientRecord[] {
  return readJsonFile<ClientRecord[]>("clients.json", DEFAULT_CLIENTS);
}

export function saveClient(client: Omit<ClientRecord, "id" | "joinedDate">): ClientRecord {
  const clients = getClients();
  const newClient: ClientRecord = {
    ...client,
    id: `biz_${Date.now()}`,
    joinedDate: new Date().toISOString().split("T")[0],
  };
  clients.unshift(newClient);
  writeJsonFile("clients.json", clients);
  return newClient;
}

export function updateClient(id: string, updates: Partial<ClientRecord>): ClientRecord | null {
  const clients = getClients();
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return null;
  clients[index] = { ...clients[index], ...updates };
  writeJsonFile("clients.json", clients);
  return clients[index];
}

export function deleteClient(id: string): boolean {
  const clients = getClients();
  const filtered = clients.filter((c) => c.id !== id);
  if (filtered.length === clients.length) return false;
  writeJsonFile("clients.json", filtered);
  return true;
}

// Packages API
export function getPackages(): PackageRecord[] {
  return readJsonFile<PackageRecord[]>("packages.json", DEFAULT_PACKAGES);
}

export function updatePackage(id: string, updates: Partial<PackageRecord>): PackageRecord | null {
  const packages = getPackages();
  const index = packages.findIndex((p) => p.id === id);
  if (index === -1) return null;
  packages[index] = { ...packages[index], ...updates };
  writeJsonFile("packages.json", packages);
  return packages[index];
}

// Admin Action Logs
export function getAdminLogs(): AdminActionRecord[] {
  return readJsonFile<AdminActionRecord[]>("admin_logs.json", DEFAULT_LOGS);
}

export function logAdminAction(adminEmail: string, action: string, target: string, details: string) {
  const logs = getAdminLogs();
  const newLog: AdminActionRecord = {
    id: `log_${Date.now()}`,
    adminEmail,
    action,
    target,
    details,
    timestamp: new Date().toISOString(),
  };
  logs.unshift(newLog);
  writeJsonFile("admin_logs.json", logs);
  return newLog;
}
