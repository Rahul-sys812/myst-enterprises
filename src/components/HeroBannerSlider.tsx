'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi2';

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  badge: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaType: 'quote' | 'whatsapp';
  secondaryCtaText: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    image: '/images/designs/banner-1.webp',
    alt: '#1 Graphic Design & Branding Agency India – MYST Enterprises Luxury Brand Identity, Vector Logos & 3D Packaging',
    badge: "India's #1 Creative Design Studio",
    title: '#1 Graphic Design & Branding Agency in India',
    description:
      'Direct AI & EPS vector masters, 3D retail packaging boxes, luxury restaurant menus & turnkey brand kits for ambitious businesses.',
    primaryCtaText: 'Explore Portfolio',
    primaryCtaHref: '/designs',
    secondaryCtaType: 'quote',
    secondaryCtaText: 'Instant Quote',
  },
  {
    id: 1,
    image: '/images/designs/banner-2.webp',
    alt: 'Turnkey Branding Agency India – Packaging, Merchandise & Gold Foil Business Cards by MYST Enterprises',
    badge: '24-48h Express Delivery Across India',
    title: 'Turnkey Branding for Cafes, Restaurants & Startups',
    description:
      'Luxury dine-in menus, takeaway food packaging, embossed gift boxes & custom corporate merchandise delivered fast.',
    primaryCtaText: 'Starter Packages',
    primaryCtaHref: '/new-business',
    secondaryCtaType: 'whatsapp',
    secondaryCtaText: 'Chat on WhatsApp',
  },
  {
    id: 2,
    image: '/images/designs/banner-3.webp',
    alt: 'Commercial 3D Product Packaging Design & Retail Box Dielines India – MYST Enterprises',
    badge: '3D Retail Packaging & Dielines',
    title: 'Custom Product Packaging & Retail Labels',
    description:
      'High-converting box dielines, cosmetics bottle labels, takeaway food pouches & photorealistic 3D renders that dominate retail shelves.',
    primaryCtaText: 'View Packaging',
    primaryCtaHref: '/products/packaging-design',
    secondaryCtaType: 'quote',
    secondaryCtaText: 'Instant Quote',
  },
];

interface HeroBannerSliderProps {
  onOpenQuote: () => void;
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = React.memo(({ onOpenQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full bg-stone-950 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="main-hero-carousel"
    >
      {/* Responsive Height Wrapper:
          - Mobile (<640px): min-h-[300px] aspect-[16/11]
          - Tablet (640-1024px): min-h-[380px] aspect-[16/8]
          - Desktop (>=1024px): min-h-[500px] max-h-[600px] aspect-[16/6] (8:3 ratio)
      */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/8] lg:aspect-[8/3] min-h-[300px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[540px] max-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Background 1600x600 Image */}
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center w-full h-full"
            />

            {/* Cinematic Multilayer Gradient Overlay for Maximum Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 sm:via-black/45 sm:to-transparent z-1" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 z-1" />

            {/* Responsive Text & Content Overlay */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 w-full">
                <motion.div
                  key={`slide-content-${slide.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
                  className="max-w-md sm:max-w-xl lg:max-w-2xl space-y-2 sm:space-y-3 lg:space-y-4 text-left"
                >
                  {/* Badge */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-emerald-950/85 border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                      <BsStars className="w-3 h-3 text-lime-400 shrink-0" />
                      <span>{slide.badge}</span>
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.2] tracking-tight drop-shadow-lg">
                    {slide.title}
                  </h1>

                  {/* Subtitle / Description */}
                  <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-200/90 font-medium leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-3 drop-shadow">
                    {slide.description}
                  </p>

                  {/* Responsive CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                    <Link
                      href={slide.primaryCtaHref}
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] sm:text-xs md:text-sm font-bold px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <span>{slide.primaryCtaText}</span>
                      <HiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>

                    {slide.secondaryCtaType === 'quote' ? (
                      <button
                        onClick={onOpenQuote}
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/25 text-[11px] sm:text-xs md:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <BsStars className="w-3.5 h-3.5 text-lime-400" />
                        <span>{slide.secondaryCtaText}</span>
                      </button>
                    ) : (
                      <a
                        href="https://wa.me/919667665892?text=Hello%20MYST%20Enterprises!%20I%20am%20interested%20in%20turnkey%20commercial%20design%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/25 text-[11px] sm:text-xs md:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{slide.secondaryCtaText}</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left Nav Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 border border-white/20 hover:border-white/50 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
          aria-label="Previous Banner"
        >
          <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Right Nav Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 border border-white/20 hover:border-white/50 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
          aria-label="Next Banner"
        >
          <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2">
          {HERO_SLIDES.map((s, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-6 sm:w-8 bg-white shadow-lg shadow-white/40'
                    : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
});

HeroBannerSlider.displayName = 'HeroBannerSlider';
