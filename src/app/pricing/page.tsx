"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { CheckCircle2, Sparkles, Zap, ArrowRight, ShieldCheck, MapPin, Globe } from "lucide-react";
import { PackageRecord } from "@/lib/data/repository";

const FALLBACK_PACKAGES: PackageRecord[] = [
  {
    id: "pkg_1",
    name: "Package 1 — GMB SEO",
    price: 20,
    cadence: "per month / billed monthly",
    badge: "Core GMB Automation",
    description: "Full Google Business Profile setup, weekly AI posting, review replies, and local ranking intelligence.",
    highlight: false,
    ctaText: "Get Started ($20/mo)",
    ctaLink: "/register?plan=pkg_1",
    features: [
      "Full Google Business Profile setup & optimization",
      "Weekly AI-generated posts (service/offer/FAQ/seasonal)",
      "Automatic, personalized replies to every review",
      "Review growth system (automated customer requests)",
      "Q&A monitoring & automated response drafts",
      "5x5 Local ranking map across your service area",
      "AI-powered weekly action plan",
      "Monthly performance report (calls, clicks, directions)",
      "Auto Mode or Approval Mode (switch anytime)",
    ],
  },
  {
    id: "pkg_2",
    name: "Package 2 — GMB + Website SEO",
    price: 50,
    cadence: "per month / billed monthly",
    badge: "Full Dominance",
    description: "Everything in Package 1 plus complete technical website SEO auditing, on-page recommendations, and combined reporting.",
    highlight: true,
    ctaText: "Get GMB + Website ($50/mo)",
    ctaLink: "/register?plan=pkg_2",
    features: [
      "Everything included in Package 1 ($20/mo)",
      "Full website SEO audit (speed, mobile, meta tags, schema)",
      "On-page SEO recommendations & code snippets",
      "Combined GMB + Website monthly performance report",
      "Local landing page optimization guidance",
      "Priority crawling & automated technical alerts",
    ],
  },
];

export default function PricingPage() {
  const [packages, setPackages] = useState<PackageRecord[]>(FALLBACK_PACKAGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        if (data.success && data.packages && data.packages.length > 0) {
          setPackages(data.packages);
        }
      } catch (err) {
        console.warn("Using fallback packages:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" /> GMB SEO SaaS Subscriptions
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-heading">
              Transparent, High-ROI Local SEO Software
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Automate your Google Business Profile rankings, reviews, and posts. Upgrade to Package 2 for comprehensive website on-page technical optimization.
            </p>
          </div>

          {/* Pricing Cards Grid (2 Canonical Plans) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {packages.map((plan) => (
              <div
                key={plan.id}
                className={`p-8 sm:p-10 rounded-3xl flex flex-col justify-between transition-all duration-300 relative bg-white border ${
                  plan.highlight
                    ? "border-2 border-teal-600 shadow-2xl scale-[1.02] z-10 ring-4 ring-teal-50"
                    : "border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-teal-600 text-white font-bold text-xs shadow-md uppercase tracking-wider">
                    {plan.badge || "RECOMMENDED"}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    {!plan.highlight && (
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        {plan.badge}
                      </span>
                    )}
                    <h3 className="text-2xl font-black text-slate-900 font-heading">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1.5 pb-4 border-b border-slate-100">
                    <span className="text-5xl font-black text-slate-900 font-heading">${plan.price}</span>
                    <span className="text-xs text-slate-500 font-medium">{plan.cadence}</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Included In This Plan:</span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link href={plan.ctaLink || `/register?plan=${plan.id}`}>
                    <Button
                      variant={plan.highlight ? "gradient" : "secondary"}
                      size="lg"
                      className="w-full font-bold"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {plan.ctaText || `Choose ${plan.name}`}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Comparison Feature Table */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-slate-900 text-center font-heading">
              Side-by-Side Feature Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Feature Capability</th>
                    <th className="py-3 px-4 text-center">Package 1 ($20/mo)</th>
                    <th className="py-3 px-4 text-center text-teal-700">Package 2 ($50/mo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  <tr>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      Google Business Profile Setup & Optimization
                    </td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Weekly High-Quality Local Posts (Rotating Topics)</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Automatic Personalized Review Replies</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">5x5 Geo-Grid Ranking Heatmap Visualizer</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Auto Mode & Approval Mode Flexibility</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  </tr>
                  <tr className="bg-teal-50/40">
                    <td className="py-3 px-4 flex items-center gap-2 font-bold text-slate-900">
                      <Globe className="w-3.5 h-3.5 text-teal-600" />
                      Full Website SEO Audit (Speed, Mobile, Schema)
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400">—</td>
                    <td className="py-3 px-4 text-center text-teal-800 font-bold">✓ Advanced Crawl</td>
                  </tr>
                  <tr className="bg-teal-50/40">
                    <td className="py-3 px-4 font-bold text-slate-900">On-Page Technical SEO Recommendations</td>
                    <td className="py-3 px-4 text-center text-slate-400">—</td>
                    <td className="py-3 px-4 text-center text-teal-800 font-bold">✓ Included</td>
                  </tr>
                  <tr className="bg-teal-50/40">
                    <td className="py-3 px-4 font-bold text-slate-900">Combined GMB + Website Monthly Report</td>
                    <td className="py-3 px-4 text-center text-slate-400">—</td>
                    <td className="py-3 px-4 text-center text-teal-800 font-bold">✓ Comprehensive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Guarantee / Trust Badge */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 max-w-2xl mx-auto flex items-center justify-center gap-4 text-center text-xs text-slate-600 shadow-xs">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>
              <strong>14-Day Money Back Guarantee:</strong> If our automated GMB SEO tool doesn't improve your local map presence, request a 100% full refund at any time.
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
