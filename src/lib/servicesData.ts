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
    tagline: "Clinical-grade digital presence with seamless procurement and patient trust.",
    solutions: ["Healthcare websites", "Product catalogues", "Appointment systems"],
    serviceCategoryRef: "web-development",
  },
  {
    name: "Real Estate",
    tagline: "High-conversion property showcases with automated lead capture & broker portals.",
    solutions: ["Property portals", "Listing websites", "Lead management"],
    serviceCategoryRef: "mobile-software",
  },
  {
    name: "Education",
    tagline: "Scalable digital learning hubs, student portals, and enrollment automation.",
    solutions: ["LMS platforms", "School websites", "Admission management"],
    serviceCategoryRef: "web-development",
  },
  {
    name: "Manufacturing",
    tagline: "Industrial B2B platforms, technical spec catalogs, and operational automation.",
    solutions: ["Corporate websites", "Product catalogues", "Business automation"],
    serviceCategoryRef: "ai-automation",
  },
  {
    name: "Retail & E-commerce",
    tagline: "High-speed digital storefronts with multi-warehouse sync and automated billing.",
    solutions: ["Online stores", "Inventory & order management", "Payment integration"],
    serviceCategoryRef: "ecommerce-solutions",
  },
  {
    name: "Hospitality",
    tagline: "Direct reservation engines, guest booking experiences, and POS integrations.",
    solutions: ["Hotel websites", "Restaurant systems", "Booking platforms"],
    serviceCategoryRef: "web-development",
  },
  {
    name: "Professional Services",
    tagline: "Authority brand flagships, secure client document vaults, and automated CRM.",
    solutions: ["Portfolio websites", "Client portals", "CRM & lead flows"],
    serviceCategoryRef: "mobile-software",
  },
];
