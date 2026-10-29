"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { FileCheck2, CheckCircle2, XCircle, Search, AlertTriangle, ArrowRight } from "lucide-react";

export default function SitemapValidatorPage() {
  const [sitemapUrl, setSitemapUrl] = useState("https://omnirank.ai/sitemap.xml");
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
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="relative pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block py-1 px-3.5 mb-4 text-xs font-semibold tracking-wider text-teal-400 uppercase rounded-full bg-teal-500/10 border border-teal-500/20">
              Technical SEO Audit Tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Free XML Sitemap Validator
            </h1>
            <p className="text-slate-400 text-sm">
              Inspect your XML sitemap for Google indexability, response codes, XML syntax errors, and child sitemap structures.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <form onSubmit={handleValidate} className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                required
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                placeholder="https://yourdomain.com/sitemap.xml"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              <Button type="submit" variant="primary" disabled={loading} className="py-3 px-6">
                <Search className="w-4 h-4 mr-2" />
                {loading ? "Inspecting XML..." : "Inspect Sitemap"}
              </Button>
            </form>

            {error && (
              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm flex items-center gap-2">
                <XCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            {result && (
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    {result.formatValid ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-amber-400" />
                    )}
                    <div>
                      <h4 className="font-bold text-white text-base">
                        {result.formatValid ? "Valid XML Sitemap Format" : "Issues Detected in XML Structure"}
                      </h4>
                      <p className="text-xs text-slate-400">
                        HTTP Status: {result.statusCode} • Response Time: {result.responseTimeMs}ms
                      </p>
                    </div>
                  </div>
                  <Badge variant={result.formatValid ? "success" : "warning"}>
                    {result.formatValid ? "Pass" : "Warning"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                    <p className="text-2xl font-extrabold text-white">{result.totalUrls || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">URLs Discovered</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                    <p className="text-2xl font-extrabold text-white">{result.lastmodCount || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">&lt;lastmod&gt; Tags</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                    <p className="text-2xl font-extrabold text-white">{result.hasImages ? "Yes" : "No"}</p>
                    <p className="text-xs text-slate-400 mt-1">Image Extensions</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                    <p className="text-2xl font-extrabold text-white">{result.isSitemapIndex ? "Index" : "Urlset"}</p>
                    <p className="text-xs text-slate-400 mt-1">Sitemap Type</p>
                  </div>
                </div>

                {result.urls && result.urls.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold uppercase text-slate-400 mb-2">
                      Sample Extracted URLs ({result.urls.length})
                    </h5>
                    <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300 space-y-1">
                      {result.urls.map((u: string, idx: number) => (
                        <div key={idx} className="truncate">{u}</div>
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

