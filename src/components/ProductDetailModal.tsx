'use client';

import React from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import { BsCheck2, BsClockHistory } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { ProductItem } from '@/types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onSelectForInvoice?: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = React.memo(({
  product,
  onClose
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[92dvh] sm:max-h-[90vh] my-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition cursor-pointer"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Left Image Showcase - Unclipped */}
        <div className="md:w-1/2 relative bg-[#0c1310] min-h-[260px] md:min-h-full flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 drop-shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white mb-1.5">
              {product.category}
            </span>
            <h3 className="font-serif text-2xl font-black">{product.title}</h3>
            <p className="text-xs text-gray-200 mt-1">Starting from <strong className="text-emerald-400 text-sm">{product.price}</strong></p>
          </div>
        </div>

        {/* Right Details */}
        <div className="md:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-between space-y-4 overflow-y-auto flex-1 overscroll-contain">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-2">
              <BsClockHistory className="w-3.5 h-3.5" />
              <span>Turnaround: {product.turnaround}</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              {product.description}
            </p>

            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              What&apos;s Included:
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700 mb-4">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <BsCheck2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Deliverable Formats:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.formats.map((fmt, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-gray-100 text-gray-700 border border-gray-200"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/919667665892?text=Hi%20MYST%20Enterprises,%20I%20am%20interested%20in%20${encodeURIComponent(product.title)}%20package`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold py-3 rounded-xl shadow flex items-center justify-center gap-2 transition"
            >
              <FaWhatsapp className="w-4 h-4" />
              Order / Inquire on WhatsApp
            </a>
            <button
              onClick={onClose}
              className="text-center text-xs text-gray-400 hover:text-gray-700 py-1"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductDetailModal.displayName = 'ProductDetailModal';
