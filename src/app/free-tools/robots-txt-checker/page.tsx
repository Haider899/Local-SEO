"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import {
  FileCode2,
  CheckCircle2,
  XCircle,
  Bot,
  AlertTriangle,
  Sparkles,
  Globe,
  Search,
  ShieldCheck,
} from "lucide-react";

export default function RobotsTxtCheckerPage() {
  const [targetUrl, setTargetUrl] = useState("");
  const [robotsText, setRobotsText] = useState(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /checkout/

# AI Search Crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://example.com/sitemap.xml`);

  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);

  const [aiBotsStatus, setAiBotsStatus] = useState<{
    gptBot: boolean;
    claudeBot: boolean;
    perplexityBot: boolean;
    googleOther: boolean;
  }>({
    gptBot: true,
    claudeBot: true,
    perplexityBot: true,
    googleOther: true,
  });

  const handleAnalyzeText = (textToAnalyze?: string) => {
    const text = (textToAnalyze || robotsText).toLowerCase();
    setAiBotsStatus({
      gptBot: !(text.includes("user-agent: gptbot") && text.includes("disallow: /")),
      claudeBot: !(text.includes("user-agent: claudebot") && text.includes("disallow: /")),
      perplexityBot: !(text.includes("user-agent: perplexitybot") && text.includes("disallow: /")),
      googleOther: !(text.includes("user-agent: google-other") && text.includes("disallow: /")),
    });
  };

  const handleFetchLive = async () => {
    if (!targetUrl.trim()) return;
    setIsLoadingLive(true);
    setLiveError(null);

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "check-robots",
          payload: { domainUrl: targetUrl.trim() },
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setLiveError(data.error || "Failed to fetch robots.txt");
      } else if (data.rawText) {
        setRobotsText(data.rawText);
        handleAnalyzeText(data.rawText);
      }
    } catch (err: any) {
      setLiveError(err.message || "Failed to fetch live robots.txt");
    } finally {
      setIsLoadingLive(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
              <FileCode2 className="w-3.5 h-3.5 text-teal-600" /> Free Technical SEO Tool
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
              Robots.txt & AI Search Bot Validator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl font-normal">
              Inspect whether your website's robots.txt allows generative AI scrapers (ChatGPT, Claude, Perplexity) or if your business is accidentally hidden from AI search results.
            </p>
          </div>

          {/* Live Fetch URL Bar */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Fetch Live Robots.txt From Domain
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <Button
              onClick={handleFetchLive}
              variant="gradient"
              size="md"
              className="w-full sm:w-auto self-end mt-2 sm:mt-0"
              isLoading={isLoadingLive}
              leftIcon={<Search className="w-4 h-4" />}
            >
              {isLoadingLive ? "Fetching Live..." : "Fetch & Parse Live"}
            </Button>
          </div>

          {liveError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{liveError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <FileCode2 className="w-4 h-4 text-teal-600" /> Active Robots.txt Directives
                </h2>
                <Button onClick={() => handleAnalyzeText()} variant="secondary" size="sm">
                  Re-Analyze Text
                </Button>
              </div>

              <textarea
                rows={13}
                value={robotsText}
                onChange={(e) => setRobotsText(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white leading-relaxed"
              />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    AI Search Crawler Status
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 font-heading">
                    Generative Engine Indexing
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="font-bold text-slate-900">GPTBot (OpenAI)</div>
                        <div className="text-[11px] text-slate-500">ChatGPT web search citations</div>
                      </div>
                    </div>
                    {aiBotsStatus.gptBot ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Allowed
                      </span>
                    ) : (
                      <span className="text-rose-700 font-bold flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Blocked
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-sky-600" />
                      <div>
                        <div className="font-bold text-slate-900">PerplexityBot</div>
                        <div className="text-[11px] text-slate-500">Perplexity live answer engine</div>
                      </div>
                    </div>
                    {aiBotsStatus.perplexityBot ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Allowed
                      </span>
                    ) : (
                      <span className="text-rose-700 font-bold flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Blocked
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-amber-600" />
                      <div>
                        <div className="font-bold text-slate-900">ClaudeBot (Anthropic)</div>
                        <div className="text-[11px] text-slate-500">Claude research context</div>
                      </div>
                    </div>
                    {aiBotsStatus.claudeBot ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Allowed
                      </span>
                    ) : (
                      <span className="text-rose-700 font-bold flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Blocked
                      </span>
                    )}
                  </div>
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
