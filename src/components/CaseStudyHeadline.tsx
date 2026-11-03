"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const wordVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(6px)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function CaseStudyHeadline({
  words,
  hook = "Built from the ground up.",
}: {
  words: string[];
  hook?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [words]);

  if (!words || words.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center text-center select-none font-display w-full px-2">
      {/* Line 1: Hook */}
      <motion.p
        initial={{ opacity: 0.8, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-serif italic text-[clamp(1.15rem,2.8vw,2rem)] font-normal tracking-tight text-[#585062] mb-2 sm:mb-3"
      >
        {hook}
      </motion.p>

      {/* Line 2: Brand Action + Shuffling Word */}
      <motion.h2
        initial={{ opacity: 0.9, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full text-[clamp(1.75rem,5.2vw,4.5rem)] font-bold tracking-tight text-[#16131D] leading-tight"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 text-center">
          <span className="whitespace-nowrap">So we build</span>
          <span className="inline-grid [grid-template-areas:'stack'] align-baseline min-h-[1.2em]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={words[index]}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="[grid-area:stack] text-[#7C3AED] drop-shadow-[0_2px_16px_rgba(124,58,237,0.35)] will-change-transform"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </motion.h2>
    </div>
  );
}
