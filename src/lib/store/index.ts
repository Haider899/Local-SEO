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

// Realistic Demo Dataset
export const DEMO_PROJECT = {
  id: "demo-project-apex",
  name: "Apex Dental & Orthodontics",
  domain: "apexdentalcare.com",
  location: "Austin, TX",
  primaryCategory: "Dentist & Orthodontics",
  overallVisibilityScore: 78,
  aiVisibilityScore: 72,
  localVisibilityScore: 84,
  seoHealthScore: 81,
  technicalScore: 76,
  grade: "B" as const,
  categoryScores: {
    seo: 81,
    technical: 76,
    local: 84,
    ai: 72,
    authority: 68,
  },
};

export const DEMO_AI_QUERIES: AIQueryCheck[] = [
  {
    id: "ai-1",
    query: "Best cosmetic dentist for porcelain veneers in Austin, TX",
    engine: "ChatGPT (GPT-4o)",
    category: "Service Comparison",
    mentioned: true,
    recommended: true,
    positionRank: 2,
    contextSnippet:
      "Apex Dental & Orthodontics is highly rated in downtown Austin, notable for digital smile design and clear pricing.",
    competitorsMentioned: ["Austin Dental Spa", "Enamel Dentistry"],
    citations: ["https://apexdentalcare.com/services/veneers", "https://yelp.com/biz/apex-dental"],
    lastChecked: "2 hours ago",
  },
  {
    id: "ai-2",
    query: "Emergency dentist near downtown Austin open weekends",
    engine: "Perplexity",
    category: "Local Intent",
    mentioned: true,
    recommended: true,
    positionRank: 1,
    contextSnippet:
      "For urgent dental care, Apex Dental provides same-day appointments on Saturdays with an on-call oral surgeon.",
    competitorsMentioned: ["Austin Urgent Dental", "South Congress Dental"],
    citations: ["https://apexdentalcare.com/emergency-care"],
    lastChecked: "4 hours ago",
  },
  {
    id: "ai-3",
    query: "Top Invisalign providers in Central Texas with best reviews",
    engine: "Google Gemini",
    category: "Brand Recommendation",
    mentioned: true,
    recommended: false,
    positionRank: 4,
    contextSnippet:
      "Other prominent Invisalign Diamond Plus providers include Apex Dental (Austin) and SmileDoctors.",
    competitorsMentioned: ["SmileDoctors Austin", "Rise Orthodontics"],
    citations: ["https://invisalign.com/doctor-locator"],
    lastChecked: "Yesterday",
  },
  {
    id: "ai-4",
    query: "Affordable teeth whitening treatments Austin prices",
    engine: "Claude 3.5 Sonnet",
    category: "Industry Best",
    mentioned: false,
    recommended: false,
    positionRank: null,
    contextSnippet:
      "Recommended clinics include Swish Dental and Austin City Dental offering in-office Zoom whitening packages.",
    competitorsMentioned: ["Swish Dental", "Austin City Dental"],
    citations: ["https://swishdental.com"],
    lastChecked: "2 days ago",
  },
];

export const DEMO_KEYWORDS: KeywordRanking[] = [
  {
    id: "kw-1",
    keyword: "cosmetic dentist austin",
    location: "Austin, TX",
    searchVolume: 2400,
    currentPosition: 3,
    previousPosition: 5,
    change: 2,
    serpFeatures: ["Local Pack", "AI Overview", "Reviews"],
    updatedAt: "Today",
  },
  {
    id: "kw-2",
    keyword: "emergency dentist downtown austin",
    location: "Austin, TX",
    searchVolume: 1600,
    currentPosition: 1,
    previousPosition: 1,
    change: 0,
    serpFeatures: ["Local Pack", "Call Extension"],
    updatedAt: "Today",
  },
  {
    id: "kw-3",
    keyword: "invisalign provider austin tx",
    location: "Austin, TX",
    searchVolume: 1900,
    currentPosition: 4,
    previousPosition: 7,
    change: 3,
    serpFeatures: ["AI Overview", "Local Pack"],
    updatedAt: "Yesterday",
  },
  {
    id: "kw-4",
    keyword: "teeth cleaning near me",
    location: "Austin, TX",
    searchVolume: 4200,
    currentPosition: 6,
    previousPosition: 4,
    change: -2,
    serpFeatures: ["Local Pack"],
    updatedAt: "2 days ago",
  },
  {
    id: "kw-5",
    keyword: "family orthodontics central austin",
    location: "Austin, TX",
    searchVolume: 880,
    currentPosition: 2,
    previousPosition: 3,
    change: 1,
    serpFeatures: ["Local Pack", "Reviews"],
    updatedAt: "3 days ago",
  },
];

export const DEMO_COMPETITORS: CompetitorComparison[] = [
  {
    id: "comp-1",
    name: "Swish Dental",
    domain: "swishdental.com",
    overallScore: 84,
    aiScore: 88,
    localScore: 86,
    seoScore: 82,
    sharedKeywords: 24,
    rankingOverlap: 78,
    strengths: ["Strong AI recommendation rate in ChatGPT", "250+ 5-star Google Reviews", "High domain rating (DR 46)"],
    weaknesses: ["Missing FAQ schema on localized pages", "Slower mobile page speed (1.4s TTFB)"],
  },
  {
    id: "comp-2",
    name: "Enamel Dentistry",
    domain: "enameldentistry.com",
    overallScore: 75,
    aiScore: 68,
    localScore: 82,
    seoScore: 79,
    sharedKeywords: 19,
    rankingOverlap: 64,
    strengths: ["Multi-location Google Maps presence", "Active social signals"],
    weaknesses: ["AI bots blocked from crawling service pages", "No MedicalBusiness JSON-LD markup"],
  },
  {
    id: "comp-3",
    name: "Austin Dental Spa",
    domain: "austindentalspa.com",
    overallScore: 72,
    aiScore: 62,
    localScore: 80,
    seoScore: 74,
    sharedKeywords: 16,
    rankingOverlap: 55,
    strengths: ["Strong organic backlinks from local Austin press"],
    weaknesses: ["Missing modern meta tags and mobile responsiveness issues"],
  },
];

export const DEMO_TASKS: SmartTask[] = [
  {
    id: "task-1",
    title: "Implement FAQPage Schema on Veneers & Invisalign pages",
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
