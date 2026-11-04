"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ZapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LockIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.148.566 4.167 1.554 5.918l-1.554 5.666 5.798-1.521c1.706.945 3.664 1.487 5.752 1.487 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 1024;
    if (isReducedMotion || isMobile) {
      gsap.set(container, { opacity: 1, y: 0 });
      return;
    }

    const tw = gsap.fromTo(
      container,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      }
    );

    return () => {
      tw.kill();
      tw.scrollTrigger?.kill();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        countryCode: formData.countryCode,
        phone: digitsOnly,
        projectType: "Direct Build Brief",
        message: formData.message,
      };

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.warn("API response:", data);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding"
      style={{
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      <div className="container-wide">
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
        >
          {/* Left Column: Studio Line & Assurance */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 max-w-lg lg:max-w-none">
            <div className="label" style={{ marginBottom: "0.75rem" }}>
              Get In Touch
            </div>
            <h2 className="heading-xl" style={{ marginBottom: "1rem" }}>
              Have a project in mind?
              <br />
              <span className="serif-accent">Let&apos;s build it</span> together.
            </h2>
            <p
              className="body-lg"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.65,
                marginBottom: "clamp(1.5rem, 3vw, 2.25rem)",
              }}
            >
              Tell us about your business goals. We review every brief and reply within 24 hours with a clear roadmap, upfront pricing, and zero agency fluff.
            </p>

            {/* Client Assurance Badges */}
            <div
              className="w-full text-left"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                {
                  icon: <ZapIcon />,
                  title: "Fast 24-Hour Plan",
                  desc: "We review your requirements and send a clear timeline and transparent pricing.",
                },
                {
                  icon: <EyeIcon />,
                  title: "Weekly Working Previews",
                  desc: "Test your website or application on your own mobile device every 7 days as we build it.",
                },
                {
                  icon: <LockIcon />,
                  title: "100% Full IP Ownership",
                  desc: "You own all code, repositories, designs, and cloud accounts. Zero agency hostage lock-ins.",
                },
              ].map((badge) => (
                <div
                  key={badge.title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "var(--radius-md)",
                      background: "#F5EDFA",
                      border: "1px solid #E8DFF2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {badge.icon}
                  </span>
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9375rem",
                        fontWeight: 700,
                        marginBottom: "0.2rem",
                      }}
                    >
                      {badge.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Brief Form Console with Direct Contact Channels Below */}
          <div className="lg:col-span-7">
            <div
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                padding: "clamp(1.25rem, 2.5vw, 2.5rem)",
                position: "relative",
              }}
            >
              {!isSubmitted ? (
                <div>
                  <form onSubmit={handleSubmit}>
                    <div
                      className="label"
                      style={{ marginBottom: "1.25rem" }}
                    >
                      Brief Your Project
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="input-group">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder=" "
                        />
                        <label>Your Name *</label>
                      </div>

                      <div className="input-group">
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder=" "
                        />
                        <label>Work Email *</label>
                      </div>
                    </div>

                    {/* Phone with Country Code */}
                    <div className="mb-4" style={{ display: "flex", gap: "0.75rem" }}>
                      <div style={{ width: "85px", flexShrink: 0 }}>
                        <div className="input-group">
                          <input
                            type="text"
                            value={formData.countryCode}
                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                            placeholder=" "
                            style={{ textAlign: "center" }}
                          />
                          <label>Code</label>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="input-group">
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                            placeholder=" "
                          />
                          <label>Phone / WhatsApp *</label>
                        </div>
                      </div>
                    </div>

                    {/* Requirements / Project Scope */}
                    <div className="input-group mb-4">
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder=" "
                        style={{ resize: "vertical" }}
                      />
                      <label>Tell us about the project, business problem, or timeline *</label>
                    </div>

                    {errorMessage && (
                      <div
                        style={{
                          padding: "0.75rem 1rem",
                          marginBottom: "1rem",
                          borderRadius: "var(--radius-md)",
                          background: "rgba(255, 68, 68, 0.1)",
                          border: "1px solid var(--color-error)",
                          color: "var(--color-error)",
                          fontSize: "0.8125rem",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div style={{ marginTop: "1rem" }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full"
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          padding: "1rem",
                          fontSize: "0.875rem",
                          opacity: isSubmitting ? 0.7 : 1,
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                        }}
                      >
                        <span>
                          {isSubmitting ? "Dispatching Brief..." : "Initiate Build Brief →"}
                        </span>
                      </button>
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "0.625rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                          <LockIcon size={12} />
                          Confidentiality guaranteed · Zero spam · Direct builder review
                        </span>
                      </div>
                    </div>
                  </form>

                  {/* Direct Contact Channels Below Inquiry Form */}
                  <div
                    style={{
                      marginTop: "1.75rem",
                      paddingTop: "1.5rem",
                      borderTop: "1px solid var(--color-border)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.875rem",
                    }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span
                        className="label"
                        style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
                      >
                        Prefer Direct Contact?
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          color: "var(--color-accent)",
                          fontWeight: 600,
                        }}
                      >
                        24-Hour Scope SLA
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Direct Calling Channel */}
                      <a
                        href="tel:+917756898550"
                        className="link-sweep"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.75rem 1rem",
                          borderRadius: "var(--radius-md)",
                          background: "var(--color-bg)",
                          border: "1px solid var(--color-border)",
                          textDecoration: "none",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.8125rem",
                          color: "var(--color-text)",
                        }}
                      >
                        <PhoneIcon />
                        <div>
                          <div style={{ fontSize: "0.625rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Call Directly</div>
                          <div style={{ fontWeight: 700 }}>+91 77568 98550</div>
                        </div>
                      </a>

                      {/* WhatsApp Channel (Number + Username) */}
                      <a
                        href="https://api.whatsapp.com/send?phone=917588666776&text=Hi%20SoWeBuild%2C%20I%20would%20like%20to%20discuss%20a%20project%20for%20my%20business."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-sweep"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.75rem 1rem",
                          borderRadius: "var(--radius-md)",
                          background: "var(--color-bg)",
                          border: "1px solid var(--color-border)",
                          textDecoration: "none",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.8125rem",
                          color: "var(--color-accent)",
                        }}
                      >
                        <WhatsAppIcon className="size-4" />
                        <div>
                          <div style={{ fontSize: "0.625rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>WhatsApp (@sowebuild.in)</div>
                          <div style={{ fontWeight: 700 }}>+91 75886 66776</div>
                        </div>
                      </a>
                    </div>

                    {/* Email & Social Channels */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pt-1 text-xs font-mono text-[var(--color-text-secondary)]">
                      <a
                        href="mailto:sowebuild.in@gmail.com"
                        className="link-sweep flex items-center gap-1.5 hover:text-[var(--color-text)]"
                      >
                        <MailIcon />
                        sowebuild.in@gmail.com
                      </a>

                      <div className="flex items-center gap-3">
                        <a
                          href="https://instagram.com/sowebuild.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-sweep flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                        >
                          <InstagramIcon />
                          @sowebuild.in
                        </a>
                        <span>·</span>
                        <a
                          href="https://linkedin.com/company/sowebuild-in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-sweep flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                        >
                          <LinkedInIcon />
                          LinkedIn
                        </a>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                          <MapPinIcon />
                          Mumbai · Worldwide
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Success Confirmation State */
                <div
                  style={{
                    padding: "3rem 1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "#16131D",
                      border: "1px solid var(--color-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                      boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path
                        d="M7 14l5 5L21 9"
                        stroke="#7C3AED"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="heading-md" style={{ marginBottom: "0.75rem" }}>
                    Project Brief Received
                  </h3>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      maxWidth: "420px",
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    We&apos;ve received your message. We will review your requirements and reply via email / WhatsApp within 24 hours.
                  </p>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1.1rem",
                      borderRadius: "var(--radius-full)",
                      background: "#F5EDFA",
                      border: "1px solid #E8DFF2",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "#7C3AED",
                    }}
                  >
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7C3AED" }} />
                    Status: Received &amp; Queued for Review
                  </div>

                  <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a
                      href="https://api.whatsapp.com/send?phone=917588666776&text=Hi%20SoWeBuild%2C%20I%20just%20submitted%20a%20project%20inquiry%20on%20your%20site."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{
                        padding: "0.625rem 1.25rem",
                        fontSize: "0.75rem",
                        borderRadius: "var(--radius-full)",
                        borderColor: "var(--color-border)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <WhatsAppIcon className="size-4" />
                      <span>Chat directly on WhatsApp (+91 75886 66776 · @sowebuild.in) ↗</span>
                    </a>
                  </div>

                  <div style={{ marginTop: "1.75rem" }}>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="link-sweep"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      ← Submit another inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
