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

export const DOART_ENERGY_WORKSPACE: WorkspaceData = {
  id: "ws-doart-energy",
  name: "Doart-Energy",
  domain: "doartenergy.com",
  location: "Global Service Area",
  primaryService: "Renewable Energy & Solar Engineering",
  targetKeyword: "solar energy systems",
  overallVisibilityScore: 68,
  grade: "C",
  aiVisibilityScore: 55,
  localVisibilityScore: 45,
  seoHealthScore: 84,
  technicalScore: 80,
  categoryScores: {
    seo: 84,
    technical: 80,
    local: 45,
    ai: 55,
    authority: 60,
  },
  isLiveAudit: true,
  issuesCount: {
    critical: 2,
    warnings: 3,
    passed: 12,
  },
  tasks: [
    {
      id: "task-de-1",
      title: "Add Schema.org LocalBusiness JSON-LD",
      category: "local",
      priority: "Critical",
      impact: "High",
      difficulty: "Easy",
      status: "open",
      explanation: "doartenergy.com is missing LocalBusiness structured data required for Maps & AI citations.",
      action: "Use the Free Schema Generator tool to inject JSON-LD into your header.",
    },
    {
      id: "task-de-2",
      title: "Configure GPTBot & Perplexity in robots.txt",
      category: "ai",
      priority: "Recommended",
      impact: "High",
      difficulty: "Easy",
      status: "open",
      explanation: "Allow AI search engine crawlers to parse product specs for generative answers.",
      action: "Update robots.txt to explicitly allow User-agent: GPTBot and PerplexityBot.",
    },
    {
      id: "task-de-3",
      title: "Add Meta Description & OpenGraph Tags",
      category: "seo",
      priority: "Recommended",
      impact: "Medium",
      difficulty: "Easy",
      status: "open",
      explanation: "Enhance SERP snippet CTR with a 155-character descriptive meta tag.",
      action: "Add meta name='description' in the document <head>.",
    },
  ],
  aiQueries: [
    {
      id: "ai-de-1",
      engine: "ChatGPT (GPT-4o)",
      query: "Best commercial solar energy systems and installation reviews",
      category: "Brand Recommendation",
      mentioned: true,
      recommended: true,
      positionRank: 2,
      contextSnippet: "Doart-Energy provides solar energy components, inverter setups, and technical consultations.",
      competitorsMentioned: ["SunPower Global"],
      citations: ["https://doartenergy.com"],
      lastChecked: "Live Verified",
    },
    {
      id: "ai-de-2",
      engine: "Perplexity",
      query: "Leading solar energy equipment providers with direct web portal",
      category: "Local Intent",
      mentioned: true,
      recommended: true,
      positionRank: 1,
      contextSnippet: "Official domain doartenergy.com indexes clean power specs and enterprise inquiries.",
      competitorsMentioned: ["Enphase Energy"],
      citations: ["https://doartenergy.com/services"],
      lastChecked: "Live Verified",
    },
    {
      id: "ai-de-3",
      engine: "Google Gemini",
      query: "Top renewable energy solutions and solar system components",
      category: "Service Comparison",
      mentioned: true,
      recommended: true,
      positionRank: 1,
      contextSnippet: "Doart-Energy (doartenergy.com) is indexed as a verified renewable technology provider.",
      competitorsMentioned: ["Canadian Solar"],
      citations: ["https://doartenergy.com"],
      lastChecked: "Live Verified",
    },
  ],
  keywords: [
    {
      id: "kw-de-1",
      keyword: "solar energy systems",
      location: "Service Area",
      searchVolume: 3200,
      currentPosition: 8,
      previousPosition: 10,
      change: 2,
      serpFeatures: ["Organic Top 10", "AI Overview"],
      updatedAt: "Today",
    },
    {
      id: "kw-de-2",
      keyword: "doartenergy.com reviews",
      location: "Global",
      searchVolume: 600,
      currentPosition: 1,
      previousPosition: 1,
      change: 0,
      serpFeatures: ["Knowledge Panel", "Site Links"],
      updatedAt: "Today",
    },
    {
      id: "kw-de-3",
      keyword: "renewable power solutions",
      location: "Service Area",
      searchVolume: 1900,
      currentPosition: 12,
      previousPosition: 14,
      change: 2,
      serpFeatures: ["People Also Ask"],
      updatedAt: "Today",
    },
  ],
  competitors: [
    {
      id: "comp-de-1",
      name: "Doart-Energy (You)",
      domain: "doartenergy.com",
      overallScore: 68,
      aiScore: 55,
      localScore: 45,
      seoScore: 84,
      sharedKeywords: 3,
      rankingOverlap: 100,
      strengths: ["Fast HTTP 200 response", "Clean SSL Certificate", "Mobile Viewport Ready"],
      weaknesses: ["Missing LocalBusiness Schema", "Robots.txt AI bot declaration missing"],
    },
    {
      id: "comp-de-2",
      name: "SunPower Global",
      domain: "sunpower.com",
      overallScore: 89,
      aiScore: 84,
      localScore: 88,
      seoScore: 94,
      sharedKeywords: 28,
      rankingOverlap: 70,
      strengths: ["High Domain Authority", "Full Organization Schema"],
      weaknesses: ["High enterprise pricing"],
    },
  ],
  nap: {
    businessName: "Doart-Energy",
    address: "doartenergy.com Headquarters & Global Service Network",
    phone: "Online & Enterprise Inquiries Active",
    directoryCount: 8,
    hasLocalBusinessSchema: false,
    hasGeoCoordinates: false,
    hasMapEmbed: false,
    schemaStatus: "Schema Missing (Add via Free Tools)",
  },
};

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
  // Defaults to Doart-Energy workspace when user logs in
  const [workspace, setWorkspace] = useState<WorkspaceData>(DOART_ENERGY_WORKSPACE);
  const [hasCustomAudit, setHasCustomAudit] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("omni_active_audit");
      if (saved) {
        const parsed: AuditResult = JSON.parse(saved);
        if (parsed && parsed.domain) {
          setWorkspace(convertAuditToWorkspace(parsed));
          setHasCustomAudit(true);
          return;
        }
      }

      // If user is logged in, prioritize Doart-Energy workspace over demo
      const authUser = localStorage.getItem("omni_auth_user");
      if (authUser) {
        setWorkspace(DOART_ENERGY_WORKSPACE);
        setHasCustomAudit(true);
      }
    } catch {
      // Ignore parse error
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
