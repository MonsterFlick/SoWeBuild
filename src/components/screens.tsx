"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
    <div className="flex shrink-0 items-center justify-between border-b border-border/80 px-3.5 py-2.5 bg-surface/70 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-destructive/80" />
        <span className="size-2 rounded-full bg-primary-glow/80" />
        <span className="size-2 rounded-full bg-cyan/80" />
        <span className="ml-2 truncate font-mono text-[10px] tracking-widest text-muted-foreground uppercase font-semibold">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[9px] text-cyan bg-cyan/10 px-2 py-0.5 rounded-full border border-cyan/20">
        <span className="size-1.5 rounded-full bg-cyan animate-pulse" />
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
            { title: "React 19", icon: "⚛️", detail: "Server Actions" },
            { title: "AI Agents", icon: "🤖", detail: "Vector Search" },
            { title: "Dev Server", icon: "🚀", detail: "Live Testing" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="glass rounded-lg p-2 flex flex-col justify-between"
            >
              <span className="text-xs">{item.icon}</span>
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
          <span className="text-emerald-400 font-bold shrink-0">✓ LIVE</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- chatbot --------------------------------- */

const CHAT: { from: "bot" | "me"; text: string; tag?: string }[] = [
  { from: "bot", text: "Hello! I'm the SoWeBuild AI Agent. How can I accelerate your product today?", tag: "RAG Agent v4" },
  { from: "me", text: "Can you build a custom WhatsApp bot with PostgreSQL CRM sync?" },
  { from: "bot", text: "Yes! We wire real-time webhooks, score lead intent, and handle instant automated bookings.", tag: "Intent 99.4%" },
  { from: "me", text: "Deploy to dev server!" },
];

function ChatbotScreen() {
  const [n, setN] = useState(1);
  useEffect(() => {
    setN(1);
    const id = setInterval(() => setN((v) => (v >= CHAT.length ? 1 : v + 1)), 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={shell}>
      <Chrome title="ai-agent · RAG pipeline" status="ACTIVE" />
      <div className="flex flex-1 flex-col justify-end gap-2 p-3">
        {CHAT.slice(0, n).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
            className={`max-w-[85%] flex flex-col gap-1 ${
              m.from === "bot" ? "self-start" : "self-end"
            }`}
          >
            <div
              className={
                m.from === "bot"
                  ? "rounded-2xl rounded-bl-sm bg-surface-2 border border-border/60 px-3 py-2 text-[10px] leading-relaxed text-foreground/90 shadow-md"
                  : "rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-[10px] leading-relaxed text-primary-foreground font-medium shadow-md"
              }
            >
              {m.text}
            </div>
            {m.tag && (
              <span className="font-mono text-[7.5px] text-muted-foreground px-1">
                {m.tag}
              </span>
            )}
          </motion.div>
        ))}

        <div className="flex items-center gap-1.5 self-start rounded-full bg-surface-2 px-3 py-1 border border-border/40">
          <span className="font-mono text-[8px] text-primary-glow font-medium">AI Typing</span>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1 rounded-full bg-primary-glow"
              style={{ animation: `typing-dot 1.2s ${i * 0.15}s infinite` }}
            />
          ))}
        </div>

        <div className="mt-1 flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-2 shadow-inner">
          <span className="text-[9px] text-muted-foreground flex-1 truncate">Ask AI Agent anything…</span>
          <span className="size-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[9px] font-bold text-white">
            ↑
          </span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- whatsapp --------------------------------- */

const WA = [
  { from: "them", text: "Hey! Can I test the development server demo for our web app?", time: "16:04" },
  { from: "bot", text: "Hi 👋 Your dev environment is ready at dev.sowebuild.in. Sent login credentials!", time: "16:04" },
  { from: "bot", text: "⚡ Webhook triggered: Lead qualified & stored in PostgreSQL.", time: "16:05" },
  { from: "them", text: "Instant execution! 🔥 Thanks SoWeBuild team!", time: "16:05" },
];

