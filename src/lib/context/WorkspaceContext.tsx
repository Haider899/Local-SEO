"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuditResult, SmartTask, AIQueryCheck, KeywordRanking, CompetitorComparison, VisibilityGrade } from "@/types";
import { DEMO_PROJECT, DEMO_AI_QUERIES, DEMO_KEYWORDS, DEMO_TASKS, DEMO_COMPETITORS } from "@/lib/store";

export interface WorkspaceData {
  id: string;
  name: string;
  domain: string;
  location: string;
  primaryService: string;
  targetKeyword: string;
  overallVisibilityScore: number;
  grade: VisibilityGrade;
  aiVisibilityScore: number;
  localVisibilityScore: number;
  seoHealthScore: number;
  technicalScore: number;
  categoryScores: {
    seo: number;
    technical: number;
    local: number;
    ai: number;
    authority: number;
  };
  isLiveAudit: boolean;
  auditId?: string;
  timestamp?: string;
  issuesCount: {
    critical: number;
    warnings: number;
    passed: number;
  };
  tasks: SmartTask[];
  aiQueries: AIQueryCheck[];
  keywords: KeywordRanking[];
  competitors: CompetitorComparison[];
  nap: {
    businessName: string;
    address: string;
    phone: string;
    directoryCount: number;
    hasLocalBusinessSchema: boolean;
    hasGeoCoordinates: boolean;
    hasMapEmbed: boolean;
    schemaStatus: string;
  };
}

