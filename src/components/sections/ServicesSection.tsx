"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "../SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    num: "01",
    title: "Web Applications & SaaS Platforms",
    description:
      "Custom client portals, SaaS products, and internal dashboards built to streamline your operations and scale effortlessly.",
    deliverables: ["Client Portals", "SaaS Products", "Custom Dashboards"],
  },
  {
    num: "02",
    title: "Flagship Websites & E-Commerce",
    description:
      "Bespoke digital flagships with memorable design, lightning-fast loading speeds, and frictionless customer conversions.",
    deliverables: ["Bespoke Brand Sites", "E-Commerce Stores", "Interactive Design"],
  },
  {
    num: "03",
    title: "AI Systems & Smart Automation",
    description:
      "Intelligent customer assistants, automated WhatsApp lead flows, and smart pipelines that save hours and drive revenue 24/7.",
    deliverables: ["WhatsApp Automation", "AI Customer Support", "Lead Capture Bots"],
  },
  {
    num: "04",
    title: "Mobile Apps & Dedicated Systems",
    description:
      "Polished iOS and Android mobile applications paired with secure cloud systems, delivered with complete source code ownership.",
    deliverables: ["iOS & Android Apps", "Secure Cloud Backends", "100% IP Ownership"],
  },
];

export default function ServicesSection() {
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
      id="services"
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
            maxWidth: "700px",
            marginBottom: "3.5rem",
            opacity: 0,
          }}
        >
          <div className="label" style={{ marginBottom: "1.25rem" }}>
            Capabilities
          </div>
          <h2 className="heading-xl" style={{ marginBottom: "1.25rem" }}>
            What we <span className="serif-accent">build</span>
          </h2>
          <p
            className="body-lg"
            style={{
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              maxWidth: "520px",
              margin: 0,
            }}
          >
            End-to-end design and engineering. You collaborate directly with senior builders from concept to launch.
          </p>
        </div>

        {/* 2x2 Capabilities Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CAPABILITIES.map((cap) => (
            <div key={cap.num} className="opacity-0">
              <SpotlightCard className="h-full">
                <div
                  style={{
                    padding: "clamp(2rem, 3vw, 2.5rem)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    minHeight: "240px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-accent)",
                        marginBottom: "1rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {cap.num}
                    </div>
                    <h3
                      className="heading-md"
                      style={{ marginBottom: "0.75rem" }}
                    >
                      {cap.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.65,
                        color: "var(--color-text-secondary)",
                        marginBottom: "1.75rem",
                      }}
                    >
                      {cap.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {cap.deliverables.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          color: "var(--color-text-secondary)",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid var(--color-border)",
                          padding: "0.3rem 0.65rem",
                          borderRadius: "var(--radius-full)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
