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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 }
  }
};

const letterVariants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, filter: "blur(8px)", y: -15, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } }
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

          {/* Letter-by-Letter Blur Animation */}
          <span className="inline-grid [grid-template-areas:'stack'] align-baseline overflow-visible text-primary-glow">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[index]}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="[grid-area:stack] whitespace-nowrap flex"
              >
                {WORDS[index].split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>
      </div>
    </div>
  );
}
