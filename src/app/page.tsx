"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "motion/react";

import { DeviceSlab, DeviceFrame, ResponsiveDeviceFrame } from "@/components/DeviceSlab";
import { Dock } from "@/components/Dock";
import { CursorLight, Starfield } from "@/components/Ambient";
import { PrimaryCta, GhostCta, Magnetic } from "@/components/Magnetic";
import { MODE_LABEL, type Mode } from "@/components/screens";
import { Logo } from "@/components/Logo";
import { IntroLoader } from "@/components/IntroLoader";
import { DynamicHeadline } from "@/components/DynamicHeadline";
import { WorkBentoGrid } from "@/components/WorkBentoGrid";
import { ServicesWorkbench } from "@/components/ServicesWorkbench";

/* ------------------------------- primitives -------------------------------- */

function ArrowUpRightIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
      <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
      {children}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



/* ------------------------------ morph section ------------------------------ */

const MORPH_STEPS: Mode[] = ["website", "chatbot", "whatsapp", "dashboard"];

function MorphSection({ setMode }: { setMode: (m: Mode) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    return scrollYProgress.on("change", (v: number) => {
      const i = Math.min(MORPH_STEPS.length - 1, Math.max(0, Math.floor(v * MORPH_STEPS.length)));
      setStep(i);
      setMode(MORPH_STEPS[i] as Mode);
    });
  }, [scrollYProgress, setMode]);

  return (
    <section ref={ref} id="morph" data-section data-mode={MORPH_STEPS[step] as Mode} className="relative h-[220vh]">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center px-5 py-16 sm:px-10 sm:py-0">
        <div className="mx-auto w-full max-w-7xl">
          <div className="lg:max-w-[46vw] lg:pr-6">
            <Eyebrow>One development studio · every capability</Eyebrow>

            {/* Desktop Full Stack of Headlines */}
            <div className="mt-8 max-w-2xl hidden sm:block">
              {MORPH_STEPS.map((m, i) => (
                <motion.p
                  key={m}
                  animate={{
                    opacity: step === i ? 1 : 0.16,
                    x: step === i ? 0 : -10,
                    filter: step === i ? "blur(0px)" : "blur(3px)",
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(1.6rem,4.2vw,3.4rem)] leading-[1.05] font-bold tracking-tight"
                >
                  {MODE_LABEL[m]}
                </motion.p>
              ))}
            </div>

            {/* Mobile Active Headline Only (prevents vertical screen blowout) */}
            <div className="mt-6 sm:hidden min-h-[64px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={MORPH_STEPS[step]}
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(1.4rem,5.5vw,2rem)] font-bold tracking-tight text-white leading-tight"
                >
                  {MODE_LABEL[MORPH_STEPS[step]]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Step Indicators */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3">
              {MORPH_STEPS.map((m, i) => (
                <span
                  key={m}
                  className={`h-0.5 w-8 sm:w-10 rounded-full transition-all duration-500 ${
                    i <= step ? "bg-primary" : "bg-border-strong"
                  }`}
                />
              ))}
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {String(step + 1).padStart(2, "0")} / 0{MORPH_STEPS.length}
              </span>
            </div>

            {/* Mobile Device Screen Preview (Responsive, Zero Overflow) */}
            <div className="mt-8 flex justify-center lg:hidden w-full">
              <ResponsiveDeviceFrame mode={MORPH_STEPS[step] as Mode} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ---------------------------------- page ----------------------------------- */

export default function Home() {
  const [mode, setMode] = useState<Mode>("website");
  const [active, setActive] = useState("home");
  const [introStarted, setIntroStarted] = useState(false);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const map = new Map<string, { el: HTMLElement; ratio: number }>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            map.set(e.target.id, { el: e.target as HTMLElement, ratio: e.intersectionRatio });
          } else {
            map.delete(e.target.id);
          }
        });

        let bestEl: HTMLElement | null = null;
        let maxRatio = -1;
        const mid = window.innerHeight * 0.45;

        map.forEach(({ el, ratio }) => {
          const rect = el.getBoundingClientRect();
          if (rect.top <= mid && rect.bottom >= mid) {
            bestEl = el;
          } else if (!bestEl && ratio > maxRatio) {
            maxRatio = ratio;
            bestEl = el;
          }
        });

        if (bestEl) {
          const target = bestEl as HTMLElement;
          setActive(target.id);
          const m = target.dataset["mode"] as Mode | undefined;
          if (m) setMode(m);
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen">
      <IntroLoader
        onStartReveal={() => setIntroStarted(true)}
        onComplete={() => setIntroStarted(true)}
      />
      <CursorLight />
      <Starfield />
      <DeviceSlab mode={mode} activeSection={active} />
      <Dock active={active} visible={introStarted} />

      {/* TOP NAV BAR */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-3.5 sm:px-10 sm:py-5 bg-background/60 backdrop-blur-xl border-b border-border/40">
        <motion.a
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: introStarted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
        </motion.a>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/brand-guidelines"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] tracking-wider uppercase text-muted-foreground hover:text-foreground hover:border-white/25 transition-colors"
          >
            Brand Assets
          </Link>
          <a
            href="#inquiry"
            className="sm:hidden inline-flex items-center gap-1 rounded-full bg-[image:var(--gradient-violet)] px-3 py-1 font-mono text-[10px] font-bold text-white shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
          >
            <span>Start Build</span>
            <ArrowUpRightIcon className="size-3" />
          </a>
          <Magnetic strength={0.2} className="hidden sm:block">
            <a
              href="#contact"
              className="glass rounded-full px-5 py-2 font-mono text-[10px] tracking-[0.25em] uppercase hover:text-primary-glow transition-colors"
            >
              Start a build
            </a>
          </Magnetic>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        data-section
        data-mode="website"
        className="relative flex min-h-[85vh] items-center px-5 pt-24 pb-12 sm:px-10 sm:pt-20 sm:pb-10 overflow-hidden"
      >
        <div className="grid-field pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="lg:max-w-[46vw]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: introStarted ? 1 : 0 }}
              transition={{ delay: 0.2 }}
            >
              <Eyebrow>Development Server & Full-Stack Engineering</Eyebrow>
            </motion.div>
            <div className="mt-7">
              <DynamicHeadline active={introStarted} />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: introStarted ? 1 : 0, y: introStarted ? 0 : 16 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              <strong className="text-foreground font-semibold">SoWeBuild</strong> is a technology studio delivering high-speed websites, web apps, mobile applications, AI chatbots, and automated backend infrastructure on dedicated development servers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: introStarted ? 1 : 0, y: introStarted ? 0 : 16 }}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3"
            >
              <PrimaryCta href="#contact">Start a build</PrimaryCta>
              <GhostCta href="#technology">Explore services</GhostCta>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: introStarted ? 1 : 0, y: introStarted ? 0 : 16 }}
              transition={{ delay: 0.85, duration: 0.9 }}
              className="mt-10 sm:mt-14 flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-10"
            >
              {[
                ["50+", "Products Shipped"],
                ["99.9%", "Uptime Guaranteed"],
                ["Sub-Sec", "Response Latency"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-xl sm:text-2xl font-bold tracking-tight">{n}</div>
                  <div className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">
                    {l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mt-12 flex justify-center lg:hidden w-full">
            <ResponsiveDeviceFrame mode={mode} />
          </div>
        </div>
      </section>

      {/* MORPH SECTION */}
      <MorphSection setMode={setMode} />

      {/* INQUIRY SECTION */}
      <section id="inquiry" data-section data-mode="form" className="relative px-4 py-12 sm:px-10 sm:py-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.02] font-display text-[14vw] font-bold leading-none select-none text-center">
          START<br />BUILDING
        </div>
        <div className="relative mx-auto w-full max-w-4xl flex flex-col items-center text-center z-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Start Your Project
          </h2>
          <p className="mt-1 text-xs sm:text-[11px] text-muted-foreground">
            Fill out your details below to receive an instant quote & dev server setup
          </p>
          <div className="mt-6 flex justify-center w-full max-w-full">
            <ResponsiveDeviceFrame mode="form" />
          </div>
        </div>
      </section>

      {/* SERVICES & CAPABILITIES WORKBENCH */}
      <ServicesWorkbench onSelectService={(m) => setMode(m)} />

      {/* WORK SECTION */}
      <WorkBentoGrid />

      {/* ABOUT SECTION */}
      <section id="about" data-section data-mode="chatbot" className="relative px-5 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="lg:max-w-[46vw] lg:pr-6">
            <Reveal>
              <Eyebrow>About SoWeBuild</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1] font-bold">
                Full-Stack Execution. Zero Handoffs.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                We focus strictly on engineering excellence: fast web platforms, autonomous AI bots, and custom cloud architecture. We provide dedicated development server access so you test live code in real-time.
              </p>
            </Reveal>
            <div className="mt-10 sm:mt-12 grid gap-3 sm:grid-cols-2">
              {[
                ["Dedicated Dev Server", "Every build runs on active development servers for transparent testing."],
                ["Instant Prototype", "Live preview environments from week one so you see real working software."],
                ["AI Built for ROI", "Autonomous AI agents & WhatsApp bots built to solve ops bottlenecks."],
                ["Clean Ownership", "Full access to codebase, API specs, schemas, and deployment pipelines."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={0.05 * i}>
                  <div className="glass group h-full rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1">
                    <div className="size-1.5 rounded-full bg-primary" />
                    <div className="mt-4 font-display text-base font-semibold tracking-tight">{t}</div>
                    <div className="mt-2 text-xs leading-relaxed text-muted-foreground">{d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        data-section
        data-mode="whatsapp"
        className="relative px-5 pt-20 pb-36 sm:px-10 sm:pt-24 sm:pb-44"
      >
        <div className="halo pointer-events-none absolute bottom-10 left-1/2 size-[520px] -translate-x-1/2 opacity-60" />
        <div className="relative mx-auto w-full max-w-7xl">
          <Reveal>
            <Eyebrow>Contact Us</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,8vw,5.5rem)] leading-[0.92] font-bold">
              LET&apos;S BUILD
              <br />
              <span className="text-gradient">YOUR NEXT PRODUCT.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <PrimaryCta href="mailto:sowebuild.in@gmail.com">
                Email Us: sowebuild.in@gmail.com
              </PrimaryCta>
              <GhostCta
                href="https://instagram.com/sowebuild.in"
                onClick={() => window.open("https://instagram.com/sowebuild.in", "_blank")}
              >
                <span className="inline-flex items-center gap-1">
                  Instagram: @sowebuild.in <ArrowUpRightIcon className="size-3 text-current stroke-[2.5]" />
                </span>
              </GhostCta>
            </div>
          </Reveal>

          <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            <div className="flex items-center gap-2">
              <Logo size="small" />
              <span className="ml-2">© {new Date().getFullYear()} SoWeBuild</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/brand-guidelines" className="text-primary-glow hover:underline underline-offset-4 transition-colors">
                Brand Guidelines &amp; Assets
              </Link>
              <span>·</span>
              <span className="text-[9px] sm:text-[10px]">sowebuild.in · Dev Studio</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
