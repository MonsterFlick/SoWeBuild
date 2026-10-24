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
    <div className="flex flex-col items-center justify-center text-center select-none font-display w-full">
      {/* Line 1: Hook */}
      <motion.p
        initial={{ opacity: 0.8, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-serif italic text-[clamp(1.35rem,3.2vw,2.2rem)] font-normal tracking-tight text-[#f3efe6]/80 mb-3"
      >
        {hook}
      </motion.p>

      {/* Line 2: Brand Action + Shuffling Word */}
      <motion.h2
        initial={{ opacity: 0.9, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full text-[clamp(2.2rem,6vw,4.8rem)] font-bold tracking-tighter text-[#f3efe6] leading-tight"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-baseline gap-x-3 md:gap-x-4 text-center md:text-left">
          {/* Left Column: Anchored against center seam — zero shifting */}
          <div className="md:text-right whitespace-nowrap">
            <span>So we build</span>
          </div>

          {/* Right Column: Starts from center seam and expands right */}
          <div className="md:text-left">
            <span className="inline-grid [grid-template-areas:'stack'] align-baseline min-h-[1.2em]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={words[index]}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="[grid-area:stack] whitespace-nowrap text-[#c6ff3d] drop-shadow-[0_0_35px_rgba(198,255,61,0.5)] will-change-transform"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </div>
      </motion.h2>
    </div>
  );
}
