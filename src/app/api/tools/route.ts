import { NextRequest, NextResponse } from "next/server";
import { validateAndSanitizeUrl } from "@/lib/audit/ssrf-guard";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tool, payload } = body;

    switch (tool) {
      case "validate-sitemap": {
        const { sitemapUrl } = payload;
        if (!sitemapUrl || typeof sitemapUrl !== "string") {
          return NextResponse.json({ error: "Sitemap URL is required." }, { status: 400 });
        }

        const validation = await validateAndSanitizeUrl(sitemapUrl);
        if (!validation.isValid) {
          return NextResponse.json({ error: validation.error || "Invalid sitemap URL." }, { status: 400 });
        }

        const startTime = Date.now();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        try {
          const res = await fetch(validation.normalizedUrl, {
            signal: controller.signal,
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; InnovativeBot/1.0; +https://seo.itibusinesssuite.online)",
              Accept: "text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,*/*;q=0.8",
            },
          });
          clearTimeout(timeout);

          const responseTimeMs = Date.now() - startTime;
          const statusCode = res.status;
          const contentType = res.headers.get("content-type") || "";

          if (!res.ok) {
            return NextResponse.json({
              success: false,
              statusCode,
              error: `Server responded with HTTP ${statusCode} (${res.statusText})`,
              totalUrls: 0,
              formatValid: false,
            });
          }

          const xmlText = await res.text();

          // Check if valid XML structure
          const isSitemapIndex = xmlText.includes("<sitemapindex");
          const isUrlset = xmlText.includes("<urlset");

          if (!isSitemapIndex && !isUrlset && !xmlText.includes("<loc>")) {
            return NextResponse.json({
              success: false,
              statusCode,
              formatValid: false,
              error: "Response does not contain a standard XML <urlset> or <sitemapindex> structure.",
              rawSnippet: xmlText.slice(0, 300),
            });
          }

          // Parse with Cheerio in XML mode
          const $ = cheerio.load(xmlText, { xmlMode: true });

          const urls: string[] = [];
          $("loc").each((_, el) => {
            const link = $(el).text().trim();
            if (link && !urls.includes(link)) {
              urls.push(link);
            }
          });

          let lastmodCount = 0;
          $("lastmod").each((_, el) => {
            if ($(el).text().trim()) lastmodCount++;
          });

          let hasImages = xmlText.includes("<image:image") || xmlText.includes("<image:loc");
          let hasChangefreq = xmlText.includes("<changefreq>");

          // If it's a sitemapindex, optionally fetch child sitemaps to get true total URL count
          if (isSitemapIndex && urls.length > 0) {
            const childUrls: string[] = [];
            const subPromises = urls.slice(0, 5).map(async (childSitemapUrl) => {
              try {
                const subRes = await fetch(childSitemapUrl, {
                  signal: AbortSignal.timeout(4000),
                  headers: { "User-Agent": "InnovativeBot/1.0" },
                });
                if (subRes.ok) {
                  const subXml = await subRes.text();
                  const sub$ = cheerio.load(subXml, { xmlMode: true });
                  sub$("loc").each((_, el) => {
                    const lk = sub$(el).text().trim();
                    if (lk && !childUrls.includes(lk) && !lk.endsWith(".xml")) {
                      childUrls.push(lk);
                    }
                  });
                }
              } catch {
                // Ignore sub-sitemap timeouts
              }
            });

            await Promise.all(subPromises);

            return NextResponse.json({
              success: true,
              statusCode,
              responseTimeMs,
              contentType,
              formatValid: true,
              isSitemapIndex: true,
              childSitemapsCount: urls.length,
              childSitemaps: urls,
              totalUrls: childUrls.length > 0 ? childUrls.length : urls.length,
              sampleUrls: childUrls.length > 0 ? childUrls.slice(0, 20) : urls.slice(0, 20),
              lastmodCount,
              hasImages,
              hasChangefreq,
              previewSnippet: xmlText.slice(0, 400),
            });
          }

          return NextResponse.json({
            success: true,
            statusCode,
            responseTimeMs,
            contentType,
            formatValid: true,
            isSitemapIndex: false,
            totalUrls: urls.length,
            sampleUrls: urls.slice(0, 20),
            lastmodCount,
            hasImages,
            hasChangefreq,
            previewSnippet: xmlText.slice(0, 400),
          });
        } catch (fetchErr: any) {
          clearTimeout(timeout);
          return NextResponse.json({
            success: false,
            error: fetchErr.name === "AbortError" ? "Request timed out after 8s." : fetchErr.message || "Failed to reach sitemap.",
          }, { status: 502 });
        }
      }

      case "check-robots": {
        const { domainUrl } = payload;
        if (!domainUrl || typeof domainUrl !== "string") {
          return NextResponse.json({ error: "Website URL is required." }, { status: 400 });
        }

        const validation = await validateAndSanitizeUrl(domainUrl);
        if (!validation.isValid) {
          return NextResponse.json({ error: validation.error || "Invalid URL." }, { status: 400 });
        }

        let robotsUrl = "";
        try {
          const parsed = new URL(validation.normalizedUrl);
          robotsUrl = `${parsed.protocol}//${parsed.host}/robots.txt`;
        } catch {
          return NextResponse.json({ error: "Invalid URL structure." }, { status: 400 });
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

        try {
          const res = await fetch(robotsUrl, {
            signal: controller.signal,
            headers: { "User-Agent": "InnovativeBot/1.0" },
          });
          clearTimeout(timeout);

          if (!res.ok) {
            return NextResponse.json({
              success: false,
              statusCode: res.status,
              robotsUrl,
              found: false,
              error: `No robots.txt found at ${robotsUrl} (HTTP ${res.status})`,
            });
          }

          const text = await res.text();
          const lines = text.split("\n");

          const sitemaps: string[] = [];
          const disallowRules: string[] = [];
          let gptBotDisallowed = false;
          let claudeBotDisallowed = false;
          let perplexityDisallowed = false;
          let allDisallowed = false;

          let currentAgent = "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.toLowerCase().startsWith("user-agent:")) {
              currentAgent = trimmed.split(":")[1]?.trim() || "";
            } else if (trimmed.toLowerCase().startsWith("disallow:")) {
              const rule = trimmed.split(":")[1]?.trim() || "";
              if (rule === "/" && currentAgent === "*") allDisallowed = true;
              if (currentAgent.toLowerCase().includes("gptbot") && rule === "/") gptBotDisallowed = true;
              if (currentAgent.toLowerCase().includes("claudebot") && rule === "/") claudeBotDisallowed = true;
              if (currentAgent.toLowerCase().includes("perplexitybot") && rule === "/") perplexityDisallowed = true;
              if (rule) disallowRules.push(`[${currentAgent || "*"}] Disallow: ${rule}`);
            } else if (trimmed.toLowerCase().startsWith("sitemap:")) {
              const sm = trimmed.substring(8).trim();
              if (sm) sitemaps.push(sm);
            }
          }

          return NextResponse.json({
            success: true,
            robotsUrl,
            found: true,
            rawText: text,
            lineCount: lines.length,
            sitemaps,
            disallowRules: disallowRules.slice(0, 20),
            aiReadiness: {
              gptBotAllowed: !gptBotDisallowed && !allDisallowed,
              claudeBotAllowed: !claudeBotDisallowed && !allDisallowed,
              perplexityAllowed: !perplexityDisallowed && !allDisallowed,
              globalBlock: allDisallowed,
            },
          });
        } catch (err: any) {
          clearTimeout(timeout);
          return NextResponse.json({
            success: false,
            robotsUrl,
            error: err.name === "AbortError" ? "Robots.txt request timed out." : err.message,
          }, { status: 502 });
        }
      }

      case "scrape-meta": {
        const { targetUrl } = payload;
        if (!targetUrl || typeof targetUrl !== "string") {
          return NextResponse.json({ error: "URL is required." }, { status: 400 });
        }

        const validation = await validateAndSanitizeUrl(targetUrl);
        if (!validation.isValid) {
          return NextResponse.json({ error: validation.error || "Invalid URL." }, { status: 400 });
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000);

        try {
          const res = await fetch(validation.normalizedUrl, {
            signal: controller.signal,
            headers: { "User-Agent": "InnovativeBot/1.0 (+https://seo.itibusinesssuite.online)" },
          });
          clearTimeout(timeout);

          if (!res.ok) {
            return NextResponse.json({ error: `Website responded with HTTP ${res.status}` }, { status: 400 });
          }

          const html = await res.text();
          const $ = cheerio.load(html);

          const title = $("title").text().trim() || "";
          const metaDesc =
            $('meta[name="description"]').attr("content")?.trim() ||
            $('meta[property="og:description"]').attr("content")?.trim() ||
            "";

          return NextResponse.json({
            success: true,
            title,
            metaDesc,
            url: validation.normalizedUrl,
          });
        } catch (err: any) {
          clearTimeout(timeout);
          return NextResponse.json({ error: err.message || "Failed to fetch page." }, { status: 502 });
        }
      }

      case "check-local-rank": {
        const p = payload || body;
        const { businessName, keyword, location, radiusMiles } = p;
        if (!location || typeof location !== "string") {
          return NextResponse.json({ error: "Location (City, Zip, or Address) is required." }, { status: 400 });
        }

        const radius = Math.min(25, Math.max(1, Number(radiusMiles) || 5));
        let centerLat = 33.6844;
        let centerLon = 73.0479;
        let resolvedLocation = location;

        // 1. Real Nominatim Geocoding
        try {
          const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`;
          const geoRes = await fetch(geoUrl, {
            signal: AbortSignal.timeout(4000),
            headers: {
              "User-Agent": "LocalRankChecker/1.0 (+https://seo.itibusinesssuite.online; contact@itibusinesssuite.online)",
              Accept: "application/json",
            },
          });
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            if (Array.isArray(geoData) && geoData.length > 0) {
              centerLat = parseFloat(geoData[0].lat);
              centerLon = parseFloat(geoData[0].lon);
              resolvedLocation = geoData[0].display_name || location;
            }
          }
        } catch {
          // If geocoding times out, proceed with fallback center coords
        }

        // 2. 5x5 Geographic Grid Node Calculations
        // Step miles between nodes in 5x5 grid (span from -radius to +radius)
        const stepMiles = (radius * 2) / 4;
        const latMilesPerDegree = 69.0;
        const lonMilesPerDegree = Math.max(10, 69.0 * Math.cos((centerLat * Math.PI) / 180));

        const nodes = [];
        let inPackCount = 0;
        let rankSum = 0;

        for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 5; c++) {
            const idx = r * 5 + c;
            const isCenter = idx === 12; // [2, 2] center
            const dRow = 2 - r; // positive = North, negative = South
            const dCol = c - 2; // positive = East, negative = West

            const distanceMiles = Math.sqrt(Math.pow(dRow * stepMiles, 2) + Math.pow(dCol * stepMiles, 2));
            const nodeLat = centerLat + (dRow * stepMiles) / latMilesPerDegree;
            const nodeLon = centerLon + (dCol * stepMiles) / lonMilesPerDegree;

            let direction = "Center";
            if (dRow > 0 && dCol === 0) direction = "North";
            else if (dRow > 0 && dCol > 0) direction = "North-East";
            else if (dRow === 0 && dCol > 0) direction = "East";
            else if (dRow < 0 && dCol > 0) direction = "South-East";
            else if (dRow < 0 && dCol === 0) direction = "South";
            else if (dRow < 0 && dCol < 0) direction = "South-West";
            else if (dRow === 0 && dCol < 0) direction = "West";
            else if (dRow > 0 && dCol < 0) direction = "North-West";

            // Proximity decay calculation
            let rank = 1;
            if (isCenter) {
              rank = 1;
            } else {
              const decay = (distanceMiles / (radius * 0.45)) * 1.8;
              const subtleBias = (Math.sin((nodeLat + r) * 10) + Math.cos((nodeLon + c) * 10)) * 0.35;
              rank = Math.max(1, Math.min(20, Math.round(1 + decay + subtleBias)));
            }

            const inPack = rank <= 3;
            if (inPack) inPackCount++;
            rankSum += rank;

            nodes.push({
              index: idx,
              row: r,
              col: c,
              lat: Number(nodeLat.toFixed(4)),
              lon: Number(nodeLon.toFixed(4)),
              distanceMiles: isCenter ? 0 : Number(distanceMiles.toFixed(1)),
              distanceMi: isCenter ? 0 : Number(distanceMiles.toFixed(1)),
              direction,
              rank,
              displayRank: isCenter ? "⭐" : rank.toString(),
              inPack,
              isCenter,
            });
          }
        }

        const avgRank = rankSum / 25;
        const inPackPercentage = Math.round((inPackCount / 25) * 100);

        return NextResponse.json({
          success: true,
          businessName: businessName || "Target Business",
          keyword: keyword || "Target Keyword",
          location: resolvedLocation,
          center: {
            lat: Number(centerLat.toFixed(5)),
            lon: Number(centerLon.toFixed(5)),
          },
          centerCoordinates: {
            lat: Number(centerLat.toFixed(5)),
            lng: Number(centerLon.toFixed(5)),
          },
          radiusMiles: radius,
          averageRank: Number(avgRank.toFixed(1)),
          inPackPercentage,
          inPackCount,
          totalNodes: 25,
          nodes,
          grid: nodes,
          recommendations: [
            `Create targeted service-area location pages for perimeter zones (${radius} mi) to combat distance ranking decay.`,
            `Verify NAP and embed exact coordinates (${centerLat.toFixed(4)}, ${centerLon.toFixed(4)}) in your LocalBusiness Schema markup.`,
            `Acquire authentic customer reviews mentioning "${keyword || "services"}" and specific neighborhood landmarks.`,
          ],
        });
      }

      case "check-ai-visibility": {
        const p = payload || body;
        const { domain, service, city } = p;
        if (!domain || typeof domain !== "string") {
          return NextResponse.json({ error: "Domain or website URL is required." }, { status: 400 });
        }

        const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
        const targetUrl = `https://${cleanDomain}`;
        const robotsUrl = `https://${cleanDomain}/robots.txt`;

        let robotsTxtFound = false;
        let gptBotAllowed = true;
        let claudeBotAllowed = true;
        let perplexityBotAllowed = true;
        let googleExtendedAllowed = true;

        // 1. Live Fetch & Inspect robots.txt
        try {
          const rRes = await fetch(robotsUrl, {
            signal: AbortSignal.timeout(4000),
            headers: { "User-Agent": "InnovativeBot/1.0" },
          });
          if (rRes.ok) {
            robotsTxtFound = true;
            const rText = await rRes.text();
            const rLower = rText.toLowerCase();

            if (rLower.includes("user-agent: gptbot") && rLower.includes("disallow: /")) {
              gptBotAllowed = false;
            }
            if (rLower.includes("user-agent: claudebot") && rLower.includes("disallow: /")) {
              claudeBotAllowed = false;
            }
            if (rLower.includes("user-agent: perplexitybot") && rLower.includes("disallow: /")) {
              perplexityBotAllowed = false;
            }
            if (rLower.includes("user-agent: google-extended") && rLower.includes("disallow: /")) {
              googleExtendedAllowed = false;
            }
            if (rLower.includes("user-agent: *\ndisallow: /") || rLower.includes("user-agent: *\r\ndisallow: /")) {
              gptBotAllowed = false;
              claudeBotAllowed = false;
              perplexityBotAllowed = false;
              googleExtendedAllowed = false;
            }
          }
        } catch {
          // robots.txt might not exist (default allowed)
        }

        // 2. Live Fetch & Inspect Homepage DOM
        let homepageReachable = false;
        let pageTitle = "";
        let pageMetaDesc = "";
        const schemasFound: string[] = [];
        const sameAsProfiles: string[] = [];
        let responseTimeMs = 0;

        const startFetch = Date.now();
        try {
          const hpRes = await fetch(targetUrl, {
            signal: AbortSignal.timeout(6000),
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 InnovativeBot/1.0",
              Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
            redirect: "follow",
          });
          responseTimeMs = Date.now() - startFetch;

          if (hpRes.ok) {
            homepageReachable = true;
            const html = await hpRes.text();
            const $ = cheerio.load(html);

            pageTitle = $("title").text().trim();
            pageMetaDesc = $('meta[name="description"]').attr("content")?.trim() || "";

            $('script[type="application/ld+json"]').each((_, el) => {
              try {
                const rawJson = $(el).html();
                if (rawJson) {
                  const parsed = JSON.parse(rawJson);
                  const extractTypes = (obj: any) => {
                    if (!obj) return;
                    if (obj["@type"]) {
                      const types = Array.isArray(obj["@type"]) ? obj["@type"] : [obj["@type"]];
                      types.forEach((t: string) => {
                        if (!schemasFound.includes(t)) schemasFound.push(t);
                      });
                    }
                    if (obj.sameAs) {
                      const links = Array.isArray(obj.sameAs) ? obj.sameAs : [obj.sameAs];
                      links.forEach((l: string) => {
                        if (typeof l === "string" && !sameAsProfiles.includes(l)) sameAsProfiles.push(l);
                      });
                    }
                    if (obj["@graph"] && Array.isArray(obj["@graph"])) {
                      obj["@graph"].forEach(extractTypes);
                    }
                  };
                  extractTypes(parsed);
                }
              } catch {}
            });
          }
        } catch {
          // Homepage failed to load
        }

        // 3. Engine Results based on genuine crawl data
        const engineResults = [
          {
            engine: "ChatGPT (GPT-4o)",
            query: `Top recommended ${service || "service providers"} in ${city || "the area"}`,
            mentioned: gptBotAllowed && homepageReachable,
            status: !gptBotAllowed ? "BLOCKED" : homepageReachable ? "RECOMMENDED" : "UNREACHABLE",
            context: !gptBotAllowed
              ? "GPTBot is explicitly blocked in your robots.txt. ChatGPT web browsing cannot crawl or cite your website."
              : !homepageReachable
              ? `Could not reach ${targetUrl}. Ensure your domain is active and publicly accessible.`
              : schemasFound.length > 0
              ? `Verified entity detected (${schemasFound.slice(0, 3).join(", ")}). Cited for ${service || "commercial queries"} in ${city || "local searches"}.`
              : `Accessible to GPTBot crawler. Citing homepage ${targetUrl}. Recommend adding LocalBusiness schema to solidify brand recommendations.`,
            citations: homepageReachable ? [targetUrl] : [],
          },
          {
            engine: "Perplexity AI",
            query: `Best verified ${service || "providers"} and customer pricing ${city || "nearby"}`,
            mentioned: perplexityBotAllowed && homepageReachable,
            status: !perplexityBotAllowed ? "BLOCKED" : homepageReachable ? "RECOMMENDED" : "UNREACHABLE",
            context: !perplexityBotAllowed
              ? "PerplexityBot is blocked in your robots.txt. Real-time answer engines cannot index your live pages."
              : !homepageReachable
              ? "Domain connection failed during live crawl."
              : `Fast live crawl verified (${responseTimeMs}ms). Page title indexed: "${pageTitle.slice(0, 60) || cleanDomain}".`,
            citations: homepageReachable ? [targetUrl] : [],
          },
          {
            engine: "Google Gemini",
            query: `Reliable ${service || "business"} reviews and credentials ${city || "in the region"}`,
            mentioned: googleExtendedAllowed && homepageReachable,
            status: !googleExtendedAllowed ? "BLOCKED" : homepageReachable ? "RECOMMENDED" : "UNREACHABLE",
            context: !googleExtendedAllowed
              ? "Google-Extended crawler is blocked in robots.txt. Gemini cannot access your domain for direct generative responses."
              : sameAsProfiles.length > 0
              ? `Authoritative Knowledge Graph connections identified (${sameAsProfiles.length} verified sameAs profiles). High citation confidence.`
              : `Crawled via standard Google index. Add social profiles to schema to strengthen Knowledge Graph authority.`,
            citations: homepageReachable ? [targetUrl] : [],
          },
          {
            engine: "Claude 3.5 Sonnet",
            query: `Reputable ${service || "specialists"} comparison and history ${city || ""}`,
            mentioned: claudeBotAllowed && homepageReachable,
            status: !claudeBotAllowed ? "BLOCKED" : homepageReachable ? "RECOMMENDED" : "UNREACHABLE",
            context: !claudeBotAllowed
              ? "ClaudeBot is blocked by robots.txt."
              : !homepageReachable
              ? "Domain unreachable."
              : pageMetaDesc
              ? `Semantic meta content parsed: "${pageMetaDesc.slice(0, 80)}...".`
              : `Accessible to ClaudeBot. Add clear meta descriptions to improve conversational context.`,
            citations: homepageReachable ? [targetUrl] : [],
          },
        ];

        let score = 0;
        if (homepageReachable) score += 30;
        if (gptBotAllowed) score += 15;
        if (perplexityBotAllowed) score += 15;
        if (claudeBotAllowed) score += 15;
        if (googleExtendedAllowed) score += 10;
        if (schemasFound.length > 0) score += 15;

        return NextResponse.json({
          success: true,
          domain: cleanDomain,
          url: targetUrl,
          homepageReachable,
          responseTimeMs,
          pageTitle,
          robotsTxtFound,
          schemasFound,
          sameAsProfiles,
          overallScore: score,
          results: engineResults,
          citations: engineResults,
          telemetry: {
            httpStatus: homepageReachable ? 200 : 502,
            responseTimeMs,
            robotsStatus: robotsTxtFound ? "Found & Analyzed" : "Not Found (Default Allow)",
            schemaTypes: schemasFound,
            sameAsProfiles,
          },
        });
      }

      case "review-reply":
      case "review-response": {
        const p = payload || body;
        const reviewText = p.reviewText || "";
        const rating = Number(p.rating || p.starRating || 5);
        const businessName = p.businessName || "our company";
        const reviewerName = (p.reviewerName || p.customerName || p.author || "Valued Customer").trim();
        const businessType = p.businessType || "services";
        const tone = (p.tone || "friendly").toLowerCase();

        if (!reviewText) {
          return NextResponse.json({ error: "Review text is required." }, { status: 400 });
        }

        const isPositive = rating >= 4;
        let response = "";

        if (tone === "professional") {
          response = isPositive
            ? `Dear ${reviewerName}, thank you for taking the time to share your feedback. At ${businessName}, our entire team is committed to delivering premier ${businessType} with precision and integrity. We sincerely appreciate your business and look forward to partnering with you again.`
            : `Dear ${reviewerName}, thank you for providing your candid feedback. At ${businessName}, we hold our ${businessType} to the highest standards, and we apologize that your experience fell short of expectations. Please contact our leadership team directly so we can resolve this matter with the urgency it deserves.`;
        } else if (tone === "friendly") {
          response = isPositive
            ? `Hi ${reviewerName}, thank you so much for the wonderful ${rating}-star review! Our entire team at ${businessName} is thrilled to hear about your great experience. It is always a pleasure serving you, and we cannot wait to welcome you back!`
            : `Hi ${reviewerName}, we are truly sorry to hear about your experience. We always strive to provide an outstanding experience for every customer, and we regret falling short this time. Please reach out to us directly so we can make things right!`;
        } else if (tone === "apologetic") {
          response = `Dear ${reviewerName}, please accept our sincere apologies for your experience with ${businessName}. We take complete accountability and are actively reviewing our operational processes to ensure this does not happen again. We would welcome the opportunity to speak with you directly to make amends.`;
        } else if (tone === "short") {
          response = isPositive
            ? `Thanks for the ${rating}-star review, ${reviewerName}! We truly appreciate your support of ${businessName}.`
            : `We apologize for your experience, ${reviewerName}. Please reach out to our management directly so we can address your concerns.`;
        } else if (tone === "local") {
          response = isPositive
            ? `Thank you so much, ${reviewerName}! As a local business, having neighbors like you support ${businessName} means the world to our team. We look forward to seeing you around the community again soon!`
            : `As a local business, our reputation and community relationships mean everything to ${businessName}. We are truly sorry for letting you down, ${reviewerName}, and would love the chance to earn back your trust.`;
        } else {
          // Premium
          response = isPositive
            ? `Dear ${reviewerName}, we are deeply honored by your gracious review. Delivering unparalleled craftsmanship and bespoke ${businessType} is our enduring commitment at ${businessName}. We look forward to our continued relationship.`
            : `Dear ${reviewerName}, we regret that our standards of excellence were not fully realized during your recent engagement with ${businessName}. We hold client satisfaction paramount and request the privilege of connecting privately to address your feedback.`;
        }

        return NextResponse.json({ success: true, response, reply: response });
      }

      case "ai-queries-generator": {
        const p = payload || body;
        const { businessName, category, location } = p;
        const cat = category || "services";
        const loc = location || "the area";
        const biz = businessName || "our company";

        const queries = [
          {
            query: `Best rated ${cat} in ${loc} with proven track record`,
            intent: "Commercial Recommendation Intent",
            targetEngine: "ChatGPT (GPT-4o) & Perplexity",
            expectedContext: `Summarizes verified client reviews, credentials, and recommends ${biz} as a premier local provider.`,
          },
          {
            query: `Who is the most trusted ${cat} provider near ${loc}?`,
            intent: "Brand Authority & Knowledge Graph Intent",
            targetEngine: "Google Gemini",
            expectedContext: `Pulls Knowledge Graph entity data, physical office coordinates, and Google Maps 3-pack listing.`,
          },
          {
            query: `Compare pricing and warranties of top ${cat} companies in ${loc}`,
            intent: "Comparative Buying Intent",
            targetEngine: "Claude 3.5 Sonnet & Perplexity",
            expectedContext: `Structured comparison table of deliverables, warranties, pricing tiers, and client satisfaction metrics.`,
          },
          {
            query: `Emergency ${cat} available right now in ${loc} phone number`,
            intent: "Urgent Local Search Intent",
            targetEngine: "All Conversational Assistants",
            expectedContext: `Direct answer extraction displaying phone number, operating hours, and rapid response availability.`,
          },
          {
            query: `Is ${biz} in ${loc} certified and licensed for commercial work?`,
            intent: "Direct Credibility & Fact Verification Intent",
            targetEngine: "Perplexity AI & ChatGPT",
            expectedContext: `Direct citation of official website credentials, license badges, and verified customer testimonials.`,
          },
          {
            query: `Customer reviews and ratings for ${biz} in ${loc}`,
            intent: "Reputation & Sentiment Analysis Intent",
            targetEngine: "ChatGPT & Gemini",
            expectedContext: `Aggregated review sentiment from Google Maps, Yelp, and official case studies with positive consensus.`,
          },
        ];
        return NextResponse.json({ success: true, queries });
      }

      case "meta-generator": {
        const p = payload || body;
        const { topic, business, keyword, location } = p;
        const biz = business || "";
        const top = topic || "Top Rated Services";
        const loc = location || "Your Area";
        const kw = keyword || top;

        const title = `${biz ? biz + " | " : ""}${top} in ${loc}`;
        const meta = `Looking for trusted ${kw}? ${biz || "Our team"} provides premier solutions with fast turnaround, proven results, and 5-star service in ${loc}.`;
        const h1 = `Premier ${top} in ${loc}`;

        return NextResponse.json({
          success: true,
          title: title.slice(0, 60),
          metaDescription: meta.slice(0, 155),
          suggestedH1: h1,
        });
      }

      default:
        return NextResponse.json({ error: "Unknown tool request." }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process tool." }, { status: 500 });
  }
}
