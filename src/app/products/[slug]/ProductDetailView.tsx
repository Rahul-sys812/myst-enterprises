'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FaWhatsapp } from 'react-icons/fa';
import {
  BsShieldCheck,
  BsClockHistory,
  BsCheckCircleFill,
  BsStarFill,
  BsBagCheck,
  BsLightningChargeFill
} from 'react-icons/bs';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageHeroBanner } from '@/components/PageHeroBanner';
import { PRODUCTS_DATA } from '@/data/mockData';
import { ProductItem } from '@/types';
import { addToCart, parsePrice } from '@/lib/cart';
import confetti from 'canvas-confetti';

interface TierOption {
  id: string;
  name: string;
  priceMultiplier: number;
  delivery: string;
  concepts: string;
  revisions: string;
  recommended?: boolean;
}

const TIERS: TierOption[] = [
  {
    id: 'starter',
    name: 'Starter Tier',
    priceMultiplier: 1,
    delivery: '48 Hours',
    concepts: '2 Concepts',
    revisions: '3 Revisions'
  },
  {
    id: 'pro',
    name: 'Pro Agency',
    priceMultiplier: 1.6,
    delivery: '24-36 Hours',
    concepts: '4 Concepts',
    revisions: 'Unlimited',
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise VIP',
    priceMultiplier: 2.4,
    delivery: '12-24 Hours Express',
    concepts: '6 Concepts + 3D Mockups',
    revisions: 'Unlimited Priority'
  }
];

