"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedLogoStudio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.5 | 1 | 2>(1);
  const [activeTab, setActiveTab] = useState<"mp4" | "gif" | "canvas">("mp4");

  // Real-time canvas animation loop
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
      const t = (elapsed % 2.5) / 2.5; // loop every 2.5 seconds

      const width = canvas.width;
      const height = canvas.height;

      // Dark Void background
      ctx.fillStyle = "#120F1D";
      ctx.fillRect(0, 0, width, height);

      // Blueprint matrix grid dots
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      for (let x = 20; x < width; x += 36) {
        for (let y = 20; y < height; y += 36) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      // Breathing electric violet aura
      const pulse = 0.35 + 0.2 * Math.sin(t * Math.PI * 2);
      const rad = ctx.createRadialGradient(width * 0.3, height * 0.5, 20, width * 0.3, height * 0.5, 240);
      rad.addColorStop(0, `rgba(232, 112, 253, ${pulse})`);
      rad.addColorStop(0.5, `rgba(188, 55, 237, ${pulse * 0.6})`);
      rad.addColorStop(1, "rgba(18, 15, 29, 0)");
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, width, height);

      // Geometric slash
      const slashScale = 2.4;
      const slashX = width * 0.2;
      const slashY = height * 0.5 - 30 * slashScale;

      ctx.save();
      ctx.translate(slashX, slashY);

      const polyGrad = ctx.createLinearGradient(0, 0, 40 * slashScale, 60 * slashScale);
      polyGrad.addColorStop(0, "#FFFFFF");
      polyGrad.addColorStop(0.4, "#E870FD");
      polyGrad.addColorStop(1, "#BC37ED");

      ctx.shadowColor = "rgba(232, 112, 253, 0.85)";
      ctx.shadowBlur = 24 + 10 * Math.sin(t * Math.PI * 2);
      ctx.fillStyle = polyGrad;

      ctx.beginPath();
      ctx.moveTo(26 * slashScale, 2 * slashScale);
      ctx.lineTo(38 * slashScale, 2 * slashScale);
      ctx.lineTo(14 * slashScale, 58 * slashScale);
      ctx.lineTo(2 * slashScale, 58 * slashScale);
      ctx.closePath();
      ctx.fill();

      // Specular flare moving across diagonal
      const flareY = ((t * 1.4) % 1) * (60 * slashScale);
      ctx.save();
      ctx.clip();
      const flareGrad = ctx.createLinearGradient(0, flareY - 35, 0, flareY + 35);
      flareGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      flareGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.95)");
      flareGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, flareY - 35, 40 * slashScale, 70);
      ctx.restore();

      ctx.restore();

      // Kinetic Typography
      const floatY = Math.sin(t * Math.PI * 2) * 2;
      ctx.save();
      ctx.translate(slashX + 115, slashY + 54 + floatY);

      // "SO WE"
      ctx.fillStyle = "#F8F7FA";
      ctx.font = '700 36px "Space Grotesk", sans-serif';
      ctx.letterSpacing = "5px";
      ctx.fillText("SO WE", 0, 0);

      // "BUILD"
      ctx.font = '700 44px "Space Grotesk", sans-serif';
      ctx.fillText("BUILD", 0, 46);

      // ".IN"
      const bMetrics = ctx.measureText("BUILD");
      ctx.fillStyle = "#E870FD";
      ctx.shadowColor = "rgba(232, 112, 253, 0.85)";
      ctx.shadowBlur = 16 + 8 * Math.cos(t * Math.PI * 2);
      ctx.fillText(".IN", bMetrics.width + 4, 46);

      ctx.restore();

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
            Rendered frame-by-frame via 100% code (WebCodecs & Canvas algorithms, zero AI images). Optimized for website hero intros, video titles, and social announcement reels.
          </p>
        </div>

        {/* Media Switcher */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab("mp4")}
            className={`rounded-full px-3.5 py-1 transition-all ${
              activeTab === "mp4"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            MP4 Video (60fps)
          </button>
          <button
            onClick={() => setActiveTab("gif")}
            className={`rounded-full px-3.5 py-1 transition-all ${
              activeTab === "gif"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Animated GIF
          </button>
          <button
            onClick={() => setActiveTab("canvas")}
            className={`rounded-full px-3.5 py-1 transition-all ${
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
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Main Visual Player */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#120F1D] shadow-[0_0_50px_rgba(188,55,237,0.15)] flex items-center justify-center">
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
                  width={640}
                  height={360}
                  className="size-full object-contain"
                />
              )}

              {/* Status Pill */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {activeTab === "mp4" ? "H.264 // 60 FPS // 960×540" : activeTab === "gif" ? "GIF89a // 36 FRAMES // LOOP" : "LIVE 2D CANVAS PIPELINE"}
                </span>
              </div>
            </div>

            {/* Canvas Controls if in canvas mode */}
            {activeTab === "canvas" && (
              <div className="mt-4 flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 text-foreground hover:text-primary-glow transition-colors"
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

                <span className="text-white/20">|</span>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>Speed:</span>
                  {([0.5, 1, 2] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setPlaybackSpeed(s)}
                      className={`px-1.5 py-0.5 rounded ${
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
              <div className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
                Pure Code Generation
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
                Cinematic Motion System
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Engineered with procedural math and timing curves. The diagonal slash initiates with a specular laser sweep followed by harmonic typographic reveal and neon resonance.
              </p>

              {/* Specs Table */}
              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 font-mono text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Aspect Ratio</span>
                  <span className="text-foreground font-semibold">16:9 Landscape</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Loop Duration</span>
                  <span className="text-foreground font-semibold">3.00 Seconds</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Resolution</span>
                  <span className="text-foreground font-semibold">960×540 / 640×360</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Color Mode</span>
                  <span className="text-foreground font-semibold">sRGB Full Range</span>
                </div>
              </div>
            </div>

            {/* Direct Download Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href="/brand/sowebuild-animated.mp4"
                download="sowebuild-animated.mp4"
                className="group flex w-full items-center justify-between rounded-xl bg-primary px-4 py-3 font-mono text-xs font-semibold text-white shadow-[0_0_25px_rgba(188,55,237,0.4)] transition-all hover:bg-primary-glow"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  <span>Download Animated MP4</span>
                </div>
                <span className="text-[10px] opacity-80 group-hover:translate-x-0.5 transition-transform">
                  672 KB ↓
                </span>
              </a>

              <a
                href="/brand/sowebuild-animated.gif"
                download="sowebuild-animated.gif"
                className="group flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-mono text-xs font-semibold text-foreground transition-all hover:bg-white/10 hover:border-white/30"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="size-4 text-primary-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Download Animated GIF</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:translate-x-0.5 transition-transform">
                  838 KB ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
