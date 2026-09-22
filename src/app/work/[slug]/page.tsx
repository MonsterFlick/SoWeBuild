import { notFound } from "next/navigation";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/workData";
import { Logo } from "@/components/Logo";
import { CaseStudyHeadline } from "@/components/CaseStudyHeadline";

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
    <main className="relative min-h-screen bg-background text-foreground overflow-x-clip selection:bg-primary/40 selection:text-foreground">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-0 right-1/4 size-[650px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-[35%] left-10 size-[500px] rounded-full bg-accent/10 blur-[130px]" />

      {/* TOP HEADER NAV */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-10 bg-background/70 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-muted-foreground hover:text-white hover:border-white/20 transition-all"
          >
            <ArrowLeftIcon className="size-3.5" />
            <span>All Projects</span>
          </Link>
          <Logo size="small" />
        </div>

        <a
          href={cs.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[image:var(--gradient-violet)] px-4 py-1.5 font-mono text-xs font-bold text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
        >
          <span>Visit Live Platform</span>
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-5 pt-32 pb-16 sm:px-10 sm:pt-40 sm:pb-24 border-b border-white/10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-emerald-400 uppercase font-bold">
            <span className="h-px w-8 bg-gradient-to-r from-emerald-400 to-transparent" />
            {cs.category}
          </div>

          <h1 className="mt-5 font-display text-[clamp(2.4rem,6.5vw,4.8rem)] leading-[0.95] font-bold tracking-tight text-white">
            {cs.client}
          </h1>

          <p className="mt-4 font-display text-lg sm:text-2xl text-slate-200 font-semibold max-w-3xl leading-snug">
            {cs.subtitle}
          </p>

          {cs.established && (
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              {cs.established}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-5 py-2.5 font-mono text-xs font-bold text-white hover:bg-white/20 transition-all"
            >
              <span>{cs.liveUrl.replace("https://", "")}</span>
              <ArrowUpRightIcon className="size-4" />
            </a>

            <div className="flex flex-wrap gap-2 font-mono text-[10px]">
              {cs.solution.techStack.map((t) => (
                <span key={t} className="rounded-md bg-black/60 border border-white/10 px-3 py-1 text-slate-300 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE CHALLENGE ("WHAT WAS THE PROBLEM?") */}
      <section className="relative px-5 py-16 sm:px-10 sm:py-24 border-b border-white/10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest mb-3">
            01 // THE CHALLENGE
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {cs.problem.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
            {cs.problem.subtitle}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {cs.problem.points.map((p, index) => (
              <div
                key={p.headline}
                className="relative rounded-2xl border border-red-500/20 bg-red-950/10 p-6 backdrop-blur-md"
              >
                <div className="font-mono text-xs font-bold text-red-400 mb-3">
                  PROBLEM // 0{index + 1}
                </div>
                <h3 className="font-display text-lg font-bold text-white leading-snug">
                  {p.headline}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: ANIMATED TRANSITION BANNER ("SO WE BUILD.") */}
      <section className="relative px-5 py-20 sm:px-10 sm:py-32 overflow-hidden bg-gradient-to-r from-purple-950/60 via-black to-primary/20 border-b border-white/10">
        <div className="grid-field absolute inset-0 opacity-20 pointer-events-none" />
        <div className="halo absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-5xl text-center flex flex-col items-center">
          <div className="font-mono text-xs font-bold text-primary-glow uppercase tracking-[0.35em] mb-4">
            TRANSFORMATION &amp; EXECUTION
          </div>

          <CaseStudyHeadline words={cs.words} />

          <p className="mt-6 text-sm sm:text-lg text-slate-300 font-mono max-w-xl leading-relaxed">
            {cs.animatedBanner.tagline}
          </p>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION & ARCHITECTURE */}
      <section className="relative px-5 py-16 sm:px-10 sm:py-24 border-b border-white/10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="font-mono text-xs font-bold text-primary-glow uppercase tracking-widest mb-3">
            02 // THE ARCHITECTURE
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {cs.solution.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300 font-medium max-w-2xl">
            {cs.solution.subtitle}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {cs.solution.overview}
          </p>

          {/* Deliverables Checklist Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {cs.solution.deliverables.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl"
              >
                <div className="size-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <CheckCircleIcon className="size-4" />
                </div>
                <h3 className="font-display text-base font-bold text-white">
                  {d.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: RESULTS & IMPACT METRICS */}
      <section className="relative px-5 py-16 sm:px-10 sm:py-24 border-b border-white/10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
            03 // RESULTS &amp; IMPACT
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Quantifiable Proof &amp; Performance
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center backdrop-blur-xl"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-emerald-400">
                  {m.value}
                </div>
                <div className="font-mono text-xs font-bold text-white mt-1 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-[11px] text-muted-foreground mt-2">
                  {m.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT CASE STUDY / FOOTER */}
      <section className="relative px-5 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-white/15 bg-white/[0.02] p-8 backdrop-blur-xl">
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase">NEXT CASE STUDY</div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              {otherCs.client}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-md">
              {otherCs.subtitle}
            </p>
          </div>

          <Link
            href={`/work/${otherCs.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-5 py-3 font-mono text-xs font-bold text-white hover:bg-white/20 transition-all shrink-0"
          >
            <span>Read {otherCs.client} Case Study</span>
            <ArrowUpRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
