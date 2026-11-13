"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { ArrowUpRight, TrendingUp, Star, Globe, Award, Sparkles, CheckCircle2 } from "lucide-react";

const PROJECTS = [
  {
    id: "proj-1",
    title: "Metro Healthcare & Orthodontics",
    category: "Local SEO & GMB",
    service: "GMB + Website SEO (Package 2)",
    results: [
      { label: "Local 3-Pack Visibility", value: "+340%" },
      { label: "Google Map Calls & Directions", value: "850/mo" },
      { label: "5-Star Review Rating", value: "4.9 (310+ Reviews)" },
    ],
    description:
      "Automated weekly geo-grid ranking intelligence, AI-drafted review responses, and LocalBusiness schema implementation that propelled this practice to #1 across 28 localized keywords.",
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
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-teal-600 selection:text-white font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 relative pt-12 sm:pt-16 pb-24">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 mb-4 text-xs font-bold tracking-wider text-teal-800 uppercase rounded-full bg-teal-50 border border-teal-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Verified Case Studies
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 font-heading">
              Proven Results Across Local & Global Digital Systems
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Explore how our automated Local SEO SaaS tools, custom software engineering, and AI integrations deliver measurable revenue growth for businesses worldwide.
            </p>

            {/* Filter buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {["ALL", "Local SEO & GMB", "Website & CRM", "E-Commerce"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filter === cat
                      ? "bg-teal-700 text-white shadow-sm border border-teal-700 shadow-teal-700/20"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100/70"
                  }`}
                >
                  {cat === "ALL" ? "All Projects" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                className="group relative rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      {proj.category}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{proj.service}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-teal-700 transition-colors mb-2.5 font-heading">
                    {proj.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {proj.description}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                    {proj.results.map((res, i) => (
                      <div key={i} className="text-center">
                        <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">{res.value}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                          {res.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/pricing"
                      className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Get Similar Results</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <div className="rounded-3xl border border-teal-200/80 bg-gradient-to-tr from-teal-50/90 via-white to-emerald-50/80 p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 font-heading">
                Want to rank your business like this?
              </h3>
              <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                Start with our $20/month automated GMB SEO package or test your site for free with our Local Rank Inspector.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  href="/pricing"
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-sm"
                >
                  View Subscription Packages ($20 / $50)
                </Link>
                <Link
                  href="/free-tools/local-rank-checker"
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 transition-all shadow-2xs"
                >
                  Run Instant Free Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
