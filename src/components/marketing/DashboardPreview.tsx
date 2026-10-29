"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScoreGauge } from "@/ui/ScoreGauge";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import {
  Bot,
  MapPin,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react";

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<"overview" | "ai" | "local" | "tasks">("overview");

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl p-1 crystal-card shadow-[0_20px_60px_-15px_rgba(13,148,136,0.18)] border border-teal-500/25">
      <div className="rounded-[22px] bg-white border border-teal-500/20 shadow-lg overflow-hidden">
        {/* Top Window Chrome */}
        <div className="px-6 py-4 bg-white border-b border-teal-500/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="h-4 w-[1px] bg-teal-200 mx-1" />
            <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold bg-white px-3 py-1.5 rounded-lg border border-teal-200/70 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-900 font-bold">Apex Dental Care</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-normal">Austin, TX</span>
            </div>
          </div>

          {/* Interactive Preview Tabs */}
          <div className="flex items-center bg-teal-50/60 p-1 rounded-xl border border-teal-200/70 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "overview"
                  ? "bg-white text-teal-800 shadow-sm font-bold border border-teal-200/60"
                  : "text-slate-600 hover:text-teal-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "ai"
                  ? "bg-white text-teal-800 shadow-sm font-bold border border-teal-200/60"
                  : "text-slate-600 hover:text-teal-900"
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-teal-600" />
              AI Visibility
            </button>
            <button
              onClick={() => setActiveTab("local")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "local"
                  ? "bg-white text-emerald-800 shadow-sm font-bold border border-emerald-200/60"
                  : "text-slate-600 hover:text-emerald-900"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Local 3-Pack
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "tasks"
                  ? "bg-white text-teal-800 shadow-sm font-bold border border-teal-200/60"
                  : "text-slate-600 hover:text-teal-900"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-teal-600" />
              Smart Tasks
            </button>
          </div>

          <Link href="/dashboard">
            <Button variant="gradient" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
              Open Full App
            </Button>
          </Link>
        </div>

        {/* Dashboard Body Preview */}
        <div className="p-6 sm:p-8 space-y-6 bg-white">
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in">
              {/* Top Score Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl crystal-card flex flex-col items-center justify-center text-center">
                  <ScoreGauge score={78} grade="B" size={120} label="Overall Score" />
                  <div className="mt-2 text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +6 pts this month
                  </div>
                </div>

                <div className="p-5 rounded-2xl crystal-card flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-teal-800 font-bold uppercase tracking-wider">AI SEARCH SHARE</span>
                    <Bot className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="my-2">
                    <div className="text-2xl font-black text-teal-700">72%</div>
                    <div className="text-xs text-slate-500 font-medium">Mentioned in 18 of 25 prompts</div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full w-[72%]" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl crystal-card flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">LOCAL MAPS PACK</span>
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="my-2">
                    <div className="text-2xl font-black text-emerald-600">Top 3 in 84%</div>
                    <div className="text-xs text-slate-500 font-medium">Avg rank: #1.8 in 5-mile radius</div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[84%]" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl crystal-card flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-teal-800 font-bold uppercase tracking-wider">TECHNICAL HEALTH</span>
                    <Globe className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="my-2">
                    <div className="text-2xl font-black text-teal-700">81 / 100</div>
                    <div className="text-xs text-slate-500 font-medium">TTFB: 240ms • HTTPS Secure</div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full w-[81%]" />
                  </div>
                </div>
              </div>

              {/* Bottom Multi-Panel Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Critical Issues List */}
                <div className="p-5 rounded-2xl crystal-card space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" /> High-Impact Opportunities
                    </span>
                    <Badge variant="warning">2 Actionable</Badge>
                  </div>

                  <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-100 flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-teal-100/70 text-teal-700 flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-teal-950">Missing FAQPage Schema (AEO Opportunity)</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Add structured Q&A on Invisalign and Emergency pages to trigger conversational direct answers.
                      </div>
                    </div>
                    <Badge variant="danger" size="sm">High</Badge>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-700 flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-emerald-950">Enrich LocalBusiness JSON-LD with Coordinates</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Reinforce physical location accuracy for Google Maps proximity searches.
                      </div>
                    </div>
                    <Badge variant="warning" size="sm">Med</Badge>
                  </div>
                </div>

                {/* AI Query Insights */}
                <div className="p-5 rounded-2xl crystal-card space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Bot className="w-4 h-4 text-teal-600" /> Recent AI Citations
                    </span>
                    <Badge variant="info">Live Monitored</Badge>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-teal-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">ChatGPT</span>
                        <span className="text-slate-800 font-medium truncate">"Best cosmetic dentist for veneers in Austin"</span>
                      </div>
                      <Badge variant="success" size="sm">#2 Ranked</Badge>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-teal-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">Perplexity</span>
                        <span className="text-slate-800 font-medium truncate">"Emergency dental clinic open Saturdays downtown"</span>
                      </div>
                      <Badge variant="success" size="sm">#1 Recommended</Badge>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-teal-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">Gemini</span>
                        <span className="text-slate-800 font-medium truncate">"Top Invisalign diamond providers in Central Texas"</span>
                      </div>
                      <Badge variant="teal" size="sm">Mentioned</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-teal-950 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-teal-600" /> AI Engine Share of Voice
                  </h4>
                  <p className="text-xs text-teal-800/80 mt-0.5 font-medium">
                    Real-time mention rates across modern conversational search models.
                  </p>
                </div>
                <Badge variant="teal">AEO Active</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-2xl crystal-card">
                  <div className="text-xs text-slate-500 font-semibold">ChatGPT (GPT-4o)</div>
                  <div className="text-2xl font-black text-emerald-600 mt-1">84%</div>
                  <div className="text-[10px] text-slate-400 font-medium">Mentioned in 21 prompts</div>
                </div>
                <div className="p-4 rounded-2xl crystal-card">
                  <div className="text-xs text-slate-500 font-semibold">Perplexity AI</div>
                  <div className="text-2xl font-black text-teal-600 mt-1">91%</div>
                  <div className="text-[10px] text-slate-400 font-medium">Cited in 19 searches</div>
                </div>
                <div className="p-4 rounded-2xl crystal-card">
                  <div className="text-xs text-slate-500 font-semibold">Google Gemini</div>
                  <div className="text-2xl font-black text-teal-700 mt-1">68%</div>
                  <div className="text-[10px] text-slate-400 font-medium">Knowledge entity active</div>
                </div>
                <div className="p-4 rounded-2xl crystal-card">
                  <div className="text-xs text-slate-500 font-semibold">Claude 3.5</div>
                  <div className="text-2xl font-black text-amber-600 mt-1">54%</div>
                  <div className="text-[10px] text-slate-400 font-medium">Authority context</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "local" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Geo-Grid 3-Pack Heatmap Simulator
                  </h4>
                  <p className="text-xs text-emerald-800/80 mt-0.5 font-medium">
                    Local rankings for "cosmetic dentist austin" across a 5x5 mile grid.
                  </p>
                </div>
                <Badge variant="success">Radius: 5 Miles</Badge>
              </div>

              {/* Visual 5x5 Geo Grid */}
              <div className="grid grid-cols-5 gap-2 max-w-md mx-auto p-4 rounded-2xl crystal-card border border-teal-100">
                {["1", "1", "2", "2", "3", "1", "1", "1", "2", "2", "2", "1", "PIN", "1", "2", "3", "2", "1", "2", "3", "4", "3", "2", "3", "4"].map((rank, i) => {
                  const isCenter = rank === "PIN";
                  const isTop3 = rank === "1" || rank === "2" || rank === "3";
                  return (
                    <div
                      key={i}
                      className={`h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-transform hover:scale-110 cursor-pointer ${
                        isCenter
                          ? "bg-teal-700 text-white shadow-md shadow-teal-700/25"
                          : isTop3
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {isCenter ? <MapPin className="w-4 h-4 fill-white" /> : rank}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-3 animate-in fade-in text-xs">
              <div className="p-3.5 rounded-xl crystal-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900">Unblock GPTBot and PerplexityBot in robots.txt</span>
                </div>
                <Badge variant="success" size="sm">Completed</Badge>
              </div>

              <div className="p-3.5 rounded-xl crystal-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-teal-600 animate-spin" />
                  <span className="font-bold text-slate-900">Add LocalBusiness / Dentist schema with GeoCoordinates</span>
                </div>
                <Badge variant="teal" size="sm">In Progress</Badge>
              </div>

              <div className="p-3.5 rounded-xl crystal-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                  <span className="font-bold text-slate-900">Implement FAQPage Schema on Veneers & Invisalign pages</span>
                </div>
                <Badge variant="danger" size="sm">Critical</Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
