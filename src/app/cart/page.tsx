'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { FaWhatsapp, FaTrashAlt } from 'react-icons/fa';
import { BsBagCheck, BsShieldCheck } from 'react-icons/bs';
import { HiArrowRight } from 'react-icons/hi2';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  CartItem,
  getStoredCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  getCartTotal
} from '@/lib/cart';

import { PageHeroBanner } from '@/components/PageHeroBanner';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      return getStoredCart();
    }
    return [];
  });

  const refreshCart = () => {
    setCartItems(getStoredCart());
  };

  useEffect(() => {
    window.addEventListener('myst_cart_updated', refreshCart);

    const ctx = gsap.context(() => {
      gsap.to('.gsap-cart-whatsapp', {
        scale: 1.03,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      });
    });

    return () => {
      window.removeEventListener('myst_cart_updated', refreshCart);
      ctx.revert();
    };
  }, []);

  const { subtotal, count } = getCartTotal(cartItems);

  const generateWhatsAppOrderText = () => {
    let text = `*New Order from MYST Enterprises Website* 🎨\n\n`;
    text += `*Total Items:* ${count}\n\n`;
    cartItems.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.title}* (${item.selectedOption || 'Standard Package'})\n`;
      text += `   • Quantity: ${item.quantity}\n`;
      text += `   • Rate: ₹${item.unitPrice.toLocaleString()}\n`;
      text += `   • Item Total: ₹${(item.unitPrice * item.quantity).toLocaleString()}\n\n`;
    });
    text += `*Total Investment: ₹${subtotal.toLocaleString()}*\n\n`;
    text += `Hello MYST Team! I want to confirm this order. Please connect me with a Senior Designer for project kickoff and briefing!`;
    return encodeURIComponent(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Pinaka Law Associates Style Hero Banner */}
        <PageHeroBanner
          title="Shopping Cart"
          breadcrumb="Cart"
          bgImage="/images/heroes/cart-hero.jpg"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-950">
                Selected Design Packages ({count})
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                All packages include direct WhatsApp coordination and editable source vector handover
              </p>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline self-start sm:self-auto cursor-pointer"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-xl mx-auto shadow-sm space-y-5">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <BsBagCheck className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Your cart is empty
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                  Browse our high-converting logos, packaging dielines, cafe menus, and business design packages.
                </p>
              </div>

              <div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition"
                >
                  <span>Explore Design Catalog</span>
                  <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cart Items List (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 group"
                  >
                    {/* Item Image & Title */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-900 shrink-0 border border-gray-200">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-serif text-base sm:text-lg font-bold text-gray-900 hover:text-emerald-800 transition leading-snug line-clamp-1"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-xs font-semibold text-emerald-800">
                          {item.selectedOption || 'Standard Package'}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Turnaround: {item.product.turnaround || '24-48 Hours'}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Price Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-600 hover:text-black font-bold hover:bg-gray-200 transition cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-600 hover:text-black font-bold hover:bg-gray-200 transition cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <div className="text-right">
                        <p className="font-serif font-black text-base sm:text-lg text-gray-950">
                          ₹{(item.unitPrice * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          ₹{item.unitPrice.toLocaleString()} each
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                        title="Remove item"
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Trust Feature Card */}
                <div className="bg-emerald-950/5 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 text-xs text-emerald-900">
                  <BsShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold">100% Commercial Vector Source Files Guarantee:</span> Every product includes full copyright transfer, unlimited revisions until sign-off, and direct cloud drive storage.
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Direct WhatsApp Action (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-lg space-y-5">
                  <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                    Order Summary
                  </h3>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({count} items)</span>
                      <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Commercial Tax Invoicing</span>
                      <span className="font-medium text-emerald-700">₹0 (Zero Charges)</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Digital Express Cloud Delivery</span>
                      <span className="font-bold text-lime-600 uppercase text-xs">FREE</span>
                    </div>

                    <div className="flex justify-between items-center text-gray-950 font-black text-lg sm:text-xl border-t border-gray-200 pt-3">
                      <span>Total</span>
                      <span className="text-emerald-950">₹{subtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Direct WhatsApp Order CTA Button */}
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/919667665892?text=${generateWhatsAppOrderText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] via-[#20ba59] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-black text-sm sm:text-base px-6 py-4 rounded-2xl shadow-xl shadow-green-950/20 hover:shadow-green-500/40 transition-all duration-200 hover:scale-[1.02] active:scale-95 text-center cursor-pointer gsap-cart-whatsapp"
                    >
                      <FaWhatsapp className="w-5 h-5 text-white shrink-0" />
                      <span>Order Instantly on WhatsApp</span>
                    </a>
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-gray-100 text-center">
                    <p className="text-[11px] font-semibold text-emerald-800">
                      💬 Direct coordination with Senior Design Lead (+91 96676 65892)
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Instant delivery of vector source files after project approval
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
