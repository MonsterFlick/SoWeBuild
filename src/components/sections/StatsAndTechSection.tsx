"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../Marquee";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 500, suffix: "+", label: "Clinics Served" },
  { value: 350, prefix: "<", suffix: "ms", label: "Average Page Speed" },
  { value: 100, suffix: "%", label: "Client Ownership" },
  { value: 5, suffix: "", label: "CDN Regions" },
  { value: 60, suffix: "fps", label: "Smooth Scrolling" },
  { value: 98, suffix: "", label: "Lighthouse Score" },
];

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL",
  "Redis", "Vercel", "AWS", "Cloudflare", "Docker", "GraphQL",
  "Prisma", "Tailwind CSS", "GSAP", "Three.js", "OpenAI", "LangChain",
  "WhatsApp API", "Stripe", "Supabase", "MongoDB",
];

export default function StatsAndTechSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counters, setCounters] = useState<number[]>(STATS.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const statEls = section.querySelectorAll(".stat-item");

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      once: true,
      onEnter: () => {
        if (hasAnimated) return;
        setHasAnimated(true);

        STATS.forEach((stat, i) => {
          gsap.to(
            { val: 0 },
            {
              val: stat.value,
              duration: 2,
              delay: i * 0.1,
              ease: "power2.out",
              onUpdate: function () {
                setCounters((prev) => {
                  const next = [...prev];
                  next[i] = Math.round(this.targets()[0].val);
                  return next;
                });
              },
            }
          );
        });

        statEls.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: "power4.out",
            }
          );
        });
      },
    });
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      {/* Stats strip */}
      <div
        className="section-padding hairline-top hairline-bottom"
        style={{ overflow: "hidden" }}
      >
        <div className="container-wide">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "2rem",
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-item"
                style={{ textAlign: "center", opacity: 0 }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 800,
                    color: "var(--color-text)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {stat.prefix || ""}
                  {counters[i]}
                  {stat.suffix}
                </div>
                <div
                  className="label"
                  style={{ marginTop: "0.5rem" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div
        className="section-padding"
        style={{ overflow: "hidden" }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="label">Our Stack</div>
        </div>

        {/* Row 1 - Left */}
        <Marquee speed={40} direction="left" className="mb-8">
          {TECH_STACK.slice(0, 11).map((tech) => (
            <span
              key={tech}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.625rem 1.25rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-text-secondary)",
                whiteSpace: "nowrap",
                transition: "border-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
              }}
            >
              {tech}
            </span>
          ))}
        </Marquee>

        {/* Row 2 - Right */}
        <Marquee speed={35} direction="right">
          {TECH_STACK.slice(11).map((tech) => (
            <span
              key={tech}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.625rem 1.25rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-text-secondary)",
                whiteSpace: "nowrap",
                transition: "border-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
              }}
            >
              {tech}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
