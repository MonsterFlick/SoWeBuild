"use client";

import { useState } from "react";

interface AssetEntry {
  title: string;
  category: "Vector" | "Raster" | "Motion" | "Social";
  format: "SVG" | "PNG" | "MP4" | "GIF";
  size: string;
  dimensions: string;
  path: string;
  description: string;
}

const ASSET_CATALOG: AssetEntry[] = [
  {
    title: "Primary Logo (Ivory Violet Light)",
    category: "Vector",
    format: "SVG",
    size: "900 B",
    dimensions: "320×80 (Scalable)",
    path: "/brand/sowebuild-logo-light.svg",
    description: "Standard horizontal vector lockup for Warm Ivory (#FAF8F5) surfaces, web headers, documents, and invoices.",
  },
  {
    title: "Primary Logo (Inverted Violet)",
    category: "Vector",
    format: "SVG",
    size: "950 B",
    dimensions: "320×80 (Scalable)",
    path: "/brand/sowebuild-logo-dark.svg",
    description: "High-contrast inverted vector lockup for dark footers, black-tie pitch decks, and dark UI surfaces.",
  },
  {
    title: "Stacked Studio Lockup",
    category: "Vector",
    format: "SVG",
    size: "1.2 KB",
    dimensions: "200×200 (Scalable)",
    path: "/brand/sowebuild-logo-stacked.svg",
    description: "Centered square mark on ivory card for app badges, social profiles, and software launchers.",
  },
  {
    title: "Signature Slash Mark (Elevated Frame)",
    category: "Vector",
    format: "SVG",
    size: "1.0 KB",
    dimensions: "120×120 (Scalable)",
    path: "/brand/sowebuild-symbol-glow.svg",
    description: "Signature forward slash with soft Royal Violet aura and hairline border for favicons and badges.",
  },
  {
    title: "Geometric Slash (Raw Vector)",
    category: "Vector",
    format: "SVG",
    size: "433 B",
    dimensions: "40×60 (Scalable)",
    path: "/brand/sowebuild-symbol.svg",
    description: "Minimal raw vector polygon for inline glyphs, stamps, code, and watermark patterns.",
  },
  {
    title: "Animated Loop (60fps Full HD Video)",
    category: "Motion",
    format: "MP4",
    size: "620 KB",
    dimensions: "1920×1080 (60 FPS)",
    path: "/brand/sowebuild-animated.mp4",
    description: "Ultra-crisp 60fps Full HD video loop in Ivory Violet theme with smooth specular flare and seamless looping.",
  },
  {
    title: "Animated Loop (HD GIF)",
    category: "Motion",
    format: "GIF",
    size: "840 KB",
    dimensions: "960×540 (50 Frames)",
    path: "/brand/sowebuild-animated.gif",
    description: "High-definition looping animated GIF on Warm Ivory canvas for Discord, GitHub READMEs, and presentations.",
  },
  {
    title: "Primary Logo Light (4K Ultra-Wide)",
    category: "Raster",
    format: "PNG",
    size: "265 KB",
    dimensions: "3840×1200 (4K UHD)",
    path: "/brand/sowebuild-logo-light.png",
    description: "Pre-rendered 4K ultra-wide master logo on Warm Ivory (#FAF8F5) luxury background with Syne typography.",
  },
  {
    title: "Primary Logo Inverted (4K Ultra-Wide)",
    category: "Raster",
    format: "PNG",
    size: "375 KB",
    dimensions: "3840×1200 (4K UHD)",
    path: "/brand/sowebuild-logo-dark.png",
    description: "Pre-rendered 4K ultra-wide inverted master logo on Deep Purple Ink (#161124) background.",
  },
  {
    title: "Signature Slash Master Icon (4K Square)",
    category: "Raster",
    format: "PNG",
    size: "488 KB",
    dimensions: "3840×3840 (4K UHD)",
    path: "/brand/sowebuild-symbol.png",
    description: "Pre-rendered 4K square master icon in Warm Ivory with Royal Violet aura and hairline frame.",
  },
  {
    title: "LinkedIn Company Banner (4K Retina)",
    category: "Social",
    format: "PNG",
    size: "219 KB",
    dimensions: "3168×792 (Retina)",
    path: "/brand/sowebuild-banner-linkedin.png",
    description: "Full-width 4K LinkedIn header banner in Ivory Violet theme with studio capabilities and brand lockup.",
  },
  {
    title: "Twitter / X Header Banner (4K Retina)",
    category: "Social",
    format: "PNG",
    size: "218 KB",
    dimensions: "3000×1000 (Retina)",
    path: "/brand/sowebuild-banner-twitter.png",
    description: "Full-width 4K Twitter/X header banner with Syne typography and Royal Violet lighting.",
  },
  {
    title: "Instagram / Square Avatar (4K)",
    category: "Social",
    format: "PNG",
    size: "232 KB",
    dimensions: "2160×2160 (4K UHD)",
    path: "/brand/sowebuild-instagram-pfp.png",
    description: "Optimized 4K circular crop profile avatar with Royal Violet slash.",
  },
  {
    title: "Instagram Ring Avatar (4K)",
    category: "Social",
    format: "PNG",
    size: "296 KB",
    dimensions: "2160×2160 (4K UHD)",
    path: "/brand/sowebuild-instagram-pfp-ring.png",
    description: "4K UHD Instagram profile picture with Royal Violet outer ring.",
  },
  {
    title: "Glow Avatar (4K UHD)",
    category: "Social",
    format: "PNG",
    size: "297 KB",
    dimensions: "2160×2160 (4K UHD)",
    path: "/brand/sowebuild-avatar-glow.png",
    description: "Universal 4K avatar master on Warm Ivory for YouTube, GitHub, Slack, and profile icons.",
  },
  {
    title: "Transparent Avatar (4K UHD)",
    category: "Social",
    format: "PNG",
    size: "182 KB",
    dimensions: "2160×2160 (4K UHD)",
    path: "/brand/sowebuild-avatar-transparent.png",
    description: "Transparent background 4K slash glyph for video overlays, stamps, and watermarks.",
  },
];

