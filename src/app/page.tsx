"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";

import { DeviceSlab, DeviceFrame } from "@/components/DeviceSlab";
import { Dock } from "@/components/Dock";
import { CursorLight, Starfield } from "@/components/Ambient";
import { PrimaryCta, GhostCta, Magnetic } from "@/components/Magnetic";
import { MODE_LABEL, type Mode } from "@/components/screens";
import { Logo } from "@/components/Logo";
import { IntroLoader } from "@/components/IntroLoader";
import { DynamicHeadline } from "@/components/DynamicHeadline";

/* ------------------------------- primitives -------------------------------- */

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

/* --------------------------------- services -------------------------------- */

const TECH_SERVICES: { name: string; mode: Mode; note: string }[] = [
  { name: "Websites", mode: "website", note: "Sub-second, cinematic web experiences" },
  { name: "Web Apps", mode: "dashboard", note: "Realtime, scalable SaaS platforms" },
  { name: "Mobile Apps", mode: "chatbot", note: "Native-feel cross-platform apps" },
  { name: "AI Chatbots", mode: "chatbot", note: "Grounded RAG agents on custom data" },
  { name: "WhatsApp AI Bots", mode: "whatsapp", note: "Automated booking & customer care" },
  { name: "AI Automation", mode: "dashboard", note: "Workflows & ops that run themselves" },
  { name: "Custom Software", mode: "dashboard", note: "Tailored backend systems & infra" },
  { name: "API & AI Integrations", mode: "website", note: "Seamless third-party API wiring" },
];

function ServiceRow({
  index,
  name,
  note,
  onActivate,
}: {
  index: number;
  name: string;
  note: string;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const handleActivateRef = useRef(onActivate);
  handleActivateRef.current = onActivate;

  // Track when this specific row enters the middle 20% of the viewport vertically
  const inCenter = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inCenter) {
      handleActivateRef.current();
    }
  }, [inCenter]);

  return (
    <motion.button
      ref={ref}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full border-t border-border py-5 text-left last:border-b"
    >
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary via-primary-glow to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      <span className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:linear-gradient(90deg,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_60%)]" />
      <span className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
          {name}
        </span>
        <span className="ml-auto hidden text-xs text-muted-foreground transition-colors group-hover:text-foreground/80 md:block">
          {note}
        </span>
        <span className="ml-3 text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-2">
          ↗
        </span>
      </span>
    </motion.button>
  );
}

/* ------------------------------ morph section ------------------------------ */

const MORPH_STEPS: Mode[] = ["website", "chatbot", "whatsapp", "dashboard"];

