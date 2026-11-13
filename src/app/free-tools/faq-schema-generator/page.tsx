"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Copy, Check, Plus, Trash2, HelpCircle, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSchemaGeneratorPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "How long does it take for Local SEO to show results?",
      answer:
        "Typically between 30 to 90 days. Factors include existing domain authority, Google Business Profile optimization, review velocity, and competition density in your geographic service area.",
    },
    {
      question: "What is the difference between organic SEO and Local Map Pack SEO?",
      answer:
        "Local Map Pack SEO focuses on ranking in the Google Maps 3-Pack based on proximity, prominence, and NAP consistency. Organic SEO ranks your standard website URLs in traditional organic search results.",
    },
  ]);

  const [copied, setCopied] = useState(false);

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: "question" | "answer", val: string) => {
    const updated = [...faqs];
    updated[index][field] = val;
    setFaqs(updated);
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((f) => f.question.trim() && f.answer.trim())
      .map((f) => ({
        "@type": "Question",
        name: f.question.trim(),
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer.trim(),
        },
      })),
  };

  const schemaString = JSON.stringify(schemaJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${schemaString}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-teal-600 selection:text-white font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 relative pt-12 sm:pt-16 pb-24">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 mb-4 text-xs font-bold tracking-wider text-teal-800 uppercase rounded-full bg-teal-50 border border-teal-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              AEO & AI Search Snippet Tool
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 font-heading">
              Free FAQ Schema (JSON-LD) Generator
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Build Google Rich Snippet and ChatGPT / Perplexity-ready structured FAQ schema to capture top search rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2 font-heading">
                    <HelpCircle className="w-5 h-5 text-teal-600" /> FAQ Questions & Answers
                  </h2>
                  <Button variant="outline" onClick={addFaq} className="text-xs">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Question
                  </Button>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 relative">
                      {faqs.length > 1 && (
                        <button
                          onClick={() => removeFaq(idx)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Question #{idx + 1}
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, "question", e.target.value)}
                        placeholder="e.g. How much does local SEO cost?"
                        className="w-full mb-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />

                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Accepted Answer
                      </label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                        placeholder="Provide a clear, direct answer..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* JSON Output */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-black text-slate-900 font-heading">Generated JSON-LD Schema</h2>
                  <Button variant="primary" onClick={handleCopy} className="text-xs">
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1" /> Copied Code!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1" /> Copy Schema
                      </>
                    )}
                  </Button>
                </div>

                <pre className="p-4 rounded-2xl border border-slate-200 bg-slate-900 text-teal-300 font-mono text-xs overflow-x-auto max-h-[460px]">
                  {`<script type="application/ld+json">\n${schemaString}\n</script>`}
                </pre>

                <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
                  Paste this script block inside the <code className="text-teal-700 font-bold">&lt;head&gt;</code> or <code className="text-teal-700 font-bold">&lt;body&gt;</code> of your webpage to activate FAQ Rich Snippets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
