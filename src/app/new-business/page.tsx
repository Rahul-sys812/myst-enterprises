'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BUSINESS_PACKAGES } from '@/data/mockData';
import { BusinessPackage } from '@/types';
import { PackageDetailModal } from '@/components/PackageDetailModal';
import { FaWhatsapp } from 'react-icons/fa';
import { BsStars, BsClockHistory, BsCheckCircleFill } from 'react-icons/bs';

import { PageHeroBanner } from '@/components/PageHeroBanner';

export default function NewBusinessPage() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedPackage, setSelectedPackage] = useState<BusinessPackage | null>(null);

  const tabs = [
    'All',
    'Food & Beverage',
    'Retail',
    'Services',
    'Education',
    'Healthcare',
    'Real Estate'
  ];

  const packagePills = tabs.map((tab) => ({
    label: tab === 'All' ? '🚀 All Suites' : tab,
    onClick: () => setActiveTab(tab),
    active: activeTab === tab,
  }));

  const filteredPackages = BUSINESS_PACKAGES.filter((pkg) => {
    if (activeTab === 'All') return true;
    return pkg.category === activeTab;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Pinaka Law Associates Style Hero Banner */}
        <PageHeroBanner
          title="New Business Packages"
          breadcrumb="New Business"
          bgImage="/images/heroes/packages-hero.jpg"
        />

        {/* Packages Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {packagePills.map((pill, idx) => (
              <button
                key={idx}
                onClick={pill.onClick}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  pill.active
                    ? 'bg-[#064e3b] text-white shadow-md shadow-emerald-950/20 scale-[1.02]'
                    : 'bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 border border-gray-200/90 shadow-2xs'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200/90 hover:border-emerald-500 shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Photo Mockup */}
                <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {pkg.category}
                  </span>

                  {pkg.popularBadge && (
                    <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      Popular Bundle
                    </span>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between">
                    <span className="text-xs text-gray-200 flex items-center gap-1 font-medium">
                      <BsClockHistory className="w-3.5 h-3.5 text-emerald-400" />
                      {pkg.turnaround}
                    </span>
                    <span className="text-sm font-black text-lime-400">
                      From ₹{pkg.startingPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-950 group-hover:text-emerald-900 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Deliverable preview bullets */}
                    <div className="mt-4 space-y-2 pt-3 border-t border-gray-100">
                      {pkg.deliverables.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 truncate">
                          <BsCheckCircleFill className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                      {pkg.deliverables.length > 3 && (
                        <p className="text-[11px] font-bold text-emerald-800 pl-5">
                          + {pkg.deliverables.length - 3} more items included
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900">
                      Customize Package &rarr;
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 group-hover:bg-[#064e3b] group-hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition">
                      View Deliverables
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= BEST CTA WITH BACKGROUND IMAGE ================= */}
          <div className="relative overflow-hidden mt-16 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-emerald-500/30">
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/package-cafe.jpg"
                alt="New Business Setup Background"
                fill
                className="object-cover object-center brightness-40 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#03150e]/95 via-[#052b1e]/90 to-[#03150e]/85" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-xs font-black uppercase tracking-widest text-lime-400">
                  <BsStars className="w-3.5 h-3.5" />
                  Launch With Authority
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  Starting a brand not listed above?
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
                  We build custom identity suites for dental clinics, jewellery showrooms, food trucks, fitness centers, and direct-to-consumer Shopify stores.
                </p>
              </div>

              <a
                href="https://wa.me/919667665892?text=Hi%20MYST%20Enterprises,%20I%20am%20launching%20a%20new%20business%20and%20need%20a%20starter%20package"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-black text-sm px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition shrink-0"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                <span>Get Custom Startup Package</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Package Customizer Modal */}
      <PackageDetailModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </div>
  );
}
