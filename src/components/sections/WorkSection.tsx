"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 1024;
    const cards = section.querySelectorAll(".work-card");

    if (isReducedMotion || isMobile) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    const tweens: gsap.core.Tween[] = [];
    cards.forEach((card) => {
      const tw = gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
      tweens.push(tw);
    });

    return () => {
      tweens.forEach((tw) => {
        tw.kill();
        tw.scrollTrigger?.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        background: "var(--color-bg)",
        position: "relative",
        paddingTop: "clamp(1.25rem, 3vw, 3rem)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <div className="label mb-2">
              Selected Work
            </div>
            <h2 className="heading-xl">
              Real builds.{" "}
              <span className="serif-accent">Measured</span> results.
            </h2>
          </div>
        </div>

        {/* 2-Column Responsive Grid: Both Cards Fit Beautifully On Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* ============================================================== */}
          {/* PROJECT 1: FERTISURE */}
          {/* ============================================================== */}
          <div
            className="work-card"
            style={{
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              boxShadow: "0 10px 30px -10px rgba(88, 28, 135, 0.06)",
              overflow: "hidden",
              transition: "border-color 0.3s ease, transform 0.3s ease",
            }}
          >
            {/* Top Bar: Name of Site + 2 Buttons */}
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] text-left">
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "#FAF8F5",
                    background: "#16131D",
                    padding: "0.2rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "inline-block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Medical Equipment Platform
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-text)",
                  }}
                >
                  FertiSure
                </h3>
              </div>

              {/* The 2 Buttons: Balanced on Mobile */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                <a
                  href="https://fertisure.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full sm:w-auto text-center justify-center text-xs py-2 px-3"
                >
                  <span>Visit Live ↗</span>
                </a>
                <Link
                  href="/work/fertisure"
                  className="btn-outline w-full sm:w-auto text-center justify-center text-xs py-2 px-3"
                >
                  <span>Case Study</span>
                </Link>
              </div>
            </div>

            {/* Snap of Website in Sleek Browser Frame */}
            <div
              style={{
                background: "linear-gradient(180deg, #261A3B 0%, #1A1128 100%)",
                padding: "clamp(0.5rem, 1.5vw, 1.25rem)",
              }}
            >
              {/* Window Chrome Header */}
              <div
                style={{
                  background: "rgba(45, 30, 68, 0.95)",
                  border: "1px solid rgba(167, 139, 250, 0.2)",
                  borderBottom: "none",
                  borderRadius: "var(--radius-md) var(--radius-md) 0 0",
                  padding: "0.6rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(221, 214, 254, 0.4)" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(221, 214, 254, 0.4)" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(221, 214, 254, 0.4)" }} />
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "#A78BFA",
                    background: "rgba(167, 139, 250, 0.12)",
                    padding: "0.15rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(167, 139, 250, 0.25)",
                  }}
                >
                  https://fertisure.in
                </div>

                <div style={{ width: "25px" }} />
              </div>

              {/* Complete Uncut Screenshot */}
              <div
                style={{
                  border: "1px solid rgba(167, 139, 250, 0.15)",
                  borderRadius: "0 0 var(--radius-md) var(--radius-md)",
                  overflow: "hidden",
                  background: "#1E1330",
                }}
              >
                <Image
                  src="/work-fertisure-official.webp"
                  alt="FertiSure Website Snap"
                  width={1440}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PROJECT 2: ALPHA TECH NUTRITION */}
          {/* ============================================================== */}
          <div
            className="work-card"
            style={{
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              boxShadow: "0 10px 30px -10px rgba(88, 28, 135, 0.06)",
              overflow: "hidden",
              transition: "border-color 0.3s ease, transform 0.3s ease",
            }}
          >
            {/* Top Bar: Name of Site + 2 Buttons */}
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] text-left">
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "#FAF8F5",
                    background: "#16131D",
                    padding: "0.2rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "inline-block",
                    marginBottom: "0.4rem",
                  }}
                >
                  D2C Storefront & Verification
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-text)",
                  }}
                >
                  Alpha Tech Nutrition
                </h3>
              </div>

              {/* The 2 Buttons: Balanced on Mobile */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                <a
                  href="https://alphatech-nutrition.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full sm:w-auto text-center justify-center text-xs py-2 px-3"
                >
                  <span>Visit Live ↗</span>
                </a>
                <Link
                  href="/work/alphatech-nutrition"
                  className="btn-outline w-full sm:w-auto text-center justify-center text-xs py-2 px-3"
                >
                  <span>Case Study</span>
                </Link>
              </div>
            </div>

            {/* Snap of Website in Sleek Browser Frame */}
            <div
              style={{
                background: "linear-gradient(180deg, #2A1A40 0%, #1B102C 100%)",
                padding: "clamp(0.5rem, 1.5vw, 1.25rem)",
              }}
            >
              {/* Window Chrome Header */}
              <div
                style={{
                  background: "rgba(45, 30, 68, 0.95)",
                  border: "1px solid rgba(167, 139, 250, 0.2)",
                  borderBottom: "none",
                  borderRadius: "var(--radius-md) var(--radius-md) 0 0",
                  padding: "0.6rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(221, 214, 254, 0.4)" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(221, 214, 254, 0.4)" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(221, 214, 254, 0.4)" }} />
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "#A78BFA",
                    background: "rgba(167, 139, 250, 0.12)",
                    padding: "0.15rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(167, 139, 250, 0.25)",
                  }}
                >
                  https://alphatech-nutrition.in
                </div>

                <div style={{ width: "25px" }} />
              </div>

              {/* Complete Uncut Screenshot */}
              <div
                style={{
                  border: "1px solid rgba(167, 139, 250, 0.15)",
                  borderRadius: "0 0 var(--radius-md) var(--radius-md)",
                  overflow: "hidden",
                  background: "#1B102C",
                }}
              >
                <Image
                  src="/work-alphatech-official.webp"
                  alt="Alpha Tech Nutrition Website Snap"
                  width={1440}
                  height={825}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
