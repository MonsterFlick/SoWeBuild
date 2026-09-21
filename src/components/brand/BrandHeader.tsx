import Link from "next/link";

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        {/* Left: Brand Identity & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="flex size-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-transform group-hover:-translate-x-0.5">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </span>
            <span>STUDIO</span>
          </Link>

          <span className="text-muted-foreground/40 font-mono text-xs">/</span>

          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold tracking-tight text-foreground">
              BRAND GUIDELINES
            </span>
            <span className="hidden rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-primary-glow sm:inline-block">
              v1.0 SPEC
            </span>
          </div>
        </div>

        {/* Right: Section Links & Quick Action */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#logos"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Logos
          </a>
          <a
            href="#motion"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Animated
          </a>
          <a
            href="#colors"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Colors
          </a>
          <a
            href="#typography"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Typography
          </a>
          <a
            href="#geometry"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Geometry
          </a>
          <a
            href="#rules"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Rules
          </a>
          <a
            href="#downloads"
            className="rounded-full bg-primary/20 px-3.5 py-1.5 font-mono text-xs font-semibold text-primary-glow border border-primary/40 hover:bg-primary/30 transition-all shadow-[0_0_15px_rgba(188,55,237,0.3)]"
          >
            Downloads
          </a>
        </nav>

        {/* Mobile Download Button */}
        <a
          href="#downloads"
          className="rounded-full bg-primary px-3 py-1 font-mono text-xs font-semibold text-white md:hidden"
        >
          Assets
        </a>
      </div>
    </header>
  );
}
