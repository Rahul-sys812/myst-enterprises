'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { BsPersonPlusFill, BsCheckCircleFill } from 'react-icons/bs';
import { ClientRecord, ClientStatus } from '@/types';
import { addClientRecord } from '@/lib/storage';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientAdded: (client: ClientRecord) => void;
}

export const AddClientModal: React.FC<AddClientModalProps> = React.memo(({
  isOpen,
  onClose,
  onClientAdded
}) => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [work, setWork] = useState('Logo + Menu');
  const [amount, setAmount] = useState<number>(5000);
  const [status, setStatus] = useState<ClientStatus>('In Progress');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [autoInvoice, setAutoInvoice] = useState(true);

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !business.trim()) return;

    const newRecord = addClientRecord({
      name: name.trim(),
      business: business.trim(),
      work: work.trim(),
      amount: Number(amount) || 0,
      status,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      notes: notes.trim()
    }, autoInvoice);

    onClientAdded(newRecord);
    onClose();
  }, [name, business, work, amount, status, phone, email, address, notes, autoInvoice, onClientAdded, onClose]);

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
          key="add-client-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key="add-client-card"
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
        <div className="bg-[#064e3b] text-white px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between shrink-0 border-b border-emerald-800/40">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <BsPersonPlusFill className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg leading-tight">Add New Client</h3>
              <p className="text-[10px] sm:text-xs text-emerald-200">Create client entry &amp; tracking record</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-3.5 sm:p-5 overflow-y-auto flex-1 space-y-2.5 sm:space-y-3.5 overscroll-contain">
            {/* Client Name & Business Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rohan Sharma"
                  className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-300 px-3 py-1.5 sm:py-2.5 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                  Business / Brand *
                </label>
                <input
                  type="text"
                  required
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Coffee Bistro / Real Estate"
                  className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-300 px-3 py-1.5 sm:py-2.5 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            {/* Work Scope & Amount side-by-side */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                  Work Scope
                </label>
                <input
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  placeholder="Logo + Menu"
                  className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-300 px-3 py-1.5 sm:py-2.5 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl border border-gray-300 px-3 py-1.5 sm:py-2.5 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-gray-50/50 focus:bg-white text-emerald-900"
                />
              </div>
            </div>

            {/* Status & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                  Project Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ClientStatus)}
                  className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-300 px-3 py-1.5 sm:py-2.5 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-white font-medium cursor-pointer"
                >
                  <option value="In Progress">🟡 In Progress</option>
                  <option value="Completed">🟢 Completed</option>
                  <option value="Payment Pending">🔴 Payment Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 96676 65892"
                  className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-300 px-3 py-1.5 sm:py-2.5 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            {/* Email & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                  Client Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@brandname.com"
                  className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-300 px-3 py-1.5 sm:py-2.5 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Sirsa, Haryana"
                  className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-300 px-3 py-1.5 sm:py-2.5 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            {/* Project Notes */}
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                Project Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Express delivery, needs vector SVG"
                className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-300 px-3 py-1.5 sm:py-2.5 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-gray-50/50 focus:bg-white"
              />
            </div>

            {/* Auto-Generate & Save Invoice Checkbox Card */}
            <div className="p-2.5 sm:p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl sm:rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-xs">
                  ⚡
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-emerald-950">Auto-Generate &amp; Save Tax Invoice</p>
                  <p className="text-[9px] sm:text-[11px] text-emerald-700">Official commercial invoice turant generate ho kar save ho jayega</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoInvoice}
                onChange={(e) => setAutoInvoice(e.target.checked)}
                className="w-4 h-4 text-emerald-700 rounded focus:ring-emerald-500 cursor-pointer shrink-0 ml-2"
              />
            </div>
          </div>

          {/* Sticky Bottom Action Buttons Footer - Never Hidden on Mobile */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-6 sm:py-3.5 border-t border-gray-200 flex items-center justify-end gap-2.5 shrink-0 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-gray-600 hover:text-gray-900 rounded-lg sm:rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold rounded-lg sm:rounded-xl shadow-md flex items-center gap-1.5 transition cursor-pointer active:scale-95"
            >
              <BsCheckCircleFill className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400" />
              <span>{autoInvoice ? 'Save & Create Invoice' : 'Save Client'}</span>
            </button>
          </div>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

AddClientModal.displayName = 'AddClientModal';
