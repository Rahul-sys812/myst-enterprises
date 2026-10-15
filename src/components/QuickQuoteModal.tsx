'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { BsLightningFill } from 'react-icons/bs';
import { HiArrowRight } from 'react-icons/hi2';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const SERVICE_OPTIONS = [
  { id: 'logo-brand', name: 'Logo & Brand Identity', basePrice: 2999, timeline: '24-48h', icon: '✨' },
  { id: 'business-pack', name: 'Complete Business Starter Pack', basePrice: 4999, timeline: '48-72h', icon: '🚀' },
  { id: 'packaging-menu', name: 'Packaging & Restaurant Menu', basePrice: 3499, timeline: '24-48h', icon: '📦' },
  { id: 'social-media', name: 'Social Media 30-Day Growth Kit', basePrice: 3999, timeline: '48h', icon: '📱' },
  { id: 'website-ui', name: 'Modern Business Website / UI', basePrice: 7999, timeline: '3-5 Days', icon: '💻' }
];

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = React.memo(({
  isOpen,
  onClose,
  defaultService
}) => {
  const [selectedService, setSelectedService] = useState(defaultService || 'logo-brand');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('Café & Dining');
  const [expressDelivery, setExpressDelivery] = useState(false);

  const currentService = React.useMemo(() => {
    return SERVICE_OPTIONS.find((s) => s.id === selectedService) || SERVICE_OPTIONS[0];
  }, [selectedService]);

  const calculatedTotal = React.useMemo(() => {
    return currentService.basePrice + (expressDelivery ? 1000 : 0);
  }, [currentService, expressDelivery]);

  const handleSendWhatsapp = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#10b981', '#ffffff', '#eab308']
    });

    const msg = encodeURIComponent(
      `Hello MYST Enterprises! 🎨\n\nI want an instant quote for my business:\n` +
      `• *Business Name*: ${businessName || 'New Venture'}\n` +
      `• *Industry*: ${industry}\n` +
      `• *Service*: ${currentService.name}\n` +
      `• *Timeline*: ${expressDelivery ? 'Express (24 Hours)' : currentService.timeline}\n` +
      `• *Estimated Package*: ₹${calculatedTotal.toLocaleString('en-IN')}\n\n` +
      `Please connect me with a Senior Designer right away!`
    );

    toast.success('Redirecting to WhatsApp with your customized brief!', {
      description: 'A Senior Designer will reply within 15 minutes.'
    });

    window.open(`https://wa.me/919667665892?text=${msg}`, '_blank');
    onClose();
  }, [businessName, industry, currentService, expressDelivery, calculatedTotal, onClose]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="quick-quote-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key="quick-quote-card"
            initial={{ opacity: 0, scale: 0.85, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 260,
              mass: 0.85,
            }}
            className="relative w-full max-w-xl bg-gradient-to-b from-[#0c1813] to-[#060d09] border border-emerald-500/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[90vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Top Banner Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-lime-400 to-amber-400 shrink-0" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition z-10"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="p-4 sm:p-8 overflow-y-auto flex-1 overscroll-contain">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold w-fit mb-3">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span>15-Minute Guaranteed WhatsApp Response</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Instant Project Estimate &amp; Consultation
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select your requirements below to generate an exact commercial proposal.
            </p>

            {/* Form */}
            <form onSubmit={handleSendWhatsapp} className="mt-6 space-y-4">
              {/* Select Service */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  1. Select Required Design Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setSelectedService(opt.id)}
                      className={`text-left p-3 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${
                        selectedService === opt.id
                          ? 'bg-emerald-900/40 border-lime-400 text-white shadow-[0_0_15px_rgba(132,204,22,0.25)]'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">{opt.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold leading-tight">{opt.name}</p>
                        <p className="text-[11px] text-lime-400 font-semibold mt-0.5">
                          From ₹{opt.basePrice.toLocaleString('en-IN')} &bull; {opt.timeline}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Name & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Your Brand / Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Enter your brand / business name..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-hidden focus:border-lime-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Industry Type
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1813] border border-white/15 text-sm text-white focus:outline-hidden focus:border-lime-400"
                  >
                    <option value="Café & Restaurant">Café &amp; Restaurant</option>
                    <option value="Salon & Luxury Spa">Salon &amp; Luxury Spa</option>
                    <option value="Gym & Fitness Club">Gym &amp; Fitness Club</option>
                    <option value="Boutique & Fashion">Boutique &amp; Fashion</option>
                    <option value="Real Estate & Villas">Real Estate &amp; Villas</option>
                    <option value="Healthcare & Clinic">Healthcare &amp; Clinic</option>
                    <option value="Tech & Startup">Tech &amp; Startup</option>
                    <option value="Other Commercial Business">Other Commercial Business</option>
                  </select>
                </div>
              </div>

              {/* Addons / Express delivery */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-lime-400/20 text-lime-400 flex items-center justify-center">
                    <BsLightningFill className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Express 24-Hour Delivery</p>
                    <p className="text-[11px] text-gray-400">Jump straight to priority design queue (+₹1,000)</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={expressDelivery}
                  onChange={(e) => setExpressDelivery(e.target.checked)}
                  className="w-5 h-5 accent-lime-500 rounded cursor-pointer"
                />
              </div>

              {/* Total Summary & Action CTA */}
              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400">Estimated Investment</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-black text-lime-400">
                      ₹{calculatedTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-gray-400">(Includes Vector AI/SVG/PDF + Revisions)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#84cc16] hover:bg-[#72b012] text-gray-950 font-black text-sm px-6 py-3.5 rounded-2xl shadow-[0_0_25px_rgba(132,204,22,0.4)] hover:shadow-[0_0_35px_rgba(132,204,22,0.6)] hover:-translate-y-0.5 transition cursor-pointer"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Get WhatsApp Quote Now</span>
                  <HiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

QuickQuoteModal.displayName = 'QuickQuoteModal';
