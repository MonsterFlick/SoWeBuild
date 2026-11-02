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
    title: "Primary Logo (Cyber Void)",
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
    size: "1.1 KB",
    dimensions: "120×120 (Scalable)",
    path: "/brand/sowebuild-symbol-glow.svg",
    description: "Signature forward slash with radial electric violet bloom for favicons and avatars.",
  },
  {
    title: "Geometric Slash (Raw)",
    category: "Vector",
    format: "SVG",
    size: "482 B",
    dimensions: "40×60 (Scalable)",
    path: "/brand/sowebuild-symbol.svg",
    description: "Minimal raw vector polygon for inline glyphs, stamps, and watermark patterns.",
  },
  {
    title: "Animated Loop (4K UHD Video)",
    category: "Motion",
    format: "MP4",
    size: "2.3 MB",
    dimensions: "3840×2160 (4K UHD)",
    path: "/brand/sowebuild-animated.mp4",
    description: "Ultra-crisp 16 Mbps 4K UHD video loop for motion graphic sequences and video bumpers.",
  },
  {
    title: "Animated Loop (HD GIF)",
    category: "Motion",
    format: "GIF",
    size: "1.4 MB",
    dimensions: "960×540 (36 Frames)",
    path: "/brand/sowebuild-animated.gif",
    description: "High-definition looping animated GIF for Discord, GitHub READMEs, and presentations.",
  },
  {
    title: "Primary Logo Raster (4K Ultra-Wide)",
    category: "Raster",
    format: "PNG",
    size: "519 KB",
    dimensions: "3840×1200 (4K UHD)",
    path: "/brand/sowebuild-logo-dark.png",
    description: "Pre-rendered 4K ultra-wide master logo on deep cyber obsidian background.",
  },
  {
    title: "Cyber Slash Raster Icon (4K Square)",
    category: "Raster",
    format: "PNG",
    size: "1.07 MB",
    dimensions: "3840×3840 (4K UHD)",
    path: "/brand/sowebuild-symbol.png",
    description: "Pre-rendered 4K square master icon with electric violet glow and cyan edge flares.",
  },
  {
    title: "Instagram / Square Avatar (4K)",
    category: "Social",
    format: "PNG",
    size: "542 KB",
    dimensions: "2160×2160 (4K UHD)",
    path: "/brand/sowebuild-instagram-pfp.png",
    description: "Optimized 4K circular crop profile avatar with glowing slash symbol.",
  },
  {
    title: "Instagram Ring Avatar (4K)",
    category: "Social",
    format: "PNG",
    size: "730 KB",
    dimensions: "2160×2160 (4K UHD)",
    path: "/brand/sowebuild-instagram-pfp-ring.png",
    description: "4K UHD Instagram profile picture with glowing neon outer ring.",
  },
  {
    title: "LinkedIn Company Banner (4K Retina)",
    category: "Social",
    format: "PNG",
    size: "326 KB",
    dimensions: "3168×792 (Retina)",
    path: "/brand/sowebuild-banner-linkedin.png",
    description: "Full-width 4K LinkedIn header banner with capabilities and brand lockup.",
  },
  {
    title: "Twitter / X Header Banner (4K Retina)",
    category: "Social",
    format: "PNG",
    size: "528 KB",
    dimensions: "3000×1000 (Retina)",
    path: "/brand/sowebuild-banner-twitter.png",
    description: "Full-width 4K Twitter/X header banner with typography and neon lighting.",
  },
  {
    title: "Glow Avatar (4K UHD)",
    category: "Social",
    format: "PNG",
    size: "611 KB",
    dimensions: "2160×2160 (4K UHD)",
    path: "/brand/sowebuild-avatar-glow.png",
    description: "Universal 4K avatar master for YouTube, GitHub, Slack, and profile icons.",
  },
  {
    title: "Transparent Avatar (4K UHD)",
    category: "Social",
    format: "PNG",
    size: "245 KB",
    dimensions: "2160×2160 (4K UHD)",
    path: "/brand/sowebuild-avatar-transparent.png",
    description: "Transparent background 4K slash glyph for video overlays and watermarks.",
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
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-[#585062] uppercase">
            <span className="h-px w-8 bg-[#c6ff3d]" />
            4K Asset Vault
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#16131D]">
            Download Official 4K Brand Assets
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#585062]">
            Complete suite of official brand assets in ultra-crisp 4K UHD resolutions, 60fps video, vector SVGs, and social kits. 100% code-generated.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-[#E8E2EE] bg-white p-1 font-mono text-xs shadow-sm">
          {(["All", "Vector", "Raster", "Motion", "Social"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3.5 py-1 transition-all ${
                filter === cat
                  ? "bg-[#16131D] text-[#c6ff3d] font-bold shadow-sm"
                  : "text-[#585062] hover:text-[#16131D]"
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
            className="flex flex-col justify-between rounded-2xl border border-[#E8E2EE] bg-white p-5 shadow-sm hover:border-[#16131D] hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FAF8F5] border border-[#E8E2EE] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#16131D]">
                  <span className="size-1.5 rounded-full bg-[#c6ff3d]" />
                  {asset.format}
                </span>
                <span className="font-mono text-[11px] text-[#887E94]">{asset.size}</span>
              </div>

              <h3 className="font-display text-base font-bold text-[#16131D] transition-colors">
                {asset.title}
              </h3>
              <p className="mt-1.5 text-xs text-[#585062] leading-relaxed">
                {asset.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#F1EBF7]">
              <span className="font-mono text-[10px] font-bold text-[#887E94]">
                {asset.dimensions}
              </span>

              <a
                href={asset.path}
                download
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#16131D] px-3 py-1.5 font-mono text-xs font-bold text-[#c6ff3d] hover:bg-black transition-all shadow-sm"
              >
                <span>Download</span>
                <svg className="size-3.5 text-[#c6ff3d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
