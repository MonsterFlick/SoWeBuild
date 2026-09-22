"use client";

import Link from "next/link";
import { motion } from "motion/react";

function ArrowUpRightIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function WorkBentoGrid() {
  return (
    <section id="work" data-section data-mode="dashboard" className="relative px-5 py-14 sm:px-10 sm:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              Client Deployments
            </div>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,6vw,4.2rem)] leading-[0.92] font-bold tracking-tight text-foreground">
              SELECTED WORK &amp;
              <br />
              <span className="text-gradient">PRODUCTION RESULTS.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Real production systems engineered, optimized, and deployed for active clients worldwide.
          </p>
        </div>

        {/* 2 Featured Client Showcase Cards (ONLY FertiSure & Alpha Tech Nutrition) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CARD 1: FERTISURE */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-black to-teal-950/20 p-6 sm:p-8 backdrop-blur-xl hover:border-emerald-400 transition-all duration-300"
          >
            <div className="relative z-10 space-y-4">
              {/* Header Badge Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  HEALTHCARE TECH
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href="https://fertisure.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-300 hover:text-white transition-colors"
                  >
                    <span>fertisure.in</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  FertiSure
                </h3>
                <p className="font-mono text-xs text-emerald-300/90 mt-1">
                  Hemant Surgical Industries Ltd. (Est. 1983)
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                High-speed medical equipment portal &amp; specialized embryology catalog trusted by 500+ clinics globally.
              </p>

              {/* Stats Box */}
              <div className="my-3 rounded-xl bg-black/60 border border-emerald-500/20 p-4 flex items-center justify-between text-center font-mono">
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-emerald-400">500+</div>
                  <div className="text-[9px] text-muted-foreground uppercase">Clinics</div>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white">&lt;350ms</div>
                  <div className="text-[9px] text-muted-foreground uppercase">Page Speed</div>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-teal-300">5</div>
                  <div className="text-[9px] text-muted-foreground uppercase">CDN Regions</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Tech Stack + Case Study Link */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                {["Next.js 15", "Turbopack", "HIPAA Vault", "Vercel Edge"].map((t) => (
                  <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2.5 py-1 text-slate-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href="/work/fertisure"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 px-4 py-2 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all shadow-lg"
              >
                <span>Read Case Study</span>
                <ArrowUpRightIcon className="size-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* CARD 2: ALPHATECH NUTRITION */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 via-black to-indigo-950/20 p-6 sm:p-8 backdrop-blur-xl hover:border-blue-400 transition-all duration-300"
          >
            <div className="relative z-10 space-y-4">
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-blue-500/20 border border-blue-500/40 px-3 py-1 font-mono text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  LIVE E-COMMERCE
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href="https://alphatech-nutrition.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-blue-300 hover:text-white transition-colors"
                  >
                    <span>alphatech-nutrition.in</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Alpha Tech Nutrition
                </h3>
                <p className="font-mono text-xs text-blue-300/90 mt-1">
                  Sports Nutrition &amp; Anti-Counterfeit QR Engine
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Direct e-commerce platform with cryptographic QR batch verification seals on every tub.
              </p>

              {/* Stats Box */}
              <div className="my-3 rounded-xl bg-black/60 border border-blue-500/20 p-4 flex items-center justify-between text-center font-mono">
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-blue-400">100%</div>
                  <div className="text-[9px] text-muted-foreground uppercase">Authentic</div>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white">QR Batch</div>
                  <div className="text-[9px] text-muted-foreground uppercase">Crypto Seal</div>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-emerald-400">Edge</div>
                  <div className="text-[9px] text-muted-foreground uppercase">Deployed</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Tech Stack + Case Study Link */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                {["Next.js App Router", "QR Cryptography", "Redis Cache", "Tailwind CSS"].map((t) => (
                  <span key={t} className="rounded-md bg-black/60 border border-white/10 px-2.5 py-1 text-slate-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href="/work/alphatech-nutrition"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-500/20 border border-blue-400/40 px-4 py-2 font-mono text-xs font-bold text-blue-300 hover:bg-blue-500 hover:text-white transition-all shadow-lg"
              >
                <span>Read Case Study</span>
                <ArrowUpRightIcon className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
