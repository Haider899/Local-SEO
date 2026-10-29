import React from "react";
import Link from "next/link";
import {
  MapPin,
  FileCode2,
  Code2,
  HelpCircle,
  MessageSquare,
  FileText,
  FileCheck2,
  Search,
  Bot,
  Star,
  Sparkles,
  Compass,
  ArrowRight,
} from "lucide-react";

export const FREE_TOOLS_LIST = [
  {
    id: "local-rank-checker",
    name: "Local Maps Geo-Grid Checker",
    description: "Inspect Google Maps 3-Pack rankings across a 25-node GPS matrix with distance decay.",
    icon: MapPin,
    category: "Local SEO",
    href: "/free-tools/local-rank-checker",
  },
  {
    id: "meta-tag-analyzer",
    name: "SEO Meta Tag Previewer",
    description: "Inspect live SERP desktop and mobile title/snippet previews from any URL.",
    icon: FileText,
    category: "On-Page SEO",
    href: "/free-tools/meta-tag-analyzer",
  },
  {
    id: "local-business-schema-generator",
    name: "LocalBusiness Schema Builder",
    description: "Generate verified JSON-LD structured data with NAP, geo-coords, and hours.",
    icon: Code2,
    category: "Schema / Code",
    href: "/free-tools/local-business-schema-generator",
  },
  {
    id: "faq-schema-generator",
    name: "FAQ Schema (AEO) Generator",
    description: "Build Google and ChatGPT-compliant FAQPage JSON-LD rich snippets in seconds.",
    icon: HelpCircle,
    category: "AI / AEO",
    href: "/free-tools/faq-schema-generator",
  },
  {
    id: "review-response-generator",
    name: "Customer Review Reply Generator",
    description: "Generate 5-star customer review replies personalized across 6 distinct brand tones.",
    icon: MessageSquare,
    category: "Reputation & AI",
    href: "/free-tools/review-response-generator",
  },
  {
    id: "robots-txt-checker",
    name: "Robots.txt & AI Bot Validator",
    description: "Inspect live robots.txt directives for GPTBot, ClaudeBot, and PerplexityBot crawler access.",
    icon: FileCode2,
    category: "Technical SEO",
    href: "/free-tools/robots-txt-checker",
  },
  {
    id: "sitemap-validator",
    name: "XML Sitemap Inspector",
    description: "Verify your XML sitemap for broken URLs, canonical integrity, and HTTP response codes.",
    icon: FileCheck2,
    category: "Technical SEO",
    href: "/free-tools/sitemap-validator",
  },
  {
    id: "website-seo-analyzer",
    name: "Rapid SEO Health Scanner",
    description: "Live on-page crawl inspecting title, H1s, alt tags, schema, and page response speed.",
    icon: Search,
    category: "On-Page SEO",
    href: "/free-tools/website-seo-analyzer",
  },
  {
    id: "ai-visibility-checker",
    name: "AI Visibility & Crawler Inspector",
    description: "Inspect whether ChatGPT, Perplexity, Claude, or Gemini crawlers can access and cite your live domain.",
    icon: Bot,
    category: "AI Visibility",
    href: "/free-tools/ai-visibility-checker",
  },
  {
    id: "google-business-profile-audit",
    name: "Google Business Profile Audit",
    description: "Evaluate your listing completeness, category selection, and local ranking signals.",
    icon: Star,
    category: "Local SEO",
    href: "/free-tools/google-business-profile-audit",
  },
  {
    id: "title-meta-generator",
    name: "AI Title & Meta Generator",
    description: "Generate high-CTR SERP titles and descriptions optimized for search character limits.",
    icon: Sparkles,
    category: "On-Page SEO",
    href: "/free-tools/title-meta-generator",
  },
  {
    id: "ai-search-query-generator",
    name: "AI Search Query Generator",
    description: "Discover conversational prompts potential buyers ask ChatGPT and Perplexity about your service.",
    icon: Compass,
    category: "AI / AEO",
    href: "/free-tools/ai-search-query-generator",
  },
];

export function FreeToolsShowcase() {
  return (
    <section className="py-24 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              100% Free SEO & AI Utility Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 font-heading">
              12 Free Tools for <span className="text-gradient-sea">Search, Maps</span> & <span className="text-gradient-mint">Discovery</span>
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl font-normal">
              No credit card required. Generate verified schema, optimize meta tags, test live robots.txt AI permissions, and evaluate local rankings.
            </p>
          </div>

          <Link
            href="/free-tools"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>View all 12 free tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FREE_TOOLS_LIST.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="p-5 rounded-2xl crystal-card hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-100/80 transition-colors border border-teal-200/80">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50/60 text-teal-800 border border-teal-200/50">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-1 font-heading">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-900/80 group-hover:text-teal-700">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
