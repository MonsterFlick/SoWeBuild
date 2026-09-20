"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

const ITEMS = [
  { id: "home", label: "Home", glyph: "◉" },
  { id: "technology", label: "Services", glyph: "▤" },
  { id: "work", label: "Work", glyph: "◈" },
  { id: "about", label: "About", glyph: "⌗" },
  { id: "contact", label: "Contact", glyph: "→" },
];

const SECTION_MAP: Record<string, string> = {
  morph: "home",
  inquiry: "contact",
};

export function Dock({ active, visible = true }: { active: string; visible?: boolean }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-6">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: visible ? 0 : 40, opacity: visible ? 1 : 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass-strong pointer-events-auto flex items-center gap-1 rounded-full p-1.5"
      >
        {ITEMS.map((it) => (
          <DockItem key={it.id} item={it} active={active} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}

function DockItem({
  item,
  active,
  mouseX,
}: {
  item: typeof ITEMS[0];
  active: string;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const effectiveActive = SECTION_MAP[active] ?? active;
  const isActive = effectiveActive === item.id;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate scaling and vertical lift based on distance to mouse pointer
  const scaleSync = useTransform(distance, [-120, 0, 120], [1, 1.15, 1]);
  const ySync = useTransform(distance, [-120, 0, 120], [0, -6, 0]);

  // Apply a light spring to smooth out the transition natively
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 350, damping: 25 });
  const y = useSpring(ySync, { mass: 0.1, stiffness: 350, damping: 25 });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(item.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.a
      ref={ref}
      href={`#${item.id}`}
      onClick={handleClick}
      style={{ scale, y, willChange: "transform" }}
      className="relative block group"
    >
      <div
        className={`relative flex items-center gap-2 rounded-full px-3 py-2 transition-colors duration-200 sm:px-4 ${
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {isActive && (
          <motion.span
            layoutId="dock-pill"
            transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
            className="absolute inset-0 rounded-full bg-[image:var(--gradient-violet)] opacity-90 -z-0"
            style={{ willChange: "transform, width" }}
          />
        )}
        <span className="relative z-10 text-[11px] leading-none opacity-80">{item.glyph}</span>
        <span className="relative z-10 hidden text-[11px] font-semibold tracking-tight sm:block">
          {item.label}
        </span>
      </div>
      
      {/* Pure CSS Tooltip - No React state needed */}
      <span
        className="glass absolute -top-9 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 font-mono text-[9px] tracking-widest whitespace-nowrap uppercase sm:hidden z-20 pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out"
      >
        {item.label}
      </span>
    </motion.a>
  );
}
