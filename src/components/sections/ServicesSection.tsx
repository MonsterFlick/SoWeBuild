"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SERVICE_CATEGORIES,
  INDUSTRY_SOLUTIONS,
  type ServiceCategory,
} from "@/lib/servicesData";

function ChevronDownIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const FILTER_GROUPS = [
  "All Disciplines",
  "Engineering",
  "AI & Solutions",
  "Brand & Creative",
  "Growth & Marketing",
] as const;

export default function ServicesSection() {
  const [selectedGroup, setSelectedGroup] = useState<string>("All Disciplines");
  // Default first 2 categories open so users immediately see the expandable dropdown feature
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    branding: true,
    "web-development": true,
  });

  const toggleCategory = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    SERVICE_CATEGORIES.forEach((cat) => {
      allExpanded[cat.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedIds({});
  };

  const filteredCategories =
    selectedGroup === "All Disciplines"
      ? SERVICE_CATEGORIES
      : SERVICE_CATEGORIES.filter((cat) => cat.group === selectedGroup);

  const totalExpanded = Object.values(expandedIds).filter(Boolean).length;
  const isAllExpanded = totalExpanded === SERVICE_CATEGORIES.length;

  return (
    <section
      id="services"
      className="section-padding"
      style={{
        background: "var(--color-surface)",
        position: "relative",
      }}
    >
      <div className="container-wide">
        {/* ============================================================== */}
        {/* MASTER CATALOGUE HEADER                                        */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            {/* Eyebrow Label with Neon Green Spark Dot */}
            <div className="label flex items-center gap-2 mb-3">
              <span className="size-2 rounded-full bg-[#c6ff3d] shadow-[0_0_8px_#c6ff3d]" />
              <span className="bg-[#1E1330] text-[#c6ff3d] px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase">
                Master Services Catalogue
              </span>
            </div>

            <h2 className="heading-xl tracking-tight text-[#161124] mb-3">
              A Complete Digital, Creative, <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#7C3AED]">
                Technology &amp; Growth
              </span>{" "}
              Agency.
            </h2>

            <p className="body-lg text-[#5A5068] max-w-2xl leading-relaxed">
              We operate across 10 specialized divisions delivering full-lifecycle digital dominance.
              Zero generic handoffs — direct senior architecture from strategic inception to global scale.
            </p>
          </div>

          {/* Action Buttons: Expand/Collapse All */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={isAllExpanded ? handleCollapseAll : handleExpandAll}
              className="inline-flex items-center gap-2 rounded-full border border-[#E8DFF2] bg-[#FAF8F5] px-4 py-2 font-mono text-xs font-semibold text-[#161124] hover:border-[#7C3AED] hover:bg-white transition-all shadow-sm"
            >
              <span>{isAllExpanded ? "Collapse All Drawers" : "Expand All Drawers"}</span>
              <ChevronDownIcon
                className={`size-3.5 text-[#7C3AED] transition-transform duration-300 ${
                  isAllExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#7C3AED] px-4 py-2 font-mono text-xs font-bold text-white shadow-md shadow-[#7C3AED]/25 hover:bg-[#6D28D9] transition-all"
            >
              <span>Brief a Project</span>
              <ArrowUpRightIcon className="size-3" />
            </a>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DISCIPLINE FILTER TABS                                         */}
        {/* ============================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {FILTER_GROUPS.map((grp) => {
            const isActive = selectedGroup === grp;
            return (
              <button
                key={grp}
                onClick={() => setSelectedGroup(grp)}
                className={`shrink-0 rounded-full px-4 py-1.5 font-mono text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/20"
                    : "border border-[#E8DFF2] bg-white text-[#5A5068] hover:border-[#7C3AED] hover:text-[#161124]"
                }`}
              >
                {grp}
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* 10 CORE SERVICES ACCORDION / DROPDOWN GRID                     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
          {filteredCategories.map((cat) => {
            const isExpanded = !!expandedIds[cat.id];

            return (
              <div
                key={cat.id}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 bg-white overflow-hidden shadow-sm hover:shadow-md ${
                  isExpanded ? "border-[#7C3AED] ring-1 ring-[#7C3AED]/20" : "border-[#E8DFF2]"
                }`}
              >
                {/* Header Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full text-left p-5 sm:p-6 lg:p-7 flex flex-col justify-between cursor-pointer focus:outline-none transition-colors hover:bg-[#FAF8F5]/50"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    {/* Number Badge + Group Tag */}
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#7C3AED] bg-[#F5EDFA] border border-[#E8DFF2] px-2.5 py-1 rounded-full">
                        {cat.num}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C8299]">
                        {cat.group}
                      </span>
                    </div>

                    {/* Expand/Collapse Dropdown Indicator */}
                    <div
                      className={`size-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? "bg-[#7C3AED] border-[#7C3AED] text-white rotate-180 shadow-sm"
                          : "border-[#E8DFF2] bg-[#FAF8F5] text-[#7C3AED]"
                      }`}
                    >
                      <ChevronDownIcon className="size-4" />
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#161124] leading-tight mb-2">
                    {cat.title}
                  </h3>

                  {/* Category Tagline */}
                  <p className="text-sm text-[#5A5068] leading-relaxed mb-4">
                    {cat.tagline}
                  </p>

                  {/* Collapsed Preview Chips (Quick Glance) */}
                  {!isExpanded && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {cat.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="font-mono text-[10px] text-[#5A5068] bg-[#FAF8F5] border border-[#E8DFF2] px-2.5 py-1 rounded-full truncate max-w-[200px]"
                        >
                          {sub}
                        </span>
                      ))}
                      {cat.subcategories.length > 3 && (
                        <span className="font-mono text-[10px] font-bold text-[#7C3AED] bg-[#F5EDFA] px-2 py-1 rounded-full">
                          +{cat.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </button>

                {/* Expandable Dropdown Drawer */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${cat.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-7 sm:pb-7 pt-2 border-t border-[#F2EBF7] bg-gradient-to-b from-white to-[#FAF8F5]/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C8299]">
                            All Capabilities ({cat.subcategories.length})
                          </span>
                          <span className="font-mono text-[10px] text-[#7C3AED] font-semibold">
                            Full Production Depth
                          </span>
                        </div>

                        {/* Subcategory Capabilities Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                          {cat.subcategories.map((sub) => (
                            <div
                              key={sub}
                              className="group/item flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-[#E8DFF2] hover:border-[#7C3AED] hover:shadow-sm transition-all"
                            >
                              <div className="size-5 rounded-full bg-[#F5EDFA] text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#7C3AED] group-hover/item:text-white transition-colors">
                                <CheckIcon className="size-3" />
                              </div>
                              <span className="text-xs sm:text-[13px] font-medium text-[#161124] leading-snug">
                                {sub}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Quick Brief CTA Link */}
                        <div className="mt-4 pt-3.5 border-t border-[#F2EBF7] flex items-center justify-between">
                          <span className="text-xs text-[#5A5068]">
                            Looking to deploy this division?
                          </span>
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
                          >
                            <span>Brief {cat.title.split(" ")[0]}</span>
                            <ArrowUpRightIcon className="size-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* ADDITIONAL SPECIALIZED INDUSTRY FRAMEWORKS                     */}
        {/* ============================================================== */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#E8DFF2]">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="label flex items-center gap-2 mb-2">
              <span className="size-1.5 rounded-full bg-[#7C3AED]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#7C3AED] font-bold">
                Specialized Solutions By Industry
              </span>
            </div>

            <h3 className="heading-lg font-display text-2xl sm:text-4xl font-bold text-[#161124] tracking-tight">
              Vertical Frameworks. Built for Your Exact Sector.
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#5A5068] leading-relaxed max-w-2xl">
              Instead of generic templates, we architect regulatory-conscious, high-conversion
              solutions tailored to each vertical industry.
            </p>
          </div>

          {/* 7 Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {INDUSTRY_SOLUTIONS.map((ind, idx) => (
              <div
                key={ind.name}
                className="rounded-2xl border border-[#E8DFF2] bg-white p-5 sm:p-6 shadow-sm hover:border-[#7C3AED] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] font-bold text-[#7C3AED] bg-[#F5EDFA] px-2.5 py-0.5 rounded-full border border-[#E8DFF2]">
                      SECTOR 0{idx + 1}
                    </span>
                    <span className="size-2 rounded-full bg-[#c6ff3d] shadow-[0_0_6px_#c6ff3d]" />
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#161124] mb-1.5 group-hover:text-[#7C3AED] transition-colors">
                    {ind.name}
                  </h4>

                  <p className="text-xs text-[#5A5068] leading-relaxed mb-4">
                    {ind.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2EBF7]">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#8C8299] mb-2">
                    Specialized Solutions
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {ind.solutions.map((sol) => (
                      <div
                        key={sol}
                        className="flex items-center gap-1.5 font-mono text-[11px] text-[#161124]"
                      >
                        <span className="size-1 rounded-full bg-[#7C3AED]" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Inquire Custom Industry Card */}
            <div className="rounded-2xl border border-dashed border-[#7C3AED]/40 bg-[#F5EDFA]/40 p-5 sm:p-6 flex flex-col justify-between text-center items-center">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#7C3AED] font-bold mb-2">
                  CUSTOM SECTOR //
                </div>
                <h4 className="font-display text-lg font-bold text-[#161124] mb-2">
                  Need a Bespoke Industry Architecture?
                </h4>
                <p className="text-xs text-[#5A5068] leading-relaxed">
                  We engineer tailor-made enterprise portals, secure data pipelines, and custom software for specialized industries.
                </p>
              </div>

              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#7C3AED] px-4 py-2 font-mono text-xs font-bold text-white shadow-md shadow-[#7C3AED]/25 hover:bg-[#6D28D9] transition-all"
              >
                <span>Request Custom Brief</span>
                <ArrowUpRightIcon className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