export function AssetDownloadMatrix() {
  const [filter, setFilter] = useState<"All" | "Vector" | "Motion" | "Raster" | "Social">("All");

  const filtered = ASSET_CATALOG.filter((item) => {
    if (filter === "All") return true;
    return item.category === filter;
  });

  return (
    <section id="downloads" className="relative py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-[#5A5068] uppercase">
            <span className="h-px w-8 bg-primary" />
            4K Asset Vault
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#161124]">
            Download Official 4K Brand Assets
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#5A5068]">
            Complete suite of official brand assets in ultra-crisp 4K UHD resolutions, 60fps video, vector SVGs, and social kits. 100% code-generated for the Ivory Violet design system.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-[#E8DFF2] bg-white p-1 font-mono text-xs shadow-sm">
          {(["All", "Vector", "Raster", "Motion", "Social"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3.5 py-1 transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[#161124] text-white font-bold shadow-sm"
                  : "text-[#5A5068] hover:text-[#161124]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Assets */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((asset) => (
          <div
            key={asset.title}
            className="flex flex-col justify-between rounded-2xl border border-[#E8DFF2] bg-white p-5 shadow-sm hover:border-primary/50 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FAF8F5] border border-[#E8DFF2] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#161124]">
                  <span className="size-1.5 rounded-full bg-[#7C3AED]" />
                  {asset.format}
                </span>
                <span className="font-mono text-[11px] text-[#5A5068]">{asset.size}</span>
              </div>

              <h3 className="font-display text-base font-bold text-[#161124] transition-colors">
                {asset.title}
              </h3>
              <p className="mt-1.5 text-xs text-[#5A5068] leading-relaxed">
                {asset.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#F2EBF7]">
              <span className="font-mono text-[10px] font-bold text-[#5A5068]">
                {asset.dimensions}
              </span>

              <a
                href={asset.path}
                download
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#7C3AED] px-3 py-1.5 font-mono text-xs font-bold text-white hover:bg-[#6D28D9] transition-all shadow-sm cursor-pointer"
              >
                <span>Download</span>
                <svg className="size-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
