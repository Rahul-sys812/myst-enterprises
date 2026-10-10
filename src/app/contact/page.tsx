'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaWhatsapp,
  FaCompass,
  FaLocationArrow,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { BsClockHistory, BsCheckCircleFill } from 'react-icons/bs';
import { DEFAULT_SETTINGS } from '@/lib/storage';

import { PageHeroBanner } from '@/components/PageHeroBanner';
import { submitToWeb3Forms } from '@/lib/web3forms';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    service: 'Logo & Brand Identity',
    message: ''
  });

  const handleSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitToWeb3Forms({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      business: formData.business,
      service: formData.service,
      message: formData.message,
      subject: `[MYST Design Inquiry] Brief from ${formData.name} (${formData.business})`
    });
    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      toast.success('Inquiry Dispatched!', {
        description: 'Thank you! Your project brief and email have been submitted.'
      });
    } else {
      toast.error('Submission Notice', {
        description: result.message
      });
    }
  }, [formData]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Pinaka Law Associates Style Hero Banner */}
        <PageHeroBanner
          title="Contact Us"
          breadcrumb="Contact"
          bgImage="/images/heroes/contact-hero.jpg"
        />

        {/* Contact Information & Inquiry Form */}
        <section id="location" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 relative z-10 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Information & WhatsApp Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Studio Headquarters
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Address</strong>
                      <span>{DEFAULT_SETTINGS.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaPhoneAlt className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Direct Phone &amp; WhatsApp</strong>
                      <span>{DEFAULT_SETTINGS.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaEnvelope className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Official Email</strong>
                      <span>{DEFAULT_SETTINGS.email}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BsClockHistory className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Studio Hours</strong>
                      <span>Mon - Sat: 9:30 AM – 7:30 PM (IST)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href="https://wa.me/919667665892?text=Hi%20MYST%20Enterprises,%20I%20have%20an%20urgent%20design%20inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-bold text-xs sm:text-sm py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition hover:scale-[1.02] active:scale-95"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Instant WhatsApp Support (+91 96676 65892)
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-lg">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                      <BsCheckCircleFill className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                      Thank you for contacting MYST Enterprises. Our creative director will review your brief and connect with you on WhatsApp within 30 minutes.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-xs font-bold text-emerald-800 underline"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                      Start Your Project Brief
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Rao"
                          className="w-full text-xs rounded-xl border border-gray-300 px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Business / Brand Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.business}
                          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                          placeholder="e.g. The Brew House"
                          className="w-full text-xs rounded-xl border border-gray-300 px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          WhatsApp / Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 96676 65892"
                          className="w-full text-xs rounded-xl border border-gray-300 px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Client Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@brandname.com"
                          className="w-full text-xs rounded-xl border border-gray-300 px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Service Required
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-300 px-3.5 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium"
                      >
                        <option value="Logo & Brand Identity">Logo &amp; Brand Identity</option>
                        <option value="Cafe / Restaurant Menu">Cafe / Restaurant Menu</option>
                        <option value="Packaging & Box Dielines">Packaging &amp; Box Dielines</option>
                        <option value="Social Media Campaign">Social Media Campaign</option>
                        <option value="Business Cards & Stationery">Business Cards &amp; Stationery</option>
                        <option value="Complete Startup Package">Complete Startup Package</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Tell Us About Your Vision &amp; Requirements
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your brand aesthetic, preferred colors, deadline, or special instructions..."
                        className="w-full text-xs rounded-xl border border-gray-300 p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#064e3b] hover:bg-[#047857] disabled:opacity-60 text-white text-xs font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Dispatching Inquiry &amp; Email...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="w-4 h-4" />
                          <span>Submit Project Brief</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= INTERACTIVE GOOGLE MAP SECTION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Map Header Bar */}
            <div className="p-6 bg-gray-50/80 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <FaCompass className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-black text-gray-900">
                    Locate Our Studio Office
                  </h3>
                  <p className="text-xs text-gray-500">
                    {DEFAULT_SETTINGS.address}
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Sirsa+Haryana+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold px-4 py-2 rounded-xl shadow transition shrink-0"
              >
                <FaLocationArrow className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <FaExternalLinkAlt className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>

            {/* Embedded Live Map Container */}
            <div className="relative w-full h-[400px] sm:h-[460px] bg-gray-100">
              <iframe
                title="MYST Enterprises Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110595.84501235123!2d75.025219!3d29.535091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39114c0a5f78cbfd%3A0x3344d2d476615b31!2sSirsa%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-105 contrast-105"
              />

              {/* Floating Studio Landmark Badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-xl max-w-xs hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    Open for In-Person Consultations
                  </span>
                </div>
                <h4 className="font-bold text-xs text-gray-900">
                  MYST Creative Studios &bull; Sirsa, Haryana
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Rattakhera (326) Sirsa, Haryana, India. Dedicated parking and creative meeting suite.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
