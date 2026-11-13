"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { FileCheck2, CheckCircle2, XCircle, Search, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";

export default function SitemapValidatorPage() {
  const [sitemapUrl, setSitemapUrl] = useState("https://seo.itibusinesssuite.online/sitemap.xml");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "validate-sitemap",
          payload: { sitemapUrl },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to validate sitemap.");
      }
    } catch (err: any) {
      setError(err.message || "Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-teal-600 selection:text-white font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 relative pt-12 sm:pt-16 pb-24">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 mb-4 text-xs font-bold tracking-wider text-teal-800 uppercase rounded-full bg-teal-50 border border-teal-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Technical SEO Audit Tool
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 font-heading">
              Free XML Sitemap Validator
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Inspect your XML sitemap for Google indexability, response codes, XML syntax errors, and child sitemap structures.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <form onSubmit={handleValidate} className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                required
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                placeholder="https://yourdomain.com/sitemap.xml"
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
              <Button type="submit" variant="primary" disabled={loading} className="py-3 px-6 shadow-sm">
                <Search className="w-4 h-4 mr-2" />
                {loading ? "Inspecting XML..." : "Inspect Sitemap"}
              </Button>
            </form>

            {error && (
              <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 text-sm flex items-center gap-2">
                <XCircle className="w-5 h-5 shrink-0 text-rose-600" />
                {error}
              </div>
            )}

            {result && (
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    {result.formatValid ? (
                      <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                        <AlertTriangle className="w-6 h-6 text-amber-700" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-black text-slate-900 text-base font-heading">
                        {result.formatValid ? "Valid XML Sitemap Format" : "Issues Detected in XML Structure"}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        HTTP Status: {result.statusCode} • Response Time: {result.responseTimeMs}ms
                      </p>
                    </div>
                  </div>
                  <Badge variant={result.formatValid ? "success" : "warning"}>
                    {result.urlCount} URLs Indexed
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Format</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{result.type || "Standard Index"}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total URLs</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{result.urlCount}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Compression</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{result.isGzipped ? "Gzip Encoded" : "Raw XML"}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Status</p>
                    <p className="text-sm font-bold text-emerald-700 mt-1">200 OK</p>
                  </div>
                </div>

                {result.sampleUrls && result.sampleUrls.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sample Detected URLs</h4>
                    <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs text-slate-700 space-y-1">
                      {result.sampleUrls.map((u: string, i: number) => (
                        <div key={i} className="truncate hover:text-teal-700">{u}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
