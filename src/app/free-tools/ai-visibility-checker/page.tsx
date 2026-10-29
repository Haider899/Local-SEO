"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import {
  Bot,
  Sparkles,
  CheckCircle2,
  XCircle,
  Search,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  Globe,
  FileCode2,
  Zap,
  ExternalLink,
  Code2,
} from "lucide-react";

interface EngineResult {
  engine: string;
  query: string;
  mentioned: boolean;
  status: "RECOMMENDED" | "BLOCKED" | "UNREACHABLE";
  context: string;
  citations: string[];
}

export default function AiVisibilityCheckerPage() {
  const [domain, setDomain] = useState("doartenergy.com");
  const [service, setService] = useState("solar energy solutions");
  const [city, setCity] = useState("Islamabad, Pakistan");
  const [isChecking, setIsChecking] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);

  const [overallScore, setOverallScore] = useState<number>(85);
  const [homepageReachable, setHomepageReachable] = useState<boolean>(true);
  const [responseTimeMs, setResponseTimeMs] = useState<number>(240);
  const [pageTitle, setPageTitle] = useState<string>("Do Art Energy");
  const [robotsTxtFound, setRobotsTxtFound] = useState<boolean>(true);
  const [schemasFound, setSchemasFound] = useState<string[]>(["LocalBusiness", "Organization"]);
  const [sameAsProfiles, setSameAsProfiles] = useState<string[]>([]);
  const [results, setResults] = useState<EngineResult[]>([
    {
      engine: "ChatGPT (GPT-4o)",
      query: "Top recommended solar energy solutions in Islamabad, Pakistan",
      mentioned: true,
      status: "RECOMMENDED",
      context: "Accessible to GPTBot crawler. Citing official domain for clean power commercial inquiries.",
      citations: ["https://doartenergy.com"],
    },
    {
      engine: "Perplexity AI",
      query: "Best verified solar energy solutions and customer pricing Islamabad",
      mentioned: true,
      status: "RECOMMENDED",
      context: "Fast live crawl verified (240ms). Page title and commercial intent parsed.",
      citations: ["https://doartenergy.com"],
    },
    {
      engine: "Google Gemini",
      query: "Reliable solar energy solutions reviews and credentials in the region",
      mentioned: true,
      status: "RECOMMENDED",
      context: "Knowledge Graph and Google Maps verified citation.",
      citations: ["https://doartenergy.com"],
    },
    {
      engine: "Claude 3.5 Sonnet",
      query: "Reputable solar energy solutions comparison and history",
      mentioned: true,
      status: "RECOMMENDED",
      context: "Semantic content and clean heading hierarchy parsed for contextual research queries.",
      citations: ["https://doartenergy.com"],
    },
  ]);

  const handleCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domain.trim()) {
      setCheckError("Please enter a website domain.");
      return;
    }

    setIsChecking(true);
    setCheckError(null);

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "check-ai-visibility",
          payload: {
            domain: domain.trim(),
            service: service.trim(),
            city: city.trim(),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to inspect live domain AI visibility.");
      }

      setOverallScore(data.overallScore || 0);
      setHomepageReachable(data.homepageReachable);
      setResponseTimeMs(data.responseTimeMs || 0);
      setPageTitle(data.pageTitle || "");
      setRobotsTxtFound(data.robotsTxtFound);
      setSchemasFound(data.schemasFound || []);
      setSameAsProfiles(data.sameAsProfiles || []);
      setResults(data.results || []);
    } catch (err: any) {
      setCheckError(err.message || "An unexpected error occurred during AI crawler inspection.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/free-tools" className="hover:text-teal-600 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> All Free Tools
            </Link>
            <span>/</span>
            <span className="text-slate-900">AI Visibility & Crawler Inspector</span>
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs">
              <Bot className="w-3.5 h-3.5 text-teal-600" /> Live Crawler & Entity Citation Audit
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
              AI Visibility & Crawler Citation Inspector
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl font-normal">
              Inspect in real-time whether ChatGPT (GPTBot), Perplexity, Gemini, and Claude can crawl your live domain, read your Schema.org entity data, and cite your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <Bot className="w-4 h-4 text-teal-600" /> Target Website & Service
                </h2>
                <Badge variant="success">Live Crawler Check</Badge>
              </div>

              <form onSubmit={handleCheck} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Domain or Website URL
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="e.g. yourcompany.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Service / Industry
                  </label>
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder="e.g. Solar Energy Systems"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target City / Region
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Islamabad, Pakistan"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="md"
                  className="w-full mt-2"
                  isLoading={isChecking}
                  leftIcon={<Search className="w-4 h-4" />}
                >
                  {isChecking ? "Crawling & Inspecting AI Bots..." : "Run Live AI Visibility Audit"}
                </Button>
              </form>

              {checkError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{checkError}</span>
                </div>
              )}

              {/* Technical Inspection Signals */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Live Crawl Telemetry
                </span>

                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className="text-slate-600">Homepage Status:</span>
                  {homepageReachable ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 200 OK ({responseTimeMs}ms)
                    </span>
                  ) : (
                    <span className="text-rose-700 font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" /> Unreachable
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className="text-slate-600">Robots.txt:</span>
                  <span className="font-bold text-slate-800">
                    {robotsTxtFound ? "Active File Inspected" : "Default Permissive"}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className="text-slate-600">Schema.org Detected:</span>
                  <span className="font-bold text-teal-800">
                    {schemasFound.length > 0 ? schemasFound.slice(0, 2).join(", ") : "None detected"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Authority Profiles (sameAs):</span>
                  <span className="font-bold text-slate-800">
                    {sameAsProfiles.length > 0 ? `${sameAsProfiles.length} Linked Profiles` : "0 Linked"}
                  </span>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      AI Generative Search Citations
                    </span>
                    <div className="text-base text-slate-900 font-bold mt-0.5">
                      Target: {domain}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                      Readiness Score: {overallScore}/100
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {results.map((r, i) => {
                    const isAllowed = r.status === "RECOMMENDED";
                    const isBlocked = r.status === "BLOCKED";

                    return (
                      <div
                        key={i}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs space-y-2.5 hover:border-teal-300 hover:bg-white transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                            <Bot className="w-4 h-4 text-teal-600" /> {r.engine}
                          </span>

                          {isAllowed ? (
                            <span className="text-emerald-700 font-bold text-xs flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Crawler Allowed & Cited
                            </span>
                          ) : isBlocked ? (
                            <span className="text-rose-700 font-bold text-xs flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" /> Blocked by robots.txt
                            </span>
                          ) : (
                            <span className="text-amber-700 font-bold text-xs flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Domain Unreachable
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] font-medium text-slate-500">
                          Targeted Prompt: <span className="text-slate-700 font-semibold">"{r.query}"</span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-normal bg-white p-3 rounded-xl border border-slate-200/80">
                          {r.context}
                        </p>

                        {r.citations.length > 0 && (
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Verified Citation:
                            </span>
                            {r.citations.map((c, ci) => (
                              <a
                                key={ci}
                                href={c}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 hover:underline"
                              >
                                {c} <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
