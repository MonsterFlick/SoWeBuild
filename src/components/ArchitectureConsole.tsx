"use client";

import { useState } from "react";

interface ArchTier {
  id: string;
  name: string;
  category: string;
  icon: string;
  latency: string;
  status: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
}

const TIERS: ArchTier[] = [
  {
    id: "edge",
    name: "Global Edge & Client",
    category: "INGRESS TIER",
    icon: "🌐",
    latency: "<28ms TTFB",
    status: "Active (Global)",
    description:
      "Client traffic routed to nearest edge region. Static assets cached globally with instant SSR hydration and zero server cold starts.",
    technologies: ["Next.js 15", "Vercel Edge", "Cloudflare", "HTTP/3"],
    metrics: [
      { label: "Edge PoPs", value: "300+" },
      { label: "Cache Hit Rate", value: "98.4%" },
    ],
  },
  {
    id: "api",
    name: "Application & API Gateway",
    category: "CORE RUNTIME",
    icon: "⚡",
    latency: "<45ms Exec",
    status: "Healthy",
    description:
      "Type-safe API layer with compiled schema contracts, role-based auth guards, and real-time streaming connections.",
    technologies: ["TypeScript", "Server Actions", "REST / GraphQL", "JWT Auth"],
    metrics: [
      { label: "Throughput", value: "10K req/s" },
      { label: "Type Safety", value: "100% End-to-End" },
    ],
  },
  {
    id: "data",
    name: "Distributed Data Engine",
    category: "PERSISTENCE TIER",
    icon: "🗄️",
    latency: "<8ms Query",
    status: "Replicated",
    description:
      "High-throughput relational storage with sub-millisecond in-memory cache, vector embeddings for AI similarity, and automated encrypted backups.",
    technologies: ["PostgreSQL", "Supabase", "Redis Cache", "pgvector"],
    metrics: [
      { label: "Replication", value: "Multi-AZ" },
      { label: "ACID Guaranteed", value: "Yes" },
    ],
  },
  {
    id: "ai",
    name: "Autonomous AI & Event Bus",
    category: "INTELLIGENCE TIER",
    icon: "🤖",
    latency: "Real-time Stream",
    status: "Orchestrated",
    description:
      "Dedicated LLM workflow pipelines, background worker queues, and two-way WhatsApp webhook automation for live customer operations.",
    technologies: ["Custom LLMs", "LangChain", "WhatsApp Business API", "Worker Queues"],
    metrics: [
      { label: "Async Queues", value: "Zero Drop" },
      { label: "Inference Stream", value: "60 tokens/s" },
    ],
  },
];

export default function ArchitectureConsole() {
  const [activeTier, setActiveTier] = useState<string>("edge");
  const selected = TIERS.find((t) => t.id === activeTier) || TIERS[0];

  return (
    <div
      style={{
        background: "var(--color-bg)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top Console Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--color-border)",
          background: "rgba(255, 255, 255, 0.015)",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--color-text-secondary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            System Topology · Production Pipeline
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#c6ff3d",
              boxShadow: "0 0 8px #c6ff3d",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              color: "var(--color-accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            All Systems Operational
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Tier Pipeline */}
      <div
        style={{
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        {/* Tier Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {TIERS.map((tier, index) => {
            const isActive = tier.id === activeTier;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveTier(tier.id)}
                style={{
                  textAlign: "left",
                  padding: "1.25rem",
                  borderRadius: "var(--radius-lg)",
                  border: isActive
                    ? "1px solid var(--color-accent)"
                    : "1px solid var(--color-border)",
                  background: isActive
                    ? "rgba(198, 255, 61, 0.04)"
                    : "var(--color-surface)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  position: "relative",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "1.25rem" }}>{tier.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5625rem",
                      color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                      letterSpacing: "0.08em",
                      border: `1px solid ${isActive ? "rgba(198, 255, 61, 0.3)" : "var(--color-border)"}`,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    0{index + 1}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {tier.category}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    color: isActive ? "#ffffff" : "var(--color-text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {tier.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                  }}
                >
                  {tier.latency}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Inspector Panel */}
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            padding: "1.75rem",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
          }}
          className="lg:grid-cols-[1.5fr_1fr]"
        >
          {/* Tier Overview */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{selected.icon}</span>
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {selected.name}
                </h4>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-accent)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Status: {selected.status}
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "var(--color-text-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              {selected.description}
            </p>

            {/* Tech Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {selected.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-text)",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--color-border)",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tier Telemetry Metrics */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
              paddingLeft: "clamp(0rem, 2vw, 1.5rem)",
              borderLeft: "1px solid var(--color-border)",
            }}
            className="max-lg:border-left-0 max-lg:pt-4 max-lg:border-t"
          >
            {selected.metrics.map((metric) => (
              <div key={metric.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    lineHeight: 1.1,
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Footer Strip */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "0.85rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(0, 0, 0, 0.2)",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            color: "var(--color-text-muted)",
          }}
        >
          Security: TLS 1.3 · Zero Trust · End-to-End Encrypted
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            color: "var(--color-accent)",
          }}
        >
          Target SLA: 99.99% Uptime
        </span>
      </div>
    </div>
  );
}
