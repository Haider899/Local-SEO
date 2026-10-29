import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { FREE_TOOLS_LIST } from "@/components/marketing/FreeToolsShowcase";
import { Wrench, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function FreeToolsHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              100% Free SEO & AEO Suite
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
              Free Local SEO & AI Visibility Tools
            </h1>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              A complete collection of 12 developer-grade and marketing utilities to generate valid schema markup, optimize SERP snippets, verify AI bot crawler access, and inspect conversational prompt rankings.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREE_TOOLS_LIST.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-teal-50 text-teal-700 group-hover:bg-teal-100 transition-colors border border-teal-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {tool.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-heading">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1 font-normal">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-teal-700">
                    <span>Use Free Tool</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
