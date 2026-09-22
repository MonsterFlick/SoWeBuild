"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* -------------------------------- High Quality Vector Icons -------------------------------- */

function AtomIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function BotIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="3" />
      <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="3" />
    </svg>
  );
}

function RocketIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.26-1.55 1.62-2.48M12 15l-3-3m3 3l5.5-5.5a4.242 4.242 0 1 0-6-6L6 9l6 6z" />
    </svg>
  );
}

function CheckIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronDownIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowUpIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export type Mode = "website" | "chatbot" | "whatsapp" | "dashboard";
export type DeviceMode = Mode | "form";

export const MODE_LABEL: Record<Mode, string> = {
  website: "Need a high-performance website?",
  chatbot: "Need an intelligent AI chatbot?",
  whatsapp: "Need automated WhatsApp bots?",
  dashboard: "Need custom software or SaaS?",
};

const shell = "absolute inset-0 flex flex-col overflow-hidden bg-background text-foreground select-none";

function Chrome({ title, status = "ONLINE" }: { title: string; status?: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5 bg-black/80 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        <span className="size-2.5 rounded-full bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
        <span className="size-2.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
        <span className="ml-2.5 truncate font-mono text-[10px] tracking-widest text-slate-300 uppercase font-bold">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-sm">
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {status}
      </div>
    </div>
  );
}

/* ---------------------------------- website --------------------------------- */

function WebsiteScreen() {
  return (
    <div className={shell}>
      <Chrome title="sowebuild.in · dev-server" status="60 FPS" />
      <div className="flex-1 flex flex-col justify-between p-3.5 space-y-3">
        {/* Top Mini Nav */}
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded bg-primary-glow" />
            <span className="font-display text-[11px] font-bold tracking-wider uppercase">SOWEBUILD</span>
          </div>
          <div className="flex gap-2">
            <span className="h-2 w-8 rounded bg-foreground/20" />
            <span className="h-2 w-8 rounded bg-foreground/20" />
            <span className="h-2.5 w-10 rounded bg-primary text-[8px] font-bold text-center text-primary-foreground flex items-center justify-center">
              DEPLOY
            </span>
          </div>
        </div>

        {/* Hero Section Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-gradient-to-br from-surface to-surface-2 p-3 space-y-2 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 size-20 bg-primary/20 rounded-full blur-xl pointer-events-none" />
          <div className="font-display text-xs font-bold tracking-tight text-gradient">
            HIGH-SPEED NEXT.JS WEB APP
          </div>
          <div className="text-[9px] text-muted-foreground leading-snug">
            Built with App Router, server components & edge rendering.
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-[8px] text-primary-glow border border-primary/30">
              LCP: 0.3s
            </span>
            <span className="rounded bg-cyan/20 px-2 py-0.5 font-mono text-[8px] text-cyan border border-cyan/30">
              TTFB: 12ms
            </span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[8px] text-emerald-400 border border-emerald-500/30">
              SEO: 100
            </span>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { title: "React 19", Icon: AtomIcon, detail: "Server Actions" },
            { title: "AI Agents", Icon: BotIcon, detail: "Vector Search" },
            { title: "Dev Server", Icon: RocketIcon, detail: "Live Testing" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="glass rounded-lg p-2 flex flex-col justify-between"
            >
              <span className="text-primary-glow">
                <item.Icon className="size-3.5" />
              </span>
              <div>
                <div className="font-display text-[10px] font-semibold">{item.title}</div>
                <div className="font-mono text-[7.5px] text-muted-foreground">{item.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Console Log Terminal */}
        <div className="rounded-lg border border-border bg-black/80 p-2 font-mono text-[8.5px] text-cyan flex items-center justify-between">
          <span className="truncate">$ sowebuild deploy --env=dev</span>
          <span className="text-emerald-400 font-bold shrink-0 flex items-center gap-1">
            <CheckIcon className="size-3 text-emerald-400 stroke-[3]" /> LIVE
          </span>
        </div>
      </div>
    </div>
  );
}
/* ---------------------------------- chatbot --------------------------------- */

const CHAT: { from: "bot" | "me"; text: string; tag?: string }[] = [
  {
    from: "bot",
    text: "Hi! I'm the SoWeBuild AI Agent. How can I scale your product today?",
    tag: "RAG Agent v4 · Live",
  },
  {
    from: "me",
    text: "Can you build a custom AI chatbot with documentation RAG & CRM sync?",
  },
  {
    from: "bot",
    text: "Yes! We engineer domain-trained RAG bots with <800ms latency & zero hallucination.",
    tag: "99.8% Grounded",
  },
];

