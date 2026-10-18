"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Completely disable on touch devices and reduced motion
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse) and (hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !label) return;

    // Use gsap.quickTo for instant GPU transform updates without React state
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
        isVisible = true;
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      isVisible = false;
    };

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.12 });
      gsap.to(ring, { scale: 0.85, duration: 0.12 });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "back.out(1.4)" });
      gsap.to(ring, { scale: 1, duration: 0.25, ease: "back.out(1.4)" });
    };

    // State handlers
    const setCursorState = (type: "default" | "view" | "drag" | "magnetic" | "heading" | "interactive") => {
      switch (type) {
        case "view":
          label.textContent = "VIEW";
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, overwrite: "auto" });
          gsap.to(ring, {
            width: 80,
            height: 80,
            borderColor: "rgba(198, 255, 61, 0.4)",
            backgroundColor: "rgba(198, 255, 61, 0.05)",
            mixBlendMode: "normal",
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, overwrite: "auto" });
          break;

        case "drag":
          label.textContent = "DRAG";
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, overwrite: "auto" });
          gsap.to(ring, {
            width: 80,
            height: 80,
            borderColor: "rgba(198, 255, 61, 0.4)",
            backgroundColor: "rgba(198, 255, 61, 0.05)",
            mixBlendMode: "normal",
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, overwrite: "auto" });
          break;

        case "magnetic":
          gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2, overwrite: "auto" });
          gsap.to(ring, {
            width: 58,
            height: 58,
            borderColor: "rgba(198, 255, 61, 0.6)",
            backgroundColor: "transparent",
            borderRadius: "32%",
            mixBlendMode: "normal",
            duration: 0.35,
            ease: "back.out(1.4)",
            overwrite: "auto",
          });
          gsap.to(dot, { scale: 0.5, opacity: 1, duration: 0.2, overwrite: "auto" });
          break;

        case "heading":
          gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2, overwrite: "auto" });
          gsap.to(ring, {
            width: 48,
            height: 48,
            mixBlendMode: "difference",
            backgroundColor: "rgba(243, 239, 230, 0.9)",
            borderColor: "transparent",
            borderRadius: "50%",
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(dot, { opacity: 0, duration: 0.15, overwrite: "auto" });
          break;

        case "interactive":
          gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2, overwrite: "auto" });
          gsap.to(ring, {
            width: 48,
            height: 48,
            borderColor: "var(--color-accent)",
            backgroundColor: "rgba(198, 255, 61, 0.06)",
            borderRadius: "50%",
            mixBlendMode: "normal",
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(dot, { scale: 0.7, opacity: 1, duration: 0.2, overwrite: "auto" });
          break;

        default:
          gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2, overwrite: "auto" });
          gsap.to(ring, {
            width: 36,
            height: 36,
            borderColor: "rgba(243, 239, 230, 0.3)",
            backgroundColor: "transparent",
            borderRadius: "50%",
            mixBlendMode: "normal",
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25, overwrite: "auto" });
          break;
      }
    };

    // Ultra-fast event delegation — zero MutationObserver, handles 100% of DOM dynamically
    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        setCursorState("view");
      } else if (target.closest('[data-cursor="drag"]')) {
        setCursorState("drag");
      } else if (target.closest('[data-cursor="magnetic"]')) {
        setCursorState("magnetic");
      } else if (target.closest("h1, h2, h3, .heading-display, .heading-xl")) {
        setCursorState("heading");
      } else if (target.closest("a, button, input, select, textarea, .btn-primary, .btn-outline, .chip")) {
        setCursorState("interactive");
      }
    };

    const onPointerOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (
        !related ||
        (!related.closest('[data-cursor="view"]') &&
          !related.closest('[data-cursor="drag"]') &&
          !related.closest('[data-cursor="magnetic"]') &&
          !related.closest("h1, h2, h3, .heading-display, .heading-xl") &&
          !related.closest("a, button, input, select, textarea, .btn-primary, .btn-outline, .chip"))
      ) {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseover", onPointerOver, { passive: true });
    document.addEventListener("mouseout", onPointerOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onPointerOver);
      document.removeEventListener("mouseout", onPointerOut);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className="hidden md:block pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden="true"
    >
      {/* Dot */}
      <div
        ref={dotRef}
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
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
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
          willChange: "transform, width, height",
        }}
      >
        {/* Label */}
        <div
          ref={labelRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#c6ff3d",
            opacity: 0,
            transform: "scale(0.8)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
