"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface LogoItem {
  id: string;
  name: string;
  usage: string;
  svgPath: string;
  pngPath?: string;
  previewBg: "dark" | "light" | "grid";
  aspectRatio: string;
}

const LOGO_ASSETS: LogoItem[] = [
  {
    id: "horizontal-dark",
    name: "Primary Lockup (Dark Void)",
    usage: "Default mark for dark backgrounds, navigation bars, presentations and digital UI.",
    svgPath: "/brand/sowebuild-logo-dark.svg",
    pngPath: "/brand/sowebuild-logo-dark.png",
    previewBg: "dark",
    aspectRatio: "aspect-[4/1]",
  },
  {
    id: "horizontal-light",
    name: "Primary Lockup (Clean Light)",
    usage: "High-contrast inverted lockup for light papers, invoices, print media and white themes.",
    svgPath: "/brand/sowebuild-logo-light.svg",
    previewBg: "light",
    aspectRatio: "aspect-[4/1]",
  },
  {
    id: "stacked-lockup",
    name: "Stacked App Lockup",
    usage: "Balanced square lockup optimized for social avatars, app icons, cards and badges.",
    svgPath: "/brand/sowebuild-logo-stacked.svg",
    previewBg: "dark",
    aspectRatio: "aspect-square",
  },
  {
    id: "symbol-glow",
    name: "Cyber Slash Mark (Glow Container)",
    usage: "Elevated icon for favicon, social avatars, software badges and launch graphics.",
    svgPath: "/brand/sowebuild-symbol-glow.svg",
    pngPath: "/brand/sowebuild-symbol.png",
    previewBg: "dark",
    aspectRatio: "aspect-square",
  },
  {
    id: "symbol-mark",
    name: "Geometric Slash (Raw Glyph)",
    usage: "Pure vector geometry for inline typography, watermarks, stamps and UI accents.",
    svgPath: "/brand/sowebuild-symbol.svg",
    previewBg: "grid",
    aspectRatio: "aspect-square",
  },
];

export function LogoShowcase() {
  const [activeTab, setActiveTab] = useState<"all" | "dark" | "light">("all");

  const filteredLogos = LOGO_ASSETS.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "dark") return item.previewBg === "dark" || item.previewBg === "grid";
    if (activeTab === "light") return item.previewBg === "light";
    return true;
  });

  return (
    <section id="logos" className="relative py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Core Assets
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Vector Logo System
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Crafted 100% with mathematical SVG code. Designed to scale infinitely with sub-pixel sharpness from 16px favicons to 8K displays.
          </p>
        </div>

        {/* Theme Filter */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 font-mono text-xs">
          {(["all", "dark", "light"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-3.5 py-1 transition-all capitalize ${
                activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Logos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLogos.map((logo) => (
          <motion.div
            key={logo.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm hover:border-primary/50 transition-colors"
          >
            {/* Visual Canvas Stage */}
            <div
              className={`relative flex items-center justify-center rounded-xl p-8 overflow-hidden transition-all duration-300 ${
                logo.previewBg === "light"
                  ? "bg-slate-100 text-slate-900 border border-slate-200"
                  : logo.previewBg === "grid"
                  ? "bg-[#120F1D] border border-white/10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"
                  : "bg-[#120F1D] border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"
              }`}
              style={{ minHeight: "220px" }}
            >
              {/* Image / SVG */}
              <img
                src={logo.svgPath}
                alt={logo.name}
                className={`max-h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105 ${
                  logo.id === "symbol-mark" ? "h-20" : ""
                }`}
              />

              {/* Background badge */}
              <span className="absolute top-2.5 right-2.5 rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground backdrop-blur-md">
                {logo.previewBg === "light" ? "Light Background" : "Dark Void"}
              </span>
            </div>

            {/* Info and Actions */}
            <div className="mt-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {logo.name}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {logo.usage}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2 pt-4 border-t border-white/10">
                <a
                  href={logo.svgPath}
                  download
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 px-3 font-mono text-xs font-medium text-foreground hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <svg className="size-3.5 text-primary-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>SVG</span>
                </a>

                {logo.pngPath && (
                  <a
                    href={logo.pngPath}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 px-3 font-mono text-xs font-medium text-foreground hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <svg className="size-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>PNG (Hi-Res)</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
