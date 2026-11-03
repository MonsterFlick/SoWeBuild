"use client";

export function BrandRules() {
  return (
    <section id="rules" className="relative py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Integrity
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Brand Rules &amp; Misuse
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Preserve brand consistency across all touchpoints. The SoWeBuild identity must remain clean, legible, and uncompromised.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* DO 1: Approved Ivory Violet Lockup */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-white p-5 shadow-sm">
          <div className="relative flex h-36 items-center justify-center rounded-xl bg-[#FAF8F5] border border-emerald-500/30 overflow-hidden">
            <img src="/brand/sowebuild-logo-light.svg" alt="Correct lockup" className="h-10 w-auto" />
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-600">
              ✓ DO
            </span>
          </div>
          <div className="mt-4">
            <div className="font-display text-sm font-semibold text-foreground">Approved Ivory Violet Lockup</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Always use the official SVG lockup with Royal Violet mark and Deep Purple Ink (#161124) typography on Warm Ivory surfaces.
            </p>
          </div>
        </div>

        {/* DON'T 1: Stretched / Distorted */}
        <div className="flex flex-col justify-between rounded-2xl border border-rose-500/30 bg-white p-5 shadow-sm">
          <div className="relative flex h-36 items-center justify-center rounded-xl bg-[#FAF8F5] border border-rose-500/30 overflow-hidden">
            <img src="/brand/sowebuild-logo-light.svg" alt="Distorted" className="h-10 w-auto scale-x-[1.6] scale-y-[0.7] opacity-70" />
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 font-mono text-[9px] font-bold text-rose-600">
              ✕ DON&apos;T
            </span>
          </div>
          <div className="mt-4">
            <div className="font-display text-sm font-semibold text-foreground">Do Not Distort or Stretch</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Never disproportionately stretch, squash, or alter the horizontal/vertical aspect ratio.
            </p>
          </div>
        </div>

        {/* DON'T 2: Unauthorized Colors */}
        <div className="flex flex-col justify-between rounded-2xl border border-rose-500/30 bg-white p-5 shadow-sm">
          <div className="relative flex h-36 items-center justify-center rounded-xl bg-[#FAF8F5] border border-rose-500/30 overflow-hidden">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-pink-500">
              <svg viewBox="0 0 40 60" className="w-5 h-9 fill-pink-500">
                <polygon points="26,2 38,2 14,58 2,58" />
              </svg>
              <span>SO WE BUILD</span>
            </div>
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 font-mono text-[9px] font-bold text-rose-600">
              ✕ DON&apos;T
            </span>
          </div>
          <div className="mt-4">
            <div className="font-display text-sm font-semibold text-foreground">Do Not Alter Brand Colors</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Never replace the signature Royal Violet palette with arbitrary legacy neon magenta or random primary hues.
            </p>
          </div>
        </div>

        {/* DON'T 3: Backwards / Flipped */}
        <div className="flex flex-col justify-between rounded-2xl border border-rose-500/30 bg-white p-5 shadow-sm">
          <div className="relative flex h-36 items-center justify-center rounded-xl bg-[#FAF8F5] border border-rose-500/30 overflow-hidden">
            <div className="scale-x-[-1] opacity-75">
              <img src="/brand/sowebuild-symbol.svg" alt="Flipped" className="h-12 w-auto" />
            </div>
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 font-mono text-[9px] font-bold text-rose-600">
              ✕ DON&apos;T
            </span>
          </div>
          <div className="mt-4">
            <div className="font-display text-sm font-semibold text-foreground">Do Not Flip or Invert Angle</div>
            <p className="mt-1 text-xs text-muted-foreground">
              The 14.2° forward slash must always point forward and right. Never mirror into a backslash.
            </p>
          </div>
        </div>

        {/* DON'T 4: Pure Black / Heavy Shadows */}
        <div className="flex flex-col justify-between rounded-2xl border border-rose-500/30 bg-white p-5 shadow-sm">
          <div className="relative flex h-36 items-center justify-center rounded-xl bg-slate-300 border border-rose-500/30 overflow-hidden">
            <div style={{ filter: "drop-shadow(8px 8px 0px rgba(0,0,0,0.9))" }}>
              <img src="/brand/sowebuild-logo-light.svg" alt="Muddy shadow" className="h-9 w-auto" />
            </div>
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 font-mono text-[9px] font-bold text-rose-600">
              ✕ DON&apos;T
            </span>
          </div>
          <div className="mt-4">
            <div className="font-display text-sm font-semibold text-foreground">Do Not Add Muddy Drop Shadows</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Avoid hard-edged retro drop shadows, heavy bevels, or harsh outlines that compromise precision.
            </p>
          </div>
        </div>

        {/* DO 2: Clear Space Protection */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-white p-5 shadow-sm">
          <div className="relative flex h-36 items-center justify-center rounded-xl bg-[#FAF8F5] border border-emerald-500/30 overflow-hidden">
            <div className="p-4 border border-dashed border-primary/40 rounded-lg">
              <img src="/brand/sowebuild-symbol-glow.svg" alt="Clear space" className="h-14 w-auto" />
            </div>
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-600">
              ✓ DO
            </span>
          </div>
          <div className="mt-4">
            <div className="font-display text-sm font-semibold text-foreground">Honor Safe Padding Perimeter</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Provide ample breathing room around all lockups for maximum optical clarity and authority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
