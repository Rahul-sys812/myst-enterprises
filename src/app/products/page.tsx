'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FaWhatsapp } from 'react-icons/fa';
import { BsStars, BsBagCheck } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { HiArrowRight, HiOutlineEye } from 'react-icons/hi2';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PRODUCTS_DATA } from '@/data/mockData';
import { ProductItem } from '@/types';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { addToCart } from '@/lib/cart';

import { PageHeroBanner } from '@/components/PageHeroBanner';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const categories = ['All', 'Branding', 'Print', 'Digital', 'Merch'];

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-card-item',
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Pinaka Law Associates Style Hero Banner */}
        <PageHeroBanner
          title="Our Products"
          breadcrumb="Products"
          bgImage="/images/heroes/products-hero.jpg"
        />

        {/* Filter Tabs & Search Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-1.5 bg-gray-100 p-1.5 rounded-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#064e3b] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter service or product name..."
                className="w-full text-xs rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </section>

        {/* 12 Products Grid with Next-Level E-Commerce Buttons */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="product-card-item group bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-emerald-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                  {/* Mockup Card Image with Quick Preview overlay - Unclipped */}
                  <div
                    onClick={() => setSelectedProduct(prod)}
                    className="relative aspect-square sm:aspect-[4/3] bg-[#0c1411] overflow-hidden cursor-pointer flex items-center justify-center p-3 border-b border-gray-100"
                  >
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                    />
                  {prod.badge && (
                    <span className="absolute top-2.5 right-2.5 bg-[#064e3b] text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                      {prod.badge}
                    </span>
                  )}
                  <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-0.5 rounded-md">
                    {prod.category}
                  </span>
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-bold shadow-lg">
                      <HiOutlineEye className="w-3.5 h-3.5 text-emerald-700" />
                      Quick Preview
                    </span>
                  </div>
                </div>

                {/* Card Title, Price & Next-Level Buttons */}
                <div className="p-4 flex-1 flex flex-col justify-between border-t border-gray-100 space-y-3">
                  <div>
                    <Link
                      href={`/products/${prod.id}`}
                      className="font-serif text-base sm:text-lg font-bold text-gray-900 hover:text-emerald-800 transition-colors line-clamp-1 block"
                    >
                      {prod.title}
                    </Link>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {prod.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">Standard Price:</span>
                      <span className="font-serif font-black text-sm text-emerald-900">
                        {prod.price}
                      </span>
                    </div>

                    {/* Next-Level Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(prod)}
                        className="inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-950 hover:text-white border border-emerald-300/70 hover:border-emerald-600 px-3 py-2 rounded-xl text-xs font-bold transition shadow-2xs hover:shadow active:scale-95 cursor-pointer"
                        title="Add to shopping cart"
                      >
                        <BsBagCheck className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      <Link
                        href={`/products/${prod.id}`}
                        className="inline-flex items-center justify-center gap-1 bg-gray-950 hover:bg-emerald-800 text-white px-3 py-2 rounded-xl text-xs font-bold transition shadow-md hover:shadow-lg active:scale-95 text-center"
                      >
                        <span>Details</span>
                        <HiArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 mt-6">
              <p className="text-gray-500 text-sm">No products found matching &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-bold text-emerald-700 underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* ================= BEST CTA WITH BACKGROUND IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden mt-16 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-emerald-500/30"
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/product-packaging.jpg"
                alt="Packaging Design Background"
                fill
                className="object-cover object-center brightness-40 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#03150e]/95 via-[#052b1e]/90 to-[#03150e]/85" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-xs uppercase font-black tracking-widest text-lime-400">
                  <BsStars className="w-3.5 h-3.5" />
                  Custom Commercial Printing &amp; Vector Dielines
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  Need a specific size or bulk print requirement?
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
                  We provide bespoke packaging layouts, Pantone color separations, and direct printer-ready PDF/X-1a files for specialized manufacturing worldwide.
                </p>
              </div>

              <a
                href="https://wa.me/919667665892?text=Hi%20MYST%20Enterprises,%20I%20need%20a%20custom%20graphic%20design%20and%20print%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-black text-sm px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition shrink-0"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                <span>WhatsApp Direct Inquiry</span>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