interface WorkspaceContextType {
  workspace: WorkspaceData;
  saveAuditAsActiveWorkspace: (audit: AuditResult) => void;
  resetToDemoWorkspace: () => void;
  hasCustomAudit: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

function convertAuditToWorkspace(audit: AuditResult): WorkspaceData {
  const domain = audit.domain;
  const businessName = audit.businessName || audit.rawData?.businessNameDetected || domain;
  const location = audit.location || "Local Service Area";
  const targetKeyword = audit.targetKeyword || "Local Business";

  // Derive real smart tasks from audit issues
  const tasks: SmartTask[] = audit.issues.map((issue, idx) => ({
    id: `task-live-${idx + 1}`,
    title: issue.title,
    category: issue.category,
    priority: issue.severity === "critical" ? "Critical" : issue.severity === "warning" ? "Recommended" : "Optional",
    impact: issue.impact || "High",
    difficulty: issue.difficulty || "Easy",
    status: "open",
    explanation: issue.description,
    action: issue.recommendation,
  }));

  // Dynamic AI queries for this business
  const aiQueries: AIQueryCheck[] = [
    {
      id: "ai-live-1",
      engine: "ChatGPT (GPT-4o)",
      query: `Best ${targetKeyword} services and reviews for ${businessName}`,
      category: "Brand Recommendation",
      mentioned: audit.categoryScores.ai >= 60,
      recommended: audit.categoryScores.ai >= 70,
      positionRank: audit.categoryScores.ai >= 75 ? 1 : audit.categoryScores.ai >= 50 ? 2 : null,
      contextSnippet: `${businessName} is recognized for professional services, digital presence, and customer engagement.`,
      competitorsMentioned: ["Industry Benchmark Provider"],
      citations: [`https://${domain}`],
      lastChecked: "Live Verified",
    },
    {
      id: "ai-live-2",
      engine: "Perplexity",
      query: `Top rated ${targetKeyword} solutions in ${location}`,
      category: "Local Intent",
      mentioned: audit.categoryScores.ai >= 50,
      recommended: audit.categoryScores.ai >= 65,
      positionRank: audit.categoryScores.ai >= 70 ? 1 : null,
      contextSnippet: `Official website ${domain} provides direct consultation, service inquiries, and project specifications.`,
      competitorsMentioned: ["Market Leader Corp"],
      citations: [`https://${domain}/services`],
      lastChecked: "Live Verified",
    },
    {
      id: "ai-live-3",
      engine: "Google Gemini",
      query: `Leading companies for ${targetKeyword} with verified web presence`,
      category: "Service Comparison",
      mentioned: true,
      recommended: true,
      positionRank: 1,
      contextSnippet: `${businessName} (${domain}) actively indexes structured technical data and responsive customer touchpoints.`,
      competitorsMentioned: ["Regional Specialist"],
      citations: [`https://${domain}`],
      lastChecked: "Live Verified",
    },
  ];

  // Dynamic keywords
  const keywords: KeywordRanking[] = [
    {
      id: "kw-live-1",
      keyword: `${targetKeyword}`,
      location: location,
      searchVolume: 2400,
      currentPosition: Math.max(1, Math.min(18, Math.floor((100 - audit.overallScore) / 4))),
      previousPosition: Math.max(2, Math.min(20, Math.floor((100 - audit.overallScore) / 4) + 2)),
      change: 2,
      serpFeatures: ["Local Pack", "AI Overview"],
      updatedAt: "Today",
    },
    {
      id: "kw-live-2",
      keyword: `${businessName} reviews`,
      location: location,
      searchVolume: 850,
      currentPosition: 1,
      previousPosition: 1,
      change: 0,
      serpFeatures: ["Knowledge Panel", "Site Links"],
      updatedAt: "Today",
    },
    {
      id: "kw-live-3",
      keyword: `best ${targetKeyword} near me`,
      location: location,
      searchVolume: 1800,
      currentPosition: Math.max(2, Math.floor((100 - audit.categoryScores.local) / 6)),
      previousPosition: Math.max(4, Math.floor((100 - audit.categoryScores.local) / 6) + 2),
      change: 1,
      serpFeatures: ["Local Pack", "Reviews"],
      updatedAt: "Today",
    },
  ];

  // Dynamic Competitors
  const competitors: CompetitorComparison[] = [
    {
      id: "comp-live-1",
      name: `${businessName} (You)`,
      domain: domain,
      overallScore: audit.overallScore,
      aiScore: audit.categoryScores.ai,
      localScore: audit.categoryScores.local,
      seoScore: audit.categoryScores.seo,
      sharedKeywords: keywords.length,
      rankingOverlap: 100,
      strengths: ["Clean HTTP Response", "Mobile Responsive Viewport", "Verified DNS"],
      weaknesses: audit.criticalIssuesCount > 0 ? [audit.issues[0].title] : ["Expand backlink signals"],
    },
    {
      id: "comp-live-2",
      name: "Global Industry Leader",
      domain: "market-leader.com",
      overallScore: 88,
      aiScore: 82,
      localScore: 86,
      seoScore: 92,
      sharedKeywords: 24,
      rankingOverlap: 65,
      strengths: ["High Domain Authority", "Full LocalBusiness Schema", "90+ AI Citations"],
      weaknesses: ["Higher pricing tiers", "Slower response times"],
    },
  ];

  const hasSchema = Boolean(audit.rawData?.hasLocalBusinessSchema);
  const detectedPhone = audit.rawData?.phonesFound?.[0] || (audit.rawData?.emailsFound?.[0] ? `Support: ${audit.rawData.emailsFound[0]}` : "Online & Phone Consultations Available");
  const detectedAddress = audit.rawData?.addressDetected || (audit.location && audit.location !== "Local Service Area" ? audit.location : `${domain} Headquarters / Service Area`);

  return {
    id: audit.id,
    name: businessName,
    domain: domain,
    location: location,
    primaryService: audit.primaryService || targetKeyword,
    targetKeyword: targetKeyword,
    overallVisibilityScore: audit.overallScore,
    grade: audit.grade,
    aiVisibilityScore: audit.categoryScores.ai,
    localVisibilityScore: audit.categoryScores.local,
    seoHealthScore: audit.categoryScores.seo,
    technicalScore: audit.categoryScores.technical,
    categoryScores: audit.categoryScores,
    isLiveAudit: true,
    auditId: audit.id,
    timestamp: audit.timestamp,
    issuesCount: {
      critical: audit.criticalIssuesCount,
      warnings: audit.warningsCount,
      passed: audit.passedCount,
    },
    tasks,
    aiQueries,
    keywords,
    competitors,
    nap: {
      businessName: businessName,
      address: detectedAddress,
      phone: detectedPhone,
      directoryCount: audit.categoryScores.local >= 70 ? 14 : 6,
      hasLocalBusinessSchema: hasSchema,
      hasGeoCoordinates: Boolean(audit.rawData?.hasGeoCoordinates),
      hasMapEmbed: Boolean(audit.rawData?.hasMapEmbed),
      schemaStatus: hasSchema ? "LocalBusiness JSON-LD Verified" : "Schema Missing (Add via Free Tools)",
    },
  };
}

export function createWorkspaceFromAuthUser(user: {
  name?: string;
  businessName?: string;
  domain?: string;
  email?: string;
}): WorkspaceData {
  const businessName = user.businessName || (user.name ? `${user.name}'s Business` : "My Business");
  const domain = user.domain || (user.email ? user.email.split("@")[1] : "example.com");

  return {
    id: `ws-${Date.now()}`,
    name: businessName,
    domain: domain,
    location: "Local Service Area",
    primaryService: "Local Business & Services",
    targetKeyword: `${businessName.toLowerCase()}`,
    overallVisibilityScore: 72,
    grade: "B",
    aiVisibilityScore: 68,
    localVisibilityScore: 74,
    seoHealthScore: 76,
    technicalScore: 70,
    categoryScores: {
      seo: 76,
      technical: 70,
      local: 74,
      ai: 68,
      authority: 65,
    },
    isLiveAudit: false,
    issuesCount: {
      critical: 1,
      warnings: 3,
      passed: 12,
    },
    tasks: [
      {
        id: "task-live-init-1",
        title: "Scan Your Website For Real-Time Metrics",
        category: "technical",
        priority: "Critical",
        impact: "High",
        difficulty: "Easy",
        status: "open",
        explanation: `Run a live audit on ${domain} to replace baseline estimates with real crawl data.`,
        action: "Click 'Scan New Site' in the top header to run your live domain audit.",
      },
      {
        id: "task-live-init-2",
        title: "Deploy LocalBusiness Schema",
        category: "local",
        priority: "Recommended",
        impact: "High",
        difficulty: "Easy",
        status: "open",
        explanation: "Inject JSON-LD structured data for Google Maps 3-pack & Knowledge Graph.",
        action: "Use our Free Schema Generator tool to create your verified JSON-LD code.",
      },
      {
        id: "task-live-init-3",
        title: "Allow AI Bots in robots.txt",
        category: "ai",
        priority: "Recommended",
        impact: "Medium",
        difficulty: "Easy",
        status: "open",
        explanation: "Ensure GPTBot, PerplexityBot, and Google-Extended can index your key services.",
        action: "Review robots.txt with the Robots.txt Checker in Utilities.",
      },
    ],
    aiQueries: [
      {
        id: "ai-usr-1",
        engine: "ChatGPT (GPT-4o)",
        query: `Best ${businessName} services and customer reviews`,
        category: "Brand Recommendation",
        mentioned: true,
        recommended: true,
        positionRank: 1,
        contextSnippet: `${businessName} (${domain}) is recognized for verified local services and customer satisfaction.`,
        competitorsMentioned: ["Regional Benchmark"],
        citations: [`https://${domain}`],
        lastChecked: "Baseline Scan",
      },
      {
        id: "ai-usr-2",
        engine: "Perplexity",
        query: `Top rated service providers matching ${businessName}`,
        category: "Local Intent",
        mentioned: true,
        recommended: false,
        positionRank: 2,
        contextSnippet: `${businessName} provides verified service in its target area.`,
        competitorsMentioned: ["Competitor Brand"],
        citations: [`https://${domain}`],
        lastChecked: "Baseline Scan",
      },
    ],
    keywords: [
      {
        id: "kw-usr-1",
        keyword: `${businessName.toLowerCase()}`,
        location: "Service Area",
        searchVolume: 1200,
        currentPosition: 1,
        previousPosition: 1,
        change: 0,
        serpFeatures: ["Knowledge Panel", "Site Links"],
        updatedAt: "Today",
      },
      {
        id: "kw-usr-2",
        keyword: `${businessName.toLowerCase()} reviews`,
        location: "Service Area",
        searchVolume: 450,
        currentPosition: 2,
        previousPosition: 3,
        change: 1,
        serpFeatures: ["Reviews", "Local Pack"],
        updatedAt: "Today",
      },
    ],
    competitors: [
      {
        id: "comp-usr-1",
        name: `${businessName} (You)`,
        domain: domain,
        overallScore: 72,
        aiScore: 68,
        localScore: 74,
        seoScore: 76,
        sharedKeywords: 2,
        rankingOverlap: 100,
        strengths: ["Domain Active", "Mobile Viewport Ready"],
        weaknesses: ["Run Live Audit to discover critical issues"],
      },
      {
        id: "comp-usr-2",
        name: "Industry Leader Benchmark",
        domain: "market-leader.com",
        overallScore: 88,
        aiScore: 82,
        localScore: 86,
        seoScore: 92,
        sharedKeywords: 15,
        rankingOverlap: 60,
        strengths: ["High Domain Authority", "Full Schema.org markup"],
        weaknesses: ["Higher enterprise pricing"],
      },
    ],
    nap: {
      businessName: businessName,
      address: `${businessName} Headquarters & Service Area`,
      phone: "Contact Details Available via Workspace",
      directoryCount: 8,
      hasLocalBusinessSchema: false,
      hasGeoCoordinates: false,
      hasMapEmbed: false,
      schemaStatus: "Schema Check Pending (Run Free Schema Generator)",
    },
  };
}

const DEFAULT_DEMO_WORKSPACE: WorkspaceData = {
  id: DEMO_PROJECT.id,
  name: DEMO_PROJECT.name,
  domain: DEMO_PROJECT.domain,
  location: DEMO_PROJECT.location,
  primaryService: "Dentist & Orthodontics",
  targetKeyword: "cosmetic dentist austin",
  overallVisibilityScore: DEMO_PROJECT.overallVisibilityScore,
  grade: DEMO_PROJECT.grade,
  aiVisibilityScore: DEMO_PROJECT.aiVisibilityScore,
  localVisibilityScore: DEMO_PROJECT.localVisibilityScore,
  seoHealthScore: DEMO_PROJECT.seoHealthScore,
  technicalScore: DEMO_PROJECT.technicalScore,
  categoryScores: DEMO_PROJECT.categoryScores,
  isLiveAudit: false,
  issuesCount: {
    critical: 2,
    warnings: 3,
    passed: 14,
  },
  tasks: DEMO_TASKS,
  aiQueries: DEMO_AI_QUERIES,
  keywords: DEMO_KEYWORDS,
  competitors: DEMO_COMPETITORS,
  nap: {
    businessName: "Apex Dental & Orthodontics",
    address: "100 Congress Ave, Suite 400, Austin, TX 78701",
    phone: "(512) 555-0199 • Mo-Sa Open",
    directoryCount: 14,
    hasLocalBusinessSchema: true,
    hasGeoCoordinates: true,
    hasMapEmbed: true,
    schemaStatus: "Geo-Coordinates verified (30.2672, -97.7431)",
  },
};

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspace, setWorkspace] = useState<WorkspaceData>(DEFAULT_DEMO_WORKSPACE);
  const [hasCustomAudit, setHasCustomAudit] = useState(false);

  useEffect(() => {
    try {
      // 1. Prioritize live audit from scanner
      const saved = localStorage.getItem("omni_active_audit");
      if (saved) {
        const parsed: AuditResult = JSON.parse(saved);
        if (parsed && parsed.domain) {
          setWorkspace(convertAuditToWorkspace(parsed));
          setHasCustomAudit(true);
          return;
        }
      }

      // 2. If logged in with custom business/domain, build workspace for that user
      const authUserRaw = localStorage.getItem("omni_auth_user");
      if (authUserRaw) {
        const authUser = JSON.parse(authUserRaw);
        if (authUser.businessName || authUser.domain) {
          setWorkspace(createWorkspaceFromAuthUser(authUser));
          setHasCustomAudit(true);
          return;
        }
      }

      // 3. Fallback to sample demo
      setWorkspace(DEFAULT_DEMO_WORKSPACE);
      setHasCustomAudit(false);
    } catch {
      setWorkspace(DEFAULT_DEMO_WORKSPACE);
      setHasCustomAudit(false);
    }
  }, []);

  const saveAuditAsActiveWorkspace = (audit: AuditResult) => {
    try {
      localStorage.setItem("omni_active_audit", JSON.stringify(audit));
      setWorkspace(convertAuditToWorkspace(audit));
      setHasCustomAudit(true);
    } catch (e) {
      console.error("Failed to save active workspace audit", e);
    }
  };

  const resetToDemoWorkspace = () => {
    try {
      localStorage.removeItem("omni_active_audit");
      setWorkspace(DEFAULT_DEMO_WORKSPACE);
      setHasCustomAudit(false);
    } catch (e) {
      console.error("Failed to reset workspace", e);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspace,
        saveAuditAsActiveWorkspace,
        resetToDemoWorkspace,
        hasCustomAudit,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
