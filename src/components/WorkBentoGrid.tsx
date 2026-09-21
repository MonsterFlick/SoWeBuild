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

function LockIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function WorkBentoGrid() {
  return (
    <section id="work" data-section data-mode="dashboard" className="relative px-5 py-16 sm:px-10 sm:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
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
          {/* BENTO ITEM 1: FERTISURE (Large Hero - 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-teal-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
            <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
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
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
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
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 text-center font-mono">
                <div className="rounded-xl bg-black/50 border border-white/5 p-1.5 sm:p-2">
                  <div className="font-display text-base sm:text-xl font-bold text-white">500+</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground">Clinics Worldwide</div>
                </div>
                <div className="rounded-xl bg-black/50 border border-white/5 p-1.5 sm:p-2">
                  <div className="font-display text-base sm:text-xl font-bold text-emerald-400">&lt;350ms</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground">Page Speed</div>
                </div>
                <div className="rounded-xl bg-black/50 border border-white/5 p-1.5 sm:p-2">
                  <div className="font-display text-base sm:text-xl font-bold text-teal-300">5 Regions</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground truncate">IN, UAE, SG...</div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                {["Next.js 15", "Turbopack", "Tailwind CSS", "TypeScript", "HIPAA Vault", "Vercel Edge"].map((t) => (
                  <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-slate-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* BENTO ITEM 2: ALPHATECH NUTRITION (Live Preview - 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-6 group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-indigo-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
            <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10 flex-1 flex flex-col">
              {/* Header Badge Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2.5 py-0.5 font-mono text-[9px] font-bold text-blue-400 uppercase tracking-wider">
                    02 // LIVE PREVIEW
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[9px] text-blue-300">
                    <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
                    LIVE PRODUCTION
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

              {/* Title & Short Subtitle */}
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                Alpha Tech Nutrition
              </h3>
              <p className="mt-1 font-mono text-xs text-blue-300/80 font-medium">
                High-Performance Sports Nutrition &amp; 100% Anti-Counterfeit QR Engine
              </p>

              {/* Live Interactive Browser Preview Frame */}
              <div className="relative mt-4 flex-1 min-h-[220px] sm:min-h-[340px] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/80 shadow-2xl flex flex-col">
                {/* Browser Topbar Chrome */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-900/90 border-b border-white/10 text-xs font-mono shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-500/80" />
                    <span className="size-2.5 rounded-full bg-amber-500/80" />
                    <span className="size-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex items-center gap-1.5 rounded-md bg-black/60 border border-white/10 px-2 sm:px-3 py-0.5 text-[9px] sm:text-[10px] text-muted-foreground truncate">
                    <LockIcon className="size-2.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 truncate">alphatech-nutrition.in</span>
                  </div>

                  <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>200 OK</span>
                  </div>
                </div>

                {/* Live Site Viewport Container */}
                <div className="relative flex-1 w-full h-[200px] sm:h-[300px] overflow-hidden bg-neutral-950">
                  <iframe
                    src="https://alphatech-nutrition.in"
                    title="Alpha Tech Nutrition Live Preview"
                    loading="lazy"
                    className="w-[142.85%] h-[142.85%] scale-[0.7] origin-top-left border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                  
                  {/* Subtle glass hover overlay */}
                  <a
                    href="https://alphatech-nutrition.in"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-transparent hover:bg-black/20 transition-colors flex items-center justify-center group/btn pointer-events-auto"
                    title="Open alphatech-nutrition.in in new tab"
                  >
                    <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-full bg-black/80 border border-white/20 px-3.5 py-1.5 text-xs font-mono text-white flex items-center gap-1.5 backdrop-blur-md shadow-xl">
                      Open Full Site <ArrowUpRightIcon className="size-3" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Tech Stack & Feature Tag */}
            <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                {["Next.js App Router", "QR Cryptography", "Redis Cache", "Tailwind CSS", "Stripe API"].map((t) => (
                  <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-slate-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 text-xs font-mono text-blue-300">
                <ShieldCheckIcon className="size-3.5 text-blue-400" />
                <span className="text-[10px] font-semibold">100% Anti-Counterfeit</span>
              </div>
            </div>
          </motion.div>

          {/* BENTO ITEM 3: AI AGENTS & WHATSAPP (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-6 group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 backdrop-blur-xl hover:border-primary-glow/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
            <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
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

              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                Intelligent AI Agents &amp; WhatsApp Automation
              </h3>
              <p className="mt-1 font-mono text-xs text-primary-glow font-medium">
                Grounded RAG Pipelines &amp; Conversational Commerce
              </p>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Engineered autonomous AI bots trained strictly on client knowledge bases. Integrates seamless WhatsApp Cloud API webhooks for 24/7 lead qualification, instant booking, and automated CRM record synchronization with zero hallucinations.
              </p>

              {/* Specs Grid */}
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 text-center font-mono">
                <div className="rounded-xl bg-black/40 border border-white/5 p-1.5 sm:p-2.5">
                  <div className="font-display text-base sm:text-lg font-bold text-primary-glow">&lt;800ms</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground">RAG Latency</div>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/5 p-1.5 sm:p-2.5">
                  <div className="font-display text-base sm:text-lg font-bold text-white">4.2x</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground">Lead Conv.</div>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/5 p-1.5 sm:p-2.5">
                  <div className="font-display text-base sm:text-lg font-bold text-emerald-400">0%</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground">Hallucination</div>
                </div>
              </div>
            </div>

            {/* Bottom Tech Stack */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-1.5 font-mono text-[9px]">
              {["LangChain", "Pinecone Vector DB", "WhatsApp Cloud API", "OpenAI", "Node.js", "Python"].map((t) => (
                <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-slate-300 font-medium">
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
            className="md:col-span-6 group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-blue-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
            <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
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

              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                High-Throughput Microservices &amp; Dedicated Dev Servers
              </h3>
              <p className="mt-1 font-mono text-xs text-cyan-300 font-medium">
                Isolated Environments · Zero Handoffs · 100% Code Ownership
              </p>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Every project runs on isolated, dedicated development servers from week one. High-concurrency Go and Node.js microservices handling 25,000+ req/sec with clustered PostgreSQL, Redis Pub/Sub, and automated Docker/Kubernetes CI/CD pipelines.
              </p>

              {/* Specs Grid */}
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 text-center font-mono">
                <div className="rounded-xl bg-black/40 border border-white/5 p-1.5 sm:p-2.5">
                  <div className="font-display text-base sm:text-lg font-bold text-cyan-300">25,000+</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground truncate">Req / Sec</div>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/5 p-1.5 sm:p-2.5">
                  <div className="font-display text-base sm:text-lg font-bold text-white">Day-1</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground">Live Access</div>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/5 p-1.5 sm:p-2.5">
                  <div className="font-display text-base sm:text-lg font-bold text-emerald-400">99.99%</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground">Uptime SLA</div>
                </div>
              </div>
            </div>

            {/* Bottom Tech Stack */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-1.5 font-mono text-[9px]">
              {["Go / Node.js", "PostgreSQL Cluster", "Docker / K8s", "AWS EC2", "Redis Pub/Sub", "CI/CD"].map((t) => (
                <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-slate-300 font-medium">
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
