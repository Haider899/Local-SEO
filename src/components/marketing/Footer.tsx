import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Globe, MapPin, Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-600 to-sky-500 flex items-center justify-center text-white shadow-sm">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Omni<span className="text-teal-400">Rank</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
              A premier software engineering house & AI systems builder, creators of the GMB SEO & Local 3-Pack Automation SaaS platform.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>SSRF-Guarded Enterprise Architecture</span>
            </div>
          </div>

          {/* Software House Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/services/website-development" className="hover:text-white transition-colors">Website Development</Link></li>
              <li><Link href="/services/ai-agents-development" className="hover:text-white transition-colors">AI Agents Development</Link></li>
              <li><Link href="/services/trading-web-development" className="hover:text-white transition-colors">Trading Web Terminals</Link></li>
              <li><Link href="/services/real-cash-game-development" className="hover:text-white transition-colors">Real Cash Game Systems</Link></li>
              <li><Link href="/services/local-seo" className="hover:text-white transition-colors">Local SEO (GMB + Web)</Link></li>
              <li><Link href="/services/crm-erp-development" className="hover:text-white transition-colors">CRM & ERP Systems</Link></li>
              <li><Link href="/services" className="text-teal-400 font-bold hover:underline">All 13 Services →</Link></li>
            </ul>
          </div>

          {/* SaaS Platform & Free Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">SaaS & Tools</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/dashboard/local-seo" className="hover:text-white transition-colors">Google Maps & 5x5 Geo-Grid</Link></li>
              <li><Link href="/free-tools/local-rank-checker" className="hover:text-white transition-colors">Free Local Rank Checker</Link></li>
              <li><Link href="/free-tools/ai-visibility-checker" className="hover:text-white transition-colors">AI Visibility Checker</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Packages ($20 & $50/mo)</Link></li>
              <li><Link href="/free-tools" className="hover:text-white transition-colors">Free SEO Tools Hub</Link></li>
              <li><Link href="/register" className="text-emerald-400 font-bold hover:underline">Start GMB SaaS →</Link></li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio & Works</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">SaaS Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Engineering</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Internal Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} OmniRank Engineering Group & Local Search Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Security Practices</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

