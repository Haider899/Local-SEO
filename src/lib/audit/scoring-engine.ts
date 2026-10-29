import {
  AuditIssue,
  AuditResult,
  CategoryScores,
  RawAuditData,
  VisibilityGrade,
} from "@/types";

export interface ScoringWeights {
  seo: number;
  technical: number;
  local: number;
  ai: number;
  authority: number;
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  seo: 0.25,
  technical: 0.2,
  local: 0.25,
  ai: 0.2,
  authority: 0.1,
};

export function calculateScoresAndIssues(
  raw: RawAuditData,
  businessName?: string,
  location?: string,
  targetKeyword?: string
): {
  overallScore: number;
  grade: VisibilityGrade;
  categoryScores: CategoryScores;
  issues: AuditIssue[];
  quickWins: AuditIssue[];
  growthOpportunities: AuditIssue[];
  criticalIssuesCount: number;
  warningsCount: number;
  passedCount: number;
} {
  const issues: AuditIssue[] = [];
  let passedCount = 0;

  // ==========================================
  // 1. WEBSITE SEO EVALUATION (Max: 100)
  // ==========================================
  let seoPoints = 0;
  const maxSeoPoints = 100;

  // Title check (25 pts)
  if (!raw.title) {
    issues.push({
      id: "seo-title-missing",
      category: "seo",
      severity: "critical",
      title: "Missing Page Title Tag",
      description: "Your page does not have an HTML <title> tag, which is critical for search indexing.",
      impact: "High",
      difficulty: "Easy",
      recommendation: "Add a descriptive, keyword-rich <title> between 50-60 characters.",
      codeSnippet: `<title>${businessName || "Your Business"} | ${targetKeyword || "Top Local Services in " + (location || "Your City")}</title>`,
    });
  } else if (raw.titleLength < 30 || raw.titleLength > 65) {
    seoPoints += 12;
    issues.push({
      id: "seo-title-length",
      category: "seo",
      severity: "warning",
      title: `Suboptimal Title Length (${raw.titleLength} characters)`,
      description: `Your title is "${raw.title}". Recommended length is between 45 and 60 characters to avoid SERP truncation.`,
      impact: "Medium",
      difficulty: "Easy",
      recommendation: "Refine title length to 50-60 characters to ensure maximum click-through rates.",
    });
  } else {
    seoPoints += 25;
    passedCount++;
  }

  // Meta Description check (20 pts)
  if (!raw.metaDescription) {
    issues.push({
      id: "seo-meta-desc-missing",
      category: "seo",
      severity: "critical",
      title: "Missing Meta Description",
      description: "Search engines and AI summary bots rely on meta descriptions to understand page content.",
      impact: "High",
      difficulty: "Easy",
      recommendation: "Write an engaging meta description with a clear value proposition and call to action.",
      codeSnippet: `<meta name="description" content="Looking for trusted ${targetKeyword || "services"} in ${location || "your area"}? Contact ${businessName || "our team"} today for high quality solutions and fast support.">`,
    });
  } else if (raw.metaDescriptionLength < 70 || raw.metaDescriptionLength > 160) {
    seoPoints += 10;
    issues.push({
      id: "seo-meta-desc-length",
      category: "seo",
      severity: "warning",
      title: `Meta Description Length (${raw.metaDescriptionLength} characters)`,
      description: "Meta description should ideally be between 120 and 158 characters for optimal SERP rendering.",
      impact: "Low",
      difficulty: "Easy",
      recommendation: "Adjust your meta description length to prevent snippet truncation on mobile devices.",
    });
  } else {
    seoPoints += 20;
    passedCount++;
  }

  // Headings hierarchy (20 pts)
  if (raw.headings.h1.length === 0) {
    issues.push({
      id: "seo-h1-missing",
      category: "seo",
      severity: "critical",
      title: "Missing H1 Heading Tag",
      description: "No primary <h1> tag was found. The H1 tag tells crawlers and AI bots the primary subject of your page.",
      impact: "High",
      difficulty: "Easy",
      recommendation: "Add exactly one descriptive <h1> tag matching the main intent of the page.",
      codeSnippet: `<h1>${businessName || "Premier Services"} in ${location || "Your City"}</h1>`,
    });
  } else if (raw.headings.h1.length > 1) {
    seoPoints += 10;
    issues.push({
      id: "seo-multiple-h1",
      category: "seo",
      severity: "warning",
      title: `Multiple H1 Tags Found (${raw.headings.h1.length})`,
      description: "Having multiple H1 tags can dilute topical relevance for search engines and AI assistants.",
      impact: "Medium",
      difficulty: "Easy",
      recommendation: "Maintain a single main <h1> and structure sub-topics using <h2> and <h3> tags.",
    });
  } else {
    seoPoints += 20;
    passedCount++;
  }

  // Canonical (15 pts)
  if (!raw.canonicalUrl) {
    seoPoints += 5;
    issues.push({
      id: "seo-canonical-missing",
      category: "seo",
      severity: "warning",
      title: "Missing Rel-Canonical Tag",
      description: "A self-referencing canonical tag prevents duplicate content issues across URL parameters or protocol variants.",
      impact: "Medium",
      difficulty: "Easy",
      recommendation: "Add a canonical link tag pointing to the preferred URL version.",
      codeSnippet: `<link rel="canonical" href="${raw.url}" />`,
    });
  } else {
    seoPoints += 15;
    passedCount++;
  }

  // Image Alt Tags (20 pts)
  if (raw.images.total > 0) {
    const altRatio = raw.images.withAlt / raw.images.total;
    if (altRatio === 1) {
      seoPoints += 20;
      passedCount++;
    } else if (altRatio >= 0.6) {
      seoPoints += 12;
      issues.push({
        id: "seo-image-alts",
        category: "seo",
        severity: "warning",
        title: `${raw.images.withoutAlt} Images Missing Alt Text`,
        description: `${raw.images.withoutAlt} out of ${raw.images.total} images lack alt attributes, hurting accessibility and image search visibility.`,
        impact: "Medium",
        difficulty: "Easy",
        recommendation: "Add descriptive, contextual alt text to all informative images.",
      });
    } else {
      seoPoints += 4;
      issues.push({
        id: "seo-image-alts-bad",
        category: "seo",
        severity: "critical",
        title: `Most Images Lack Alt Text (${raw.images.withoutAlt}/${raw.images.total})`,
        description: "Images without alt text cannot be indexed properly by search crawlers or multimodal AI vision models.",
        impact: "High",
        difficulty: "Medium",
        recommendation: "Audit and enrich all media with keyword-aligned, accessible alt tags.",
      });
    }
  } else {
    seoPoints += 15;
  }

  // ==========================================
  // 2. TECHNICAL HEALTH EVALUATION (Max: 100)
  // ==========================================
  let techPoints = 0;

  // HTTPS (30 pts)
  if (raw.isHttps) {
    techPoints += 30;
    passedCount++;
  } else {
    issues.push({
      id: "tech-http-insecure",
      category: "technical",
      severity: "critical",
      title: "Site Not Serving HTTPS",
      description: "Insecure HTTP connections trigger browser warnings and negatively affect search and AI rankings.",
      impact: "High",
      difficulty: "Medium",
      recommendation: "Install an SSL/TLS certificate and enforce a 301 redirect from HTTP to HTTPS.",
    });
  }

  // Response Time (30 pts)
  if (raw.responseTimeMs < 400) {
    techPoints += 30;
    passedCount++;
  } else if (raw.responseTimeMs < 1000) {
    techPoints += 20;
    passedCount++;
  } else {
    techPoints += 5;
    issues.push({
      id: "tech-slow-response",
      category: "technical",
      severity: "warning",
      title: `Slow Server Response Time (${raw.responseTimeMs}ms)`,
      description: "TTFB exceeds 1,000ms. Slow response times lead to crawl budget exhaustion and user bounce rates.",
      impact: "High",
      difficulty: "Hard",
      recommendation: "Implement server caching, CDN edge distribution, and database query optimization.",
    });
  }

  // Mobile Viewport (20 pts)
  if (raw.viewportConfigured) {
    techPoints += 20;
    passedCount++;
  } else {
    issues.push({
      id: "tech-viewport-missing",
      category: "technical",
      severity: "critical",
      title: "Missing Mobile Viewport Meta Tag",
      description: "Without a viewport meta tag, mobile browsers will render pages at desktop screen widths.",
      impact: "High",
      difficulty: "Easy",
      recommendation: "Add standard viewport tag in the <head> section.",
      codeSnippet: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    });
  }

  // Robots.txt & Sitemap (20 pts)
  if (raw.robotsTxtDisallowed) {
    issues.push({
      id: "tech-robots-disallowed",
      category: "technical",
      severity: "critical",
      title: "Robots.txt Blocking All Crawlers",
      description: "Your robots.txt file contains a global 'Disallow: /' directive, preventing search engines and AI bots from indexing your site.",
      impact: "High",
      difficulty: "Easy",
      recommendation: "Update robots.txt to allow search bots on public content.",
    });
  } else {
    techPoints += 20;
    passedCount++;
  }

  // ==========================================
  // 3. LOCAL SEO EVALUATION (Max: 100)
  // ==========================================
  let localPoints = 0;

  // LocalBusiness Schema (35 pts)
  if (raw.hasLocalBusinessSchema) {
    localPoints += 35;
    passedCount++;
  } else {
    issues.push({
      id: "local-schema-missing",
      category: "local",
      severity: "critical",
      title: "Missing LocalBusiness Schema (JSON-LD)",
      description: "Search engines and AI models need structured LocalBusiness schema to associate your business with physical locations, hours, and services.",
      impact: "High",
      difficulty: "Medium",
      recommendation: "Inject JSON-LD structured data with company name, address, geo coordinates, and opening hours.",
      codeSnippet: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${businessName || "Your Business Name"}",
  "telephone": "${raw.phonesFound[0] || "+1-555-0199"}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "${location || "City"}",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  }
}`,
    });
  }

  // NAP Presence (Phone & Address) (30 pts)
  if (raw.phonesFound.length > 0) {
    localPoints += 20;
    passedCount++;
  } else {
    issues.push({
      id: "local-phone-missing",
      category: "local",
      severity: "warning",
      title: "No Contact Phone Number Detected on Page",
      description: "Displaying a clear, clickable telephone number boosts local trust and Google Maps citation confidence.",
      impact: "Medium",
      difficulty: "Easy",
      recommendation: "Add a visible tel: link and contact number in your header and footer.",
    });
  }

  if (raw.hasGeoCoordinates || raw.hasMapEmbed) {
    localPoints += 15;
    passedCount++;
  } else {
    localPoints += 5;
    issues.push({
      id: "local-map-signals",
      category: "local",
      severity: "info",
      title: "Missing Map Embed or Geo-Coordinates",
      description: "Including embedded Google Maps or geo-coordinates helps reinforce local service area relevance.",
      impact: "Low",
      difficulty: "Easy",
      recommendation: "Embed a responsive Google Maps location frame on contact and location landing pages.",
    });
  }

  // Organization Schema fallback (20 pts)
  if (raw.hasOrganizationSchema || raw.hasLocalBusinessSchema) {
    localPoints += 20;
    passedCount++;
  }

  // ==========================================
  // 4. AI READABILITY & VISIBILITY (Max: 100)
  // ==========================================
  let aiPoints = 0;

  // AI Crawlers Not Blocked (30 pts)
  if (raw.aiBotDisallowed.gptBot || raw.aiBotDisallowed.claudebot || raw.aiBotDisallowed.perplexityBot) {
    issues.push({
      id: "ai-bots-blocked",
      category: "ai",
      severity: "critical",
      title: "AI Search Bots Blocked in Robots.txt",
      description: `Your robots.txt blocks AI discovery bots (${[
        raw.aiBotDisallowed.gptBot ? "GPTBot" : null,
        raw.aiBotDisallowed.claudebot ? "ClaudeBot" : null,
        raw.aiBotDisallowed.perplexityBot ? "PerplexityBot" : null,
      ]
        .filter(Boolean)
        .join(", ")}), preventing AI engines from mentioning your brand in answers.`,
      impact: "High",
      difficulty: "Easy",
      recommendation: "Allow trusted AI search crawlers in robots.txt so your services can be recommended in ChatGPT and Perplexity.",
    });
  } else {
    aiPoints += 30;
    passedCount++;
  }

  // FAQ Schema & Conversational Data (30 pts)
  if (raw.hasFaqSchema && raw.faqCount >= 3) {
    aiPoints += 30;
    passedCount++;
  } else if (raw.hasFaqSchema) {
    aiPoints += 20;
    passedCount++;
  } else {
    issues.push({
      id: "ai-faq-schema-missing",
      category: "ai",
      severity: "warning",
      title: "No FAQPage Schema Detected (AEO Opportunity)",
      description: "Generative AI engines (ChatGPT, Gemini, Perplexity) synthesize direct answers from FAQ structured data.",
      impact: "High",
      difficulty: "Medium",
      recommendation: "Implement an FAQ section answering top customer questions paired with valid FAQPage JSON-LD schema.",
    });
  }

  // Direct Answer Formats & Entity Clarity (25 pts)
  if (raw.directAnswerParagraphs >= 2 || raw.entityDefinitionsCount > 0) {
    aiPoints += 25;
    passedCount++;
  } else {
    aiPoints += 10;
    issues.push({
      id: "ai-direct-answers-low",
      category: "ai",
      severity: "info",
      title: "Content Structure Lacks Direct-Answer Format",
      description: "AI engines favor concise, high-entropy definition paragraphs that clearly state what services you provide and where.",
      impact: "Medium",
      difficulty: "Medium",
      recommendation: "Structure core service descriptions with direct 1-sentence summaries followed by structured bullet points.",
    });
  }

  // OpenGraph completeness for AI link citations (15 pts)
  if (raw.openGraph.title && raw.openGraph.description) {
    aiPoints += 15;
    passedCount++;
  } else {
    aiPoints += 5;
    issues.push({
      id: "ai-og-tags-incomplete",
      category: "ai",
      severity: "info",
      title: "Incomplete OpenGraph Metadata for AI Citations",
      description: "AI search engines display rich citation link previews using OpenGraph meta tags.",
      impact: "Low",
      difficulty: "Easy",
      recommendation: "Add og:title, og:description, and og:image tags for rich preview rendering.",
    });
  }

  // ==========================================
  // 5. CONTENT & AUTHORITY (Max: 100)
  // ==========================================
  let authorityPoints = 0;
  if (raw.wordCount > 600) {
    authorityPoints += 50;
    passedCount++;
  } else if (raw.wordCount > 250) {
    authorityPoints += 30;
    passedCount++;
  } else {
    authorityPoints += 10;
    issues.push({
      id: "authority-thin-content",
      category: "authority",
      severity: "warning",
      title: `Thin Page Content (${raw.wordCount} words)`,
      description: "Pages with under 300 words struggle to rank for competitive commercial queries or provide sufficient context for AI models.",
      impact: "Medium",
      difficulty: "Medium",
      recommendation: "Expand content to 600+ words highlighting unique value propositions, process breakdown, and customer testimonials.",
    });
  }

  if (raw.links.internal >= 5) {
    authorityPoints += 30;
    passedCount++;
  } else {
    authorityPoints += 10;
    issues.push({
      id: "authority-internal-links",
      category: "authority",
      severity: "info",
      title: "Low Internal Linking Architecture",
      description: "Internal links distribute link equity and guide search spiders through your site hierarchy.",
      impact: "Medium",
      difficulty: "Easy",
      recommendation: "Add internal links connecting service pages, blog articles, and conversion pages.",
    });
  }

  if (raw.links.external > 0) {
    authorityPoints += 20;
    passedCount++;
  } else {
    authorityPoints += 10;
  }

  // Category Scores Normalized
  const categoryScores: CategoryScores = {
    seo: Math.min(100, Math.round(seoPoints)),
    technical: Math.min(100, Math.round(techPoints)),
    local: Math.min(100, Math.round(localPoints)),
    ai: Math.min(100, Math.round(aiPoints)),
    authority: Math.min(100, Math.round(authorityPoints)),
  };

  // Weighted Composite Score
  const overallScore = Math.round(
    categoryScores.seo * DEFAULT_WEIGHTS.seo +
      categoryScores.technical * DEFAULT_WEIGHTS.technical +
      categoryScores.local * DEFAULT_WEIGHTS.local +
      categoryScores.ai * DEFAULT_WEIGHTS.ai +
      categoryScores.authority * DEFAULT_WEIGHTS.authority
  );

  // Determine Grade
  let grade: VisibilityGrade = "F";
  if (overallScore >= 90) grade = "A+";
  else if (overallScore >= 80) grade = "A";
  else if (overallScore >= 70) grade = "B";
  else if (overallScore >= 55) grade = "C";
  else if (overallScore >= 40) grade = "D";

  // Categorize Issues
  const criticalIssuesCount = issues.filter((i) => i.severity === "critical").length;
  const warningsCount = issues.filter((i) => i.severity === "warning").length;

  const quickWins = issues.filter((i) => i.difficulty === "Easy" && (i.severity === "critical" || i.severity === "warning"));
  const growthOpportunities = issues.filter((i) => i.category === "ai" || i.category === "local" || i.impact === "High");

  return {
    overallScore,
    grade,
    categoryScores,
    issues,
    quickWins,
    growthOpportunities,
    criticalIssuesCount,
    warningsCount,
    passedCount,
  };
}
