export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  category: "engineering" | "marketing" | "ai-data" | "local-seo";
  iconName: string;
  color: string;
  bgLight: string;
  description: string;
  heroHeadline: string;
  outcomes: string[];
  architectureSteps: { title: string; desc: string }[];
  techStack: string[];
  deliverables: string[];
  isSaaSEntrypoint?: boolean;
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    slug: "website-development",
    title: "Website Development",
    subtitle: "High-performance enterprise websites, corporate portals & web applications",
    badge: "Next.js & React Core",
    category: "engineering",
    iconName: "Globe",
    color: "from-sky-600 to-cyan-600",
    bgLight: "bg-sky-50 text-sky-700 border-sky-200",
    heroHeadline: "Sub-Second Load Speeds & Custom Engineered Digital Web Experiences",
    description:
      "We design and build bespoke, high-converting websites and modern corporate portals. Engineered with Next.js App Router, headless CMS architectures, and global CDN edge caching for maximum performance and organic search dominance.",
    outcomes: [
      "Lighthouse 95+ Core Web Vitals performance across all devices",
      "Dynamic Headless CMS content workflows for non-technical teams",
      "Built-in SEO semantics, schema markup, and social OpenGraph tags",
      "Zero-downtime automated CI/CD deployments on modern edge clouds",
    ],
    architectureSteps: [
      {
        title: "1. Information Architecture & UX Prototype",
        desc: "Wireframing high-converting visitor funnels, responsive layout grids, and interactive user journeys.",
      },
      {
        title: "2. Edge-Rendered Component Architecture",
        desc: "Modular React Server Components, Tailwind CSS design system tokens, and micro-animations.",
      },
      {
        title: "3. CMS & API Integration",
        desc: "Integration with headless CMS (Sanity/Strapi), REST/GraphQL data sources, and custom contact pipelines.",
      },
      {
        title: "4. Performance Optimization & Launch",
        desc: "Image optimization, font subsetting, CDN edge routing, and automated security header checks.",
      },
    ],
    techStack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Headless CMS", "Vercel / Cloudflare Edge"],
    deliverables: [
      "Custom responsive web application codebase",
      "Production-ready headless CMS management panel",
      "Automated SSL certificates, CDN routing & DNS setup",
      "30-day post-launch technical warranty and maintenance",
    ],
  },
  {
    slug: "ai-agents-development",
    title: "AI Agents Development",
    subtitle: "Autonomous LLM agents, multi-agent orchestrations & custom workflow automations",
    badge: "Autonomous Systems",
    category: "ai-data",
    iconName: "Bot",
    color: "from-teal-600 to-emerald-600",
    bgLight: "bg-teal-50 text-teal-700 border-teal-200",
    heroHeadline: "Self-Operating AI Agents Engineered to Automate Complex Business Operations",
    description:
      "We build production-ready autonomous AI agents that reason, use external APIs, execute database transactions, and collaborate in multi-agent swarms. From customer support copilots to automated research and lead qualification agents.",
    outcomes: [
      "Automate 70%+ of routine business communication and operational workflows",
      "Multi-agent swarm coordination using LangGraph, CrewAI, and custom execution runtimes",
      "Deterministic structured JSON outputs with strict guardrails and hallucination checks",
      "Secure private enterprise deployment with zero training on your proprietary data",
    ],
    architectureSteps: [
      {
        title: "1. Tool & Action Definition",
        desc: "Defining strict OpenAPI function schemas, external tools, database connectors, and security boundaries.",
      },
      {
        title: "2. Cognitive State Machine & Memory",
        desc: "Configuring short-term conversational context, long-term vector memory, and reflection loops.",
      },
      {
        title: "3. Multi-Agent Orchestration",
        desc: "Implementing supervisor and specialist agent patterns for complex multi-step reasoning.",
      },
      {
        title: "4. Guardrails & Evaluation Benchmarking",
        desc: "Automated regression testing against synthetic edge cases to verify output safety and accuracy.",
      },
    ],
    techStack: ["LangChain / LangGraph", "OpenAI / Claude API", "Python / FastAPI", "Pinecone / Qdrant", "Docker"],
    deliverables: [
      "Deployable AI Agent runtime service with REST & Webhook APIs",
      "Supervisor dashboard to inspect agent thoughts, logs, and token costs",
      "End-to-end unit and integration test suite with synthetic benchmarks",
      "API documentation and enterprise sandbox testing environment",
    ],
  },
  {
    slug: "trading-web-development",
    title: "Trading Web Development",
    subtitle: "High-frequency crypto, forex & stock trading web terminals with real-time charts",
    badge: "Low Latency & WebSockets",
    category: "engineering",
    iconName: "TrendingUp",
    color: "from-emerald-600 to-teal-600",
    bgLight: "bg-emerald-50 text-emerald-700 border-emerald-200",
    heroHeadline: "Sub-Millisecond Financial Dashboards & Real-Time Trading Terminals",
    description:
      "We engineer enterprise-grade web trading platforms, decentralized crypto exchange frontends, and automated trading bot cockpits. Built with high-speed WebSocket data pipes, TradingView chart integration, and bank-grade security protocols.",
    outcomes: [
      "Sub-50ms tick-to-render streaming charts with zero visual stuttering or memory leaks",
      "Seamless integration with Binance, Bybit, Alpaca, MetaTrader, and custom FIX protocol gateways",
      "Multi-account management, risk limits, automated stop-loss, and margin calculations",
      "Bank-grade authentication with mandatory hardware 2FA and cold wallet withdrawal safety",
    ],
    architectureSteps: [
      {
        title: "1. Market Data Ingestion Pipeline",
        desc: "Connecting redundant WebSocket feeds with automatic reconnect and binary message unpacking.",
      },
      {
        title: "2. Interactive Charting Canvas",
        desc: "Integrating TradingView Charting Library with custom indicators, order book depth, and heatmaps.",
      },
      {
        title: "3. Order Routing & Execution Engine",
        desc: "Idempotent order placement endpoints with microsecond clock synchronization.",
      },
      {
        title: "4. Stress Testing & Liquidity Simulation",
        desc: "Simulating heavy volatility spikes and thousands of concurrent order submissions.",
      },
    ],
    techStack: ["TradingView Technicals", "Next.js 14", "WebSockets / WebRTC", "Go / Rust Microservices", "Redis", "TimescaleDB"],
    deliverables: [
      "Full trading terminal web application with dark-mode financial UI",
      "Real-time order book, trade tape, and position portfolio modules",
      "Broker & exchange API connectors with HMAC SHA256 request signing",
      "Production deployment guide with DDoS defense configuration",
    ],
  },
  {
    slug: "real-cash-game-development",
    title: "Real Cash Game Development",
    subtitle: "Provably fair cash games, card games, sports fantasy & multiplayer gaming systems",
    badge: "Provably Fair RNG",
    category: "engineering",
    iconName: "Gamepad2",
    color: "from-amber-600 to-orange-600",
    bgLight: "bg-amber-50 text-amber-700 border-amber-200",
    heroHeadline: "Engaging Real-Money Multiplayer Games with Provably Fair Math Engines",
    description:
      "We design, build, and deploy secure real cash gaming platforms including skill-based card games, crash games, fantasy sports, and casual casino experiences. Features SHA-256 provably fair verification, automated ledger wallets, and anti-fraud engines.",
    outcomes: [
      "Cryptographically verified provably fair seed generation (client seed + server seed)",
      "Instant deposit and withdrawal engine supporting crypto and local fiat payment gateways",
      "Multiplayer synchronization with state reconciliation and anti-cheat packet inspection",
      "Regulatory compliance features including KYC/AML verification and self-exclusion limits",
    ],
    architectureSteps: [
      {
        title: "1. Game Mechanics & Mathematical Modeling",
        desc: "Defining Return-to-Player (RTP) percentages, volatility profiles, and game rule matrices.",
      },
      {
        title: "2. Secure Real-Time Game Server",
        desc: "Authoritative room-based game server with room matchmaking, tick-based simulation, and state sync.",
      },
      {
        title: "3. Wallet Ledger & Gateway Integration",
        desc: "Double-entry accounting ledger ensuring atomic player balance updates with zero balance race conditions.",
      },
      {
        title: "4. Compliance & Anti-Collusion Engine",
        desc: "IP clustering, device fingerprinting, and suspicious bet pattern detection systems.",
      },
    ],
    techStack: ["Phaser.js / Pixi.js", "Node.js (NestJS)", "Redis Pub/Sub", "PostgreSQL ACID", "WebSockets"],
    deliverables: [
      "Complete multiplayer web gaming client with custom sound & animation assets",
      "Authoritative game backend server with matchmaking and room manager",
      "Administrative master back-office for game RTP monitoring and player balance controls",
      "Provably fair cryptographic verification widget for players",
    ],
  },
  {
    slug: "software-development",
    title: "Software Development",
    subtitle: "Custom enterprise backend systems, microservices architectures & distributed engines",
    badge: "Enterprise Architecture",
    category: "engineering",
    iconName: "Code2",
    color: "from-teal-600 to-sky-600",
    bgLight: "bg-teal-50 text-teal-700 border-teal-200",
    heroHeadline: "Mission-Critical Backend Systems Built for High Concurrency & Zero Downtime",
    description:
      "Bespoke software engineering for organizations requiring scalable backend architectures, high-throughput distributed pipelines, internal workflow automation, and custom API ecosystems built for decades of reliable scale.",
    outcomes: [
      "Sub-100ms API response latency under heavy distributed load",
      "Zero-downtime blue/green deployment pipelines with container orchestration",
      "Strict data isolation, tenant partitioning, and end-to-end type safety",
      "Comprehensive unit, integration, and load testing suites with 90%+ code coverage",
    ],
    architectureSteps: [
      {
        title: "1. Domain Modeling & System Architecture",
        desc: "Event-driven decomposition, relational database normalization, and API boundary definitions.",
      },
      {
        title: "2. High-Performance Implementation",
        desc: "Clean code adhering to SOLID principles, dependency injection, and asynchronous I/O.",
      },
      {
        title: "3. Distributed Infrastructure",
        desc: "Containerization with Docker, Kubernetes manifests, and message queues (RabbitMQ/Kafka).",
      },
      {
        title: "4. Observability & Telemetry",
        desc: "Prometheus metrics, distributed tracing with OpenTelemetry, and structured JSON log pipelines.",
      },
    ],
    techStack: ["Go", "Node.js (NestJS)", "Python", "PostgreSQL", "Redis", "Docker", "AWS / GCP"],
    deliverables: [
      "Production-ready microservices code repository",
      "Interactive Swagger/OpenAPI documentation and client SDKs",
      "Terraform / Docker infrastructure-as-code automation scripts",
      "Comprehensive architectural handover documentation",
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    subtitle: "Cross-platform iOS and Android mobile applications built with native performance",
    badge: "iOS & Android",
    category: "engineering",
    iconName: "Smartphone",
    color: "from-purple-600 to-pink-600",
    bgLight: "bg-purple-50 text-purple-700 border-purple-200",
    heroHeadline: "Fluid, 60fps Native-Feel Mobile Apps Engineered for Immediate Market Adoption",
    description:
      "We design and develop high-performance mobile apps for iOS and Android using React Native and Flutter. From offline-first data sync and biometric authentication to push notification engines and in-app subscription monetization.",
    outcomes: [
      "Unified single codebase for simultaneous App Store and Google Play store releases",
      "Offline-first sync architectures with background data synchronization",
      "Native device hardware integrations (Camera, Biometrics, GPS, Bluetooth BLE, Push)",
      "Streamlined Apple App Review and Google Play compliance pass rates",
    ],
    architectureSteps: [
      {
        title: "1. Mobile UI/UX Design System",
        desc: "Human Interface Guidelines and Material Design 3 token systems with native touch gestures.",
      },
      {
        title: "2. Client-Side App Engineering",
        desc: "Clean architecture implementation with state management (Zustand/Riverpod) and offline SQLite caching.",
      },
      {
        title: "3. Backend Mobile API & Auth",
        desc: "Optimized mobile REST/GraphQL endpoints with token refresh and image compression pipelines.",
      },
      {
        title: "4. Store Submission & TestFlight",
        desc: "App Store Connect and Google Play Console release management with automated fastlane builds.",
      },
    ],
    techStack: ["React Native", "Flutter", "TypeScript", "Firebase", "App Store Connect", "Fastlane"],
    deliverables: [
      "Published iOS and Android applications ready on App Store and Google Play",
      "Complete mobile source code repository with modular architecture",
      "Push notification server integration with Firebase Cloud Messaging (FCM)",
      "Crashlytics and user analytics tracking dashboards",
    ],
  },
  {
    slug: "ads-management",
    title: "Google Ads & Meta Ads Management",
    subtitle: "High-ROI paid search, performance max & social advertising campaigns with tracking",
    badge: "Maximum ROAS",
    category: "marketing",
    iconName: "Megaphone",
    color: "from-rose-600 to-red-600",
    bgLight: "bg-rose-50 text-rose-700 border-rose-200",
    heroHeadline: "Data-Driven Paid Ad Campaigns Engineered to Lower Customer Acquisition Costs",
    description:
      "Turn ad spend into measurable revenue. We engineer, write, design, and manage high-converting Google Ads (Search, Shopping, Performance Max) and Meta Ads (Facebook & Instagram) campaigns paired with server-side conversion tracking.",
    outcomes: [
      "3x to 8x verified Return on Ad Spend (ROAS) across competitive commercial verticals",
      "100% server-side conversion tracking (Meta CAPI & Google Enhanced Conversions)",
      "High-intent negative keyword architectures preventing wasted ad budget",
      "Dynamic creative split-testing (hooks, angles, visual creatives, and offer copy)",
    ],
    architectureSteps: [
      {
        title: "1. Conversion Tracking & Pixel Audit",
        desc: "Deploying Google Tag Manager Server-Side containers and Meta Conversions API to eliminate signal loss.",
      },
      {
        title: "2. Account Restructuring & Keyword Mining",
        desc: "High-intent commercial search query research, single-theme ad groups, and competitor conquesting.",
      },
      {
        title: "3. High-Converting Ad Creative Production",
        desc: "Designing scroll-stopping ad creatives, copywriting compelling hooks, and building dedicated landing pages.",
      },
      {
        title: "4. Algorithmic Bid Optimization & Scaling",
        desc: "Scaling winning ad sets with Smart Bidding (Target CPA, Target ROAS) and weekly budget reallocation.",
      },
    ],
    techStack: ["Google Ads", "Meta Business Manager", "Google Tag Manager Server-Side", "Looker Studio", "Meta CAPI"],
    deliverables: [
      "Full multi-channel campaign launch and ongoing daily optimization",
      "Custom Looker Studio real-time reporting dashboard with transparent CAC/ROAS",
      "A/B split testing log with copy variations and creative asset archives",
      "Weekly performance summary and bi-weekly strategic growth calls",
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    subtitle: "Organic brand authority, viral short-form content & active audience growth",
    badge: "Brand Authority",
    category: "marketing",
    iconName: "Share2",
    color: "from-pink-600 to-rose-600",
    bgLight: "bg-pink-50 text-pink-700 border-pink-200",
    heroHeadline: "Transform Your Social Channels into Authority-Building Customer Acquisition Funnels",
    description:
      "We manage your brand's presence across LinkedIn, Instagram, TikTok, YouTube, and X (Twitter). From content calendar architecture and carousel designs to community engagement and audience conversion funnels.",
    outcomes: [
      "Consistent 5-7x weekly high-impact posts across prioritized platforms",
      "Authority positioning that attracts inbound enterprise partnerships and B2B buyers",
      "Community engagement workflows ensuring prompt replies to comments and DMs",
      "Clear monthly reporting tracking follower growth, impressions, reach, and link clicks",
    ],
    architectureSteps: [
      {
        title: "1. Brand Voice & Audience Matrix",
        desc: "Defining tone of voice, visual identity guidelines, core content pillars, and customer personas.",
      },
      {
        title: "2. Monthly Editorial Calendar",
        desc: "Planning 30 days in advance with educational, entertaining, social proof, and direct-offer posts.",
      },
      {
        title: "3. Content Production & Graphic Design",
        desc: "Crafting bespoke graphic assets, carousel slides, caption copy, and curated hashtag groupings.",
      },
      {
        title: "4. Publishing & Active Engagement",
        desc: "Scheduling at peak algorithmic hours and active community interaction within the first hour of posting.",
      },
    ],
    techStack: ["Figma", "Buffer / Hootsuite", "CapCut Pro", "Canva Enterprise", "Social Analytics APIs"],
    deliverables: [
      "Full monthly content schedule with approved graphics and caption copy",
      "Daily publishing and active inbound comment monitoring",
      "Monthly comprehensive engagement and follower growth analytics report",
      "Raw source design files (Figma templates) for all produced visual assets",
    ],
  },
  {
    slug: "ai-video-creation",
    title: "AI Video Creation",
    subtitle: "Hyper-realistic AI avatars, viral Reels/TikToks, automated product demos & voice cloning",
    badge: "Generative Media",
    category: "marketing",
    iconName: "Video",
    color: "from-teal-600 to-cyan-600",
    bgLight: "bg-teal-50 text-teal-700 border-teal-200",
    heroHeadline: "Studio-Quality Marketing & Educational Videos Generated at 10x Speed and 1/10th Cost",
    description:
      "Leverage the cutting edge of generative AI video. We produce photorealistic AI spokesperson avatars, automated multi-language video dubbing, viral short-form hooks for TikTok and Reels, and cinematic product showcase animations.",
    outcomes: [
      "Produce 30+ high-definition marketing videos per month with zero camera crew costs",
      "Multi-lingual localization with instant voice cloning in 40+ global languages and lip-sync",
      "Engaging dynamic captions, B-roll overlays, sound effects, and branded motion graphics",
      "High-converting video ads tested to capture viewer attention in the first 3 seconds",
    ],
    architectureSteps: [
      {
        title: "1. Scriptwriting & Hook Architecture",
        desc: "Writing psychology-backed video scripts optimized for high retention and clear call-to-actions.",
      },
      {
        title: "2. AI Avatar & Voice Synthesis",
        desc: "Generating ultra-realistic digital spokesperson models or cloning your executive's natural voice.",
      },
      {
        title: "3. Generative B-Roll & Visual Compositing",
        desc: "Synthesizing dynamic AI visual backdrops and integrating branded product interface recordings.",
      },
      {
        title: "4. Audio Mastering & Auto-Captions",
        desc: "Applying royalty-free background audio ducking, sound effects, and animated kinetic subtitles.",
      },
    ],
    techStack: ["Runway Gen-3", "HeyGen Enterprise", "ElevenLabs Voice AI", "Midjourney v6", "Adobe Premiere / After Effects"],
    deliverables: [
      "1080p / 4K export video files formatted for 9:16 (Vertical) and 16:9 (Horizontal)",
      "Burned-in animated kinetic subtitles and separate SRT subtitle files",
      "Custom AI avatar models and cloned voice profiles for future instant generation",
      "Complete commercial rights for broadcast, social ads, and corporate web embeds",
    ],
  },
  {
    slug: "shopify-development",
    title: "Shopify Creation & Management",
    subtitle: "Custom Shopify Plus themes, conversion optimization, app integrations & store ops",
    badge: "E-Commerce Growth",
    category: "engineering",
    iconName: "ShoppingBag",
    color: "from-emerald-600 to-teal-600",
    bgLight: "bg-emerald-50 text-emerald-700 border-emerald-200",
    heroHeadline: "High-Converting Shopify Stores Engineered for Maximum Cart Value and Retention",
    description:
      "We design, build, and optimize custom Shopify and Shopify Plus stores. From custom Liquid theme engineering and headless Hydrogen frontends to third-party ERP integrations, checkout upselling, and automated inventory sync.",
    outcomes: [
      "25%+ average increase in store conversion rates and Average Order Value (AOV)",
      "Bespoke Shopify Liquid themes with zero bloated apps slowing down page load speed",
      "Custom 1-click post-purchase checkout upsells and bundle recommendations",
      "Automated inventory and order fulfillment synchronization with external warehouses",
    ],
    architectureSteps: [
      {
        title: "1. UX Flow & Conversion Blueprint",
        desc: "Designing frictionless product catalog browsing, mobile checkout UX, and social proof triggers.",
      },
      {
        title: "2. Custom Theme Development",
        desc: "Building lightweight, modular Shopify 2.0 sections using Liquid, Tailwind CSS, and Vanilla JavaScript.",
      },
      {
        title: "3. App Stack & Tech Stack Rationalization",
        desc: "Replacing slow third-party apps with native custom code to preserve sub-second mobile page speed.",
      },
      {
        title: "4. Checkout & Analytics Setup",
        desc: "Configuring Shopify Checkout Extensibility, post-purchase offers, and GA4 ecommerce tracking.",
      },
    ],
    techStack: ["Shopify Plus", "Shopify Liquid", "Shopify CLI 3.0", "Hydrogen / Remix", "GraphQL Admin API", "Klaviyo"],
    deliverables: [
      "Fully configured, live Shopify store ready for processing commercial orders",
      "Custom responsive Shopify 2.0 theme with drag-and-drop admin sections",
      "Integrated payment gateways (Shopify Payments, PayPal, Stripe, Klarna)",
      "Automated abandoned cart email sequences and customer retention flows",
    ],
  },
  {
    slug: "local-seo",
    title: "Local SEO (GMB + Website)",
    subtitle: "Dominate the Google Maps 3-Pack, local organic rankings & automated profile optimization",
    badge: "Flagship SaaS & Service",
    category: "local-seo",
    iconName: "MapPin",
    color: "from-teal-600 to-emerald-600",
    bgLight: "bg-teal-50 text-teal-700 border-teal-200",
    heroHeadline: "Capture 100% of High-Intent Customers Searching in Your Immediate Service Area",
    description:
      "Our dual Local SEO system combines our automated GMB SEO SaaS Tool with hands-on on-page optimization. We rank your Google Business Profile in the top 3 of Google Maps across your entire radius and optimize your local landing pages.",
    outcomes: [
      "Achieve Top 3 Google Maps Local Pack ranking across a 5-15 mile physical radius",
      "Automated weekly Google Business posts and instant AI-drafted review replies",
      "Interactive 5x5 Geo-Grid rank tracking showing precise rankings block-by-block",
      "Consistent 30% to 150% increase in inbound customer phone calls, clicks, and driving directions",
    ],
    architectureSteps: [
      {
        title: "1. Google Business Profile Deep Audit & Setup",
        desc: "Audit primary and secondary categories, service listings, attributes, and geo-tagged media.",
      },
      {
        title: "2. Website Local Schema & NAP Synchronization",
        desc: "Embedding JSON-LD LocalBusiness schema and aligning Name, Address, and Phone across all signals.",
      },
      {
        title: "3. 5x5 Geo-Grid Ranking Intelligence",
        desc: "Geocoding your business location and monitoring weekly keyword rank changes point-by-point.",
      },
      {
        title: "4. Review Velocity & AI Automated Workflows",
        desc: "Deploying automated customer review request funnels and AI-powered personalized review replies.",
      },
    ],
    techStack: ["Google Business Profile API", "Google Maps Geocoding", "Schema.org JSON-LD", "Geo-Grid Engine", "PageSpeed API"],
    deliverables: [
      "Full Google Business Profile setup, verification, and category optimization",
      "Weekly AI-generated posts and review response automation",
      "Access to our client dashboard with live 5x5 Geo-Grid rank heatmap tracking",
      "Monthly performance report detailing calls, website clicks, and map direction requests",
    ],
    isSaaSEntrypoint: true,
  },
  {
    slug: "reputation-management",
    title: "Business Reputation Management",
    subtitle: "Negative review removal assistance, automated review generation & 5-star brand protection",
    badge: "5-Star Defense",
    category: "marketing",
    iconName: "ShieldAlert",
    color: "from-rose-600 to-amber-600",
    bgLight: "bg-rose-50 text-rose-700 border-rose-200",
    heroHeadline: "Protect Your Brand's Trust Score, Suppress Unfair Reviews & Accelerate Positive Feedback",
    description:
      "One bad review can cost you thousands of dollars in lost contracts. We help identify, dispute, and legally remove policy-violating negative reviews on Google Maps and Trustpilot, while deploying automated SMS/Email workflows that generate dozens of genuine 5-star customer reviews.",
    outcomes: [
      "Removal of fake, defamatory, conflict-of-interest, or policy-violating negative reviews",
      "Automated post-purchase SMS/Email review collection funnels with 45%+ submission rates",
      "Private negative feedback interception stopping unhappy customers before they post publicly",
      "Significant increase in Google star rating to 4.8+ stars, dramatically boosting conversion rates",
    ],
    architectureSteps: [
      {
        title: "1. Full Reputation Audit & Risk Scan",
        desc: "Cataloging all existing reviews across Google, Trustpilot, Facebook, and niche directories.",
      },
      {
        title: "2. Policy Violation Analysis & Dispute Filing",
        desc: "Drafting evidence-backed removal appeals citing official Google Content Policy violations.",
      },
      {
        title: "3. Automated 5-Star Review Generation Funnel",
        desc: "Setting up automated review request workflows triggered immediately when a customer pays or completes an order.",
      },
      {
        title: "4. Real-Time Review Sentiment Monitoring",
        desc: "Instant notifications when new reviews are posted with pre-approved empathetic reply templates.",
      },
    ],
    techStack: ["Google Content Policy Framework", "SMS Gateway (Twilio)", "Email Automation", "Sentiment AI", "Webhook Triggers"],
    deliverables: [
      "Detailed dispute documentation and case filing for policy-violating reviews",
      "Turnkey automated SMS & Email review generation campaign templates",
      "Private customer feedback survey landing page",
      "Monthly reputation health scorecard tracking star rating trends and review velocity",
    ],
  },
  {
    slug: "crm-erp-development",
    title: "CRM & ERP Systems Development",
    subtitle: "Custom enterprise resource planning, sales pipelines, inventory & customer workflows",
    badge: "Internal Systems",
    category: "engineering",
    iconName: "Database",
    color: "from-cyan-600 to-blue-600",
    bgLight: "bg-cyan-50 text-cyan-700 border-cyan-200",
    heroHeadline: "Custom Internal Software That Replaces Fragmented SaaS Subscriptions with Unified Control",
    description:
      "Stop paying thousands of dollars every month for rigid, disconnected tools. We engineer tailor-made CRM and ERP platforms that unify your customer data, sales pipelines, inventory management, invoicing, and team permissions into one secure, intuitive web application.",
    outcomes: [
      "Unified single source of truth eliminating double-entry and manual spreadsheet errors",
      "Granular Role-Based Access Control (RBAC) ensuring employees only see authorized records",
      "Automated invoice generation, PDF exports, and payment gateway reconciliation",
      "Real-time executive dashboards with custom KPI reporting and pipeline velocity tracking",
    ],
    architectureSteps: [
      {
        title: "1. Business Process & Workflow Mapping",
        desc: "Documenting your organization's exact sales lifecycle, inventory movements, and departmental handoffs.",
      },
      {
        title: "2. Relational Database & Entity Modeling",
        desc: "Designing robust PostgreSQL schemas with strict referential integrity and audit trails.",
      },
      {
        title: "3. Modern Web Application Engineering",
        desc: "Building responsive, lightning-fast interfaces with role-based dashboard views and bulk data operations.",
      },
      {
        title: "4. Data Migration & Enterprise Deployment",
        desc: "Securely importing historical records from existing spreadsheets and legacy software.",
      },
    ],
    techStack: ["PostgreSQL", "Next.js 14", "Prisma / Drizzle ORM", "Docker", "Node.js / Go", "Tailwind CSS"],
    deliverables: [
      "Fully customized enterprise CRM / ERP web application tailored to your business",
      "Complete data migration of existing contacts, products, and transaction records",
      "Role-Based Access Control (RBAC) security system with audit logging",
      "Interactive training sessions and complete technical user documentation",
    ],
  },
];

const SLUG_ALIASES: Record<string, string> = {
  "web-development": "website-development",
  "google-meta-ads": "ads-management",
  "google-ads-meta-ads": "ads-management",
  "business-reputation-management": "reputation-management",
  "trading-development": "trading-web-development",
  "cash-game-development": "real-cash-game-development",
  "crm-erp-systems": "crm-erp-development",
  "shopify-creation-management": "shopify-development",
};

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  const normalized = SLUG_ALIASES[slug] || slug;
  return SERVICES_DATA.find((s) => s.slug === normalized || s.slug === slug);
}

