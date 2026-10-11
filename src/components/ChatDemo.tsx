"use client";

import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface Message {
  type: "user" | "bot" | "system";
  text: string;
  delay: number;
}

const MESSAGES: Message[] = [
  { type: "user", text: "Hi, I need a website for my clinic", delay: 0 },
  { type: "bot", text: "Welcome to SoWeBuild! 👋 I'd love to help. What type of clinic do you run?", delay: 1200 },
  { type: "user", text: "Orthopedic surgery center. We need patient portal + appointment booking", delay: 2800 },
  { type: "bot", text: "Got it. I'll set up a discovery call and share a live prototype by next week. Here's what we'll build:", delay: 4200 },
  { type: "system", text: "📋 Project Brief Generated\n• Patient portal with HIPAA compliance\n• Real-time appointment booking\n• Doctor dashboard\n• Mobile-responsive design\n\nEstimate: 4-6 weeks\nDev server: live from Week 1", delay: 5800 },
  { type: "bot", text: "Your dev server is being provisioned now. You'll have a live URL within 48 hours. ✅", delay: 7500 },
];

export default function ChatDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
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

    const timeouts: NodeJS.Timeout[] = [];

    MESSAGES.forEach((msg, i) => {
      // Show typing indicator before bot messages
      if (msg.type === "bot") {
        timeouts.push(
          setTimeout(() => {
            setIsTyping(true);
          }, msg.delay - 800)
        );
      }

      timeouts.push(
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(i + 1);
        }, msg.delay)
      );
    });

    return () => timeouts.forEach(clearTimeout);
  }, [hasTriggered]);

  return (
    <div
      ref={containerRef}
      style={{
        background: "#0a0a10",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        maxWidth: "420px",
        width: "100%",
      }}
    >
      {/* Phone header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--color-border)",
          background: "rgba(15, 15, 20, 0.5)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #c6ff3d, #88cc00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "#07070a",
          }}
        >
          S
        </div>
        <div>
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f3efe6" }}>
            SoWeBuild Bot
          </div>
          <div style={{ fontSize: "0.6875rem", color: "#c6ff3d" }}>Online</div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          padding: "1.25rem",
          minHeight: "360px",
          maxHeight: "400px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {MESSAGES.slice(0, visibleMessages).map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
              animation: "fadeInUp 0.3s ease-out",
            }}
          >
            <div
              style={{
                maxWidth: msg.type === "system" ? "100%" : "80%",
                padding: msg.type === "system" ? "1rem" : "0.75rem 1rem",
                borderRadius:
                  msg.type === "user"
                    ? "var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)"
                    : "var(--radius-sm) var(--radius-lg) var(--radius-lg) var(--radius-lg)",
                background:
                  msg.type === "user"
                    ? "rgba(198, 255, 61, 0.15)"
                    : msg.type === "system"
                    ? "rgba(198, 255, 61, 0.05)"
                    : "rgba(255, 255, 255, 0.05)",
                border:
                  msg.type === "system"
                    ? "1px solid rgba(198, 255, 61, 0.2)"
                    : "none",
                color: "#f3efe6",
                fontSize: "0.8125rem",
                lineHeight: 1.6,
                whiteSpace: "pre-line",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: "flex", gap: "4px", padding: "0.75rem 1rem" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#55555f",
                  animation: `typingDot 1.4s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
