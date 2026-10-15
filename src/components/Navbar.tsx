'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BsStars, BsBag } from 'react-icons/bs';
import { FiLock, FiMenu, FiX } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { HiOutlineChevronRight } from 'react-icons/hi2';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { getAuthSession } from '@/lib/storage';
import { getStoredCart } from '@/lib/cart';

const OtpLoginModal = dynamic(
  () => import('./OtpLoginModal').then((mod) => mod.OtpLoginModal),
  { ssr: false }
);
const QuickQuoteModal = dynamic(
  () => import('./QuickQuoteModal').then((mod) => mod.QuickQuoteModal),
  { ssr: false }
);

export const Navbar: React.FC = React.memo(() => {
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCart = React.useCallback(() => {
    const items = getStoredCart();
    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    setCartCount(count);
  }, []);

  useEffect(() => {
    const session = getAuthSession();
    setIsLoggedIn(!!session?.isLoggedIn);
    updateCart();

    window.addEventListener('myst_cart_updated', updateCart);

    const ctx = gsap.context(() => {
      gsap.to('.gsap-quote-star', {
        rotation: 360,
        repeat: -1,
        duration: 12,
        ease: 'none',
      });
      gsap.to('.gsap-pulse-dot', {
        scale: 1.25,
        opacity: 0.7,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut',
      });
    });

    return () => {
      window.removeEventListener('myst_cart_updated', updateCart);
      ctx.revert();
    };
  }, [pathname, updateCart]);

  const navLinks = React.useMemo(() => [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Designs', href: '/designs', badge: 'Hot' },
    { label: 'New Business', href: '/new-business' },
    { label: 'Contact Us', href: '/contact' }
  ], []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-gray-150/80 shadow-xs transition-all">
        {/* Luxury Top Accent Bar */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-emerald-600 via-lime-500 to-amber-400" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-11 w-44 sm:w-52 transition-transform duration-300 group-hover:scale-[1.03]">
                <Image
                  src="/logo-1.png"
                  alt="MYST ENTERPRISES Logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-semibold transition-all rounded-xl flex items-center gap-1.5 ${isActive
                      ? 'bg-emerald-50/90 text-emerald-950 font-bold border border-emerald-200/70 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100/70'
                      }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-400 text-gray-950">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions: Cart + Instant Quote + Dashboard / Login */}
            <div className="hidden md:flex items-center gap-3">
              {/* Shopping Cart Icon with Badge */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl border border-gray-200 hover:border-emerald-400 text-gray-700 hover:text-emerald-900 hover:bg-emerald-50/50 transition-all shadow-2xs hover:shadow cursor-pointer"
                title="View Shopping Cart"
              >
                <BsBag className="w-5 h-5 text-gray-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white text-[11px] font-black flex items-center justify-center shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Instant Quote Button */}
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-emerald-950 bg-gradient-to-r from-emerald-50 to-teal-50/60 hover:from-emerald-100 hover:to-teal-100 px-4 py-2.5 rounded-xl border border-emerald-300/80 shadow-2xs hover:shadow transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <BsStars className="w-4 h-4 text-emerald-600 gsap-quote-star" />
                <span>Instant Quote</span>
              </button>

              {/* Admin Panel Access: Prominently displayed with "Admin Panel" label */}
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#047857] text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl shadow-md shadow-emerald-950/20 transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5"
                  title="Open Admin Dashboard"
                >
                  <MdDashboard className="w-4 h-4 text-emerald-300" />
                  <span>Admin Panel</span>
                </Link>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-emerald-950 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300/80 px-3.5 py-2.5 rounded-xl shadow-2xs hover:shadow transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
                  title="Admin Panel Login (Staff Only)"
                  aria-label="Admin Panel"
                >
                  <FiLock className="w-4 h-4 text-emerald-700" />
                  <span>Admin Panel</span>
                </button>
              )}
            </div>

            {/* Mobile Actions: Cart & Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/cart"
                className="relative p-2 text-gray-700 hover:text-black rounded-lg"
                aria-label="Cart"
              >
                <BsBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-black rounded-xl hover:bg-gray-100"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Framer Motion AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden border-t border-gray-150 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-xl overflow-hidden"
            >
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold ${isActive
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                        {link.badge && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-amber-400 text-gray-950">
                            {link.badge}
                          </span>
                        )}
                      </span>
                      <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  );
                })}
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2">
                    <BsBag className="w-4 h-4 text-emerald-700" />
                    Shopping Cart ({cartCount})
                  </span>
                  <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>

              <div className="pt-2 border-t border-gray-150 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsQuoteOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-950 border border-emerald-300 text-sm font-bold py-2.5 rounded-xl shadow-xs"
                >
                  <BsStars className="w-4 h-4 text-emerald-600 gsap-quote-star" />
                  Instant Quote Calculator
                </button>

                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-[#064e3b] text-white text-sm font-bold py-3 rounded-xl shadow"
                  >
                    <MdDashboard className="w-4 h-4 text-emerald-300" />
                    <span>Admin Panel Dashboard</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsLoginOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 text-sm font-bold py-2.5 rounded-xl shadow-2xs transition cursor-pointer"
                  >
                    <FiLock className="w-4 h-4 text-emerald-700" />
                    <span>Admin Panel</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modals */}
      <OtpLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => {
          setIsLoginOpen(false);
          setIsLoggedIn(true);
        }}
      />

      <QuickQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </>
  );
});

Navbar.displayName = 'Navbar';
