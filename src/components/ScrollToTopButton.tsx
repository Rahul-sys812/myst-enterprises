'use client';

import React, { useState, useEffect } from 'react';
import { BsArrowUp } from 'react-icons/bs';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      if (currentScroll > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 print:hidden">
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-gray-950/85 hover:bg-emerald-950 text-white shadow-xl shadow-black/30 hover:shadow-emerald-500/40 border border-emerald-500/30 hover:border-emerald-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer"
        aria-label="Scroll to top"
        id="btn-scroll-to-top"
      >
        {/* Circular SVG Scroll Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            className="text-white/10"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={113}
            strokeDashoffset={113 - (113 * scrollProgress) / 100}
            className="text-lime-400 transition-all duration-150"
          />
        </svg>

        <BsArrowUp className="w-4 h-4 text-emerald-400 group-hover:text-lime-300 group-hover:-translate-y-0.5 transition-transform" />

        {/* Tooltip on hover */}
        <span className="absolute bottom-full mb-2 left-0 hidden group-hover:flex items-center px-2.5 py-1 text-[11px] font-bold text-white bg-gray-900 border border-emerald-500/30 rounded-lg whitespace-nowrap shadow-lg">
          Top
        </span>
      </button>
    </div>
  );
};
