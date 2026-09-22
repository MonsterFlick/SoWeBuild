"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
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

/* --------------------------------- services data --------------------------------- */

export interface ServiceCard {
  id: string;
  num: string;
  name: string;
  tagline: string;
  mode: Mode;
  metric: { value: string; label: string };
  tags: string[];
  icon: (props: { className?: string }) => ReactNode;
}

export const SERVICE_CARDS: ServiceCard[] = [
  {
    id: "web-saas",
    num: "01",
    name: "Websites & SaaS Platforms",
    tagline: "High-speed Next.js web applications, cinematic portals & automated Stripe billing.",
    mode: "website",
    metric: { value: "<350ms", label: "Edge Load Speed" },
    tags: ["Next.js 15", "Cinematic Motion", "Stripe Billing"],
    icon: GlobeIcon,
  },
  {
    id: "ai-agents",
    num: "02",
    name: "AI Chatbots & RAG Agents",
    tagline: "Autonomous AI agents grounded strictly in your proprietary documentation & CRM data.",
    mode: "chatbot",
    metric: { value: "0%", label: "Hallucination Guarantee" },
    tags: ["Domain RAG", "Pinecone Vector", "FastAPI"],
    icon: BotIcon,
  },
  {
    id: "whatsapp",
    num: "03",
    name: "WhatsApp AI Automation",
    tagline: "24/7 automated WhatsApp conversational funnels that qualify leads & schedule calendar calls.",
    mode: "whatsapp",
    metric: { value: "<15s", label: "Lead Response Time" },
    tags: ["Meta Cloud API", "Calendar Booking", "CRM Sync"],
    icon: MessageCircleIcon,
  },
  {
    id: "custom-software",
    num: "04",
    name: "Custom Software & Cloud Infra",
    tagline: "High-concurrency Go microservices, database clusters & dedicated dev servers from Day 1.",
    mode: "dashboard",
    metric: { value: "25,000+", label: "Req / Sec Throughput" },
    tags: ["Dedicated Dev Server", "Go Microservices", "Docker CI/CD"],
    icon: ServerIcon,
  },
];

/* ----------------------------- workbench component ----------------------------- */

export function ServicesWorkbench({
  onSelectService,
}: {
  onSelectService?: (mode: Mode) => void;
}) {
  return (
    <section id="technology" data-section data-mode="website" className="relative px-5 py-14 sm:px-10 sm:py-20 overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-40 right-1/4 size-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 size-[350px] rounded-full bg-accent/10 blur-[110px]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              Engineering Services
            </div>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,6vw,4.2rem)] leading-[0.92] font-bold tracking-tight text-foreground">
              WHAT WE BUILD
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground">
            High-speed web platforms, autonomous AI agents, and custom cloud software engineered for scale.
          </p>
        </div>

        {/* 4 Short & Simple Capability Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICE_CARDS.map((s) => {
            const IconComp = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => onSelectService?.(s.mode)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7 backdrop-blur-xl hover:border-primary-glow/60 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-primary/5 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Top Badge Row */}
                <div className="relative z-10 flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-muted-foreground">{s.num}</span>
                    <div className="size-8 rounded-lg bg-primary/20 border border-primary-glow/30 flex items-center justify-center text-primary-glow">
                      <IconComp className="size-4" />
                    </div>
                  </div>

                  <a
                    href="#inquiry"
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-primary-glow hover:text-white transition-colors"
                  >
                    <span>Configure</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                </div>

                {/* Title & Tagline */}
                <div className="relative z-10 space-y-1.5">
                  <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-primary-glow transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.tagline}
                  </p>
                </div>

                {/* Stat Box + Tech Tags */}
                <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col font-mono">
                    <span className="font-display text-xl sm:text-2xl font-bold text-emerald-400 leading-none">{s.metric.value}</span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">{s.metric.label}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2.5 py-1 text-slate-300 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
