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
import { InquirySection } from "@/components/InquirySection";

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Real-time 60FPS scroll tracking
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (typeof window === "undefined" || window.innerWidth < 1024) return;
      const i = Math.min(
        MORPH_STEPS.length - 1,
        Math.max(0, Math.floor(latest * MORPH_STEPS.length))
      );
      setStep(i);
      setMode(MORPH_STEPS[i] as Mode);
    });
  }, [scrollYProgress, setMode]);

  // On mobile, auto-cycle through steps if user hasn't tapped
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    const timer = setInterval(() => {
      setStep((prev) => {
        const next = (prev + 1) % MORPH_STEPS.length;
        setMode(MORPH_STEPS[next] as Mode);
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [setMode]);

  const handleManualStep = (i: number) => {
    setStep(i);
    setMode(MORPH_STEPS[i] as Mode);
  };

  return (
    <section
      ref={ref}
      id="morph"
      data-section
      data-mode={MORPH_STEPS[step] as Mode}
      className="relative lg:h-[180vh] h-auto"
    >
      <div className="lg:sticky lg:top-0 flex min-h-auto lg:min-h-screen flex-col justify-center px-5 py-12 sm:px-10 lg:py-0">
        <div className="mx-auto w-full max-w-7xl">
          <div className="lg:max-w-[46vw] lg:pr-6">
            <Eyebrow>One development studio · every capability</Eyebrow>

            {/* Desktop Full Stack of Headlines */}
            <div className="mt-8 max-w-2xl hidden sm:block">
              {MORPH_STEPS.map((m, i) => (
                <motion.p
                  key={m}
                  animate={{
                    opacity: step === i ? 1 : 0.15,
                    x: step === i ? 0 : -6,
                    filter: step === i ? "blur(0px)" : "blur(2px)",
                  }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(1.6rem,4.2vw,3.4rem)] leading-[1.08] font-bold tracking-tight cursor-pointer"
                  onClick={() => handleManualStep(i)}
                >
                  {MODE_LABEL[m]}
                </motion.p>
              ))}
            </div>

            {/* Mobile Active Headline Only */}
            <div className="mt-6 sm:hidden min-h-[58px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={MORPH_STEPS[step]}
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(1.35rem,5.2vw,1.9rem)] font-bold tracking-tight text-white leading-tight"
                >
                  {MODE_LABEL[MORPH_STEPS[step]]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Step Indicators / Interactive Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
              {MORPH_STEPS.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleManualStep(i)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] transition-all cursor-pointer ${
                    i === step
                      ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 scale-105"
                      : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10"
                  }`}
                >
                  <span className="opacity-70">0{i + 1}</span>
                  <span className="capitalize">{m}</span>
                </button>
              ))}
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground ml-1">
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

  // Optimized IntersectionObserver with ZERO synchronous getBoundingClientRect layout trashing
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));

    const io = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }

        if (bestEntry && bestEntry.intersectionRatio > 0.15) {
          const target = bestEntry.target as HTMLElement;
          setActive((prev) => (prev !== target.id ? target.id : prev));
          const m = target.dataset["mode"] as Mode | undefined;
          if (m) {
            setMode((prev) => (prev !== m ? m : prev));
          }
        }
      },
      { threshold: [0.2, 0.5, 0.8] }
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
        className="relative flex min-h-[85vh] items-center px-5 pt-32 pb-16 sm:px-10 sm:pt-36 sm:pb-24 lg:pt-36 overflow-hidden"
      >
        <div className="grid-field pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="lg:max-w-[46vw]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: introStarted ? 1 : 0 }}
              transition={{ delay: 0.2 }}
            >
              <Eyebrow>Development Server &amp; Full-Stack Engineering</Eyebrow>
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
              <GhostCta href="#work">Explore work</GhostCta>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MORPH SECTION */}
      <MorphSection setMode={setMode} />

      {/* INQUIRY SECTION */}
      <InquirySection />

      {/* WORK SECTION */}
      <WorkBentoGrid />

      {/* ABOUT SECTION */}
      <section id="about" data-section data-mode="chatbot" className="relative px-5 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Column: Mission & Philosophy */}
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>About SoWeBuild</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1] font-bold">
                  Full-Stack Execution. Zero Handoffs.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  We focus strictly on engineering excellence: fast web platforms, autonomous AI bots, and custom cloud architecture with active development server testing.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-6 flex items-center gap-4 text-xs font-mono text-muted-foreground border-t border-border pt-5">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    <span className="text-foreground font-medium">Dedicated Dev Servers</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary-glow" />
                    <span className="text-foreground font-medium">Direct Engineering Comms</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: 4 Architecture Feature Cards */}
            <div className="lg:col-span-7 grid gap-3.5 sm:grid-cols-2">
              {[
                ["Dedicated Dev Server", "Every build runs on active development servers for transparent testing."],
                ["Instant Prototype", "Live preview environments from week one so you see real working software."],
                ["AI Built for ROI", "Autonomous AI agents & WhatsApp bots built to solve ops bottlenecks."],
                ["Clean Ownership", "Full access to codebase, API specs, schemas, and deployment pipelines."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={0.05 * i}>
                  <div className="glass group h-full rounded-xl p-4 sm:p-5 transition-transform duration-300 hover:-translate-y-1">
                    <div className="size-2 rounded-full bg-primary" />
                    <div className="mt-3 font-display text-base font-semibold tracking-tight text-white">{t}</div>
                    <div className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</div>
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
        className="relative px-5 pt-16 pb-28 sm:px-10 sm:pt-20 sm:pb-32"
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
