"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

export function PrimaryCta({
  children,
  href = "#contact",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <Magnetic className="inline-block">
      <a
        href={href}
        onClick={onClick}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-semibold tracking-tight text-primary-foreground transition-transform duration-300 active:scale-[0.97]"
      >
        <span className="absolute inset-0 bg-[image:var(--gradient-violet)]" />
        <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120px_60px_at_50%_120%,oklch(1_0_0/0.45),transparent)]" />
        <span className="bloom absolute inset-0 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    </Magnetic>
  );
}

export function GhostCta({
  children,
  href = "#contact",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <Magnetic className="inline-block" strength={0.25}>
      <a
        href={href}
        onClick={onClick}
        className="glass group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold tracking-tight text-foreground/85 transition-colors duration-300 hover:text-foreground active:scale-[0.97]"
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <span className="absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </a>
    </Magnetic>
  );
}
