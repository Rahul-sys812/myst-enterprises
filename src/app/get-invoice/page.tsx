'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  FiCheckCircle,
  FiPrinter,
  FiArrowRight,
  FiFileText,
  FiShield,
  FiClock
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageHeroBanner } from '@/components/PageHeroBanner';
import { addClientRecord, saveInvoice, getStoredSettings, DEFAULT_SETTINGS, StudioSettings } from '@/lib/storage';
import { Invoice } from '@/types';
import { submitToWeb3Forms } from '@/lib/web3forms';

const COMMON_SERVICES = [
  'Logo & Brand Identity Design',
  'Visiting Card & Stationery Layout',
  'Restaurant / Cafe Menu Card Design',
  'Social Media Posts & Banner Kit',
  'Product Packaging & Dieline Design',
  'Flyer, Brochure & Pamphlet Layout',
  'Shop Signboard & Flex Banner Artwork',
  'E-Commerce Product Catalog / Lookbook',
  'Full Agency Branding Suite'
];

function InvoiceFormContent() {
  const searchParams = useSearchParams();

  // Form input states (prefilled from URL query parameters if available)
  const [clientName, setClientName] = useState('');
  const [clientBusiness, setClientBusiness] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientGstin, setClientGstin] = useState('');
  const [service, setService] = useState('Logo & Brand Identity Design');
  const [customService, setCustomService] = useState('');
  const [amount, setAmount] = useState<number>(3500);
  const [paymentMethod, setPaymentMethod] = useState('UPI / Google Pay');
  const [transactionId, setTransactionId] = useState('');
  const [studioSettings, setStudioSettings] = useState<StudioSettings>(DEFAULT_SETTINGS);

  // Submission state
  const [generatedInvoice, setGeneratedInvoice] = useState<Invoice | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setStudioSettings(getStoredSettings());

    const urlName = searchParams.get('name');
    const urlPhone = searchParams.get('phone');
    const urlAmount = searchParams.get('amount');
    const urlService = searchParams.get('service');
    const urlBusiness = searchParams.get('business');

    if (urlName) setClientName(urlName);
    if (urlPhone) setClientPhone(urlPhone);
    if (urlBusiness) setClientBusiness(urlBusiness);
    if (urlAmount && !isNaN(Number(urlAmount))) setAmount(Number(urlAmount));
    if (urlService) {
      if (COMMON_SERVICES.includes(urlService)) {
        setService(urlService);
      } else {
        setService('Other Custom Work');
        setCustomService(urlService);
      }
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const effectiveService = service === 'Other Custom Work' && customService.trim()
      ? customService.trim()
      : service;

    const todayStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // 1. Add Client Record to directory
    const newClient = addClientRecord({
      name: clientName.trim() || 'Valued Client',
      business: clientBusiness.trim() || 'Commercial Business',
      work: effectiveService,
      amount: amount || 0,
      paidAmount: amount || 0,
      balance: 0,
      status: 'Completed',
      date: todayStr,
      phone: clientPhone.trim(),
      email: clientEmail.trim(),
      location: clientAddress.trim() || 'India',
      address: clientAddress.trim(),
      gstin: clientGstin.trim() || undefined,
      transactionId: transactionId.trim() || undefined,
      workItems: [effectiveService],
      notes: `Self-generated invoice via MYST Portal. Mode: ${paymentMethod}${transactionId ? ` (Ref: ${transactionId})` : ''}`
    });

    // 2. Generate matching Tax Invoice
    const invoiceNumber = `INV-${String(newClient.clientNo).padStart(3, '0')}`;
    const newInvoice: Invoice = {
      id: `inv-${String(newClient.clientNo).padStart(3, '0')}`,
      invoiceNumber,
      clientNo: newClient.clientNo,
      clientName: newClient.name,
      clientBusiness: newClient.business,
      clientPhone: clientPhone.trim() || '+91 98765 00000',
      clientEmail: clientEmail.trim() || `${newClient.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      clientAddress: clientAddress.trim() || 'Commercial Center, India',
      clientGstin: clientGstin.trim() || undefined,
      location: clientAddress.trim() || 'India',
      date: todayStr,
      dueDate: todayStr,
      items: [
        {
          id: '1',
          description: effectiveService,
          quantity: 1,
          rate: amount || 0,
          amount: amount || 0
        }
      ],
      subtotal: amount || 0,
      gstRate: 0,
      gstAmount: 0,
      discount: 0,
      totalAmount: amount || 0,
      paidAmount: amount || 0,
      balance: 0,
      status: 'Paid',
      paymentMethod,
      transactionId: transactionId.trim() || undefined,
      notes: `• Official Commercial Tax Invoice issued by ${studioSettings.studioName}.\n• All copyrights & original vector files transferred upon settlement.\n• Thank you for working with MYST ENTERPRISES!`
    };

    saveInvoice(newInvoice);

    // Auto-dispatch email alert via Web3Forms
    submitToWeb3Forms({
      name: clientName,
      email: clientEmail.trim() || 'client@mystenterprises.com',
      phone: clientPhone,
      business: clientBusiness,
      service: effectiveService,
      subject: `[MYST Invoice Alert] Invoice ${newInvoice.invoiceNumber} Generated by ${clientName} (₹${amount})`,
      message: `Client ${clientName} (${clientBusiness}) generated official invoice ${newInvoice.invoiceNumber} for amount ₹${amount}.\nPhone: ${clientPhone}\nAddress: ${clientAddress || 'India'}\nPayment Mode: ${paymentMethod}`
    }).catch(() => {});

    setGeneratedInvoice(newInvoice);
    setIsSubmitting(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // SUCCESS / INVOICE PREVIEW VIEW
  if (generatedInvoice) {
    const mystPhone = studioSettings.phone.replace(/[^0-9]/g, '') || '919667665892';
    const whatsappConfirmText = `Namaste MYST Enterprises! 🙏\n\nI have generated my official invoice on your portal.\nInvoice No: ${generatedInvoice.invoiceNumber}\nAmount: Rs ${generatedInvoice.totalAmount}\nBusiness: ${generatedInvoice.clientBusiness}\nClient: ${generatedInvoice.clientName}\n\nPlease confirm receipt. Thank you!`;

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Success Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 mb-8 text-center shadow-xs">
          <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <FiCheckCircle className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-emerald-950">
            Invoice Generated Successfully!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 mt-1.5 max-w-lg mx-auto">
            Your official Tax Invoice <strong className="font-mono text-emerald-950 font-black">{generatedInvoice.invoiceNumber}</strong> is ready. You can print, download PDF, or share with our studio on WhatsApp.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <FiPrinter className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>

            <a
              href={`https://wa.me/${mystPhone}?text=${encodeURIComponent(whatsappConfirmText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              onClick={() => setGeneratedInvoice(null)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs font-bold transition cursor-pointer"
            >
              Fill Another Response
            </button>
          </div>
        </div>

        {/* The Printable Tax Invoice Paper */}
        <div
          id="printable-invoice"
          className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-12 text-gray-900 space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-gray-150">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-48">
                  <Image
                    src="/logo-1.png"
                    alt="MYST ENTERPRISES"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2 max-w-sm">
                {studioSettings.address}
              </p>
              <p className="text-xs text-gray-600 font-mono">
                Phone: {studioSettings.phone} &bull; Email: {studioSettings.email}
              </p>
              {studioSettings.gstin && (
                <p className="text-xs font-bold text-gray-800 font-mono mt-0.5">
                  GSTIN: {studioSettings.gstin}
                </p>
              )}
            </div>

            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider rounded-lg mb-2">
                Commercial Tax Invoice
              </span>
              <p className="text-base sm:text-lg font-mono font-black text-gray-950">
                {generatedInvoice.invoiceNumber}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                <strong>Date:</strong> {generatedInvoice.date}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Payment Status:</strong> <span className="font-bold text-emerald-700">PAID</span>
              </p>
            </div>
          </div>

          {/* Billed To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80">
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Billed To (Client / Firm)
              </span>
              <h3 className="font-serif text-lg font-black text-gray-900">
                {generatedInvoice.clientName}
              </h3>
              <p className="text-xs font-bold text-emerald-800">
                {generatedInvoice.clientBusiness}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {generatedInvoice.clientAddress}
              </p>
              {generatedInvoice.clientGstin && (
                <p className="text-xs font-bold text-gray-800 font-mono mt-1">
                  Client GSTIN: {generatedInvoice.clientGstin}
                </p>
              )}
            </div>

            <div className="sm:text-right flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Contact &amp; Payment Details
                </span>
                <p className="text-xs text-gray-700">
                  <strong>Phone:</strong> {generatedInvoice.clientPhone}
                </p>
                {generatedInvoice.clientEmail && (
                  <p className="text-xs text-gray-700">
                    <strong>Email:</strong> {generatedInvoice.clientEmail}
                  </p>
                )}
                <p className="text-xs text-gray-700 mt-1">
                  <strong>Payment Mode:</strong> {generatedInvoice.paymentMethod}
                </p>
                {generatedInvoice.transactionId && (
                  <p className="text-xs text-gray-700 font-mono">
                    <strong>Ref / UTR:</strong> {generatedInvoice.transactionId}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Service Description</th>
                  <th className="py-3 px-4 text-center w-16">Qty</th>
                  <th className="py-3 px-4 text-right w-28">Rate</th>
                  <th className="py-3 px-4 text-right w-28">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 font-medium text-gray-800">
                {generatedInvoice.items.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="py-3.5 px-4 text-center text-gray-500">{idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-gray-900">{item.description}</p>
                      <p className="text-[11px] text-gray-500">Commercial Creative Deliverable &bull; 100% Vector Source Files</p>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">{item.quantity}</td>
                    <td className="py-3.5 px-4 text-right font-mono">₹{item.rate.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-gray-900">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-600 space-y-2 max-w-sm">
              <p className="font-bold text-gray-900">Terms &amp; Settlement:</p>
              <p>• 100% vector master files &amp; commercial copyright transferred upon settlement.</p>
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1">
                <p className="font-bold text-emerald-950">🏦 Direct Bank &amp; UPI Settlement</p>
                <p className="text-gray-700">Bank: <strong>{studioSettings.bankName}</strong></p>
                <p className="text-gray-700">A/C: <strong className="font-mono">{studioSettings.accountNumber}</strong></p>
                <p className="text-gray-700">IFSC: <strong className="font-mono">{studioSettings.ifscCode}</strong></p>
                <p className="text-gray-700">UPI: <strong className="font-mono text-emerald-900">{studioSettings.upiId}</strong></p>
              </div>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-mono font-semibold">₹{generatedInvoice.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (0% / Bill of Supply):</span>
                <span className="font-mono font-semibold">₹0</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t border-gray-200">
                <span>Total Amount:</span>
                <span className="font-mono text-emerald-800">₹{generatedInvoice.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg">
                <span>Amount Paid:</span>
                <span className="font-mono">₹{generatedInvoice.paidAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer Signatory */}
          <div className="pt-8 border-t border-gray-150 flex flex-col sm:flex-row justify-between items-end text-xs text-gray-500 gap-4">
            <div>
              <p className="font-serif font-black text-gray-900">{studioSettings.studioName}</p>
              <p>{studioSettings.address}</p>
            </div>
            <div className="text-right">
              <p className="font-serif font-bold text-gray-900">{studioSettings.ownerName}</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: CLIENT INPUT FORM
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      {/* Intro Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3">
          <FiFileText className="w-3.5 h-3.5" />
          <span>Self-Service Billing Portal</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
          Generate Official Tax Invoice
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-lg mx-auto">
          Apni dukan/business details fill karke apna verified commercial tax invoice turant generate aur download karein.
        </p>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <FiClock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">30-Second Generation</h4>
            <p className="text-[11px] text-gray-500">Instant PDF download</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <FiShield className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">GST-Compliant Format</h4>
            <p className="text-[11px] text-gray-500">Commercial tax receipt</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <FaWhatsapp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">WhatsApp Sync</h4>
            <p className="text-[11px] text-gray-500">Direct studio receipt</p>
          </div>
        </div>
      </div>

      {/* Main Billing Form Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Client & Business Info */}
          <div>
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-150 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Client &amp; Business Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Client Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Business / Brand / Shop Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma Cafe &amp; Bakers"
                  value={clientBusiness}
                  onChange={(e) => setClientBusiness(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  WhatsApp / Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 96676 65892"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahulcafe@gmail.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  City &amp; Billing Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Clock Tower, Sirsa, Haryana 125055"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 flex items-center justify-between">
                  <span>Client GSTIN (Optional)</span>
                  <span className="text-[10px] text-gray-500 lowercase font-normal">for B2B Input Tax Credit</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 06AAAAA0000A1Z5 (agar registered business hai toh)"
                  value={clientGstin}
                  onChange={(e) => setClientGstin(e.target.value.toUpperCase())}
                  className="w-full text-xs sm:text-sm font-mono rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 uppercase"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Order / Service Details */}
          <div>
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-150 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Design Service &amp; Package</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Service / Project Ordered
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                >
                  {COMMON_SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="Other Custom Work">Other Custom Work</option>
                </select>
              </div>

              {service === 'Other Custom Work' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Specify Custom Work Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Exhibition Stall 3D Design &amp; Backdrop"
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Total Amount (₹) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-gray-500 font-bold text-xs sm:text-sm">₹</span>
                    <input
                      type="number"
                      required
                      min={100}
                      step={100}
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm font-black pl-8 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                  >
                    <option value="UPI / Google Pay">UPI / Google Pay</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Paytm UPI">Paytm UPI</option>
                    <option value="Bank Transfer (NEFT / IMPS)">Bank Transfer (NEFT / IMPS)</option>
                    <option value="Cash / Hand-to-Hand">Cash / Direct</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    UPI Ref / Bank Transaction UTR (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UPI Ref: 429381749102"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full text-xs sm:text-sm font-mono rounded-xl border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 hover:from-emerald-800 hover:to-black text-white font-bold text-sm sm:text-base shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Generating Invoice...' : '🚀 Generate Official Tax Invoice'}</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-gray-500 mt-2.5">
              Secure commercial tax invoice generator &bull; Powered by MYST ENTERPRISES
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function GetInvoicePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Pinaka Law Associates Style Hero Banner */}
        <PageHeroBanner
          title="Commercial Tax Invoice"
          breadcrumb="Invoice"
          bgImage="/images/heroes/cart-hero.jpg"
        />

        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-gray-600">Loading Billing Portal...</p>
            </div>
          </div>
        }>
          <InvoiceFormContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