export default function ProductDetailView() {
  const params = useParams();
  const slug = params?.slug as string;

  // Resolve slug to product
  const product: ProductItem =
    PRODUCTS_DATA.find(p => p.id === slug) ||
    PRODUCTS_DATA.find(p => p.id.includes(slug) || slug.includes(p.id)) ||
    PRODUCTS_DATA[0];

  const [selectedTier, setSelectedTier] = useState<TierOption>(TIERS[1]);
  const [quantity, setQuantity] = useState(1);

  const basePriceNum = parsePrice(product.price);
  const calculatedPrice = Math.round(basePriceNum * selectedTier.priceMultiplier * quantity);

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        price: `₹${Math.round(basePriceNum * selectedTier.priceMultiplier).toLocaleString()}`
      },
      quantity,
      selectedTier.name
    );
  };

  const handleBuyNow = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    window.open(`https://wa.me/919667665892?text=${whatsappMessage}`, '_blank');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.gsap-buy-btn', {
        scale: 1.02,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  const whatsappMessage = encodeURIComponent(
    `Hello MYST Enterprises! I want to order the "${product.title}" (${selectedTier.name}) for ₹${calculatedPrice.toLocaleString()}. Please share details!`
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />
      <main className="flex-1">
        {/* Pinaka Law Associates Style Hero Banner */}
        <PageHeroBanner
          bgImage="/images/heroes/products-hero.jpg"
          title={product.title}
          breadcrumbs={[
            { label: 'Products', href: '/products' },
            { label: product.title }
          ]}
        />

        {/* Product Details Hero Section */}
        <div id="order-selection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Visual Showcase (6 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden border border-gray-200/90 shadow-2xl bg-[#0c1411] flex items-center justify-center p-4 group">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                {product.badge && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-emerald-600 to-lime-500 text-gray-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg">
                    {product.badge}
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-medium">
                    Category: {product.category}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-bold text-lime-400">
                    Turnaround: {product.turnaround}
                  </span>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex flex-col items-center text-center">
                  <BsShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="text-[11px] font-bold text-gray-900 leading-tight">100% Vector</span>
                  <span className="text-[10px] text-gray-500">Commercial Ready</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex flex-col items-center text-center">
                  <BsClockHistory className="w-5 h-5 text-amber-500 mb-1" />
                  <span className="text-[11px] font-bold text-gray-900 leading-tight">Express 24-48h</span>
                  <span className="text-[10px] text-gray-500">Rapid Proofing</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex flex-col items-center text-center">
                  <BsLightningChargeFill className="w-5 h-5 text-lime-600 mb-1" />
                  <span className="text-[11px] font-bold text-gray-900 leading-tight">Unlimited Edits</span>
                  <span className="text-[10px] text-gray-500">Until Approval</span>
                </div>
              </div>

              {/* Deliverable Formats */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Deliverable High-Resolution Files:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(product.formats || ['AI Vector', 'EPS', 'SVG', 'Print PDF 300 DPI', 'Transparent PNG', 'JPEG Mockup']).map((fmt, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Pricing, Tiers & Next-Level Buttons (6 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200/60 mb-2">
                  Commercial Product Spec
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-black text-gray-950 leading-tight">
                  {product.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Star Rating & Social Proof */}
              <div className="flex items-center gap-3 border-y border-gray-200/80 py-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <BsStarFill key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-900">4.9 / 5.0</span>
                <span className="text-xs text-gray-500">&bull; 250+ Verified Client Orders</span>
              </div>

              {/* Tier Selection Radio Cards */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Select Package Tier:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIERS.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    const tierPrice = Math.round(basePriceNum * tier.priceMultiplier);

                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTier(tier)}
                        className={`relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950 text-white border-emerald-600 shadow-lg shadow-emerald-950/20 scale-[1.02]'
                            : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        {tier.recommended && (
                          <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                            RECOMMENDED
                          </span>
                        )}
                        <h4 className="text-xs font-black uppercase tracking-wider">
                          {tier.name}
                        </h4>
                        <p className={`text-base font-black mt-1 ${isSelected ? 'text-lime-300' : 'text-emerald-800'}`}>
                          ₹{tierPrice.toLocaleString()}
                        </p>
                        <div className="mt-2 space-y-0.5 text-[11px]">
                          <p className={isSelected ? 'text-gray-300' : 'text-gray-500'}>
                            {tier.concepts}
                          </p>
                          <p className={isSelected ? 'text-gray-300' : 'text-gray-500'}>
                            {tier.revisions}
                          </p>
                          <p className={isSelected ? 'text-lime-400 font-semibold' : 'text-emerald-700 font-semibold'}>
                            {tier.delivery}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector & Price Summary */}
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-600 font-medium">Total Investment:</span>
                  <div className="text-2xl sm:text-3xl font-black text-gray-950">
                    ₹{calculatedPrice.toLocaleString()}{' '}
                    <span className="text-xs font-bold text-gray-500 line-through">
                      ₹{Math.round(calculatedPrice * 1.35).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-600">Qty:</span>
                  <div className="flex items-center border border-gray-300 bg-white rounded-xl shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-gray-600 hover:text-black font-bold"
                    >
                      -
                    </button>
                    <span className="px-2 font-bold text-sm">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-gray-600 hover:text-black font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* NEXT-LEVEL E-COMMERCE ACTION BUTTONS */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Glowing Add to Cart */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-sm px-6 py-4 rounded-2xl border-2 border-emerald-700/60 shadow-lg hover:shadow-emerald-200 transition-all duration-200 hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <BsBagCheck className="w-5 h-5 text-emerald-800 group-hover:scale-110 transition-transform" />
                    <span>Add To Cart</span>
                  </button>

                  {/* Direct WhatsApp Order CTA */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="gsap-buy-btn relative group overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] via-[#20ba59] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-black text-sm px-6 py-4 rounded-2xl shadow-xl shadow-green-950/20 hover:shadow-green-500/40 transition-all duration-200 hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <FaWhatsapp className="w-5 h-5 text-white shrink-0" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>

                {/* Direct WhatsApp Reassurance */}
                <div className="p-3 bg-emerald-50/80 border border-emerald-200/70 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-emerald-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Direct Consultation with Senior Design Lead &bull; +91 96676 65892</span>
                </div>
              </div>

              {/* What is Included Checklist */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
                <h4 className="font-serif text-base font-bold text-gray-900">
                  What&apos;s Included In This Package:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
                  {(product.features || [
                    '3 Original Handcrafted Concepts',
                    'Unlimited Revisions',
                    'Full Commercial Vector Copyright',
                    'Ready For Print & Digital Ads'
                  ]).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <BsCheckCircleFill className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
