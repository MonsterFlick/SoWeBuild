"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "../SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

function MonitorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CpuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2M9 2v2M20 15h2M20 9h2M9 20v2M15 20v2M2 9h2M2 15h2" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6M15.5 7.5l3 3M18.5 4.5l3 3" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}


interface Differentiator {
  title: string;
  description: string;
  icon: ReactNode;
  span: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "Dedicated Dev Servers",
    description:
      "Live preview URL on day one. Test real running software on your mobile device, not static Figma mockups.",
    icon: <MonitorIcon />,
    span: "md:col-span-3",
  },
  {
    title: "Instant Prototypes",
    description:
      "Working code from week one. Continuous iterations delivered via weekly preview builds.",
    icon: <ZapIcon />,
    span: "md:col-span-3",
  },
  {
    title: "AI Built for ROI",
    description:
      "Autonomous AI agents and automation flows designed for actual operational margins.",
    icon: <CpuIcon />,
    span: "md:col-span-2",
  },
  {
    title: "Clean Ownership",
    description:
      "100% IP ownership. Clean Git repository, full documentation, zero vendor lock-in.",
    icon: <KeyIcon />,
    span: "md:col-span-2",
  },
  {
    title: "Direct Engineering",
    description:
      "Direct communication with the engineers writing your code. Zero account-manager telephone.",
    icon: <TargetIcon />,
    span: "md:col-span-2",
  },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) {
      gsap.set([header, grid.children], { opacity: 1, y: 0 });
      return;
    }

    // Smooth header reveal
    gsap.fromTo(
      header,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Natural staggered card reveal (no weird sticky overlap or scaling)
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="section-padding"
      style={{
        background: "var(--color-surface)",
        position: "relative",
      }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "720px",
            marginBottom: "3.5rem",
            opacity: 0,
          }}
        >
          <div className="label" style={{ marginBottom: "1.25rem" }}>
            Why SoWeBuild
          </div>
          <h2 className="heading-xl" style={{ marginBottom: "1.25rem" }}>
            We don&apos;t just{" "}
            <span className="serif-accent">build.</span>
            <br />
            We ship ownership.
          </h2>
          <p
            className="body-lg"
            style={{
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              maxWidth: "520px",
            }}
          >
            Production codebases, continuous deployment pipelines, and zero vendor lock-in. Built to last.
          </p>
        </div>

        {/* Bento Grid (Clean, responsive, natural scroll) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title} className={`${item.span} opacity-0`}>
              <SpotlightCard className="h-full">
                <div
                  style={{
                    padding: "2.25rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    minHeight: "190px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.35rem",
                        lineHeight: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "var(--radius-md)",
                        background: "#F5EDFA", color: "#7C3AED",
                        border: "1px solid #E8DFF2",
                      }}
                    >
                      {item.icon}
                    </span>
                    <h3 className="heading-sm" style={{ margin: 0 }}>
                      {item.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
