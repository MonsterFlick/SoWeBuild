"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "How quickly can we start building?",
    a: "Within 48 hours. Your dedicated dev server is provisioned immediately with live running code delivered in week one.",
  },
  {
    q: "What do we actually own at the end?",
    a: "Everything: complete Git repository, database schemas, deployment pipelines, API documentation, and all IP. Zero lock-in.",
  },
  {
    q: "Do you work with startups or enterprises?",
    a: "Both. From high-velocity startup MVPs to high-concurrency enterprise platforms and systems modernization.",
  },
  {
    q: "What is your pricing structure?",
    a: "Milestone-based fixed pricing with clear scopes, or dedicated monthly engineering retainers. Zero billing surprises.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".faq-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
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
      }}
    >
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="label" style={{ marginBottom: "1.5rem" }}>
            FAQ
          </div>
          <h2 className="heading-lg">
            Questions we get <span className="serif-accent">asked</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="faq-item"
              style={{
                borderBottom: "1px solid var(--color-border)",
                opacity: 0,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.5rem 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                    fontWeight: 600,
                    color: "var(--color-text)",
                  }}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: "1.5rem",
                    color: "var(--color-accent)",
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        paddingBottom: "1.5rem",
                        fontSize: "0.9375rem",
                        lineHeight: 1.7,
                        color: "var(--color-text-secondary)",
                        maxWidth: "640px",
                      }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
