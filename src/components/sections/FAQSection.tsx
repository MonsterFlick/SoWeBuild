"use client";

import { useState } from "react";

export const FAQS = [
  {
    question: "Who owns the intellectual property and source code?",
    answer:
      "You own 100% of all intellectual property, source code, design systems, database schemas, and CI/CD pipelines from day one. Everything is committed directly to your private Git repository. We sign mutual IP assignment agreements and non-disclosure agreements (NDAs) prior to kickoff. There are zero licensing lock-ins or proprietary vendor traps.",
    category: "Ownership & IP",
  },
  {
    question: "How quickly can SoWeBuild scope and start our build?",
    answer:
      "Within 24 hours of receiving your brief, a senior technical architect analyzes your problem statement and returns a structured roadmap, technical stack recommendation, and transparent milestone estimate. Once approved, development environments are provisioned immediately, and live running software is deployed to staging within the first 7 days.",
    category: "Velocity & Delivery",
  },
  {
    question: "How do you handle healthcare advertising regulations and NMC compliance?",
    answer:
      "For healthcare and pharmaceutical platforms, our solutions strictly adhere to the National Medical Commission (NMC) Guidelines on Ethical Advertising and Public Communication (issued October 6, 2026). We design objective, verified medical equipment catalogs, patient booking workflows, and practitioner directories that meet stringent statutory standards without deceptive claims or algorithmic bias.",
    category: "Regulatory Compliance",
  },
  {
    question: "How is SoWeBuild different from a traditional marketing agency?",
    answer:
      "Traditional agencies rely on billable hours, junior account managers playing telephone, and hidden subcontracting. SoWeBuild is an engineering-first studio: senior architects write and direct your code, weekly functional preview builds let you test working software continuously, and scope is fixed by milestones with guaranteed deliverables.",
    category: "Studio Structure",
  },
  {
    question: "What technology stack and infrastructure do you build with?",
    answer:
      "We engineer production-grade systems using Next.js (App Router, Turbopack), React, TypeScript, Node.js, Python, Fastify, PostgreSQL, Docker, and Tailwind CSS. For AI and automation, we integrate custom autonomous agents, RAG knowledge vaults, and official WhatsApp Cloud API gateways hosted on resilient Cloudflare and AWS infrastructure.",
    category: "Engineering Stack",
  },
];

export const COMPARISONS = [
  {
    criteria: "Code & IP Ownership",
    traditional: "Proprietary lock-in, recurring licensing fees, or held hostage.",
    soWeBuild: "100% Full IP ownership. Complete Git repository handed to you.",
  },
  {
    criteria: "Project Leadership",
    traditional: "Junior account managers and multi-layered telephone games.",
    soWeBuild: "Direct 1-on-1 access to the Senior Architect writing your code.",
  },
  {
    criteria: "Delivery Cadence",
    traditional: "Months of static Figma mockups and slide deck status reports.",
    soWeBuild: "Weekly live staging previews. Test real software on your phone every 7 days.",
  },
  {
    criteria: "Scoping & Pricing",
    traditional: "Vague hourly estimates prone to uncontrolled scope creep.",
    soWeBuild: "24-hour technical roadmap with milestone-based transparent pricing.",
  },
  {
    criteria: "Domain Regulations",
    traditional: "Generic website templates with high regulatory and legal risks.",
    soWeBuild: "Architected for NMC Oct 6, 2026 guidelines, HIPAA, and ISO standards.",
  },
];

function ChevronDownIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
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

function XIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="section-padding bg-[#FAF8F5] relative z-10 border-t border-[#E8DFF2]"
    >
      {/* FAQPage Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-wide">
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 text-center sm:text-left">
          <div className="max-w-3xl flex flex-col items-center sm:items-start mx-auto sm:mx-0">
            <div className="label flex items-center justify-center sm:justify-start gap-2 mb-3">
              <span className="size-2 rounded-full bg-[#7C3AED] shadow-[0_0_8px_rgba(124,58,237,0.4)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#7C3AED] font-bold">
                Studio Standards &amp; Architecture FAQ
              </span>
            </div>

            <h2 className="heading-xl tracking-tight text-[#161124] mb-3">
              Direct answers. <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#7C3AED]">
                Zero ambiguous
              </span>{" "}
              agency rhetoric.
            </h2>

            <p className="body-lg text-[#5A5068] max-w-2xl leading-relaxed">
              Before committing to a build, ambitious leaders need absolute clarity on intellectual property,
              turnaround SLAs, compliance standards, and engineering leadership.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#7C3AED] px-5 py-2.5 font-mono text-xs font-bold text-white shadow-md shadow-[#7C3AED]/25 hover:bg-[#6D28D9] transition-all"
            >
              <span>Ask an Architect →</span>
            </a>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COMPARISON MATRIX BLOCK (AEO / GEO Content Pattern)            */}
        {/* ============================================================== */}
        <div className="mb-14 sm:mb-20 rounded-2xl sm:rounded-3xl border border-[#E8DFF2] bg-white p-5 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#F2EBF7] mb-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#7C3AED] font-bold bg-[#F5EDFA] border border-[#E8DFF2] px-2.5 py-1 rounded-full inline-block mb-2">
                Comparative Analysis
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#161124]">
                Traditional Agencies vs. SoWeBuild Studio
              </h3>
            </div>
            <span className="font-mono text-xs text-[#5A5068]">
              Standardized Studio SLA
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E8DFF2] text-xs font-mono uppercase tracking-wider text-[#8C8299]">
                  <th className="py-3 px-4 w-1/4">Evaluation Criteria</th>
                  <th className="py-3 px-4 w-3/8 text-[#E11D48]">Traditional Marketing Agency</th>
                  <th className="py-3 px-4 w-3/8 text-[#15803D] bg-[#F5EDFA]/40 rounded-t-xl">SoWeBuild Technology Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EBF7] text-xs sm:text-[13px]">
                {COMPARISONS.map((row) => (
                  <tr key={row.criteria} className="hover:bg-[#FAF8F5]/50 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-[#161124] align-top">
                      {row.criteria}
                    </td>
                    <td className="py-4 px-4 text-[#5A5068] align-top">
                      <div className="flex items-start gap-2">
                        <span className="size-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                          <XIcon className="size-3" />
                        </span>
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-[#161124] bg-[#F5EDFA]/30 align-top">
                      <div className="flex items-start gap-2">
                        <span className="size-4 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                          <CheckIcon className="size-3" />
                        </span>
                        <span className="text-[#161124] font-semibold">{row.soWeBuild}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KNOWLEDGE CAPSULES / ACCORDION Q&A                             */}
        {/* ============================================================== */}
        <div className="max-w-4xl mx-auto flex flex-col gap-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 bg-white overflow-hidden shadow-sm ${
                  isOpen ? "border-[#7C3AED] ring-1 ring-[#7C3AED]/20 shadow-md" : "border-[#E8DFF2]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none hover:bg-[#FAF8F5]/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#7C3AED] bg-[#F5EDFA] border border-[#E8DFF2] px-2.5 py-0.5 rounded-full shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="font-display text-base sm:text-lg font-bold text-[#161124] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`size-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#7C3AED] border-[#7C3AED] text-white rotate-180"
                        : "border-[#E8DFF2] bg-[#FAF8F5] text-[#7C3AED]"
                    }`}
                  >
                    <ChevronDownIcon className="size-4" />
                  </div>
                </button>

                {/* GPU Grid Row Smooth Transition */}
                <div
                  className="grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 border-t border-[#F2EBF7] bg-[#FAF8F5]/30">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#7C3AED] font-bold mb-2">
                        {faq.category}
                      </div>
                      <p className="text-sm sm:text-base text-[#5A5068] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
