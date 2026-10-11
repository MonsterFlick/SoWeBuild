"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealType = "lines" | "words" | "chars";

interface SplitRevealProps {
  children: ReactNode;
  type?: RevealType;
  stagger?: number;
  duration?: number;
  delay?: number;
  scrub?: boolean | number;
  start?: string;
  className?: string;
  as?: React.ElementType;
}

export default function SplitReveal({
  children,
  type = "lines",
  stagger = 0.05,
  duration = 1,
  delay = 0,
  scrub = false,
  start = "top 85%",
  className = "",
  as: Tag = "div",
}: SplitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Get the text content
    const text = el.textContent || "";
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReducedMotion) return;

    let elements: HTMLSpanElement[] = [];

    if (type === "chars") {
      el.innerHTML = "";
      const chars = text.split("");
      chars.forEach((char) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "top";

        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.textContent = char === " " ? "\u00A0" : char;
        inner.style.transform = "translateY(110%)";

        wrapper.appendChild(inner);
        el.appendChild(wrapper);
        elements.push(inner);
      });
    } else if (type === "words") {
      el.innerHTML = "";
      const words = text.split(/\s+/);
      words.forEach((word, i) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "top";

        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.textContent = word;
        inner.style.transform = "translateY(110%)";

        wrapper.appendChild(inner);
        el.appendChild(wrapper);
        elements.push(inner);

        if (i < words.length - 1) {
          const space = document.createTextNode("\u00A0");
          el.appendChild(space);
        }
      });
    } else {
      // Lines - wrap each line in overflow-hidden container
      el.innerHTML = "";
      const lines = text.split("\n").filter(Boolean);
      (lines.length > 0 ? lines : [text]).forEach((line) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "block";
        wrapper.style.overflow = "hidden";

        const inner = document.createElement("span");
        inner.style.display = "block";
        inner.textContent = line;
        inner.style.transform = "translateY(110%)";

        wrapper.appendChild(inner);
        el.appendChild(wrapper);
        elements.push(inner);
      });
    }

    const animConfig: gsap.TweenVars = {
      y: "0%",
      duration,
      stagger,
      ease: "power4.out",
      delay,
    };

    if (scrub) {
      gsap.to(elements, {
        ...animConfig,
        scrollTrigger: {
          trigger: el,
          start,
          end: "bottom 20%",
          scrub: typeof scrub === "number" ? scrub : 1,
        },
      });
    } else {
      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(elements, animConfig);
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [type, stagger, duration, delay, scrub, start]);

  return (
    <Tag
      ref={containerRef as React.Ref<HTMLDivElement>}
      className={className}
    >
      {children}
    </Tag>
  );
}
