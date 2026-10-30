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

const DEFAULT_CLIENTS: ClientRecord[] = [
  {
    id: "biz_101",
    businessName: "Apex Dynamics",
    domain: "apexdynamics.com",
    ownerName: "Sarah Jenkins",
    ownerEmail: "client@apexdynamics.com",
    phone: "+1 (512) 555-0192",
    plan: "Package 2 ($50/mo)",
    mrr: 50,
    status: "Active",
    automationPaused: false,
    mode: "Auto",
    gmbConnected: true,
    joinedDate: "Live Client",
    lastLoginDate: "Just now",
    healthScore: 78,
    lastActionTaken: "Published weekly service update & responded to 5-star review",
  },
  {
    id: "biz_102",
    businessName: "Apex Dental & Orthodontics",
    domain: "apexdentalcare.com",
    ownerName: "Dr. Marcus Vance",
    ownerEmail: "dr.vance@apexdentalcare.com",
    phone: "+1 (415) 555-8391",
    plan: "Package 1 ($20/mo)",
    mrr: 20,
    status: "Active",
    automationPaused: false,
    mode: "Approval",
    gmbConnected: true,
    joinedDate: "Aug 12, 2026",
    lastLoginDate: "Yesterday",
    healthScore: 84,
    lastActionTaken: "Proposed holiday promotion post for doctor review",
  },
  {
    id: "biz_103",
    businessName: "Modern Home Plumbing",
    domain: "modernhomeplumbing.com",
    ownerName: "David Miller",
    ownerEmail: "service@modernhomeplumbing.com",
    phone: "+1 (312) 555-4920",
    plan: "Package 2 ($50/mo)",
    mrr: 50,
    status: "Active",
    automationPaused: false,
    mode: "Auto",
    gmbConnected: true,
    joinedDate: "Aug 22, 2026",
    lastLoginDate: "3 days ago",
    healthScore: 82,
    lastActionTaken: "Weekly 5x5 Geo-Grid scan refreshed across 5 mi radius",
  },
];

const DEFAULT_LEADS: LeadRecord[] = [
  {
    id: "lead_01",
    type: "free_audit",
    name: "Austin Solar Team",
    email: "contact@austinsolar.io",
    businessName: "Austin Solar Dynamics",
    websiteUrl: "https://austinsolar.io",
    healthScore: 61,
    status: "New",
    createdAt: "Today (Free SEO Checker)",
  },
  {
    id: "lead_02",
    type: "service_quote",
    name: "Sarah Jenkins",
    email: "sarah@apexrealty.com",
    phone: "+1 (512) 555-3920",
    businessName: "Apex Realty Group",
    service: "Local SEO (GMB + Website)",
    budget: "$1k - $5k / mo",
    message: "Interested in ranking 3 local office locations in the Google 3-pack.",
    status: "Qualified",
    createdAt: "Yesterday (Quote Form)",
  },
  {
    id: "lead_03",
    type: "service_quote",
    name: "Tariq Malik",
    email: "tariq@fastech.io",
    phone: "+971 50 123 4567",
    businessName: "FasTech Logistics",
    service: "CRM & ERP Systems Development",
    budget: "$25k - $50k",
    message: "Need custom dispatch and driver assignment ERP web portal.",
    status: "Contacted",
    createdAt: "2 days ago (Quote Form)",
  },
];

const DEFAULT_LOGS: AdminActionRecord[] = [
  {
    id: "log_01",
    adminEmail: "admin@omnirank.ai",
    action: "System Initialized",
    target: "System Core",
    details: "Initialized packages according to documentation ($20 & $50)",
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
