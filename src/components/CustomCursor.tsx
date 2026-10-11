"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface CursorState {
  dot: HTMLDivElement | null;
  ring: HTMLDivElement | null;
  label: HTMLDivElement | null;
}

export default function CustomCursor() {
  const cursorRef = useRef<CursorState>({
    dot: null,
    ring: null,
    label: null,
  });

  const isTouch = useRef(false);

  const setupCursor = useCallback(() => {
    // Detect touch devices
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      isTouch.current = true;
      return;
    }

    const dot = cursorRef.current.dot;
    const ring = cursorRef.current.ring;
    const label = cursorRef.current.label;

    if (!dot || !ring || !label) return;

    // Use quickTo for buttery performance — no React state updates
    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // Context states
    const onMouseEnterView = () => {
      gsap.to(ring, {
        width: 80,
        height: 80,
        borderColor: "rgba(198, 255, 61, 0.4)",
        duration: 0.4,
        ease: "power4.out",
      });
      label.textContent = "VIEW";
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
    };

    const onMouseEnterDrag = () => {
      gsap.to(ring, {
        width: 80,
        height: 80,
        borderColor: "rgba(198, 255, 61, 0.4)",
        duration: 0.4,
        ease: "power4.out",
      });
      label.textContent = "DRAG";
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
    };

    const onMouseEnterMagnetic = () => {
      gsap.to(ring, {
        width: 60,
        height: 60,
        borderColor: "rgba(198, 255, 61, 0.6)",
        borderRadius: "30%",
        duration: 0.4,
        ease: "back.out(1.4)",
      });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };

    const onMouseLeaveState = () => {
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderColor: "rgba(243, 239, 230, 0.3)",
        borderRadius: "50%",
        duration: 0.5,
        ease: "power4.out",
      });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const onMouseEnterHeading = () => {
      gsap.to(ring, {
        width: 48,
        height: 48,
        mixBlendMode: "difference",
        background: "rgba(243, 239, 230, 0.8)",
        borderColor: "transparent",
        duration: 0.4,
        ease: "power4.out",
      });
      gsap.to(dot, { opacity: 0, duration: 0.2 });
    };

    const onMouseLeaveHeading = () => {
      gsap.to(ring, {
        width: 36,
        height: 36,
        mixBlendMode: "normal",
        background: "transparent",
        borderColor: "rgba(243, 239, 230, 0.3)",
        duration: 0.4,
        ease: "power4.out",
      });
      gsap.to(dot, { opacity: 1, duration: 0.3 });
    };

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.15 });
      gsap.to(ring, { scale: 0.85, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "back.out(1.4)" });
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(1.4)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Bind cursor states to data attributes
    const viewEls = document.querySelectorAll('[data-cursor="view"]');
    const dragEls = document.querySelectorAll('[data-cursor="drag"]');
    const magneticEls = document.querySelectorAll('[data-cursor="magnetic"]');
    const headingEls = document.querySelectorAll("h1, h2, h3, .heading-display, .heading-xl");

    viewEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterView);
      el.addEventListener("mouseleave", onMouseLeaveState);
    });

    dragEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterDrag);
      el.addEventListener("mouseleave", onMouseLeaveState);
    });

    magneticEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterMagnetic);
      el.addEventListener("mouseleave", onMouseLeaveState);
    });

    headingEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterHeading);
      el.addEventListener("mouseleave", onMouseLeaveHeading);
    });

    // Show cursor
    gsap.set([dot, ring], { opacity: 1 });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);

      viewEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterView);
        el.removeEventListener("mouseleave", onMouseLeaveState);
      });
      dragEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterDrag);
        el.removeEventListener("mouseleave", onMouseLeaveState);
      });
      magneticEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterMagnetic);
        el.removeEventListener("mouseleave", onMouseLeaveState);
      });
      headingEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHeading);
        el.removeEventListener("mouseleave", onMouseLeaveHeading);
      });
    };
  }, []);

  useEffect(() => {
    const cleanup = setupCursor();

    // Re-bind after DOM changes (for dynamic elements)
    const observer = new MutationObserver(() => {
      cleanup?.();
      setupCursor();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup?.();
      observer.disconnect();
    };
  }, [setupCursor]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      id="custom-cursor"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }}
    >
      {/* Dot */}
      <div
        ref={(el) => {
          cursorRef.current.dot = el;
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#c6ff3d",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {/* Ring */}
      <div
        ref={(el) => {
          cursorRef.current.ring = el;
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(243, 239, 230, 0.3)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Label */}
        <div
          ref={(el) => {
            cursorRef.current.label = el;
          }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#c6ff3d",
            opacity: 0,
            transform: "scale(0.8)",
            whiteSpace: "nowrap",
          }}
        />
      </div>
    </div>
  );
}
