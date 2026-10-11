"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  "data-cursor"?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as: Tag = "button",
  href,
  onClick,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const isTouch =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      gsap.to(ref.current, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    [isTouch, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  if (Tag === "a") {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={className}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        data-cursor="magnetic"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="magnetic"
      {...rest}
    >
      {children}
    </button>
  );
}
