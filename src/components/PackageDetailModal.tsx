'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { BsCheck2, BsClockHistory, BsShieldCheck, BsStars } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { BusinessPackage } from '@/types';

interface PackageDetailModalProps {
  pkg: BusinessPackage | null;
  onClose: () => void;
}

const ADDONS_LIST = [
  { id: 'urgent', name: 'Superfast 24h Express Delivery', price: 1000 },
  { id: 'social10', name: '10 Extra Instagram Post & Reel Templates', price: 1200 },
  { id: '3d-render', name: '3D Photorealistic Exterior / Packaging Mockup', price: 800 },
  { id: 'source-files', name: 'Master Adobe Vector & InDesign Source Files', price: 500 }
];

export const PackageDetailModal: React.FC<PackageDetailModalProps> = React.memo(({
  pkg,
  onClose
}) => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonsList = ADDONS_LIST;

  const addonsTotal = React.useMemo(() => {
    return selectedAddons.reduce((sum, id) => {
      const item = ADDONS_LIST.find(a => a.id === id);
      return sum + (item ? item.price : 0);
    }, 0);
  }, [selectedAddons]);

  const grandTotal = React.useMemo(() => {
    return (pkg?.startingPrice || 0) + addonsTotal;
  }, [pkg?.startingPrice, addonsTotal]);

  const toggleAddon = React.useCallback((id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (pkg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [pkg]);

  return (
    <AnimatePresence>
      {pkg && (
        <motion.div
          key="pkg-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key={`pkg-modal-card-${pkg.id}`}
            initial={{ opacity: 0, scale: 0.85, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 260,
              mass: 0.85,
            }}
            className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92dvh] sm:max-h-[92vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Header image banner */}
          <div className="relative w-full h-56 bg-gray-900">
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white mb-2">
                {pkg.category} Business Bundle
              </span>
              <h2 className="font-serif text-3xl font-black text-white">{pkg.title}</h2>
              <div className="flex items-center gap-4 text-xs text-gray-200 mt-1">
                <span className="flex items-center gap-1"><BsClockHistory className="w-3.5 h-3.5 text-emerald-400" /> {pkg.turnaround}</span>
                <span className="flex items-center gap-1"><BsShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Revisions Included</span>
              </div>
            </div>
          </div>

          {/* Details & Deliverables */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {pkg.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                Standard Package Deliverables:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                {pkg.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <BsCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional Custom Add-ons */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <BsStars className="w-4 h-4 text-amber-500" />
                Customize With Optional Add-ons:
              </h4>
              <div className="space-y-2">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 pointer-events-none"
                        />
                        <span>{addon.name}</span>
                      </div>
                      <span className="font-bold text-gray-900">+₹{addon.price.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-4 rounded-2xl bg-gray-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-400">Total Customized Package Value</p>
                <div className="text-2xl font-black text-emerald-400">
                  ₹{grandTotal.toLocaleString()}
                  {addonsTotal > 0 && (
                    <span className="text-xs text-gray-300 font-normal ml-2">
                      (Base: ₹{pkg.startingPrice} + Addons: ₹{addonsTotal})
                    </span>
                  )}
                </div>
              </div>

              <a
                href={`https://wa.me/919667665892?text=Hi%20MYST%20Enterprises,%20I%20want%20to%20book%20the%20${encodeURIComponent(pkg.title)}%20package%20(Total:%20Rs%20${grandTotal})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-gray-950 text-xs font-black px-6 py-3.5 rounded-xl shadow flex items-center justify-center gap-2 transition"
              >
                <FaWhatsapp className="w-4 h-4" />
                Book Now on WhatsApp
              </a>
            </div>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

PackageDetailModal.displayName = 'PackageDetailModal';
