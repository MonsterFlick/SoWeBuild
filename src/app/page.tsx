"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navigation from "@/components/Navigation";
import BackgroundCanvas from "@/components/BackgroundCanvas";
// 4 Essential Luxury Sections
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <SmoothScroll>
      {/* Luxury countup & curtain preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Trailing luxury cursor */}
      <CustomCursor />

      {/* Top hairline scroll progress */}
      <ScrollProgress />

      {/* Subtle, non-intrusive ambient background */}
      <BackgroundCanvas />

      {/* Fixed navigation */}
      <Navigation />

      {/* The 4 Core Studio Sections */}
      <main id="main-content" className="relative z-10">
        {/* 1. Hero / Studio Statement */}
        <HeroSection ready={!isLoading} />

        {/* 2. Visual Proof / Selected Work Showcase */}
        <WorkSection />

        {/* 3. Capabilities / What We Build */}
        <ServicesSection />

        {/* 4. Start a Build / Project Brief Configurator */}
        <ContactSection />
      </main>

      {/* Sleek Short-Height Luxury Footer */}
      <FooterSection />
    </SmoothScroll>
  );
}
