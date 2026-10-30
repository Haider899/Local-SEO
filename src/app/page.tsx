import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { HeroShowcaseSlider } from "@/components/marketing/HeroShowcaseSlider";
import { DashboardPreview } from "@/components/marketing/DashboardPreview";
import { PillarsSection } from "@/components/marketing/PillarsSection";
import { AeoComparisonSection } from "@/components/marketing/AeoComparisonSection";
import { FreeToolsShowcase } from "@/components/marketing/FreeToolsShowcase";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import {
  Sparkles,
  Zap,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            DYNAMIC HERO SHOWCASE SLIDER
           ========================================================================= */}
        <HeroShowcaseSlider />

        {/* =========================================================================
            LIVE INTERACTIVE DASHBOARD PREVIEW
           ========================================================================= */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
          <DashboardPreview />
        </section>

        {/* =========================================================================
            3 PILLARS: SEARCH + MAPS + AI
           ========================================================================= */}
        <PillarsSection />

        {/* =========================================================================
            AEO / GEO COMPARISON SECTION
           ========================================================================= */}
        <AeoComparisonSection />

        {/* =========================================================================
            12 FREE TOOLS HUB SHOWCASE
           ========================================================================= */}
        <FreeToolsShowcase />

        {/* =========================================================================
            SOCIAL PROOF & CASE STUDIES
           ========================================================================= */}
        <section className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
                Trusted by Fast-Growing Local Businesses & Agencies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl crystal-card space-y-4">
                <div className="flex items-center gap-1 text-teal-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic font-normal">
                  "Before Innovative, we had no idea ChatGPT was recommending our competitor because our robots.txt was blocking AI scrapers. Fixed it in 5 minutes with their Smart Tasks."
                </p>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Dr. Marcus Vance</div>
                    <div className="text-slate-500">Austin Smile Institute</div>
                  </div>
                  <span className="text-teal-700 font-bold">+42% AI Inquiries</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl crystal-card space-y-4">
                <div className="flex items-center gap-1 text-teal-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic font-normal">
                  "The Geo-Grid 3-pack heatmap is hands down the cleanest visualizer I've seen. Clients immediately understand why they need local schema and review velocity."
                </p>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Elena Rostova</div>
                    <div className="text-slate-500">Director, PeakScale Digital Agency</div>
                  </div>
                  <span className="text-emerald-700 font-bold">18 Client Portals</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl crystal-card space-y-4">
                <div className="flex items-center gap-1 text-teal-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic font-normal">
                  "The free schema generators and review repliers alone are worth hundreds a month. Innovative bridges the gap between old-school SEO and modern AI search."
                </p>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Brett Campbell</div>
                    <div className="text-slate-500">Founder, Campbell Home Services</div>
                  </div>
                  <span className="text-teal-700 font-bold">#1 Google Maps Rank</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL CALL TO ACTION BANNER (CRYSTAL LIQUID GLASS ON PURE WHITE)
           ========================================================================= */}
        <section className="py-20 relative overflow-hidden bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-14 rounded-3xl crystal-card border-2 border-teal-400/30 shadow-[0_25px_60px_-15px_rgba(13,148,136,0.18)] text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400/10 blur-[100px] rounded-full pointer-events-none" />
              
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/80">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Start in 30 seconds
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading max-w-3xl mx-auto">
                Ready to dominate <span className="text-gradient-sea">Local Search</span> & <span className="text-gradient-mint">Google Maps</span>?
              </h2>

              <p className="text-sm sm:text-base text-teal-900/80 max-w-xl mx-auto font-normal">
                Join high-performing local businesses and agencies accelerating customer acquisition with Innovative.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link href="/#audit-section">
                  <Button variant="gradient" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Run Free Audit Now
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="border-teal-300 text-teal-800 hover:bg-teal-50" leftIcon={<Zap className="w-4 h-4 text-emerald-600" />}>
                    Explore Live Dashboard Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
