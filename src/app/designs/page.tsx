'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DESIGNS_PROJECTS } from '@/data/mockData';
import { DesignProject } from '@/types';
import { LogoGraphic } from '@/components/LogoGraphic';
import { DesignLightboxModal } from '@/components/DesignLightboxModal';
import { FaWhatsapp } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { HiOutlineEye } from 'react-icons/hi2';

import { PageHeroBanner } from '@/components/PageHeroBanner';

import { FiSearch, FiX } from 'react-icons/fi';

export default function DesignsPage() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDesign, setSelectedDesign] = useState<DesignProject | null>(null);

  const tabIcons: Record<string, string> = {
    All: '🌟',
    Logo: '🎨',
    'Social Media': '📱',
    Menu: '🍽️',
    Poster: '🖼️',
    Packaging: '📦',
    Merch: '👕',
    Website: '💻',
  };

  const tabs = ['All', 'Logo', 'Social Media', 'Menu', 'Poster', 'Packaging', 'Merch', 'Website'];

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: DESIGNS_PROJECTS.length };
    DESIGNS_PROJECTS.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, []);

  const designPills = tabs.map((tab) => ({
    label: `${tabIcons[tab] || ''} ${tab} (${categoryCounts[tab] || 0})`,
    onClick: () => setActiveTab(tab),
    active: activeTab === tab,
  }));

  const filteredDesigns = React.useMemo(() => {
    return DESIGNS_PROJECTS.filter((item) => {
      const matchesCategory = activeTab === 'All' || item.category === activeTab;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.industry.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
      );
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Pinaka Law Associates Style Hero Banner */}
        <PageHeroBanner
          title="Portfolio Gallery"
          breadcrumb="Designs"
          bgImage="/images/heroes/designs-hero.jpg"
        />

        {/* Portfolio Showcase Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {designPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={pill.onClick}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  pill.active
                    ? 'bg-[#064e3b] text-white shadow-md shadow-emerald-950/20 scale-[1.02]'
                    : 'bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 border border-gray-200/90 shadow-2xs'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Search & Counter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white p-3 sm:p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by brand, food, cafe, gym, packaging, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-0.5"
                  title="Clear search"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-gray-600">
              <span className="font-medium">
                Showing <strong className="text-gray-900 font-bold">{filteredDesigns.length}</strong> of {categoryCounts[activeTab] || DESIGNS_PROJECTS.length} designs
              </span>
              {(searchQuery || activeTab !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('All');
                  }}
                  className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  Reset all
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                onClick={() => setSelectedDesign(design)}
                className={`group relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-gradient-to-br ${design.bgGradient} border border-gray-200/60 flex items-center justify-center p-3 sm:p-4`}
              >
                {/* Visual: Real Design Image or Vector Brand Logo graphic - Unclipped */}
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

                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-radial from-white/10 to-transparent opacity-30 pointer-events-none" />

                {/* Hover Reveal Card */}
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
                      <HiOutlineEye className="w-3.5 h-3.5 text-emerald-800" />
                      View Project Specs
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDesigns.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 mt-6 p-8">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-serif text-lg font-bold text-gray-900">No designs match your criteria</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                {searchQuery ? (
                  <>No items found matching &ldquo;{searchQuery}&rdquo; in {activeTab === 'All' ? 'any category' : activeTab}.</>
                ) : (
                  <>No items currently listed under &ldquo;{activeTab}&rdquo;.</>
                )}
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}
                {activeTab !== 'All' && (
                  <button
                    onClick={() => setActiveTab('All')}
                    className="text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    Show All Designs
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= BEST CTA WITH BACKGROUND IMAGE ================= */}
          <div className="relative overflow-hidden mt-16 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-emerald-500/30">
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/hero-laptop.jpg"
                alt="Brand Identity Setup Background"
                fill
                className="object-cover object-center brightness-40 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#03150e]/95 via-[#052b1e]/90 to-[#03150e]/85" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-xs font-black uppercase tracking-widest text-lime-400">
                  <BsStars className="w-3.5 h-3.5" />
                  Bespoke Corporate Identity
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  Have a unique brand concept in mind?
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
                  We craft custom trademarks, mascot emblems, and full brand guideline manuals tailored for domestic and international IP registration.
                </p>
              </div>

              <a
                href="https://wa.me/919667665892?text=Hi%20MYST%20Enterprises,%20I%20want%20to%20start%20a%20new%20custom%20branding%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-black text-sm px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition shrink-0"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox Modal */}
      <DesignLightboxModal
        design={selectedDesign}
        onClose={() => setSelectedDesign(null)}
      />
    </div>
  );
}
