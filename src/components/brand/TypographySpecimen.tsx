"use client";

import { useState } from "react";

const TYPE_FAMILIES = [
  {
    name: "Syne",
    role: "Display & Brand Wordmark",
    fontVar: "var(--font-syne)",
    weights: ["600 SemiBold", "700 Bold", "800 ExtraBold"],
    sample: "SO WE BUILD.IN",
    description: "Sculptural, wide geometric display face with distinctive architectural cuts and authoritative modern precision. Used for all primary headlines and marketing hero copy.",
  },
  {
    name: "Instrument Serif",
    role: "Editorial Italic Accent",
    fontVar: "var(--font-instrument-serif)",
    weights: ["400 Italic"],
    sample: "Engineered with senior-led precision & 100% IP ownership.",
    description: "Classic high-contrast editorial serif italic that brings artisanal prestige and luxury contrast to technical headlines and pull quotes.",
  },
  {
    name: "DM Sans",
    role: "Body & Interface Sans",
    fontVar: "var(--font-dm-sans)",
    weights: ["400 Regular", "500 Medium", "700 Bold"],
    sample: "Full-stack development studio engineered for speed and transparent deployment pipelines.",
    description: "Geometric sans serif optimized for dense screen readability, microcopy, service specifications, and high-legibility UI elements.",
  },
  {
    name: "JetBrains Mono",
    role: "Technical Specs & Eyebrows",
    fontVar: "var(--font-jetbrains-mono)",
    weights: ["400 Regular", "500 Medium"],
    sample: "const studio = new SoWeBuild({ mode: 'autonomous', ip: '100% client' });",
    description: "Developer-grade monospaced typeface with increased x-height and distinctive ligatures. Used for timestamps, coordinates, badges, and tech specifications.",
  },
];

export function TypographySpecimen() {
  const [testText, setTestText] = useState("NEXT-GEN SOFTWARE ARCHITECTURE // SOWEBUILD.IN");
  const [fontSize, setFontSize] = useState(36);
  const [selectedFont, setSelectedFont] = useState<"display" | "serif" | "sans" | "mono">("display");

  const activeFontFamily =
    selectedFont === "display"
      ? "var(--font-syne), sans-serif"
      : selectedFont === "serif"
      ? "var(--font-instrument-serif), serif"
      : selectedFont === "sans"
      ? "var(--font-dm-sans), sans-serif"
      : "var(--font-jetbrains-mono), monospace";

  return (
    <section id="typography" className="relative py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Typography
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Type System & Hierarchy
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Carefully curated hierarchy of Syne, Instrument Serif, DM Sans, and JetBrains Mono. Formatted for high readability and luxury studio prestige.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>Google Fonts &amp; OFL Licensed</span>
        </div>
      </div>

      {/* Font Family Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {TYPE_FAMILIES.map((font) => (
          <div
            key={font.name}
            className="flex flex-col justify-between rounded-2xl border border-[#E8DFF2] bg-white p-6 shadow-sm hover:border-primary/50 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-[#E8DFF2] bg-[#FAF8F5] px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground uppercase">
                  {font.role}
                </span>
                <span className="font-mono text-xs text-primary font-bold">
                  {font.fontVar}
                </span>
              </div>

              <h3
                className={`mt-4 text-2xl font-bold text-foreground ${font.name === "Instrument Serif" ? "italic" : ""}`}
                style={{ fontFamily: font.fontVar }}
              >
                {font.name}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {font.description}
              </p>

              {/* Weight Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {font.weights.map((w) => (
                  <span
                    key={w}
                    className="rounded bg-[#FAF8F5] border border-[#E8DFF2] px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Specimen Preview */}
            <div
              className={`mt-6 rounded-xl border border-[#E8DFF2] bg-[#FAF8F5] p-4 text-foreground/90 leading-snug ${
                font.name === "Instrument Serif" ? "italic" : ""
              }`}
              style={{ fontFamily: font.fontVar }}
            >
              <div className="text-sm font-semibold truncate">{font.sample}</div>
              <div className="mt-2 font-mono text-[10px] text-muted-foreground/60 tracking-wider">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Type Tester Lab */}
      <div className="rounded-3xl border border-[#E8DFF2] bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8DFF2] pb-6">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-foreground">Interactive Specimen Tester</span>
            <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono text-[10px] text-primary font-semibold">
              LIVE LAB
            </span>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            {/* Font selector */}
            <div className="flex items-center rounded-lg border border-[#E8DFF2] bg-[#FAF8F5] p-0.5">
              {(["display", "serif", "sans", "mono"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedFont(k)}
                  className={`px-3 py-1 rounded-md capitalize transition-all cursor-pointer ${
                    selectedFont === k ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Size Slider */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{fontSize}px</span>
              <input
                type="range"
                min="16"
                max="80"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-24 accent-primary cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Live Input Field */}
        <div className="mt-6">
          <input
            type="text"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Type your own headline..."
            className="w-full rounded-xl border border-[#E8DFF2] bg-[#FAF8F5] px-4 py-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Live Render Area */}
        <div className="mt-8 min-h-[160px] overflow-hidden rounded-2xl border border-[#E8DFF2] bg-[#FAF8F5] p-8 flex items-center justify-center text-center">
          <p
            className={`font-bold tracking-tight text-foreground transition-all select-none ${
              selectedFont === "serif" ? "italic" : ""
            }`}
            style={{
              fontFamily: activeFontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: 1.15,
            }}
          >
            {testText || "SoWeBuild Studio"}
          </p>
        </div>
      </div>
    </section>
  );
}
