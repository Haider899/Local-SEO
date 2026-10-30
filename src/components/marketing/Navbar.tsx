"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

import { useAuth } from "@/lib/context/AuthContext";

export function Navbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [storedUser, setStoredUser] = useState<any>(null);

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

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      <nav className={`crystal-nav ${scrolled ? "py-2.5 shadow-md" : "py-3.5"} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Minimalist Apple-Style Brand Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
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
                {/* Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                      servicesOpen ? "bg-slate-900/[0.06] text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04]"
                    }`}
                  >
                    Services
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-slate-700" : ""}`} />
                  </button>

                  {servicesOpen && (
                    <div className="absolute top-full -left-20 mt-1.5 w-[680px] p-4 crystal-dropdown rounded-3xl animate-in fade-in slide-in-from-top-1 duration-200 shadow-2xl border border-slate-200/80 bg-white/95 backdrop-blur-xl">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
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
                            <Link href="/pricing" className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1">
                              <span>Check GMB SaaS Packages ($20 / $50)</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 mt-2 border-t border-slate-100 px-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">All 13 enterprise solutions available</span>
                        <Link href="/services" className="font-bold text-teal-700 hover:text-teal-900">
                          View All 13 Services Overview →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* SaaS Platform Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setPlatformOpen(true)}
                  onMouseLeave={() => setPlatformOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                      platformOpen ? "bg-slate-900/[0.06] text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04]"
                    }`}
                  >
                    Platform
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${platformOpen ? "rotate-180 text-slate-700" : ""}`} />
                  </button>

                  {platformOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-80 p-2.5 crystal-dropdown rounded-2xl animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="grid gap-1">
                        <Link
                          href="/dashboard/ai-visibility"
                          className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-900/[0.04] transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700">AI Visibility & AEO</div>
                            <div className="text-[11px] text-slate-500 font-normal">Track ChatGPT, Perplexity & Gemini</div>
                          </div>
                        </Link>

                        <Link
                          href="/dashboard/local-seo"
                          className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-900/[0.04] transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">Google Maps & GMB</div>
                            <div className="text-[11px] text-slate-500 font-normal">Automated updates, reviews & Geo-Grid</div>
                          </div>
                        </Link>

                        <Link
                          href="/dashboard/rank-tracker"
                          className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-900/[0.04] transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600">SERP Rank Tracker</div>
                            <div className="text-[11px] text-slate-500 font-normal">Keyword rankings & SERP feature radar</div>
                          </div>
                        </Link>

                        <Link
                          href="/#audit-section"
                          className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-900/[0.04] transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
                            <Search className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-sky-600">Technical Site Audit</div>
                            <div className="text-[11px] text-slate-500 font-normal">Real-time health scanner & fixes</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Free Tools Direct Link with clean inline badge */}
                <Link
                  href="/free-tools"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04] rounded-full transition-all duration-200 whitespace-nowrap"
                >
                  <Wrench className="w-3.5 h-3.5 text-sky-600" />
                  <span>Free Tools</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-sky-100/70 text-sky-700 border border-sky-200/60">
                    12
                  </span>
                </Link>

                {/* Company Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setCompanyOpen(true)}
                  onMouseLeave={() => setCompanyOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                      companyOpen ? "bg-slate-900/[0.06] text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04]"
                    }`}
                  >
                    Company
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${companyOpen ? "rotate-180 text-slate-700" : ""}`} />
                  </button>

                  {companyOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-64 p-2 crystal-dropdown rounded-2xl animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="grid gap-0.5">
                        <Link
                          href="/about"
                          className="p-2 rounded-xl hover:bg-slate-900/[0.04] transition-colors block text-xs font-bold text-slate-900 hover:text-teal-700"
                        >
                          About Us
                          <span className="block text-[11px] font-normal text-slate-500">Our engineering philosophy</span>
                        </Link>
                        <Link
                          href="/portfolio"
                          className="p-2 rounded-xl hover:bg-slate-900/[0.04] transition-colors block text-xs font-bold text-slate-900 hover:text-teal-700"
                        >
                          Portfolio
                          <span className="block text-[11px] font-normal text-slate-500">Selected client & SaaS works</span>
                        </Link>
                        <Link
                          href="/case-studies"
                          className="p-2 rounded-xl hover:bg-slate-900/[0.04] transition-colors block text-xs font-bold text-slate-900 hover:text-teal-700"
                        >
                          Case Studies
                          <span className="block text-[11px] font-normal text-slate-500">Technical deep-dives</span>
                        </Link>
                        <Link
                          href="/contact"
                          className="p-2 rounded-xl hover:bg-slate-900/[0.04] transition-colors block text-xs font-bold text-teal-700"
                        >
                          Contact Leadership
                          <span className="block text-[11px] font-normal text-slate-500">Start technical discovery call</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing Link */}
                <Link
                  href="/pricing"
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
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="crystal-button px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-800 flex items-center gap-1.5 transition-all duration-200"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Get Started</span>
                  </Link>
                </>
              )}

              <Link
                href="/contact"
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
                className="crystal-button px-3 py-1 rounded-full text-xs font-semibold text-slate-800"
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
          <div className="lg:hidden px-4 pt-3 pb-6 bg-white/95 backdrop-blur-xl border-t border-slate-200/70 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Services</div>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                All Engineering Services
              </Link>
              <Link
                href="/services/software-development"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                Custom Software Engineering
              </Link>
              <Link
                href="/services/ai-solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                Applied AI & LLM Systems
              </Link>

              <div className="pt-2 px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">SaaS & Free Tools</div>
              <Link
                href="/free-tools"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm font-semibold text-teal-700 hover:bg-slate-50 rounded-lg"
              >
                12 Free Tools Hub
              </Link>
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                >
                  SaaS Dashboard
                </Link>
              ) : (
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm font-semibold text-teal-700 hover:bg-teal-50 rounded-lg"
                >
                  Get Started / Register
                </Link>
              )}
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Pricing
              </Link>

              <div className="pt-2 px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Company</div>
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

            <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100"
              >
                Login
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-xl text-xs font-bold text-white bg-teal-700"
              >
                Hire Our Engineering Squad
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
