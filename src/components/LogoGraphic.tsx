'use client';

import React from 'react';

interface LogoGraphicProps {
  type: string;
  className?: string;
}

export const LogoGraphic: React.FC<LogoGraphicProps> = React.memo(({ type, className = "w-full h-full" }) => {
  switch (type) {
    case 'sharma-cafe':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          {/* Coffee cup with filigree steam */}
          <div className="relative mb-3 text-[#d4af37]">
            <svg width="68" height="60" viewBox="0 0 80 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Filigree Steam */}
              <path d="M34 16 C32 10 36 6 34 2" />
              <path d="M40 18 C38 12 44 8 40 4" />
              <path d="M46 16 C48 10 44 6 46 2" />
              {/* Cup */}
              <path d="M22 24 H58 C58 40 48 50 40 50 C32 50 22 40 22 24 Z" fill="rgba(212,175,55,0.15)" />
              {/* Handle */}
              <path d="M58 28 C64 28 66 36 58 40" strokeWidth="2.5" />
              {/* Saucer */}
              <line x1="18" y1="56" x2="62" y2="56" strokeWidth="2.5" />
            </svg>
          </div>
          <h3 className="font-serif italic text-3xl font-bold tracking-wide text-[#fde047] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Sharma Café
          </h3>
          <p className="mt-1 text-[11px] font-bold tracking-[0.28em] text-[#d4af37] uppercase">
            Good Food Good Mood
          </p>
        </div>
      );

    case 'the-brew-house':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 text-[#d4af37]">
            <svg width="74" height="60" viewBox="0 0 80 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M40 6 L48 24 L66 12 L58 36 L22 36 L14 12 L32 24 Z" fill="rgba(212,175,55,0.12)" />
              <circle cx="40" cy="5" r="3" fill="#d4af37" />
              <circle cx="14" cy="11" r="2.5" fill="#d4af37" />
              <circle cx="66" cy="11" r="2.5" fill="#d4af37" />
              <path d="M26 40 H54 C54 48 48 54 40 54 C32 54 26 48 26 40 Z" fill="#d4af37" />
              <path d="M54 43 H58 C60 43 61 45 61 47 C61 49 60 50 58 50 H54" strokeWidth="2" />
              <line x1="20" y1="58" x2="60" y2="58" strokeWidth="2.5" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl font-bold tracking-wider text-[#f5ebd7] uppercase">
            The Brew House
          </h3>
          <p className="mt-1 text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase">
            Café &amp; Bistro
          </p>
        </div>
      );

    case 'blush-beauty':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl border-2 border-pink-400 p-2 shadow-[0_0_20px_rgba(244,114,182,0.4)] flex items-center justify-center bg-black/40">
              <svg width="52" height="52" viewBox="0 0 64 64" fill="none" stroke="#f472b6" strokeWidth="2.4" strokeLinecap="round">
                <path d="M24 16 C30 12, 42 14, 46 22 C50 30, 48 40, 42 46 C36 52, 28 54, 22 52" />
                <path d="M38 24 C40 22, 44 24, 44 28 C44 32, 40 36, 36 38" />
                <path d="M30 28 C34 29, 36 32, 34 36 C32 40, 26 42, 22 40" fill="#f472b6" fillOpacity="0.2" />
                <circle cx="48" cy="18" r="1.5" fill="#f472b6" />
                <path d="M18 20 C20 16, 24 14, 28 14" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>
          <h3 className="font-serif italic text-3xl font-extrabold tracking-wide text-pink-300 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]">
            Blush
          </h3>
          <p className="mt-1 text-xs font-bold tracking-[0.3em] text-pink-200/90 uppercase">
            Beauty Salon
          </p>
        </div>
      );

    case 'fresh-bites':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 flex items-center justify-center">
            <svg width="70" height="60" viewBox="0 0 80 64" fill="none">
              <path d="M18 36 C22 52 58 52 62 36 Z" fill="#10b981" />
              <path d="M40 34 C36 20 40 8 40 8 C40 8 44 20 40 34 Z" fill="#059669" />
              <path d="M36 32 C26 24 22 14 22 14 C22 14 32 20 36 32 Z" fill="#34d399" />
              <path d="M44 32 C54 24 58 14 58 14 C58 14 48 20 44 32 Z" fill="#34d399" />
              <circle cx="40" cy="42" r="3" fill="#ffffff" opacity="0.8" />
            </svg>
          </div>
          <h3 className="font-sans text-2xl font-black tracking-tight text-[#064e3b] uppercase">
            Fresh Bites
          </h3>
          <p className="mt-1 text-xs font-extrabold tracking-[0.25em] text-[#059669] uppercase">
            Healthy Food
          </p>
        </div>
      );

    case 'fit-zone':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 flex items-center justify-center">
            <svg width="84" height="54" viewBox="0 0 90 54" fill="none">
              <rect x="6" y="14" width="6" height="26" rx="2" fill="#64748b" />
              <rect x="14" y="10" width="6" height="34" rx="2" fill="#94a3b8" />
              <rect x="70" y="10" width="6" height="34" rx="2" fill="#94a3b8" />
              <rect x="78" y="14" width="6" height="26" rx="2" fill="#64748b" />
              <rect x="18" y="24" width="54" height="6" fill="#cbd5e1" />
              <path d="M45 4 L51 18 L64 22 L53 30 L56 44 L45 36 L34 44 L37 30 L26 22 L39 18 Z" fill="#f97316" />
              <circle cx="45" cy="16" r="4" fill="#ea580c" />
            </svg>
          </div>
          <h3 className="font-sans text-2xl font-black tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Fit Zone
          </h3>
          <p className="mt-1 text-xs font-black tracking-[0.25em] text-[#f97316] uppercase">
            Gym &amp; Fitness
          </p>
        </div>
      );

    case 'urban-boutique':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 text-[#9d174d]">
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M32 12 C24 18 20 28 20 38 C20 46 26 52 32 52 C38 52 44 46 44 38 C44 28 40 18 32 12 Z" fill="#fbcfe8" fillOpacity="0.4" />
              <path d="M32 12 V52" />
              <path d="M20 28 C26 32 38 32 44 28" />
            </svg>
          </div>
          <h3 className="font-serif text-3xl font-light tracking-wide text-[#831843]">
            Urban
          </h3>
          <p className="mt-1 text-xs font-bold tracking-[0.35em] text-[#9d174d] uppercase">
            Boutique
          </p>
        </div>
      );

    case 'carewell':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="24" y="8" width="16" height="48" rx="4" fill="#0d9488" />
              <rect x="8" y="24" width="48" height="16" rx="4" fill="#0d9488" />
              <path d="M32 20 L35 29 L44 32 L35 35 L32 44 L29 35 L20 32 L29 29 Z" fill="#ffffff" />
              <circle cx="32" cy="32" r="2.5" fill="#38bdf8" />
            </svg>
          </div>
          <h3 className="font-sans text-2xl font-bold tracking-tight text-[#0f766e]">
            CareWell
          </h3>
          <p className="mt-1 text-xs font-extrabold tracking-[0.3em] text-[#14b8a6] uppercase">
            Pharmacy
          </p>
        </div>
      );

    case 'travel-with-us':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 flex items-center justify-center">
            <svg width="76" height="60" viewBox="0 0 80 64" fill="none">
              <circle cx="40" cy="38" r="24" fill="#fde047" fillOpacity="0.7" stroke="#d97706" strokeWidth="2" />
              <polygon points="32,46 44,28 54,46" fill="#ea580c" />
              <polygon points="20,46 30,34 40,46" fill="#c2410c" />
              <path d="M22 46 Q24 32 28 26" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M28 26 Q20 22 16 26" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
              <path d="M28 26 Q32 18 36 22" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
              <path d="M52 14 L64 12 L60 22 L66 23 L68 18 L70 19 L67 25 L58 24 L52 28 Z" fill="#0f172a" />
              <path d="M38 28 Q46 22 54 18" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
          </div>
          <h3 className="font-sans text-2xl font-black tracking-widest text-[#1e293b] uppercase">
            Travel
          </h3>
          <p className="mt-1 text-xs font-extrabold tracking-[0.35em] text-[#b45309] uppercase">
            With Us
          </p>
        </div>
      );

    case 'kasumi-fruits':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 flex items-center justify-center">
            <svg width="74" height="60" viewBox="0 0 80 64" fill="none">
              <path d="M30 12 C44 4 56 12 56 26 C56 40 40 44 30 12 Z" fill="#15803d" />
              <circle cx="36" cy="38" r="16" fill="#ea580c" />
              <circle cx="33" cy="34" r="13" fill="#f97316" />
              <circle cx="52" cy="40" r="12" fill="#dc2626" />
              <path d="M36 22 C36 16 38 14 42 14" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="45" cy="18" rx="5" ry="3" fill="#22c55e" transform="rotate(-20 45 18)" />
            </svg>
          </div>
          <h3 className="font-sans text-2xl font-black tracking-wider text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Kasumi
          </h3>
          <p className="mt-1 text-xs font-black tracking-[0.25em] text-[#eab308] uppercase">
            Fruit Farms
          </p>
        </div>
      );

    case 'velvet-scent':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 text-[#d4af37]">
            <svg width="60" height="60" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="22" y="10" width="20" height="12" rx="2" fill="#d4af37" fillOpacity="0.2" />
              <polygon points="16,24 48,24 42,54 22,54" fill="#d4af37" fillOpacity="0.1" />
              <circle cx="32" cy="38" r="6" stroke="#d4af37" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl tracking-widest text-[#f5e6ca]">Velvet Scent</h3>
          <p className="mt-1 text-[10px] tracking-[0.3em] text-[#d4af37] uppercase">Haute Parfumerie</p>
        </div>
      );

    case 'apex-tech':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 text-indigo-400">
            <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
              <polygon points="32,8 54,20 54,44 32,56 10,44 10,20" stroke="#6366f1" strokeWidth="2.5" fill="#6366f1" fillOpacity="0.1" />
              <polygon points="32,20 44,28 44,36 32,44 20,36 20,28" fill="#38bdf8" fillOpacity="0.8" />
            </svg>
          </div>
          <h3 className="font-sans text-2xl font-bold tracking-tight text-white">Apex Tech</h3>
          <p className="mt-1 text-[10px] font-mono tracking-widest text-cyan-400 uppercase">Cloud &amp; AI Systems</p>
        </div>
      );

    case 'saffron-soul':
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 text-amber-400">
            <svg width="60" height="60" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="32" cy="32" r="22" strokeDasharray="3 3" />
              <path d="M32 14 C36 22 44 26 44 32 C44 38 38 44 32 44 C26 44 20 38 20 32 C20 26 28 22 32 14 Z" fill="#f59e0b" fillOpacity="0.3" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl font-bold tracking-wider text-amber-200">Saffron Soul</h3>
          <p className="mt-1 text-[10px] font-bold tracking-[0.25em] text-amber-400 uppercase">Royal Indian Dining</p>
        </div>
      );

    case 'lumina-arch':
    default:
      return (
        <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
          <div className="relative mb-3 text-sky-400">
            <svg width="60" height="60" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="16" y="16" width="32" height="32" rx="4" />
              <line x1="16" y1="16" x2="48" y2="48" />
              <circle cx="32" cy="32" r="6" fill="#38bdf8" />
            </svg>
          </div>
          <h3 className="font-sans text-2xl font-bold tracking-widest text-white uppercase">Lumina</h3>
          <p className="mt-1 text-[10px] font-medium tracking-[0.3em] text-sky-300 uppercase">Architectural Design</p>
        </div>
      );
  }
});

LogoGraphic.displayName = 'LogoGraphic';
