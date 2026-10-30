import React from "react";
import { Search, MapPin, Cpu, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function PillarsSection() {
  const pillars = [
    {
      icon: Search,
      title: "1. Google Search & Web SEO",
      tagline: "Organic SERP Dominance",
      description:
        "High-ranking meta architecture, clean internal link graphs, mobile Core Web Vitals speed, and semantic H1-H6 schema hierarchy.",
      color: "teal",
      badge: "Core Foundation",
      metrics: ["Technical Core Web Vitals", "Title & Meta Structure", "Crawl Budget & Indexing Health"],
      link: "/#audit-section",
      cta: "Analyze Site SEO",
    },
    {
      icon: MapPin,
      title: "2. Google Maps & Local 3-Pack",
      tagline: "Neighborhood Proximity & Authority",
      description:
        "LocalBusiness JSON-LD markup, geo-coordinates, NAP consistency verification, and multi-node geo-grid rank tracking.",
      color: "emerald",
      badge: "Highest Conversion",
      metrics: ["Geo-Grid Rank Heatmaps", "NAP Consistency Health", "Google Business Profile Signals"],
      link: "/dashboard/local-seo",
      cta: "Explore Local Grid",
    },
    {
      icon: Cpu,
      title: "3. Voice & Modern Discovery",
      tagline: "Entity Authority & Conversational Mentions",
      description:
        "Ensure your brand entity is structured and recognized so conversational assistants and voice search recommend your local business.",
      color: "mint",
      badge: "Discovery Channel",
      metrics: ["Entity & Schema Graph Parsing", "Local FAQ Structured Data", "Brand Citation Accuracy"],
      link: "/dashboard/ai-visibility",
      cta: "Check Discovery Readiness",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
            Unified Local Growth Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            One Unified Engine for <span className="text-gradient-sea">Search</span>, <span className="text-gradient-mint">Maps</span>, and Discovery
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Local buyers no longer rely on a single channel. They query Google Maps, check website speed and reviews, and ask smart assistants. Innovative provides the engineering and optimization engine to win all three.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const isEmerald = pillar.color === "emerald";
            const iconBg = isEmerald ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-teal-50 text-teal-600 border-teal-200";
            const taglineColor = isEmerald ? "text-emerald-700" : "text-teal-700";

            return (
              <div
                key={i}
                className="p-8 rounded-3xl crystal-card transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl border ${iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-heading">{pillar.title}</h3>
                  <div className={`text-xs font-bold mb-3 ${taglineColor}`}>{pillar.tagline}</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">{pillar.description}</p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                    {pillar.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={pillar.link}
                  className="flex items-center justify-between text-xs font-bold text-teal-900 p-3 rounded-xl bg-teal-50/60 hover:bg-teal-100/70 border border-teal-200/80 transition-colors group shadow-xs"
                >
                  <span>{pillar.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-teal-600" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
