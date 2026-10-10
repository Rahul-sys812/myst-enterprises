'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function CheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/cart');
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 p-8 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <FaWhatsapp className="w-8 h-8 text-emerald-700" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Direct WhatsApp Ordering
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Orders are confirmed directly on WhatsApp with our senior design team for rapid kickoff. Redirecting to your cart...
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/cart"
              className="w-full bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold py-3.5 rounded-xl shadow transition"
            >
              View Shopping Cart
            </Link>
            <a
              href="https://wa.me/919667665892?text=Hello%20MYST%20Enterprises!%20I%20want%20to%20order%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
