'use client';

import React from 'react';
import Link from 'next/link';
import { FiHome, FiShoppingBag, FiArrowLeft, FiPhoneCall } from 'react-icons/fi';
import { BsShieldLock } from 'react-icons/bs';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021a11] via-[#062c1d] to-[#01140d] text-white flex flex-col justify-between p-4 sm:p-8 relative selection:bg-emerald-500 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-xl backdrop-blur transition"
        >
          <FiArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-serif font-black text-sm shadow-md">
            M
          </div>
          <span className="font-serif font-black text-base sm:text-lg tracking-wider text-white">
            MYST ENTERPRISES
          </span>
        </div>
      </div>

      {/* Center 404 Hero */}
      <div className="max-w-2xl w-full mx-auto my-auto z-10 text-center py-12 px-4">
        {/* Monogram Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-300 mb-6 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>404 &bull; Page Not Found</span>
        </div>

        {/* 404 Number with Metallic Gradient */}
        <h1 className="text-8xl sm:text-9xl font-black font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-amber-200 drop-shadow-[0_10px_35px_rgba(16,185,129,0.3)]">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-4">
          Looking for Something Exclusive?
        </h2>

        <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto mt-3 leading-relaxed">
          The page or design service you are seeking might have been moved, renamed, or is temporarily unavailable. Let us guide you back to our active design portfolios.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-950/40 transition duration-200 hover:scale-[1.02]"
          >
            <FiHome className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/10 backdrop-blur transition duration-200 hover:scale-[1.02]"
          >
            <FiShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>Explore Services</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 font-semibold px-6 py-3.5 rounded-xl border border-emerald-700/40 transition duration-200"
          >
            <FiPhoneCall className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-emerald-900/40 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400">
          <Link href="/designs" className="hover:text-emerald-300 transition">
            Design Catalog
          </Link>
          <span className="text-emerald-900">&bull;</span>
          <Link href="/new-business" className="hover:text-emerald-300 transition">
            Business Packages
          </Link>
          <span className="text-emerald-900">&bull;</span>
          <Link href="/about" className="hover:text-emerald-300 transition">
            About Agency
          </Link>
          <span className="text-emerald-900">&bull;</span>
          <Link href="/login" className="hover:text-amber-300 inline-flex items-center gap-1 transition">
            <BsShieldLock className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="max-w-6xl w-full mx-auto text-center text-xs text-gray-400 z-10 py-4">
        &copy; {new Date().getFullYear()} MYST ENTERPRISES &bull; High-Standard Creative Design &amp; Digital Solutions
      </div>
    </div>
  );
}
