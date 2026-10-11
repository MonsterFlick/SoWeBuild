"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASTER_EGG_LINES = [
  "$ sudo build --awesome",
  "",
  "▸ Initiating awesome mode...",
  "▸ Injecting 200% more GSAP...",
  "▸ Deploying to the metaverse...",
  "▸ Compiling happiness.tsx...",
  "",
  "✓ Awesome mode activated 🚀",
  "",
  "   Built with love by SoWeBuild",
  "   sowebuild.in",
  "",
  "   Press ESC to close",
];

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [logoClicks, setLogoClicks] = useState(0);

  // Listen for "K" key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" || e.key === "K") {
        if (!e.metaKey && !e.ctrlKey) {
          setIsOpen(true);
        }
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setLines([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for logo triple-click
  useEffect(() => {
    const logo = document.querySelector('a[href="/"]');
    if (!logo) return;

    const handleClick = () => {
      setLogoClicks((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          setIsOpen(true);
          return 0;
        }
        // Reset after 2 seconds
        setTimeout(() => setLogoClicks(0), 2000);
        return next;
      });
    };

    logo.addEventListener("click", handleClick);
    return () => logo.removeEventListener("click", handleClick);
  }, []);

  // Type out lines
  useEffect(() => {
    if (!isOpen) return;

    setLines([]);
    const timeouts: NodeJS.Timeout[] = [];

    EASTER_EGG_LINES.forEach((line, i) => {
      timeouts.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
        }, i * 150)
      );
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10001,
            background: "rgba(7, 7, 10, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsOpen(false);
            setLines([]);
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.75rem, 1.2vw, 0.9375rem)",
              lineHeight: 1.8,
              color: "#c6ff3d",
              maxWidth: "500px",
              padding: "2rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  opacity: line ? 1 : 0.3,
                  color: i === 0 ? "#c6ff3d" : i >= 7 ? "#f3efe6" : "#8a8a99",
                }}
              >
                {line || "\u00A0"}
              </div>
            ))}
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "16px",
                background: "#c6ff3d",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>

          <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
