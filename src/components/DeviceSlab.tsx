"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { Screen, type DeviceMode } from "./screens";

const SHAPE: Record<DeviceMode, { w: number; h: number; r: number; notch: boolean }> = {
  website: { w: 470, h: 320, r: 18, notch: false },
  chatbot: { w: 310, h: 420, r: 30, notch: false },
  whatsapp: { w: 270, h: 450, r: 38, notch: true },
  dashboard: { w: 490, h: 330, r: 14, notch: false },
  form: { w: 450, h: 575, r: 22, notch: false },
};

export function DeviceFrame({ mode, className }: { mode: DeviceMode; className?: string }) {
  const s = SHAPE[mode];
  return (
    <motion.div
      animate={{ width: s.w, height: s.h, borderRadius: s.r + 8 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-strong slab-shadow relative overflow-visible p-[6px] border border-primary/20 ${className ?? ""}`}
    >
      {/* Outer Neon Glow Ring */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-primary/30 via-primary-glow/20 to-accent/30 blur-xl opacity-60 -z-10 animate-pulse" />

      {/* Main Inner Screen Area */}
      <div
        className="ring-inner relative h-full w-full overflow-hidden bg-background"
        style={{ borderRadius: s.r }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, filter: "blur(14px)", scale: 1.05 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(14px)", scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Screen mode={mode} />
          </motion.div>
        </AnimatePresence>

        {s.notch && (
          <div className="absolute top-1.5 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-foreground/30 shadow-inner" />
        )}

        {/* Diagonal Sheen Reflection */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/[0.04] to-foreground/[0.08]" />
      </div>
    </motion.div>
  );
}

export function ResponsiveDeviceFrame({
  mode,
  className,
}: {
  mode: DeviceMode;
  className?: string;
}) {
  const s = SHAPE[mode];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current?.parentElement;
    if (!el) return;

    const measure = () => {
      const parentW = el.clientWidth;
      if (parentW > 0) {
        const factor = Math.min(1, Math.max(0.35, (parentW - 4) / s.w));
        setScale(factor);
        setMounted(true);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [s.w]);

  const w = mounted ? Math.round(s.w * scale) : "100%";
  const h = mounted ? Math.round(s.h * scale) : s.h;

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden flex items-center justify-center max-w-full mx-auto ${className ?? ""}`}
      style={{
        width: w,
        height: h,
        maxWidth: s.w,
      }}
    >
      <div
        style={{
          width: s.w,
          height: s.h,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <DeviceFrame mode={mode} />
      </div>
    </div>
  );
}

export function DeviceSlab({
  mode,
  activeSection,
}: {
  mode: DeviceMode;
  activeSection?: string;
}) {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.6 });

  // Fade out floating device slab starting at inquiry section
  const isHideSection = activeSection !== "home" && activeSection !== "morph";
  const isCentered = false;

  const rawX = useTransform(p, [0, 0.2, 0.42, 0.6, 0.8, 1], [-1, -6, 2, -4, -8, 1]);
  const rawY = useTransform(p, [0, 0.2, 0.42, 0.6, 0.8, 1], [2, -4, 4, -2, 6, -3]);
  const scale = useTransform(p, [0, 0.3, 0.6, 0.85, 1], [1, 0.92, 1.02, 0.94, 0.8]);
  const scrollTilt = useTransform(p, [0, 1], [-4, 8]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(mx, { stiffness: 80, damping: 18 });
  const rotX = useSpring(my, { stiffness: 80, damping: 18 });
  const rotZ = useSpring(scrollTilt, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isCentered) {
      mx.set(0);
      my.set(0);
      return;
    }
    const onMove = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      mx.set(cx * 22);
      my.set(-cy * 14);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, isCentered]);

  const x = useMotionTemplate`${rawX}vw`;
  const y = useMotionTemplate`${rawY}vh`;

  return (
    <motion.div
      animate={{
        x: isCentered ? "0vw" : "25vw",
        opacity: isHideSection ? 0 : 1,
        scale: isHideSection ? 0.85 : 1,
        pointerEvents: isCentered ? "auto" : "none",
      }}
      transition={{ duration: isHideSection ? 0.35 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-20 hidden items-center justify-center lg:flex"
    >
      <motion.div
        style={{
          x: isCentered ? 0 : x,
          y: isCentered ? 0 : y,
          scale: isCentered ? 1 : scale,
          perspective: 1400,
        }}
        className="relative flex items-center justify-center"
      >
        <div className="halo absolute size-[420px] opacity-70 pointer-events-none" />
        <motion.div
          style={{
            rotateY: isCentered ? 0 : rotY,
            rotateX: isCentered ? 0 : rotX,
            rotateZ: isCentered ? 0 : rotZ,
            transformStyle: "preserve-3d",
          }}
        >
          <DeviceFrame mode={isCentered ? "form" : mode} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
