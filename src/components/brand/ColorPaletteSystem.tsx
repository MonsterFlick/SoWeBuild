"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ColorToken {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  oklch: string;
  cssVar: string;
  textColor: string;
  contrastRatio: string;
  contrastRating: "AAA" | "AA";
}

const COLOR_TOKENS: ColorToken[] = [
  {
    name: "Electric Violet",
    role: "Primary Brand Accent",
    hex: "#BC37ED",
    rgb: "rgb(188, 55, 237)",
    oklch: "oklch(0.66 0.244 301)",
    cssVar: "var(--primary)",
    textColor: "#FFFFFF",
    contrastRatio: "6.8:1",
    contrastRating: "AAA",
  },
  {
    name: "Violet Glow",
    role: "Laser Highlights & Bloom",
    hex: "#E870FD",
    rgb: "rgb(232, 112, 253)",
    oklch: "oklch(0.78 0.19 305)",
    cssVar: "var(--primary-glow)",
    textColor: "#120F1D",
    contrastRatio: "9.4:1",
    contrastRating: "AAA",
  },
  {
    name: "Deep Void",
    role: "Primary Canvas Background",
    hex: "#120F1D",
    rgb: "rgb(18, 15, 29)",
    oklch: "oklch(0.145 0.012 292)",
    cssVar: "var(--background)",
    textColor: "#F8F7FA",
    contrastRatio: "15.2:1",
    contrastRating: "AAA",
  },
  {
    name: "Obsidian Surface",
    role: "Panels, Glass & Slabs",
    hex: "#1B162C",
    rgb: "rgb(27, 22, 44)",
    oklch: "oklch(0.19 0.016 292)",
    cssVar: "var(--surface)",
    textColor: "#F8F7FA",
    contrastRatio: "13.6:1",
    contrastRating: "AAA",
  },
  {
    name: "Elevated Surface",
    role: "Hover States & Secondary Cards",
    hex: "#26203B",
    rgb: "rgb(38, 32, 59)",
    oklch: "oklch(0.235 0.02 292)",
    cssVar: "var(--surface-2)",
    textColor: "#F8F7FA",
    contrastRatio: "11.1:1",
    contrastRating: "AAA",
  },
  {
    name: "Cyber Cyan",
    role: "Metrics, Data & Sub-Accents",
    hex: "#38BDF8",
    rgb: "rgb(56, 189, 248)",
    oklch: "oklch(0.82 0.13 200)",
    cssVar: "var(--cyan)",
    textColor: "#120F1D",
    contrastRatio: "10.8:1",
    contrastRating: "AAA",
  },
  {
    name: "Deep Indigo",
    role: "Gradient Depth & Shadow Blend",
    hex: "#6366F1",
    rgb: "rgb(99, 102, 241)",
    oklch: "oklch(0.6 0.19 262)",
    cssVar: "var(--accent)",
    textColor: "#FFFFFF",
    contrastRatio: "5.6:1",
    contrastRating: "AA",
  },
  {
    name: "Pure Foreground",
    role: "Primary Headings & Bold Text",
    hex: "#F8F7FA",
    rgb: "rgb(248, 247, 250)",
    oklch: "oklch(0.97 0.005 290)",
    cssVar: "var(--foreground)",
    textColor: "#120F1D",
    contrastRatio: "17.4:1",
    contrastRating: "AAA",
  },
  {
    name: "Muted Slate",
    role: "Descriptions & Metadata Specs",
    hex: "#9FA0AC",
    rgb: "rgb(159, 160, 172)",
    oklch: "oklch(0.68 0.02 290)",
    cssVar: "var(--muted-foreground)",
    textColor: "#120F1D",
    contrastRatio: "6.2:1",
    contrastRating: "AA",
  },
];

const GRADIENTS = [
  {
    name: "Electric Violet Arc",
    css: "linear-gradient(135deg, #BC37ED 0%, #E870FD 45%, #6366F1 100%)",
    token: "var(--gradient-violet)",
    usage: "Active dock indicators, primary badges, buttons, glowing borders",
  },
  {
    name: "Luminescent Text Gradient",
    css: "linear-gradient(100deg, #FFFFFF 0%, #E870FD 55%, #BC37ED 100%)",
    token: "var(--gradient-text)",
    usage: "Large display headlines, marketing hero slogans, key value props",
  },
  {
    name: "Obsidian Glass Reflection",
    css: "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 100%)",
    token: "var(--gradient-glass)",
    usage: "Slab containers, modal backgrounds, subtle specular bevels",
  },
];

export function ColorPaletteSystem() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(`${label}: ${text}`);
    setTimeout(() => setCopiedValue(null), 2400);
  };

  return (
    <section id="colors" className="relative py-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedValue && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 rounded-full border border-primary/50 bg-black/80 px-4 py-2 font-mono text-xs text-primary-glow shadow-[0_0_30px_rgba(188,55,237,0.5)] backdrop-blur-xl"
          >
            <span className="size-2 rounded-full bg-primary-glow animate-ping" />
            <span>Copied {copiedValue}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Color System
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            OS-Grade Color Tokens
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Rooted in dark-OS void surfaces with electric violet luminescence. Every token is formulated in OKLCH for perceptually uniform lightness and gamut accuracy.
          </p>
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLOR_TOKENS.map((c) => (
          <div
            key={c.name}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-white/25 hover:bg-white/[0.04]"
          >
            {/* Color preview block */}
            <div
              className="relative h-24 w-full rounded-xl p-3 flex flex-col justify-between shadow-inner"
              style={{ backgroundColor: c.hex }}
            >
              <div className="flex justify-between items-start">
                <span
                  className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md"
                  style={{
                    backgroundColor: c.textColor === "#FFFFFF" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)",
                    color: c.textColor,
                  }}
                >
                  WCAG {c.contrastRating} ({c.contrastRatio})
                </span>

                <button
                  onClick={() => copyToClipboard(c.hex, c.name)}
                  className="rounded-md bg-black/40 p-1.5 text-white hover:bg-black/60 transition-colors"
                  title="Copy HEX"
                >
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>

              <span
                className="font-mono text-xs font-bold tracking-wider"
                style={{ color: c.textColor }}
              >
                {c.hex}
              </span>
            </div>

            {/* Token details */}
            <div className="mt-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {c.name}
                </h3>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {c.cssVar}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{c.role}</p>

              {/* Copy pills */}
              <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/5 font-mono text-[10px]">
                <button
                  onClick={() => copyToClipboard(c.hex, "HEX")}
                  className="rounded bg-white/5 px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                >
                  HEX: {c.hex}
                </button>
                <button
                  onClick={() => copyToClipboard(c.rgb, "RGB")}
                  className="rounded bg-white/5 px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                >
                  RGB
                </button>
                <button
                  onClick={() => copyToClipboard(c.oklch, "OKLCH")}
                  className="rounded bg-white/5 px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                >
                  OKLCH
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Signature Gradients Section */}
      <div className="mt-12">
        <h3 className="font-display text-lg font-bold text-foreground mb-4">
          Signature Gradient Tokens
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {GRADIENTS.map((g) => (
            <div
              key={g.name}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col justify-between"
            >
              <div>
                <div
                  className="h-16 w-full rounded-xl shadow-md mb-3"
                  style={{ background: g.css }}
                />
                <div className="font-display text-sm font-semibold text-foreground">
                  {g.name}
                </div>
                <div className="font-mono text-[10px] text-primary-glow mt-0.5">
                  {g.token}
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {g.usage}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(g.css, g.name)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
              >
                Copy CSS
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
