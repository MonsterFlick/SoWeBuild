"use client";

import { useState } from "react";

export function LogoGeometry() {
  const [showGrid, setShowGrid] = useState(true);
  const [showCoords, setShowCoords] = useState(true);
  const [showSafeZone, setShowSafeZone] = useState(true);

  return (
    <section id="geometry" className="relative py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Engineering & Math
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Logo Geometry & Clear Space
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Constructed with pure vector coordinates on an isometric 40×60 coordinate grid. Every vertex is locked to mathematically defined ratios.
          </p>
        </div>

        {/* Blueprint Toggles */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`rounded-full px-3 py-1 border transition-all ${
              showGrid ? "bg-primary/20 border-primary text-primary-glow" : "border-white/10 text-muted-foreground"
            }`}
          >
            Grid: {showGrid ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => setShowCoords(!showCoords)}
            className={`rounded-full px-3 py-1 border transition-all ${
              showCoords ? "bg-primary/20 border-primary text-primary-glow" : "border-white/10 text-muted-foreground"
            }`}
          >
            Coordinates: {showCoords ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => setShowSafeZone(!showSafeZone)}
            className={`rounded-full px-3 py-1 border transition-all ${
              showSafeZone ? "bg-primary/20 border-primary text-primary-glow" : "border-white/10 text-muted-foreground"
            }`}
          >
            Clear Space: {showSafeZone ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Main Blueprint Card */}
      <div className="grid gap-8 lg:grid-cols-12 rounded-3xl border border-white/15 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl items-center">
        {/* SVG Blueprint Canvas */}
        <div className="lg:col-span-7 flex items-center justify-center rounded-2xl border border-white/10 bg-[#0F0D18] p-8 relative overflow-hidden">
          {/* Subtle grid background */}
          {showGrid && (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          )}

          <svg
            viewBox="-30 -20 100 100"
            className="w-full max-w-md h-auto select-none"
            style={{ filter: "drop-shadow(0 0 20px rgba(188,55,237,0.2))" }}
          >
            {/* Safe Exclusion Zone box */}
            {showSafeZone && (
              <g>
                <rect
                  x="-12"
                  y="-10"
                  width="64"
                  height="80"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.6"
                />
                <text x="20" y="-12" fill="#38BDF8" fontSize="3" fontFamily="monospace" textAnchor="middle">
                  CLEAR SPACE MARGIN (1X)
                </text>
              </g>
            )}

            {/* Axis grid markings */}
            <line x1="-20" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <line x1="0" y1="-10" x2="0" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

            {/* Construction slope indicator line */}
            <line
              x1="26"
              y1="2"
              x2="2"
              y2="58"
              stroke="#E870FD"
              strokeWidth="0.6"
              strokeDasharray="1.5 1.5"
              opacity="0.8"
            />

            {/* Main polygon slash */}
            <polygon
              points="26,2 38,2 14,58 2,58"
              fill="url(#blueprintGrad)"
              stroke="#FFFFFF"
              strokeWidth="0.8"
            />

            {/* Angle arc & text */}
            <path
              d="M 2 58 L 2 40 A 18 18 0 0 1 7.2 46 Z"
              fill="rgba(232, 112, 253, 0.25)"
              stroke="#E870FD"
              strokeWidth="0.5"
            />
            <text x="14" y="50" fill="#E870FD" fontSize="3.5" fontFamily="monospace" fontWeight="bold">
              14.2°
            </text>

            {/* Coordinate pins and labels */}
            {showCoords && (
              <g>
                {/* Point A */}
                <circle cx="26" cy="2" r="1.5" fill="#38BDF8" />
                <text x="24" y="-1" fill="#38BDF8" fontSize="2.8" fontFamily="monospace" textAnchor="end">
                  A (26, 2)
                </text>

                {/* Point B */}
                <circle cx="38" cy="2" r="1.5" fill="#38BDF8" />
                <text x="40" y="-1" fill="#38BDF8" fontSize="2.8" fontFamily="monospace">
                  B (38, 2)
                </text>

                {/* Point C */}
                <circle cx="14" cy="58" r="1.5" fill="#38BDF8" />
                <text x="17" y="62" fill="#38BDF8" fontSize="2.8" fontFamily="monospace">
                  C (14, 58)
                </text>

                {/* Point D */}
                <circle cx="2" cy="58" r="1.5" fill="#38BDF8" />
                <text x="0" y="62" fill="#38BDF8" fontSize="2.8" fontFamily="monospace" textAnchor="end">
                  D (2, 58)
                </text>
              </g>
            )}

            <defs>
              <linearGradient id="blueprintGrad" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#E870FD" />
                <stop offset="100%" stopColor="#BC37ED" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Technical Guidelines Description */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="font-mono text-xs text-primary-glow font-semibold">
              SPECIFICATION // GEOMETRY
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
              Mathematical Precision
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              The SoWeBuild forward slash is inclined at an exact 14.2° velocity angle, representing forward engineering momentum. The width ratio of the upper apex to the base maintains a golden 1:1 isometric balance.
            </p>
          </div>

          <div className="space-y-3 border-t border-white/10 pt-4 font-mono text-xs">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-primary-glow font-bold">Clear Space Exclusion Zone</div>
              <div className="mt-1 text-muted-foreground text-[11px] leading-normal">
                Maintain minimum padding equal to the base width of the mark (12 coordinate units) on all four sides. No text or third-party graphics may enter this perimeter.
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-cyan-400 font-bold">Minimum Render Scale</div>
              <div className="mt-1 text-muted-foreground text-[11px] leading-normal">
                Digital display: <strong>20px height</strong> (or 16px for favicon glyphs). Print media: <strong>6.5mm height</strong>. Never scale down below these thresholds to avoid sub-pixel blurring.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
