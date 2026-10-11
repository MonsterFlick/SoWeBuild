"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(198, 255, 61, 0.06)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    },
    []
  );

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}
