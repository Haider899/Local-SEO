"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import {
  FileText,
  Globe,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  Search,
  Sparkles,
} from "lucide-react";

export default function MetaTagAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("Apex Solutions | Enterprise Engineering & Local SEO");
  const [metaDesc, setMetaDesc] = useState(
    "Empowering sustainable growth with premier local search visibility, AI citation readiness, and high-performance technical optimization."
  );
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const titleLength = title.length;
  const descLength = metaDesc.length;

  const isTitleGood = titleLength >= 40 && titleLength <= 60;
  const isDescGood = descLength >= 120 && descLength <= 158;

  const handleFetchLiveMeta = async () => {
    if (!url.trim()) return;
    setIsFetching(true);
    setFetchError(null);

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "scrape-meta",
          payload: { targetUrl: url.trim() },
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setFetchError(data.error || "Failed to fetch page meta tags");
      } else {
        if (data.title) setTitle(data.title);
        if (data.metaDesc) setMetaDesc(data.metaDesc);
      }
    } catch (err: any) {
      setFetchError(err.message || "Failed to fetch live page");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
              <FileText className="w-3.5 h-3.5 text-teal-600" /> Free SERP Inspector
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
              Google SERP Meta Tag Previewer & Live Inspector
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl font-normal">
              Inspect how your page title and meta description appear in real Google Search results across desktop and mobile screens, or fetch meta tags directly from any live URL.
            </p>
          </div>

          {/* Fetch Live Meta Bar */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Fetch Live Meta Tags From Any URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <Button
              onClick={handleFetchLiveMeta}
              variant="gradient"
              size="md"
              className="w-full sm:w-auto self-end mt-2 sm:mt-0"
              isLoading={isFetching}
              leftIcon={<Search className="w-4 h-4" />}
            >
              {isFetching ? "Fetching Meta..." : "Extract Live Meta"}
            </Button>
          </div>

          {fetchError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{fetchError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                <FileText className="w-4 h-4 text-teal-600" /> Edit & Fine-Tune Meta Tags
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label className="font-bold text-slate-700">Page Title</label>
                    <span className={isTitleGood ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>
                      {titleLength} / 60 characters
                    </span>
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  <div className="text-[11px] text-slate-500 mt-1">
                    Recommended: 50-60 characters to prevent SERP truncation.
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label className="font-bold text-slate-700">Meta Description</label>
                    <span className={isDescGood ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>
                      {descLength} / 158 characters
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-normal focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white leading-relaxed"
                  />
                  <div className="text-[11px] text-slate-500 mt-1">
                    Recommended: 120-158 characters for maximum click-through rate (CTR).
                  </div>
                </div>
              </div>
            </div>

            {/* Google SERP Live Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Google Search Preview
                  </span>
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                    <button
                      onClick={() => setPreviewMode("desktop")}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                        previewMode === "desktop"
                          ? "bg-white text-slate-900 font-bold shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" /> Desktop
                    </button>
                    <button
                      onClick={() => setPreviewMode("mobile")}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                        previewMode === "mobile"
                          ? "bg-white text-slate-900 font-bold shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" /> Mobile
                    </button>
                  </div>
                </div>

                {/* SERP Card simulating Google result */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1.5 font-sans">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-700">
                      G
                    </div>
                    <span className="truncate">{url}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug font-sans">
                    {title || "Page Title"}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed font-normal">
                    {metaDesc || "Meta description will appear here as it renders in search results..."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    {isTitleGood ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    <span className="text-slate-800 font-medium">
                      Title Quality: {isTitleGood ? "Optimal length (No truncation on search)" : "Adjust length to prevent cutoffs"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isDescGood ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    <span className="text-slate-800 font-medium">
                      Snippet Quality: {isDescGood ? "Full visibility in SERP" : "Adjust description length (120-158 chars)"}
                    </span>
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
