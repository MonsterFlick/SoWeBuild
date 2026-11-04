export interface ServiceCategory {
  id: string;
  num: string;
  title: string;
  tagline: string;
  group: "Brand & Creative" | "Engineering" | "Growth & Marketing" | "AI & Solutions";
  subcategories: string[];
}

export interface IndustrySolution {
  name: string;
  tagline: string;
  solutions: string[];
  serviceCategoryRef: string;
  shortBadge?: string;
  complianceBadge?: string;
  complianceNote?: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "branding",
    num: "01",
    title: "Branding & Creative Identity",
    tagline: "Building memorable and recognizable brands.",
    group: "Brand & Creative",
    subcategories: [
      "Brand Strategy & Positioning",
      "Logo & Visual Identity Design",
      "Brand Guidelines & Brand Development",
      "Rebranding & Brand Refresh",
      "Business Stationery & Corporate Identity",
      "Packaging & Product Branding",
      "Personal Branding",
    ],
  },
  {
    id: "web-development",
    num: "02",
    title: "Website & Web Development",
    tagline: "Building professional digital experiences and online platforms.",
    group: "Engineering",
    subcategories: [
      "Business & Corporate Websites",
      "E-commerce & Online Stores",
      "Landing Pages & Portfolio Websites",
      "Custom Web Applications & Portals",
      "CMS & Website Development (WordPress, Shopify, etc.)",
      "Website Redesign & Optimization",
      "Website Maintenance & Management",
    ],
  },
  {
    id: "mobile-software",
    num: "03",
    title: "Mobile App & Software Development",
    tagline: "Developing custom technology solutions for businesses.",
    group: "Engineering",
    subcategories: [
      "Android & iOS App Development",
      "Cross-Platform App Development",
      "Custom Business Software",
      "CRM & ERP Systems",
      "SaaS Product Development",
      "Admin Dashboards & Business Portals",
      "API & Third-Party Integrations",
    ],
  },
  {
    id: "digital-marketing",
    num: "04",
    title: "Digital Marketing & Advertising",
    tagline: "Helping businesses reach customers and generate revenue.",
    group: "Growth & Marketing",
    subcategories: [
      "Digital Marketing Strategy",
      "Google Ads & Search Advertising",
      "Meta Ads (Facebook & Instagram)",
      "LinkedIn & YouTube Advertising",
      "Performance Marketing & Lead Generation",
      "Remarketing & Retargeting",
      "Campaign Management & Analytics",
    ],
  },
  {
    id: "social-media",
    num: "05",
    title: "Social Media Management",
    tagline: "Building and managing a consistent social media presence.",
    group: "Growth & Marketing",
    subcategories: [
      "Social Media Strategy & Planning",
      "Social Media Account Management",
      "Content Calendar & Publishing",
      "Post, Carousel & Story Design",
      "Reels & Short-Form Video Creation",
      "Community & Engagement Management",
      "Influencer Marketing & Collaborations",
      "Social Media Analytics & Reporting",
    ],
  },
  {
    id: "seo",
    num: "06",
    title: "SEO & Online Visibility",
    tagline: "Improving search rankings, discoverability and organic traffic.",
    group: "Growth & Marketing",
    subcategories: [
      "Technical & On-Page SEO",
      "Off-Page SEO & Link Building",
      "Local SEO & Google Business Profile",
      "E-commerce SEO",
      "Keyword & Competitor Research",
      "Content SEO & Optimization",
      "Website SEO Audits & Reporting",
      "Online Reputation Management",
    ],
  },
  {
    id: "creative-studio",
    num: "07",
    title: "Creative Studio & Content Production",
    tagline: "Creating professional visual and marketing content.",
    group: "Brand & Creative",
    subcategories: [
      "Graphic Design & Marketing Creatives",
      "Brochures, Catalogues & Company Profiles",
      "Product Photography & Videography",
      "Corporate & Promotional Videos",
      "Video Editing & Motion Graphics",
      "Animation & Explainer Videos",
      "Copywriting & Content Writing",
      "Presentation & Pitch Deck Design",
    ],
  },
  {
    id: "ai-automation",
    num: "08",
    title: "AI, Automation & Business Intelligence",
    tagline: "Making businesses smarter through artificial intelligence and automation.",
    group: "AI & Solutions",
    subcategories: [
      "AI Chatbots & Virtual Assistants",
      "AI Voice Agents & Customer Support",
      "Custom AI Applications & AI Agents",
      "WhatsApp Business Automation",
      "Workflow & Business Process Automation",
      "AI Content & Marketing Automation",
      "CRM & Lead Automation",
      "AI Integration & Business Intelligence",
    ],
  },
  {
    id: "ecommerce-solutions",
    num: "09",
    title: "E-commerce & Business Solutions",
    tagline: "Helping businesses operate, sell and manage customers digitally.",
    group: "AI & Solutions",
    subcategories: [
      "E-commerce Store Setup & Management",
      "Payment Gateway Integration",
      "Inventory & Order Management",
      "Customer & Vendor Management Systems",
      "Booking & Appointment Systems",
      "Billing & Business Management Solutions",
      "Online Marketplace Development",
      "Business Process Digitalization",
    ],
  },
  {
    id: "it-infrastructure",
    num: "10",
    title: "IT Infrastructure & Technology Consulting",
    tagline: "Providing the technical foundation and expertise businesses need.",
    group: "Engineering",
    subcategories: [
      "Domain, Hosting & Cloud Solutions",
      "Business Email & Workspace Setup",
      "Server Setup & Management",
      "Website Security & Backup",
      "Website Maintenance & Technical Support",
      "Cloud Migration & Deployment",
      "Technology Consulting",
      "Digital Transformation Consulting",
    ],
  },
];

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    name: "Healthcare & Pharma",
    tagline: "Clinical-grade digital presence with ethical communication, patient privacy, and seamless procurement.",
    solutions: [
      "Healthcare & Hospital Websites",
      "Product & Equipment Catalogues",
      "Doctor Credentials & Appointment Systems",
      "Ethical Medical Communication",
    ],
    serviceCategoryRef: "web-development",
    shortBadge: "NMC 2026",
    complianceBadge: "NMC Ethical Guidelines Compliant",
    complianceNote: "Strictly aligned with The National Medical Commission (NMC) Guidelines on Ethical Advertising and Public Communication by Hospitals/Medical Institutions and Registered Medical Practitioners (issued October 6, 2026).",
  },
  {
    name: "Real Estate",
    tagline: "High-conversion property showcases with automated lead capture, RERA disclosures & broker portals.",
    solutions: [
      "Property Portals & Listing Websites",
      "Interactive Masterplans & Unit Viewers",
      "Automated Broker & Lead Management",
      "Site Visit & Booking Pipelines",
    ],
    serviceCategoryRef: "mobile-software",
    shortBadge: "RERA Aligned",
    complianceBadge: "RERA & Consumer Transparency Standards",
    complianceNote: "Engineered with mandatory RERA registration disclosures, verified carpet area representations, automated broker lead attribution, and real-time inventory locking.",
  },
  {
    name: "Education",
    tagline: "Scalable digital learning hubs, student portals, and automated high-concurrency admissions.",
    solutions: [
      "LMS Platforms & Student Portals",
      "Institutional & University Websites",
      "Admission & Fee Payment Automation",
      "Faculty & Examination Management",
    ],
    serviceCategoryRef: "web-development",
    shortBadge: "DPDP / FERPA",
    complianceBadge: "Student Privacy & UGC / NEP Aligned",
    complianceNote: "Built in adherence with Indian DPDP Act & global FERPA student data privacy norms, role-based educator/guardian access, and high-load admission pipelines.",
  },
  {
    name: "Manufacturing",
    tagline: "Industrial B2B platforms, technical spec catalogs, and operational workflow automation.",
    solutions: [
      "Corporate B2B Websites & Portals",
      "Technical Spec Sheets & CAD Downloads",
      "Distributor & Vendor Extranets",
      "Custom Request for Quote (RFQ) Engines",
    ],
    serviceCategoryRef: "ai-automation",
    shortBadge: "ISO & B2B Ready",
    complianceBadge: "Industrial Grade & ISO/ERP Specifications",
    complianceNote: "Engineered for technical buyer evaluation with downloadable spec sheets, enterprise ERP synchronizations, automated RFQ workflows, and verified distributor extranets.",
  },
  {
    name: "Retail & E-commerce",
    tagline: "Ultra-fast online storefronts with multi-warehouse inventory sync, automated billing, and abandoned cart recovery.",
    solutions: [
      "High-Performance Online Stores",
      "Inventory & Multi-Warehouse Sync",
      "Automated GST Billing & Payment Gateways",
      "WhatsApp Automation & Retention Flows",
    ],
    serviceCategoryRef: "ecommerce-solutions",
    shortBadge: "PCI-DSS Level 1",
    complianceBadge: "PCI-DSS & DPDP Act Data Privacy",
    complianceNote: "Bank-grade encrypted 256-bit checkouts, automated GST-compliant e-invoicing, DPDP Act consent management, and sub-second load times engineered for flash sales.",
  },
  {
    name: "Hospitality",
    tagline: "Direct reservation engines, dining booking experiences, and POS integrations that bypass heavy OTA fees.",
    solutions: [
      "Direct Hotel Reservation Websites",
      "Restaurant Booking & Menu Systems",
      "Multi-Property Central Portals",
      "POS & Payment Terminal Integrations",
    ],
    serviceCategoryRef: "web-development",
    shortBadge: "Direct Engine",
    complianceBadge: "Zero-Commission Direct Revenue System",
    complianceNote: "Bypasses 18-30% OTA commissions with direct guest booking engines, instant room inventory calendar sync, automated WhatsApp itineraries, and secure POS integrations.",
  },
  {
    name: "Professional Services",
    tagline: "Authority brand flagships, secure client document vaults, automated billing, and high-trust lead funnels.",
    solutions: [
      "Authority Portfolio & Practice Websites",
      "Encrypted Client Portals & KYC Vaults",
      "Automated Consultation & Calendar Booking",
      "CRM & Retainer Billing Integration",
    ],
    serviceCategoryRef: "mobile-software",
    shortBadge: "SOC-2 & NDA",
    complianceBadge: "Enterprise Confidentiality & SOC-2 Protocols",
    complianceNote: "Strict bilateral NDA governance, client document vaults with end-to-end encryption, multi-jurisdiction regulatory disclosures, and automated consultation workflows.",
  },
];

