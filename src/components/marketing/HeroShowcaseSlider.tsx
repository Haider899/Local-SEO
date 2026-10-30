"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeroScanner } from "./HeroScanner";
import { Button } from "@/ui/Button";
import {
  Sparkles,
  Search,
  MapPin,
  Bot,
  Code2,
  Cpu,
  Rocket,
  ShieldCheck,
  Zap,
  Calendar,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Layers,
  Users,
  Shield,
} from "lucide-react";

interface SlideData {
  id: number;
  badge: string;
  badgeIcon: any;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  subtext: string;
  tagline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  themeColor: string;
  ambientGlow: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    badge: "Local Search & Google Maps Growth",
    badgeIcon: Search,
    headlinePrefix: "Dominate your local market on ",
    headlineHighlight: "Google Maps, Local 3-Pack & Web Search.",
    headlineSuffix: "",
    subtext:
      "A high-performance software platform engineered to track local map rankings, automate GMB updates, and turn searchers into high-paying phone calls and store visits.",
    tagline: "Real-time Google 3-Pack & Citation Intelligence",
    primaryCtaText: "Run Free Audit Now",
    primaryCtaLink: "#audit-section",
    secondaryCtaText: "Explore Live Dashboard",
    secondaryCtaLink: "/dashboard",
    themeColor: "from-teal-600 via-emerald-500 to-sky-500",
    ambientGlow: "bg-teal-500/15",
  },
  {
    id: 2,
    badge: "Custom Software & Web Engineering",
    badgeIcon: Code2,
    headlinePrefix: "We engineer resilient ",
    headlineHighlight: "Web Applications, Custom CRM/ERP & Cloud Platforms.",
    headlineSuffix: "",
    subtext:
      "Built by senior software engineers. We build high-throughput backends, modern customer-facing web apps, trading tools, and workflow automation systems.",
    tagline: "Bespoke Enterprise Software Architecture",
    primaryCtaText: "Explore Engineering Services",
    primaryCtaLink: "/services",
    secondaryCtaText: "View Case Studies",
    secondaryCtaLink: "/case-studies",
    themeColor: "from-teal-700 via-cyan-600 to-sky-500",
    ambientGlow: "bg-cyan-500/15",
  },
  {
    id: 3,
    badge: "Google Business Automation Hub",
    badgeIcon: MapPin,
    headlinePrefix: "Effortlessly manage your ",
    headlineHighlight: "Google Business Profile & Review Velocity.",
    headlineSuffix: "",
    subtext:
      "Consistent weekly updates, geo-tagged photo uploads, and professional customer review replies using official Google APIs with zero password storage.",
    tagline: "Official Google Business Profile Integration",
    primaryCtaText: "Start GMB Automation",
    primaryCtaLink: "/dashboard/local-seo",
    secondaryCtaText: "Try Free 12 Tools",
    secondaryCtaLink: "/free-tools",
    themeColor: "from-emerald-600 via-teal-500 to-cyan-500",
    ambientGlow: "bg-emerald-500/15",
  },
];

export function HeroShowcaseSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const SLIDE_DURATION = 3500; // 3.5 seconds per slide for smooth human readability

  // Auto-advance slides every 3.5 seconds with live progress tracking
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const slide = SLIDES[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  return (
    <section
      className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-white border-b border-slate-200/70"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Ambient Blur Mesh */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] ${slide.ambientGlow} blur-[140px] -z-10 rounded-full transition-all duration-700 pointer-events-none`}
      />

      {/* Subtle Grid Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        {/* Slide Selector Pill Bar with Smooth Progress Bar (Apple-style interactive switcher) */}
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full crystal-pill border border-teal-500/20 shadow-[0_4px_20px_-4px_rgba(13,148,136,0.15)] animate-in fade-in slide-in-from-bottom-2">
          {SLIDES.map((s, idx) => {
            const SIcon = s.badgeIcon;
            const isActive = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectSlide(idx)}
                className={`relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-teal-900 text-white shadow-md shadow-teal-950/20 scale-100"
                    : "text-slate-600 hover:text-teal-900 hover:bg-teal-50/70 scale-95 opacity-85"
                }`}
              >
                {/* 3-second animated progress background on active pill */}
                {isActive && !isPaused && (
                  <div
                    className="absolute inset-0 bg-teal-400/40 transition-all duration-75 pointer-events-none rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <SIcon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "text-teal-300" : "text-slate-400"}`} />
                <span className="hidden sm:inline relative z-10">{s.badge}</span>
                <span className="sm:hidden relative z-10">0{s.id}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse relative z-10" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Main Headline with Smooth Fade Transition */}
        <div className="space-y-4 max-w-4xl mx-auto min-h-[140px] sm:min-h-[160px] flex flex-col justify-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] transition-all duration-500 font-heading">
            {slide.headlinePrefix}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.themeColor} transition-all duration-500`}
            >
              {slide.headlineHighlight}
            </span>
            {slide.headlineSuffix}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed transition-all duration-500">
            {slide.subtext}
          </p>
        </div>

        {/* Slide Interactive Showcase Area */}
        <div className="pt-2">
          {currentSlide === 0 && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <HeroScanner />
            </div>
          )}

          {currentSlide === 1 && (
            <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl crystal-card border border-teal-500/20 shadow-xl shadow-teal-500/5 space-y-6 text-left animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-500 ml-2">innovative::distributed-core::service-mesh</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  Engineered by Senior Architects
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 space-y-1">
                  <div className="text-teal-700/70 text-[10px] uppercase font-bold">Throughput Capacity</div>
                  <div className="text-base font-bold text-teal-800 font-sans">10,000+ TPS</div>
                  <div className="text-teal-900/70 text-[11px]">Sub-100ms API Latency</div>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 space-y-1">
                  <div className="text-teal-700/70 text-[10px] uppercase font-bold">Database & Storage</div>
                  <div className="text-base font-bold text-teal-800 font-sans">PostgreSQL + Redis</div>
                  <div className="text-teal-900/70 text-[11px]">Enterprise High-Availability</div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                  <div className="text-emerald-700/70 text-[10px] uppercase font-bold">Security Standard</div>
                  <div className="text-base font-bold text-emerald-800 font-sans">SSRF + Zero Trust</div>
                  <div className="text-emerald-900/70 text-[11px]">AES-256 Vault Encrypted</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-slate-600 font-medium">
                  Need a dedicated software engineering team or custom web application?
                </span>
                <Link href="/services">
                  <Button variant="gradient" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Explore All Services
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {currentSlide === 2 && (
            <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl crystal-card border border-teal-500/20 shadow-xl shadow-teal-500/5 space-y-6 text-left animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-900 font-heading">Google Business Profile Automation Hub</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Official Google OAuth2 Safe
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-950">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>Scheduled GBP Posts & Media</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Generate seasonal updates, service highlights & business imagery with human-review before publishing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Smart Review Replier</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Turn customer feedback into keyword-dense local trust signals that elevate Google Maps 3-Pack authority.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-slate-600 font-medium">
                  Manage multiple business locations without ever exposing your Google password.
                </span>
                <Link href="/dashboard/local-seo">
                  <Button variant="gradient" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Open Local SEO Suite
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Humanized Trust Proof Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-600" />
            <span>Zero-risk SSRF sandbox crawler</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Official Google Business OAuth2</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-700" />
            <span>Human-Reviewed Content Workflows</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Enterprise 99.99% SLA Uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
