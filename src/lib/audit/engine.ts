import { AuditResult } from "@/types";
import { validateAndSanitizeUrl } from "./ssrf-guard";
import { parseHtmlContent } from "./html-parser";
import { calculateScoresAndIssues } from "./scoring-engine";

export interface AuditInput {
  url: string;
  businessName?: string;
  location?: string;
  primaryService?: string;
  targetKeyword?: string;
}

export async function runWebsiteAudit(input: AuditInput): Promise<AuditResult> {
  const validation = await validateAndSanitizeUrl(input.url);
  if (!validation.isValid) {
    throw new Error(validation.error || "Invalid URL provided.");
  }

  const targetUrl = validation.normalizedUrl;
  const startTime = Date.now();
  let html = "";
  let statusCode = 200;
  let contentType = "text/html";
  let robotsTxtBody: string | null = null;
  let sitemapFound = false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 OmniRankBot/1.0 (+https://omnirank.ai/bot)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);
    statusCode = response.status;
    contentType = response.headers.get("content-type") || "text/html";

    // Read max 2.5MB to prevent memory exhaustion
    const arrayBuffer = await response.arrayBuffer();
    const decoder = new TextDecoder("utf-8");
    html = decoder.decode(arrayBuffer.slice(0, 2500000));
  } catch (err: any) {
    clearTimeout(timeout);

    // If HTTPS failed due to SSL or protocol, attempt plain HTTP fallback if original was https
    if (targetUrl.startsWith("https://")) {
      const httpFallbackUrl = targetUrl.replace("https://", "http://");
      try {
        const fallbackRes = await fetch(httpFallbackUrl, {
          signal: AbortSignal.timeout(6000),
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 OmniRankBot/1.0",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
          redirect: "follow",
        });
        statusCode = fallbackRes.status;
        contentType = fallbackRes.headers.get("content-type") || "text/html";
        const ab = await fallbackRes.arrayBuffer();
        html = new TextDecoder("utf-8").decode(ab.slice(0, 2500000));
      } catch (fallbackErr: any) {
        throw new Error(
          `Unable to reach website at ${targetUrl} (${err.name === "AbortError" ? "Request timed out after 10s" : err.message || "Connection refused"}). Please verify the domain is online and publicly reachable.`
        );
      }
    } else {
      throw new Error(
        `Unable to reach website at ${targetUrl} (${err.name === "AbortError" ? "Request timed out after 10s" : err.message || "Connection refused"}). Please verify the domain is online and publicly reachable.`
      );
    }
  }

  // Try checking robots.txt
  try {
    const robotsUrl = new URL("/robots.txt", targetUrl).toString();
    const robotsRes = await fetch(robotsUrl, {
      signal: AbortSignal.timeout(3000),
      headers: { "User-Agent": "OmniRankBot/1.0" },
    });
    if (robotsRes.ok) {
      robotsTxtBody = await robotsRes.text();
    }
  } catch {
    // robots.txt optional
  }

  // Try checking sitemap.xml
  try {
    const sitemapUrl = new URL("/sitemap.xml", targetUrl).toString();
    const sitemapRes = await fetch(sitemapUrl, {
      method: "HEAD",
      signal: AbortSignal.timeout(3000),
    });
    if (sitemapRes.ok) {
      sitemapFound = true;
    }
  } catch {
    // sitemap optional
  }

  const responseTimeMs = Math.max(80, Date.now() - startTime);

  // Parse HTML
  const rawData = parseHtmlContent(
    html,
    targetUrl,
    statusCode,
    responseTimeMs,
    contentType,
    robotsTxtBody,
    sitemapFound
  );

  // Score and generate prioritized issues
  const scored = calculateScoresAndIssues(
    rawData,
    input.businessName,
    input.location,
    input.targetKeyword
  );

  const auditId = `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const result: AuditResult = {
    id: auditId,
    url: targetUrl,
    domain: validation.domain,
    timestamp: new Date().toISOString(),
    businessName: input.businessName || validation.domain,
    location: input.location || "Local Service Area",
    primaryService: input.primaryService || "General Services",
    targetKeyword: input.targetKeyword || "Local Business",
    overallScore: scored.overallScore,
    grade: scored.grade,
    categoryScores: scored.categoryScores,
    criticalIssuesCount: scored.criticalIssuesCount,
    warningsCount: scored.warningsCount,
    passedCount: scored.passedCount,
    issues: scored.issues,
    quickWins: scored.quickWins,
    growthOpportunities: scored.growthOpportunities,
    rawData,
  };

  return result;
}
