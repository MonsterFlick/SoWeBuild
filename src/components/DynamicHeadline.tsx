"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const WORDS = [
  "the solution.",
  "websites.",
  "web apps.",
  "AI chatbots.",
  "WhatsApp bots.",
  "mobile apps.",
  "custom software.",
  "AI automation.",
];

const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function DynamicHeadline({ active = true }: { active?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex flex-col select-none font-display">
      {/* Line 1: Hook */}
      <div className="overflow-hidden pb-1">
        <motion.p
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: active ? "0%" : "110%", opacity: active ? 1 : 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1.4rem,3.5vw,2.75rem)] font-medium tracking-tight leading-[1.1] text-muted-foreground"
        >
          You have a problem.
        </motion.p>
      </div>

      {/* Line 2: Brand Action + Shuffling Word */}
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: active ? "0%" : "110%", opacity: active ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1.85rem,5.8vw,4.5rem)] font-bold tracking-tighter leading-[1.05] text-foreground flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4"
        >
          <span>So we build</span>

          {/* High-Performance Smooth Word Transition */}
          <span className="inline-grid [grid-template-areas:'stack'] align-baseline overflow-visible text-primary-glow min-w-[140px] sm:min-w-[240px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[index]}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="[grid-area:stack] whitespace-nowrap will-change-transform"
              >
                {WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>
      </div>
    </div>
  );
}
