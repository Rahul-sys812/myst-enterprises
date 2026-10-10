'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsHouseDoorFill } from 'react-icons/bs';
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
  showQuoteButton?: boolean;
  showCartButton?: boolean;
  onOpenQuote?: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = React.memo(({
  items,
  showBackButton = true,
}) => {
  const router = useRouter();

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200/60 sticky top-20 z-30 shadow-2xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
        {/* Trail & Back Button */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 hover:text-gray-950 bg-gray-100 hover:bg-gray-200/80 px-2 py-1 rounded-md transition cursor-pointer"
              title="Go back to previous page"
            >
              <FiArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </button>
          )}

          <ol className="flex items-center gap-1.5 text-xs text-gray-500">
            {/* Home link */}
            <li className="flex items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1 hover:text-emerald-700 font-semibold transition"
              >
                <BsHouseDoorFill className="w-3.5 h-3.5 text-emerald-800" />
                <span>Home</span>
              </Link>
            </li>

            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={index} className="flex items-center gap-1.5">
                  <FiChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                  {isLast || !item.href ? (
                    <span className="font-bold text-gray-900 truncate max-w-[200px] sm:max-w-xs">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-emerald-700 font-semibold transition truncate max-w-[150px] sm:max-w-none"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Minimal Direct WhatsApp Inquiry Link */}
        <div className="hidden sm:flex items-center">
          <a
            href="https://wa.me/919667665892?text=Hi%20MYST%20Enterprises,%20I%20have%20a%20query%20regarding%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 transition"
          >
            <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Designer Support</span>
          </a>
        </div>
      </div>
    </nav>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';
