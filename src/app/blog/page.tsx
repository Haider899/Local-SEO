import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

const ARTICLES = [
  {
    slug: "gmb-local-ranking-factors-2026",
    title: "The Ultimate Guide to Google Business Profile Ranking Factors in 2026",
    excerpt: "Discover how AI-driven search, review velocity, and geo-grid proximity algorithms decide who makes the Local 3-Pack.",
    date: "October 2026",
    readTime: "7 min read",
    category: "Local SEO",
  },
  {
    slug: "geo-grid-heatmaps-explained",
    title: "Why 5x5 Geo-Grid Heatmaps Beat Traditional Keyword Rank Trackers",
    excerpt: "A single ranking number is misleading. Learn how coordinate-based spatial analysis reveals hidden blind spots in your service area.",
    date: "October 2026",
    readTime: "5 min read",
    category: "Geo-Grid Intelligence",
  },
  {
    slug: "ai-review-response-strategy",
    title: "How Automated AI Review Replies Directly Impact Google Map Conversions",
    excerpt: "Response speed and sentiment alignment are primary trust signals for Google crawlers. Here is how to automate replies safely.",
    date: "September 2026",
    readTime: "6 min read",
    category: "Reputation Management",
  },
];

export default function BlogPage() {
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
              Insights & Engineering
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 font-heading">
              Latest Articles on Local SEO & AI Architecture
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Expert guides on ranking local businesses, automating Google Business Profile management, and technical SEO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ARTICLES.map((art) => (
              <div
                key={art.slug}
                className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs flex flex-col justify-between hover:border-teal-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      {art.category}
                    </span>
                    <div className="flex items-center text-xs text-slate-500 font-medium gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {art.readTime}
                    </div>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-3 hover:text-teal-700 transition-colors font-heading leading-snug">
                    {art.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {art.date}
                  </span>
                  <Link href="/pricing" className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
