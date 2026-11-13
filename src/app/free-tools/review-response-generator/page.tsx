"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { MessageSquare, Star, Copy, Check, Sparkles, Send } from "lucide-react";

export default function ReviewResponseGeneratorPage() {
  const [businessName, setBusinessName] = useState("Your Business Name");
  const [reviewerName, setReviewerName] = useState("Sarah Jenkins");
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState(
    "Outstanding service and very responsive team! Delivered everything ahead of schedule with great attention to detail. Highly recommend!"
  );
  const [tone, setTone] = useState<"professional" | "friendly" | "empathic" | "concise">("professional");
  const [generatedReply, setGeneratedReply] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      let reply = "";
      const first = reviewerName.split(" ")[0] || "there";

      if (rating >= 4) {
        if (tone === "friendly") {
          reply = `Hey ${first}! 🎉 Thank you so much for the glowing 5-star review! The whole team at ${businessName} is thrilled to know you had such a gentle and swift experience. We're always here for you whenever you need us!`;
        } else if (tone === "concise") {
          reply = `Hi ${first}, thank you for your kind feedback and recommendation! We appreciate your trust in ${businessName}.`;
        } else {
          reply = `Dear ${reviewerName}, thank you for taking the time to share your 5-star feedback. The entire team at ${businessName} takes great pride in delivering compassionate, timely emergency care. We truly appreciate your recommendation!`;
        }
      } else {
        reply = `Dear ${reviewerName}, thank you for bringing this to our attention. At ${businessName}, we hold ourselves to the highest service standards, and we apologize that your experience was less than exceptional. Please contact our leadership directly so we can make this right.`;
      }

      setGeneratedReply(reply);
      setLoading(false);
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              GMB SaaS Automation Feature
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 font-heading">
              AI Customer Review Reply Generator
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Generate personalized, high-converting Google Business Profile review responses in seconds to boost local ranking trust signals.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Reviewer Name
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Star Rating Received
                </label>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                        rating === s
                          ? "bg-amber-500 text-white shadow-sm"
                          : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${rating === s ? "fill-white" : "fill-amber-400 text-amber-400"}`} />
                      <span>{s}★</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Response Tone
                </label>
                <div className="flex gap-2">
                  {(["professional", "friendly", "concise"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                        tone === t
                          ? "bg-teal-700 text-white shadow-sm"
                          : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Customer's Review Content
              </label>
              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <Button
              variant="primary"
              onClick={handleGenerate}
              className="w-full py-3 justify-center text-sm font-bold shadow-sm"
              disabled={loading}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {loading ? "Generating Smart Response..." : "Generate AI Review Response"}
            </Button>

            {generatedReply && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4 text-teal-600" /> Drafted Response
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied to Clipboard!" : "Copy Response"}</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-sm text-slate-800 leading-relaxed font-medium">
                  {generatedReply}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
