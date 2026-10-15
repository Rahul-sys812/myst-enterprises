'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  BsStars,
  BsShieldCheck,
  BsClockHistory,
  BsCheckCircleFill,
  BsBagCheck,
  BsLightningChargeFill,
  BsVectorPen,
  BsStarFill,
  BsPatchCheckFill,
  BsChatDotsFill
} from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { HiArrowRight, HiOutlineEye } from 'react-icons/hi2';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PRODUCTS_DATA, DESIGNS_PROJECTS, BUSINESS_PACKAGES } from '@/data/mockData';
import dynamic from 'next/dynamic';
import { LogoGraphic } from '@/components/LogoGraphic';
import { HeroBannerSlider } from '@/components/HeroBannerSlider';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { addToCart } from '@/lib/cart';
import { ProductItem, DesignProject } from '@/types';

const DesignLightboxModal = dynamic(
  () => import('@/components/DesignLightboxModal').then((mod) => mod.DesignLightboxModal),
  { ssr: false }
);
const ProductDetailModal = dynamic(
  () => import('@/components/ProductDetailModal').then((mod) => mod.ProductDetailModal),
  { ssr: false }
);
const QuickQuoteModal = dynamic(
  () => import('@/components/QuickQuoteModal').then((mod) => mod.QuickQuoteModal),
  { ssr: false }
);

