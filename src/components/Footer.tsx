'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { BsShieldCheck, BsStars } from 'react-icons/bs';
import { DEFAULT_SETTINGS } from '@/lib/storage';

export const Footer: React.FC = React.memo(() => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.gsap-footer-whatsapp', {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      });
      gsap.to('.gsap-footer-shield', {
        rotate: 10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-[#050b08] text-gray-300 pt-16 pb-12 border-t border-emerald-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800/80"
        >
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="bg-white/95 rounded-2xl px-4 py-2.5 inline-flex items-center shadow-lg shadow-black/40 group-hover:bg-white transition">
                <div className="relative h-10 w-44">
                  <Image
                    src="/logo-1.png"
                    alt="MYST ENTERPRISES Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              India&apos;s premier commercial design house. We craft transformative brand marks, high-converting retail packaging, luxury cafe menus, and comprehensive digital media collateral that scale revenue.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                <BsShieldCheck className="w-3.5 h-3.5 text-lime-400 gsap-footer-shield" />
                100% Original Vector Copyright
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/40">
                <BsStars className="w-3.5 h-3.5 text-amber-400" />
                24-48h Express Turnaround
              </span>
            </div>
          </div>

          {/* Col 3: Navigation Pages */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition">
                  All Design Products
                </Link>
              </li>
              <li>
                <Link href="/designs" className="hover:text-emerald-400 transition">
                  Portfolio Gallery
                </Link>
              </li>
              <li>
                <Link href="/new-business" className="hover:text-emerald-400 transition">
                  Business Launch Packages
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-emerald-400 transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/get-invoice" className="hover:text-emerald-300 transition text-emerald-400/90 font-medium">
                  Client Invoice Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Popular Subpages */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Product Subpages
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products/logo-design" className="hover:text-emerald-400 transition">
                  Logo &amp; Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/products/packaging-design" className="hover:text-emerald-400 transition">
                  Luxury Packaging &amp; Boxes
                </Link>
              </li>
              <li>
                <Link href="/products/restaurant-menu" className="hover:text-emerald-400 transition">
                  Cafe &amp; Restaurant Menus
                </Link>
              </li>
              <li>
                <Link href="/products/social-media" className="hover:text-emerald-400 transition">
                  Social Media Creatives
                </Link>
              </li>
              <li>
                <Link href="/products/stationery" className="hover:text-emerald-400 transition">
                  Visiting Cards &amp; Stationery
                </Link>
              </li>
              <li>
                <Link href="/products/marketing-collateral" className="hover:text-emerald-400 transition">
                  Brochures &amp; Standees
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Studio Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{DEFAULT_SETTINGS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+919667665892" className="hover:text-white font-medium">
                  +91 96676 65892
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:contact@mystenterprises.in" className="hover:text-white font-medium">
                  contact@mystenterprises.in
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/919667665892?text=Hi%20MYST%20Enterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white text-xs font-bold transition shadow-md hover:scale-105 active:scale-95 gsap-footer-whatsapp"
                >
                  <FaWhatsapp className="w-4 h-4 text-white" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            &copy; 2026 <strong className="text-gray-300">MYST ENTERPRISES</strong>. All rights reserved. Commercial Brand Identity &amp; Creative Graphics Studio.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-gray-300 transition">About Studio</Link>
            <Link href="/products" className="hover:text-gray-300 transition">Catalog</Link>
            <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
            <Link href="/login" className="hover:text-emerald-400 transition font-medium">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
