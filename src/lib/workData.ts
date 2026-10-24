export interface CaseStudy {
  slug: string;
  client: string;
  category: string;
  title: string;
  subtitle: string;
  established?: string;
  year?: string;
  timeline?: string;
  role?: string;
  liveUrl: string;
  image: string;
  summary: string;
  words: string[];
  businessNeed: {
    title: string;
    subtitle: string;
    points: { headline: string; description: string }[];
  };
  soWeBuild: {
    title: string;
    subtitle: string;
    pillars: { title: string; desc: string; stat?: string }[];
  };
  metrics: { value: string; label: string; note: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  fertisure: {
    slug: "fertisure",
    client: "FertiSure",
    category: "HEALTHCARE // MEDICAL PORTAL",
    title: "FertiSure — Digital Healthcare Portal & Global Clinic Catalog",
    subtitle: "Built from scratch to empower 500+ clinics and global hospitals with direct equipment inquiries.",
    established: "Est. 1983 by Hemant Surgical Industries Limited",
    year: "2024",
    timeline: "6 Weeks From Zero to Live",
    role: "Complete Platform Engineering",
    liveUrl: "https://fertisure.in",
    image: "/work-fertisure-official.webp",
    summary: "Built completely from the ground up for a 40-year healthcare leader, taking their specialized equipment catalog online for global hospital procurement.",
    words: ["FertiSure.", "the digital portal.", "clinic trust.", "the solution."],
    businessNeed: {
      title: "The Business Challenge",
      subtitle: "Starting from zero digital infrastructure.",
      points: [
        {
          headline: "Physical Paper Friction",
          description: "Printed brochures and phone calls slowed clinic procurement.",
        },
        {
          headline: "Global Hospital Reach",
          description: "Hospital chains in 5 countries lacked instant digital access.",
        },
        {
          headline: "Slow Quote Cycles",
          description: "Manual email delays stalled commercial purchase orders.",
        },
      ],
    },
    soWeBuild: {
      title: "Built From Zero.",
      subtitle: "Engineered from scratch for global clinic reach and trust.",
      pillars: [
        {
          title: "Digital Equipment Catalog",
          desc: "Full equipment specs accessible to 500+ clinics worldwide.",
          stat: "500+ Clinics",
        },
        {
          title: "Direct Quote Pipeline",
          desc: "Hospital directors dispatch quote requests to sales in seconds.",
          stat: "< 1 Min Dispatch",
        },
        {
          title: "Clinical Trust Engine",
          desc: "Digital authority honoring 40+ years of healthcare manufacturing.",
          stat: "40-Yr Legacy",
        },
      ],
    },
    metrics: [
      { value: "500+", label: "Clinics Reached", note: "Hospital & IVF clients served" },
      { value: "100%", label: "Built From Zero", note: "Ground-up engineering" },
      { value: "5", label: "Global Markets", note: "Active international client reach" },
      { value: "< 1m", label: "Quote Turnaround", note: "Direct sales dispatch" },
    ],
    testimonial: {
      quote: "SoWeBuild delivered our entire digital catalog from scratch. Hospital procurement teams can now inspect specs and request quotes immediately.",
      author: "Clinical Operations Director",
      role: "Hemant Surgical Industries Ltd.",
    },
  },

  "alphatech-nutrition": {
    slug: "alphatech-nutrition",
    client: "Alpha Tech Nutrition",
    category: "E-COMMERCE // ANTI-COUNTERFEIT",
    title: "Alpha Tech Nutrition — Anti-Counterfeit E-Commerce Platform",
    subtitle: "Built from scratch with an instant QR authenticity verification engine to protect customer trust.",
    established: "Premium Sports Nutrition Brand",
    year: "2024",
    timeline: "5 Weeks From Zero to Live",
    role: "Brand Store & Verification System",
    liveUrl: "https://alphatech-nutrition.in",
    image: "/work-alphatech-official.webp",
    summary: "Built the complete online storefront from scratch with a custom one-time QR authenticity seal on every tub for verified customer trust.",
    words: ["Alpha Tech.", "100% verified trust.", "the direct store.", "the solution."],
    businessNeed: {
      title: "The Business Challenge",
      subtitle: "Starting from zero in a market flooded with counterfeits.",
      points: [
        {
          headline: "Rampant Counterfeits",
          description: "Fake retail supplements destroy customer trust before buying.",
        },
        {
          headline: "Proof of Authenticity",
          description: "A new brand needed an indisputable way to prove purity.",
        },
        {
          headline: "Mobile Drop-Off",
          description: "Clunky checkouts lose over 50% of direct customer sales.",
        },
      ],
    },
    soWeBuild: {
      title: "Built From Zero.",
      subtitle: "Engineered from scratch for verified trust and instant sales.",
      pillars: [
        {
          title: "One-Time QR Verification",
          desc: "Instant smartphone scan proving 100% genuine lab batch purity.",
          stat: "100% Anti-Fake",
        },
        {
          title: "Direct-to-Athlete Store",
          desc: "High-speed storefront delivering frictionless mobile purchasing.",
          stat: "1-Click Checkout",
        },
        {
          title: "Full Margin Control",
          desc: "Direct brand sales eliminating counterfeit retail middlemen.",
          stat: "Zero Middlemen",
        },
      ],
    },
    metrics: [
      { value: "100%", label: "Authenticity Verified", note: "One-time QR batch seal" },
      { value: "Zero", label: "Counterfeiting Risk", note: "Tamper-proof digital seal" },
      { value: "1-Click", label: "Mobile Checkout", note: "Frictionless buying flow" },
      { value: "4.2x", label: "Customer Trust Lift", note: "Direct batch purity transparency" },
    ],
    testimonial: {
      quote: "The QR verification system built by SoWeBuild gave us the ultimate advantage. Customers scan their tub on the spot and know it is 100% authentic.",
      author: "Founder & CEO",
      role: "Alpha Tech Nutrition",
    },
  },
};
