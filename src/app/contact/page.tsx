"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    service: "Local SEO (GMB + Website)",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact_inquiry",
          name: form.name,
          email: form.email,
          phone: form.phone,
          businessName: form.businessName,
          service: form.service,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          businessName: "",
          service: "Local SEO (GMB + Website)",
          message: "",
        });
      } else {
        setError(data.error || "Failed to submit message. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 relative overflow-hidden">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/10 blur-[130px] -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 text-xs font-bold tracking-wider text-teal-800 uppercase rounded-full bg-teal-50 border border-teal-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Get In Touch With Innovative
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-heading">
              Let&apos;s Build Your Digital & Local Dominance
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Have questions about our GMB SEO SaaS, AI Development, or custom software engineering? Reach out to our team of architects and growth strategists today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Direct Channels Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-black text-slate-900 font-heading">Direct Channels</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/80 shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Inquiry</h4>
                      <p className="text-slate-900 text-sm font-bold mt-0.5">support@itibusinesssuite.online</p>
                      <p className="text-slate-500 text-xs mt-0.5">Direct response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 shrink-0">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Support Portal</h4>
                      <p className="text-slate-900 text-sm font-bold mt-0.5">haiderusama707@gmail.com</p>
                      <p className="text-slate-500 text-xs mt-0.5">Direct technical & project desk</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200/80 shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Engineering Hub</h4>
                      <p className="text-slate-900 text-sm font-bold mt-0.5">Innovative Technology Group</p>
                      <p className="text-slate-500 text-xs mt-0.5">ITI Business Suite Digital Infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50/70 to-emerald-50/50 p-6 space-y-3">
                <h4 className="text-sm font-bold text-teal-900 flex items-center gap-1.5 font-heading">
                  <Sparkles className="w-4 h-4 text-teal-600" /> Looking for an Instant Audit?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Run a real-time crawl on your business website and Google Maps presence now with our Free SEO Tools without waiting.
                </p>
                <div className="pt-1">
                  <Button variant="gradient" size="sm" href="/free-tools" className="w-full">
                    Launch Free SEO Tools Hub
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight font-heading">Send Us a Message</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out the form below and our team will get in touch with you shortly.
                  </p>
                </div>

                {success && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <p className="text-xs font-semibold">Thank you! Your inquiry has been received. Our team will follow up promptly.</p>
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
                    <p className="text-xs font-semibold">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Business / Brand Name
                      </label>
                      <input
                        type="text"
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        placeholder="e.g. Acme Corporation"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Service of Interest
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-colors"
                    >
                      <option value="Local SEO (GMB + Website)">Local SEO (GMB + Website)</option>
                      <option value="AI Agents Development">AI Agents Development</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Trading Web Development">Trading Web Development</option>
                      <option value="Real Cash Game Development">Real Cash Game Development</option>
                      <option value="Software Development">Software Development</option>
                      <option value="App Development">App Development</option>
                      <option value="Google Ads & Meta Ads Management">Google Ads & Meta Ads Management</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="CRM & ERP Systems Development">CRM & ERP Systems Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message or Project Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project requirements, current ranking challenges, or goals..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="md"
                    disabled={loading}
                    className="w-full py-3"
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    {loading ? "Transmitting Inquiry..." : "Submit Inquiry"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
