import Link from "next/link";

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFF2] bg-[#FAF8F5]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        {/* Left: Brand Identity & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="flex size-6 items-center justify-center rounded-lg border border-[#E8DFF2] bg-white shadow-sm transition-transform group-hover:-translate-x-0.5">
              <svg className="size-3.5 text-[#161124]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
            <span className="hidden rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-primary sm:inline-block">
              IVORY VIOLET SPEC
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
            className="rounded-full bg-primary px-3.5 py-1.5 font-mono text-xs font-semibold text-white hover:bg-primary-hover transition-all shadow-sm"
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
