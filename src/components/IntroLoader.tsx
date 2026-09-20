"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimationControls } from "motion/react";

export function IntroLoader({
  onComplete,
  onStartReveal,
}: {
  onComplete: () => void;
  onStartReveal?: () => void;
}) {
  const [stage, setStage] = useState<"slash" | "text" | "flying" | "done">("slash");
  const logoControls = useAnimationControls();
  const bgControls = useAnimationControls();

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onStartRevealRef = useRef(onStartReveal);
  onStartRevealRef.current = onStartReveal;

  useEffect(() => {
    // Stage 1: Slash appears immediately (0ms)
    
    // Stage 2: Text reveals next to slash at 700ms
    const t1 = setTimeout(() => {
      setStage("text");
    }, 700);

    // Stage 3: Smooth single-pass fly animation to top-left at 1600ms
    const t2 = setTimeout(() => {
      setStage("flying");

      const targetX = typeof window !== "undefined" ? -window.innerWidth / 2 + 120 : -350;
      const targetY = typeof window !== "undefined" ? -window.innerHeight / 2 + 38 : -250;

      // Start the one-way glide animation
      logoControls.start({
        x: targetX,
        y: targetY,
        scale: 0.72,
        opacity: 0,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      });

      bgControls.start({
        opacity: 0,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      });

      // Trigger site reveal near end of flight
      setTimeout(() => {
        onStartRevealRef.current?.();
      }, 700);
    }, 1600);

    // Stage 4: Clean unmount at 3000ms
    const t3 = setTimeout(() => {
      setStage("done");
      onCompleteRef.current?.();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [bgControls, logoControls]);

  if (stage === "done") return null;

  return (
    <motion.div
      key="intro-overlay"
      initial={{ opacity: 1 }}
      animate={bgControls}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-none"
    >
      <div className="grid-field absolute inset-0 opacity-20" />

      {/* Center Animated Logo Container that transitions to top-left */}
      <motion.div
        initial={{ scale: 1.4, x: 0, y: 0, opacity: 1 }}
        animate={logoControls}
        className="relative flex items-center gap-4 select-none"
      >
        {/* Animated SVG Forward Slash / */}
        <div className="relative flex items-center justify-center">
          <motion.svg
            viewBox="0 0 40 60"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-7 h-14 fill-current text-foreground drop-shadow-[0_0_25px_var(--primary-glow)]"
          >
            <polygon points="26,2 38,2 14,58 2,58" />
          </motion.svg>
        </div>

        {/* Typography Text reveal */}
        {stage !== "slash" && (
          <motion.div
            initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center leading-[0.88] font-display tracking-[0.16em] font-bold"
          >
            <span className="text-sm uppercase text-foreground">SO WE</span>
            <span className="text-xl uppercase text-foreground">
              BUILD<span className="text-primary-glow">.IN</span>
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Cinematic glow pulse behind slash */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: stage === "flying" ? 2 : 1,
          opacity: stage === "flying" ? 0 : 0.6,
        }}
        transition={{ duration: 1 }}
        className="halo absolute size-[320px] rounded-full"
      />
    </motion.div>
  );
}
