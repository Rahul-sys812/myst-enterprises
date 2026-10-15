'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BsShieldCheck, BsAward, BsClockHistory, BsStars, BsCheckCircleFill } from 'react-icons/bs';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi2';

import { PageHeroBanner } from '@/components/PageHeroBanner';

export default function AboutPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.gsap-about-stat', {
        y: -4,
        repeat: -1,
        yoyo: true,
        duration: 2,
        stagger: 0.2,
        ease: 'sine.inOut',
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Pinaka Law Associates Style Hero Banner */}
        <PageHeroBanner
          title="About Us"
          breadcrumb="About"
          bgImage="/images/heroes/about-hero.jpg"
        />

        {/* Studio Story & Values - Concise & Crisp */}
        <section id="philosophy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl relative border border-gray-200">
                <Image
                  src="/images/hero-laptop.jpg"
                  alt="MYST Enterprises Design Studio"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Our Creative Philosophy
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950">
                Design Is How Your Brand Sells.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                MYST Enterprises partners with ambitious startups, retail chains, cafes, and growing brands across India to build authoritative visual identities that drive revenue and customer trust.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold text-emerald-950">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 border border-emerald-300">
                  <BsCheckCircleFill className="w-3.5 h-3.5 text-emerald-700" />
                  100% Original Vector Art
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 border border-emerald-300">
                  <BsCheckCircleFill className="w-3.5 h-3.5 text-emerald-700" />
                  24-48h Delivery
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 border border-emerald-300">
                  <BsCheckCircleFill className="w-3.5 h-3.5 text-emerald-700" />
                  Full IP Ownership
                </span>
              </div>

              <div id="metrics" className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 scroll-mt-32">
                <div className="space-y-1 gsap-about-stat bg-stone-50 p-3 rounded-2xl border border-gray-150">
                  <div className="text-3xl font-black text-[#064e3b]">1,000+</div>
                  <div className="text-xs text-gray-500 font-semibold">Brands Launched</div>
                </div>
                <div className="space-y-1 gsap-about-stat bg-stone-50 p-3 rounded-2xl border border-gray-150">
                  <div className="text-3xl font-black text-[#84cc16]">24-48h</div>
                  <div className="text-xs text-gray-500 font-semibold">Average Turnaround</div>
                </div>
                <div className="space-y-1 gsap-about-stat bg-stone-50 p-3 rounded-2xl border border-gray-150">
                  <div className="text-3xl font-black text-teal-700">100%</div>
                  <div className="text-xs text-gray-500 font-semibold">Vector Copyright</div>
                </div>
                <div className="space-y-1 gsap-about-stat bg-stone-50 p-3 rounded-2xl border border-gray-150">
                  <div className="text-3xl font-black text-amber-600">4.9 / 5</div>
                  <div className="text-xs text-gray-500 font-semibold">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Values Cards */}
        <section id="values" className="bg-white border-y border-gray-200 py-16 scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="font-serif text-3xl font-black text-gray-950">
                Why Work With Us
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                <BsShieldCheck className="w-8 h-8 text-emerald-700" />
                <h4 className="font-serif text-lg font-bold text-gray-900">Direct Copyright Handover</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  You receive full commercial and trademark rights to your designs, complete with master vector formats.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                <BsAward className="w-8 h-8 text-amber-600" />
                <h4 className="font-serif text-lg font-bold text-gray-900">Print-Production Ready</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  No printing press headaches. We configure exact dielines, CMYK profiles, bleed lines and spot UV layers.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                <BsClockHistory className="w-8 h-8 text-teal-600" />
                <h4 className="font-serif text-lg font-bold text-gray-900">Dedicated Account Manager</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Real human designers responding within minutes via WhatsApp and email, ensuring smooth revisions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Luxury CTA Section with Background Image */}
        <section className="relative mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/package-cafe.jpg"
                alt="MYST Enterprises Studio Projects"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#04120c]/95 via-[#04120c]/85 to-[#04120c]/60" />
            </div>

            {/* CTA Content */}
            <div className="relative z-10 p-8 sm:p-14 lg:p-16 text-white max-w-2xl space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold tracking-wider uppercase">
                <BsStars className="w-4 h-4 text-lime-400" />
                Partner With Our Creative Team
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Ready to elevate your brand <br />
                <span className="text-lime-400">above the competition?</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Connect directly with our lead design directors on WhatsApp for a swift turnaround consultation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/919667665892?text=Hello%20MYST%20Enterprises,%20I%20want%20to%20discuss%20a%20commercial%20branding%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#84cc16] via-[#10b981] to-[#047857] hover:from-[#a3e635] hover:to-[#059669] text-gray-950 font-black text-sm px-7 py-4 rounded-xl shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <FaWhatsapp className="w-5 h-5 text-gray-950" />
                  <span>Chat on WhatsApp Now</span>
                  <HiArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="tel:+919667665892"
                  className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 border border-white/25 font-bold text-sm px-6 py-4 rounded-xl backdrop-blur-md transition duration-200"
                >
                  <FaPhoneAlt className="w-4 h-4 text-lime-400" />
                  <span>Call +91 96676 65892</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-300">
                <span className="inline-flex items-center gap-1.5">
                  <BsCheckCircleFill className="w-3.5 h-3.5 text-lime-400" />
                  Free 15-Minute Strategy Call
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BsCheckCircleFill className="w-3.5 h-3.5 text-emerald-400" />
                  Fixed Commercial Price Quotes
                </span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
