"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function Navigation() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Monitor scroll for glass backdrop activation
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll cleanly when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Capabilities", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const menuLinks = [
    { label: "Home", href: "/" },
    { label: "Selected Work", href: "#work" },
    { label: "Capabilities", href: "#services" },
    { label: "Start a Project", href: "#contact" },
    { label: "Brand Guidelines", href: "/brand-guidelines" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsMenuOpen(false);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";

      // Smooth scroll to target after menu starts closing
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 80);
    } else {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  };

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "clamp(0.875rem, 2vw, 1.25rem) var(--space-gutter)",
          background: hasScrolled || isMenuOpen ? "rgba(7, 7, 10, 0.85)" : "transparent",
          backdropFilter: hasScrolled || isMenuOpen ? "blur(16px)" : "none",
          WebkitBackdropFilter: hasScrolled || isMenuOpen ? "blur(16px)" : "none",
          borderBottom:
            hasScrolled || isMenuOpen
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid transparent",
          transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1600px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={() => {
              if (isMenuOpen) setIsMenuOpen(false);
            }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--color-text)",
              textDecoration: "none",
              position: "relative",
              zIndex: 102,
              display: "inline-flex",
              alignItems: "baseline",
            }}
          >
            SWB
            <span style={{ color: "var(--color-accent)", marginLeft: "2px" }}>.</span>
          </a>

          {/* Desktop links */}
          <nav
            className="hidden md:flex items-center gap-10"
            aria-label="Desktop Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="link-sweep"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}

            <MagneticButton
              as="a"
              href="#contact"
              onClick={(e?: React.MouseEvent) => {
                if (e) handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, "#contact");
              }}
              className="btn-primary"
              strength={0.2}
            >
              <span>Start a build</span>
            </MagneticButton>
          </nav>

          {/* Mobile menu toggle with morphing SVG icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              padding: "8px",
              width: "42px",
              height: "42px",
              position: "relative",
              zIndex: 102,
              color: "var(--color-text)",
              WebkitTapHighlightColor: "transparent",
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <motion.path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                animate={isMenuOpen ? { d: "M5 5L19 19" } : { d: "M4 7h16" }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
              <motion.path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                animate={isMenuOpen ? { d: "M5 19L19 5" } : { d: "M4 17h16" }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Fullscreen responsive mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              background: "#07070a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              padding: "clamp(5rem, 14vh, 7rem) var(--space-gutter) 2.5rem",
            }}
          >
            <div style={{ maxWidth: "1600px", margin: "0 auto", width: "100%" }}>
              <div
                className="label"
                style={{
                  fontSize: "0.625rem",
                  color: "var(--color-accent)",
                  marginBottom: "1rem",
                  letterSpacing: "0.15em",
                }}
              >
                NAVIGATION
              </div>

              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.05 + i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.6rem, 5vw, 2.5rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "var(--color-text)",
                    textDecoration: "none",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                    transition: "color 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--color-accent)",
                      marginRight: "1rem",
                      width: "1.5rem",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{link.label}</span>
                </motion.a>
              ))}

              {/* Direct CTA button in mobile drawer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                style={{ marginTop: "2rem" }}
              >
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "1rem",
                    fontSize: "0.8125rem",
                  }}
                >
                  <span>Start a project →</span>
                </a>
              </motion.div>
            </div>

            {/* Menu footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              style={{
                marginTop: "2.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                maxWidth: "1600px",
                margin: "2.5rem auto 0",
                width: "100%",
              }}
            >
              <a
                href="mailto:sowebuild.in@gmail.com"
                className="mono"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                }}
              >
                sowebuild.in@gmail.com
              </a>
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-text-muted)",
                }}
              >
                Mumbai, IN · Worldwide
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
