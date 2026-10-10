'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  FiArrowLeft as ArrowLeft,
  FiLock as Lock,
  FiTrash2 as Trash2
} from 'react-icons/fi';
import { FaWhatsapp as MessageSquare } from 'react-icons/fa';
import { BsCheck2 as Check } from 'react-icons/bs';
import { ClientRecord } from '@/types';
import { getStoredClients, getAuthSession, deleteClientRecord } from '@/lib/storage';

export default function ClientDetailsView() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;

  const [client, setClient] = useState<ClientRecord | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const session = getAuthSession();
    const emailOrPhone = (session?.phoneOrEmail || '').trim().toLowerCase();
    const cleanPhone = emailOrPhone.replace(/\D/g, '');
    const isEmailAdmin = emailOrPhone === 'contact@mystenterprises.in';
    const isPhoneAdmin = ['9667665892'].includes(cleanPhone);
    if (!session || !session.isLoggedIn || session.role !== 'Admin' || (!isEmailAdmin && !isPhoneAdmin)) {
      router.push('/login');
      return;
    }

    const clients = getStoredClients();
    const found = clients.find(c => c.id === clientId || String(c.clientNo) === clientId) || clients[0];
    setClient(found);
  }, [clientId, router]);

  if (!client) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500">Loading client details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Action Bar (Matching Screenshot 7 top buttons) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-gray-300 shadow-2xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to List</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Gold Invoice Button */}
            <Link
              href={`/dashboard/invoice/${client.id}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#b45309] hover:bg-[#92400e] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Invoice</span>
            </Link>

            {/* Green Chat Button */}
            <Link
              href={`/dashboard/chat/${client.id}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#064e3b] hover:bg-[#047857] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat</span>
            </Link>

            {/* Red Delete Client Button */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition cursor-pointer"
              title="Permanently Delete this Client"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Client</span>
            </button>
          </div>
        </div>

        {/* Main Client Card Container */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-8">
          {/* Top Section: Client Information & Logo Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-100 pb-8">
            {/* Left: Client Information Table */}
            <div className="md:col-span-7 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-black text-gray-900">
                Client Information
              </h2>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="grid grid-cols-3 text-gray-600">
                  <span className="font-semibold text-gray-500">Client Name</span>
                  <span className="col-span-2 font-bold text-gray-900">: {client.name}</span>
                </div>

                <div className="grid grid-cols-3 text-gray-600">
                  <span className="font-semibold text-gray-500">Business Name</span>
                  <span className="col-span-2 font-bold text-gray-900">: {client.business}</span>
                </div>

                <div className="grid grid-cols-3 text-gray-600">
                  <span className="font-semibold text-gray-500">Phone</span>
                  <span className="col-span-2 font-medium text-gray-800">: {client.phone || '+91 96676 65892'}</span>
                </div>

                <div className="grid grid-cols-3 text-gray-600">
                  <span className="font-semibold text-gray-500">Email</span>
                  <span className="col-span-2 font-medium text-emerald-800 hover:underline">: {client.email || 'client@gmail.com'}</span>
                </div>

                <div className="grid grid-cols-3 text-gray-600">
                  <span className="font-semibold text-gray-500">Location</span>
                  <span className="col-span-2 font-medium text-gray-800">: {client.location || client.address || 'Sirsa, Haryana'}</span>
                </div>

                <div className="grid grid-cols-3 text-gray-600">
                  <span className="font-semibold text-gray-500">Added On</span>
                  <span className="col-span-2 font-medium text-gray-800">: {client.addedOn || client.date || '12 Apr 2025'}</span>
                </div>
              </div>
            </div>

            {/* Right: Client Logo Preview Box */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-[#d4af37]/40 bg-[#1e130c] group">
                <Image
                  src={client.logoPreview || '/images/sharma-cafe-logo.jpg'}
                  alt={`${client.business} Logo Preview`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-radial from-transparent to-black/30 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bottom Grid: Work Details & Payment Details (Matching Screenshot 7) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Work Details */}
            <div className="bg-gray-50/70 p-6 rounded-2xl border border-gray-100 space-y-4">
              <h3 className="font-serif text-lg font-black text-gray-900">
                Work Details
              </h3>

              <div className="space-y-3">
                {(client.workItems || [
                  'Logo Design (3 concepts)',
                  'Menu Design (A4 - 4 pages)',
                  'Social Media Posts (10)',
                  'Visiting Card (2 concepts)'
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800 font-medium">
                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Payment Details */}
            <div className="bg-gray-50/70 p-6 rounded-2xl border border-gray-100 space-y-4">
              <h3 className="font-serif text-lg font-black text-gray-900">
                Payment Details
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-semibold text-gray-500">Quoted Amount</span>
                  <span className="font-bold text-gray-900">₹{(client.amount || 8000).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-semibold text-gray-500">Paid Amount</span>
                  <span className="font-bold text-gray-900">₹{(client.paidAmount ?? client.amount ?? 8000).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-semibold text-gray-500">Balance</span>
                  <span className="font-bold text-gray-900">₹{(client.balance ?? 0).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600 pt-1">
                  <span className="font-semibold text-gray-500">Status</span>
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {client.status}
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-600 pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-500">Client Since</span>
                  <span className="font-medium text-gray-700">{client.addedOn || client.date || '12 Apr 2025'}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-semibold text-gray-500">Work Completed</span>
                  <span className="font-medium text-gray-700">{client.workCompletedDate || client.date || '20 Apr 2025'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Client Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-black text-gray-900">
                  Delete Client Record?
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Client #{client.clientNo} • {client.business}
                </p>
              </div>
            </div>

            <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 text-xs text-rose-900 space-y-1.5">
              <p className="font-bold">
                Permanently delete <span className="underline">{client.name}</span>?
              </p>
              <p className="text-[11px] text-rose-700 leading-relaxed">
                This will delete this client from your records, clear associated invoices, and return you to the dashboard directory.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteClientRecord(client.id);
                  router.push('/dashboard');
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Client</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
