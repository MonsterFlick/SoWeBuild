"use client";

import { useRef, useEffect, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  chars?: string;
  trigger?: "mount" | "inView";
}

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function ScrambleText({
  text,
  className = "",
  speed = 30,
  chars = SCRAMBLE_CHARS,
  trigger = "mount",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const elRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) {
      setDisplayText(text);
      return;
    }

    let activeInterval: NodeJS.Timeout | null = null;

    const scramble = () => {
      let iteration = 0;
      const length = text.length;

      activeInterval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, i) => {
              if (i < iteration) return text[i];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= length) {
          if (activeInterval) clearInterval(activeInterval);
        }

        iteration += 1 / 3;
      }, speed);
    };

    if (trigger === "mount") {
      scramble();
      return () => {
        if (activeInterval) clearInterval(activeInterval);
      };
    }

    if (trigger === "inView") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scramble();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      return () => {
        observer.disconnect();
        if (activeInterval) clearInterval(activeInterval);
      };
    }
  }, [text, speed, chars, trigger]);

  return (
    <span ref={elRef} className={className} style={{ fontFamily: "var(--font-mono)" }}>
      {displayText}
    </span>
  );
}
