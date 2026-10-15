'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiExternalLink } from 'react-icons/fi';
import { BsCheck2, BsStarFill } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { DesignProject } from '@/types';
import { LogoGraphic } from './LogoGraphic';

interface DesignLightboxModalProps {
  design: DesignProject | null;
  onClose: () => void;
}

export const DesignLightboxModal: React.FC<DesignLightboxModalProps> = React.memo(({
  design,
  onClose
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = React.useCallback((hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (design) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [design]);

  return (
    <AnimatePresence>
      {design && (
        <motion.div 
          key="design-lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5"
          onClick={onClose}
        >
          <motion.div 
            key={`design-lightbox-card-${design.id}`}
            initial={{ opacity: 0, scale: 0.84, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 260,
              mass: 0.85,
            }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {design.image && (
            <a
              href={design.image}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/60 hover:bg-black/80 text-white rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition flex items-center gap-1.5 border border-white/20 shadow-md"
              title="Open full resolution original"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Original</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-md transition border border-white/20 shadow-md"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          {/* Main Hero Visual of the Logo or Design Artwork */}
          <div className={`relative w-full ${design.image ? 'h-80 sm:h-[460px] md:h-[540px] bg-stone-950' : 'h-72 sm:h-80'} bg-gradient-to-br ${design.bgGradient} flex items-center justify-center p-3 sm:p-6 overflow-hidden`}>
            <div className="absolute inset-0 bg-radial from-white/10 to-transparent opacity-40 pointer-events-none" />
            
            {design.image ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={design.image}
                  alt={design.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain p-2 sm:p-4 drop-shadow-2xl"
                  priority
                />
              </motion.div>
            ) : (
              <div className="transform scale-125 transition-transform hover:scale-130 duration-300">
                <LogoGraphic type={design.logoType || 'sharma-cafe'} className="max-w-xs" />
              </div>
            )}

            <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-lg border border-white/10">
              {design.industry} &bull; {design.category}
            </div>
          </div>

          {/* Details Content */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12, ease: 'easeOut' }}
            className="p-6 sm:p-8 space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                  Featured Case Study
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-gray-500">Completed Commercial Delivery</span>
              </div>
              <h2 className="font-serif text-3xl font-black text-gray-950">
                {design.title} &mdash; <span className="font-normal text-gray-600">{design.subtitle}</span>
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {design.description}
              </p>
            </div>

            {/* Brand Color Swatches */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                Brand Identity Color Swatches (Click to copy HEX)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {design.colorPalette.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(color.hex)}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-200 hover:border-gray-400 bg-gray-50 transition text-left group"
                  >
                    <div
                      className="w-7 h-7 rounded-lg shadow-inner shrink-0 border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-gray-800 truncate">{color.name}</p>
                      <p className="text-[10px] font-mono text-gray-500 flex items-center gap-1 group-hover:text-emerald-700">
                        {copiedHex === color.hex ? (
                          <span className="text-emerald-600 font-bold">Copied!</span>
                        ) : (
                          <>
                            {color.hex} <FiCopy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
                          </>
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                Delivered Brand Assets:
              </h4>
              <div className="flex flex-wrap gap-2">
                {design.deliverables.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200"
                  >
                    <BsCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Testimonial if present */}
            {design.clientReview && (
              <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <BsStarFill key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-800 italic leading-relaxed">
                  &ldquo;{design.clientReview.quote}&rdquo;
                </p>
                <p className="text-[11px] font-bold text-amber-950">
                  {design.clientReview.clientName} &bull; <span className="font-normal text-amber-800">{design.clientReview.role}</span>
                </p>
              </div>
            )}

            {/* Project Tags */}
            {design.tags && design.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {design.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-gray-500">
                Want a custom {design.category.toLowerCase()} like <strong className="text-gray-800">{design.title}</strong>?
              </span>
              <a
                href={`https://wa.me/919667665892?text=Hi%20MYST%20Enterprises,%20I%20love%20the%20${encodeURIComponent(design.title)}%20(${encodeURIComponent(design.category)})%20design%20and%20want%20similar%20creative%20work`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
              >
                <FaWhatsapp className="w-4 h-4" />
                Book Similar {design.category} on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

DesignLightboxModal.displayName = 'DesignLightboxModal';
