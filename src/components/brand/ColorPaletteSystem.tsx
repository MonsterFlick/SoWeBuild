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
    name: "Royal Violet",
    role: "Primary Studio Accent & Action",
    hex: "#7C3AED",
    rgb: "rgb(124, 58, 237)",
    oklch: "oklch(0.58 0.24 290)",
    cssVar: "var(--color-accent)",
    textColor: "#FFFFFF",
    contrastRatio: "6.8:1",
    contrastRating: "AAA",
  },
  {
    name: "Royal Accent Hover",
    role: "Hover States, Active Rings & Emphasized Accents",
    hex: "#6D28D9",
    rgb: "rgb(109, 40, 217)",
    oklch: "oklch(0.51 0.23 290)",
    cssVar: "var(--color-accent-hover)",
    textColor: "#FFFFFF",
    contrastRatio: "8.5:1",
    contrastRating: "AAA",
  },
  {
    name: "Warm Ivory",
    role: "Primary Canvas Background",
    hex: "#FAF8F5",
    rgb: "rgb(250, 248, 245)",
    oklch: "oklch(0.98 0.008 80)",
    cssVar: "var(--background)",
    textColor: "#161124",
    contrastRatio: "14.8:1",
    contrastRating: "AAA",
  },
  {
    name: "Deep Purple Ink",
    role: "Primary Headings & Bold Text (Zero Pure Black)",
    hex: "#161124",
    rgb: "rgb(22, 17, 36)",
    oklch: "oklch(0.18 0.04 300)",
    cssVar: "var(--foreground)",
    textColor: "#FAF8F5",
    contrastRatio: "14.8:1",
    contrastRating: "AAA",
  },
  {
    name: "Pure Surface",
    role: "Cards, Panels & Glass Slabs",
    hex: "#FFFFFF",
    rgb: "rgb(255, 255, 255)",
    oklch: "oklch(1.0 0 0)",
    cssVar: "var(--color-surface)",
    textColor: "#161124",
    contrastRatio: "15.4:1",
    contrastRating: "AAA",
  },
  {
    name: "Slate Purple",
    role: "Descriptions & Secondary Metadata",
    hex: "#5A5068",
    rgb: "rgb(90, 80, 104)",
    oklch: "oklch(0.48 0.05 310)",
    cssVar: "var(--color-text-secondary)",
    textColor: "#FFFFFF",
    contrastRatio: "5.8:1",
    contrastRating: "AA",
  },
  {
    name: "Hairline Border",
    role: "Subtle Separators & Card Outlines",
    hex: "#E8DFF2",
    rgb: "rgb(232, 223, 242)",
    oklch: "oklch(0.91 0.02 310)",
    cssVar: "var(--color-border)",
    textColor: "#161124",
    contrastRatio: "11.5:1",
    contrastRating: "AAA",
  },
  {
    name: "Soft Violet Elevate",
    role: "Elevated Slabs & Hover Accent Tints",
    hex: "#F5EDFA",
    rgb: "rgb(245, 237, 250)",
    oklch: "oklch(0.95 0.015 310)",
    cssVar: "var(--color-surface-elevated)",
    textColor: "#161124",
    contrastRatio: "13.6:1",
    contrastRating: "AAA",
  },
  {
    name: "Violet Glow",
    role: "Laser Sweep & Ambient Bloom",
    hex: "#A78BFA",
    rgb: "rgb(167, 139, 250)",
    oklch: "oklch(0.72 0.16 295)",
    cssVar: "var(--color-accent-dim)",
    textColor: "#161124",
    contrastRatio: "6.5:1",
    contrastRating: "AA",
  },
];

const GRADIENTS = [
  {
    name: "Royal Violet Arc",
    css: "linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #A78BFA 100%)",
    token: "var(--gradient-violet)",
    usage: "Brand symbol gradients, primary buttons, active state badges",
  },
  {
    name: "Luxury Ink to Violet Text",
    css: "linear-gradient(135deg, #161124 0%, #7C3AED 70%, #9333EA 100%)",
    token: "var(--gradient-text)",
    usage: "Large display headlines, marketing hero slogans, key value props",
  },
  {
    name: "Warm Ivory Glass Surface",
    css: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(250,248,245,0.7) 50%, rgba(245,237,250,0.4) 100%)",
    token: "var(--gradient-glass)",
    usage: "Slab containers, modal backgrounds, subtle specular card bevels",
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
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 rounded-full border border-[#E8DFF2] bg-white/95 px-4 py-2 font-mono text-xs text-[#161124] shadow-lg backdrop-blur-xl"
          >
            <span className="size-2 rounded-full bg-primary animate-ping" />
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
            Ivory Violet Color Tokens
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Formulated for the Ivory Violet luxury light theme with Warm Ivory (#FAF8F5) canvas, Royal Violet (#7C3AED), and Deep Purple Ink (#161124). Every token is formulated in OKLCH for perceptually uniform lightness and gamut accuracy.
          </p>
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLOR_TOKENS.map((c) => (
          <div
            key={c.name}
            className="group relative overflow-hidden rounded-2xl border border-[#E8DFF2] bg-white p-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
          >
            {/* Color preview block */}
            <div
              className="relative h-24 w-full rounded-xl p-3 flex flex-col justify-between shadow-inner border border-black/5"
              style={{ backgroundColor: c.hex }}
            >
              <div className="flex justify-between items-start">
                <span
                  className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md"
                  style={{
                    backgroundColor: c.textColor === "#FFFFFF" ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.7)",
                    color: c.textColor,
                  }}
                >
                  WCAG {c.contrastRating} ({c.contrastRatio})
                </span>

                <button
                  onClick={() => copyToClipboard(c.hex, c.name)}
                  className="rounded-md bg-black/30 p-1.5 text-white hover:bg-black/50 transition-colors cursor-pointer"
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
              <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-[#E8DFF2] font-mono text-[10px]">
                <button
                  onClick={() => copyToClipboard(c.hex, "HEX")}
                  className="rounded bg-[#FAF8F5] border border-[#E8DFF2] px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-[#F5EDFA] transition-colors cursor-pointer"
                >
                  HEX: {c.hex}
                </button>
                <button
                  onClick={() => copyToClipboard(c.rgb, "RGB")}
                  className="rounded bg-[#FAF8F5] border border-[#E8DFF2] px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-[#F5EDFA] transition-colors cursor-pointer"
                >
                  RGB
                </button>
                <button
                  onClick={() => copyToClipboard(c.oklch, "OKLCH")}
                  className="rounded bg-[#FAF8F5] border border-[#E8DFF2] px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-[#F5EDFA] transition-colors cursor-pointer"
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
              className="rounded-2xl border border-[#E8DFF2] bg-white p-4 flex flex-col justify-between shadow-sm hover:border-primary/50 transition-all"
            >
              <div>
                <div
                  className="h-16 w-full rounded-xl shadow-xs border border-[#E8DFF2] mb-3"
                  style={{ background: g.css }}
                />
                <div className="font-display text-sm font-semibold text-foreground">
                  {g.name}
                </div>
                <div className="font-mono text-[10px] text-primary mt-0.5">
                  {g.token}
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {g.usage}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(g.css, g.name)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#E8DFF2] bg-[#FAF8F5] py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:bg-[#F5EDFA] transition-all cursor-pointer"
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
