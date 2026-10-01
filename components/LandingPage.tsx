"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Globe,
  DollarSign,
  Users,
  ArrowRight,
  CheckCircle2,
  Award,
  Server,
  Shield,
  Zap,
  Layers,
  Cpu,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Check,
  Clock,
  Sliders,
  TrendingUp,
  Video,
  AlertCircle,
  HelpCircle,
  Trophy
} from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  // Navigation & Scroll State
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Interactive Architecture Tab State
  const [selectedArchTab, setSelectedArchTab] = useState(0);

  // Interactive Checklist State
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  // Interactive Judging Criterion State
  const [activeCriterion, setActiveCriterion] = useState(0);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
const stats = [
  {
    icon: Trophy,
    title: "$14,644 Total Value",
    subtitle: "Enterprise Infra & Grants",
    desc: "Pre-procured credit pools, cloud compute reserves, and DevSwarm Pro licenses."
  },
  {
    icon: Globe,
    title: "100% Unrestricted",
    subtitle: "All Occupations & Ages",
    desc: "Engineers, founders, and students globally. No legacy restrictions."
  },
  {
    icon: Users,
    title: "865+ Verified Builders",
    subtitle: "Active Community",
    desc: "Form squads, pair program, and synchronize via Galuxium Discord hubs."
  },
  {
    icon: Zap,
    title: "Enterprise Stack",
    subtitle: "Production API Pipelines",
    desc: "Direct access to Adaption Labs, Backboard.io compute, and vector RAG hosting."
  }
];
  // Live Countdown State (Target: Oct 31, 2026 17:00:00 GMT+5:30)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2026-10-31T17:00:00+05:30').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleChecklist = (id: number) => {
    setCompletedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const devpostUrl = "https://galuxium-nexus-v2-29411.devpost.com/";

  // Architecture Tabs Data
  const architectureTabs = [
    {
      id: "prod-scale",
      title: "Production Infrastructure",
      subtitle: "High-Availability Edge & Cloud",
      icon: Server,
      headline: "Resilient Architectures Designed for Real-World Concurrency",
      description: "Move beyond isolated code. Build high-availability, zero-trust architectures designed to withstand intense traffic spikes, automate logging, and ensure instantaneous failover across distributed nodes.",
      specs: [
        { label: "Deployment Targets", value: "AWS, GCP, Vercel, Fly.io, Cloudflare" },
        { label: "Security Benchmark", value: "Strict JWT/OAuth & Zero-Trust Env Management" },
        { label: "Uptime Mandate", value: "99.9% Deployed Operational Reliability" },
        { label: "Database Layer", value: "Indexed Postgres, Vector DBs, Edge Caching" }
      ],
      codeSnippet: `// Edge-Optimized Gateway Pipeline
export async function POST(req: Request) {
  const session = await verifyEnterpriseAuth(req);
  if (!session.valid) return new Response('Unauthorized', { status: 401 });
  
  const telemetry = trackLatency(req.headers.get('x-ray-id'));
  const payload = await sanitizeInput(req.json());
  
  return await dispatchToVectorPipeline({
    tenantId: session.orgId,
    data: payload,
    perfTier: 'ultra-low-latency'
  });
}`
    },
    {
      id: "monetization",
      title: "Monetization Engine",
      subtitle: "Automated Fiscal Infrastructure",
      icon: DollarSign,
      headline: "From Zero to Recurring Revenue at Code Level",
      description: "Every single line of code must serve an authentic market need. Architect multi-tier SaaS subscriptions, transactional fee mechanisms, or real-time usage-based API metering from Day 1.",
      specs: [
        { label: "Billing Framework", value: "Stripe Subscriptions, LemonSqueezy, Webhooks" },
        { label: "Metering Engine", value: "Real-time token & request usage tracking" },
        { label: "Provisioning", value: "Automated instant tenant workspace creation" },
        { label: "Conversion Funnel", value: "Self-serve onboarding with friction-free paywalls" }
      ],
      codeSnippet: `// Autonomous Metering & Tenant Billing Webhook
export async function handleStripeWebhook(event: StripeEvent) {
  switch (event.type) {
    case 'invoice.payment_succeeded':
      await provisionEnterpriseCluster(event.data.customer_id);
      await syncTierAccess(event.data.subscription_tier);
      break;
    case 'usage_record.created':
      await updateLiveTokenBalance(event.data.usage_units);
      break;
  }
}`
    },
    {
      id: "ai-orchestration",
      title: "AI Orchestration & RAG",
      subtitle: "Autonomous Agentic Pipelines",
      icon: Cpu,
      headline: "Deep Agentic Workflows Beyond Generic API Wrappers",
      description: "Generic wrappers are strictly filtered out. Implement persistent multi-thread memory, advanced vector indexing, sub-second latency controls, and robust self-correcting agent chains.",
      specs: [
        { label: "Inference Stack", value: "Backboard.io, Gemini 1.5 Pro, Claude 3.5, OpenAI" },
        { label: "RAG Pipeline", value: "Contextual reranking & hybrid dense-sparse vector search" },
        { label: "Latency Benchmark", value: "Sub-500ms first token streaming response" },
        { label: "Memory Layer", value: "Cross-thread persistent semantic state" }
      ],
      codeSnippet: `// Multi-Agent Execution & Contextual Retrieval
const ragOrchestrator = new VectorRAGPipeline({
  embeddingModel: 'text-embedding-3-large',
  retrievalTopK: 8,
  rerank: true,
  agenticLoop: {
    maxReflections: 3,
    validateSchema: true
  }
});
const solution = await ragOrchestrator.synthesize(userQuery);`
    },
    {
      id: "seed-fund",
      title: "Galuxium Seed Fund",
      subtitle: "Enterprise Capital Deployment",
      icon: Award,
      headline: "Up to $1,000 Direct Launch Capital Allocation",
      description: "Beyond the primary prize pool, Galuxium provisions direct institutional capital to the single cohort that satisfies production compliance, rigorous security audits, and immediate commercial viability.",
      specs: [
        { label: "Fund Size", value: "Up to $1,000 Direct Enterprise Incubation" },
        { label: "Review Board", value: "Galuxium Board of Senior Technical Architects" },
        { label: "Advisory Network", value: "Direct pipeline to tier-one angel & VC syndicates" },
        { label: "Infrastructure", value: "Provisioned developer nodes & Backboard credits" }
      ],
      codeSnippet: `// Galuxium Board Compliance Evaluation
interface SeedFundCriteria {
  productionDeployment: boolean;     // Live Cloud / Edge
  verifiableRepository: boolean;     // Comprehensive Architecture
  activeMonetization: boolean;       // Live Billing Webhooks
  subSecondUX: boolean;              // Flawless Frontend Performance
  enterpriseGovernance: boolean;     // Zero-Trust Auth & Privacy
}`
    }
  ];

  // Requirements Data
  const requirements = [
    {
      id: 1,
      title: "Production-Ready Deployment (Live Demo)",
      tag: "Live Infrastructure",
      desc: "The SaaS platform must be fully deployed and accessible on public cloud providers (Vercel, AWS, GCP, Fly.io, Cloudflare). Localhost demos and inaccessible links trigger immediate disqualification.",
      details: ["Publicly accessible URL with high uptime", "SSL encryption enabled", "Sub-second responsive load times"]
    },
    {
      id: 2,
      title: "Verifiable Infrastructure (Code Repository)",
      tag: "Codebase Integrity",
      desc: "A public GitHub repository containing the complete production codebase with authentic commit histories, dependencies, architectural diagrams, and local replication instructions.",
      details: ["Exemplary README.md with system design", "Zero committed secrets or exposed env variables", "Modular, typed component architecture"]
    },
    {
      id: 3,
      title: "Operational MVP (Working Prototype)",
      tag: "Functional Execution",
      desc: "A complete, functional software product executing primary workflows, handling persistent states, authentic user accounts, and reliable edge cases under live interaction.",
      details: ["Real database reads/writes", "Robust error states and optimistic UI", "Complete end-to-end user loop"]
    },
    {
      id: 4,
      title: "Executive Briefing (Project Documentation)",
      tag: "Strategic Anatomy",
      desc: "A structured executive breakdown articulating the market friction, target customer cohort, technical architecture, and long-term scalability roadmap.",
      details: ["Quantified consumer/enterprise problem", "Technical differentiation", "Go-to-market and distribution plan"]
    },
    {
      id: 5,
      title: "Fiscal Architecture (Monetization Engine)",
      tag: "Commercial Viability",
      desc: "A fully realized financial blueprint showing how the software captures recurring value through subscriptions, usage metering, transactional fees, or enterprise licensing.",
      details: ["Integrated payment gateway (Stripe/LemonSqueezy)", "Clear subscription tiering or API credit billing", "Customer lifecycle economics"]
    },
    {
      id: 6,
      title: "Technical Keynote (Product Demo Video)",
      tag: "Mandatory Demo",
      desc: "A high-impact, 2-to-5 minute video presentation bypassing superficial pitch decks to demonstrate real-time software execution, architectural flow, and user experience.",
      details: ["2 to 5 minutes duration", "High-definition screencast with technical voiceover", "Mandatory for Devpost judging eligibility"]
    }
  ];

  // Judging Criteria Data
  const judgingCriteria = [
    {
      title: "Technical Architecture & Scalability",
      weight: 20,
      icon: Server,
      desc: "Evaluation of backend robustness, database schema efficiency, and structural scalability. Systems must demonstrate production-grade reliability under concurrent loads."
    },
    {
      title: "Enterprise Governance & Compliance",
      weight: 20,
      icon: Shield,
      desc: "Assessment of zero-trust security, strict environment isolation, sanitization of inputs, data privacy protection, and transparent AI guardrails."
    },
    {
      title: "Product Innovation & Market Fit",
      weight: 20,
      icon: Sparkles,
      desc: "Measuring the novelty, practical utility, and defensibility of the SaaS platform. The software must resolve verified enterprise or consumer friction."
    },
    {
      title: "Monetization & Fiscal Design",
      weight: 15,
      icon: TrendingUp,
      desc: "Scoring the structural business mechanics: usage-based billing, tiered pricing models, payment webhook integrity, and sustainable unit economics."
    },
    {
      title: "UI/UX & Visual Refinement",
      weight: 15,
      icon: Sliders,
      desc: "Interface quality, responsiveness, sub-second rendering, optimistic UI state management, and an institutional-grade aesthetic that rivals funded software."
    },
    {
      title: "Keynote Pitch & Demo Completeness",
      weight: 10,
      icon: Video,
      desc: "Clarity, pacing, and depth of the 2-to-5 minute technical keynote video presentation alongside the live, uninhibited operational deployment."
    }
  ];

  // Judges Data
  const judges = [
    // {
    //   name: "Simran Arora",
    //   role: "Senior Product Manager",
    //   org: "Google (Gemini Enterprise)",
    //   expertise: "Enterprise AI & Scaled LLM Deployments",
    //   badge: "Google"
    // },
    {
      name: "Sai Rakshit",
      role: "Staff Software Engineer",
      org: "Visa",
      expertise: "High-Throughput Financial Systems",
      badge: "Visa"
    },
    {
      name: "Akshar Yadav",
      role: "Application Programmer V",
      org: "Bank of America",
      expertise: "Distributed Systems & Institutional Sec",
      badge: "BofA"
    },
    {
      name: "Kumar Abhinav",
      role: "Software Dev Engineer II",
      org: "AiDash",
      expertise: "Applied AI & Geospatial Analytics",
      badge: "AiDash"
    },
    {
      name: "Puneet Bajaj",
      role: "Founding AI Engineer",
      org: "Autonomous Systems",
      expertise: "Agentic Swarms & Contextual RAG",
      badge: "Founder"
    },
    {
      name: "Kyrylo Sotnykov",
      role: "Senior Software Engineer",
      org: "ScreenMeet",
      expertise: "Real-time Edge Communications",
      badge: "ScreenMeet"
    },
    {
      name: "Subhasis Kundu",
      role: "Senior Principal Solution Architect",
      org: "Compunnel Inc.",
      expertise: "Cloud Architecture & Modernization",
      badge: "Compunnel"
    },
    {
    name: "Jiaqi Zhu",
    role: "Software Engineer",
    org: "AI Workflows & Distributed Systems",
    badge: "Software Engineer",
    expertise: "Distributed Systems, AI Agent Workflows & Synthetic Data"
  },
  {
    name: "Ravi Shanker Thadishetti",
    role: "Senior Software Engineer",
    org: "PayPal",
    badge: "Paypal",
    expertise: "FinTech Infrastructure, High-Throughput Systems & APIs"
  }
  ];

  // FAQ Data
  const faqs = [
    {
      q: "Who is eligible to participate in Galuxium Nexus V2?",
      a: "Galuxium Nexus V2 is fully open to professional software engineers, technical founders, architects, and builders of all ages and backgrounds worldwide. Any static platform tags mentioning student-only restrictions are legacy platform artifacts and are officially overridden by our operational mandate."
    },
    {
      q: "How are the Backboard.io developer credits awarded?",
      a: "Winning teams receive credit keys provisioned directly to their Backboard.io developer node. To clear ledger authentication, winning accounts maintain an active Backboard starter tier ($5/mo), enabling full access to live inference pipelines, vector hosting, and the R-CLI coding harness."
    },
    {
      q: "What unlocks the $1,000 Galuxium Executive Seed Fund?",
      a: "The $1,000 Seed Fund is an enterprise incubation grant awarded at the board's discretion. Submissions must transcend prototype status by featuring live payment infrastructure, resilient edge deployment, zero-trust security, and demonstrable commercial viability."
    },
    {
      q: "What is the team size limit?",
      a: "Builders may compete as solo founders or in collaborative teams of up to 4 members. All team members must be registered on the official Devpost roster prior to project submission."
    },
    {
      q: "Who owns the Intellectual Property created during the hackathon?",
      a: "Participants retain 100% intellectual property ownership of all code, designs, and business models architected during the event. Galuxium receives only a non-exclusive license to showcase winning platforms across media channels."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-slate-900 font-sans selection:bg-slate-900 selection:text-white antialiased relative overflow-hidden">
      {/* Background Decorative Mesh Glows (Premium Light Palette) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-slate-200/40 via-blue-50/20 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-slate-100/60 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[65%] -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-slate-100/50 to-transparent blur-[120px] rounded-full" />
        {/* Subtle Fine Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04)] py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="#" className="flex items-center gap-2.5 group">
              <Image
                  src="/brand/logo.png"
                  alt="Galuxium Logo"
                  width={50}
                  height={50}
                />
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">
                  GALUXIUM
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
                  Nexus V2
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
              <a href="#overview" className="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all">Overview</a>
              <a href="#architecture" className="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all">Architecture</a>
              <a href="#requirements" className="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all">Requirements</a>
              <a href="#prizes" className="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all">Prizes</a>
              <a href="#judging" className="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all">Criteria</a>
              <a href="#judges" className="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all">Judges</a>
              <Link href="/rules" className="px-3.5 py-1.5 rounded-full text-slate-900 font-semibold hover:bg-slate-100/70 transition-all flex items-center gap-1">
                Rules <span className="text-[10px] px-1.5 py-0.2 bg-slate-200/80 rounded-full font-mono">NEW</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              865+ Builders Active
            </div>
            
            <a 
              href={devpostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-5 py-2 rounded-full bg-slate-900 text-white text-xs md:text-sm font-semibold tracking-wide hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 flex items-center gap-1.5"
            >
              <span>Join Arena</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="overview" className="relative z-10 pt-36 md:pt-44 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-medium text-slate-700 uppercase tracking-wider">
              Oct 31, 2026 • Global Online Arena
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-slate-900 flex items-center gap-1">
              $14,644 T & C
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.05] mb-8">
            Build Software <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent">
              The World Pays For.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            Most hackathons end with pitch decks and dead repositories. <br className="hidden md:inline" />
            <strong className="text-slate-900 font-semibold">Galuxium Nexus V2</strong> is the premier engineering deployment ground to launch monetizable AI, creator, and enterprise workflow infrastructure.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href={devpostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-slate-900 hover:bg-black text-white text-base font-semibold tracking-tight transition-all shadow-xl shadow-slate-900/15 flex items-center justify-center gap-2.5 group"
            >
              <span>Deploy on Devpost</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/rules"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-slate-800 text-base font-medium shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <Shield size={18} className="text-slate-500" />
              <span>Full Rules & Governance</span>
            </Link>
          </div>

          {/* Live Countdown & Fast Status Glass Bar */}
          <div className="p-6 md:p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-slate-200/70 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.05)] max-w-3xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-center gap-2">
              <Clock size={14} className="text-slate-500" />
              <span>Submission Window Closes: Oct 31, 2026 @ 5:00 PM GMT+5:30</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3 md:gap-6 text-center">
              <div className="p-3 md:p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                <div className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight font-mono">{timeLeft.days}</div>
                <div className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Days</div>
              </div>
              <div className="p-3 md:p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                <div className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight font-mono">{timeLeft.hours}</div>
                <div className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Hours</div>
              </div>
              <div className="p-3 md:p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                <div className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight font-mono">{timeLeft.minutes}</div>
                <div className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Minutes</div>
              </div>
              <div className="p-3 md:p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                <div className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight font-mono">{timeLeft.seconds}</div>
                <div className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12 max-w-6xl mx-auto">
      {stats.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div 
            key={idx}
            className="p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4 group-hover:bg-slate-900 group-hover:text-white transition-all">
                <IconComponent size={20} />
              </div>
              <div className="text-lg font-bold text-slate-900 tracking-tight">{item.title}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{item.subtitle}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
      </section>

      {/* Interactive Architecture of the Arena */}
      <section id="architecture" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-mono font-medium text-slate-700 uppercase tracking-wider mb-4">
            <Layers size={14} /> Structural Blueprint
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Architecture of the Arena
          </h2>
          <p className="text-slate-600 text-lg">
            We evaluate projects based on production capability, verifiable infrastructure, and market-ready fiscal loops.
          </p>
        </div>

        {/* Tabbed Interactive Visualizer */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Tabs Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200/70 bg-slate-50/50">
            {architectureTabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = selectedArchTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedArchTab(idx)}
                  className={`p-5 text-left transition-all border-b-2 relative ${
                    isActive
                      ? 'bg-white border-slate-900 text-slate-900 shadow-sm'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={16} className={isActive ? 'text-slate-900' : 'text-slate-400'} />
                    <span className="text-xs font-bold tracking-tight uppercase">{tab.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono hidden sm:block truncate">
                    {tab.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-xs font-semibold">
                  <span>Standard #{selectedArchTab + 1}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {architectureTabs[selectedArchTab].headline}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {architectureTabs[selectedArchTab].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  {architectureTabs[selectedArchTab].specs.map((spec, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">{spec.label}</div>
                      <div className="text-xs font-bold text-slate-800">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Code/Architecture Sandbox View */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
                  <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="text-[11px] text-slate-400 ml-2">architecture-manifest.ts</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-sans font-medium">TypeScript</span>
                  </div>
                  <pre className="p-5 overflow-x-auto text-[11px] leading-relaxed text-emerald-400">
                    <code>{architectureTabs[selectedArchTab].codeSnippet}</code>
                  </pre>
                  <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-sans">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      Production Validation Hook Ready
                    </span>
                    <span>Galuxium Engine v2.4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Requirements & Interactive Readiness Checklist */}
      <section id="requirements" className="py-24 px-6 max-w-7xl mx-auto relative z-10 bg-slate-50/40 rounded-3xl my-12 border border-slate-200/50">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-medium text-slate-700 uppercase tracking-wider mb-4 shadow-sm">
            <CheckCircle2 size={14} /> Submission Benchmarks
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Six Pillars of Qualification
          </h2>
          <p className="text-slate-600 text-lg">
            Submissions failing these benchmarks are automatically disqualified from board review. Use the interactive checklist below to verify readiness.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="max-w-xl mx-auto mb-12 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">Your Submission Readiness</div>
            <div className="text-lg font-bold text-slate-900">
              {completedItems.length} of 6 Benchmarks Verified
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-28 h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-900 transition-all duration-500" 
                style={{ width: `${(completedItems.length / 6) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-900">
              {Math.round((completedItems.length / 6) * 100)}%
            </span>
          </div>
        </div>

        {/* Requirements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((req) => {
            const isCompleted = completedItems.includes(req.id);
            return (
              <div
                key={req.id}
                onClick={() => toggleChecklist(req.id)}
                className={`p-7 rounded-3xl bg-white border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  isCompleted 
                    ? 'border-slate-900 ring-1 ring-slate-900 shadow-md shadow-slate-900/5' 
                    : 'border-slate-200/70 hover:border-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                      {req.tag}
                    </span>
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted ? 'bg-slate-900 text-white' : 'border border-slate-300 text-transparent'
                      }`}
                    >
                      <Check size={14} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                    {req.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {req.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {req.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Critical Note Box */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-4 max-w-4xl mx-auto">
          <AlertCircle className="text-amber-700 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-xs md:text-sm text-amber-900 leading-relaxed">
            <strong>Mandatory Video Requirement:</strong> Submissions lacking a clear 2-to-5 minute product keynote screencast will be marked incomplete and cannot synchronize with Devpost judging queues or prize algorithms.
          </div>
        </div>
      </section>

      {/* Prize Matrix & Galuxium Executive Seed Fund */}
      <section id="prizes" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      {/* Header & Total Banner */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-mono font-medium text-slate-700 uppercase tracking-wider mb-4">
          <Trophy size={14} /> Prize Allocation
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          $14,644 Total Prize Pool
        </h2>
        <p className="text-slate-600 text-lg">
          Pre-procured enterprise credit pools, cloud compute reserves, and commercial software licenses underwritten directly by Galuxium and Ecosystem Partners.
        </p>
      </div>

      {/* Prize Cards Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        
        {/* 1st Place */}
        <div className="relative p-8 rounded-3xl bg-white border-2 border-slate-900 shadow-xl shadow-slate-900/5 flex flex-col justify-between">
          <div className="absolute -top-3.5 left-8 px-3.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-mono uppercase tracking-widest font-bold">
            Flagship Institutional Honor
          </div>
          
          <div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1 mt-2">1st Place • 1 Winner</div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">The Nexus Sovereign Grand Champion</h3>
            
            <div className="text-4xl font-black text-slate-900 tracking-tight font-mono mb-4">
              $6,768 <span className="text-xs font-sans text-slate-500 font-semibold">in value</span>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Awarded to the team demonstrating absolute technical mastery, pristine architectural scalability, and undisputed commercial viability.
            </p>
            
            <div className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Adaption Labs AI Infrastructure (up to $5,000):</strong> $1,250 USD in platform credits per member (up to 4) for synthetic data & custom model deployment.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Backboard.io Compute ($1,000 USD):</strong> Full ledger access to live API inference pipelines, cross-thread memory architectures, and production-tier vector RAG hosting.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>DevSwarm Pro ($768 Value):</strong> 2-year premium license per member (up to 4) parallel agent environment.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Venture Network Broadcast:</strong> High-impact global media feature across the Galuxium enterprise network.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Executive Credentials:</strong> Official Certificate of Technical Distinction bearing Galuxium&apos;s assets.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 text-[10px] leading-tight font-mono text-slate-400">
            *Allocated as live enterprise infrastructure keys, API credits, and active licenses.
          </div>
        </div>

        {/* 2nd Place */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">2nd Place • 1 Winner</div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">The Architectural Vanguard Laureate</h3>
            
            <div className="text-4xl font-black text-slate-900 tracking-tight font-mono mb-4">
              $4,884 <span className="text-xs font-sans text-slate-500 font-semibold">in value</span>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Awarded to the team that engineers a remarkably robust, highly performant technical foundation, successfully leveraging bleeding-edge multi-model IDE paradigms.
            </p>
            
            <div className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Adaption Labs AI Infrastructure (up to $4,000):</strong> $1,000 USD in platform credits per member for synthetic data & model deployment.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Backboard.io Compute ($500 USD):</strong> Access to live API inference pipelines, cross-thread memory, & vector RAG hosting.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>DevSwarm Pro ($384 Value):</strong> 1-year premium license per member (up to 4) parallel agent environment.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Venture Network Broadcast:</strong> High-impact global media feature across the Galuxium network.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Executive Credentials:</strong> Certificate of Technical Distinction.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 text-[10px] leading-tight font-mono text-slate-400">
            *Allocated as live enterprise infrastructure keys, API credits, and active licenses.
          </div>
        </div>

        {/* 3rd Place */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">3rd Place • 1 Winner</div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">The High Tier Market Catalyst</h3>
            
            <div className="text-4xl font-black text-slate-900 tracking-tight font-mono mb-4">
              $2,992 <span className="text-xs font-sans text-slate-500 font-semibold">in value</span>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              The High-Impact Engineering Honor awarded to the team demonstrating outstanding technical execution, creative system architecture, and high practical utility.
            </p>
            
            <div className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Adaption Labs AI Infrastructure ($2,500 Total):</strong> $625 USD in platform credits per member (up to 4).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Backboard.io Compute ($300 USD):</strong> Live API inference pipelines & production vector RAG hosting.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>DevSwarm Pro ($192 Value):</strong> 6-month premium parallel agent environment license per member.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Venture Network Broadcast:</strong> High-impact media feature across Galuxium network.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-slate-900 flex-shrink-0 mt-0.5" />
                <span><strong>Executive Credentials:</strong> Certificate of Technical Distinction.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 text-[10px] leading-tight font-mono text-slate-400">
            *Allocated as live enterprise infrastructure keys, API credits, and active licenses.
          </div>
        </div>

      </div>

      {/* Procurement & Asset Allocation Mandate Notice */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
        <strong className="text-slate-900 font-mono uppercase tracking-wider block mb-1">
          Procurement & Asset Allocation Mandate:
        </strong>
        The stated monetary valuation represents pre-procured enterprise credit pools, cloud compute reserves, and commercial software licenses directly underwritten and capital-funded by Galuxium and our Ecosystem Partners. All awarded allocations are disbursed as live enterprise infrastructure keys, production API credits, and active licenses equal to the published monetary value.
      </div>
    </section>

      {/* Judging Criteria Matrix */}
      <section id="judging" className="py-24 px-6 max-w-7xl mx-auto relative z-10 bg-slate-50/50 rounded-3xl border border-slate-200/50">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-medium text-slate-700 uppercase tracking-wider mb-4 shadow-sm">
            <Sliders size={14} /> Evaluation Breakdown
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Judging Criteria & Weightage
          </h2>
          <p className="text-slate-600 text-lg">
            Every submission is scored strictly across six core vectors totaling 100%.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {judgingCriteria.map((crit, idx) => {
            const Icon = crit.icon;
            return (
              <div 
                key={idx}
                onMouseEnter={() => setActiveCriterion(idx)}
                className={`p-7 rounded-3xl bg-white border transition-all duration-300 ${
                  activeCriterion === idx 
                    ? 'border-slate-900 shadow-lg shadow-slate-900/5' 
                    : 'border-slate-200/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900">
                    <Icon size={20} />
                  </div>
                  <span className="text-lg font-black font-mono text-slate-900 px-3 py-1 rounded-full bg-slate-100">
                    {crit.weight}%
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                  {crit.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {crit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grand Judging Panel */}
      <section id="judges" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-mono font-medium text-slate-700 uppercase tracking-wider mb-4">
            <Users size={14} /> The Grand Panel
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Enterprise Judges & Technical Mentors
          </h2>
          <p className="text-slate-600 text-lg">
            Senior architects, staff engineers, and product leaders from industry-defining technology companies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {judges.map((judge, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 font-bold text-base flex items-center justify-center border border-slate-200">
                    {judge.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {judge.badge}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-slate-900 tracking-tight">{judge.name}</h4>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">{judge.role}</p>
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">{judge.org}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-snug">
                <strong>Focus:</strong> {judge.expertise}
              </div>
            </div>
          ))}

          {/* Join the Panel Card */}
          <div className="p-6 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 hover:border-slate-400 transition-colors flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
              <Sparkles size={20} />
            </div>
            <h4 className="text-base font-bold text-slate-800">Become a Judge</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">Are you a senior engineer or venture architect?</p>
            <a 
              href={devpostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1"
            >
              Apply via Devpost <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 px-6 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-mono font-medium text-slate-700 uppercase tracking-wider mb-4">
            <HelpCircle size={14} /> Clarity
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base">
            Everything you need to know about eligibility, Backboard keys, and IP governance.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-base text-slate-900">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-slate-900' : ''
                    }`} 
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action Hero Card */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="p-10 md:p-16 rounded-3xl bg-slate-900 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Stop building prototypes. <br />
              <span className="text-slate-400">Build a real SaaS company.</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Join 411 engineers, founders, and technical architects competing for $2,600 in enterprise credits, seed funding, and tier-one VC exposure.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={devpostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Register on Devpost</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/rules"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Shield size={16} />
                <span>Review Full Rules</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-md pt-16 pb-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
            <Image
                  src="/brand/logo.png"
                  alt="Galuxium Logo"
                  width={50}
                  height={50}
                />
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                GALUXIUM
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              The premier global deployment arena for revenue-generating SaaS systems and enterprise AI pipelines.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 mb-3">Arena</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#overview" className="hover:text-slate-900 transition-colors">Overview</a></li>
              <li><a href="#architecture" className="hover:text-slate-900 transition-colors">Architecture Standard</a></li>
              <li><a href="#requirements" className="hover:text-slate-900 transition-colors">Submission Benchmarks</a></li>
              <li><a href="#prizes" className="hover:text-slate-900 transition-colors">Prizes</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 mb-3">Governance</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><Link href="/rules" className="hover:text-slate-900 transition-colors">Operational Rules</Link></li>
              <li><a href="#judges" className="hover:text-slate-900 transition-colors">Grand Judging Panel</a></li>
              <li><a href={devpostUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Devpost Hub</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 mb-3">Sync</h5>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Devpost Sync Active
              </div>
              <p className="text-[11px] text-slate-400">Official coding partner: Backboard.io enterprise stack.</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>© 2026 Galuxium & Devpost, Inc. All rights reserved.</div>
          <div className="flex gap-6 uppercase tracking-wider text-[11px]">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}