export default function HomePage() {
  const [selectedDesign, setSelectedDesign] = useState<DesignProject | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.fromTo(
        '.gsap-floating-stat',
        { y: 0 },
        { y: -6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.25 }
      );
    }
  }, []);

  const featuredDesigns = React.useMemo(() => DESIGNS_PROJECTS.slice(0, 8), []);
  const featuredProducts = React.useMemo(() => PRODUCTS_DATA.slice(0, 8), []);
  const featuredPackages = React.useMemo(() => BUSINESS_PACKAGES.slice(0, 6), []);

  const handleOpenQuote = React.useCallback(() => setIsQuoteOpen(true), []);
  const handleCloseQuote = React.useCallback(() => setIsQuoteOpen(false), []);
  const handleCloseDesign = React.useCallback(() => setSelectedDesign(null), []);
  const handleCloseProduct = React.useCallback(() => setSelectedProduct(null), []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] selection:bg-lime-400 selection:text-black">
      <Navbar />

      <main className="flex-1">
        {/* ================= 3-BANNER ROTATING LUXURY HERO CAROUSEL ================= */}
        <HeroBannerSlider onOpenQuote={handleOpenQuote} />

        {/* ================= ABOUT US SECTION (RIGHT AFTER HERO BANNER) ================= */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-stone-50/40 to-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Story & Authority */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="lg:col-span-7 space-y-6"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-xs font-bold uppercase tracking-wider shadow-sm">
                    <BsStars className="w-3.5 h-3.5 text-emerald-700" />
                    About MYST Enterprises
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-950 mt-3 sm:mt-4 leading-tight tracking-tight">
                    Crafting High-Converting Brand Identities for Modern Businesses
                  </h2>
                  <p className="text-sm sm:text-base text-gray-950 font-medium leading-relaxed max-w-2xl mt-3 sm:mt-4">
                    We are a premier commercial design agency dedicated to helping <strong>restaurants, startups, cafes</strong>, and growing <strong>D2C brands</strong> build undeniable market authority through <strong>world-class visual identity</strong> and <strong>original vector branding</strong>.
                  </p>
                </div>

                {/* 4 Core Value Pillars (React Icons only, strong tags, dark crisp text) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="group p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-3 group-hover:scale-110 transition-transform">
                      <BsVectorPen className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-950">100% Original Vector Art</h4>
                    <p className="text-xs text-gray-950 font-medium mt-1 leading-relaxed">
                      Direct <strong>AI, EPS, SVG</strong>, and <strong>300 DPI</strong> print-ready masters with zero clip art.
                    </p>
                  </div>

                  <div className="group p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-400 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base mb-3 group-hover:scale-110 transition-transform">
                      <BsLightningChargeFill className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-950">24-48h Express Turnaround</h4>
                    <p className="text-xs text-gray-950 font-medium mt-1 leading-relaxed">
                      Rapid concept delivery and <strong>priority turnaround</strong> so your launch never stalls.
                    </p>
                  </div>

                  <div className="group p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-3 group-hover:scale-110 transition-transform">
                      <BsShieldCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-950">100% Commercial IP Rights</h4>
                    <p className="text-xs text-gray-950 font-medium mt-1 leading-relaxed">
                      Full <strong>trademark ownership &amp; copyright-ready</strong> vector files for your company.
                    </p>
                  </div>

                  <div className="group p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-teal-400 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-base mb-3 group-hover:scale-110 transition-transform">
                      <BsChatDotsFill className="w-5 h-5 text-teal-700" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-950">Direct WhatsApp Collaboration</h4>
                    <p className="text-xs text-gray-950 font-medium mt-1 leading-relaxed">
                      Direct 1-on-1 chat with <strong>lead designers</strong> for seamless revisions and live previews.
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-md transition hover:scale-105 active:scale-95"
                  >
                    <span>Read Full Studio Story</span>
                    <HiArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="https://wa.me/919667665892?text=Hi%20MYST%20Enterprises,%20I%20want%20to%20know%20more%20about%20your%20design%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs sm:text-sm font-bold px-5 py-3.5 rounded-xl transition"
                  >
                    <FaWhatsapp className="w-4 h-4 text-emerald-700" />
                    <span>Chat With Designer</span>
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Visual Composite Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="lg:col-span-5 relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-stone-950 aspect-[4/3] sm:aspect-square">
                  <Image
                    src="/images/hero-laptop.jpg"
                    alt="MYST Enterprises Studio"
                    fill
                    className="object-cover brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Floating Stats Badges with React Icons */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-3 text-white">
                    <div className="gsap-floating-stat bg-black/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                      <p className="text-2xl font-black text-lime-400">1,000+</p>
                      <p className="text-[11px] text-gray-300 flex items-center gap-1 mt-0.5">
                        <BsPatchCheckFill className="w-3 h-3 text-lime-400" />
                        Brands Launched
                      </p>
                    </div>
                    <div className="gsap-floating-stat bg-black/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                      <p className="text-2xl font-black text-amber-400 flex items-center gap-1">
                        4.9
                        <BsStarFill className="w-3.5 h-3.5 text-amber-400" />
                      </p>
                      <p className="text-[11px] text-gray-300 mt-0.5">Client Feedback</p>
                    </div>
                    <div className="gsap-floating-stat bg-black/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                      <p className="text-2xl font-black text-emerald-400">100%</p>
                      <p className="text-[11px] text-gray-300 flex items-center gap-1 mt-0.5">
                        <BsShieldCheck className="w-3 h-3 text-emerald-400" />
                        Vector Rights
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= TRENDING DESIGNS SHOWCASE ================= */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-12"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 flex items-center gap-1.5">
                  <BsStars className="w-3.5 h-3.5 text-emerald-700" />
                  Portfolio Showcase
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-gray-950 mt-1">
                  Trending Designs
                </h2>
                <p className="text-sm text-gray-600 mt-2 max-w-xl">
                  Recent vector brand identities, restaurant menus, retail packaging, and promotional campaign creatives crafted for our commercial clients.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Link
                  href="/designs"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 group"
                >
                  <span>Explore Full Portfolio</span>
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Grid of 8 Design Cards with UNCLIPPED object-contain preview */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {featuredDesigns.map((design) => (
                <div
                  key={design.id}
                  onClick={() => setSelectedDesign(design)}
                  className={`group relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-gradient-to-br ${design.bgGradient} border border-gray-200/60 flex items-center justify-center p-3 sm:p-4`}
                >
                  {/* Visual: Full unclipped design image */}
                  {design.image ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={design.image}
                        alt={design.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      />
                    </div>
                  ) : (
                    <LogoGraphic type={design.logoType || 'sharma-cafe'} />
                  )}

                  <div className="absolute inset-0 bg-radial from-white/10 to-transparent opacity-30 pointer-events-none" />

                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-4 text-center text-white backdrop-blur-2xs">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                      {design.industry}
                    </span>
                    <h3 className="font-serif text-lg font-bold mt-1 line-clamp-1">
                      {design.title}
                    </h3>
                    <p className="text-[11px] text-gray-300 line-clamp-2 max-w-xs mt-1.5 px-2">
                      {design.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-gray-950 px-3.5 py-1.5 rounded-full shadow">
                        <HiOutlineEye className="w-3.5 h-3.5" />
                        View Project
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= FULL-SERVICE CATALOG ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="text-center max-w-2xl mx-auto mb-14"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                Full-Service Catalog
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-gray-950 mt-1">
                Our Popular Products &amp; Services
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                From vector logos and luxury business cards to multi-page restaurant menus and retail packaging boxes.
              </p>
            </motion.div>

            {/* Grid of Product Cards with UNCLIPPED Image Presentation */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className="bg-gray-50/70 rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-400 transition duration-300 group flex flex-col justify-between hover:shadow-lg cursor-pointer"
                >
                  <div className="relative aspect-square sm:aspect-[4/3] bg-[#0c1411] overflow-hidden flex items-center justify-center p-3 border-b border-gray-100">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                    />
                    {prod.badge && (
                      <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between border-t border-gray-100">
                    <div>
                      <h3 className="font-serif text-base font-bold text-gray-900 group-hover:text-emerald-900 transition-colors">
                        {prod.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                        {prod.shortDesc}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-emerald-900">
                        {prod.price}
                      </span>
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => addToCart(prod)}
                          className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-950 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer"
                          title="Add to Cart"
                        >
                          <BsBagCheck className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                        <Link
                          href={`/products/${prod.id}`}
                          className="inline-flex items-center bg-gray-900 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs"
                        >
                          Details &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#047857] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition hover:scale-105 active:scale-95"
              >
                <span>Explore All Products &amp; Subpages</span>
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= NEW BUSINESS STARTER BUNDLES ================= */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-12"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
                  Ready Industry Bundles
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-white mt-1">
                  New Business Work
                </h2>
                <p className="text-sm text-gray-400 mt-2 max-w-xl">
                  Turnkey design packages designed specifically for opening a cafe, restaurant, salon, gym, or boutique.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Link
                  href="/new-business"
                  className="inline-flex items-center gap-2 text-sm font-bold text-lime-400 hover:text-lime-300"
                >
                  Explore All Packages <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-700/80 hover:border-lime-500/50 transition duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-[4/3] bg-gray-950 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/20" />
                    <span className="absolute bottom-3 left-3 bg-lime-400 text-gray-950 text-xs font-black px-2.5 py-1 rounded-md">
                      From ₹{pkg.startingPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        {pkg.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-gray-300 mt-2 line-clamp-2">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-700">
                      <Link
                        href="/new-business"
                        className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 rounded-xl transition"
                      >
                        Customize Bundle
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= COMPACT CAROUSEL CLIENT TESTIMONIALS SECTION ================= */}
        <TestimonialsSection />

        {/* ================= HIGH-CONVERTING LUXURY CTA SECTION WITH BACKGROUND IMAGE ================= */}
        <section className="relative overflow-hidden py-24 sm:py-28 text-white">
          {/* Background Image with Dark Cinematic Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-laptop-full.jpg"
              alt="Design Studio Background"
              fill
              sizes="100vw"
              className="object-cover object-center brightness-60 contrast-125"
            />
            {/* Multi-layered luxury glassmorphism gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#03150e]/95 via-[#06241a]/90 via-50% to-[#03150e]/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03150e] via-transparent via-50% to-[#03150e]/80" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8"
          >
            {/* Gold Accent Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-widest shadow-2xl backdrop-blur-md">
              <BsStars className="w-4 h-4 text-lime-400" />
              <span>100% Commercial Vector Copyright &amp; Trademark Ready</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto text-white drop-shadow-2xl">
              Ready To Elevate Your Brand With <br />
              <span className="bg-gradient-to-r from-lime-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                Award-Winning Commercial Design?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Chat directly with our senior graphic design leads on WhatsApp for express 15-minute project quotes, custom restaurant &amp; retail packaging specs, and priority turnaround.
            </p>

            {/* Next-Level Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {/* WhatsApp Direct Order Button */}
              <a
                href="https://wa.me/919667665892?text=Hello%20MYST%20Enterprises!%20I%20saw%20your%20website%20and%20want%20to%20discuss%20a%20new%20design%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-2xl shadow-green-950/40 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                <span>Chat on WhatsApp (+91 96676 65892)</span>
              </a>

              {/* Instant Project Quote Modal Trigger */}
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-7 py-4 rounded-2xl border border-white/25 hover:border-white/50 backdrop-blur-xl shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <BsStars className="w-4 h-4 text-lime-400" />
                <span>Instant Project Calculator</span>
              </button>
            </div>

            {/* Bottom 4 Trust Guarantee Pills */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-300 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <BsCheckCircleFill className="w-4 h-4 text-lime-400 shrink-0" />
                <span className="font-semibold">★ 4.9/5 Rating (1,000+ Brands)</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <BsClockHistory className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">24-48h Express Proofing</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <BsShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
                <span className="font-semibold">Master Vector Source Files</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MdSecurity className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">Unlimited Design Revisions</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      <QuickQuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
      />

      <DesignLightboxModal
        design={selectedDesign}
        onClose={handleCloseDesign}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProduct}
      />
    </div>
  );
}
