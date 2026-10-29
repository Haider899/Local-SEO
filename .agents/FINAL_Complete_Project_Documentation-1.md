# FINAL PROJECT DOCUMENTATION
## Company Website + GMB SEO SaaS Tool + Free SEO Checker + Admin Panel

**Status:** FINAL — this is the version to build from.
**Prepared for:** Developer

---

## 0. Project Overview

Three client-facing systems + one internal admin panel controlling everything:

| # | System | Purpose | Hosting |
|---|---|---|---|
| 1 | **Company Website** | Represents the company and all 13 services | Main server |
| 2 | **GMB SEO SaaS Tool** | Paid subscription tool that automatically does Local SEO for clients' Google Business Profiles, including geo-grid ranking intelligence | **Separate VPS** |
| 3 | **Free SEO Checker** | Lead-generation tool embedded on the website; also the entry point to the GMB SaaS funnel | Main server |
| 4 | **Admin Panel** | Internal dashboard to manage all clients, data, packages, and account access | Same VPS as System 2 |

---

## 1. Company Website

### 1.1 Services to Represent
Each gets its own page with a "Get a Quote" CTA:
1. Website Development
2. AI Agents Development
3. Trading Web Development
4. Real Cash Game Development
5. Software Development
6. App Development
7. Google Ads & Meta Ads Management
8. Social Media Management
9. AI Video Creation
10. Shopify Creation & Management
11. **Local SEO (GMB + Website)** — links to System 2's pricing/signup
12. Business Reputation Management (negative review removal + review generation)
13. CRM & ERP Systems Development

### 1.2 Pages
Home, Services (overview + individual pages), Portfolio, About, Pricing, Local SEO landing page (hosts the free checker), Blog (optional), Contact.

### 1.3 Tech Stack
```
Frontend  → Next.js (React) + Tailwind CSS
CMS       → Headless CMS (Sanity/Strapi) for non-developer content edits
Hosting   → Vercel or VPS (Nginx + PM2)
Forms     → Quote/contact forms → DB + email notification
Analytics → Google Analytics + Search Console
```

---

## 2. GMB SEO SaaS Tool (System 2)

### 2.1 Full Client Journey

**Step 1 — Lead comes in:** Visitor requests a free GMB report via the website or checker tool (name, business, email).

**Step 2 — Free audit runs:** Backend pulls public GMB data, generates a Health Report (score + top issues).

**Step 3 — Report delivered + lead saved:** Report emailed to the lead. Lead record saved to the database, visible in the Admin Panel (Section 4) for sales follow-up.

**Step 4 — Client signs up & pays:** Client creates an account (name, email, password, business details) and selects **Package 1 ($20/mo)** or **Package 2 ($50/mo)**, pays via Stripe/payment gateway. **This signup data is stored immediately in the database** — this is the client record the Admin Panel manages (Section 4).

**Step 5 — GMB connection:** Only after signup/payment, client clicks "Connect Google Business Profile" → Google OAuth 2.0 → tokens stored encrypted.

**Step 6 — Mode selection:** Client chooses Auto Mode or Approval Mode (changeable anytime).

**Step 7 — Full audit runs** with real access; starting Health Score calculated.

**Step 8 — Ongoing automated work begins** (Section 2.2).

**Step 9 — Recurring reporting:** Weekly/monthly report emailed + shown on client dashboard.

### 2.2 What the Tool Does (Ongoing)

**A. Profile Optimization** (official GBP API) — category, services, attributes, description, hours; auto-fixed or proposed depending on mode. **Name/address/primary category changes always require manual approval**, in either mode.

**B. Content Posting** — AI-generated GBP posts on a rotating schedule (service/offer/FAQ/seasonal).

**C. Review Management** — AI-drafted personalized replies to new reviews; automated review-request messages to customers to grow genuine review volume.

**D. Q&A Monitoring** — detects and drafts/publishes answers to new listing questions.

**E. Geo-Grid Ranking Intelligence** — geocodes the business, builds a grid (e.g. 5x5) around it, checks keyword ranking at each point weekly, stores history, builds a heatmap. **Feeds results into the AI decision engine** so weak zones become specific, explained actions (e.g. "weak in the north zone — competitor there has more reviews — target review requests from that area").

**F. AI Decision Engine** — runs weekly per client, combines audit + reviews + geo-grid data into a prioritized action list, each logged permanently with before/after results.

**G. Website SEO (Package 2 only)** — crawls client website (titles, meta, H1s, schema, PageSpeed Insights score, mobile-friendliness), produces recommendations and a Website SEO Score, shown in a combined report.

### 2.3 Out of Scope (Future Add-On Product)
Citations, backlinks, and AI-search visibility tracking are **not** part of this tool — build as a separate future product.

### 2.4 Packages (Admin-Editable — Section 4)

**Package 1 — GMB SEO — $20/month**
- Full Google Business Profile setup & optimization
- Weekly AI-generated posts
- Automatic, personalized replies to every review
- Review growth system (automated customer requests)
- Q&A monitoring & responses
- Local ranking map across your service area
- AI-powered weekly action plan
- Monthly performance report (calls, clicks, directions, visibility)
- Auto Mode or Approval Mode

**Package 2 — GMB + Website SEO — $50/month**
Everything in Package 1, plus:
- Full website SEO audit (speed, mobile-friendliness, meta tags, structure)
- On-page SEO recommendations
- Combined GMB + Website performance report
- Local landing page optimization guidance

