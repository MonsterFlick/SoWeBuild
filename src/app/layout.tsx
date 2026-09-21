import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0e0b16",
};

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoWeBuild — Development Studio | Websites, Web Apps, AI & Automation",
  description:
    "SoWeBuild (sowebuild.in) is a technology development studio building high-performance websites, web apps, mobile apps, AI chatbots, WhatsApp automation, custom software, and API integrations.",
  keywords: [
    "SoWeBuild",
    "sowebuild.in",
    "web development",
    "web apps",
    "AI chatbots",
    "WhatsApp automation",
    "custom software",
    "Next.js development",
  ],
  authors: [{ name: "SoWeBuild Studio", url: "https://sowebuild.in" }],
  openGraph: {
    title: "SoWeBuild — Development Studio",
    description:
      "High-performance websites, web apps, mobile apps, AI chatbots & WhatsApp automation.",
    url: "https://sowebuild.in",
    siteName: "SoWeBuild",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoWeBuild — Development Studio",
    description: "High-performance websites, web apps, AI chatbots & WhatsApp automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} dark`}
    >
      <body className="antialiased bg-background text-foreground selection:bg-primary/40 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
