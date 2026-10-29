"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { QuoteModal } from "@/components/marketing/QuoteModal";
import { SERVICES_DATA, ServiceDetail } from "@/lib/data/services";
import {
  Globe,
  Bot,
  TrendingUp,
  Gamepad2,
  Code2,
  Smartphone,
  Megaphone,
  Share2,
  Video,
  ShoppingBag,
  MapPin,
  ShieldAlert,
  Database,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Filter,
} from "lucide-react";

// Icon resolver helper
function renderServiceIcon(name: string, className = "w-6 h-6") {
  switch (name) {
    case "Globe":
      return <Globe className={className} />;
    case "Bot":
      return <Bot className={className} />;
    case "TrendingUp":
      return <TrendingUp className={className} />;
    case "Gamepad2":
      return <Gamepad2 className={className} />;
    case "Code2":
      return <Code2 className={className} />;
    case "Smartphone":
      return <Smartphone className={className} />;
    case "Megaphone":
      return <Megaphone className={className} />;
    case "Share2":
      return <Share2 className={className} />;
    case "Video":
      return <Video className={className} />;
    case "ShoppingBag":
      return <ShoppingBag className={className} />;
    case "MapPin":
      return <MapPin className={className} />;
    case "ShieldAlert":
      return <ShieldAlert className={className} />;
    case "Database":
      return <Database className={className} />;
    default:
      return <Code2 className={className} />;
  }
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [targetQuoteService, setTargetQuoteService] = useState("Website Development");

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (selectedCategory === "all") return true;
    return s.category === selectedCategory;
  });

  const handleOpenQuote = (serviceTitle: string) => {
    setTargetQuoteService(serviceTitle);
    setQuoteModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Software Engineering, Cloud Systems & Growth Services</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight font-heading">
              13 World-Class Services Built for Market Dominance
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
              From enterprise custom software, automated business workflows, and trading platforms to Google Maps 3-Pack SEO and automated reputation management.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: "all", label: "All 13 Services" },
                { id: "engineering", label: "Engineering & Dev (7)" },
                { id: "ai-data", label: "Automated Systems (1)" },
                { id: "marketing", label: "Marketing & Growth (4)" },
                { id: "local-seo", label: "Local SEO & GMB (1)" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 13 Services Grid */}
        <section className="py-20 bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, idx) => (
                <div
                  key={service.slug}
                  className={`flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 group relative ${
                    service.isSaaSEntrypoint ? "ring-2 ring-teal-500/30" : ""
                  }`}
                >
                  {service.isSaaSEntrypoint && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-teal-600 text-white font-bold text-[10px] tracking-wide uppercase shadow-xs">
                      SaaS Tool Powered ($20 & $50)
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${service.color} text-white flex items-center justify-center shadow-md shadow-slate-900/5 group-hover:scale-110 transition-transform`}
                      >
                        {renderServiceIcon(service.iconName, "w-6 h-6")}
                      </div>
                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full border ${service.bgLight}`}
                      >
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-heading">
                        {service.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {service.description}
                    </p>

                    {/* Key Capabilities */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Capabilities
                      </span>
                      <ul className="space-y-1.5">
                        {service.outcomes.slice(0, 3).map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 font-medium"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions: View Details & Get Quote */}
                  <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 group-hover:border-teal-300"
                      >
                        <span>Architecture & Scope</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      <Button
                        size="sm"
                        variant={service.isSaaSEntrypoint ? "gradient" : "primary"}
                        onClick={() => handleOpenQuote(service.title)}
                      >
                        Get a Quote
                      </Button>
                    </div>

                    {service.isSaaSEntrypoint && (
                      <Link
                        href="/pricing"
                        className="block text-center text-[11px] font-bold text-teal-700 hover:text-teal-900 transition-colors pt-1"
                      >
                        Or start GMB SaaS subscription from $20/mo →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA Banner */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-teal-400" /> Transparent Discovery Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
              Have an Enterprise Specification Ready?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Book a technical scoping session directly with our senior software architects. We provide guaranteed scopes, milestone breakdowns, and fixed-price contracts.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gradient"
                size="lg"
                onClick={() => handleOpenQuote("Custom Software Engineering")}
              >
                Request Architectural Discovery Call
              </Button>
              <Link href="/portfolio">
                <Button variant="secondary" size="lg">
                  Explore Live Production Work
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={targetQuoteService}
      />
    </div>
  );
}
