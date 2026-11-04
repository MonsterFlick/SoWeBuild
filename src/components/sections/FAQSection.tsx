"use client";

import { useState } from "react";

export const FAQS = [
  {
    question: "Who owns the website, designs, and code?",
    answer:
      "You own 100% of everything we build for you from day one. All files, designs, code, accounts, and credentials belong entirely to you. We sign an NDA and ownership transfer agreement before kickoff. Zero recurring lock-ins.",
    category: "Ownership & IP",
  },
  {
    question: "Do I need to be technical to work with you?",
    answer:
      "Not at all. Most of our clients are business owners, founders, retailers, and doctors who want more customers, not technical headaches. We speak plain English, handle all the setup, hosting, and domains, and walk you through everything step-by-step.",
    category: "Communication",
  },
  {
    question: "How quickly can SoWeBuild start my project?",
    answer:
      "Within 24 hours of contacting us, we review your requirements and send you a clear plan, fixed timeline, and straightforward pricing. Once approved, we get straight to work, and you can test working progress on your phone within the first week.",
    category: "Timeline & Delivery",
  },
  {
    question: "How is SoWeBuild different from traditional agencies?",
    answer:
      "At traditional agencies, you pay inflated fees for salespeople and junior account managers who don't understand code and outsource your project. At SoWeBuild, you talk directly with the developers writing the code. No middlemen, no endless back-and-forth, just fast, high-quality work.",
    category: "Why SoWeBuild",
  },
  {
    question: "What services do you provide beyond websites?",
    answer:
      "Along with modern websites and web apps, we build automated WhatsApp bots (for customer support, bookings, and inquiries), smart AI tools to automate repetitive work, and handle social media design, branding, and content growth to help you get more clients.",
    category: "Services & Scope",
  },
];

export const COMPARISONS = [
  {
    criteria: "Ownership",
    traditional: "Hidden fees, lock-in, or proprietary platform traps.",
    soWeBuild: "100% Full ownership. You get all files, designs, and accounts.",
  },
  {
    criteria: "Who You Talk To",
    traditional: "Account managers playing telephone with junior staff.",
    soWeBuild: "Direct 1-on-1 access to the developer building your project.",
  },
  {
    criteria: "Progress Updates",
    traditional: "Weeks of static presentation slides and delayed emails.",
    soWeBuild: "Weekly live demos you can test directly on your phone.",
  },
  {
    criteria: "Pricing & Scope",
    traditional: "Vague hourly rates with surprise scope creep and invoices.",
    soWeBuild: "Clear milestone pricing agreed upfront with zero surprises.",
  },
  {
    criteria: "Communication",
    traditional: "Slow ticketing systems and days of waiting for replies.",
    soWeBuild: "Direct WhatsApp and phone access whenever you need us.",
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
        {/* SECTION HEADER: Centered, clean, NO subtext                    */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="label mb-2.5">
            Standards &amp; FAQ
          </div>

          <h2 className="heading-xl tracking-tight text-[#161124]">
            Direct answers.
            <br />
            <span className="font-serif italic font-normal text-[#7C3AED]">
              Zero agency fluff.
            </span>
          </h2>
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