### 2.5 Tech Stack
```
Hosting         → Separate VPS (subdomain: app.yourcompany.com)
Frontend        → Next.js (client dashboard)
Backend         → Node.js (NestJS) or Python (FastAPI)
Database        → PostgreSQL
Queue/Scheduler → Redis + BullMQ (or Celery)
Google Layer    → Google Business Profile API + Geocoding API (OAuth)
Ranking Data    → Scraper (isolated worker) or paid SERP API — swappable
AI Layer        → LLM API, structured JSON output for every action
Payments        → Stripe (or regional gateway)
Website Crawler → Playwright (Package 2 only)
```

### 2.6 Build Phases
- Phase 1: Signup/payment/package system, OAuth, profile optimization, posts, review replies, Q&A, Auto/Approval modes, admin panel (v1).
- Phase 2: Geo-grid engine + heatmap.
- Phase 3: AI Decision Engine (audit + reviews + geo-grid → prioritized actions).
- Phase 4: Website SEO module for Package 2.
- Future: Citations/backlinks/AI-visibility as a separate add-on product.

---

## 3. Free SEO Checker Tool (System 3)

Also functions as the top of the GMB SaaS funnel (Section 2.1, Steps 1–3).

**Checks:** GMB profile completeness, review count/rating, response rate, NAP consistency → GMB Score. Optional website check via PageSpeed Insights API → Website Score.

**Flow:** Visitor enters business/GMB + optional URL + email → backend pulls public data → AI generates report + recommendations → shown on-screen (not downloadable) + emailed → lead saved to DB (visible in Admin Panel) → CTA to subscribe.

**Tech:** Same Next.js codebase as website; lightweight backend endpoint; PageSpeed Insights API + GMB public data source; LLM for report text.

---

## 4. Admin Panel (System 4) — Full Specification

This is the internal control center for the business — separate login from client accounts, used only by your team.

### 4.1 Client Data Capture (Automatic)
Every client who signs up on the website/SaaS tool must have their data stored in the database and visible here, including:
- Full name, email, phone (if collected), business name
- Package selected + subscription status (active/cancelled/past due)
- Signup date, last login date
- GMB connection status (connected / not connected / token expired)
- Payment history (via Stripe records, linked not duplicated)
- Current Health Score, geo-grid summary, last action taken by the AI
- All leads from the Free SEO Checker funnel (even if they never became paying clients) — separate "Leads" list from "Clients" list

### 4.2 Client Account Controls
- **View full client profile** — everything in 4.1, plus full activity/action log for that client
- **Change/reset a client's password** directly from the admin panel (e.g. for support requests)
- **Disable a client account:**
  - Client can no longer log in
  - All automation for that client **pauses immediately** — no scheduled posts, no review replies, no geo-grid checks, no AI actions run
  - Current state (progress, history, settings, mode) is preserved, not deleted
- **Enable a client account:**
  - Login restored
  - Automation **resumes exactly from where it left off** — this means the system must track state (e.g. last completed action, next scheduled job) rather than just a simple on/off flag, so re-enabling doesn't restart from zero or lose history
- **Manually change a client's package/plan** (e.g. upgrade/downgrade without waiting for self-service)
- **Manually extend or cancel a subscription** (e.g. for goodwill/support cases)
- **Impersonate/login as client** (view their dashboard exactly as they see it — useful for support troubleshooting)

### 4.3 Package & Pricing Management
- Edit price and feature list for each package (stored in DB, not hardcoded — see earlier documentation) without needing a developer
- Add new packages in the future

### 4.4 Operational Monitoring
- Failed job / API error alerts (e.g. GMB token expired, scraper blocked, payment failed) — so issues are caught before the client notices
- Queue/job status overview (how many scheduled actions are pending, running, failed)

### 4.5 Team & Access Control
- Multiple admin logins with roles (e.g. Super Admin, Sales, Support) so not everyone has full access (e.g. Sales sees leads/clients but not billing settings)
- Admin action log — every password reset, enable/disable, or manual override is itself logged with which admin did it and when (accountability)

### 4.6 Exports & Reporting
- Export client list / leads list to CSV
- Basic business overview: total active clients, monthly recurring revenue, churn, new leads this month

### 4.7 Tech Notes
- Admin panel is a separate authenticated app (or a protected section of System 2's backend) — not publicly accessible, ideally with 2FA for admin logins given the sensitive controls (password resets, account disable, billing overrides)
- Client "disable/enable" must be implemented as a **status flag checked by the job scheduler before running any automation for that client** — not by deleting or altering their underlying data/settings

---

## 5. How the Systems Connect

```
                    Company Website (Main Server)
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                       │
   Service Pages      Free SEO Checker         Pricing Page
   (13 services)        (System 3 → leads)      ($20/$50, DB-driven)
                                                         │
                                                         ↓
                                              app.yourcompany.com (VPS)
                                              GMB SEO SaaS Tool (System 2)
                                              OAuth → Payment → Onboarding →
                                              Automated SEO → Reporting
                                                         │
                                                         ↓
                                                  Admin Panel (System 4)
                                              Manages all client data,
                                              accounts, packages, access
```

---

## 6. Build Order Summary

1. **Company website** (13 service pages + CMS)
2. **Free SEO Checker** (feeds leads into System 2's funnel)
3. **GMB SEO SaaS Tool** on its own VPS — signup/payment/packages first, then OAuth + core automation, then geo-grid, then AI Decision Engine, then Website SEO (Package 2)
4. **Admin Panel** — build alongside System 2 from Phase 1 (client data, password/enable-disable controls, package editing are needed from day one, not added later)

**Explicitly out of scope for now:** citations, backlinks, AI-search visibility — future separate add-on product.
