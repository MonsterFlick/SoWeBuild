"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current;

      if (currentY > 100) {
        setIsVisible(!isScrollingDown || isMenuOpen);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1.25rem var(--space-gutter)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1600px",
            margin: "0 auto",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.125rem",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--color-text)",
              textDecoration: "none",
            }}
          >
            SWB
            <span style={{ color: "var(--color-accent)", marginLeft: "2px" }}>.</span>
          </a>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
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

            <MagneticButton as="a" href="#contact" className="btn-primary" strength={0.2}>
              <span>Start a build</span>
            </MagneticButton>
          </div>

          {/* Menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMenuOpen ? 0 : "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              position: "relative",
              width: "32px",
              height: "32px",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 0 : -3,
              }}
              style={{
                width: "20px",
                height: "1.5px",
                background: "var(--color-text)",
                display: "block",
                position: isMenuOpen ? "absolute" : "relative",
              }}
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 3,
              }}
              style={{
                width: "20px",
                height: "1.5px",
                background: "var(--color-text)",
                display: "block",
                position: isMenuOpen ? "absolute" : "relative",
              }}
            />
          </button>

          {/* Desktop menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hidden md:flex"
            style={{
              display: "none",
              alignItems: "center",
              gap: "0.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
            }}
          >
            Menu
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "var(--color-bg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "var(--space-gutter)",
            }}
          >
            <div style={{ maxWidth: "1600px", margin: "0 auto", width: "100%" }}>
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 6vw, 5rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "var(--color-text)",
                    textDecoration: "none",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid var(--color-border)",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text)";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--color-text-muted)",
                      marginRight: "1.5rem",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </motion.a>
              ))}

              {/* Menu footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                  marginTop: "3rem",
                  display: "flex",
                  gap: "2rem",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="mailto:sowebuild.in@gmail.com"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  sowebuild.in@gmail.com
                </a>
                <a
                  href="https://instagram.com/sowebuild.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  @sowebuild.in
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
