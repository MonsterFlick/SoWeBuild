import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CASE_STUDIES } from "@/lib/workData";
import { CaseStudyHeadline } from "@/components/CaseStudyHeadline";
import CustomCursor from "@/components/CustomCursor";

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES[slug];
  if (!cs) return { title: "Case Study Not Found — SoWeBuild" };
  return {
    title: `${cs.title} — SoWeBuild Case Study`,
    description: cs.summary,
    openGraph: {
      title: `${cs.client} Case Study — SoWeBuild`,
      description: cs.subtitle,
      images: [cs.image],
    },
  };
}

function ArrowUpRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function CheckCircleIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function TargetIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export default async function WorkSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES[slug];

  if (!cs) {
    notFound();
  }

  const otherSlug = slug === "fertisure" ? "alphatech-nutrition" : "fertisure";
  const otherCs = CASE_STUDIES[otherSlug];

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#16131D] overflow-x-hidden selection:bg-[#c6ff3d] selection:text-[#121019]">
      {/* Luxury Trailing Cursor */}
      <CustomCursor />

      {/* Atmospheric Ambient Lighting Gradients */}
      <div
        className="pointer-events-none fixed top-0 right-1/4 size-[400px] sm:size-[700px] rounded-full blur-[140px] sm:blur-[180px] -z-10 opacity-20"
        style={{ background: "radial-gradient(circle, rgba(198,255,61,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none fixed top-[45%] left-[-100px] size-[350px] sm:size-[600px] rounded-full blur-[120px] sm:blur-[160px] -z-10 opacity-15"
        style={{ background: "radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)" }}
      />

      {/* ============================================================== */}
      {/* TOP FLOATING NAVIGATION BAR                                    */}
      {/* ============================================================== */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 py-2.5 sm:px-6 sm:py-3.5">
        <div className="mx-auto max-w-7xl flex items-center justify-between rounded-full border border-[#E8E2EE] bg-[#FAF8F5]/90 px-3 py-2 sm:px-6 sm:py-2.5 backdrop-blur-xl shadow-lg shadow-purple-950/5 gap-2">
          {/* Back to Studio link */}
          <Link
            href="/#work"
            className="group inline-flex items-center gap-1.5 sm:gap-2 font-mono text-xs text-[#585062] hover:text-[#16131D] transition-colors shrink-0"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-purple-900/[0.04] border border-[#E8E2EE] group-hover:border-[#c6ff3d] group-hover:bg-[#c6ff3d]/15 transition-all">
              <ArrowLeftIcon className="size-3.5 text-[#585062] group-hover:text-[#16131D] transition-colors" />
            </span>
            <span className="hidden sm:inline">Back to Selected Work</span>
            <span className="sm:hidden text-[11px] font-semibold">Work</span>
          </Link>

          {/* Studio Brand Mark */}
          <Link href="/" className="font-display text-xs sm:text-base font-extrabold tracking-tight text-[#16131D] hover:opacity-80 transition-opacity shrink-0">
            SOWEBUILD<span className="text-[#c6ff3d]">.</span>IN
          </Link>

          {/* Visit Live Platform CTA */}
          <a
            href={cs.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-[#c6ff3d] px-3 py-1.5 sm:px-4 sm:py-1.5 font-mono text-[11px] sm:text-xs font-bold text-[#121019] shadow-md shadow-[#c6ff3d]/25 hover:bg-[#b4f028] hover:scale-[1.02] transition-all shrink-0"
          >
            <span className="hidden sm:inline">Visit Live Platform</span>
            <span className="sm:hidden">Live ↗</span>
            <ArrowUpRightIcon className="size-3 hidden sm:inline" />
          </a>
        </div>
      </header>

      {/* ============================================================== */}
      {/* HERO SECTION                                                   */}
      {/* ============================================================== */}
      <main className="relative z-10 pt-24 sm:pt-32 lg:pt-36">
        <div className="container-wide">
          {/* Breadcrumb + Category */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#585062] mb-4 sm:mb-6">
            <Link href="/" className="hover:text-[#16131D] transition-colors">Studio</Link>
            <span>/</span>
            <Link href="/#work" className="hover:text-[#16131D] transition-colors">Case Study</Link>
            <span>/</span>
            <span className="font-semibold flex items-center gap-1.5 bg-[#16131D] text-[#c6ff3d] px-2.5 py-0.5 rounded-full text-[10px]">
              <span className="size-1.5 rounded-full bg-[#c6ff3d] animate-pulse" />
              {cs.category}
            </span>
          </div>

          {/* Case Study Title */}
          <h1 className="heading-display font-display text-[clamp(2.2rem,6.5vw,5rem)] font-bold tracking-tight text-[#16131D] leading-[1.02] break-words">
            {cs.client}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 font-display text-base sm:text-xl lg:text-2xl text-[#585062] max-w-3xl font-normal leading-snug">
            {cs.subtitle}
          </p>

          {/* Architectural Specification Bar (Clean editorial metadata - NO repetitive chunky chips) */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#E8E2EE]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 font-mono">
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-[#887E94] block mb-1">Client Profile</span>
                <span className="font-display font-bold text-sm sm:text-base text-[#16131D] block truncate">{cs.client}</span>
                {cs.established && (
                  <span className="text-[10px] text-[#585062] block truncate mt-0.5">{cs.established}</span>
                )}
              </div>

              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-[#887E94] block mb-1">Timeline &amp; Year</span>
                <span className="font-display font-bold text-sm sm:text-base text-[#16131D] block truncate">{cs.timeline || "Production"}</span>
                <span className="text-[10px] text-[#585062] block truncate mt-0.5">Launched {cs.year || "2024"}</span>
              </div>

              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-[#887E94] block mb-1">Engineering Scope</span>
                <span className="font-display font-bold text-sm sm:text-base text-[#16131D] block truncate">Complete Custom Build</span>
                <span className="text-[10px] text-[#585062] block truncate mt-0.5">100% Bespoke Code</span>
              </div>

              <div className="min-w-0 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#887E94] block mb-1">Live Deployment</span>
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono font-semibold text-xs sm:text-sm text-[#16131D] hover:text-[#c6ff3d] transition-colors truncate group"
                  >
                    <span className="truncate">{cs.liveUrl.replace("https://", "")}</span>
                    <ArrowUpRightIcon className="size-3.5 text-[#16131D] group-hover:text-[#c6ff3d] shrink-0 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OFFICIAL REAL PRODUCT SHOWCASE (BROWSER WINDOW MOCKUP)         */}
        {/* ============================================================== */}
        <section className="container-wide mt-10 sm:mt-14">
          <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl border border-purple-200/50 bg-gradient-to-b from-[#261A3B] to-[#1A1128] overflow-hidden shadow-xl sm:shadow-2xl shadow-purple-950/15 ring-1 ring-purple-900/10">
            {/* macOS / Chrome Window Bar */}
            <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-purple-800/40 bg-[#2E2046]/95 backdrop-blur-xl gap-2">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="size-2.5 sm:size-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]" />
                <span className="size-2.5 sm:size-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]" />
                <span className="size-2.5 sm:size-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29]" />
              </div>

              {/* URL Bar */}
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-purple-700/50 bg-[#1F1430] px-3 sm:px-4 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs text-[#c6ff3d] max-w-[200px] xs:max-w-xs sm:max-w-md w-full justify-center min-w-0">
                <svg className="size-3 text-[#c6ff3d] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-white font-medium truncate">{cs.liveUrl}</span>
                <span className="ml-0.5 size-1.5 rounded-full bg-[#c6ff3d] shrink-0" />
              </div>

              {/* Direct Open Button */}
              <a
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-purple-700/40 bg-purple-900/40 px-3 py-1 font-mono text-[11px] font-semibold text-purple-200 hover:text-[#121019] hover:bg-[#c6ff3d] hover:border-[#c6ff3d] transition-all shrink-0"
              >
                <span>Visit Site</span>
                <ArrowUpRightIcon className="size-3" />
              </a>
            </div>

            {/* High-Resolution Uncut Screenshot Viewport */}
            <div className="relative bg-[#1A1128] group overflow-hidden">
              <Image
                src={cs.image}
                alt={`${cs.client} Official Platform Showcase`}
                width={1440}
                height={900}
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="w-full h-auto object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                priority
              />
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* MEASURED BUSINESS IMPACT (METRICS OUTCOMES)                    */}
        {/* ============================================================== */}
        <section className="container-wide mt-16 sm:mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#16131D] mb-5 sm:mb-6">
            <span className="size-2 rounded-full bg-[#c6ff3d] shadow-[0_0_8px_#c6ff3d]" />
            <span>MEASURED BUSINESS IMPACT</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="spotlight-card rounded-xl sm:rounded-2xl border border-[#E8E2EE] bg-white p-4 sm:p-6 lg:p-7 backdrop-blur-xl relative overflow-hidden shadow-sm shadow-purple-950/3"
              >
                <div className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#16131D] tracking-tight">
                  {m.value}
                </div>
                <div className="font-mono text-[10px] sm:text-xs font-bold text-[#16131D] mt-2 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#c6ff3d] shrink-0" />
                  <span className="truncate">{m.label}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-[#585062] mt-1.5 sm:mt-2 leading-relaxed">
                  {m.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 01: THE BUSINESS CHALLENGE (STARTING FROM ZERO)        */}
        {/* ============================================================== */}
        <section className="container-wide mt-16 sm:mt-24">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#16131D] mb-2 sm:mb-3">
              <TargetIcon className="size-3.5 text-[#16131D]" />
              <span className="bg-[#16131D] text-[#c6ff3d] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px]">01 // THE BUSINESS CHALLENGE</span>
            </div>

            <h2 className="heading-lg font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#16131D] tracking-tight leading-tight">
              {cs.businessNeed.title}
            </h2>

            <p className="mt-2 sm:mt-3 font-serif italic text-lg sm:text-2xl text-[#585062]">
              {cs.businessNeed.subtitle}
            </p>
          </div>

          {/* 3 Business Problem Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
            {cs.businessNeed.points.map((p, index) => (
              <div
                key={p.headline}
                className="group relative rounded-2xl sm:rounded-3xl border border-[#E8E2EE] bg-white p-5 sm:p-7 lg:p-8 backdrop-blur-xl hover:border-[#c6ff3d] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-[#16131D] mb-4 sm:mb-5 flex items-center justify-between">
                    <span className="bg-[#16131D] text-[#c6ff3d] px-2.5 py-0.5 rounded-full text-[10px]">
                      CHALLENGE 0{index + 1}
                    </span>
                    <span className="size-2 rounded-full bg-[#c6ff3d] shadow-[0_0_8px_#c6ff3d]" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-[#16131D] leading-snug">
                    {p.headline}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-[#585062] leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-4 border-t border-[#F1EBF7] flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#887E94]">
                  <span>Baseline State</span>
                  <span className="text-[#16131D] font-medium">Pre-Launch Friction</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 02: SO WE BUILD (THE BRAND KINETIC BANNER)            */}
        {/* ============================================================== */}
        <section className="relative mt-16 sm:mt-24 mb-16 sm:mb-24 py-14 sm:py-20 overflow-hidden border-y border-[#E8E2EE] bg-[#FAF8F5]">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#c6ff3d 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[450px] sm:size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-25"
            style={{ background: "radial-gradient(circle, rgba(198,255,61,0.2) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 container-wide text-center flex flex-col items-center">
            <div className="font-mono text-[10px] sm:text-xs font-bold text-[#16131D] uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-4">
              EXECUTION &amp; TRANSFORMATION
            </div>

            <CaseStudyHeadline words={cs.words} hook="Built from the ground up." />

            <p className="mt-6 sm:mt-8 text-xs sm:text-base lg:text-lg text-[#585062] font-mono max-w-2xl px-4 leading-relaxed">
              No generic templates. No legacy baggage. So We Build.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 03: SO WE BUILD — THE GROUND-UP EXECUTION              */}
        {/* ============================================================== */}
        <section className="container-wide">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#16131D] mb-3">
              <span className="size-2 rounded-full bg-[#c6ff3d] shadow-[0_0_8px_#c6ff3d]" />
              <span className="bg-[#16131D] text-[#c6ff3d] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px]">02 // SO WE BUILD</span>
            </div>

            <h2 className="heading-lg font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#16131D] tracking-tight leading-tight">
              {cs.soWeBuild.title}
            </h2>

            <p className="mt-2 sm:mt-3 font-serif italic text-lg sm:text-2xl text-[#585062]">
              {cs.soWeBuild.subtitle}
            </p>
          </div>

          {/* 3 Ground-Up Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
            {cs.soWeBuild.pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="group relative rounded-2xl sm:rounded-3xl border border-[#E8E2EE] bg-white p-5 sm:p-7 lg:p-8 backdrop-blur-2xl hover:border-[#c6ff3d] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Top Bar: Icon + Step Counter */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-[#c6ff3d]/20 border border-[#c6ff3d] flex items-center justify-center text-[#121019] group-hover:scale-110 transition-transform">
                      <CheckCircleIcon className="size-4 sm:size-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#887E94] tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Pillar Title */}
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-[#16131D] leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Punchy Description */}
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-[#585062] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Bottom Key Outcome Pill */}
                {pillar.stat && (
                  <div className="mt-6 pt-4 border-t border-[#F1EBF7] flex items-center justify-between">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#887E94]">
                      Result
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-[#121019] bg-[#c6ff3d] px-2.5 py-0.5 rounded-full shadow-sm">
                      {pillar.stat}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Leadership Testimonial */}
          {cs.testimonial && (
            <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl border border-[#E8E2EE] bg-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-lg shadow-purple-950/4">
              <div className="font-serif italic text-lg sm:text-2xl lg:text-3xl text-[#16131D] leading-relaxed max-w-3xl">
                &ldquo;{cs.testimonial.quote}&rdquo;
              </div>
              <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-[#F1EBF7]">
                <div className="size-10 sm:size-11 rounded-full bg-[#16131D] text-[#c6ff3d] flex items-center justify-center font-display font-bold shrink-0">
                  {cs.client.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-bold text-[#16131D] text-xs sm:text-base">
                    {cs.testimonial.author}
                  </div>
                  <div className="font-mono text-[11px] sm:text-xs text-[#585062]">
                    {cs.testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ============================================================== */}
        {/* NEXT CASE STUDY TRANSITION                                     */}
        {/* ============================================================== */}
        <section className="container-wide mt-16 sm:mt-24">
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#E8E2EE] bg-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-lg shadow-purple-950/4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Text Info */}
              <div className="lg:col-span-7">
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#585062] mb-1.5 sm:mb-2">
                  NEXT CLIENT SHOWCASE //
                </div>
                <h3 className="heading-lg font-display text-2xl sm:text-4xl font-bold text-[#16131D]">
                  {otherCs.client}
                </h3>
                <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#585062] max-w-lg leading-relaxed">
                  {otherCs.subtitle}
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <Link
                    href={`/work/${otherCs.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c6ff3d] px-5 py-3 font-mono text-xs font-bold text-[#121019] shadow-md shadow-[#c6ff3d]/25 hover:bg-[#b4f028] hover:scale-105 transition-all text-center"
                  >
                    <span>Read {otherCs.client} Case Study</span>
                    <ArrowUpRightIcon className="size-4" />
                  </Link>

                  <a
                    href={otherCs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E2EE] bg-white px-5 py-3 font-mono text-xs font-semibold text-[#16131D] hover:bg-black/[0.04] transition-all text-center"
                  >
                    <span>Visit Live Platform</span>
                    <ArrowUpRightIcon className="size-3.5 text-[#585062]" />
                  </a>
                </div>
              </div>

              {/* Preview Thumbnail */}
              <div className="lg:col-span-5">
                <Link
                  href={`/work/${otherCs.slug}`}
                  className="block group rounded-xl sm:rounded-2xl border border-purple-200/60 overflow-hidden bg-[#261A3B] shadow-md transition-transform duration-500 hover:scale-[1.02]"
                >
                  <div className="px-3.5 py-2 border-b border-purple-800/30 bg-[#2E2046] flex items-center justify-between font-mono text-[10px] text-[#DDD6FE]">
                    <span className="truncate pr-2">{otherCs.category}</span>
                    <span className="text-[#c6ff3d] shrink-0 font-bold">View Case Study →</span>
                  </div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1128]">
                    <Image
                      src={otherCs.image}
                      alt={otherCs.client}
                      fill
                      loading="eager"
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* "SO WE BUILD." STUDIO CALL TO ACTION                           */}
        {/* ============================================================== */}
        <section className="container-wide mt-16 sm:mt-24 text-center">
          <div className="rounded-2xl sm:rounded-3xl border border-[#E8E2EE] bg-gradient-to-b from-[#FAF8F5] to-white px-4 py-12 sm:px-10 sm:py-16 shadow-md shadow-purple-950/3">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#585062]">
              BUILT FOR AMBITIOUS BRANDS
            </span>
            <h2 className="heading-lg font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#16131D] mt-2 sm:mt-3 leading-tight">
              Have A Vision To Launch, Scale, Or Automate? <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#16131D]">So We Build<span className="text-[#c6ff3d]">.</span></span>
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#585062] max-w-xl mx-auto leading-relaxed px-2">
              We design and engineer bespoke web applications, flagship digital products, and automated software for ambitious brands worldwide.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c6ff3d] px-7 py-3 sm:px-8 sm:py-3.5 font-mono text-xs font-bold text-[#121019] shadow-lg shadow-[#c6ff3d]/25 hover:bg-[#b4f028] hover:scale-105 transition-all text-center"
              >
                <span>Start a Project Brief</span>
                <ArrowUpRightIcon className="size-4" />
              </Link>
              <Link
                href="/#work"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E2EE] bg-white px-6 py-3 sm:px-7 sm:py-3.5 font-mono text-xs font-semibold text-[#16131D] hover:bg-black/[0.03] transition-all text-center"
              >
                <span>Explore Selected Work</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================== */}
      {/* STUDIO LUXURY FOOTER                                           */}
      {/* ============================================================== */}
      <footer className="border-t border-[#E8E2EE] bg-white py-8 sm:py-12 mt-16 sm:mt-24">
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <div>
            <div className="font-display font-extrabold text-sm sm:text-base text-[#16131D]">
              SOWEBUILD<span className="text-[#c6ff3d]">.</span>IN
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-[#585062] mt-1">
              Technology Development Studio — Mumbai &amp; Global
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs text-[#585062]">
            <Link href="/#work" className="hover:text-[#16131D] transition-colors">Work</Link>
            <Link href="/#services" className="hover:text-[#16131D] transition-colors">Capabilities</Link>
            <Link href="/#contact" className="hover:text-[#16131D] transition-colors">Contact</Link>
            <a href="https://sowebuild.in" target="_blank" rel="noreferrer" className="hover:text-[#16131D] transition-colors">sowebuild.in</a>
          </div>

          <div className="font-mono text-[10px] sm:text-xs text-[#887E94]">
            © {new Date().getFullYear()} SoWeBuild Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
