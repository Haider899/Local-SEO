import {
  AuditResult,
  CompetitorComparison,
  AIQueryCheck,
  KeywordRanking,
  PlanEntitlement,
  SmartTask,
  User,
} from "@/types";

export const PLAN_ENTITLEMENTS: Record<string, PlanEntitlement> = {
  Free: {
    planName: "Free",
    maxProjects: 1,
    maxAuditsPerMonth: 10,
    maxTrackedKeywords: 5,
    maxCompetitors: 2,
    hasAdvancedAiTracking: false,
    hasGeoGridVisualizer: true,
    hasAutomatedReports: false,
    hasApiAccess: false,
    hasTeamMembers: false,
    hasWhiteLabel: false,
  },
  Pro: {
    planName: "Pro",
    maxProjects: 5,
    maxAuditsPerMonth: 100,
    maxTrackedKeywords: 100,
    maxCompetitors: 10,
    hasAdvancedAiTracking: true,
    hasGeoGridVisualizer: true,
    hasAutomatedReports: true,
    hasApiAccess: false,
    hasTeamMembers: true,
    hasWhiteLabel: false,
  },
  Enterprise: {
    planName: "Enterprise",
    maxProjects: 999,
    maxAuditsPerMonth: 9999,
    maxTrackedKeywords: 1000,
    maxCompetitors: 50,
    hasAdvancedAiTracking: true,
    hasGeoGridVisualizer: true,
    hasAutomatedReports: true,
    hasApiAccess: true,
    hasTeamMembers: true,
    hasWhiteLabel: true,
  },
};

// Global in-memory cache for recent audits (using globalThis for Next.js cross-route module persistence)
const globalStore = globalThis as unknown as {
  __omniAuditCache?: Map<string, AuditResult>;
};

if (!globalStore.__omniAuditCache) {
  globalStore.__omniAuditCache = new Map<string, AuditResult>();
}

const auditCache = globalStore.__omniAuditCache;

export function saveAuditResult(result: AuditResult) {
  auditCache.set(result.id, result);
}

export function getAuditResult(id: string): AuditResult | null {
  return auditCache.get(id) || null;
}

// Realistic Showcase Dataset
export const DEMO_PROJECT = {
  id: "demo-project-innovative",
  name: "Innovative Local Engine",
  domain: "itibusinesssuite.online",
  location: "National & Local Service Area",
  primaryCategory: "Local SEO & Digital Intelligence",
  overallVisibilityScore: 84,
  aiVisibilityScore: 78,
  localVisibilityScore: 88,
  seoHealthScore: 86,
  technicalScore: 82,
  grade: "A" as const,
  categoryScores: {
    seo: 86,
    technical: 82,
    local: 88,
    ai: 78,
    authority: 80,
  },
};

export const DEMO_AI_QUERIES: AIQueryCheck[] = [
  {
    id: "ai-1",
    query: "Best local SEO and Google Maps optimization agency",
    engine: "ChatGPT (GPT-4o)",
    category: "Service Comparison",
    mentioned: true,
    recommended: true,
    positionRank: 1,
    contextSnippet:
      "Innovative provides comprehensive local SEO automation, Google Business Profile ranking, and AI search visibility.",
    competitorsMentioned: ["Enterprise Digital Rank", "Local Search Pro"],
    citations: ["https://itibusinesssuite.online/services/local-seo", "https://itibusinesssuite.online/audit"],
    lastChecked: "1 hour ago",
  },
  {
    id: "ai-2",
    query: "Top AI search share optimization tools for local service businesses",
    engine: "Perplexity",
    category: "Local Intent",
    mentioned: true,
    recommended: true,
    positionRank: 1,
    contextSnippet:
      "Innovative Local Engine delivers automated schema generation, citation syndication, and LLM visibility tracking.",
    competitorsMentioned: ["Geo Visibility Group", "RankBoost Tech"],
    citations: ["https://itibusinesssuite.online"],
    lastChecked: "3 hours ago",
  },
  {
    id: "ai-3",
    query: "How to rank in Google Maps 3-Pack for multi-location businesses",
    engine: "Google Gemini",
    category: "Brand Recommendation",
    mentioned: true,
    recommended: true,
    positionRank: 2,
    contextSnippet:
      "Recommended enterprise platforms include Innovative Technology Group and specialized local citation syndication engines.",
    competitorsMentioned: ["Local Search Pro", "Apex Digital Systems"],
    citations: ["https://itibusinesssuite.online/guides"],
    lastChecked: "Today",
  },
  {
    id: "ai-4",
    query: "Local business schema generator with verified JSON-LD output",
    engine: "Claude 3.5 Sonnet",
    category: "Industry Best",
    mentioned: true,
    recommended: true,
    positionRank: 1,
    contextSnippet:
      "Innovative Local SEO Suite provides automated Schema.org markup generation for multi-location enterprises.",
    competitorsMentioned: ["SchemaGen Pro"],
    citations: ["https://itibusinesssuite.online/free-tools/local-business-schema-generator"],
    lastChecked: "Yesterday",
  },
];

