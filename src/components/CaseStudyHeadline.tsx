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
  hook = "You had a problem.",
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
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[clamp(1.2rem,3vw,2.2rem)] font-medium tracking-tight text-slate-400 mb-3"
      >
        {hook}
      </motion.p>

      {/* Line 2: Brand Action + Shuffling Word */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-[clamp(2.2rem,7vw,5.2rem)] font-bold tracking-tighter text-white flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 leading-none"
      >
        <span>So we build</span>

        <span className="inline-grid [grid-template-areas:'stack'] align-baseline text-left min-w-[200px] sm:min-w-[340px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="[grid-area:stack] whitespace-nowrap text-gradient drop-shadow-[0_0_35px_rgba(168,85,247,0.5)] will-change-transform"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.h2>
    </div>
  );
}
