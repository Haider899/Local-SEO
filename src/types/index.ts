export type VisibilityGrade = 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';

export interface CategoryScores {
  seo: number;
  technical: number;
  local: number;
  ai: number;
  authority: number;
}

export interface AuditIssue {
  id: string;
  category: 'seo' | 'technical' | 'local' | 'ai' | 'authority' | string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low' | string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  recommendation: string;
  codeSnippet?: string;
}

export interface RawAuditData {
  url: string;
  finalUrl?: string;
  domain?: string;
  statusCode: number;
  responseTimeMs: number;
  contentType: string;
  isHttps: boolean;
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  canonicalUrl: string | null;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  openGraph: {
    title?: string | null;
    description?: string | null;
    image?: string | null;
    type?: string | null;
  };
  twitterCard: {
    card?: string | null;
    title?: string | null;
    description?: string | null;
    image?: string | null;
  };
  images: {
    total: number;
    withAlt: number;
    withoutAlt: number;
  };
  links: {
    internal: number;
    external: number;
    brokenEstimated: number;
  };
  wordCount: number;
  robotsTxtPresent: boolean;
  robotsTxtDisallowed: boolean;
  sitemapDetected: boolean;
  viewportConfigured: boolean;
  hasCompression: boolean;
  securityHeaders: {
    hsts: boolean;
    xContentTypeOptions: boolean;
    xFrameOptions: boolean;
  };
  phonesFound: string[];
  emailsFound: string[];
  hasLocalBusinessSchema: boolean;
  hasOrganizationSchema: boolean;
  hasGeoCoordinates: boolean;
  hasMapEmbed: boolean;
  hasFaqSchema: boolean;
  faqCount: number;
  directAnswerParagraphs: number;
  entityDefinitionsCount: number;
  aiBotDisallowed: {
    gptBot: boolean;
    claudebot: boolean;
    perplexityBot: boolean;
    googleOther: boolean;
  };
  jsonLdSchemas: any[];
  businessNameDetected?: string;
  addressDetected?: string;
}

export interface AuditResult {
  id: string;
  url: string;
  domain: string;
  timestamp: string;
  businessName: string;
  location: string;
  primaryService: string;
  targetKeyword: string;
  overallScore: number;
  grade: VisibilityGrade;
  categoryScores: CategoryScores;
  criticalIssuesCount: number;
  warningsCount: number;
  passedCount: number;
  issues: AuditIssue[];
  quickWins: AuditIssue[];
  growthOpportunities: AuditIssue[];
  rawData: RawAuditData;
}

export interface SmartTask {
  id: string;
  title: string;
  category: 'seo' | 'technical' | 'local' | 'ai' | 'authority' | string;
  impact: 'High' | 'Medium' | 'Low' | string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  priority: 'Critical' | 'High' | 'Medium' | 'Recommended' | string;
  explanation?: string;
  action?: string;
  status: 'open' | 'in_progress' | 'completed';
  dueDate?: string;
  estimatedMinutes?: number;
  codeSnippet?: string;
}

export interface AIQueryCheck {
  id: string;
  query: string;
  engine: string;
  category: string;
  mentioned: boolean;
  recommended: boolean;
  positionRank: number | null;
  contextSnippet: string;
  competitorsMentioned: string[];
  citations: string[];
  lastChecked: string;
}

export interface KeywordRanking {
  id: string;
  keyword: string;
  location: string;
  searchVolume: number;
  currentPosition: number;
  previousPosition: number;
  change: number;
  serpFeatures: string[];
  updatedAt: string;
}

export interface CompetitorComparison {
  id: string;
  name: string;
  domain: string;
  overallScore: number;
  aiScore: number;
  localScore: number;
  seoScore: number;
  sharedKeywords: number;
  rankingOverlap: number;
  strengths: string[];
  weaknesses: string[];
}

export interface PlanEntitlement {
  planName: string;
  maxProjects: number;
  maxAuditsPerMonth: number;
  maxTrackedKeywords: number;
  maxCompetitors: number;
  hasAdvancedAiTracking: boolean;
  hasGeoGridVisualizer: boolean;
  hasAutomatedReports: boolean;
  hasApiAccess: boolean;
  hasTeamMembers: boolean;
  hasWhiteLabel: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}
