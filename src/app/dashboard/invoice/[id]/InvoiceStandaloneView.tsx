'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  FiArrowLeft as ArrowLeft,
  FiPrinter as Printer,
  FiDownload as Download
} from 'react-icons/fi';
import { Invoice } from '@/types';
import {
  getStoredInvoices,
  getStoredClients,
  getStoredSettings,
  DEFAULT_SETTINGS,
  autoGenerateInvoiceForClient,
  getAuthSession,
} from '@/lib/storage';

export default function InvoiceStandaloneView() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

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

    setSettings(getStoredSettings());
    const invoices = getStoredInvoices();
    const clients = getStoredClients();

    let foundInvoice = invoices.find(
      i => i.id === rawId || i.invoiceNumber.toLowerCase() === rawId?.toLowerCase()
    );

    if (!foundInvoice) {
      const client = clients.find(c => c.id === rawId || String(c.clientNo) === rawId || (rawId === 'c-rahul-sharma' && c.clientNo === 222));
      if (client) {
        foundInvoice = invoices.find(i => i.clientNo === client.clientNo || i.clientName.toLowerCase() === client.name.toLowerCase());
        if (!foundInvoice) {
          // Automatically generate and save right into storage
          foundInvoice = autoGenerateInvoiceForClient(client);
        }
      }
    }

    setInvoice(foundInvoice || invoices[0]);
  }, [rawId, router]);

  const handlePrint = () => {
    window.print();
  };

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <p className="text-gray-500">Loading invoice...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Header Buttons */}
        <div className="flex items-center justify-between no-print">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs px-4 py-2 rounded-xl border border-gray-300 shadow-2xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* The White Invoice Sheet */}
        <div
          id="printable-invoice"
          className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 sm:p-12 text-gray-900 space-y-8"
        >
          {/* Top Brand & Invoice Title */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-gray-200">
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
                {settings.address}
              </p>
              <p className="text-xs text-gray-600 font-mono">
                Phone: {settings.phone} &bull; Email: {settings.email}
              </p>
              {settings.gstin ? (
                <p className="text-xs font-bold text-gray-800 font-mono mt-0.5">
                  GSTIN: {settings.gstin} &bull; SAC: 998314
                </p>
              ) : (
                <p className="text-xs text-gray-500 italic mt-0.5">
                  Bill of Supply (Composition / GST Exempt) &bull; SAC: 998314
                </p>
              )}
            </div>

            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
                {invoice.status === 'Paid' ? (settings.gstin ? 'TAX INVOICE (PAID)' : 'BILL OF SUPPLY (PAID)') : (settings.gstin ? 'TAX INVOICE' : 'BILL OF SUPPLY')}
              </span>
              <p className="text-xl font-bold font-mono text-gray-900">
                {invoice.invoiceNumber}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                <strong>Date:</strong> {invoice.date}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Due Date:</strong> {invoice.dueDate || invoice.date}
              </p>
            </div>
          </div>

          {/* Bill To Info */}
          <div className="text-xs sm:text-sm text-gray-800 space-y-0.5">
            <p className="font-bold text-gray-500 text-xs mb-1">Bill To / Payer:</p>
            <p className="font-bold text-base text-gray-900">{invoice.clientName}</p>
            {invoice.clientBusiness && <p className="text-gray-700 font-medium">{invoice.clientBusiness}</p>}
            <p className="text-gray-600">{invoice.location || invoice.clientAddress}</p>
            <p className="text-gray-600">{invoice.clientPhone}</p>
            {invoice.clientEmail && <p className="text-gray-600">{invoice.clientEmail}</p>}
            {invoice.clientGstin && (
              <p className="text-gray-800 font-semibold font-mono text-[11px] mt-1">
                GSTIN: <span className="text-emerald-700">{invoice.clientGstin}</span>
              </p>
            )}
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-100/90 text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-4 w-12 text-center">#</th>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 text-center w-16">Qty</th>
                  <th className="py-2.5 px-4 text-right w-28">Rate</th>
                  <th className="py-2.5 px-4 text-right w-28">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {invoice.items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-center text-gray-500 font-mono">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {item.description}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      ₹{item.rate.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900">
                      ₹{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Bank Details Grid */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-gray-200">
            {/* Direct Bank Settlement Card */}
            <div className="w-full sm:max-w-xs text-xs space-y-2">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
                <h5 className="font-bold text-emerald-950 mb-1.5 flex items-center gap-1.5">
                  🏦 Direct Bank &amp; UPI Settlement
                </h5>
                <p className="text-gray-700">UPI ID: <strong className="font-mono text-emerald-900">{settings.upiId}</strong></p>
                <p className="text-gray-700">Bank: <strong>{settings.bankName}</strong></p>
                <p className="text-gray-700">A/C: <strong className="font-mono">{settings.accountNumber}</strong></p>
                <p className="text-gray-700">IFSC: <strong className="font-mono">{settings.ifscCode}</strong></p>
              </div>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs sm:text-sm text-right">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-semibold text-gray-900">₹{(invoice.subtotal || invoice.totalAmount || 8000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>GST (0% / Exempt):</span>
                <span className="font-mono">₹0</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t-2 border-gray-900">
                <span>Total Amount:</span>
                <span className="text-emerald-800">₹{(invoice.totalAmount || 8000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-800 font-bold bg-emerald-50 p-2 rounded-lg">
                <span>Paid Amount:</span>
                <span>₹{(invoice.paidAmount ?? invoice.totalAmount ?? 8000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Balance:</span>
                <span className="font-bold text-gray-900">₹{(invoice.balance ?? 0).toLocaleString()}</span>
              </div>

              {/* Status Badge */}
              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="inline-block bg-[#059669] text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-2xs">
                  {invoice.status === 'Paid' ? 'Paid (Completed)' : invoice.status}
                </span>
              </div>

              {invoice.status === 'Paid' && (
                <div className="flex justify-between text-xs text-emerald-800 font-semibold pt-1">
                  <span>Settled By:</span>
                  <span className="truncate max-w-[150px]">{invoice.clientName}</span>
                </div>
              )}

              {invoice.paymentMethod && (
                <div className="flex justify-between text-xs text-gray-500 pt-1">
                  <span>Method:</span>
                  <span className="font-medium text-gray-800">{invoice.paymentMethod}</span>
                </div>
              )}

              {invoice.transactionId && (
                <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                  <span>Ref / UTR:</span>
                  <span className="font-semibold text-emerald-800">{invoice.transactionId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notes & Authorized Signatory */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-end text-xs text-gray-500 gap-6">
            <div className="space-y-1 max-w-sm">
              <p className="font-bold text-gray-800">Terms &amp; Notice:</p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-600">
                <li>Commercial design rights and vector source files transferred upon settlement.</li>
                <li>Commercial SAC: 998314 (Information technology &amp; graphic design services).</li>
                <li>Thank you for choosing {settings.studioName}!</li>
              </ul>
            </div>

            <div className="text-center space-y-1">
              <div className="font-serif italic text-lg font-bold text-gray-800">
                {settings.ownerName}
              </div>
              <div className="w-36 h-0.5 bg-gray-400 mx-auto" />
              <p className="font-semibold text-gray-700">For {settings.studioName}</p>
              <p className="text-[10px] text-gray-400">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
