'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX, FiPrinter, FiPlus, FiTrash2 } from 'react-icons/fi';
import { BsCheckCircleFill, BsBuilding } from 'react-icons/bs';
import { Invoice, InvoiceItem, ClientRecord } from '@/types';
import { saveInvoice, DEFAULT_SETTINGS, getStoredSettings, updateClientRecord } from '@/lib/storage';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: ClientRecord | null;
  existingInvoice?: Invoice | null;
  onInvoiceSaved?: (invoice: Invoice) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = React.memo(({
  isOpen,
  onClose,
  client,
  existingInvoice,
  onInvoiceSaved
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientBusiness, setClientBusiness] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'Paid' | 'Pending' | 'Overdue' | 'Partial'>('Pending');
  const [paymentMethod, setPaymentMethod] = useState('UPI / Google Pay');
  const [notes, setNotes] = useState('Thank you for working with MYST ENTERPRISES. All original vector files and copyrights transferred upon full settlement.');

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Brand Identity & Vector Logo Design', quantity: 1, rate: 3000, amount: 3000 },
    { id: '2', description: 'Print-Ready Menu Card / Brochure Layout', quantity: 1, rate: 2000, amount: 2000 }
  ]);

  const [applyGst, setApplyGst] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [isPreview, setIsPreview] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    if (!isOpen) return;
    setSettings(getStoredSettings());

    if (existingInvoice) {
      setInvoiceNumber(existingInvoice.invoiceNumber);
      setClientName(existingInvoice.clientName);
      setClientBusiness(existingInvoice.clientBusiness);
      setClientPhone(existingInvoice.clientPhone || '');
      setClientEmail(existingInvoice.clientEmail || '');
      setClientAddress(existingInvoice.clientAddress || '');
      setDate(existingInvoice.date);
      setDueDate(existingInvoice.dueDate);
      setStatus(existingInvoice.status);
      setPaymentMethod(existingInvoice.paymentMethod || 'UPI');
      setItems(existingInvoice.items);
      setApplyGst(existingInvoice.gstRate > 0);
      setDiscount(existingInvoice.discount || 0);
      setNotes(existingInvoice.notes || '');
    } else if (client) {
      const padNo = String(client.clientNo).padStart(4, '0');
      setInvoiceNumber(`MYST-INV-2026-${padNo}`);
      setClientName(client.name);
      setClientBusiness(client.business);
      setClientPhone(client.phone || '+91 98765 00000');
      setClientEmail(client.email || `${client.name.toLowerCase().replace(/\s+/g, '')}@example.com`);
      setClientAddress(client.address || 'Commercial Center, Market, India');
      setDate(client.date || '16 Sep 2026');
      setDueDate('23 Sep 2026');
      setStatus(client.status === 'Completed' ? 'Paid' : 'Pending');
      setPaymentMethod('UPI / Bank Transfer');
      // Itemized deliverable breakdown instead of raw single flat amount
      const rawParts = client.workItems && client.workItems.length > 0
        ? client.workItems
        : client.work
          ? client.work.split(/\s*\+\s*|\s*,\s*|\s*&\s*/).filter(Boolean)
          : [];

      if (rawParts.length > 1) {
        const splitRate = Math.round((client.amount || 4000) / rawParts.length);
        setItems(rawParts.map((part, idx) => {
          const isLast = idx === rawParts.length - 1;
          const lineAmt = isLast ? (client.amount || 4000) - splitRate * (rawParts.length - 1) : splitRate;
          const cleanDesc = part.trim();
          return {
            id: String(idx + 1),
            description: cleanDesc.includes('Design') || cleanDesc.includes('Suite') || cleanDesc.includes('Layout')
              ? cleanDesc
              : `${cleanDesc} Vector Design & Layout`,
            quantity: 1,
            rate: lineAmt,
            amount: lineAmt
          };
        }));
      } else if (client.amount && client.amount > 0) {
        const part1Rate = Math.round(client.amount * 0.65);
        const part2Rate = client.amount - part1Rate;
        setItems([
          {
            id: '1',
            description: client.work ? `${client.work} - Conceptualization & Creative Layout` : 'Brand Identity & Vector Design Suite',
            quantity: 1,
            rate: part1Rate,
            amount: part1Rate
          },
          {
            id: '2',
            description: 'Commercial Rights, High-Res Production Files & Vector Assets',
            quantity: 1,
            rate: part2Rate,
            amount: part2Rate
          }
        ]);
      } else {
        setItems([
          {
            id: '1',
            description: client.work || 'Creative Design Deliverable',
            quantity: 1,
            rate: client.amount || 3500,
            amount: client.amount || 3500
          }
        ]);
      }
      setApplyGst(false);
      setDiscount(0);
    } else {
      const randomNo = Math.floor(200 + Math.random() * 50);
      setInvoiceNumber(`MYST-INV-2026-0${randomNo}`);
      setClientName('');
      setClientBusiness('');
      setClientPhone('');
      setClientEmail('');
      setClientAddress('');
      setDate('16 Sep 2026');
      setDueDate('23 Sep 2026');
      setStatus('Pending');
      setPaymentMethod('UPI');
      setItems([
        { id: '1', description: 'Logo & Brand Identity Design', quantity: 1, rate: 3500, amount: 3500 }
      ]);
      setApplyGst(false);
      setDiscount(0);
    }
  }, [isOpen, client, existingInvoice]);

  const subtotal = React.useMemo(() => items.reduce((sum, item) => sum + item.amount, 0), [items]);
  const gstRate = applyGst ? 18 : 0;
  const gstAmount = React.useMemo(() => applyGst ? Math.round(subtotal * 0.18) : 0, [applyGst, subtotal]);
  const totalAmount = React.useMemo(() => Math.max(0, subtotal + gstAmount - discount), [subtotal, gstAmount, discount]);

  const handleItemChange = React.useCallback((index: number, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: value };
      if (field === 'quantity' || field === 'rate') {
        const q = field === 'quantity' ? Number(value) : item.quantity;
        const r = field === 'rate' ? Number(value) : item.rate;
        item.amount = (isNaN(q) ? 1 : q) * (isNaN(r) ? 0 : r);
      }
      updated[index] = item;
      return updated;
    });
  }, []);

  const handleAddItem = React.useCallback(() => {
    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        description: 'Graphic Design Deliverables',
        quantity: 1,
        rate: 1500,
        amount: 1500
      }
    ]);
  }, []);

  const handleRemoveItem = React.useCallback((index: number) => {
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  }, []);

  const handleSaveInvoice = React.useCallback(() => {
    const newInvoice: Invoice = {
      id: existingInvoice ? existingInvoice.id : `inv-${Date.now()}`,
      invoiceNumber: invoiceNumber || `MYST-INV-${Date.now().toString().slice(-4)}`,
      clientNo: client ? client.clientNo : 233,
      clientName: clientName || 'Client Name',
      clientBusiness: clientBusiness || 'Commercial Business',
      clientPhone: clientPhone,
      clientEmail: clientEmail,
      clientAddress: clientAddress,
      date,
      dueDate,
      items,
      subtotal,
      gstRate,
      gstAmount,
      discount,
      totalAmount,
      paidAmount: status === 'Paid' ? totalAmount : status === 'Partial' ? Math.round(totalAmount / 2) : 0,
      balance: status === 'Paid' ? 0 : status === 'Partial' ? Math.round(totalAmount / 2) : totalAmount,
      status,
      paymentMethod,
      notes
    };

    saveInvoice(newInvoice);

    if (client) {
      updateClientRecord(client.id, {
        amount: totalAmount,
        status: status === 'Paid' ? 'Completed' : 'Payment Pending'
      });
    }

    setSaveSuccess(true);
    if (onInvoiceSaved) onInvoiceSaved(newInvoice);

    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  }, [
    existingInvoice,
    invoiceNumber,
    client,
    clientName,
    clientBusiness,
    clientPhone,
    clientEmail,
    clientAddress,
    date,
    dueDate,
    items,
    subtotal,
    gstRate,
    gstAmount,
    discount,
    totalAmount,
    status,
    paymentMethod,
    notes,
    onInvoiceSaved,
    onClose
  ]);

  const handlePrint = React.useCallback(() => {
    window.print();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-4 border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Top Action Bar */}
        <div className="bg-[#064e3b] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white px-2 py-1 rounded-xl shadow-xs border border-white/20 flex items-center justify-center">
              <Image
                src="/logo-1.png"
                alt="MYST ENTERPRISES"
                width={110}
                height={28}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">
                {isPreview ? 'Tax Invoice Preview' : 'Generate & Manage Invoice'}
              </h3>
              <p className="text-xs text-emerald-200">
                MYST ENTERPRISES &bull; {invoiceNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5"
            >
              {isPreview ? '✏️ Edit Invoice' : '👁️ View Print Preview'}
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow"
            >
              <FiPrinter className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
          {!isPreview ? (
            /* EDIT FORM VIEW */
            <div className="space-y-6">
              {/* Header Info Grid */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full text-sm font-semibold rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Invoice Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="16 Sep 2026"
                    className="w-full text-sm rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Payment Due Date
                  </label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="23 Sep 2026"
                    className="w-full text-sm rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Client / Payer Name (As per Bank Statement)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Account Holder / Remitter Name"
                    className="w-full text-sm font-semibold rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Matches the remitter name on bank / UPI statement
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Business / Brand / Firm Name
                  </label>
                  <input
                    type="text"
                    value={clientBusiness}
                    onChange={(e) => setClientBusiness(e.target.value)}
                    placeholder="e.g. Company or Brand Name"
                    className="w-full text-sm rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Payment Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Invoice['status'])}
                    className="w-full text-sm font-semibold rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none bg-white"
                  >
                    <option value="Paid">✅ Paid (Completed)</option>
                    <option value="Pending">⏳ Pending</option>
                    <option value="Overdue">⚠️ Overdue</option>
                    <option value="Partial">🟡 Partial Payment</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Client Address / City
                  </label>
                  <input
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="Khan Market, New Delhi, India"
                    className="w-full text-sm rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Client Phone / Contact
                  </label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98112 34567"
                    className="w-full text-sm rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Service Line Items &amp; Deliverables
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
                  >
                    <FiPlus className="w-3.5 h-3.5" />
                    Add Service Row
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-gray-50/80 p-3 rounded-xl border border-gray-200">
                      <div className="flex-1 w-full sm:w-auto">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                          placeholder="Service name (e.g. Logo Design)"
                          className="w-full text-sm bg-white rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                        <div className="w-20">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                            className="w-full text-center text-sm bg-white rounded-lg border border-gray-300 px-2 py-2"
                            title="Quantity"
                          />
                        </div>
                        <div className="w-28 relative">
                          <span className="absolute left-2.5 top-2 text-xs text-gray-500 font-bold">₹</span>
                          <input
                            type="number"
                            min="0"
                            step="100"
                            value={item.rate}
                            onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                            className="w-full text-right text-sm bg-white rounded-lg border border-gray-300 pl-6 pr-2 py-2 font-medium"
                            title="Unit Rate"
                          />
                        </div>
                        <div className="w-28 text-right font-bold text-gray-900 text-sm">
                          ₹{item.amount.toLocaleString()}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          disabled={items.length <= 1}
                          className="text-gray-400 hover:text-rose-600 disabled:opacity-30 p-1"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Summary Footer */}
                <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyGst}
                        onChange={(e) => setApplyGst(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span>Apply 18% GST (CGST 9% + SGST 9%)</span>
                    </label>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <span>Discount: ₹</span>
                      <input
                        type="number"
                        min="0"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                        className="w-20 text-sm border rounded-lg px-2 py-1 bg-white"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-64 space-y-1.5 text-right text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    {applyGst && (
                      <div className="flex justify-between text-gray-600">
                        <span>GST (18%):</span>
                        <span className="font-semibold text-gray-900">₹{gstAmount.toLocaleString()}</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount:</span>
                        <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t border-gray-200">
                      <span>Total Amount:</span>
                      <span className="text-emerald-800">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes & Bank Details */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Payment Instructions &amp; Terms
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            /* CLEAN PRINTABLE INVOICE VIEW */
            <div id="printable-invoice" className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md text-gray-800 space-y-8">
              {/* Studio Header & Meta */}
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
                  <div className="mt-3 text-xs text-gray-500 space-y-0.5">
                    <p>{settings.address}</p>
                    <p>Phone: {settings.phone} | Email: {settings.email}</p>
                    {settings.gstin ? (
                      <p className="font-semibold text-gray-700">GSTIN: {settings.gstin}</p>
                    ) : (
                      <p className="text-gray-500 italic">Bill of Supply (Composition / GST Exempt)</p>
                    )}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
                    {status === 'Paid' ? 'TAX INVOICE (PAID)' : 'TAX INVOICE'}
                  </span>
                  <h2 className="text-xl font-bold font-mono text-gray-900">
                    {invoiceNumber}
                  </h2>
                  <div className="text-xs text-gray-500 mt-2 space-y-1">
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Due Date:</strong> {dueDate}</p>
                    <p>
                      <strong>Status: </strong>
                      <span className={`font-bold ${status === 'Paid' ? 'text-emerald-700' : 'text-amber-600'}`}>
                        {status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bill To Info */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Billed To Client
                </span>
                <h3 className="font-bold text-gray-900 text-base">
                  {clientName || 'Valued Client'}
                </h3>
                <p className="text-xs text-emerald-800 font-semibold">{clientBusiness}</p>
                <p className="text-xs text-gray-600 mt-1">{clientAddress}</p>
                <p className="text-xs text-gray-600">Phone: {clientPhone} &bull; Email: {clientEmail}</p>
              </div>

              {/* Table */}
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-gray-900 text-gray-900 font-bold uppercase tracking-wider">
                    <th className="py-2.5">#</th>
                    <th className="py-2.5">Deliverable Description</th>
                    <th className="py-2.5 text-center">Qty</th>
                    <th className="py-2.5 text-right">Unit Rate</th>
                    <th className="py-2.5 text-right">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item, i) => (
                    <tr key={item.id}>
                      <td className="py-3 text-gray-400 font-medium">{i + 1}</td>
                      <td className="py-3 font-semibold text-gray-800">{item.description}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right">₹{item.rate.toLocaleString()}</td>
                      <td className="py-3 text-right font-bold text-gray-950">₹{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Summary */}
              <div className="flex justify-between items-start pt-4 border-t border-gray-200">
                <div className="max-w-xs text-xs space-y-2">
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                    <h5 className="font-bold text-emerald-950 mb-1 flex items-center gap-1">
                      <BsBuilding className="w-3.5 h-3.5" /> Direct Bank &amp; UPI Settlement
                    </h5>
                    <p className="text-gray-700">UPI ID: <strong className="font-mono text-emerald-900">{settings.upiId}</strong></p>
                    <p className="text-gray-700">Bank: <strong>{settings.bankName}</strong></p>
                    <p className="text-gray-700">A/C: <strong className="font-mono">{settings.accountNumber}</strong></p>
                    <p className="text-gray-700">IFSC: <strong className="font-mono">{settings.ifscCode}</strong></p>
                  </div>
                </div>

                <div className="w-64 text-xs space-y-2 text-right">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {applyGst && (
                    <>
                      <div className="flex justify-between text-gray-600">
                        <span>CGST (9%):</span>
                        <span className="font-medium">₹{(gstAmount / 2).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>SGST (9%):</span>
                        <span className="font-medium">₹{(gstAmount / 2).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount:</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t-2 border-gray-900">
                    <span>Grand Total:</span>
                    <span className="text-emerald-800">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Authorized Signatory */}
              <div className="pt-8 border-t border-dashed border-gray-300 flex justify-between items-end text-xs text-gray-500">
                <div>
                  <p className="italic">{notes}</p>
                </div>
                <div className="text-center space-y-1">
                  <div className="font-serif italic text-lg font-bold text-gray-800">
                    {settings.ownerName || 'Jasdeep Singh'}
                  </div>
                  <div className="w-36 h-0.5 bg-gray-400 mx-auto" />
                  <p className="font-semibold text-gray-700">For MYST ENTERPRISES</p>
                  <p className="text-[10px] text-gray-400">Authorized Signatory</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="text-xs text-gray-500">
            {saveSuccess && (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in">
                <BsCheckCircleFill className="w-4 h-4" /> Invoice successfully saved &amp; synced!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveInvoice}
              className="px-5 py-2.5 bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2"
            >
              <BsCheckCircleFill className="w-4 h-4" />
              Save Invoice &amp; Update Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

InvoiceModal.displayName = 'InvoiceModal';
