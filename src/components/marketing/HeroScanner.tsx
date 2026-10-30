"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/MetricCard";
import {
  Sparkles,
  Globe,
  MapPin,
  Building,
  Search,
  CheckCircle2,
  ShieldCheck,
  Bot,
  ArrowRight,
  AlertCircle,
  Mail,
  Scale,
  Compass,
} from "lucide-react";

const SCAN_STEPS = [
  { label: "Validating Domain Security & Response Headers", icon: ShieldCheck },
  { label: "Crawling HTML, Metadata & Core Web Vitals", icon: Globe },
  { label: "Analyzing LocalBusiness Schema & NAP Consistency", icon: MapPin },
  { label: "Checking Google Maps 3-Pack & Local Citations", icon: Search },
  { label: "Calculating Search & Maps Authority Score", icon: Sparkles },
];

export function HeroScanner() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      setErrorMessage("Please enter a website URL to begin the audit.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter your work email to receive this GMB & SEO audit report.");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    setCurrentStepIndex(0);

    // Progressive step animation
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < SCAN_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 650);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          email: email.trim().toLowerCase(),
          businessName: businessName.trim() || undefined,
          location: location.trim() || undefined,
          targetKeyword: targetKeyword.trim() || undefined,
        }),
      });

      clearInterval(stepInterval);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to scan target website.");
      }

      // Short delay for smooth transition then route to result page
      setTimeout(() => {
        router.push(`/audit/${data.auditId}`);
      }, 500);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsLoading(false);
      setErrorMessage(err.message || "An error occurred during scanning. Please try again.");
    }
  };

  const handlePreset = (presetUrl: string, presetName: string, presetLoc: string, presetKw: string) => {
    setUrl(presetUrl);
    setBusinessName(presetName);
    setLocation(presetLoc);
    setTargetKeyword(presetKw);
    setErrorMessage(null);
  };

  return (
    <div id="audit-section" className="w-full max-w-4xl mx-auto">
      <div className="p-3 sm:p-4 rounded-3xl crystal-card shadow-[0_20px_60px_-15px_rgba(13,148,136,0.15)] border border-teal-500/20 relative overflow-hidden">
        {/* Top subtle glow banner */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-90" />

        <div className="p-4 sm:p-6 space-y-5">
          <form onSubmit={handleScan} className="space-y-4">
            {/* Primary URL & Email input bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
              <div className="relative md:col-span-5">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-teal-600">
                  <Globe className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Website URL (e.g., example.com)"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div className="relative md:col-span-4">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-teal-600">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email (to receive report)"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div className="md:col-span-3">
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  isLoading={isLoading}
                  disabled={isLoading}
                  rightIcon={<Sparkles className="w-4 h-4" />}
                  className="w-full py-3.5 px-4 rounded-2xl shadow-lg shadow-teal-600/20 whitespace-nowrap text-sm h-full"
                >
                  {isLoading ? "Auditing..." : "Run Free Audit"}
                </Button>
              </div>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Advanced optional inputs toggle */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors flex items-center gap-1.5"
              >
                <span>{showAdvanced ? "— Hide detailed parameters" : "+ Add location & target keyword for deep Local 3-Pack analysis"}</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero-risk sandbox • 100% Free</span>
              </div>
            </div>

            {/* Collapsible advanced fields */}
            {showAdvanced && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" /> Business Name
                  </label>
                  <Input
                    placeholder="e.g. Apex Health"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> City & State
                  </label>
                  <Input
                    placeholder="e.g. Austin, TX"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-slate-400" /> Target Keyword
                  </label>
                  <Input
                    placeholder="e.g. cosmetic dentist"
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}
          </form>

          {/* Live Progress Scanner Overlay */}
          {isLoading && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-teal-200 space-y-3.5 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-teal-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                  Running Innovative Real-Time Audit Engine
                </span>
                <span className="text-slate-500">
                  Step {currentStepIndex + 1} of {SCAN_STEPS.length}
                </span>
              </div>

              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-600 via-emerald-500 to-sky-400 transition-all duration-500 rounded-full"
                  style={{
                    width: `${((currentStepIndex + 1) / SCAN_STEPS.length) * 100}%`,
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {SCAN_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 text-xs p-2.5 rounded-xl transition-colors ${
                        isDone
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-200 font-medium"
                          : isCurrent
                          ? "text-teal-950 bg-teal-50 border border-teal-300 font-bold shadow-xs"
                          : "text-slate-400 bg-white"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 ${
                            isCurrent ? "text-teal-600 animate-spin" : "text-slate-400"
                          }`}
                        />
                      )}
                      <span className="truncate">{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick preset chips */}
          {!isLoading && (
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs text-teal-800 font-semibold mr-1 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-teal-600" />
                Verified live presets:
              </span>
              <button
                type="button"
                onClick={() =>
                  handlePreset(
                    "https://apexdentalcare.com",
                    "Apex Dental Care",
                    "Austin, TX",
                    "cosmetic dentist"
                  )
                }
                className="text-xs px-3 py-1.5 rounded-xl bg-teal-50/80 hover:bg-teal-100/90 text-teal-900 font-medium border border-teal-200/80 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Building className="w-3.5 h-3.5 text-teal-600" />
                <span>apexdentalcare.com</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handlePreset(
                    "https://clarkelegal.com",
                    "Clarke & Associates Law",
                    "Chicago, IL",
                    "personal injury lawyer"
                  )
                }
                className="text-xs px-3 py-1.5 rounded-xl bg-teal-50/80 hover:bg-teal-100/90 text-teal-900 font-medium border border-teal-200/80 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Scale className="w-3.5 h-3.5 text-teal-600" />
                <span>clarkelegal.com</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handlePreset(
                    "https://greenleaftreecare.com",
                    "Greenleaf Tree & Arborist",
                    "Seattle, WA",
                    "emergency tree removal"
                  )
                }
                className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-900 font-medium border border-emerald-200/80 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>greenleaftreecare.com</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
