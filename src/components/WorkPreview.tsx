"use client";

import React from "react";
import { motion } from "motion/react";

/* ---------------------------------- Icons --------------------------------- */

function LockIcon({ className = "size-2.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function StarIcon({ className = "size-2.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* -------------------------------- Mockup 1 -------------------------------- */

function FertisurePreview() {
  return (
    <div className="flex flex-col h-full bg-[#0d1520] text-slate-100 font-sans p-3 space-y-2 select-none overflow-hidden">
      {/* Mini App Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-emerald-400 flex items-center justify-center text-[7px] text-black font-bold">
            +
          </div>
          <span className="font-display text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
            FERTISURE
          </span>
        </div>
        <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[7.5px] px-2 py-0.5 rounded-full font-medium">
          Patient Portal v2.4
        </span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-teal-900/40 rounded-lg p-2.5 border border-emerald-500/20 relative overflow-hidden">
        <div className="text-[10px] font-bold text-white tracking-tight">Advanced Fertility & Healthcare AI</div>
        <div className="text-[8px] text-emerald-200/80 mt-0.5">Empowering families with 98.4% diagnostic accuracy</div>
        <div className="mt-2 flex items-center gap-2">
          <div className="bg-emerald-500 text-black font-bold text-[8px] px-2 py-0.5 rounded shadow-sm">
            Book IVF Consultation
          </div>
          <span className="text-[7.5px] font-mono text-emerald-300">10,000+ Active Patients</span>
        </div>
      </div>

      {/* Patient Stats Grid */}
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800 flex flex-col justify-between">
          <div className="text-[7.5px] font-mono text-slate-400">APPOINTMENT STATUS</div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[9.5px] font-bold text-emerald-400">Dr. Sarah Jenkins</span>
            <span className="text-[7px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">14:30 TODAY</span>
          </div>
          <div className="text-[7.5px] text-slate-400 mt-1">Ultra-Sound Diagnostic Scan</div>
        </div>

        <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800 flex flex-col justify-between">
          <div className="text-[7.5px] font-mono text-slate-400">LAB RESULTS SYNC</div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[9.5px] font-bold text-cyan-300">Hormone Panel</span>
            <span className="text-[7px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">READY</span>
          </div>
          <div className="text-[7.5px] text-slate-400 mt-1">Encrypted HIPAA Vault</div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Mockup 2 -------------------------------- */

function AlphatechPreview() {
  return (
    <div className="flex flex-col h-full bg-[#18111e] text-slate-100 font-sans p-3 space-y-2 select-none overflow-hidden">
      {/* Mini App Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-[10px] font-extrabold tracking-wider text-purple-300 uppercase">
            ALPHA<span className="text-pink-400">TECH</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-[7.5px] px-2 py-0.5 rounded-full">
            CART [3]
          </span>
        </div>
      </div>

      {/* Featured Products Showcase */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        <div className="bg-gradient-to-b from-purple-950/40 to-slate-900/90 rounded-lg p-2 border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="bg-pink-500/20 text-pink-300 font-mono text-[6.5px] px-1.5 py-0.5 rounded uppercase font-bold">
                BESTSELLER
              </span>
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="size-2" />
                ))}
              </div>
            </div>
            <div className="mt-1.5 text-[9.5px] font-bold text-white">Iso-Alpha Whey 2kg</div>
            <div className="text-[7.5px] text-slate-400">100% Hydrolyzed Isolate</div>
          </div>
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800">
            <span className="text-[10px] font-extrabold text-pink-400">$64.99</span>
            <span className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-[7.5px] px-2 py-1 rounded">
              ADD +
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-b from-purple-950/40 to-slate-900/90 rounded-lg p-2 border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="bg-cyan-500/20 text-cyan-300 font-mono text-[6.5px] px-1.5 py-0.5 rounded uppercase font-bold">
                PURE MICRONIZED
              </span>
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="size-2" />
                ))}
              </div>
            </div>
            <div className="mt-1.5 text-[9.5px] font-bold text-white">Creatine Monohydrate</div>
            <div className="text-[7.5px] text-slate-400">300g Creapure Grade</div>
          </div>
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800">
            <span className="text-[10px] font-extrabold text-cyan-300">$27.99</span>
            <span className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-[7.5px] px-2 py-1 rounded">
              ADD +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Mockup 3 -------------------------------- */

function AiAgentPreview() {
  return (
    <div className="flex flex-col h-full bg-[#0a101d] text-slate-100 font-sans p-3 space-y-2 select-none overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[9.5px] font-bold text-cyan-300">
            RAG VECTOR INDEXER v4
          </span>
        </div>
        <span className="font-mono text-[7.5px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          99.8% ACCURACY
        </span>
      </div>

      {/* Vector Pipeline Visualization */}
      <div className="bg-slate-900/90 rounded-lg p-2 border border-cyan-500/20 space-y-1.5">
        <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400">
          <span>KNOWLEDGE BASE INDEX</span>
          <span className="text-cyan-400 font-bold">14,280 EMBEDDINGS</span>
        </div>
        <div className="flex gap-1">
          {[85, 45, 95, 60, 100, 75, 90, 40, 80].map((h, i) => (
            <div key={i} className="flex-1 bg-slate-800 rounded-t h-7 flex items-end overflow-hidden">
              <div
                className="w-full bg-gradient-to-t from-cyan-600 to-blue-400 rounded-t"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Query Stream Demo */}
      <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 font-mono text-[8px] space-y-1 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-slate-400">&gt; Query: "Synthesize Q3 sales & WhatsApp leads"</div>
          <div className="text-cyan-300 font-semibold mt-0.5">&gt; Vector Search: Match 0.984</div>
        </div>
        <div className="bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 p-1.5 rounded text-[7.5px]">
          Result: 420 leads qualified. Automated follow-up triggered via WhatsApp API.
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Mockup 4 -------------------------------- */

function MicroservicesPreview() {
  return (
    <div className="flex flex-col h-full bg-[#0a0e17] text-slate-100 font-sans p-3 space-y-2 select-none overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[9.5px] font-bold text-indigo-300 uppercase">
            CLOUD OPS TOPOLOGY
          </span>
        </div>
        <span className="font-mono text-[7.5px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded">
          SUB-5MS LATENCY
        </span>
      </div>

      {/* Microservice Cluster Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { name: "AUTH SVC", status: "200 OK", speed: "1.2ms" },
          { name: "PG CLUSTER", status: "HEALTHY", speed: "2.4ms" },
          { name: "REDIS CACHE", status: "HIT 99.8%", speed: "0.4ms" },
        ].map((svc) => (
          <div key={svc.name} className="bg-slate-900/90 rounded p-1.5 border border-indigo-500/20 text-center">
            <div className="font-mono text-[6.5px] text-slate-400 font-bold">{svc.name}</div>
            <div className="font-mono text-[8px] font-bold text-emerald-400 mt-0.5">{svc.status}</div>
            <div className="font-mono text-[6.5px] text-indigo-300">{svc.speed}</div>
          </div>
        ))}
      </div>

      {/* Realtime Request Log Ticker */}
      <div className="bg-black rounded-lg p-2 border border-slate-800 font-mono text-[8px] space-y-1 flex-1">
        <div className="text-emerald-400 truncate">[18:34:01] GET /api/v2/products 200 (0.8ms)</div>
        <div className="text-cyan-400 truncate">[18:34:02] POST /api/v2/checkout/stripe 201 (4.1ms)</div>
        <div className="text-indigo-300 truncate">[18:34:02] WSS /ws/analytics STREAM CONNECTED</div>
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, () => React.ReactElement> = {
  "https://fertisure.in": FertisurePreview,
  "https://alphatech-nutrition.in": AlphatechPreview,
};

export function WorkPreview({ link, index }: { link: string; index: number }) {
  const Comp = PREVIEWS[link] || (index === 2 ? AiAgentPreview : MicroservicesPreview);
  const displayUrl = link.startsWith("http") ? link.replace("https://", "") : "sowebuild.in/internal";

  return (
    <div className="w-full h-full flex flex-col rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden group-hover:border-primary-glow/50 transition-all duration-500">
      {/* Browser Window Header Chrome */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-500/80" />
          <span className="size-2 rounded-full bg-yellow-500/80" />
          <span className="size-2 rounded-full bg-green-500/80" />
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1.5 bg-black/50 border border-white/10 rounded-full px-3 py-0.5 text-[9px] font-mono text-slate-300 w-3/5 justify-center truncate">
          <LockIcon className="size-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">{displayUrl}</span>
        </div>

        <div className="text-[8px] font-mono text-emerald-400 flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Interactive Mockup Body */}
      <div className="flex-1 relative overflow-hidden">
        <Comp />
      </div>
    </div>
  );
}
