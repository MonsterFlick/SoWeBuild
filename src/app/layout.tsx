import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FAF8F5",
};

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
});

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

/* Instrument Serif is available in next/font/google but only as italic
   We load it as a Google Font with italic style */
const fontSerif = localFont({
  src: "../fonts/InstrumentSerif-Italic.ttf",
  variable: "--font-instrument-serif",
  display: "swap",
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: {
    default: "SoWeBuild - Premium Digital Agency",
    template: "%s - SoWeBuild",
  },
  description:
    "SoWeBuild is a premium digital agency. We help businesses build their brand and powerful online presence with our premium services, from modern websites to custom digital tools and smart automation.",
  keywords: [
    "SoWeBuild",
    "sowebuild.in",
    "technology development studio",
    "web development agency India",
    "bespoke web applications",
    "AI chatbots and automation",
    "WhatsApp business automation",
    "custom software development",
    "Next.js engineering studio",
    "React development",
    "enterprise software development",
    "cloud infrastructure consulting",
  ],
  authors: [{ name: "SoWeBuild Studio", url: "https://sowebuild.in" }],
  creator: "SoWeBuild",
  publisher: "SoWeBuild",
  metadataBase: new URL("https://sowebuild.in"),
  alternates: {
    canonical: "https://sowebuild.in",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "SoWeBuild - Premium Digital Agency",
    description:
      "We help businesses build their brand and powerful online presence with our premium services, from modern websites to custom digital tools and smart automation.",
    url: "https://sowebuild.in",
    siteName: "SoWeBuild",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SoWeBuild - Premium Digital Agency",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoWeBuild - Premium Digital Agency",
    description:
      "We help businesses build their brand and powerful online presence with our premium services, from modern websites to custom digital tools and smart automation.",
    images: ["/og-image.png"],
    creator: "@sowebuild",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://sowebuild.in/#website",
        url: "https://sowebuild.in",
        name: "SoWeBuild",
        alternateName: ["SWB", "SoWeBuild Studio", "SoWeBuild.in"],
        description: "Technology development and digital product engineering studio.",
        publisher: {
          "@id": "https://sowebuild.in/#organization",
        },
        inLanguage: "en-IN",
      },
      {
        "@type": ["ProfessionalService", "Organization"],
        "@id": "https://sowebuild.in/#organization",
        name: "SoWeBuild",
        legalName: "SoWeBuild Studio",
        url: "https://sowebuild.in",
        logo: "https://sowebuild.in/icon.png",
        image: "https://sowebuild.in/og-image.png",
        description:
          "SoWeBuild is a premium digital agency. We help businesses build their brand and powerful online presence with our premium services, from modern websites to custom digital tools and smart automation.",
        email: "sowebuild.in@gmail.com",
        telephone: "+91-7756898550",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 19.076,
          longitude: 72.8777,
        },
        areaServed: [
          "India",
          "United States",
          "United Kingdom",
          "United Arab Emirates",
          "European Union",
          "Global Remote",
        ],
        priceRange: "$$$",
        currenciesAccepted: "INR, USD, EUR, GBP, AED",
        paymentAccepted: "Bank Transfer, Stripe, Wire Transfer",
        founder: {
          "@type": "Person",
          name: "Om Thakur",
          url: "https://omthakur.in",
          jobTitle: "Founder & Lead Software Engineer",
          sameAs: [
            "https://omthakur.in",
            "https://github.com/MonsterFlick",
          ],
        },
        subOrganization: {
          "@type": "OnlineStore",
          name: "SoWeBuild Store",
          url: "https://store.sowebuild.in",
          description: "Production toolkits, developer ebooks, architectural playbooks, and starter systems.",
        },
        sameAs: [
          "https://instagram.com/sowebuild.in",
          "https://linkedin.com/company/sowebuild-in",
          "https://github.com/MonsterFlick/SoWeBuild",
          "https://api.whatsapp.com/send?phone=917588666776",
          "https://omthakur.in",
          "https://store.sowebuild.in",
        ],
        knowsAbout: [
          "Web Application Development",
          "Mobile App Development",
          "Custom Software & Enterprise ERP",
          "AI Chatbots & Autonomous AI Agents",
          "WhatsApp Cloud API Automation",
          "Digital Marketing & Performance Ads",
          "SEO & Online Visibility",
          "Creative Studio & Video Production",
          "Cloud Migration & IT Infrastructure",
          "National Medical Commission (NMC) Ethical Advertising Guidelines (Oct 6, 2026)",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Master Services Catalogue",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "01. Branding & Creative Identity",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Strategy & Positioning" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logo & Visual Identity Design" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Packaging & Product Branding" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "02. Website & Web Development",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business & Corporate Websites" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Web Applications & Portals" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce & Online Stores" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "03. Mobile App & Software Development",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Android & iOS App Development" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Business Software & ERP" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Product Development" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "04. Digital Marketing & Advertising",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance Marketing & Google Ads" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta, LinkedIn & YouTube Ads" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "05. Social Media Management",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Strategy & Planning" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Creation, Reels & Analytics" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "06. SEO & Online Visibility",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical, On-Page & Local SEO" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Search & Answer Engine Optimization (AEO)" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "07. Creative Studio & Content Production",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Video Production & 3D Motion" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Copywriting & Pitch Deck Design" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "08. AI, Automation & Business Intelligence",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom AI Applications & Autonomous Agents" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Business Automation & CRM Workflows" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "09. E-commerce & Business Solutions",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Online Marketplace Development" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inventory & Order Management Automation" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "10. IT Infrastructure & Technology Consulting",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Migration, Security & DevOps" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Transformation Consulting" } },
              ],
            },
          ],
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} ${fontSerif.variable}`}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased grain">
        {children}
      </body>
    </html>
  );
}