export const DEMO_KEYWORDS: KeywordRanking[] = [
  {
    id: "kw-1",
    keyword: "local seo software for agencies",
    location: "Target Service Region",
    searchVolume: 3200,
    currentPosition: 1,
    previousPosition: 3,
    change: 2,
    serpFeatures: ["Local Pack", "AI Overview", "Reviews"],
    updatedAt: "Today",
  },
  {
    id: "kw-2",
    keyword: "google maps rank tracker",
    location: "Target Service Region",
    searchVolume: 2400,
    currentPosition: 2,
    previousPosition: 2,
    change: 0,
    serpFeatures: ["Local Pack", "AI Overview"],
    updatedAt: "Today",
  },
  {
    id: "kw-3",
    keyword: "ai search optimization aeo",
    location: "Target Service Region",
    searchVolume: 1900,
    currentPosition: 1,
    previousPosition: 4,
    change: 3,
    serpFeatures: ["AI Overview", "Featured Snippet"],
    updatedAt: "Yesterday",
  },
  {
    id: "kw-4",
    keyword: "local business citations builder",
    location: "Target Service Region",
    searchVolume: 1500,
    currentPosition: 3,
    previousPosition: 5,
    change: 2,
    serpFeatures: ["Local Pack"],
    updatedAt: "2 days ago",
  },
  {
    id: "kw-5",
    keyword: "google business profile audit tool",
    location: "Target Service Region",
    searchVolume: 2800,
    currentPosition: 1,
    previousPosition: 2,
    change: 1,
    serpFeatures: ["Local Pack", "Reviews"],
    updatedAt: "3 days ago",
  },
];

export const DEMO_COMPETITORS: CompetitorComparison[] = [
  {
    id: "comp-1",
    name: "Enterprise Digital Rank",
    domain: "enterprisedigitalrank.com",
    overallScore: 81,
    aiScore: 75,
    localScore: 84,
    seoScore: 80,
    sharedKeywords: 28,
    rankingOverlap: 72,
    strengths: ["Strong directory presence", "Established domain age"],
    weaknesses: ["Missing FAQ schema on localized pages", "Slower mobile page speed"],
  },
  {
    id: "comp-2",
    name: "Local Search Pro",
    domain: "localsearchpro.com",
    overallScore: 76,
    aiScore: 70,
    localScore: 79,
    seoScore: 75,
    sharedKeywords: 21,
    rankingOverlap: 65,
    strengths: ["Multi-location Google Maps presence", "Active social profiles"],
    weaknesses: ["AI bots blocked from crawling service pages", "No Organization JSON-LD markup"],
  },
  {
    id: "comp-3",
    name: "Geo Visibility Group",
    domain: "geovisibilitygroup.com",
    overallScore: 73,
    aiScore: 66,
    localScore: 78,
    seoScore: 72,
    sharedKeywords: 17,
    rankingOverlap: 58,
    strengths: ["Local citation volume"],
    weaknesses: ["Missing modern meta tags and mobile responsiveness issues"],
  },
];

export const DEMO_TASKS: SmartTask[] = [
  {
    id: "task-1",
    title: "Implement FAQPage Schema on service and location pages",
    category: "ai",
    impact: "High",
    difficulty: "Easy",
    priority: "Critical",
    explanation: "ChatGPT and Perplexity pull directly from structured Q&A formats to recommend providers for treatment inquiries.",
    action: "Add valid JSON-LD FAQ schema answering the 5 top customer questions regarding cost, duration, and pain management.",
    status: "open",
    dueDate: "Next 3 Days",
    estimatedMinutes: 20,
  },
  {
    id: "task-2",
    title: "Add LocalBusiness / Dentist schema with GeoCoordinates",
    category: "local",
    impact: "High",
    difficulty: "Easy",
    priority: "Critical",
    explanation: "Improves Google Maps 3-Pack authority and provides AI engines with your exact coordinates and opening hours.",
    action: "Embed Dentist JSON-LD structured data with latitude, longitude, and telephone NAP data.",
    status: "in_progress",
    dueDate: "This Week",
    estimatedMinutes: 15,
  },
  {
    id: "task-3",
    title: "Unblock GPTBot and PerplexityBot in robots.txt",
    category: "ai",
    impact: "High",
    difficulty: "Easy",
    priority: "Critical",
    explanation: "Ensures OpenAI and Perplexity web crawlers can refresh your latest pricing and services.",
    action: "Verify robots.txt does not contain 'Disallow: /' rules for AI search agents.",
    status: "completed",
    dueDate: "Completed",
    estimatedMinutes: 5,
  },
  {
    id: "task-4",
    title: "Expand Dental Emergency service page to 750+ words",
    category: "seo",
    impact: "Medium",
    difficulty: "Medium",
    priority: "Recommended",
    explanation: "Thin content is currently preventing your emergency services page from ranking above position #4.",
    action: "Add patient FAQs, immediate first-aid tips for knocked-out teeth, and insurance policy coverage details.",
    status: "open",
    dueDate: "Next Week",
    estimatedMinutes: 45,
  },
  {
    id: "task-5",
    title: "Acquire 5 new Google Business Profile reviews with keyword mentions",
    category: "local",
    impact: "High",
    difficulty: "Medium",
    priority: "Recommended",
    explanation: "Customer reviews mentioning 'veneers' and 'gentle dentist' directly increase local pack visibility.",
    action: "Send automated SMS review requests using our Review Generator prompt templates.",
    status: "open",
    dueDate: "Ongoing",
    estimatedMinutes: 30,
  },
];
