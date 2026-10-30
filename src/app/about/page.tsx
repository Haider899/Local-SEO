import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Terminal,
  Users,
  Target,
  ArrowRight,
  Code2,
  CheckCircle2,
  Award,
  Globe,
} from "lucide-react";

export const metadata = {
  title: "About Us | Innovative Software House & Technology Group",
  description:
    "We are a forward-thinking software house engineering bespoke enterprise platforms, applied AI systems, and our flagship Innovative SEO SaaS.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Excellence & Applied AI</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight font-heading">
              A Software House That Builds Enterprise Systems & Scalable SaaS
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              We are senior engineers, product designers, and AI specialists. We partner with visionary founders and global enterprises to turn bold ideas into high-throughput digital products.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button variant="gradient" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Work With Us
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary" size="lg">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-10 bg-white text-slate-900 border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-indigo-600 font-heading">99.99%</div>
                <div className="text-xs text-slate-500 font-medium">Uptime Across Built Systems</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-sky-600 font-heading">50+</div>
                <div className="text-xs text-slate-500 font-medium">Enterprise & SaaS Launches</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-heading">12+</div>
                <div className="text-xs text-slate-500 font-medium">Free Developer & SEO Tools</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-purple-600 font-heading">&lt; 100ms</div>
                <div className="text-xs text-slate-500 font-medium">Average Edge API Response</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story & Philosophy */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Our Philosophy
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
                  We Don't Just Write Code. We Build Scalable Digital Assets.
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Traditional software agencies hand off brittle prototypes that break when user traffic spikes. We build software with the rigor of distributed systems engineering — strictly typed, thoroughly tested, and fortified against cybersecurity threats.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  To prove our capabilities, we built and maintain <strong>Innovative SEO</strong>: a full-scale commercial SaaS platform and free SEO developer tool ecosystem running under the same unified domain.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Zero-Trust Architecture</div>
                      <div className="text-xs text-slate-500">SSRF mitigation, AES-256 token vaults, and tenant isolation baked in.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">True Production AI</div>
                      <div className="text-xs text-slate-500">Deterministic guardrails, vector RAG search, and automated agent workflows.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Full Code Ownership</div>
                      <div className="text-xs text-slate-500">No vendor lock-in. Clean, documented repositories handed over to your team.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Card */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900 font-heading">Our Core Principles</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Target className="w-4 h-4 text-indigo-600" />
                      <span>Product-Driven Engineering</span>
                    </div>
                    <p className="text-xs text-slate-500">Every architectural decision is tied directly to customer retention, conversion, and ARR growth.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Terminal className="w-4 h-4 text-emerald-600" />
                      <span>Modern, Maintainable Stacks</span>
                    </div>
                    <p className="text-xs text-slate-500">TypeScript, Next.js, Node.js, PostgreSQL, Docker. No legacy monoliths or obscure dependencies.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <ShieldCheck className="w-4 h-4 text-rose-600" />
                      <span>Security Without Compromise</span>
                    </div>
                    <p className="text-xs text-slate-500">Enterprise security from Day 1, ensuring compliance with SOC 2, HIPAA, and GDPR standards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white text-slate-900 text-center border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
              Let's Build Something Extraordinary Together
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Whether you need a full development squad or specialized architectural leadership, we are ready to execute.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <Button variant="gradient" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start a Conversation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
