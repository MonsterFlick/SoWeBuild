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
  type MotionValue,
} from "motion/react";

import { Screen, type DeviceMode } from "./screens";

const SHAPE: Record<DeviceMode, { w: number; h: number; r: number; notch: boolean }> = {
  website: { w: 520, h: 350, r: 20, notch: false },
  chatbot: { w: 340, h: 460, r: 32, notch: false },
  whatsapp: { w: 300, h: 480, r: 36, notch: false },
  dashboard: { w: 540, h: 360, r: 16, notch: false },
  form: { w: 450, h: 575, r: 22, notch: false },
};

export function DeviceFrame({
  mode,
  className,
  pathLength,
}: {
  mode: DeviceMode;
  className?: string;
  pathLength?: MotionValue<number>;
}) {
  const s = SHAPE[mode];
  const isForm = mode === "form";

  return (
    <motion.div
      animate={{ width: s.w, height: s.h, borderRadius: s.r + 10 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-visible p-[7px] bg-gradient-to-b from-white/15 via-black/90 to-purple-950/80 border border-white/20 rounded-[inherit] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.95),0_0_90px_rgba(168,85,247,0.35)] backdrop-blur-3xl ${className ?? ""}`}
    >
      {/* Outer Multi-Layer Neon Glow Aura */}
      <div
        className={`absolute -inset-3 rounded-[inherit] bg-gradient-to-tr ${
          isForm
            ? "from-purple-600/60 via-emerald-400/50 to-cyan-400/60 blur-3xl opacity-90 animate-pulse"
            : "from-primary/50 via-primary-glow/40 to-accent/40 blur-2xl opacity-75 animate-pulse"
        } -z-10 pointer-events-none`}
      />

      {/* Scroll-Driven Animated Integrated Fiber-Optic Glass Border */}
      {pathLength && (
        <svg
          className="absolute -inset-[2px] size-[calc(100%+4px)] pointer-events-none z-30 overflow-visible"
          viewBox={`0 0 ${s.w + 4} ${s.h + 4}`}
        >
          <defs>
            <linearGradient id="sleek-fiber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* 1. Subtle Glass Guide Track */}
          <rect
            x="2"
            y="2"
            width={s.w}
            height={s.h}
            rx={s.r + 8}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />

          {/* 2. Soft Ambient Sheen Layer */}
          <motion.rect
            x="2"
            y="2"
            width={s.w}
            height={s.h}
            rx={s.r + 8}
            fill="none"
            stroke="url(#sleek-fiber-grad)"
            strokeWidth="5"
            opacity="0.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
          />

          {/* 3. Sleek Integrated Fiber-Optic Light Rim */}
          <motion.rect
            x="2"
            y="2"
            width={s.w}
            height={s.h}
            rx={s.r + 8}
            fill="none"
            stroke="url(#sleek-fiber-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
          />
        </svg>
      )}

      {/* Main Inner Screen Area */}
      <div
        className="ring-inner relative h-full w-full overflow-hidden bg-background"
        style={{ borderRadius: s.r }}
      >
        <AnimatePresence>
          <motion.div
            key={mode}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Screen mode={mode} />
          </motion.div>
        </AnimatePresence>

        {/* Diagonal Sheen Reflection */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/[0.04] to-foreground/[0.08]" />
      </div>
    </motion.div>
  );
}

export function ResponsiveDeviceFrame({
  mode,
  className,
  pathLength,
}: {
  mode: DeviceMode;
  className?: string;
  pathLength?: MotionValue<number>;
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
  const h = mounted ? Math.round(s.h * scale) : undefined;

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-visible flex items-center justify-center max-w-full mx-auto ${className ?? ""}`}
      style={{
        width: w,
        height: h,
        aspectRatio: !mounted ? `${s.w} / ${s.h}` : undefined,
        maxWidth: s.w,
      }}
    >
      <div
        style={{
          width: s.w,
          height: s.h,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
          position: "absolute",
          top: 0,
          left: "50%",
        }}
      >
        <DeviceFrame mode={mode} pathLength={pathLength} />
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isDesktop) return null;

  return <DesktopDeviceSlab mode={mode} activeSection={activeSection} />;
}

function DesktopDeviceSlab({
  mode,
  activeSection,
}: {
  mode: DeviceMode;
  activeSection?: string;
}) {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 280, damping: 28, mass: 0.2 });

  // Floating desktop slab only active for hero and morph sections
  const isHideSection = activeSection !== "home" && activeSection !== "morph";
  const isCentered = false;
  const currentMode = mode;

  const rawX = useTransform(p, [0, 0.2, 0.42, 0.6, 0.8, 1], [-1, -6, 2, -4, -8, 1]);
  const rawY = useTransform(p, [0, 0.2, 0.42, 0.6, 0.8, 1], [-6, -4, 4, -2, 6, -3]);
  const scale = useTransform(p, [0, 0.3, 0.6, 0.85, 1], [1.12, 0.96, 1.05, 0.96, 0.8]);
  const scrollTilt = useTransform(p, [0, 0.2, 1], [0, -2, 8]);

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

  if (isHideSection) return null;

  return (
    <motion.div
      animate={{
        x: isCentered ? "0vw" : "25vw",
        opacity: isHideSection ? 0 : 1,
        scale: isHideSection ? 0.85 : isCentered ? 1.05 : 1,
        pointerEvents: isCentered ? "auto" : "none",
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-30 hidden items-center justify-center lg:flex"
    >
      <motion.div
        style={{
          x: isCentered ? 0 : x,
          y: isCentered ? 80 : y,
          scale: isCentered ? 0.95 : scale,
          perspective: 1400,
        }}
        className="relative flex items-center justify-center"
      >
        <div className="halo absolute size-[450px] opacity-75 pointer-events-none" />
        <motion.div
          style={{
            rotateY: isCentered ? 0 : rotY,
            rotateX: isCentered ? 0 : rotX,
            rotateZ: isCentered ? 0 : rotZ,
            transformStyle: "preserve-3d",
          }}
        >
          <DeviceFrame mode={currentMode} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
