"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DeviceFrame, ResponsiveDeviceFrame } from "@/components/DeviceSlab";
import type { Mode } from "@/components/screens";

/* ---------------------------------- icons ---------------------------------- */

function ArrowUpRightIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function GlobeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function LayoutIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function SmartphoneIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
    </svg>
  );
}

function BotIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="2.5" />
      <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="2.5" />
    </svg>
  );
}

function MessageCircleIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function ZapIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ServerIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function NetworkIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function CheckCircleIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* --------------------------------- services data --------------------------------- */

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  mode: Mode;
  note: string;
  summary: string;
  icon: (props: { className?: string }) => ReactNode;
  stack: string[];
  metric: { value: string; label: string };
  deliverables: string[];
  inquiryLabel: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "websites",
    name: "Websites & Portals",
    category: "High-Performance Web",
    mode: "website",
    note: "Sub-second, cinematic web experiences",
    summary: "Ultra-responsive digital experiences and high-conversion landing portals engineered with fluid ambient lighting, micro-animations, and sub-350ms load times.",
    icon: GlobeIcon,
    stack: ["Next.js 15", "Turbopack", "Tailwind CSS", "TypeScript", "Vercel Edge"],
    metric: { value: "<350ms", label: "Page Load Speed" },
    deliverables: [
      "Sub-350ms initial page load speed with edge caching",
      "Cinematic motion design, glassmorphism & responsive layouts",
      "Automated SEO structured data & dynamic OpenGraph cards",
    ],
    inquiryLabel: "Websites",
  },
  {
    id: "web-apps",
    name: "SaaS & Web Applications",
    category: "Cloud SaaS Platform",
    mode: "dashboard",
    note: "Realtime, scalable multi-tenant platforms",
    summary: "Production-grade SaaS architectures engineered with row-level security (RLS), real-time WebSockets, automated Stripe billing, and high-concurrency database queries.",
    icon: LayoutIcon,
    stack: ["Next.js App Router", "PostgreSQL", "Supabase / Prisma", "Redis", "Stripe API"],
    metric: { value: "<85ms", label: "Realtime WebSocket Latency" },
    deliverables: [
      "Multi-tenant authentication with Row-Level Security (RLS)",
      "Real-time analytics dashboard with reactive WebSockets",
      "Automated Stripe subscription webhooks & metering",
    ],
    inquiryLabel: "Web Apps",
  },
  {
    id: "mobile-apps",
    name: "Mobile Applications",
    category: "Cross-Platform Native",
    mode: "chatbot",
    note: "Native-feel iOS & Android applications",
    summary: "Fluid 60 FPS mobile apps built for both iOS and Android with offline-first data synchronization, biometric authentication, and granular push notifications.",
    icon: SmartphoneIcon,
    stack: ["React Native", "Expo EAS", "WatermelonDB", "TypeScript", "Native APIs"],
    metric: { value: "60 FPS", label: "Native Motion Benchmark" },
    deliverables: [
      "Automated iOS TestFlight & Android Play Store deployment",
      "Offline-first local SQLite sync & biometric security",
      "Interactive conversational mobile UI & deep linking",
    ],
    inquiryLabel: "Mobile Apps",
  },
  {
    id: "ai-chatbots",
    name: "Intelligent AI Chatbots",
    category: "Grounded RAG Agents",
    mode: "chatbot",
    note: "Domain-trained RAG agents on custom data",
    summary: "Autonomous conversational AI agents grounded strictly in your proprietary documentation and CRM data with guaranteed 0% hallucination rates and sub-800ms streaming.",
    icon: BotIcon,
    stack: ["LangChain", "OpenAI / Claude", "Pinecone Vector DB", "Python", "FastAPI"],
    metric: { value: "0%", label: "Hallucination Guarantee" },
    deliverables: [
      "Continuous ingestion pipeline for PDFs, docs & websites",
      "Sub-800ms streaming LLM token generation with citations",
      "Full conversation history telemetry & human agent handoff",
    ],
    inquiryLabel: "AI Chatbots",
  },
  {
    id: "whatsapp-bots",
    name: "WhatsApp AI Automation",
    category: "Conversational Commerce",
    mode: "whatsapp",
    note: "Automated booking, care & lead bots",
    summary: "Direct WhatsApp conversational funnels that engage inbound leads 24/7, answer technical questions, schedule calendar bookings, and dispatch instant quotes.",
    icon: MessageCircleIcon,
    stack: ["Meta WhatsApp Cloud API", "Meta Webhooks", "Node.js", "Redis Queue", "PostgreSQL"],
    metric: { value: "<15s", label: "Average Qualification Time" },
    deliverables: [
      "Official Meta WhatsApp Cloud API verified configuration",
      "Automated calendar booking & live CRM synchronization",
      "Rich media dispatch (catalogs, PDF brochures, invoices)",
    ],
    inquiryLabel: "WhatsApp AI Bots",
  },
  {
    id: "ai-automation",
    name: "AI & Workflow Automation",
    category: "Autonomous Ops Pipelines",
    mode: "dashboard",
    note: "Workflows & operations that run themselves",
    summary: "Autonomous background pipelines that scrape web data, generate custom invoices, reconcile spreadsheets, and orchestrate complex multi-step operations without human intervention.",
    icon: ZapIcon,
    stack: ["Python", "BullMQ / Redis", "Playwright Headless", "Docker", "Custom Cron"],
    metric: { value: "40+ hrs", label: "Manual Hours Saved Weekly" },
    deliverables: [
      "Self-healing retry pipelines with automated error recovery",
      "Discord & Slack webhook alerting on mission-critical events",
      "Multi-stage headless browser extraction & report generation",
    ],
    inquiryLabel: "AI Automation",
  },
  {
    id: "custom-software",
    name: "Custom Backend & Software",
    category: "High-Throughput Infra",
    mode: "dashboard",
    note: "Tailored backend systems & cloud clusters",
    summary: "High-concurrency Go and Node.js microservices engineered for extreme throughput, distributed database clustering, and isolated development staging environments.",
    icon: ServerIcon,
    stack: ["Go / Node.js", "Clustered PostgreSQL", "Docker & K8s", "AWS EC2", "Redis Pub/Sub"],
    metric: { value: "25,000+", label: "Req / Sec Throughput" },
    deliverables: [
      "Dedicated, isolated development server hosted from day 1",
      "Automated CI/CD build pipelines with zero-downtime rollouts",
      "Complete database schema migrations & OpenAPI specs",
    ],
    inquiryLabel: "Custom Software",
  },
  {
    id: "api-integrations",
    name: "API & AI Integrations",
    category: "Enterprise Glue & Webhooks",
    mode: "website",
    note: "Seamless third-party API wiring",
    summary: "Fault-tolerant integration middleware connecting legacy enterprise databases, third-party payment gateways, and modern LLM APIs with guaranteed message delivery.",
    icon: NetworkIcon,
    stack: ["TypeScript", "Cloudflare Workers", "OpenAPI", "HMAC SHA-256", "Redis Queue"],
    metric: { value: "99.999%", label: "Message Delivery SLA" },
    deliverables: [
      "Cryptographic HMAC webhook signature validation & idempotency",
      "Automated exponential-backoff retry queues for failed calls",
      "Interactive Swagger / OpenAPI documentation & Postman specs",
    ],
    inquiryLabel: "API & AI Integrations",
  },
];

