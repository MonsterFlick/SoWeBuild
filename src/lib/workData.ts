export interface CaseStudy {
  slug: string;
  client: string;
  category: string;
  title: string;
  subtitle: string;
  established?: string;
  liveUrl: string;
  summary: string;
  words: string[];
  problem: {
    title: string;
    subtitle: string;
    points: { headline: string; description: string }[];
  };
  animatedBanner: {
    prefix: string;
    highlight: string;
    tagline: string;
  };
  solution: {
    title: string;
    subtitle: string;
    overview: string;
    techStack: string[];
    deliverables: { title: string; desc: string }[];
  };
  metrics: { value: string; label: string; note: string }[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  fertisure: {
    slug: "fertisure",
    client: "FertiSure",
    category: "HEALTHCARE TECH",
    title: "FertiSure — Next-Gen IVF Equipment Portal & Embryology Catalog",
    subtitle: "High-performance medical portal for specialized embryology equipment trusted by 500+ clinics.",
    established: "Est. 1983 by Hemant Surgical Industries Limited",
    liveUrl: "https://fertisure.in",
    summary: "Engineered a sub-350ms medical catalog and secure inquiry dispatch system for specialized embryology equipment including sub-micron ICSI stations, incubators, and VOC filtration cleanrooms.",
    words: ["FertiSure.", "sub-350ms SSR.", "IVF technology.", "the solution."],
    problem: {
      title: "What Was The Problem?",
      subtitle: "Legacy PDF catalogs and high-latency inquiry friction were delaying clinic procurement.",
      points: [
        {
          headline: "Slow PDF Catalog Downloads",
          description: "Clinics and doctors struggled with 40MB static PDF spec sheets that failed on mobile networks.",
        },
        {
          headline: "Inquiry & Quote Latency",
          description: "International hospital leads from UAE, Singapore, and India waited days for manual sales dispatch.",
        },
        {
          headline: "Compliance & Data Security",
          description: "Medical equipment specs required HIPAA-compliant encrypted data handling without public data leaks.",
        },
      ],
    },
    animatedBanner: {
      prefix: "So We Build.",
      highlight: "FertiSure.",
      tagline: "Sub-second medical catalog, edge SSR, and zero-leakage inquiry vault.",
    },
    solution: {
      title: "The Solution & Architecture",
      subtitle: "Next.js 15 Turbopack SSR with edge caching and instant quote dispatch.",
      overview: "SoWeBuild designed and deployed an edge-cached digital medical catalog with sub-350ms initial page load speed, instant spec sheet search, and encrypted lead dispatch.",
      techStack: ["Next.js 15", "Turbopack", "Tailwind CSS", "TypeScript", "HIPAA Vault", "Vercel Edge"],
      deliverables: [
        {
          title: "Sub-350ms Edge SSR Catalog",
          desc: "Instant catalog navigation powered by multi-region Vercel Edge caching across 5 global regions.",
        },
        {
          title: "HIPAA-Compliant Quote Dispatch",
          desc: "Encrypted instant dispatch pipeline delivering clinic quote requests directly to engineering ops.",
        },
        {
          title: "Cinematic Glassmorphic UI",
          desc: "Fluid mobile-first interface optimized for surgeons, embryologists, and hospital directors.",
        },
      ],
    },
    metrics: [
      { value: "500+", label: "Clinics Worldwide", note: "Active hospital & IVF lab clients" },
      { value: "<350ms", label: "Initial Load Speed", note: "Sub-second edge cached SSR" },
      { value: "5", label: "Global Regions", note: "Multi-region CDN deployment" },
    ],
  },

  "alphatech-nutrition": {
    slug: "alphatech-nutrition",
    client: "Alpha Tech Nutrition",
    category: "LIVE E-COMMERCE & QR ENGINE",
    title: "Alpha Tech Nutrition — Anti-Counterfeit E-Commerce Platform",
    subtitle: "High-performance sports nutrition store backed by a cryptographic QR verification engine.",
    liveUrl: "https://alphatech-nutrition.in",
    summary: "Engineered a direct-to-consumer e-commerce platform with 100% anti-counterfeit QR batch validation, scannable authenticity seals, and sub-second checkout.",
    words: ["Alpha Tech.", "anti-counterfeit QR.", "100% authentic.", "the solution."],
    problem: {
      title: "What Was The Problem?",
      subtitle: "Counterfeit supplements in the market were undermining consumer trust.",
      points: [
        {
          headline: "Counterfeit Supplement Risks",
          description: "Fake protein tubs in retail stores caused customer health concerns and damaged brand reputation.",
        },
        {
          headline: "Lack of Batch Verification",
          description: "Customers had no instant way to verify if their specific tub came from a genuine certified lab batch.",
        },
        {
          headline: "Checkout Drop-off",
          description: "Slow traditional e-commerce templates caused high cart abandonment rates on mobile devices.",
        },
      ],
    },
    animatedBanner: {
      prefix: "So We Build.",
      highlight: "Alpha Tech.",
      tagline: "Cryptographic batch QR seals, instant lab certificate lookup & edge checkout.",
    },
    solution: {
      title: "The Solution & Architecture",
      subtitle: "Next.js App Router store connected to Redis cryptographic QR validation engine.",
      overview: "SoWeBuild created a 100% anti-counterfeit QR verification engine. Every tub carries a unique cryptographic QR seal that customers scan to view real-time batch purity & lab certificates.",
      techStack: ["Next.js App Router", "QR Cryptography", "Redis Cache", "Tailwind CSS", "Stripe API"],
      deliverables: [
        {
          title: "Cryptographic QR Engine",
          desc: "Unique scannable QR verification on every tub with instant lab certificate dispatch.",
        },
        {
          title: "Sub-Second Mobile Storefront",
          desc: "Optimized Next.js App Router ecommerce experience with zero layout shift and instant cart updates.",
        },
        {
          title: "Automated Batch Verification",
          desc: "Redis-cached batch authentication serving thousands of scannable QR verification requests per minute.",
        },
      ],
    },
    metrics: [
      { value: "100%", label: "Anti-Counterfeit", note: "Unique cryptographic batch seal" },
      { value: "200 OK", label: "Verified SLA", note: "Instant lab certificate lookup" },
      { value: "<500ms", label: "Checkout Latency", note: "Optimized mobile payment funnel" },
    ],
  },
};