function ChatbotScreen() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setN((v) => (v >= CHAT.length ? 1 : v + 1));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={shell}>
      {/* Mobile Smartphone Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-3.5 py-2.5 bg-black/90 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="size-6 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-[9px]">
              AI
            </div>
            <span className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-400 border border-black shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          </div>
          <div>
            <div className="text-[10px] leading-tight font-bold text-white flex items-center gap-1">
              SoWeBuild AI Agent
            </div>
            <div className="text-[8px] font-mono text-slate-400">RAG pipeline · v4.2</div>
          </div>
        </div>
        <span className="font-mono text-[7.5px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
          ONLINE
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-3 space-y-2 overflow-hidden bg-gradient-to-b from-background via-surface/40 to-background">
        {/* Active Chat Conversation Feed */}
        <div className="flex flex-col gap-2 flex-1 justify-center">
          {CHAT.slice(0, n).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[88%] flex flex-col gap-0.5 ${
                m.from === "bot" ? "self-start" : "self-end"
              }`}
            >
              <div
                className={
                  m.from === "bot"
                    ? "rounded-2xl rounded-bl-xs bg-surface-2/90 border border-white/10 px-2.5 py-1.5 text-[9.5px] leading-snug text-slate-100 shadow-sm"
                    : "rounded-2xl rounded-br-xs bg-[image:var(--gradient-violet)] px-2.5 py-1.5 text-[9.5px] leading-snug text-white font-medium shadow-md shadow-primary/20"
                }
              >
                {m.text}
              </div>
              {m.tag && (
                <span className="font-mono text-[7.5px] text-primary-glow/80 px-1 pt-0.5">
                  {m.tag}
                </span>
              )}
            </motion.div>
          ))}

          {/* AI Typing Indicator */}
          <div className="flex items-center gap-1.5 self-start rounded-full bg-surface-2 px-3 py-1 border border-white/10">
            <span className="font-mono text-[8px] text-primary-glow font-semibold">AI Thinking</span>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1 rounded-full bg-primary-glow"
                style={{ animation: `typing-dot 1.2s ${i * 0.15}s infinite` }}
              />
            ))}
          </div>
        </div>

        {/* Smartphone Bottom Input & Home Gesture Bar */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 shadow-inner">
            <span className="text-[9.5px] text-slate-400 flex-1 truncate">Ask AI Agent anything…</span>
            <span className="size-4.5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shrink-0">
              <ArrowUpIcon className="size-2.5 text-white" />
            </span>
          </div>
          <div className="h-1 w-20 rounded-full bg-white/20 mx-auto pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- whatsapp --------------------------------- */

const WA = [
  { from: "them", text: "Hey! Can I test our web app on the dev server?", time: "16:04" },
  { from: "bot", text: "Hi! Your dev environment is ready at dev.sowebuild.in. Credentials sent!", time: "16:04" },
  { from: "bot", text: "Webhook triggered: Lead qualified & stored in PostgreSQL.", time: "16:05" },
];

function WhatsappScreen() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setN((v) => (v >= WA.length ? 1 : v + 1));
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={shell}>
      {/* Authentic WhatsApp Business Header */}
      <div className="flex shrink-0 items-center justify-between bg-[#1f2c34] border-b border-white/10 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="grid size-6 place-items-center rounded-full bg-[#00a884] text-white shadow-sm font-bold text-[10px]">
              WA
            </span>
          </div>
          <div>
            <div className="text-[10px] leading-tight font-bold text-white flex items-center gap-1">
              SoWeBuild Dev Bot
              <span className="text-[#00a884]">
                <CheckIcon className="size-3 inline text-[#00a884] stroke-[3]" />
              </span>
            </div>
            <div className="text-[7.5px] font-mono text-[#8696a0]">WhatsApp Business API · 24/7</div>
          </div>
        </div>
        <span className="font-mono text-[7.5px] bg-[#00a884]/15 text-[#00a884] px-2 py-0.5 rounded-full border border-[#00a884]/30 font-bold">
          VERIFIED
        </span>
      </div>

      {/* Dark WhatsApp Theme Chat Body */}
      <div className="flex flex-1 flex-col justify-between p-3 space-y-2 overflow-hidden bg-[#0b141a]">
        <div className="flex flex-col gap-2 flex-1 justify-center">
          {WA.slice(0, n).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: m.from === "bot" ? 12 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[88%] flex flex-col ${
                m.from === "bot" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div
                className={
                  m.from === "bot"
                    ? "rounded-xl rounded-tr-none bg-[#005c4b] px-3 py-1.5 text-[9.5px] text-white shadow-sm"
                    : "rounded-xl rounded-tl-none bg-[#202c33] px-3 py-1.5 text-[9.5px] text-slate-100 border border-white/5 shadow-sm"
                }
              >
                {m.text}
              </div>
              <span className="font-mono text-[7px] text-[#8696a0] mt-0.5 px-1 flex items-center gap-0.5">
                {m.time} {m.from === "bot" && <span className="text-[#53bdeb] font-bold">✓✓</span>}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Quick Action Chips & Smartphone Gesture Bar */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            {["[Request Demo]", "[View Pricing]", "[API Docs]"].map((chip) => (
              <span key={chip} className="rounded-full bg-[#005c4b]/20 border border-[#005c4b]/40 px-2 py-0.5 font-mono text-[7.5px] text-[#25d366] font-semibold">
                {chip}
              </span>
            ))}
          </div>
          <div className="h-1 w-20 rounded-full bg-white/20 mx-auto pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- dashboard -------------------------------- */

function DashboardScreen() {
  const bars = [48, 72, 36, 88, 64, 96, 82];

  return (
    <div className={shell}>
      <Chrome title="ops console · sowebuild.in" status="HEALTHY" />
      <div className="flex flex-1 flex-col justify-between p-3 space-y-2.5">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { title: "DEV SERVERS", val: "14 Active", status: "+100%" },
            { title: "REQ / SEC", val: "3,420 rps", status: "Sub-10ms" },
            { title: "UPTIME", val: "99.99%", status: "Guaranteed" },
          ].map((m) => (
            <div key={m.title} className="glass rounded-lg p-2 border border-border">
              <div className="font-mono text-[7px] tracking-widest text-muted-foreground font-semibold">
                {m.title}
              </div>
              <div className="mt-1 font-display text-[11px] font-bold text-foreground">
                {m.val}
              </div>
              <div className="font-mono text-[7.5px] text-primary-glow">{m.status}</div>
            </div>
          ))}
        </div>

        {/* Realtime Animated Chart */}
        <div className="glass flex flex-col justify-between h-24 rounded-lg p-2.5 relative overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[8px] text-muted-foreground">
            <span>THROUGHPUT GRAPH</span>
            <span className="text-cyan">LIVE STREAM</span>
          </div>
          <div className="flex h-14 items-end gap-1.5 pt-2">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 6 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-accent to-primary-glow relative group"
              />
            ))}
          </div>
        </div>

        {/* Live Server Logs Stream */}
        <div className="rounded-lg border border-border bg-black/90 p-2 font-mono text-[8px] space-y-1">
          <div className="text-emerald-400 truncate">[16:08:22] 200 OK GET /api/v1/healthcheck (1.2ms)</div>
          <div className="text-cyan truncate">[16:08:23] POST /api/v1/ai-agent/query (14.2ms)</div>
        </div>
      </div>
    </div>
  );
}

const PROJECT_TYPES = [
  { value: "website", label: "High-Performance Website" },
  { value: "chatbot", label: "AI Chatbot / RAG Agent" },
  { value: "whatsapp", label: "WhatsApp Automation" },
  { value: "dashboard", label: "Custom Software / SaaS" },
  { value: "mobile", label: "Mobile App (iOS / Android)" },
];

function GlassSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-surface/60 border border-border/80 rounded-lg px-2.5 py-2 text-[11px] flex items-center justify-between text-left focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors cursor-pointer"
      >
        <span className={selectedOption ? "text-foreground font-medium" : "text-muted-foreground/70"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon className={`size-3 text-primary-glow transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-primary/40 p-1 shadow-2xl shadow-black bg-[#161224] overflow-hidden"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 text-[11px] rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-primary/25 text-primary-glow font-semibold"
                      : "text-foreground/90 hover:bg-primary/15 hover:text-primary-glow"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <CheckIcon className="size-3 text-primary-glow stroke-[2.5]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept numeric digits 0-9, max 10 digits
    const numeric = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(numeric);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit numeric phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          countryCode,
          phone,
          projectType: PROJECT_TYPES.find((p) => p.value === projectType)?.label || projectType,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setProjectType("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit inquiry. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={shell}>
      <Chrome title="sowebuild.in · start-project" status="SECURE" />
      <div className="flex-1 flex flex-col justify-between p-4.5 space-y-3 overflow-y-auto">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
            Project Inquiry
          </h3>
          <p className="text-[11px] text-muted-foreground leading-snug">
            Fill out the details below for instant dev server allocation & custom quote.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 glass rounded-xl border border-emerald-500/30 bg-emerald-500/10"
          >
            <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 animate-bounce">
              <CheckIcon className="size-6 text-emerald-400 stroke-[2.5]" />
            </div>
            <div className="font-display text-base font-bold text-foreground">
              Inquiry Submitted!
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We&apos;ve received your requirements. Our lead engineer will contact you on WhatsApp / Email within 2 hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-2 text-[11px] font-mono text-primary-glow hover:underline cursor-pointer"
            >
              Submit Another Inquiry →
            </button>
          </motion.div>
        ) : (
          <form className="flex flex-col gap-2.5 flex-1" onSubmit={handleSubmit}>
            {/* Error banner */}
            {error && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-[11px] text-destructive-foreground font-mono">
                {error}
              </div>
            )}

            {/* Name & Email Row */}
            <div className="grid grid-cols-2 gap-2">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name *"
                className="w-full bg-surface/60 border border-border/80 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors placeholder:text-muted-foreground/70 text-foreground"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work Email *"
                className="w-full bg-surface/60 border border-border/80 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors placeholder:text-muted-foreground/70 text-foreground"
              />
            </div>

            {/* Country Code + Strict 10-digit Phone Number Field */}
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value.slice(0, 4))}
                  maxLength={4}
                  placeholder="+91"
                  className="w-16 text-center bg-surface/60 border border-border/80 rounded-lg px-2 py-2 text-[11px] font-mono font-semibold text-primary-glow focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors placeholder:text-muted-foreground/70"
                />
                <div className="relative flex-1">
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="10-digit Phone / WhatsApp *"
                    className={`w-full bg-surface/60 border rounded-lg px-3 py-2 pr-12 text-[11px] focus:outline-none focus:bg-surface transition-colors placeholder:text-muted-foreground/70 font-mono text-foreground ${
                      phone.length > 0 && phone.length < 10
                        ? "border-amber-500/60 focus:border-amber-500"
                        : phone.length === 10
                        ? "border-emerald-500/60 focus:border-emerald-500"
                        : "border-border/80 focus:border-primary/60"
                    }`}
                  />
                  <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[9px] pointer-events-none ${
                    phone.length === 10 ? "text-emerald-400 font-bold" : "text-muted-foreground/70"
                  }`}>
                    {phone.length}/10
                  </span>
                </div>
              </div>
              {phone.length > 0 && phone.length < 10 && (
                <span className="text-[10px] text-amber-400 font-mono pl-1">
                  Phone number must be exactly 10 numeric digits ({10 - phone.length} more needed)
                </span>
              )}
            </div>

            {/* Project Type Dropdown (No budget field) */}
            <div className="relative w-full">
              <GlassSelect
                value={projectType}
                onChange={setProjectType}
                placeholder="Select Project Type (e.g. Website, Chatbot, SaaS)..."
                options={PROJECT_TYPES}
              />
            </div>

            {/* Project Requirements Textarea */}
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project requirements, timeline, or tech stack..."
              className="w-full bg-surface/60 border border-border/80 rounded-lg px-3 py-2 text-[11px] flex-1 resize-none focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors placeholder:text-muted-foreground/70 leading-relaxed text-foreground"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-0.5 w-full bg-[image:var(--gradient-violet)] text-primary-foreground font-semibold py-2.5 rounded-lg text-xs tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-lg shadow-primary/25 cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Project Inquiry</span>
                  <ArrowUpRightIcon className="size-3.5 text-primary-foreground" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const SCREENS: Record<DeviceMode, () => React.ReactElement> = {
  website: WebsiteScreen,
  chatbot: ChatbotScreen,
  whatsapp: WhatsappScreen,
  dashboard: DashboardScreen,
  form: FormScreen,
};

export function Screen({ mode }: { mode: DeviceMode }) {
  const Comp = SCREENS[mode];
  return (
    <div className="absolute inset-0">
      <Comp />
    </div>
  );
}
