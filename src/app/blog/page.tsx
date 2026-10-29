import React from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main className="relative pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3.5 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase rounded-full bg-blue-500/10 border border-blue-500/20">
              Insights & Engineering
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Latest Articles on Local SEO & AI Architecture
            </h1>
            <p className="text-lg text-slate-400">
              Expert guides on ranking local businesses, automating Google Business Profile management, and technical SEO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((art) => (
              <div
                key={art.slug}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-blue-500/40 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="info">{art.category}</Badge>
                    <div className="flex items-center text-xs text-slate-500 gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {art.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {art.date}
                  </span>
                  <Link href="/pricing" className="text-xs font-semibold text-blue-400 flex items-center hover:underline">
                    Read Article <ArrowRight className="ml-1 h-3.5 w-3.5" />
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

