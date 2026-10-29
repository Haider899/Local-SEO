"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { HelpCircle, Plus, Trash2, Copy, Check, Sparkles, ArrowRight } from "lucide-react";

export default function FaqSchemaGeneratorPage() {
  const [faqs, setFaqs] = useState([
    { question: "What are your business operating hours?", answer: "We are open Monday through Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM." },
    { question: "Do you offer emergency call-out services?", answer: "Yes, our certified technicians offer 24/7 emergency response for critical repairs across our local service territory." },
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
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="relative pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block py-1 px-3.5 mb-4 text-xs font-semibold tracking-wider text-teal-400 uppercase rounded-full bg-teal-500/10 border border-teal-500/20">
              AEO & AI Search Snippet Tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Free FAQ Schema (JSON-LD) Generator
            </h1>
            <p className="text-slate-400 text-sm">
              Build Google Rich Snippet and ChatGPT / Perplexity-ready structured FAQ schema to capture top search rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-teal-400" /> FAQ Questions & Answers
                  </h3>
                  <Button variant="outline" onClick={addFaq} className="text-xs">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Question
                  </Button>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-800/40 relative">
                      {faqs.length > 1 && (
                        <button
                          onClick={() => removeFaq(idx)}
                          className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Question #{idx + 1}
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, "question", e.target.value)}
                        placeholder="e.g. How much does local SEO cost?"
                        className="w-full mb-3 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />

                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Accepted Answer
                      </label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                        placeholder="Provide a clear, direct answer..."
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* JSON Output */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Generated JSON-LD Schema</h3>
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

                <pre className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[460px]">
                  {`<script type="application/ld+json">\n${schemaString}\n</script>`}
                </pre>

                <p className="text-[11px] text-slate-500 mt-4">
                  Paste this script block inside the <code className="text-teal-400">&lt;head&gt;</code> or <code className="text-teal-400">&lt;body&gt;</code> of your webpage to activate FAQ Rich Snippets.
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

