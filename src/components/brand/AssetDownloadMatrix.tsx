"use client";

import { useState } from "react";

interface AssetEntry {
  title: string;
  category: "Vector" | "Raster" | "Motion";
  format: "SVG" | "PNG" | "MP4" | "GIF";
  size: string;
  dimensions: string;
  path: string;
  description: string;
}

const ASSET_CATALOG: AssetEntry[] = [
  {
    title: "Primary Logo (Dark Void)",
    category: "Vector",
    format: "SVG",
    size: "939 B",
    dimensions: "320×80 (Scalable)",
    path: "/brand/sowebuild-logo-dark.svg",
    description: "Standard horizontal vector lockup for dark surfaces, web headers, and presentations.",
  },
  {
    title: "Primary Logo (Clean Light)",
    category: "Vector",
    format: "SVG",
    size: "888 B",
    dimensions: "320×80 (Scalable)",
    path: "/brand/sowebuild-logo-light.svg",
    description: "High-contrast dark-on-white lockup for paper, invoices, and light theme interfaces.",
  },
  {
    title: "Stacked App Lockup",
    category: "Vector",
    format: "SVG",
    size: "1.2 KB",
    dimensions: "200×200 (Scalable)",
    path: "/brand/sowebuild-logo-stacked.svg",
    description: "Centered square mark for app badges, social profiles, and software launchers.",
  },
  {
    title: "Cyber Slash Mark (Glow)",
    category: "Vector",
    format: "SVG",
    size: "1.0 KB",
    dimensions: "120×120 (Scalable)",
    path: "/brand/sowebuild-symbol-glow.svg",
    description: "Signature forward slash with radial neon bloom for favicons and avatars.",
  },
  {
    title: "Geometric Slash (Raw)",
    category: "Vector",
    format: "SVG",
    size: "433 B",
    dimensions: "40×60 (Scalable)",
    path: "/brand/sowebuild-symbol.svg",
    description: "Minimal raw vector polygon for inline glyphs, stamps, and watermark patterns.",
  },
  {
    title: "Animated Loop (MP4 Video)",
    category: "Motion",
    format: "MP4",
    size: "672 KB",
    dimensions: "960×540 (60fps)",
    path: "/brand/sowebuild-animated.mp4",
    description: "High-bitrate H.264 video loop for motion graphic sequences and video bumpers.",
  },
  {
    title: "Animated Loop (GIF)",
    category: "Motion",
    format: "GIF",
    size: "838 KB",
    dimensions: "640×360 (36 Frames)",
    path: "/brand/sowebuild-animated.gif",
    description: "Universal looping animated GIF for Discord, GitHub READMEs, and chat messages.",
  },
  {
    title: "Primary Logo Raster",
    category: "Raster",
    format: "PNG",
    size: "94 KB",
    dimensions: "1280×400 (Hi-DPI)",
    path: "/brand/sowebuild-logo-dark.png",
    description: "Pre-rendered high-DPI raster logo on void dark background.",
  },
  {
    title: "Cyber Slash Raster Icon",
    category: "Raster",
    format: "PNG",
    size: "114 KB",
    dimensions: "800×800 (Hi-DPI)",
    path: "/brand/sowebuild-symbol.png",
    description: "Pre-rendered square app icon with electric violet glow.",
  },
];

export function AssetDownloadMatrix() {
  const [filter, setFilter] = useState<"All" | "Vector" | "Motion" | "Raster">("All");

  const filtered = ASSET_CATALOG.filter((item) => {
    if (filter === "All") return true;
    return item.category === filter;
  });

  return (
    <section id="downloads" className="relative py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Asset Center
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Download Brand Package
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Directly access production-ready brand assets. 100% code-generated, optimized, and ready for deployment.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 font-mono text-xs">
          {(["All", "Vector", "Motion", "Raster"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3.5 py-1 transition-all ${
                filter === cat
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((asset) => (
          <div
            key={asset.title}
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm hover:border-white/20 transition-all hover:bg-white/[0.04]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                    asset.format === "MP4" || asset.format === "GIF"
                      ? "border border-primary/40 bg-primary/20 text-primary-glow"
                      : asset.format === "SVG"
                      ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-400"
                      : "border border-white/20 bg-white/10 text-white"
                  }`}
                >
                  {asset.format}
                </span>

                <span className="font-mono text-[10px] text-muted-foreground">
                  {asset.size}
                </span>
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                {asset.title}
              </h3>

              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {asset.description}
              </p>

              <div className="mt-4 font-mono text-[10px] text-muted-foreground/80">
                Dimension: <span className="text-foreground font-semibold">{asset.dimensions}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <a
                href={asset.path}
                download
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-2 font-mono text-xs font-medium text-foreground hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm group-hover:border-primary/40"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download {asset.format}</span>
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + asset.path);
                  alert(`Copied CDN URL: ${window.location.origin + asset.path}`);
                }}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                title="Copy Direct URL"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
