"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COMMANDS = [
  { text: "$ sowebuild deploy --env=dev", delay: 0 },
];

const BUILD_LOGS = [
  "▸ Compiling Next.js 15 with Turbopack...",
  "▸ Bundling 127 modules...",
  "▸ Optimizing images (AVIF/WebP)...",
  "▸ Generating static pages (14/14)...",
  "▸ Running edge middleware...",
  "▸ Deploying to 5 CDN regions...",
  "",
  "✓ Build completed in 12.4s",
  "",
];

const SCORES = [
  { label: "Performance", value: 98 },
  { label: "Accessibility", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "SEO", value: 100 },
  { label: "LCP", value: "0.3s" },
];

export default function TerminalDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"typing" | "building" | "scores" | "done">("typing");
  const [progress, setProgress] = useState(0);
  const [scoreValues, setScoreValues] = useState<number[]>([0, 0, 0, 0]);
  const [isLive, setIsLive] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => setHasTriggered(true),
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!hasTriggered) return;

    const command = COMMANDS[0].text;
    let charIndex = 0;

    // Phase 1: Type command
    const typeInterval = setInterval(() => {
      setLines([command.slice(0, charIndex + 1)]);
      charIndex++;
      if (charIndex >= command.length) {
        clearInterval(typeInterval);

        // Phase 2: Build logs
        setTimeout(() => {
          setPhase("building");
          let logIndex = 0;

          const logInterval = setInterval(() => {
            if (logIndex < BUILD_LOGS.length) {
              setLines((prev) => [...prev, BUILD_LOGS[logIndex]]);
              logIndex++;
            } else {
              clearInterval(logInterval);

              // Progress bar
              const progInterval = setInterval(() => {
                setProgress((p) => {
                  if (p >= 100) {
                    clearInterval(progInterval);
                    setPhase("scores");

                    // Animate scores
                    SCORES.forEach((score, i) => {
                      if (typeof score.value === "number") {
                        gsap.to(
                          { val: 0 },
                          {
                            val: score.value,
                            duration: 1.2,
                            delay: i * 0.15,
                            ease: "power2.out",
                            onUpdate: function () {
                              setScoreValues((prev) => {
                                const next = [...prev];
                                next[i] = Math.round(this.targets()[0].val);
                                return next;
                              });
                            },
                          }
                        );
                      }
                    });

                    setTimeout(() => {
                      setIsLive(true);
                      setPhase("done");
                    }, 1500);

                    return 100;
                  }
                  return p + 2;
                });
              }, 30);
            }
          }, 200);
        }, 400);
      }
    }, 40);

    return () => {
      clearInterval(typeInterval);
    };
  }, [hasTriggered]);

  return (
    <div
      ref={containerRef}
      style={{
        background: "#0a0a10",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: "0.8125rem",
        lineHeight: 1.7,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid var(--color-border)",
          background: "rgba(15, 15, 20, 0.5)",
        }}
      >
        <div style={{ display: "flex", gap: "0.375rem" }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
        </div>
        <span style={{ color: "#55555f", fontSize: "0.6875rem", marginLeft: "0.5rem" }}>
          terminal — sowebuild
        </span>
        {isLive && (
          <span
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.125rem 0.5rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(198, 255, 61, 0.1)",
              color: "#c6ff3d",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#c6ff3d",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            LIVE
          </span>
        )}
      </div>

      {/* Terminal body */}
      <div style={{ padding: "1.25rem", minHeight: "280px", color: "#8a8a99" }}>
        {lines.map((line, i) => (
          <div key={i} style={{ color: i === 0 ? "#c6ff3d" : "#8a8a99" }}>
            {line}
          </div>
        ))}

        {/* Progress bar */}
        {phase === "building" && progress > 0 && (
          <div style={{ marginTop: "0.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 4,
                  background: "#1a1a24",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "#c6ff3d",
                    transition: "width 0.1s linear",
                    borderRadius: 2,
                  }}
                />
              </div>
              <span style={{ color: "#55555f", fontSize: "0.75rem" }}>{progress}%</span>
            </div>
          </div>
        )}

        {/* Lighthouse scores */}
        {(phase === "scores" || phase === "done") && (
          <div
            style={{
              marginTop: "1rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {SCORES.map((score, i) => (
              <div
                key={score.label}
                style={{
                  textAlign: "center",
                  padding: "0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  background: "rgba(198, 255, 61, 0.02)",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color:
                      typeof score.value === "number" && scoreValues[i] >= 90
                        ? "#c6ff3d"
                        : "#f3efe6",
                  }}
                >
                  {typeof score.value === "number" ? scoreValues[i] : score.value}
                </div>
                <div style={{ fontSize: "0.5625rem", color: "#55555f", marginTop: "0.25rem" }}>
                  {score.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
