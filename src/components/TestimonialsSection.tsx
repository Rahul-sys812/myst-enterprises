'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BsStars, BsStarFill, BsPatchCheckFill, BsQuote, BsClockHistory } from 'react-icons/bs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Testimonial {
  id: number;
  author: string;
  role: string;
  serviceTag: string;
  serviceTagColor: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    author: 'Aarav Mehta',
    role: 'Founder, The Food Corner (Mumbai)',
    serviceTag: 'Menu & Packaging',
    serviceTagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    quote:
      'MYST transformed our restaurant into a high-end dining destination. The food menu design and takeaway packaging helped drive a 30% jump in orders.',
  },
  {
    id: 2,
    author: 'Pooja Sharma',
    role: 'Co-Founder, Nutroma Foods (Bengaluru)',
    serviceTag: 'FMCG Packaging',
    serviceTagColor: 'bg-lime-50 text-lime-800 border-lime-200',
    quote:
      'Our packaging dielines were 100% press-ready with zero printing errors. Spot UV and barcode placement were spot on. Most reliable agency for packaging.',
  },
  {
    id: 3,
    author: 'Vikramaditya Rao',
    role: 'Director, Suravile Steakhouse (Delhi NCR)',
    serviceTag: 'Logo & Branding',
    serviceTagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    quote:
      'Within 36 hours, we received 3 distinct, breathtaking vector concepts. Master AI, EPS & SVG files were delivered with complete IP copyright.',
  },
  {
    id: 4,
    author: 'Sneha Kulkarni',
    role: 'Creative Head, Aura Botanics (Pune)',
    serviceTag: 'Cosmetic Boxes',
    serviceTagColor: 'bg-teal-50 text-teal-800 border-teal-200',
    quote:
      'The luxury aesthetic they gave our skincare boxes looks like an international European cosmetic label. Direct WhatsApp collaboration made revisions effortless.',
  },
  {
    id: 5,
    author: 'Rohit Singhania',
    role: 'Managing Partner, Trend Tree (Jaipur)',
    serviceTag: 'Retail & Apparel',
    serviceTagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    quote:
      'Their custom typography, shopping bag mockups, and garment tags gave our retail store unshakable brand trust and customer appeal.',
  },
  {
    id: 6,
    author: 'Kavita Sharma',
    role: 'Founder, Sharma Cafe & Sweets (Indore)',
    serviceTag: 'Foil Box Design',
    serviceTagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    quote:
      'They designed our festive sweet box packaging with gold foil stamping and embossed textures. Delivered 14 variations in 48 hours right before the festive rush.',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive items visible
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);

  // Keep index within bounds if window resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play carousel
  useEffect(() => {
    if (!isPaused && maxIndex > 0) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, maxIndex]);

  const totalSteps = maxIndex + 1;

  return (
    <section
      className="py-12 sm:py-16 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-t border-gray-200 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="client-testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <BsStars className="w-3.5 h-3.5 text-emerald-700" />
              Verified Client Reviews
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 mt-2.5 leading-tight tracking-tight">
              Trusted by 500+ Indian Brands &amp; Founders
            </h2>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs text-gray-950 font-semibold">
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400 gap-0.5">
                  <BsStarFill className="w-3.5 h-3.5" />
                  <BsStarFill className="w-3.5 h-3.5" />
                  <BsStarFill className="w-3.5 h-3.5" />
                  <BsStarFill className="w-3.5 h-3.5" />
                  <BsStarFill className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold">4.9 / 5</span>
                <span className="text-gray-500 font-normal">(1,000+ Projects)</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1 text-emerald-800">
                <BsPatchCheckFill className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Commercial Copyright</span>
              </div>
              <span className="hidden sm:inline text-gray-300">•</span>
              <div className="hidden sm:flex items-center gap-1 text-teal-800">
                <BsClockHistory className="w-3.5 h-3.5 text-teal-600" />
                <span>24-48h Proofing</span>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-gray-800 hover:text-emerald-700 flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-gray-800 hover:text-emerald-700 flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next Testimonial"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Window */}
        <div className="relative overflow-hidden -mx-2 sm:-mx-3">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="shrink-0 px-2 sm:px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="h-full flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md hover:border-emerald-400/80 transition-all duration-200">
                  {/* Top Bar: Stars & Quote Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex text-amber-400 gap-0.5">
                        <BsStarFill className="w-3.5 h-3.5" />
                        <BsStarFill className="w-3.5 h-3.5" />
                        <BsStarFill className="w-3.5 h-3.5" />
                        <BsStarFill className="w-3.5 h-3.5" />
                        <BsStarFill className="w-3.5 h-3.5" />
                      </div>
                      <BsQuote className="w-5 h-5 text-emerald-200 shrink-0" />
                    </div>

                    {/* Quote Text - Compact & Dark */}
                    <p className="text-xs sm:text-[13px] text-gray-950 font-medium leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="pt-3.5 mt-3.5 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-950 flex items-center gap-1 truncate">
                        <span>{t.author}</span>
                        <BsPatchCheckFill className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Verified Client" />
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 font-semibold truncate">
                        {t.role}
                      </p>
                    </div>

                    <span
                      className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${t.serviceTagColor}`}
                    >
                      {t.serviceTag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        {totalSteps > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-6">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 bg-emerald-600'
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
