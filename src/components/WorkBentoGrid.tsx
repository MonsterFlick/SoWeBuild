"use client";

import { motion } from "motion/react";

function ArrowUpRightIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function CpuIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function ServerIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

export function WorkBentoGrid() {
  return (
    <section id="work" data-section data-mode="dashboard" className="relative px-6 py-24 sm:px-10 sm:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              Engineering Portfolio
            </div>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.2rem)] leading-[0.92] font-bold tracking-tight text-foreground">
              SELECTED WORK &amp;
              <br />
              <span className="text-gradient">PRODUCTION DEPLOYMENTS.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Real production systems engineered, optimized, and hosted on isolated development environments. No fake previews — only real architecture, metrics, and live deployments.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* BENTO ITEM 1: FERTISURE (Large Hero - 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-teal-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
            <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                    01 // HEALTHCARE TECH
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[9px] text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE PRODUCTION
                  </span>
                </div>

                <a
                  href="https://fertisure.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold text-foreground hover:bg-emerald-500 hover:text-black hover:border-emerald-400 transition-all"
                >
                  <span>VISIT FERTISURE.IN</span>
                  <ArrowUpRightIcon className="size-3" />
                </a>
              </div>

              {/* Title & Core Subtitle */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                FertiSure — Next-Gen IVF Technologies &amp; Complete Lab Setup
              </h3>
              <p className="mt-1 font-mono text-xs text-emerald-300/80 font-medium">
                Client: FertiSure by Hemant Surgical Industries Limited (Est. 1983)
              </p>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Engineered a cinematic medical catalog and interactive equipment portal for specialized embryology equipment — including sub-micron ICSI stations, time-lapse incubators, VOC filtration cleanrooms, and medical consumables trusted by 500+ clinics worldwide.
              </p>

              {/* Technical Highlights Checklist */}
              <div className="mt-6 grid gap-2 sm:grid-cols-2 text-xs font-mono">
                <div className="flex items-start gap-2 rounded-xl bg-black/40 border border-white/5 p-3">
                  <ShieldCheckIcon className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">HIPAA-Compliant Setup</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Zero-leakage encrypted quote and lead dispatch pipeline.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-black/40 border border-white/5 p-3">
                  <CpuIcon className="size-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Sub-350ms Catalog</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Turbopack SSR and instant multi-region CDN caching.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Metrics & Tech Stack */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-3 gap-3 mb-4 text-center font-mono">
                <div className="rounded-xl bg-black/50 border border-white/5 p-2">
                  <div className="font-display text-lg sm:text-xl font-bold text-white">500+</div>
                  <div className="text-[9px] text-muted-foreground">Clinics Worldwide</div>
                </div>
                <div className="rounded-xl bg-black/50 border border-white/5 p-2">
                  <div className="font-display text-lg sm:text-xl font-bold text-emerald-400">&lt;350ms</div>
                  <div className="text-[9px] text-muted-foreground">Page Load Speed</div>
                </div>
                <div className="rounded-xl bg-black/50 border border-white/5 p-2">
                  <div className="font-display text-lg sm:text-xl font-bold text-teal-300">5 Regions</div>
                  <div className="text-[9px] text-muted-foreground">IN, UAE, SG, TH, MY</div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                {["Next.js 15", "Turbopack", "Tailwind CSS", "TypeScript", "HIPAA Vault", "Vercel Edge"].map((t) => (
                  <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2.5 py-1 text-slate-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* BENTO ITEM 2: ALPHATECH NUTRITION (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-indigo-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
            <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2.5 py-0.5 font-mono text-[9px] font-bold text-blue-400 uppercase tracking-wider">
                    02 // E-COMMERCE &amp; SECURITY
                  </span>
                </div>

                <a
                  href="https://alphatech-nutrition.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold text-foreground hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all"
                >
                  <span>VISIT LIVE</span>
                  <ArrowUpRightIcon className="size-3" />
                </a>
              </div>

              {/* Title & Core Subtitle */}
              <h3 className="font-display text-2xl font-bold tracking-tight text-white leading-tight">
                Alpha Tech Nutrition — Anti-Counterfeit Sports Nutrition
              </h3>
              <p className="mt-1 font-mono text-xs text-blue-300/80 font-medium">
                High-Performance Gym Supplements &amp; QR Auth Verification
              </p>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Architected high-conversion headless e-commerce store paired with a <strong>100% Anti-Counterfeit Protection System</strong>. Every supplement tub is minted with an individual cryptographic UUID hash for instant smartphone QR authenticity checks.
              </p>

              {/* Feature highlight */}
              <div className="mt-6 rounded-xl bg-black/40 border border-blue-500/20 p-3.5 space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-[11px]">
                  <ShieldCheckIcon className="size-4" />
                  <span>Cryptographic QR Verification Engine</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-normal">
                  Real-time batch assay verification, tamper alerts on duplicate scans, and B2B wholesale distributor onboarding.
                </p>
              </div>
            </div>

            {/* Bottom Metrics & Tech Stack */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3 mb-4 text-center font-mono">
                <div className="rounded-xl bg-black/50 border border-white/5 p-2">
                  <div className="font-display text-lg sm:text-xl font-bold text-blue-400">100%</div>
                  <div className="text-[9px] text-muted-foreground">Anti-Counterfeit Protection</div>
                </div>
                <div className="rounded-xl bg-black/50 border border-white/5 p-2">
                  <div className="font-display text-lg sm:text-xl font-bold text-indigo-300">99.98%</div>
                  <div className="text-[9px] text-muted-foreground">Verification Uptime</div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                {["Next.js App Router", "QR Cryptography", "Redis Cache", "Tailwind CSS", "Stripe API"].map((t) => (
                  <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2.5 py-1 text-slate-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* BENTO ITEM 3: AI AGENTS & WHATSAPP (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-6 group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl hover:border-primary-glow/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
            <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="rounded-full bg-primary/20 border border-primary/30 px-2.5 py-0.5 font-mono text-[9px] font-bold text-primary-glow uppercase tracking-wider">
                  03 // AI &amp; AUTOMATION
                </span>

                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <span>BUILD AI AGENT</span>
                  <ArrowUpRightIcon className="size-3" />
                </a>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-tight text-white leading-tight">
                Intelligent AI Agents &amp; WhatsApp Automation
              </h3>
              <p className="mt-1 font-mono text-xs text-primary-glow font-medium">
                Grounded RAG Pipelines &amp; Conversational Commerce
              </p>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Engineered autonomous AI bots trained strictly on client knowledge bases. Integrates seamless WhatsApp Cloud API webhooks for 24/7 lead qualification, instant booking, and automated CRM record synchronization with zero hallucinations.
              </p>

              {/* Specs Grid */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center font-mono">
                <div className="rounded-xl bg-black/40 border border-white/5 p-2.5">
                  <div className="font-display text-lg font-bold text-primary-glow">&lt;800ms</div>
                  <div className="text-[9px] text-muted-foreground">RAG Latency</div>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/5 p-2.5">
                  <div className="font-display text-lg font-bold text-white">4.2x</div>
                  <div className="text-[9px] text-muted-foreground">Lead Conversion</div>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/5 p-2.5">
                  <div className="font-display text-lg font-bold text-emerald-400">0%</div>
                  <div className="text-[9px] text-muted-foreground">Hallucination SLA</div>
                </div>
              </div>
            </div>

            {/* Bottom Tech Stack */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-1.5 font-mono text-[9px]">
              {["LangChain", "Pinecone Vector DB", "WhatsApp Cloud API", "OpenAI", "Node.js", "Python"].map((t) => (
                <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2.5 py-1 text-slate-300 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* BENTO ITEM 4: CLOUD INFRA & DEV SERVERS (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-6 group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-blue-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
            <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="rounded-full bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-0.5 font-mono text-[9px] font-bold text-cyan-400 uppercase tracking-wider">
                  04 // CLOUD INFRASTRUCTURE
                </span>

                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold text-foreground hover:bg-cyan-500 hover:text-black hover:border-cyan-400 transition-all"
                >
                  <span>REQUEST DEV SERVER</span>
                  <ArrowUpRightIcon className="size-3" />
                </a>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-tight text-white leading-tight">
                High-Throughput Microservices &amp; Dedicated Dev Servers
              </h3>
              <p className="mt-1 font-mono text-xs text-cyan-300 font-medium">
                Isolated Environments · Zero Handoffs · 100% Code Ownership
              </p>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Every project runs on isolated, dedicated development servers from week one. High-concurrency Go and Node.js microservices handling 25,000+ req/sec with clustered PostgreSQL, Redis Pub/Sub, and automated Docker/Kubernetes CI/CD pipelines.
              </p>

              {/* Specs Grid */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center font-mono">
                <div className="rounded-xl bg-black/40 border border-white/5 p-2.5">
                  <div className="font-display text-lg font-bold text-cyan-300">25,000+</div>
                  <div className="text-[9px] text-muted-foreground">Req / Sec Throughput</div>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/5 p-2.5">
                  <div className="font-display text-lg font-bold text-white">Day-1</div>
                  <div className="text-[9px] text-muted-foreground">Live Server Access</div>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/5 p-2.5">
                  <div className="font-display text-lg font-bold text-emerald-400">99.99%</div>
                  <div className="text-[9px] text-muted-foreground">Target Uptime</div>
                </div>
              </div>
            </div>

            {/* Bottom Tech Stack */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-1.5 font-mono text-[9px]">
              {["Go / Node.js", "PostgreSQL Cluster", "Docker / K8s", "AWS EC2", "Redis Pub/Sub", "CI/CD"].map((t) => (
                <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2.5 py-1 text-slate-300 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