function WhatsappScreen() {
  const [n, setN] = useState(1);
  useEffect(() => {
    setN(1);
    const id = setInterval(() => setN((v) => (v >= WA.length ? 1 : v + 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={shell}>
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface-2/80 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-emerald-500 text-[9px] font-bold text-black shadow-sm">
            ✓
          </span>
          <div>
            <div className="text-[10.5px] leading-none font-bold flex items-center gap-1">
              SoWeBuild Dev Bot
              <span className="text-emerald-400 text-[9px]">✓</span>
            </div>
            <div className="mt-0.5 font-mono text-[8px] text-cyan">WhatsApp Automation API</div>
          </div>
        </div>
        <span className="font-mono text-[8px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
          24/7 LIVE
        </span>
      </div>

      <div className="scanline flex flex-1 flex-col justify-end gap-2 p-3">
        {WA.slice(0, n).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.from === "bot" ? 16 : -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-[82%] flex flex-col ${
              m.from === "bot" ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <div
              className={
                m.from === "bot"
                  ? "rounded-xl rounded-tr-none bg-primary/90 px-3 py-2 text-[10px] text-primary-foreground shadow-sm"
                  : "rounded-xl rounded-tl-none bg-surface-2 px-3 py-2 text-[10px] text-foreground/90 border border-border/40 shadow-sm"
              }
            >
              {m.text}
            </div>
            <span className="font-mono text-[7px] text-muted-foreground mt-0.5 px-1">
              {m.time} {m.from === "bot" ? "✓✓" : ""}
            </span>
          </motion.div>
        ))}

        <div className="flex items-center gap-1.5 pt-1">
          {["[Request Demo]", "[View Pricing]", "[API Docs]"].map((chip) => (
            <span key={chip} className="rounded-full bg-primary/10 border border-primary/30 px-2 py-1 font-mono text-[8px] text-primary-glow font-medium">
              {chip}
            </span>
          ))}
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

const BUDGET_TIERS = [
  { value: "tier1", label: "$1k - $3k (Starter)" },
  { value: "tier2", label: "$3k - $8k (Pro Studio)" },
  { value: "tier3", label: "$8k - $25k (Enterprise)" },
  { value: "custom", label: "Custom Architecture" },
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
        <span className={`ml-1 text-[8px] text-primary-glow transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
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
                  {isSelected && <span className="text-[9px] text-primary-glow">✓</span>}
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
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
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
            <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold border border-emerald-500/40 animate-bounce">
              ✓
            </div>
            <div className="font-display text-base font-bold text-foreground">
              Inquiry Submitted!
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We've received your requirements. Our lead engineer will contact you on WhatsApp / Email within 2 hours.
            </p>
          </motion.div>
        ) : (
          <form className="flex flex-col gap-2.5 flex-1" onSubmit={handleSubmit}>
            {/* Name & Email Row */}
            <div className="grid grid-cols-2 gap-2">
              <input
                required
                placeholder="Full Name *"
                className="w-full bg-surface/60 border border-border/80 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors placeholder:text-muted-foreground/70 text-foreground"
              />
              <input
                required
                type="email"
                placeholder="Work Email *"
                className="w-full bg-surface/60 border border-border/80 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors placeholder:text-muted-foreground/70 text-foreground"
              />
            </div>

            {/* Country Code (3-digit input) + Phone Number Field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                maxLength={5}
                placeholder="+91"
                className="w-16 text-center bg-surface/60 border border-border/80 rounded-lg px-2 py-2 text-[11px] font-mono font-semibold text-primary-glow focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors placeholder:text-muted-foreground/70"
              />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone / WhatsApp Number *"
                className="flex-1 bg-surface/60 border border-border/80 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors placeholder:text-muted-foreground/70 font-mono text-foreground"
              />
            </div>

            {/* Custom Glass Select Dropdowns */}
            <div className="grid grid-cols-2 gap-2 relative">
              <GlassSelect
                value={projectType}
                onChange={setProjectType}
                placeholder="Project Type..."
                options={PROJECT_TYPES}
              />
              <GlassSelect
                value={budget}
                onChange={setBudget}
                placeholder="Estimated Budget..."
                options={BUDGET_TIERS}
              />
            </div>

            {/* Project Requirements Textarea */}
            <textarea
              rows={3}
              placeholder="Tell us about your project requirements, timeline, or tech stack..."
              className="w-full bg-surface/60 border border-border/80 rounded-lg px-3 py-2 text-[11px] flex-1 resize-none focus:outline-none focus:border-primary/60 focus:bg-surface transition-colors placeholder:text-muted-foreground/70 leading-relaxed text-foreground"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-0.5 w-full bg-[image:var(--gradient-violet)] text-primary-foreground font-semibold py-2.5 rounded-lg text-xs tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/25 cursor-pointer active:scale-[0.99]"
            >
              Submit Project Inquiry ↗
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
