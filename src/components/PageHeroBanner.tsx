'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export interface SubpagePill {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: string;
}

export interface StatItem {
  value: string;
  label: string;
  color?: string;
}

export interface HeroBreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroBannerProps {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  bgImage: string;
  breadcrumb?: string;
  breadcrumbs?: HeroBreadcrumbItem[];
  subpagePills?: SubpagePill[];
  stats?: StatItem[];
  children?: React.ReactNode;
}

export const PageHeroBanner: React.FC<PageHeroBannerProps> = ({
  badgeText,
  badgeIcon,
  title,
  description,
  bgImage,
  breadcrumb,
  breadcrumbs,
  subpagePills,
  children,
}) => {
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (glowRef1.current && glowRef2.current) {
      const ctx = gsap.context(() => {
        gsap.to(glowRef1.current, {
          scale: 1.25,
          opacity: 0.28,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to(glowRef2.current, {
          scale: 1.35,
          x: 20,
          opacity: 0.22,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-12 sm:py-16 lg:py-20 border-b border-emerald-950/60 shadow-xl">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Page Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.85] contrast-[1.1]"
        />
        {/* Layered cinematic dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030706]/94 via-[#051712]/85 to-[#020b08]/96 backdrop-blur-[1px]" />
        
        {/* Ambient radial lighting glows with GSAP animations */}
        <div
          ref={glowRef1}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
        />
        <div
          ref={glowRef2}
          className="absolute bottom-0 right-10 w-[350px] h-[180px] bg-lime-400/10 rounded-full blur-3xl pointer-events-none"
        />
      </div>

      {/* Grid texture for design studio feel */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Foreground Content - Centered Header with Framer Motion */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3"
      >
        {/* Optional Subtle Pill Badge */}
        {badgeText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/35 text-emerald-300 text-[10px] sm:text-[11px] font-bold shadow-md shadow-emerald-950/40 backdrop-blur-md">
              {badgeIcon}
              <span className="tracking-wide uppercase font-extrabold">{badgeText}</span>
            </span>
          </motion.div>
        )}

        {/* Centered Large Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md"
        >
          {title}
        </motion.h1>

        {/* Centered Breadcrumb Navigation: Home » Page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide pt-1"
        >
          <Link
            href="/"
            className="text-lime-400 hover:text-lime-300 transition-colors"
          >
            Home
          </Link>
          <span className="text-amber-400 font-bold">&raquo;</span>

          {breadcrumb ? (
            <span className="text-white font-medium">{breadcrumb}</span>
          ) : breadcrumbs && breadcrumbs.length > 0 ? (
            breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-amber-400 font-bold">&raquo;</span>}
                {b.href ? (
                  <Link href={b.href} className="text-lime-400 hover:text-lime-300 transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{b.label}</span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span className="text-white font-medium">Page</span>
          )}
        </motion.div>

        {/* Optional Subtitle / Description (Concise) */}
        {description && (
          <p className="text-xs sm:text-sm text-gray-300/90 font-medium max-w-xl mx-auto leading-relaxed pt-1">
            {description}
          </p>
        )}

        {/* Sleek Navigation Link Buttons / Subpage Pills if provided */}
        {subpagePills && subpagePills.length > 0 && (
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            {subpagePills.map((pill, idx) => {
              const pillClasses = `group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 backdrop-blur-md cursor-pointer ${
                pill.active
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-900/40 border border-emerald-400/60 scale-[1.02]'
                  : 'bg-white/10 hover:bg-emerald-600 hover:text-white text-gray-200 border border-white/15 hover:border-emerald-400/50 hover:shadow-sm'
              }`;

              if (pill.href) {
                return (
                  <Link key={idx} href={pill.href} className={pillClasses}>
                    <span>{pill.label}</span>
                    {pill.badge && (
                      <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded-full bg-amber-400 text-gray-950">
                        {pill.badge}
                      </span>
                    )}
                  </Link>
                );
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={pill.onClick}
                  className={pillClasses}
                >
                  <span>{pill.label}</span>
                  {pill.badge && (
                    <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded-full bg-amber-400 text-gray-950">
                      {pill.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Optional Custom Injected Content */}
        {children}
      </motion.div>
    </section>
  );
};
