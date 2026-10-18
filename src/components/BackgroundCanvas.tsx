"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseX: number;
  baseY: number;
  alpha: number;
  color: string;
  speed: number;
  angle: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 55;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    const colorAccent = "rgba(198, 255, 61, 0.4)";
    const colorDim = "rgba(120, 120, 140, 0.25)";

    const initParticles = () => {
      particles = [];
      const centerX = width / 2;
      const centerY = height / 2;
      const minRadius = Math.min(width, height) * 0.32; // Keep center clear of particles
      const maxRadius = Math.max(width, height) * 0.65;

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const dist = minRadius + Math.random() * (maxRadius - minRadius);
        const x = centerX + Math.cos(angle) * dist * 1.2;
        const y = centerY + Math.sin(angle) * dist * 0.8;

        const isAccent = Math.random() > 0.82;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: isAccent ? 1.5 + Math.random() * 1 : 1 + Math.random() * 0.8,
          alpha: isAccent ? 0.45 : 0.25,
          color: isAccent ? colorAccent : colorDim,
          speed: 0.0002 + Math.random() * 0.0003,
          angle,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Smooth mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / width - 0.5) * 20;
      targetY = (e.clientY / height - 0.5) * 20;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    let animId: number;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      animId = requestAnimationFrame(render);

      if (!isVisible) return;

      // Smooth lerp mouse parallax
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;

        // Subtle slow orbital drift around center
        const dx = p.baseX - centerX;
        const dy = p.baseY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const currentAngle = Math.atan2(dy, dx) + p.speed;

        p.baseX = centerX + Math.cos(currentAngle) * dist;
        p.baseY = centerY + Math.sin(currentAngle) * dist;

        // Apply mouse parallax
        p.x = p.baseX + mouseX;
        p.y = p.baseY + mouseY;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
