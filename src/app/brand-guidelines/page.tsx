import type { Metadata } from "next";
import Link from "next/link";
import { BrandHeader } from "@/components/brand/BrandHeader";
import { LogoShowcase } from "@/components/brand/LogoShowcase";
import { AnimatedLogoStudio } from "@/components/brand/AnimatedLogoStudio";
import { ColorPaletteSystem } from "@/components/brand/ColorPaletteSystem";
import { TypographySpecimen } from "@/components/brand/TypographySpecimen";
import { LogoGeometry } from "@/components/brand/LogoGeometry";
import { BrandRules } from "@/components/brand/BrandRules";
import { AssetDownloadMatrix } from "@/components/brand/AssetDownloadMatrix";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Brand Guidelines & Asset System — SoWeBuild",
  description:
    "Official brand identity, vector logos, animated GIF & MP4 assets, OKLCH color tokens, and typography guidelines for SoWeBuild (sowebuild.in). 100% code-generated.",
  openGraph: {
    title: "Brand Guidelines & Asset System — SoWeBuild",
    description:
      "Vector logos, animated GIF and MP4 assets, color tokens, and typography guidelines. 100% code-generated.",
    url: "https://sowebuild.in/brand-guidelines",
    siteName: "SoWeBuild",
  },
};

export default function BrandGuidelinesPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/40 selection:text-foreground">
      {/* Ambient background light aura */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-[500px] w-[600px] rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[700px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="grid-field absolute inset-0 opacity-40" />
      </div>

      {/* Sticky Header */}
      <BrandHeader />

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              Identity System & Digital Assets
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-tight text-foreground">
              SoWeBuild <br />
              <span className="text-gradient">Brand Guidelines.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Welcome to the official brand system of SoWeBuild. Designed for precision, engineering rigor, and cinematic visual impact. All brand marks, vectors, animated GIFs, and MP4 videos are synthesized 100% with code.
            </p>

            {/* Quick Spec Metric Badges */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                <div className="text-[10px] text-primary-glow font-bold">ASSET PROTOCOL</div>
                <div className="mt-1 text-sm font-bold text-foreground">100% Code</div>
                <div className="text-[10px] text-muted-foreground">Zero AI Images</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                <div className="text-[10px] text-cyan-400 font-bold">CORE ACCENT</div>
                <div className="mt-1 text-sm font-bold text-foreground">#BC37ED</div>
                <div className="text-[10px] text-muted-foreground">Electric Violet</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                <div className="text-[10px] text-primary-glow font-bold">TYPOGRAPHY</div>
                <div className="mt-1 text-sm font-bold text-foreground">Space Grotesk</div>
                <div className="text-[10px] text-muted-foreground">+ Manrope & Mono</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                <div className="text-[10px] text-cyan-400 font-bold">MOTION READY</div>
                <div className="mt-1 text-sm font-bold text-foreground">MP4 & GIF</div>
                <div className="text-[10px] text-muted-foreground">60 FPS Cinematic</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 space-y-8">
        <LogoShowcase />
        <AnimatedLogoStudio />
        <ColorPaletteSystem />
        <TypographySpecimen />
        <LogoGeometry />
        <BrandRules />
        <AssetDownloadMatrix />
      </div>

      {/* Footer */}
      <footer className="mt-32 border-t border-white/10 px-6 py-12 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <Logo size="small" />
            <span>© {new Date().getFullYear()} SoWeBuild Studio. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Studio Home
            </Link>
            <a href="#downloads" className="hover:text-foreground transition-colors">
              Brand Assets
            </a>
            <a href="mailto:sowebuild.in@gmail.com" className="hover:text-primary-glow transition-colors">
              sowebuild.in@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
