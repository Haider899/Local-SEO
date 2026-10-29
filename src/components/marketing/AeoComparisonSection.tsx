import React from "react";
import { Compass, Search, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/Button";

export function AeoComparisonSection() {
  return (
    <section className="py-24 bg-white border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
            Strategic Local Optimization
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            Why Traditional SEO Alone Falls Short for <span className="text-gradient-sea">Local Businesses</span>
          </h2>
          <p className="text-base text-slate-600 font-normal">
            Local clients don't just click 10 blue links. They choose top-rated businesses on Google Maps 3-Pack and query smart assistants. Here is how our engineered approach delivers measurable market leadership:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional SEO Box */}
          <div className="p-8 rounded-3xl crystal-card space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 shadow-2xs">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">Outdated SEO Approach</h3>
                <span className="text-xs text-slate-500 font-medium">Repetitive Keywords & Slow Bloated Themes</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs">
                <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-relaxed font-normal">
                  Focusses only on blog articles while completely ignoring Google Maps proximity and local 3-pack signals.
                </span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs">
                <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-relaxed font-normal">
                  Inconsistent Name, Address, and Phone (NAP) citations across business directories that confuse Google.
                </span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs">
                <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-relaxed font-normal">
                  Misses crucial LocalBusiness JSON-LD markup and schema hierarchy needed for voice and modern discovery.
                </span>
              </div>
            </div>
          </div>

          {/* OmniRank Engineered Approach Box */}
          <div className="p-8 rounded-3xl crystal-card border-2 border-teal-400/40 space-y-6 shadow-xl shadow-teal-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-teal-700 text-white font-bold text-[10px] rounded-bl-xl uppercase tracking-wider">
              OmniRank Engineered Strategy
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-600/20">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">Local Maps + Performance Engineering</h3>
                <span className="text-xs text-teal-700 font-bold">Google Maps 3-Pack + High-Conversion Architecture</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 leading-relaxed font-medium">
                  Multi-pin Geo-Grid heatmap auditing to identify exactly which neighborhood blocks your business wins.
                </span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 leading-relaxed font-medium">
                  Continuous Google Business Profile automation: geo-tagged photo publishing, weekly updates, and review replies.
                </span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 leading-relaxed font-medium">
                  Clean schema markup (LocalBusiness + FAQPage + Service) for instant recognition across Google and voice assistants.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/dashboard/local-seo">
                <Button variant="gradient" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Local SEO Engine
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
