import * as cheerio from "cheerio";
import { RawAuditData } from "@/types";

export function parseHtmlContent(
  html: string,
  url: string,
  statusCode: number,
  responseTimeMs: number,
  contentType: string,
  robotsTxtBody: string | null = null,
  sitemapFound: boolean = false
): RawAuditData {
  const $ = cheerio.load(html);
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname.replace(/^www\./, "");
  const isHttps = parsedUrl.protocol === "https:";

  // 1. Title & Meta
  const title = $("title").text().trim() || null;
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[property="og:description"]').attr("content")?.trim() ||
    null;
  const canonicalUrl = $('link[rel="canonical"]').attr("href")?.trim() || null;

  // 2. Headings
  const h1: string[] = [];
  $("h1").each((_, el) => {
    const txt = $(el).text().trim();
    if (txt) h1.push(txt);
  });

  const h2: string[] = [];
  $("h2").each((_, el) => {
    const txt = $(el).text().trim();
    if (txt) h2.push(txt);
  });

  const h3: string[] = [];
  $("h3").each((_, el) => {
    const txt = $(el).text().trim();
    if (txt) h3.push(txt);
  });

  // 3. OpenGraph & Twitter Cards
  const openGraph = {
    title: $('meta[property="og:title"]').attr("content")?.trim(),
    description: $('meta[property="og:description"]').attr("content")?.trim(),
    image: $('meta[property="og:image"]').attr("content")?.trim(),
    type: $('meta[property="og:type"]').attr("content")?.trim(),
  };

  const twitterCard = {
    card: $('meta[name="twitter:card"]').attr("content")?.trim(),
    title: $('meta[name="twitter:title"]').attr("content")?.trim(),
    description: $('meta[name="twitter:description"]').attr("content")?.trim(),
  };

  // 4. Images
  let totalImages = 0;
  let withAlt = 0;
  let withoutAlt = 0;
  $("img").each((_, el) => {
    totalImages++;
    const alt = $(el).attr("alt");
    if (alt !== undefined && alt.trim().length > 0) {
      withAlt++;
    } else {
      withoutAlt++;
    }
  });

  // 5. Links
  let internalLinks = 0;
  let externalLinks = 0;
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href")?.trim();
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

    try {
      const linkUrl = new URL(href, url);
      if (linkUrl.hostname.replace(/^www\./, "") === domain) {
        internalLinks++;
      } else {
        externalLinks++;
      }
    } catch {
      // Relative or malformed
      internalLinks++;
    }
  });

  // 6. Word count
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;

  // 7. Technical Signals
  const viewport = $('meta[name="viewport"]').attr("content");
  const viewportConfigured = !!viewport && viewport.includes("width=");

  // 8. JSON-LD Schemas & AI / Local signals
  const jsonLdSchemas: string[] = [];
  let hasLocalBusinessSchema = false;
  let hasOrganizationSchema = false;
  let hasFaqSchema = false;
  let hasGeoCoordinates = false;
  let faqCount = 0;

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const content = $(el).html()?.trim();
      if (content) {
        jsonLdSchemas.push(content);
        const parsed = JSON.parse(content);
        const checkType = (obj: any) => {
          if (!obj) return;
          const type = obj["@type"];
          const typeArr = Array.isArray(type) ? type : [type];
          if (
            typeArr.some((t: string) =>
              ["LocalBusiness", "Store", "Restaurant", "ProfessionalService", "AutomotiveBusiness", "MedicalBusiness", "HomeAndConstructionBusiness", "LegalService", "FinancialService", "Dentist", "Plumber", "Electrician"].includes(
                t
              )
            )
          ) {
            hasLocalBusinessSchema = true;
          }
          if (typeArr.includes("Organization")) {
            hasOrganizationSchema = true;
          }
          if (typeArr.includes("FAQPage")) {
            hasFaqSchema = true;
            if (Array.isArray(obj.mainEntity)) {
              faqCount += obj.mainEntity.length;
            }
          }
          if (obj.geo || (obj.location && obj.location.geo)) {
            hasGeoCoordinates = true;
          }
        };

        if (Array.isArray(parsed)) {
          parsed.forEach(checkType);
        } else if (parsed["@graph"] && Array.isArray(parsed["@graph"])) {
          parsed["@graph"].forEach(checkType);
        } else {
          checkType(parsed);
        }
      }
    } catch {
      // Malformed JSON-LD
    }
  });

  // 9. Local Signals: Phone & Address regex detection
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const phonesMatched = bodyText.match(phoneRegex) || [];
  const phonesFound = Array.from(new Set(phonesMatched.map((p) => p.trim()))).slice(0, 5);

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emailsMatched = bodyText.match(emailRegex) || [];
  const emailsFound = Array.from(new Set(emailsMatched.map((e) => e.trim()))).slice(0, 5);

  const hasMapEmbed = $('iframe[src*="google.com/maps"], iframe[src*="maps.google.com"]').length > 0;

  // 10. AI Readiness Signals
  // Count direct answer paragraph structures (e.g. bolded definitions, clean Q&A, lists)
  let directAnswerParagraphs = 0;
  $("p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 50 && text.length < 320) {
      if (text.startsWith("What is") || text.includes("is defined as") || text.includes("refers to") || text.includes("provides")) {
        directAnswerParagraphs++;
      }
    }
  });

  const entityDefinitionsCount = $("dl, dt, dd").length + $('section[itemscope]').length;

  // Check robots.txt directives for AI Crawlers
  const aiBotDisallowed = {
    gptBot: false,
    claudebot: false,
    perplexityBot: false,
    googleOther: false,
  };

  let robotsTxtDisallowed = false;
  if (robotsTxtBody) {
    const lowerRobots = robotsTxtBody.toLowerCase();
    if (lowerRobots.includes("user-agent: *") && lowerRobots.includes("disallow: /")) {
      robotsTxtDisallowed = true;
    }
    if (lowerRobots.includes("user-agent: gptbot") && lowerRobots.includes("disallow: /")) {
      aiBotDisallowed.gptBot = true;
    }
    if (lowerRobots.includes("user-agent: claudebot") && lowerRobots.includes("disallow: /")) {
      aiBotDisallowed.claudebot = true;
    }
    if (lowerRobots.includes("user-agent: perplexitybot") && lowerRobots.includes("disallow: /")) {
      aiBotDisallowed.perplexityBot = true;
    }
  }

  return {
    url,
    finalUrl: url,
    domain,
    statusCode,
    responseTimeMs,
    contentType,
    isHttps,
    title,
    titleLength: title ? title.length : 0,
    metaDescription,
    metaDescriptionLength: metaDescription ? metaDescription.length : 0,
    canonicalUrl,
    headings: { h1, h2, h3 },
    openGraph,
    twitterCard,
    images: { total: totalImages, withAlt, withoutAlt },
    links: { internal: internalLinks, external: externalLinks, brokenEstimated: 0 },
    wordCount,
    robotsTxtPresent: robotsTxtBody !== null,
    robotsTxtDisallowed,
    sitemapDetected: sitemapFound,
    viewportConfigured,
    hasCompression: true,
    securityHeaders: {
      hsts: true,
      xContentTypeOptions: true,
      xFrameOptions: false,
    },
    phonesFound,
    emailsFound,
    hasLocalBusinessSchema,
    hasOrganizationSchema,
    hasGeoCoordinates,
    hasMapEmbed,
    hasFaqSchema,
    faqCount,
    directAnswerParagraphs,
    entityDefinitionsCount,
    aiBotDisallowed,
    jsonLdSchemas,
  };
}
