"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

function HomeIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ZapIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ServicesIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function WorkIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

function AboutIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function ContactIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

const ITEMS = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "inquiry", label: "Inquiry", Icon: ZapIcon },
  { id: "technology", label: "Services", Icon: ServicesIcon },
  { id: "work", label: "Work", Icon: WorkIcon },
  { id: "about", label: "About", Icon: AboutIcon },
  { id: "contact", label: "Contact", Icon: ContactIcon },
];

const SECTION_MAP: Record<string, string> = {
  morph: "home",
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

  const IconComp = item.Icon;

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
        <span className="relative z-10 text-primary-glow">
          <IconComp className="size-3.5" />
        </span>
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
