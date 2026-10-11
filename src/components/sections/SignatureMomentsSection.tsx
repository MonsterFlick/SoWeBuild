"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TerminalDemo from "../TerminalDemo";
import ChatDemo from "../ChatDemo";
import ArchitectureConsole from "../ArchitectureConsole";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureMomentsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll(".moment-block");
    blocks.forEach((block) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: block, start: "top 80%", once: true },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{
        background: "var(--color-surface)",
        position: "relative",
      }}
    >
      <div className="container-wide">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="label" style={{ marginBottom: "1.5rem" }}>
            How We Work
          </div>
          <h2 className="heading-xl">
            Built different,{" "}
            <span className="serif-accent">shipped</span> faster
          </h2>
          <p className="body-lg" style={{ maxWidth: "520px", margin: "1.5rem auto 0", color: "var(--color-text-secondary)", lineHeight: 1.65 }}>
            Automated deployments, sub-second performance, and AI systems built for real operations.
          </p>
        </div>

        {/* Terminal + Chat Demo Grid */}
        <div
          className="moment-block"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "2rem",
            }}
            className="md:grid-cols-[1.3fr_1fr]"
          >
            {/* Terminal */}
            <div>
              <div className="label" style={{ marginBottom: "1rem" }}>
                Live Deploy Simulation
              </div>
              <TerminalDemo />
            </div>

            {/* Chat Demo */}
            <div>
              <div className="label" style={{ marginBottom: "1rem" }}>
                AI Client Onboarding
              </div>
              <ChatDemo />
            </div>
          </div>
        </div>

        {/* Architecture Console */}
        <div className="moment-block">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div className="label" style={{ marginBottom: "0.5rem" }}>
              System Topology
            </div>
            <h3 className="heading-md">
              Engineered for <span className="serif-accent">zero-latency</span> scale
            </h3>
          </div>
          <ArchitectureConsole />
        </div>
      </div>
    </section>
  );
}