/* ----------------------------- workbench component ----------------------------- */

export function ServicesWorkbench({
  onSelectService,
}: {
  onSelectService?: (mode: Mode) => void;
}) {
  const [selectedId, setSelectedId] = useState<string>("websites");
  const active = SERVICES.find((s) => s.id === selectedId) || SERVICES[0];

  const handleSelect = (s: ServiceItem) => {
    setSelectedId(s.id);
    onSelectService?.(s.mode);
  };

  return (
    <section id="technology" data-section data-mode={active.mode} className="relative px-5 py-16 sm:px-10 sm:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 right-1/4 size-[600px] rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 size-[450px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              Engineering Services &amp; Capabilities
            </div>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.9] font-bold tracking-tight text-foreground">
              WHAT WE BUILD
            </h2>
          </div>

          <div className="lg:max-w-md">
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Interfaces, AI agents and backend systems engineered like modern products — built fast, tested rigorously, and hosted on isolated development environments from week one.
            </p>

            {/* Quick capability badges */}
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] text-foreground/80">
              <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Sub-Second Speeds
              </span>
              <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary-glow" />
                Grounded RAG &amp; LLMs
              </span>
              <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-cyan" />
                Dedicated Dev Servers
              </span>
              <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-purple-400" />
                100% Code Ownership
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Discipline Selector Rail (Immediately Above Workbench) */}
        <div className="lg:hidden mt-8 mb-2">
          <div className="flex items-center justify-between pb-2 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
            <span>Tap to Switch Demo ({SERVICES.length})</span>
            <span className="text-primary-glow font-bold truncate max-w-[170px]">{active.name}</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-1 px-1">
            {SERVICES.map((s) => {
              const isSelected = s.id === selectedId;
              const IconComp = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s)}
                  className={`snap-start shrink-0 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-mono font-medium transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-primary/25 border-primary-glow text-white shadow-md shadow-primary/20"
                      : "bg-white/[0.03] border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <IconComp className={`size-3.5 ${isSelected ? "text-primary-glow" : "text-muted-foreground"}`} />
                  <span className="whitespace-nowrap">{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="mt-4 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Column: 8 Interactive Service Cards (6 cols, hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between pb-2 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              <span>Select Discipline to Inspect</span>
              <span className="text-primary-glow font-bold">{SERVICES.length} Capabilities</span>
            </div>

            <div className="grid gap-2.5">
              {SERVICES.map((s, index) => {
                const isSelected = s.id === selectedId;
                const IconComponent = s.icon;

                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(s)}
                    onMouseEnter={() => handleSelect(s)}
                    className={`group relative w-full text-left rounded-2xl p-4 transition-all duration-300 border flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? "bg-white/[0.06] border-primary-glow/70 shadow-lg shadow-primary/10 ring-1 ring-primary-glow/30"
                        : "bg-white/[0.015] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                    }`}
                  >
                    {/* Active left indicator bar */}
                    {isSelected && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-primary via-primary-glow to-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center gap-3.5 pl-1.5 flex-1 min-w-0">
                      {/* Icon */}
                      <div
                        className={`size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-primary/25 border border-primary-glow/50 text-primary-glow shadow-md shadow-primary/20"
                            : "bg-black/50 border border-white/10 text-muted-foreground group-hover:text-foreground group-hover:border-white/20"
                        }`}
                      >
                        <IconComponent className="size-4" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] font-bold text-muted-foreground">
                            0{index + 1}
                          </span>
                          <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.2 font-mono text-[8px] text-muted-foreground uppercase tracking-wider">
                            {s.category}
                          </span>
                        </div>

                        <div className="font-display text-base sm:text-lg font-bold tracking-tight text-white truncate mt-0.5">
                          {s.name}
                        </div>

                        <div className="text-[11px] text-muted-foreground truncate">
                          {s.note}
                        </div>
                      </div>
                    </div>

                    {/* Arrow / Metric Pill */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:flex flex-col items-end text-right font-mono">
                        <span className="text-[11px] font-bold text-emerald-400">{s.metric.value}</span>
                        <span className="text-[8px] text-muted-foreground uppercase">{s.metric.label}</span>
                      </div>

                      <div
                        className={`size-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-primary text-white scale-110 shadow-md shadow-primary/30"
                            : "bg-white/5 text-muted-foreground group-hover:text-foreground group-hover:bg-white/10"
                        }`}
                      >
                        <ArrowUpRightIcon className="size-3.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Interactive Capability Workbench (6 cols on desktop, full width on mobile) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 w-full">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.02] backdrop-blur-2xl p-5 sm:p-7 shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-60 pointer-events-none" />
              <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />

              {/* Workbench Topbar */}
              <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-500/80" />
                    <span className="size-2.5 rounded-full bg-amber-500/80" />
                    <span className="size-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase font-semibold truncate max-w-[170px] sm:max-w-none">
                    WORKBENCH // {active.id.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[9px] text-emerald-400 font-bold">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  INTERACTIVE DEMO
                </div>
              </div>

              {/* Live Interactive Screen Demo Area with ResponsiveDeviceFrame */}
              <div className="relative z-10 my-2 flex justify-center items-center min-h-[280px] sm:min-h-[380px] rounded-2xl bg-black/50 border border-white/10 p-2 sm:p-4 overflow-hidden w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex justify-center items-center"
                  >
                    <ResponsiveDeviceFrame mode={active.mode} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Detailed Specs Sheet */}
              <div className="relative z-10 mt-6 pt-5 border-t border-white/10 space-y-4">
                {/* Title & Summary */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                      {active.name}
                    </h3>
                    <span className="font-mono text-xs font-bold text-primary-glow">
                      {active.metric.value} · {active.metric.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {active.summary}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="rounded-xl bg-black/40 border border-white/5 p-3.5 space-y-2 font-mono text-[11px]">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    Included Architectural Deliverables:
                  </div>
                  {active.deliverables.map((d) => (
                    <div key={d} className="flex items-start gap-2 text-foreground/90 leading-tight">
                      <CheckCircleIcon className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                    {active.stack.map((t) => (
                      <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2 py-0.5 text-slate-300 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Link to Inquiry */}
                  <a
                    href="#inquiry"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[image:var(--gradient-violet)] px-4 py-2 font-mono text-xs font-bold text-white hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 shrink-0"
                  >
                    <span>Configure {active.inquiryLabel}</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom: Full Card List (for mobile users who want to inspect all 8) */}
          <div className="lg:hidden w-full space-y-3 mt-4">
            <div className="flex items-center justify-between pb-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              <span>All 8 Engineering Disciplines</span>
            </div>
            <div className="grid gap-2">
              {SERVICES.map((s, index) => {
                const isSelected = s.id === selectedId;
                const IconComponent = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(s)}
                    className={`relative w-full text-left rounded-xl p-3.5 transition-all duration-200 border flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-white/[0.06] border-primary-glow/70 shadow-md ring-1 ring-primary-glow/30"
                        : "bg-white/[0.015] border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-primary/20 text-primary-glow" : "bg-black/50 text-muted-foreground"}`}>
                        <IconComponent className="size-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[8px] text-muted-foreground">0{index + 1}</span>
                          <span className="font-display text-sm font-bold text-white truncate">{s.name}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">{s.note}</div>
                      </div>
                    </div>
                    <div className="shrink-0 font-mono text-[10px] font-bold text-emerald-400">
                      {s.metric.value}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
