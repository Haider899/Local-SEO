"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { ArrowUpRight, TrendingUp, Star, Globe, Award, Sparkles } from "lucide-react";

const PROJECTS = [
  {
    id: "proj-1",
    title: "Apex Dental & Orthodontics",
    category: "Local SEO & GMB",
    service: "GMB + Website SEO (Package 2)",
    results: [
      { label: "Local 3-Pack Visibility", value: "+340%" },
      { label: "Google Map Calls & Directions", value: "850/mo" },
      { label: "5-Star Review Rating", value: "4.9 (310+ Reviews)" },
    ],
    description:
      "Automated weekly geo-grid ranking intelligence, AI-drafted review responses, and LocalBusiness schema implementation that propelled this Austin dental practice to #1 across 28 localized keywords.",
    tags: ["5x5 Geo-Grid", "AI Review Manager", "Schema Generator"],
  },
  {
    id: "proj-2",
    title: "Solaria Commercial Power",
    category: "Website & CRM",
    service: "CRM & ERP Systems Development",
    results: [
      { label: "Lead Qualification Speed", value: "12x Faster" },
      { label: "Closed Contract Pipeline", value: "$4.2M" },
      { label: "Dispatch Latency", value: "<15 mins" },
    ],
    description:
      "Custom end-to-end solar installation dispatch portal with real-time field technician tracking, automated quote estimations, and multi-currency billing integration.",
    tags: ["Custom ERP", "Dispatch Portal", "Real-time Sync"],
  },
  {
    id: "proj-3",
    title: "Modern Home Plumbing & HVAC",
    category: "Local SEO & GMB",
    service: "GMB SEO (Package 1)",
    results: [
      { label: "Google Maps Actions", value: "+210%" },
      { label: "Share of Voice in Service Area", value: "88%" },
      { label: "Average Rank Across 5-Mile Grid", value: "#1.8" },
    ],
    description:
      "Targeted multi-quadrant GBP updates and automated customer review generation campaigns, capturing dominant market share for emergency plumbing and AC repair.",
    tags: ["Weekly AI Posts", "Review Growth System", "Local Finder"],
  },
  {
    id: "proj-4",
    title: "Aurelia Luxury Fine Jewelry",
    category: "E-Commerce",
    service: "Shopify Creation & Management",
    results: [
      { label: "Online Store Conversion", value: "+180%" },
      { label: "Mobile PageSpeed Score", value: "98/100" },
      { label: "Average Order Value", value: "$1,450" },
    ],
    description:
      "High-performance bespoke Shopify Plus storefront with bespoke 3D ring visualizer, dynamic cart drawer, and automated post-purchase loyalty workflows.",
    tags: ["Shopify Plus", "3D Customizer", "Speed Optimized"],
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.category.includes(filter));

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="relative pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3.5 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase rounded-full bg-blue-500/10 border border-blue-500/20">
              Verified Case Studies
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Proven Results Across Local & Global Digital Systems
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Explore how our automated Local SEO SaaS tools, custom software engineering, and AI integrations deliver measurable revenue growth for businesses worldwide.
            </p>

            {/* Filter buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["ALL", "Local SEO & GMB", "Website & CRM", "E-Commerce"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    filter === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500"
                      : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {cat === "ALL" ? "All Projects" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="info">{proj.category}</Badge>
                  <span className="text-xs text-slate-500 font-medium">{proj.service}</span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
                  {proj.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {proj.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 mb-6">
                  {proj.results.map((res, i) => (
                    <div key={i} className="text-center">
                      <p className="text-lg font-extrabold text-white">{res.value}</p>
                      <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                        {res.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-800 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Button variant="ghost" href="/pricing" className="text-xs p-0 text-blue-400 hover:text-blue-300">
                    Get Similar Results <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl max-w-2xl">
              <Sparkles className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Want to rank your business like this?</h3>
              <p className="text-sm text-slate-400 mb-6">
                Start with our $20/month automated GMB SEO package or test your site for free with our SEO Checker.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="primary" href="/pricing">
                  View Subscription Packages ($20 / $50)
                </Button>
                <Button variant="outline" href="/free-tools/local-rank-checker">
                  Run Instant Free Audit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

