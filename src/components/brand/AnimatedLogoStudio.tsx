"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedLogoStudio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.5 | 1 | 2>(1);
  const [activeTab, setActiveTab] = useState<"mp4" | "gif" | "canvas">("mp4");

  // Real-time canvas animation loop with high-DPI rendering and seamless motion
  useEffect(() => {
    if (activeTab !== "canvas") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      if (!isPlaying) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) * 0.001 * playbackSpeed;
      const t = (elapsed % 2.5) / 2.5; // seamless 2.5 second loop

      const width = canvas.width;
      const height = canvas.height;

      // Warm Ivory Canvas background
      ctx.fillStyle = "#FAF8F5";
      ctx.fillRect(0, 0, width, height);

      // Subtle blueprint matrix grid dots
      ctx.fillStyle = "rgba(22, 17, 36, 0.035)";
      for (let x = 24; x < width; x += 48) {
        for (let y = 24; y < height; y += 48) {
          ctx.fillRect(x, y, 2, 2);
        }
      }

      // Breathing Royal Violet ambient radial aura
      const pulse = 0.10 + 0.05 * Math.sin(t * Math.PI * 2);
      const rad = ctx.createRadialGradient(width * 0.38, height * 0.5, 40, width * 0.38, height * 0.5, 600);
      rad.addColorStop(0, `rgba(124, 58, 237, ${pulse})`);
      rad.addColorStop(0.6, `rgba(109, 40, 217, ${pulse * 0.3})`);
      rad.addColorStop(1, "rgba(250, 248, 245, 0)");
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, width, height);

      // Layout coordinates (scale based on 1920x1080)
      const scale = 7.2;
      const slashW = 40 * scale;
      const slashH = 60 * scale;
      const slashX = 360;
      const slashY = (height - slashH) / 2;

      // Draw Slash Mark
      ctx.save();
      ctx.translate(slashX, slashY);

      const polyGrad = ctx.createLinearGradient(0, 0, slashW, slashH);
      polyGrad.addColorStop(0, "#9333EA");
      polyGrad.addColorStop(0.6, "#7C3AED");
      polyGrad.addColorStop(1, "#6D28D9");

      ctx.shadowColor = "rgba(124, 58, 237, 0.35)";
      ctx.shadowBlur = 36;
      ctx.fillStyle = polyGrad;

      ctx.beginPath();
      ctx.moveTo(26 * scale, 2 * scale);
      ctx.lineTo(38 * scale, 2 * scale);
      ctx.lineTo(14 * scale, 58 * scale);
      ctx.lineTo(2 * scale, 58 * scale);
      ctx.closePath();
      ctx.fill();

      // Specular flare sweep (smoothstep from t=0.1 to t=0.7)
      if (t >= 0.1 && t <= 0.7) {
        const p = (t - 0.1) / 0.6;
        const smoothP = p * p * (3 - 2 * p);
        const flareY = -60 + smoothP * (slashH + 120);
        const flareAlpha = Math.sin(p * Math.PI) * 0.95;

        ctx.save();
        ctx.clip();
        const flareGrad = ctx.createLinearGradient(0, flareY - 90, 0, flareY + 90);
        flareGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        flareGrad.addColorStop(0.5, `rgba(255, 255, 255, ${flareAlpha})`);
        flareGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = flareGrad;
        ctx.fillRect(0, flareY - 90, slashW, 180);
        ctx.restore();
      }

      ctx.restore();

      // Rock-Solid Typography (Zero bobbing)
      const textX = slashX + slashW + 72;
      const textY = slashY + 144;

      ctx.save();
      ctx.translate(textX, textY);

      // "SO WE"
      ctx.fillStyle = "#161124";
      ctx.font = '700 96px var(--font-syne), "Syne", system-ui, sans-serif';
      ctx.letterSpacing = "10px";
      ctx.fillText("SO WE", 0, 0);

      // "BUILD"
      ctx.font = '700 120px var(--font-syne), "Syne", system-ui, sans-serif';
      ctx.letterSpacing = "4px";
      ctx.fillText("BUILD", 0, 126);

      // ".IN"
      const bMetrics = ctx.measureText("BUILD");
      ctx.fillStyle = "#7C3AED";

      let inGlow = 18;
      if (t >= 0.55 && t <= 0.85) {
        const shP = (t - 0.55) / 0.3;
        inGlow += Math.sin(shP * Math.PI) * 22;
      }
      ctx.shadowColor = "rgba(124, 58, 237, 0.45)";
      ctx.shadowBlur = inGlow;
      ctx.fillText(".IN", bMetrics.width + 12, 126);

      ctx.restore();

      // Subtitle
      ctx.font = '500 24px var(--font-jetbrains-mono), "JetBrains Mono", monospace';
      ctx.letterSpacing = "10px";
      ctx.fillStyle = "#5A5068";
      ctx.fillText("TECHNOLOGY STUDIO // SOWEBUILD.IN", textX, textY + 236);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [activeTab, isPlaying, playbackSpeed]);

  return (
    <section id="motion" className="relative py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Motion Design
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Animated Brand Assets
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Rendered frame-by-frame via 100% code (Canvas &amp; H.264 WebCodecs, zero AI images). Optimized for website hero intros, video titles, and social announcement reels.
          </p>
        </div>

        {/* Media Switcher */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#E8DFF2] bg-white p-1 font-mono text-xs shadow-sm">
          <button
            onClick={() => setActiveTab("mp4")}
            className={`rounded-full px-3.5 py-1 transition-all cursor-pointer ${
              activeTab === "mp4"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            MP4 Video (60fps)
          </button>
          <button
            onClick={() => setActiveTab("gif")}
            className={`rounded-full px-3.5 py-1 transition-all cursor-pointer ${
              activeTab === "gif"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Animated GIF
          </button>
          <button
            onClick={() => setActiveTab("canvas")}
            className={`rounded-full px-3.5 py-1 transition-all cursor-pointer ${
              activeTab === "canvas"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Live Canvas Studio
          </button>
        </div>
      </div>

      {/* Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[#E8DFF2] bg-white p-6 sm:p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Main Visual Player */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl border border-[#E8DFF2] bg-[#FAF8F5] shadow-inner flex items-center justify-center">
              {activeTab === "mp4" && (
                <video
                  src="/brand/sowebuild-animated.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="size-full object-contain"
                />
              )}

              {activeTab === "gif" && (
                <img
                  src="/brand/sowebuild-animated.gif"
                  alt="SoWeBuild Animated Brand GIF"
                  className="size-full object-contain"
                />
              )}

              {activeTab === "canvas" && (
                <canvas
                  ref={canvasRef}
                  width={1920}
                  height={1080}
                  className="size-full object-contain"
                />
              )}

              {/* Status Pill */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-[#E8DFF2] bg-white/90 px-3 py-1 font-mono text-[10px] text-foreground backdrop-blur-md shadow-xs">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {activeTab === "mp4" ? "H.264 // 60 FPS // 1080p FULL HD" : activeTab === "gif" ? "GIF89a // 50 FRAMES // 25 FPS LOOP" : "LIVE 2D RETINA CANVAS"}
                </span>
              </div>
            </div>

            {/* Canvas Controls if in canvas mode */}
            {activeTab === "canvas" && (
              <div className="mt-4 flex items-center gap-4 rounded-full border border-[#E8DFF2] bg-[#FAF8F5] px-4 py-2 font-mono text-xs">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Play
                    </>
                  )}
                </button>

                <span className="text-muted-foreground/30">|</span>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>Speed:</span>
                  {([0.5, 1, 2] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setPlaybackSpeed(s)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        playbackSpeed === s ? "bg-primary text-white font-bold" : "hover:text-foreground"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Technical Spec & Action Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                Pure Code Generation
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
                Cinematic Motion System
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Engineered with procedural math and timing curves. The diagonal slash initiates with a smooth specular laser sweep followed by harmonic typographic reveal and seamless zero-pop looping.
              </p>

              {/* Specs Table */}
              <div className="mt-5 space-y-2 border-t border-[#E8DFF2] pt-4 font-mono text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Aspect Ratio</span>
                  <span className="text-foreground font-semibold">16:9 Landscape</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Loop Duration</span>
                  <span className="text-foreground font-semibold">2.50 Seconds</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Theme Matrix</span>
                  <span className="text-foreground font-semibold">Ivory Violet (#FAF8F5)</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frame Rate</span>
                  <span className="text-foreground font-semibold">60 FPS Ultra-Smooth</span>
                </div>
              </div>
            </div>

            {/* Direct Download Actions */}
            <div className="space-y-3 pt-4 border-t border-[#E8DFF2]">
              <a
                href="/brand/sowebuild-animated.mp4"
                download="sowebuild-animated.mp4"
                className="group flex w-full items-center justify-between rounded-xl bg-primary px-4 py-3 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-hover"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  <span>Download Animated MP4 (60fps)</span>
                </div>
                <span className="text-[10px] opacity-80 group-hover:translate-x-0.5 transition-transform">
                  1080p60 ↓
                </span>
              </a>

              <a
                href="/brand/sowebuild-animated.gif"
                download="sowebuild-animated.gif"
                className="group flex w-full items-center justify-between rounded-xl border border-[#E8DFF2] bg-[#FAF8F5] px-4 py-3 font-mono text-xs font-semibold text-foreground transition-all hover:bg-[#F5EDFA] hover:border-primary/30"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Download Animated GIF</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:translate-x-0.5 transition-transform">
                  HD Loop ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
