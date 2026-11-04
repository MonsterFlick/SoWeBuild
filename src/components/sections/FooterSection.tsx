"use client";

import { useEffect, useState } from "react";
import MagneticButton from "../MagneticButton";

export default function FooterSection() {
  const [time, setTime] = useState("");

  // Live IST clock
  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(now);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Standards", href: "#faq" },
    { label: "Store ↗", href: "https://store.sowebuild.in", isExternal: true },
    { label: "Founder ↗", href: "https://omthakur.in", isExternal: true },
    { label: "Brand Assets ↗", href: "https://github.com/MonsterFlick/SoWeBuild-assets", isExternal: true },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      style={{
        background: "var(--color-surface)",
        position: "relative",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container-wide" style={{ padding: "clamp(2rem, 4vw, 3rem) var(--space-gutter) 1.5rem" }}>
        {/* Main Compact Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 text-center sm:text-left">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--color-text)",
                marginBottom: "0.25rem",
              }}
            >
              SoWeBuild
              <span style={{ color: "var(--color-accent, #7C3AED)", marginLeft: "2px" }}>.</span>
            </div>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-text-secondary)",
                margin: 0,
                maxWidth: "380px",
                lineHeight: 1.5,
              }}
            >
              Engineered from zero to production. So We Build.
            </p>
          </div>

          {/* Nav Links in horizontal strip */}
          <div className="flex items-center justify-center gap-6 sm:gap-7 flex-wrap">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="link-sweep"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Time, Status & Back to Top */}
          <div className="flex items-center justify-center gap-5 sm:gap-6 flex-wrap">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-accent, #7C3AED)",
                  boxShadow: "0 0 6px rgba(124, 58, 237, 0.4)",
                }}
              />
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                IST {time}
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="link-sweep"
              type="button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              Top
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 10V2m0 0L2 6m4-4l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Legal & Utility Strip */}
        <div className="border-t border-[var(--color-border)] pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <span
            className="mono"
            style={{
              fontSize: "0.6875rem",
              color: "var(--color-text-muted)",
            }}
          >
            © {new Date().getFullYear()} SoWeBuild Studio. Engineered in India for the world.
          </span>

          <div className="flex gap-4 sm:gap-6 items-center justify-center flex-wrap">
            <a
              href="/sitemap.xml"
              className="link-sweep mono"
              style={{
                fontSize: "0.6875rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              Sitemap
            </a>
            <a
              href="/llms.txt"
              className="link-sweep mono"
              style={{
                fontSize: "0.6875rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              llms.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