function MorphSection({ setMode }: { setMode: (m: Mode) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const i = Math.min(MORPH_STEPS.length - 1, Math.max(0, Math.floor(v * MORPH_STEPS.length)));
      setStep(i);
      setMode(MORPH_STEPS[i] as Mode);
    });
  }, [scrollYProgress, setMode]);

  return (
    <section ref={ref} id="morph" data-section data-mode={MORPH_STEPS[step] as Mode} className="relative h-[360vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center pt-24 pb-12 px-6 sm:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="lg:max-w-[46vw] lg:pr-6">
            <Eyebrow>One development studio · every capability</Eyebrow>
            <div className="mt-8 max-w-2xl">
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
            <div className="mt-8 flex items-center gap-3">
              {MORPH_STEPS.map((m, i) => (
                <span
                  key={m}
                  className={`h-0.5 w-10 rounded-full transition-all duration-500 ${
                    i <= step ? "bg-primary" : "bg-border-strong"
                  }`}
                />
              ))}
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {String(step + 1).padStart(2, "0")} / 0{MORPH_STEPS.length}
              </span>
            </div>
            <div className="mt-10 flex justify-center lg:hidden">
              <DeviceFrame mode={MORPH_STEPS[step] as Mode} className="scale-[0.8] origin-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- work rail -------------------------------- */

const WORK = [
  {
    name: "FERTISURE.IN",
    kind: "Healthcare & Fertility Platform",
    tint: "from-primary/40 to-accent/20",
    link: "https://fertisure.in",
  },
  {
    name: "ALPHATECH-NUTRITION.IN",
    kind: "E-Commerce & Nutrition Platform",
    tint: "from-accent/40 to-cyan/20",
    link: "https://alphatech-nutrition.in",
  },
  {
    name: "INTELLIGENT AI AGENTS",
    kind: "Custom RAG & WhatsApp Bots",
    tint: "from-primary-glow/40 to-primary/10",
    link: "#contact",
  },
  {
    name: "BACKEND MICROSERVICES",
    kind: "High-Throughput APIs & Cloud Ops",
    tint: "from-cyan/30 to-primary/25",
    link: "#contact",
  },
];

function WorkRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], ["2%", "-60%"]);
  const x = useSpring(raw, { stiffness: 70, damping: 26 });

  return (
    <section ref={ref} id="work" data-section data-mode="dashboard" className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <Eyebrow>Selected work & deployments</Eyebrow>
        </div>
        <motion.div style={{ x }} className="mt-10 flex gap-6 pl-6 sm:pl-10">
          {WORK.map((w, i) => (
            <a
              key={w.name}
              href={w.link}
              target={w.link.startsWith("http") ? "_blank" : "_self"}
              rel="noreferrer"
              className="glass group relative h-[46vh] w-[80vw] shrink-0 overflow-hidden rounded-3xl sm:w-[50vw] lg:w-[36vw] block"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${w.tint} opacity-80 transition-opacity duration-700 group-hover:opacity-100`}
              />
              <div className="grid-field absolute inset-0 opacity-40" />
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-foreground/60">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-primary-glow group-hover:translate-x-1 transition-transform">
                    VISIT ↗
                  </span>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{w.name}</div>
                  <div className="mt-1.5 text-xs text-foreground/70 font-medium">{w.kind}</div>
                </div>
              </div>
              <div className="animate-sweep absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-foreground/8 to-transparent opacity-0 group-hover:opacity-100" />
            </a>
          ))}
        </motion.div>
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
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 bg-background/40 backdrop-blur-md border-b border-border/40">
        <motion.a
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: introStarted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
        </motion.a>
        <Magnetic strength={0.2} className="hidden sm:block">
          <a
            href="#contact"
            className="glass rounded-full px-5 py-2 font-mono text-[10px] tracking-[0.25em] uppercase hover:text-primary-glow transition-colors"
          >
            Start a build
          </a>
        </Magnetic>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        data-section
        data-mode="website"
        className="relative flex min-h-screen flex-col justify-between px-6 pt-28 pb-16 sm:px-10"
      >
        <div className="grid-field pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto my-auto w-full max-w-7xl">
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
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <PrimaryCta href="#contact">Start a build</PrimaryCta>
              <GhostCta href="#technology">Explore services</GhostCta>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: introStarted ? 1 : 0, y: introStarted ? 0 : 16 }}
              transition={{ delay: 0.85, duration: 0.9 }}
              className="mt-14 flex flex-wrap gap-x-10 gap-y-4"
            >
              {[
                ["50+", "Products Shipped"],
                ["99.9%", "Uptime Guaranteed"],
                ["Sub-Sec", "Response Latency"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-bold tracking-tight">{n}</div>
                  <div className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">
                    {l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mt-16 flex justify-center lg:hidden">
            <DeviceFrame mode={mode} className="scale-[0.78] origin-top" />
          </div>
        </div>

        {/* Hero Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introStarted ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative z-10 mx-auto mt-8 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase"
        >
          <span className="size-1.5 rounded-full bg-primary animate-ping" />
          <span>Scroll to explore capabilities</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="ml-1 text-primary font-bold"
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* TICKER MARQUEE */}
      <div className="relative overflow-hidden border-y border-border py-4 bg-surface/30 flex">
        <div className="animate-marquee flex w-max font-mono text-[10px] tracking-[0.3em] whitespace-nowrap text-muted-foreground uppercase">
          {Array.from({ length: 4 }).map((_, r) => (
            <span key={r} className="flex items-center">
              {[
                "Websites",
                "AI Chatbots",
                "Web Apps",
                "WhatsApp Automation",
                "Mobile Apps",
                "Custom Backend Software",
                "API Integrations",
                "Dev Servers",
              ].map((t) => (
                <span key={t} className="flex items-center">
                  <span className="mx-8">{t}</span>
                  <span className="size-1 rounded-full bg-primary" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* MORPH SECTION */}
      <MorphSection setMode={setMode} />

      {/* INQUIRY SECTION (Centered Device Slab Form) */}
      <section id="inquiry" data-section data-mode="form" className="relative h-screen">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center pt-10 lg:justify-start lg:pt-12 px-6 overflow-hidden">
          {/* Desktop Heading Context */}
          <div className="relative z-10 text-center mb-3 hidden lg:block pointer-events-none">
            <Eyebrow>Direct Studio Inquiry</Eyebrow>
            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Start Your Project
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Fill out your details below to receive an instant quote & dev server setup
            </p>
          </div>
          {/* Subtle Background Typography */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.025] font-display text-[14vw] font-bold leading-none select-none text-center">
            START<br />BUILDING
          </div>
          {/* Mobile centered device frame */}
          <div className="relative z-10 flex justify-center lg:hidden">
            <DeviceFrame mode="form" className="scale-[0.82] sm:scale-100 origin-center" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="technology"
        data-section
        data-mode="dashboard"
        className="relative px-6 pt-12 pb-32 sm:px-10 sm:pt-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="lg:max-w-[46vw] lg:pr-6">
            <Reveal>
              <Eyebrow>Engineering Services</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.9] font-bold">
                WHAT WE BUILD
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Interfaces, AI agents and backend systems engineered like modern products — built fast, tested rigorously, and hosted on isolated development environments.
              </p>
            </Reveal>
            <div className="mt-12">
              {TECH_SERVICES.map((s, i) => (
                <ServiceRow
                  key={s.name}
                  index={i}
                  name={s.name}
                  note={s.note}
                  onActivate={() => setMode(s.mode)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORK SECTION */}
      <WorkRail />

      {/* ABOUT SECTION */}
      <section id="about" data-section data-mode="chatbot" className="relative px-6 py-32 sm:px-10">
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
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
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
        className="relative px-6 pt-24 pb-44 sm:px-10"
      >
        <div className="halo pointer-events-none absolute bottom-10 left-1/2 size-[520px] -translate-x-1/2 opacity-60" />
        <div className="relative mx-auto w-full max-w-7xl">
          <Reveal>
            <Eyebrow>Contact Us</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.88] font-bold">
              LET'S BUILD
              <br />
              <span className="text-gradient">YOUR NEXT PRODUCT.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <PrimaryCta href="mailto:sowebuild.in@gmail.com">
                Email Us: sowebuild.in@gmail.com
              </PrimaryCta>
              <GhostCta
                href="https://instagram.com/sowebuild.in"
                onClick={() => window.open("https://instagram.com/sowebuild.in", "_blank")}
              >
                Instagram: @sowebuild.in ↗
              </GhostCta>
            </div>
          </Reveal>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            <div className="flex items-center gap-2">
              <Logo size="small" />
              <span className="ml-2">© {new Date().getFullYear()} SoWeBuild</span>
            </div>
            <span>sowebuild.in · Development · Software · AI</span>
          </div>
        </div>
      </section>
    </main>
  );
}
