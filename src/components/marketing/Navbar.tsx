"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Search,
  Bot,
  Layers,
  Wrench,
  ChevronDown,
  Menu,
  X,
  Zap,
  Code2,
  Cpu,
  Rocket,
  ShieldCheck,
  ArrowRight,
  Globe,
  Building,
  Users,
  TrendingUp,
  Gamepad2,
  Smartphone,
  Megaphone,
  Share2,
  Video,
  ShoppingBag,
  ShieldAlert,
  Database,
  BarChart3,
} from "lucide-react";

import { useAuth } from "@/lib/context/AuthContext";

type DropdownKey = "services" | "platform" | "company" | null;

export function Navbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [storedUser, setStoredUser] = useState<any>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("omni_auth_user");
      if (raw) {
        setStoredUser(JSON.parse(raw));
      }
    } catch {
      // Ignore
    }
  }, [user]);

  const isLoggedIn = Boolean(user || storedUser);
  const userDisplayName = user?.displayName || storedUser?.name || "User";
  const userAvatar = user?.photoURL || storedUser?.avatar || null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setIsPinned(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setIsPinned(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Dropdown hover & click handlers
  const handleMouseEnter = (key: DropdownKey) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    // If pinned by click, do NOT close on mouse leave (keeps static)
    if (isPinned) return;
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleDropdown = (key: DropdownKey) => {
    if (activeDropdown === key) {
      if (isPinned) {
        // Toggle closed
        setActiveDropdown(null);
        setIsPinned(false);
      } else {
        // Pin static
        setIsPinned(true);
      }
    } else {
      // Open and pin static
      setActiveDropdown(key);
      setIsPinned(true);
    }
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    setIsPinned(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      <nav
        ref={navContainerRef}
        className={`bg-white/95 backdrop-blur-md border-b border-slate-200/70 transition-all duration-300 ${
          scrolled ? "py-2.5 shadow-md" : "py-3.5 shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Minimalist Apple-Style Brand Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" onClick={closeDropdown} className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-all text-white">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-slate-900">
                    Innova<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">tive</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Engineering & Local SEO
                  </span>
                </div>
              </Link>

              {/* Desktop Menu Items */}
              <div className="hidden lg:flex items-center gap-1">
                {/* 1. Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("services")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown("services")}
                    aria-expanded={activeDropdown === "services"}
                    className={`flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      activeDropdown === "services"
                        ? "bg-slate-900/[0.08] text-slate-900 ring-1 ring-slate-900/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04]"
                    }`}
                  >
                    Services
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        activeDropdown === "services" ? "rotate-180 text-slate-800" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Container: pt-2 eliminates hover gap so cursor movement never closes menu */}
                  {activeDropdown === "services" && (
                    <div className="absolute top-full -left-20 pt-2 z-50">
                      <div className="w-[680px] p-4 bg-white rounded-3xl shadow-2xl border border-slate-200/90 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                          {/* Column 1: Engineering & Development */}
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 pb-1">
                              Engineering & Development
                            </div>
                            {[
                              { slug: "website-development", title: "Website Development", icon: Globe, color: "text-sky-600 bg-sky-50" },
                              { slug: "software-development", title: "Software Development", icon: Code2, color: "text-blue-600 bg-blue-50" },
                              { slug: "app-development", title: "App Development", icon: Smartphone, color: "text-purple-600 bg-purple-50" },
                              { slug: "trading-web-development", title: "Trading Web Development", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
                              { slug: "real-cash-game-development", title: "Real Cash Game Dev", icon: Gamepad2, color: "text-amber-600 bg-amber-50" },
                              { slug: "shopify-development", title: "Shopify Creation & Ops", icon: ShoppingBag, color: "text-teal-600 bg-teal-50" },
                              { slug: "crm-erp-development", title: "CRM & ERP Systems", icon: Database, color: "text-cyan-600 bg-cyan-50" },
                            ].map((item) => (
                              <Link
                                key={item.slug}
                                href={`/services/${item.slug}`}
                                onClick={closeDropdown}
                                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className={`p-1.5 rounded-lg ${item.color}`}>
                                  <item.icon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-teal-700 truncate">
                                  {item.title}
                                </span>
                              </Link>
                            ))}
                          </div>

                          {/* Column 2: Growth & Intelligent Systems */}
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 pb-1">
                              Growth & Intelligent Systems
                            </div>
                            {[
                              { slug: "local-seo", title: "Local SEO (GMB + Web)", icon: MapPin, color: "text-teal-700 bg-teal-50", badge: "SaaS" },
                              { slug: "ai-agents-development", title: "AI Agents Development", icon: Bot, color: "text-emerald-700 bg-emerald-50" },
                              { slug: "reputation-management", title: "Reputation Management", icon: ShieldAlert, color: "text-rose-600 bg-rose-50" },
                              { slug: "ads-management", title: "Google & Meta Ads", icon: Megaphone, color: "text-red-600 bg-red-50" },
                              { slug: "social-media-management", title: "Social Media Management", icon: Share2, color: "text-pink-600 bg-pink-50" },
                              { slug: "ai-video-creation", title: "AI Video Creation", icon: Video, color: "text-cyan-700 bg-cyan-50" },
                            ].map((item) => (
                              <Link
                                key={item.slug}
                                href={`/services/${item.slug}`}
                                onClick={closeDropdown}
                                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`p-1.5 rounded-lg ${item.color}`}>
                                    <item.icon className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="text-xs font-semibold text-slate-800 group-hover:text-teal-700 truncate">
                                    {item.title}
                                  </span>
                                </div>
                                {item.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            ))}

                            <div className="mt-2 p-3 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-1">
                              <div className="text-[11px] font-bold text-teal-950">Need an automated solution?</div>
                              <Link
                                href="/pricing"
                                onClick={closeDropdown}
                                className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
                              >
                                <span>Check GMB SaaS Packages ($20 / $50)</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2.5 mt-2 border-t border-slate-100 px-2 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">All 13 enterprise solutions available</span>
                          <Link
                            href="/services"
                            onClick={closeDropdown}
                            className="font-bold text-teal-700 hover:text-teal-900"
                          >
                            View All 13 Services Overview →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. SaaS Platform Dropdown (Updated with 2 columns, solid bg-white, and rich cards matching Services) */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("platform")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown("platform")}
                    aria-expanded={activeDropdown === "platform"}
                    className={`flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      activeDropdown === "platform"
                        ? "bg-slate-900/[0.08] text-slate-900 ring-1 ring-slate-900/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04]"
                    }`}
                  >
                    Platform
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        activeDropdown === "platform" ? "rotate-180 text-slate-800" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Container: pt-2 eliminates hover gap so cursor movement never closes menu */}
                  {activeDropdown === "platform" && (
                    <div className="absolute top-full -left-24 pt-2 z-50">
                      <div className="w-[660px] p-4 bg-white rounded-3xl shadow-2xl border border-slate-200/90 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                          {/* Column 1: Core Intelligence Engines */}
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 pb-1">
                              Core Intelligence Engines
                            </div>
                            {[
                              {
                                href: "/dashboard/local-seo",
                                title: "Google Maps & GMB 3-Pack Hub",
                                desc: "Automated updates, reviews & Geo-Grid",
                                icon: MapPin,
                                color: "text-teal-700 bg-teal-50",
                                badge: "Core SaaS",
                              },
                              {
                                href: "/dashboard/ai-visibility",
                                title: "AI Visibility & AEO Engine",
                                desc: "Track ChatGPT, Perplexity & Gemini citations",
                                icon: Bot,
                                color: "text-emerald-700 bg-emerald-50",
                                badge: "AI Radar",
                              },
                              {
                                href: "/dashboard/rank-tracker",
                                title: "SERP Rank Tracker",
                                desc: "Keyword rankings & SERP feature radar",
                                icon: Layers,
                                color: "text-amber-600 bg-amber-50",
                                badge: "Live Grid",
                              },
                              {
                                href: "/#audit-section",
                                title: "Technical Site Audit",
                                desc: "Real-time health scanner, schema & Core Web Vitals",
                                icon: Search,
                                color: "text-sky-600 bg-sky-50",
                              },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeDropdown}
                                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className={`p-1.5 rounded-lg ${item.color} mt-0.5`}>
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 truncate">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-teal-50 text-teal-800 border border-teal-200">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-normal leading-snug truncate">
                                    {item.desc}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Column 2: Growth Tools & Multi-Location Workspace */}
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 pb-1">
                              Growth Tools & Workspace
                            </div>
                            {[
                              {
                                href: "/free-tools",
                                title: "12 Free SEO Tools Hub",
                                desc: "Schema builder, NAP auditor, meta analyzer",
                                icon: Wrench,
                                color: "text-indigo-600 bg-indigo-50",
                                badge: "12 Tools",
                              },
                              {
                                href: "/dashboard",
                                title: "Multi-Location Workspace",
                                desc: "Unified dashboard for single or 100+ stores",
                                icon: Building,
                                color: "text-purple-600 bg-purple-50",
                              },
                              {
                                href: "/dashboard",
                                title: "Lead & ROI Analytics",
                                desc: "Conversion tracking, calls & ranking gains",
                                icon: BarChart3,
                                color: "text-blue-600 bg-blue-50",
                              },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeDropdown}
                                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className={`p-1.5 rounded-lg ${item.color} mt-0.5`}>
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 truncate">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-normal leading-snug truncate">
                                    {item.desc}
                                  </div>
                                </div>
                              </Link>
                            ))}

                            <div className="mt-2 p-3 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-1">
                              <div className="text-[11px] font-bold text-teal-950 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                                <span>Dominate Local Maps 3-Pack</span>
                              </div>
                              <Link
                                href="/register"
                                onClick={closeDropdown}
                                className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
                              >
                                <span>Connect your GMB Profile in 60s</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2.5 mt-2 border-t border-slate-100 px-2 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">Enterprise multi-location & white-label ready</span>
                          <Link
                            href="/dashboard"
                            onClick={closeDropdown}
                            className="font-bold text-teal-700 hover:text-teal-900"
                          >
                            Open SaaS Platform Dashboard →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Free Tools Direct Link with clean inline badge */}
                <Link
                  href="/free-tools"
                  onClick={closeDropdown}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04] rounded-full transition-all duration-200 whitespace-nowrap"
                >
                  <Wrench className="w-3.5 h-3.5 text-sky-600" />
                  <span>Free Tools</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-sky-100/70 text-sky-700 border border-sky-200/60">
                    12
                  </span>
                </Link>

                {/* 4. Company Dropdown (Updated with solid bg-white, structured card layout matching Services) */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("company")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown("company")}
                    aria-expanded={activeDropdown === "company"}
                    className={`flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      activeDropdown === "company"
                        ? "bg-slate-900/[0.08] text-slate-900 ring-1 ring-slate-900/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04]"
                    }`}
                  >
                    Company
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        activeDropdown === "company" ? "rotate-180 text-slate-800" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Container: pt-2 eliminates hover gap so cursor movement never closes menu */}
                  {activeDropdown === "company" && (
                    <div className="absolute top-full -left-12 pt-2 z-50">
                      <div className="w-[380px] p-4 bg-white rounded-3xl shadow-2xl border border-slate-200/90 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 pb-1">
                          Engineering Firm & Leadership
                        </div>

                        <div className="grid gap-1 mt-1">
                          {[
                            {
                              href: "/about",
                              title: "About Us",
                              desc: "Our engineering philosophy & agile software squad",
                              icon: Users,
                              color: "text-sky-600 bg-sky-50",
                            },
                            {
                              href: "/portfolio",
                              title: "Portfolio",
                              desc: "Selected client SaaS, web & engineering builds",
                              icon: Rocket,
                              color: "text-emerald-600 bg-emerald-50",
                            },
                            {
                              href: "/case-studies",
                              title: "Case Studies",
                              desc: "Technical deep-dives & verified rank growth",
                              icon: TrendingUp,
                              color: "text-blue-600 bg-blue-50",
                            },
                            {
                              href: "/contact",
                              title: "Contact Leadership",
                              desc: "Direct discovery call with our engineering leads",
                              icon: Globe,
                              color: "text-teal-700 bg-teal-50",
                              badge: "Priority",
                            },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeDropdown}
                              className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                              <div className={`p-1.5 rounded-lg ${item.color} mt-0.5`}>
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 truncate">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-teal-50 text-teal-800 border border-teal-200">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-500 font-normal leading-snug">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Company Callout Box */}
                        <div className="mt-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Enterprise SLA & Direct Engineering</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            Custom software, enterprise integrations, and dedicated engineering sprints.
                          </p>
                          <Link
                            href="/contact"
                            onClick={closeDropdown}
                            className="text-[11px] text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 pt-0.5"
                          >
                            <span>Book a technical discovery call</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Pricing Link */}
                <Link
                  href="/pricing"
                  onClick={closeDropdown}
                  className="px-3.5 py-1.5 text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04] rounded-full transition-all duration-200 whitespace-nowrap"
                >
                  Pricing
                </Link>
              </div>
            </div>

            {/* Right Action CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={closeDropdown}
                  className="px-3 py-1.5 rounded-full border border-teal-200 bg-teal-50/80 hover:bg-teal-100 text-xs font-bold text-teal-900 flex items-center gap-2 transition-all shadow-2xs"
                >
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userDisplayName}
                      className="w-5 h-5 rounded-full object-cover border border-teal-300"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px] font-bold">
                      {userDisplayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="truncate max-w-[120px]">{userDisplayName}</span>
                  <span className="text-[10px] text-teal-700 font-semibold">(Dashboard →)</span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeDropdown}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeDropdown}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-all duration-200 shadow-2xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Get Started</span>
                  </Link>
                </>
              )}

              <Link
                href="/contact"
                onClick={closeDropdown}
                className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-700 shadow-sm shadow-teal-700/25 hover:shadow-md hover:shadow-teal-700/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-1.5"
              >
                <span>Hire Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/dashboard"
                onClick={closeDropdown}
                className="px-3 py-1 rounded-full text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200"
              >
                App
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-xl text-slate-700 hover:bg-slate-900/[0.05]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-white border-t border-slate-200 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              {/* Platform Modules */}
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">SaaS Platform</div>
              <Link
                href="/dashboard/local-seo"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>Google Maps & GMB 3-Pack Hub</span>
              </Link>
              <Link
                href="/dashboard/ai-visibility"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <Bot className="w-4 h-4 text-emerald-600" />
                <span>AI Visibility & AEO Radar</span>
              </Link>
              <Link
                href="/dashboard/rank-tracker"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>SERP Rank Tracker</span>
              </Link>
              <Link
                href="/free-tools"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-indigo-700 hover:bg-slate-50 rounded-lg"
              >
                <Wrench className="w-4 h-4 text-indigo-600" />
                <span>12 Free Tools Hub</span>
              </Link>

              {/* Services Section */}
              <div className="pt-2 px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Services</div>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                All 13 Engineering Services
              </Link>
              <Link
                href="/services/software-development"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                Custom Software Engineering
              </Link>
              <Link
                href="/services/local-seo"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                Local SEO & Maps Optimization
              </Link>

              <div className="pt-2 px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Company & Plans</div>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Pricing & Packages
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                About Us
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Portfolio
              </Link>
              <Link
                href="/case-studies"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Case Studies
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Contact Leadership
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-white bg-teal-700"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 rounded-xl text-xs font-bold text-white bg-teal-700"
                  >
                    Get Started (60s Setup)
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
