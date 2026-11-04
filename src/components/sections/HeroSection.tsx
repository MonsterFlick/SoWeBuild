"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "websites that get clients.",
  "smart AI & WhatsApp bots.",
  "mobile web apps.",
  "social media growth.",
  "online stores.",
  "your business growth.",
];

const wordVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: "blur(2px)",
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HeroSection({ ready = true }: { ready?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Deliverables word rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Entrance animation — Instant visibility to ensure site never looks empty on start
  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;

    if (!section || !headline || !subtitle) return;

    // Immediately present all core elements with zero blank delay
    gsap.set(subtitle, { opacity: 1, y: 0 });
    const inners = headline.querySelectorAll(".hero-line-inner");
    gsap.set(inners, { y: "0%", opacity: 1 });
    setIsLoaded(true);

    // Parallax on desktop scroll only (avoid scroll lag on phones)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let parallaxTween: gsap.core.Tween | null = null;
    if (!isTouch) {
      parallaxTween = gsap.to(headline, {
        y: -120,
        scale: 0.94,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    return () => {
      if (parallaxTween) {
        parallaxTween.kill();
        parallaxTween.scrollTrigger?.kill();
      }
    };
  }, [ready]);

  // Mouse-reactive gradient background
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const xTo = gsap.quickTo(bg, "--gx", { duration: 1.5, ease: "power3.out" });
    const yTo = gsap.quickTo(bg, "--gy", { duration: 1.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      xTo(x);
      yTo(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section"
    >
      {/* Interactive gradient background */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(
              ellipse 70% 50% at var(--gx, 50%) var(--gy, 50%),
              rgba(124, 58, 237, 0.055) 0%,
              transparent 65%
            ),
            var(--color-bg)
          `,
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div
        className="w-full max-w-[1600px] mx-auto relative z-[2] flex flex-col items-center sm:items-start text-center sm:text-left"
      >
        {/* Label */}
        <div
          className="label mb-3 sm:mb-4 inline-flex items-center gap-2"
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-accent, #7C3AED)",
              boxShadow: "0 0 8px rgba(124, 58, 237, 0.5)",
              display: "inline-block",
            }}
          />
          Websites • AI Automation • Social Media • Apps
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="w-full text-center sm:text-left" style={{ userSelect: "none" }}>
          {/* Brand Studio Title */}
          <div className="hero-line w-full text-center sm:text-left" style={{ overflow: "visible", display: "block" }}>
            <h1
              className="hero-line-inner heading-display text-center sm:text-left"
              style={{
                display: "block",
                letterSpacing: "-0.04em",
                color: "var(--color-text)",
                lineHeight: 0.98,
                margin: 0,
                padding: 0,
              }}
            >
              SoWeBuild<span style={{ color: "var(--color-accent, #7C3AED)" }}>.</span>
            </h1>
          </div>

          {/* Changing Deliverable Animation (Tight, Natural Line Gap) */}
          <div
            className="hero-line w-full text-center sm:text-left"
            style={{
              overflow: "visible",
              display: "block",
              marginTop: "clamp(0.05rem, 0.4vw, 0.25rem)",
            }}
          >
            <div
              className="hero-line-inner heading-display flex items-baseline justify-center sm:justify-start flex-wrap w-full"
              style={{
                color: "var(--color-accent)",
                lineHeight: 0.98,
                margin: 0,
                padding: 0,
              }}
            >
              <span
                style={{
                  display: "inline-grid",
                  gridTemplateAreas: "'stack'",
                  overflow: "visible",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[wordIndex]}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      gridArea: "stack",
                      whiteSpace: "nowrap",
                      willChange: "transform, opacity, filter",
                      color: "var(--color-accent)",
                      display: "inline-block",
                    }}
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="body-lg text-center sm:text-left mx-auto sm:mx-0 max-w-[580px] text-[#5A5068]"
          style={{
            marginTop: "clamp(0.875rem, 1.8vw, 1.5rem)",
            opacity: 1,
            lineHeight: 1.6,
          }}
        >
          We build custom websites, automated WhatsApp &amp; AI tools, and social media systems that bring in more customers and run your business smoothly. No confusing tech jargon — just clear communication and real results.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
          <a href="#contact" className="btn-primary w-full sm:w-auto text-center justify-center">
            <span>Start a project</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ marginLeft: "0.25rem" }}
            >
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=917756898550&text=Hi%20SoWeBuild%2C%20I%20am%20interested%20in%20building%20a%20project%20for%20my%20business.%20Can%20we%20talk%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 px-5 py-3 font-mono text-xs font-bold text-[#128C7E] transition-all shadow-xs"
          >
            <svg className="size-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.148.566 4.167 1.554 5.918l-1.554 5.666 5.798-1.521c1.706.945 3.664 1.487 5.752 1.487 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>WhatsApp (+91 77568 98550) ↗</span>
          </a>
          <a href="#work" className="btn-outline w-full sm:w-auto text-center justify-center">
            <span>Explore selected work</span>
          </a>
        </div>

        {/* Studio Credential Strip: Balanced 3-column grid across mobile */}
        <div
          className="w-full mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-[var(--color-border)] grid grid-cols-3 gap-2 sm:gap-8 text-center sm:text-left"
        >
          {[
            { val: "100%", lbl: "You Own Everything" },
            { val: "< 24h", lbl: "Fast Human Response" },
            { val: "Direct", lbl: "Talk to Builders" },
          ].map((stat) => (
            <div key={stat.lbl} className="flex flex-col items-center sm:items-start">
              <div
                className="font-display text-base sm:text-xl font-bold text-[var(--color-text)] leading-tight"
              >
                {stat.val}
              </div>
              <div
                className="label text-[8px] sm:text-[10px] text-[var(--color-text-muted)] mt-1 tracking-tight sm:tracking-wider leading-tight"
              >
                {stat.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes wordSwap {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
