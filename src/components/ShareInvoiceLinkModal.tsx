'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface ShareInvoiceLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClientName?: string;
  defaultPhone?: string;
  defaultAmount?: number;
  defaultService?: string;
}

export const ShareInvoiceLinkModal: React.FC<ShareInvoiceLinkModalProps> = React.memo(({
  isOpen,
  onClose,
  defaultClientName = '',
  defaultPhone = '',
  defaultAmount = 3500,
  defaultService = 'Logo & Brand Identity Design'
}) => {
  const [clientName, setClientName] = useState(defaultClientName);
  const [phone, setPhone] = useState(defaultPhone);
  const [amount, setAmount] = useState(defaultAmount);
  const [service, setService] = useState(defaultService);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Build the self-fill URL memoized
  const formUrl = React.useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const queryParams = new URLSearchParams();
    if (clientName) queryParams.set('name', clientName);
    if (phone) queryParams.set('phone', phone.replace(/[^0-9]/g, ''));
    if (amount) queryParams.set('amount', String(amount));
    if (service) queryParams.set('service', service);
    return `${origin}/get-invoice/?${queryParams.toString()}`;
  }, [clientName, phone, amount, service]);

  const whatsappMessage = React.useMemo(() => {
    return `Namaste${clientName ? ` ${clientName} ji` : ''}! 🙏\n\nMYST Enterprises se aapka official Tax Invoice generate karne ke liye, kripya yeh 30-second form open karke submit kar dijiye:\n\n🔗 ${formUrl}\n\nForm submit karte hi aapka official PDF Invoice instantly download ho jayega.\n\nThank you!\n- MYST ENTERPRISES`;
  }, [clientName, formUrl]);

  const targetWhatsappUrl = React.useMemo(() => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return cleanPhone
      ? `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`
      : `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
  }, [phone, whatsappMessage]);

  const handleCopyLink = React.useCallback(() => {
    navigator.clipboard.writeText(formUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }, [formUrl]);

  const handleCopyMessage = React.useCallback(() => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  }, [whatsappMessage]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="share-invoice-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key="share-invoice-card"
            initial={{ opacity: 0, scale: 0.85, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 260,
              mass: 0.85,
            }}
            className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92dvh] sm:max-h-[90vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="bg-[#064e3b] text-white px-4 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white px-2 py-1 rounded-xl shadow-xs border border-white/20 flex items-center justify-center">
              <Image
                src="/logo-1.png"
                alt="MYST ENTERPRISES"
                width={105}
                height={26}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg leading-tight">
                Share Client Invoice Form
              </h3>
              <p className="text-[10px] sm:text-xs text-emerald-200">
                Client fills their details &bull; Invoice auto-generates instantly
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 bg-gray-50/50 overflow-y-auto flex-1 overscroll-contain">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 flex items-start gap-2.5">
            <span className="text-base shrink-0">💡</span>
            <p className="leading-relaxed">
              Client ko yeh link bhejiye. Wo apna <strong>Naam, Dukan/Business, City aur GST</strong> bharenge aur unka <strong>Official Tax Invoice</strong> auto-generate ho jayega!
            </p>
          </div>

          {/* Quick Pre-fill Inputs */}
          <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Pre-fill Details (Optional)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9667665892"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Service / Work
                </label>
                <input
                  type="text"
                  placeholder="e.g. Logo Design"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Total Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="3500"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-emerald-800"
                />
              </div>
            </div>
          </div>

          {/* Generated Link Preview */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
              Generated Form Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={formUrl}
                className="w-full text-xs font-mono bg-gray-100 text-gray-700 px-3 py-2.5 rounded-xl border border-gray-200 select-all focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0"
                title="Copy link"
              >
                {copiedLink ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Message Preview */}
          <div className="bg-gray-100 p-3.5 rounded-2xl border border-gray-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                WhatsApp Message Preview
              </span>
              <button
                onClick={handleCopyMessage}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                {copiedMessage ? '✓ Copied Message' : 'Copy Full Text'}
              </button>
            </div>
            <pre className="text-[11px] text-gray-800 whitespace-pre-wrap font-sans leading-relaxed bg-white p-2.5 rounded-xl border border-gray-200">
              {whatsappMessage}
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={targetWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </a>

            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <FiExternalLink className="w-4 h-4" />
              <span>Open Form</span>
            </a>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ShareInvoiceLinkModal.displayName = 'ShareInvoiceLinkModal';
