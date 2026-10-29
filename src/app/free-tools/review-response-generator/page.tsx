"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { MessageSquare, Star, Copy, Check, Sparkles, Send } from "lucide-react";

export default function ReviewResponseGeneratorPage() {
  const [businessName, setBusinessName] = useState("Apex Dental Care");
  const [reviewerName, setReviewerName] = useState("Sarah Miller");
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState(
    "Had an emergency tooth extraction yesterday. The doctor and staff were so compassionate, gentle, and fast! Highly recommend this clinic."
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
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="relative pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block py-1 px-3.5 mb-4 text-xs font-semibold tracking-wider text-teal-400 uppercase rounded-full bg-teal-500/10 border border-teal-500/20">
              GMB SaaS Automation Feature
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              AI Customer Review Reply Generator
            </h1>
            <p className="text-slate-400 text-sm">
              Generate personalized, high-converting Google Business Profile review responses in seconds to boost local ranking trust signals.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Reviewer Name
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Star Rating Received
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-600 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-700"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 ml-2 font-medium">
                    {rating} Star{rating > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Response Tone
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(["professional", "friendly", "empathic", "concise"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                        tone === t
                          ? "bg-teal-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Customer&apos;s Review Text
              </label>
              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <Button
              variant="primary"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {loading ? "Synthesizing AI Response..." : "Generate Personalized Response"}
            </Button>

            {generatedReply && (
              <div className="mt-6 p-6 rounded-xl border border-teal-500/30 bg-teal-500/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    Ready-to-Post Reply
                  </span>
                  <Button variant="outline" onClick={handleCopy} className="text-xs py-1 px-3">
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1" /> Copy to Clipboard
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed italic bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                  &ldquo;{generatedReply}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

