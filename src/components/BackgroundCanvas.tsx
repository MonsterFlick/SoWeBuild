"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Desktop only, fine pointer, motion allowed
    if (
      typeof window === "undefined" ||
      window.innerWidth < 1024 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 90;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Subtle ambient stars strictly in the outer peripheral margins — ZERO clutter behind main text
    const particleCount = 60;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorAccent = new THREE.Color("#c6ff3d");
    const colorDim = new THREE.Color("#4a4a58");

    for (let i = 0; i < particleCount; i++) {
      // Disperse exclusively along outer edges so the reading plane is clean
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const radius = 55 + Math.random() * 45; // Center radius 0-55 is 100% clear of dots

      positions[i * 3] = Math.cos(angle) * radius * 1.4;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const chosenColor = Math.random() > 0.85 ? colorAccent : colorDim;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 12;
      targetY = (e.clientY / window.innerHeight - 0.5) * 12;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Window resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Gentle camera parallax
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;
      camera.position.x = mouseX;
      camera.position.y = -mouseY;
      camera.lookAt(scene.position);

      // Barely perceptible drift
      particles.rotation.z += 0.00015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30"
      aria-hidden="true"
    />
  );
}
