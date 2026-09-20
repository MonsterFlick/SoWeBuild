"use client";

import { motion } from "motion/react";

export function Logo({ size = "normal" }: { size?: "small" | "normal" | "large" }) {
  const isSmall = size === "small";
  const isLarge = size === "large";

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="inline-flex items-center gap-2.5 select-none cursor-pointer group"
    >
      {/* SVG Geometric Forward Slash / */}
      <div className="relative flex items-center justify-center">
        <motion.svg
          viewBox="0 0 40 60"
          variants={{
            initial: { rotate: 0, scale: 1 },
            hover: { rotate: -6, scale: 1.08 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className={`${
            isSmall ? "w-3 h-6" : isLarge ? "w-6 h-12" : "w-4.5 h-9"
          } fill-current text-foreground transition-colors duration-300 group-hover:text-primary-glow drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_18px_var(--primary-glow)]`}
        >
          <polygon points="26,2 38,2 14,58 2,58" />
        </motion.svg>
      </div>

      {/* Stacked Typography */}
      <div className="flex flex-col justify-center leading-[0.9] font-display tracking-[0.14em] font-bold">
        <motion.span
          variants={{
            initial: { x: 0 },
            hover: { x: 2 },
          }}
          transition={{ duration: 0.3 }}
          className={`uppercase text-foreground ${
            isSmall ? "text-[10px]" : isLarge ? "text-xl" : "text-xs sm:text-sm"
          }`}
        >
          SO WE
        </motion.span>
        <motion.span
          variants={{
            initial: { x: 0 },
            hover: { x: 3 },
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className={`uppercase text-foreground ${
            isSmall ? "text-[11px]" : isLarge ? "text-2xl" : "text-sm sm:text-base"
          }`}
        >
          BUILD<span className="text-primary-glow">.IN</span>
        </motion.span>
      </div>
    </motion.div>
  );
}
