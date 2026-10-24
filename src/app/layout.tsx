import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#07070a",
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
  title: "SoWeBuild — Technology Development Studio",
  description:
    "SoWeBuild is a technology development studio building high-performance websites, web apps, mobile apps, AI chatbots, WhatsApp automation, custom software, and cloud infrastructure. Engineered from zero to production. So We Build.",
  keywords: [
    "SoWeBuild",
    "sowebuild.in",
    "web development studio India",
    "web apps",
    "AI chatbots",
    "WhatsApp automation",
    "custom software",
    "Next.js development",
    "React development",
    "mobile app development",
    "API integrations",
  ],
  authors: [{ name: "SoWeBuild Studio", url: "https://sowebuild.in" }],
  creator: "SoWeBuild",
  publisher: "SoWeBuild",
  metadataBase: new URL("https://sowebuild.in"),
  openGraph: {
    title: "SoWeBuild — Technology Development Studio",
    description:
      "Engineered from zero to production. High-performance websites, web apps, AI chatbots & WhatsApp automation. So We Build.",
    url: "https://sowebuild.in",
    siteName: "SoWeBuild",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoWeBuild — Technology Development Studio",
    description:
      "Engineered from zero to production. High-performance websites, web apps, AI chatbots & automation. So We Build.",
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
    "@type": "Organization",
    name: "SoWeBuild",
    url: "https://sowebuild.in",
    email: "sowebuild.in@gmail.com",
    description:
      "Technology development studio building websites, web apps, AI chatbots, and WhatsApp automation.",
    sameAs: ["https://instagram.com/sowebuild.in"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "AI Chatbots",
      "WhatsApp Automation",
      "Custom Software",
      "API Integration",
      "Cloud Infrastructure",
    ],
  };

  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} ${fontSerif.variable}`}
    >
      <head>
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
