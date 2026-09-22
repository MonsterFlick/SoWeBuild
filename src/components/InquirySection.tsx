"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ResponsiveDeviceFrame } from "@/components/DeviceSlab";

export function InquirySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the pinned 2-scroll height section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) across the scroll distance
  // 0.05 -> 0.85 maps to 0% -> 100% path completion
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);
  const rawPercent = useTransform(scrollYProgress, [0.05, 0.85], [0, 100]);
  const opacityGlow = useTransform(scrollYProgress, [0.05, 0.3, 0.85], [0.3, 0.8, 1]);

  return (
    <section
      ref={containerRef}
      id="inquiry"
      data-section
      data-mode="form"
      className="relative h-[200vh] lg:h-[220vh] bg-background select-none"
    >
      {/* Sticky view container pinned during scroll */}
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-start pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-10 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03] font-display text-[14vw] font-bold leading-none select-none text-center">
          START<br />BUILDING
        </div>
        <div className="halo pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 opacity-70" />

        <div className="relative mx-auto w-full max-w-4xl flex flex-col items-center text-center z-10">
          {/* Animated Scroll Progress Header Badge */}
          <motion.div
            style={{ opacity: opacityGlow }}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/50 bg-primary/10 px-4.5 py-1.5 font-mono text-[11px] font-bold text-primary-glow shadow-lg shadow-primary/25 backdrop-blur-xl mb-3"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="tracking-wider uppercase">
              Scroll To Trace Electric Laser Border ↓
            </span>
          </motion.div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Start Your Project
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-md">
            Scroll down to complete the neon border trace around the inquiry slab.
          </p>

          {/* Form Slab Container (Rendered directly in-flow on both desktop & mobile) */}
          <div className="relative mt-6 flex justify-center items-center w-full max-w-full">
            <ResponsiveDeviceFrame mode="form" pathLength={pathLength} />
          </div>
        </div>
      </div>
    </section>
  );
}
