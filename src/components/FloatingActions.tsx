'use client';

import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

export const FloatingActions: React.FC = () => {
  const phoneNumber = '+919667665892';
  const whatsappUrl = `https://wa.me/919667665892?text=${encodeURIComponent('Hello MYST Enterprises! I need graphic design & branding services for my business.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3 print:hidden">
      {/* 1. Phone Call Floating Button */}
      <div className="relative group">
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] text-white shadow-xl shadow-black/25 hover:shadow-emerald-600/40 border-2 border-white/90 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Call Us"
          id="btn-floating-call"
        >
          <FaPhoneAlt className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
        </a>

        {/* Hover Tooltip on Left */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center pointer-events-none">
          <span className="bg-gray-950/95 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-white/10 backdrop-blur-md">
            Call +91 96676 65892
          </span>
        </div>
      </div>

      {/* 2. WhatsApp Floating Button with Glowing Pulse */}
      <div className="relative group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#4eed84] text-white shadow-2xl shadow-green-950/30 hover:shadow-green-500/50 border-2 border-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Chat on WhatsApp"
          id="btn-floating-whatsapp"
        >
          <FaWhatsapp className="w-7 h-7 text-white" />

          {/* Active green pulse ring */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-lime-400 border border-white" />
          </span>
        </a>

        {/* Hover Tooltip on Left */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center pointer-events-none">
          <span className="bg-gray-950/95 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-white/10 backdrop-blur-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Instant WhatsApp (2m Reply)
          </span>
        </div>
      </div>
    </div>
  );
};
