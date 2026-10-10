'use client';

import React, { useState, useEffect } from 'react';

const LOADING_STEPS = [
  { threshold: 25, label: 'Initializing Creative Engine...' },
  { threshold: 55, label: 'Loading Commercial Portfolios...' },
  { threshold: 85, label: 'Calibrating Vector Master Suites...' },
  { threshold: 100, label: 'Welcome to MYST Enterprises' }
];

export function WebsiteLoader() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Creative Engine...');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Check if loader was already shown during this browser session
    const hasLoaded = sessionStorage.getItem('myst_site_loaded');
    if (hasLoaded) {
      setIsMounted(false);
      return;
    }

    // Lock body scroll while loader is active
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Smooth dynamic increments
      const increment = Math.floor(Math.random() * 12) + 8;
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      const currentStep = LOADING_STEPS.find((step) => currentProgress <= step.threshold) || LOADING_STEPS[LOADING_STEPS.length - 1];
      setStatusText(currentStep.label);

      if (currentProgress >= 100) {
        clearInterval(interval);
        sessionStorage.setItem('myst_site_loaded', 'true');

        // Short pause at 100% before smooth fade-out
        setTimeout(() => {
          setIsFadingOut(true);
          document.body.style.overflow = '';

          // Unmount from DOM after transition completes
          setTimeout(() => {
            setIsMounted(false);
          }, 700);
        }, 250);
      }
    }, 70);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020704] transition-all duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading MYST Enterprises"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Ambient Luxury Radial Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Luxury Brand Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
        {/* Animated Rotating Conic Crest */}
        <div className="relative mb-6">
          {/* Outer Rotating Conic Ring */}
          <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-emerald-500 via-lime-400 to-[#d4af37] animate-spin [animation-duration:4s] shadow-[0_0_35px_rgba(16,185,129,0.35)]">
            <div className="w-full h-full bg-[#030906] rounded-full" />
          </div>

          {/* Inner Glowing Monogram / Diamond Emblem */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-900/80 to-emerald-950 flex items-center justify-center border border-emerald-500/30 shadow-inner">
              <span className="font-serif text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-300 to-amber-200 tracking-wider">
                M
              </span>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-[0.22em] uppercase leading-tight">
          MYST{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-teal-300">
            ENTERPRISES
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-[10px] sm:text-[11px] font-semibold text-emerald-300/80 uppercase tracking-[0.25em] mt-2 mb-8">
          Commercial Graphic Design &amp; Brand Studio
        </p>

        {/* Modern Precision Progress Bar */}
        <div className="w-64 sm:w-72 bg-emerald-950/80 h-2 rounded-full overflow-hidden p-0.5 border border-emerald-800/40 shadow-inner relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-[#d4af37] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(52,211,153,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage and Status Indicator */}
        <div className="flex items-center justify-between w-64 sm:w-72 mt-3 text-xs font-mono">
          <span className="text-emerald-400/90 text-[11px] font-medium tracking-wide">
            {statusText}
          </span>
          <span className="font-bold text-lime-400 text-xs">
            {progress}%
          </span>
        </div>

        {/* Subtle Skip Hint */}
        <button
          onClick={() => {
            sessionStorage.setItem('myst_site_loaded', 'true');
            setIsFadingOut(true);
            document.body.style.overflow = '';
            setTimeout(() => setIsMounted(false), 300);
          }}
          className="mt-8 text-[10px] text-gray-500 hover:text-emerald-300 transition tracking-wider uppercase underline underline-offset-4 cursor-pointer"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}
