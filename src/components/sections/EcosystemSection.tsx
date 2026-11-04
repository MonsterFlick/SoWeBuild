"use client";

function ArrowUpRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function CodeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function BookOpenIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CpuIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

export default function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="section-padding bg-[#FAF8F5] relative z-10 border-t border-[#E8DFF2]"
    >
      <div className="container-wide">
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 text-center sm:text-left">
          <div className="max-w-3xl flex flex-col items-center sm:items-start mx-auto sm:mx-0">
            <div className="label flex items-center justify-center sm:justify-start gap-2 mb-3">
              <span className="size-2 rounded-full bg-[#7C3AED] shadow-[0_0_8px_rgba(124,58,237,0.4)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#7C3AED] font-bold">
                Ecosystem &amp; Engineering Direction
              </span>
            </div>

            <h2 className="heading-xl tracking-tight text-[#161124] mb-3">
              Built by engineers. <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#7C3AED]">
                Backed by production
              </span>{" "}
              craft.
            </h2>

            <p className="body-lg text-[#5A5068] max-w-2xl leading-relaxed">
              We connect client platform development with personal engineering depth and open-source tooling.
              Zero agency bloat, directly architected from first principles.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <a
              href="https://store.sowebuild.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E8DFF2] bg-white px-4 py-2 font-mono text-xs font-semibold text-[#161124] hover:border-[#7C3AED] hover:shadow-sm transition-all"
            >
              <span>Visit Digital Store ↗</span>
            </a>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2-COLUMN ECOSYSTEM GRID: FOUNDER + STORE BANNER                */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Founder Om Thakur Leadership Profile */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-[#E8DFF2] bg-white p-6 sm:p-8 lg:p-10 shadow-sm hover:border-[#7C3AED] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#7C3AED] font-bold bg-[#F5EDFA] border border-[#E8DFF2] px-3 py-1 rounded-full">
                  Leadership &amp; Engineering Direction
                </span>
                <span className="font-mono text-xs text-[#8C8299]">
                  Principal Lead
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#161124] mb-3 leading-snug">
                Built by Real Developers, <br />
                <span className="text-[#7C3AED]">Not Middlemen.</span>
              </h3>

              <p className="text-sm sm:text-base text-[#5A5068] leading-relaxed mb-6">
                SoWeBuild was founded by{" "}
                <a
                  href="https://omthakur.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#161124] underline decoration-[#7C3AED] hover:text-[#7C3AED] transition-colors"
                >
                  Om Thakur
                </a>
                , a software engineer based in Mumbai. Having built web applications, scalable platforms, and automation tools across multiple industries, Om established SoWeBuild to help business owners, creators, and founders launch digital products without technical headaches. You work directly with developers who actually write the code, getting fast, reliable results with{" "}
                <strong className="text-[#161124]">100% full ownership</strong> and zero agency fluff.
              </p>

              {/* Core Disciplines */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  "Fast Websites & Web Apps",
                  "WhatsApp & AI Automation",
                  "Social Media & Branding",
                  "Online Stores & Checkout",
                ].map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFF2]"
                  >
                    <CpuIcon className="size-3.5 text-[#7C3AED] shrink-0" />
                    <span className="font-mono text-[11px] font-medium text-[#161124] truncate">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#F2EBF7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-full bg-[#161124] text-white flex items-center justify-center font-display font-black text-sm">
                  OT
                </div>
                <div>
                  <div className="font-display font-bold text-xs text-[#161124]">
                    Om Thakur
                  </div>
                  <div className="font-mono text-[10px] text-[#8C8299]">
                    Founder &amp; Principal Software Engineer
                  </div>
                </div>
              </div>

              <a
                href="https://omthakur.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-[#161124] text-white px-4 py-2 font-mono text-xs font-bold hover:bg-[#7C3AED] transition-all shadow-sm"
              >
                <span>Explore Om&apos;s Portfolio</span>
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: The SoWeBuild Repository & Digital Store Banner */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-[#7C3AED]/40 bg-gradient-to-br from-white via-[#FAF8F5] to-[#F5EDFA]/60 p-6 sm:p-8 lg:p-10 shadow-sm hover:border-[#7C3AED] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-[#7C3AED]/10 blur-3xl group-hover:bg-[#7C3AED]/20 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#7C3AED] font-bold bg-[#F5EDFA] border border-[#E8DFF2] px-3 py-1 rounded-full">
                  The SoWeBuild Repository &amp; Store
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#161124] bg-[#FAF8F5] border border-[#E8DFF2] px-2.5 py-0.5 rounded-full">
                  <span className="size-1.5 rounded-full bg-[#7C3AED]" />
                  store.sowebuild.in
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#161124] mb-3 leading-snug">
                Production Toolkits, <br />
                <span className="text-[#7C3AED]">Ebooks &amp; Starter Systems.</span>
              </h3>

              <p className="text-sm sm:text-base text-[#5A5068] leading-relaxed mb-6">
                We don&apos;t just build for clients, we package our production playbooks, developer tools, micro-apps,
                and architectural guides for developers and founders worldwide. Hosted on an isolated digital store
                for instant checkout.
              </p>

              {/* Store Product Category Highlights */}
              <div className="space-y-2.5 mb-6">
                {[
                  {
                    icon: <BookOpenIcon className="size-4 text-[#7C3AED]" />,
                    title: "Engineering Playbooks & Ebooks",
                    desc: "Architectural blueprints for high-concurrency systems & WebSockets.",
                  },
                  {
                    icon: <CodeIcon className="size-4 text-[#7C3AED]" />,
                    title: "Production Starter Stacks",
                    desc: "Next.js, FastAPI & PostgreSQL boilerplates with authentication & RBAC.",
                  },
                  {
                    icon: <CpuIcon className="size-4 text-[#7C3AED]" />,
                    title: "AI & WhatsApp Agent Templates",
                    desc: "Autonomous workflow scripts and Cloud API deployment setups.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-[#E8DFF2] hover:border-[#7C3AED]/60 transition-colors shadow-2xs"
                  >
                    <div className="p-2 rounded-xl bg-[#F5EDFA] shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold text-[#161124]">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#5A5068] leading-tight mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#F2EBF7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-[#5A5068] text-center sm:text-left">
                Immediate digital download · Lifetime updates
              </span>

              <a
                href="https://store.sowebuild.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-[#7C3AED] text-white px-5 py-2.5 font-mono text-xs font-bold hover:bg-[#6D28D9] transition-all shadow-md shadow-[#7C3AED]/20"
              >
                <span>Explore store.sowebuild.in</span>
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

