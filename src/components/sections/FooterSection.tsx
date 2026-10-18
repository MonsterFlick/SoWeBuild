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
    { label: "Capabilities", href: "#services" },
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {/* Brand & Tagline */}
          <div>
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
              <span style={{ color: "var(--color-accent)", marginLeft: "2px" }}>.</span>
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
              You have a problem. So we build the solution.
            </p>
          </div>

          {/* Nav Links in horizontal strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.75rem",
              flexWrap: "wrap",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
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
                  background: "#c6ff3d",
                  boxShadow: "0 0 6px #c6ff3d",
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

        {/* Bottom Compact Legal & Social Strip */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: "0.6875rem",
              color: "var(--color-text-muted)",
            }}
          >
            © {new Date().getFullYear()} SoWeBuild Studio. Engineered in India for the world.
          </span>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <a
              href="mailto:sowebuild.in@gmail.com"
              className="link-sweep mono"
              style={{
                fontSize: "0.6875rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              sowebuild.in@gmail.com
            </a>
            <a
              href="https://instagram.com/sowebuild.in"
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep mono"
              style={{
                fontSize: "0.6875rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
