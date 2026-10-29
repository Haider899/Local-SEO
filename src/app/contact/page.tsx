"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="relative pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3.5 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase rounded-full bg-blue-500/10 border border-blue-500/20">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Let&apos;s Build Your Digital & Local Dominance
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Have questions about our GMB SEO SaaS, AI Development, or custom systems? Reach out to our team of engineers and growth strategists today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Direct Channels</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300">Email Us</h4>
                      <p className="text-slate-400 text-sm mt-0.5">support@omnirank.ai</p>
                      <p className="text-slate-500 text-xs mt-1">Typical response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300">Call Support</h4>
                      <p className="text-slate-400 text-sm mt-0.5">+1 (800) 555-RANK</p>
                      <p className="text-slate-500 text-xs mt-1">Mon-Fri: 9am - 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300">Office Location</h4>
                      <p className="text-slate-400 text-sm mt-0.5">Global Digital Delivery Hub</p>
                      <p className="text-slate-500 text-xs mt-1">Austin, TX & Remote Infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 backdrop-blur-xl">
                <h4 className="text-base font-semibold text-blue-400 mb-2">Looking for Instant GMB Audit?</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Test your business ranking now with our Free SEO Checker tool without waiting for a reply.
                </p>
                <Button variant="outline" href="/free-tools/local-rank-checker" className="w-full">
                  Launch Free SEO Scanner
                </Button>
              </div>
            </div>

            {/* Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
                <p className="text-sm text-slate-400 mb-8">
                  Fill out the form below and one of our product consultants will get back to you shortly.
                </p>

                {success && (
                  <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <p className="text-sm">Thank you! Your inquiry has been saved and our team has been notified.</p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@business.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        placeholder="Apex Dental Care"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Service of Interest
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Local SEO (GMB + Website)">Local SEO (GMB + Website) - System 2</option>
                      <option value="AI Agents Development">AI Agents Development</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Trading Web Development">Trading Web Development</option>
                      <option value="Real Cash Game Development">Real Cash Game Development</option>
                      <option value="Software Development">Software Development</option>
                      <option value="App Development">App Development</option>
                      <option value="Google Ads & Meta Ads Management">Google Ads & Meta Ads Management</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="AI Video Creation">AI Video Creation</option>
                      <option value="Shopify Creation & Management">Shopify Creation & Management</option>
                      <option value="Business Reputation Management">Business Reputation Management</option>
                      <option value="CRM & ERP Systems Development">CRM & ERP Systems Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Your Message or Project Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project requirements, current ranking challenges, or timeline..."
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="w-full py-3.5 text-base font-semibold shadow-lg shadow-blue-500/25"
                  >
                    {loading ? "Transmitting Request..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
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

