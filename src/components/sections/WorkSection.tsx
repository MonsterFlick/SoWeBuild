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

    const cards = section.querySelectorAll(".work-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-padding"
      style={{
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div className="label" style={{ marginBottom: "0.75rem" }}>
              Selected Work
            </div>
            <h2 className="heading-xl">
              Real builds.{" "}
              <span className="serif-accent">Measured</span> results.
            </h2>
          </div>
          <p
            className="body-lg"
            style={{
              maxWidth: "400px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Digital products and flagship platforms engineered by our studio.
          </p>
        </div>

        {/* 2-Column Responsive Grid: Both Cards Fit Beautifully On Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ============================================================== */}
          {/* PROJECT 1: FERTISURE */}
          {/* ============================================================== */}
          <div
            className="work-card"
            style={{
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              overflow: "hidden",
              transition: "border-color 0.3s ease, transform 0.3s ease",
            }}
          >
            {/* Top Bar: Name of Site + 2 Buttons */}
            <div
              style={{
                padding: "1.5rem clamp(1.25rem, 2vw, 1.75rem)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-accent)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.2rem",
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

              {/* The 2 Buttons */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <a
                  href="https://fertisure.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: "0.55rem 1.1rem", fontSize: "0.75rem" }}
                >
                  <span>Visit Live ↗</span>
                </a>
                <Link
                  href="/work/fertisure"
                  className="btn-outline"
                  style={{ padding: "0.55rem 1rem", fontSize: "0.75rem" }}
                >
                  <span>Case Study</span>
                </Link>
              </div>
            </div>

            {/* Snap of Website in Sleek Browser Frame */}
            <div
              style={{
                background: "linear-gradient(180deg, #0e1218 0%, #06090e 100%)",
                padding: "clamp(0.75rem, 1.5vw, 1.25rem)",
              }}
            >
              {/* Window Chrome Header */}
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderBottom: "none",
                  borderRadius: "var(--radius-md) var(--radius-md) 0 0",
                  padding: "0.6rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)" }} />
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-text-secondary)",
                    background: "rgba(255, 255, 255, 0.04)",
                    padding: "0.15rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  https://fertisure.in
                </div>

                <div style={{ width: "25px" }} />
              </div>

              {/* Complete Uncut Screenshot */}
              <div
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "0 0 var(--radius-md) var(--radius-md)",
                  overflow: "hidden",
                  background: "#080c10",
                }}
              >
                <Image
                  src="/work-fertisure-official.png"
                  alt="FertiSure Website Snap"
                  width={1440}
                  height={900}
                  unoptimized
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
              overflow: "hidden",
              transition: "border-color 0.3s ease, transform 0.3s ease",
            }}
          >
            {/* Top Bar: Name of Site + 2 Buttons */}
            <div
              style={{
                padding: "1.5rem clamp(1.25rem, 2vw, 1.75rem)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-accent)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.2rem",
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

              {/* The 2 Buttons */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <a
                  href="https://alphatech-nutrition.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: "0.55rem 1.1rem", fontSize: "0.75rem" }}
                >
                  <span>Visit Live ↗</span>
                </a>
                <Link
                  href="/work/alphatech-nutrition"
                  className="btn-outline"
                  style={{ padding: "0.55rem 1rem", fontSize: "0.75rem" }}
                >
                  <span>Case Study</span>
                </Link>
              </div>
            </div>

            {/* Snap of Website in Sleek Browser Frame */}
            <div
              style={{
                background: "linear-gradient(180deg, #130f1d 0%, #08060c 100%)",
                padding: "clamp(0.75rem, 1.5vw, 1.25rem)",
              }}
            >
              {/* Window Chrome Header */}
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderBottom: "none",
                  borderRadius: "var(--radius-md) var(--radius-md) 0 0",
                  padding: "0.6rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)" }} />
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-text-secondary)",
                    background: "rgba(255, 255, 255, 0.04)",
                    padding: "0.15rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  https://alphatech-nutrition.in
                </div>

                <div style={{ width: "25px" }} />
              </div>

              {/* Complete Uncut Screenshot */}
              <div
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "0 0 var(--radius-md) var(--radius-md)",
                  overflow: "hidden",
                  background: "#0a0710",
                }}
              >
                <Image
                  src="/work-alphatech-official.png"
                  alt="Alpha Tech Nutrition Website Snap"
                  width={1440}
                  height={825}
                  unoptimized
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
