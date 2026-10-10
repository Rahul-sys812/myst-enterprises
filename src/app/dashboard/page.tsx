'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FiSearch as Search,
  FiSettings as Settings,
  FiLogOut as LogOut,
  FiCalendar as Calendar,
  FiFileText as FileText,
  FiPrinter as Printer,
  FiPlus as Plus,
  FiMenu as Menu,
  FiX as X,
  FiRefreshCw as RefreshCw,
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
  FiCheck as Check,
  FiShare2 as Share2,
  FiTrash2 as Trash2
} from 'react-icons/fi';
import {
  FaUsers as Users,
  FaCreditCard as CreditCard,
  FaWhatsapp as MessageSquare
} from 'react-icons/fa';
import {
  BsPersonPlusFill as UserPlus,
  BsLightningChargeFill as Lightning,
  BsSave as SaveIcon
} from 'react-icons/bs';
import { MdDashboard as LayoutDashboard } from 'react-icons/md';
import { ClientRecord, ClientStatus, Invoice } from '@/types';
import {
  getStoredClients,
  getStoredInvoices,
  resetToDefault232Data,
  updateClientRecord,
  deleteClientRecord,
  deleteStoredInvoice,
  getAuthSession,
  clearAuthSession,
  getStoredSettings,
  saveStoredSettings,
  StudioSettings,
  DEFAULT_SETTINGS,
  autoGenerateMissingInvoices
} from '@/lib/storage';
import { InvoiceModal } from '@/components/InvoiceModal';
import { AddClientModal } from '@/components/AddClientModal';
import { AdminClientChatCenter } from '@/components/AdminClientChatCenter';
import { ShareInvoiceLinkModal } from '@/components/ShareInvoiceLinkModal';

export default function DashboardPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'chats' | 'invoices' | 'settings'>('dashboard');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChatClientId, setSelectedChatClientId] = useState<string | undefined>(undefined);

  // Client Directory Pagination state
  const [clientPage, setClientPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(25);

  // Invoices Tab Search & Pagination state
  const dateRange = '01 Apr 2025 – 06 Oct 2026';
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState('');
  const [invoicePage, setInvoicePage] = useState(1);
  const invoicesPerPage: number = 25;

  // Studio Settings state
  const [settings, setSettings] = useState<StudioSettings>(DEFAULT_SETTINGS);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Modals state
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedClientForInvoice, setSelectedClientForInvoice] = useState<ClientRecord | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareModalProps, setShareModalProps] = useState<{ clientName?: string; phone?: string; amount?: number; service?: string }>({});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<ClientRecord | null>(null);
  const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);

  // Load clients, invoices and settings
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

    let loadedClients = getStoredClients();
    let loadedInvoices = getStoredInvoices();

    // Initialize defaults if empty on first load
    if (loadedClients.length === 0) {
      const reset = resetToDefault232Data();
      loadedClients = reset.clients;
      loadedInvoices = reset.invoices;
    }

    setClients(loadedClients);
    setInvoices(loadedInvoices);
    const loadedSettings = getStoredSettings();
    setSettings(loadedSettings);

  }, [router]);

  // Reset pagination on filter or search changes
  useEffect(() => {
    setClientPage(1);
  }, [statusFilter, searchQuery]);

  const handleManualSync = React.useCallback(() => {
    const reset = resetToDefault232Data();
    setClients(reset.clients);
    setInvoices(reset.invoices);
    setSyncStatus('232 Clients & Invoices Synced!');
    setTimeout(() => setSyncStatus(null), 3000);
  }, []);

  const handleOpenChatForClient = React.useCallback((clientId: string) => {
    setSelectedChatClientId(clientId);
    setActiveTab('chats');
  }, []);

  const handleOpenShareModal = React.useCallback((client?: ClientRecord) => {
    if (client) {
      setShareModalProps({
        clientName: client.name,
        phone: client.phone || '',
        amount: client.amount,
        service: client.work
      });
    } else {
      setShareModalProps({});
    }
    setIsShareModalOpen(true);
  }, []);

  const handleLogout = React.useCallback(() => {
    clearAuthSession();
    router.push('/');
  }, [router]);

  const handleSaveSettings = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  }, [settings]);

  // Optimized Metrics calculation with useMemo
  const { totalClientsCount, completedCount, inProgressCount, pendingCount } = React.useMemo(() => {
    let completed = 0;
    let inProgress = 0;
    let pending = 0;

    for (let i = 0; i < clients.length; i++) {
      const st = clients[i].status;
      if (st === 'Completed') completed++;
      else if (st === 'In Progress') inProgress++;
      else pending++;
    }

    return {
      totalClientsCount: clients.length,
      completedCount: completed,
      inProgressCount: inProgress,
      pendingCount: pending
    };
  }, [clients]);

  // Memoized Filtered clients list
  const filteredClients = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return clients.filter((c) => {
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.business.toLowerCase().includes(q) ||
        c.work.toLowerCase().includes(q) ||
        String(c.clientNo).includes(q)
      );
    });
  }, [clients, statusFilter, searchQuery]);

  // Memoized Client pagination calculation
  const totalClientPages = React.useMemo(() => {
    return clientsPerPage === -1 ? 1 : Math.max(1, Math.ceil(filteredClients.length / clientsPerPage));
  }, [filteredClients.length, clientsPerPage]);

  const paginatedClients = React.useMemo(() => {
    return clientsPerPage === -1
      ? filteredClients
      : filteredClients.slice((clientPage - 1) * clientsPerPage, clientPage * clientsPerPage);
  }, [filteredClients, clientPage, clientsPerPage]);

  // Memoized Invoices search and pagination calculation
  const filteredInvoices = React.useMemo(() => {
    const q = invoiceSearchQuery.toLowerCase().trim();
    if (!q) return invoices;
    return invoices.filter((inv) => {
      return (
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.clientName.toLowerCase().includes(q) ||
        inv.clientBusiness.toLowerCase().includes(q) ||
        String(inv.clientNo).includes(q)
      );
    });
  }, [invoices, invoiceSearchQuery]);

  const totalInvoicePages = React.useMemo(() => {
    return invoicesPerPage === -1 ? 1 : Math.max(1, Math.ceil(filteredInvoices.length / invoicesPerPage));
  }, [filteredInvoices.length, invoicesPerPage]);

  const paginatedInvoices = React.useMemo(() => {
    return invoicesPerPage === -1
      ? filteredInvoices
      : filteredInvoices.slice((invoicePage - 1) * invoicesPerPage, invoicePage * invoicesPerPage);
  }, [filteredInvoices, invoicePage, invoicesPerPage]);

  const handleOpenBlankInvoice = React.useCallback(() => {
    setSelectedClientForInvoice(null);
    setSelectedInvoice(null);
    setIsInvoiceModalOpen(true);
  }, []);

  const handleOpenClientInvoice = React.useCallback((client: ClientRecord) => {
    const existing = invoices.find(
      (inv) =>
        inv.clientNo === client.clientNo ||
        inv.id === `inv-${client.clientNo}` ||
        inv.id === `inv-${String(client.clientNo).padStart(3, '0')}` ||
        inv.clientName.toLowerCase() === client.name.toLowerCase()
    );
    if (existing) {
      setSelectedInvoice(existing);
      setSelectedClientForInvoice(null);
    } else {
      setSelectedInvoice(null);
      setSelectedClientForInvoice(client);
    }
    setIsInvoiceModalOpen(true);
  }, [invoices]);

  const confirmDeleteClient = React.useCallback(() => {
    if (!clientToDelete) return;
    const updated = deleteClientRecord(clientToDelete.id);
    setClients(updated);
    setInvoices(getStoredInvoices());
    setClientToDelete(null);
  }, [clientToDelete]);

  const confirmDeleteInvoice = React.useCallback(() => {
    if (!invoiceToDelete) return;
    const updated = deleteStoredInvoice(invoiceToDelete.id);
    setInvoices(updated);
    setInvoiceToDelete(null);
  }, [invoiceToDelete]);

  const handleAutoGenerateAllMissing = React.useCallback(() => {
    const count = autoGenerateMissingInvoices();
    setInvoices(getStoredInvoices());
    setClients(getStoredClients());
    if (count > 0) {
      alert(`⚡ Success! ${count} official tax invoices automatically generated with itemized deliverables & saved to storage.`);
    } else {
      alert(`⚡ All client invoices are already generated and saved in storage!`);
    }
  }, []);

  const handleStatusChange = React.useCallback((client: ClientRecord, newStatus: ClientStatus) => {
    const updated = updateClientRecord(client.id, { status: newStatus });
    setClients(updated);
    setInvoices(getStoredInvoices());
  }, []);

  // Total invoice financials memoized
  const { totalBilled, totalReceived, totalPending } = React.useMemo(() => {
    let billed = 0;
    let received = 0;
    let pending = 0;
    for (let i = 0; i < invoices.length; i++) {
      billed += invoices[i].totalAmount || 0;
      received += invoices[i].paidAmount || 0;
      pending += invoices[i].balance || 0;
    }
    return { totalBilled: billed, totalReceived: received, totalPending: pending };
  }, [invoices]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#0f172a] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm border border-white/20 flex items-center justify-center">
                <Image
                  src="/logo-1.png"
                  alt="MYST ENTERPRISES"
                  width={135}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 text-xs font-bold">
            {/* 1. Dashboard Overview */}
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#f59e0b] text-gray-950 font-black shadow-md'
                  : 'text-gray-300 hover:bg-gray-800/80 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            {/* 2. Client Chats (Centralized Live Messaging) */}
            <button
              onClick={() => { setActiveTab('chats'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition cursor-pointer ${
                activeTab === 'chats'
                  ? 'bg-emerald-600 text-white font-black shadow-md'
                  : 'text-gray-300 hover:bg-gray-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Client Chats</span>
              </div>
              <span className="bg-emerald-400 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                LIVE
              </span>
            </button>

            {/* 3. Client List */}
            <button
              onClick={() => { setActiveTab('clients'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-gray-800 text-white font-black'
                  : 'text-gray-300 hover:bg-gray-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 shrink-0" />
                <span>Client List</span>
              </div>
              <span className="bg-gray-800 text-gray-400 text-[10px] px-2 py-0.5 rounded-full border border-gray-700">
                {clients.length}
              </span>
            </button>

            {/* 4. Add Client */}
            <button
              onClick={() => { setIsAddClientOpen(true); setMobileSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800/80 hover:text-white transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Add Client</span>
            </button>

            {/* 5. Payments / Invoices */}
            <button
              onClick={() => { setActiveTab('invoices'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition cursor-pointer ${
                activeTab === 'invoices'
                  ? 'bg-gray-800 text-white font-black'
                  : 'text-gray-300 hover:bg-gray-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>Invoices &amp; GST</span>
              </div>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full border border-cyan-500/30 font-bold">
                {invoices.length}
              </span>
            </button>

            {/* 6. Settings */}
            <button
              onClick={() => { setActiveTab('settings'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-gray-800 text-white font-black'
                  : 'text-gray-300 hover:bg-gray-800/80 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0 text-gray-400" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom User Profile & Logout */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-900/80 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{settings.ownerName || 'Jasdeep Singh'}</p>
              <p className="text-[10px] text-emerald-400 truncate">Studio Admin</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                {activeTab === 'dashboard' && 'Admin Command Center'}
                {activeTab === 'chats' && 'Client Live Messaging Inbox'}
                {activeTab === 'clients' && 'Client Relationship Directory'}
                {activeTab === 'invoices' && 'Invoicing & Tax Settlement'}
                {activeTab === 'settings' && 'Studio Profile & GST Setup'}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                MYST Enterprises &bull; Creative Agency Administration System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Dropdown */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-xl text-xs font-medium text-gray-700 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{dateRange}</span>
            </div>

            {/* Quick Actions */}
            <button
              onClick={() => handleOpenShareModal()}
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-200 transition cursor-pointer"
              title="Share Self-Fill Invoice Form Link on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Share Form Link</span>
            </button>

            <button
              onClick={() => setActiveTab('chats')}
              className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Chats</span>
            </button>

            <button
              onClick={handleOpenBlankInvoice}
              className="inline-flex items-center gap-1.5 bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-300" />
              <span>New Invoice</span>
            </button>
          </div>
        </header>

        {/* ================= TAB 1: CLIENT CHATS (CENTRALIZED MESSAGING) ================= */}
        {activeTab === 'chats' && (
          <main className="p-4 sm:p-8 flex-1">
            <AdminClientChatCenter
              clients={clients}
              onOpenInvoiceModal={handleOpenClientInvoice}
              selectedClientId={selectedChatClientId}
            />
          </main>
        )}

        {/* ================= TAB 2: INVOICES & GST BILLING ================= */}
        {activeTab === 'invoices' && (
          <main className="p-4 sm:p-8 space-y-6 flex-1">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Total Billed</span>
                <span className="text-2xl sm:text-3xl font-black text-gray-950 mt-1 block">
                  ₹{totalBilled.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-gray-500 mt-1 block">Across {invoices.length} issued invoices</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Received / Settled</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 block">
                  ₹{totalReceived.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-emerald-800 mt-1 block font-bold">100% Verified Bank/UPI</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">Pending Balance</span>
                <span className="text-2xl sm:text-3xl font-black text-rose-600 mt-1 block">
                  ₹{totalPending.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-rose-700 mt-1 block">Follow up via WhatsApp</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Quick Action</span>
                  <span className="text-sm font-bold text-gray-800 mt-1 block">GST Invoice &amp; Link</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleOpenBlankInvoice}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold py-2 rounded-xl transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create</span>
                  </button>
                  <button
                    onClick={() => handleOpenShareModal()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold py-2 rounded-xl border border-emerald-200 transition cursor-pointer"
                    title="Share client self-service invoice link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Link</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Invoices List Table */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-black text-gray-900">
                    Official Tax Invoices
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Generate, print, and track commercial GST tax invoices for clients
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search 232 invoices..."
                      value={invoiceSearchQuery}
                      onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44 sm:w-56"
                    />
                  </div>

                  <button
                    onClick={handleAutoGenerateAllMissing}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-gray-950 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                    title="Auto-generate and save tax invoices for all clients who do not have one yet"
                  >
                    <Lightning className="w-3.5 h-3.5 text-gray-950" />
                    <span>Auto-Sync Invoices</span>
                  </button>

                  <button
                    onClick={handleOpenBlankInvoice}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Generate Invoice</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50/80 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="py-3.5 px-6">Invoice #</th>
                      <th className="py-3.5 px-4">Client / Business</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Due Date</th>
                      <th className="py-3.5 px-4">Total Amount</th>
                      <th className="py-3.5 px-4">Balance</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-gray-50/70 transition">
                        <td className="py-4 px-6 font-mono font-bold text-gray-900">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-900">{inv.clientName}</p>
                          <p className="text-[11px] text-gray-500">{inv.clientBusiness}</p>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {inv.date}
                        </td>
                        <td className="py-4 px-4 text-gray-500">
                          {inv.dueDate}
                        </td>
                        <td className="py-4 px-4 font-mono font-black text-gray-900">
                          ₹{inv.totalAmount?.toLocaleString('en-IN')}
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-rose-600">
                          ₹{inv.balance?.toLocaleString('en-IN')}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            inv.status === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inv.status === 'Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedInvoice(inv);
                                setSelectedClientForInvoice(null);
                                setIsInvoiceModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition cursor-pointer"
                              title="View & Print Invoice"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>View / Print</span>
                            </button>

                            {inv.clientPhone && (
                              <a
                                href={`https://wa.me/${inv.clientPhone.replace(/[^0-9]/g, '')}?text=Dear%20${encodeURIComponent(inv.clientName)},%20please%20find%20attached%20Invoice%20${inv.invoiceNumber}%20for%20Rs%20${inv.totalAmount}%20from%20MYST%20Enterprises.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition"
                                title="Share Invoice on WhatsApp"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>
                            )}

                            <button
                              onClick={() => setInvoiceToDelete(inv)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-900 rounded-lg transition cursor-pointer"
                              title={`Delete Invoice ${inv.invoiceNumber}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredInvoices.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                    <p className="text-sm">No invoices found matching &ldquo;{invoiceSearchQuery}&rdquo;.</p>
                  </div>
                )}
              </div>

              {/* Invoices Table Pagination Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-3">
                <div className="flex items-center gap-2">
                  <span>
                    Showing{' '}
                    <strong className="text-gray-900">
                      {filteredInvoices.length > 0 ? (invoicePage - 1) * invoicesPerPage + 1 : 0}
                    </strong>
                    {' '}to{' '}
                    <strong className="text-gray-900">
                      {Math.min(invoicePage * invoicesPerPage, filteredInvoices.length)}
                    </strong>
                    {' '}of{' '}
                    <strong className="text-gray-900">{filteredInvoices.length}</strong> invoices
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={invoicePage <= 1}
                    onClick={() => setInvoicePage((p: number) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <span className="px-3 py-1.5 font-bold text-gray-900 bg-white rounded-lg border border-gray-200">
                    Page {invoicePage} of {totalInvoicePages}
                  </span>

                  <button
                    disabled={invoicePage >= totalInvoicePages}
                    onClick={() => setInvoicePage((p: number) => Math.min(totalInvoicePages, p + 1))}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition cursor-pointer flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ================= TAB 3: SETTINGS ================= */}
        {activeTab === 'settings' && (
          <main className="p-4 sm:p-8 space-y-6 max-w-4xl flex-1">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 sm:p-8">
              <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-black text-gray-900">
                    Studio Profile &amp; Billing Setup
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    These details appear automatically on all client invoices, receipts, and payment links.
                  </p>
                </div>

                {settingsSaved && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl animate-bounce">
                    <Check className="w-4 h-4" />
                    Settings Saved!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Studio / Business Name
                    </label>
                    <input
                      type="text"
                      value={settings.studioName}
                      onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Tagline / Motto
                    </label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Owner / Signatory Name
                    </label>
                    <input
                      type="text"
                      value={settings.ownerName}
                      onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      GSTIN (Tax Identification Number)
                    </label>
                    <input
                      type="text"
                      value={settings.gstin}
                      onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Official Contact Phone
                    </label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Bank & Payment Details */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-4">
                    Bank &amp; Digital Payment Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        UPI ID (Google Pay / PhonePe)
                      </label>
                      <input
                        type="text"
                        value={settings.upiId}
                        onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={settings.bankName}
                        onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={settings.accountNumber}
                        onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        value={settings.ifscCode}
                        onChange={(e) => setSettings({ ...settings, ifscCode: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Physical Studio / Billing Address
                  </label>
                  <textarea
                    rows={2}
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#047857] text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition cursor-pointer"
                  >
                    <SaveIcon className="w-3.5 h-3.5" />
                    <span>Save Studio Settings</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Database & Directory Sync Card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg font-black text-gray-900">
                    232 Clients &amp; Invoices Directory Sync
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Forces complete synchronization of all 232 client projects and matching commercial tax invoices.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {syncStatus && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 animate-pulse">
                      {syncStatus}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleManualSync}
                    className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync 232 Clients</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ================= TAB 4 & 5: DASHBOARD OR CLIENT LIST ================= */}
        {(activeTab === 'dashboard' || activeTab === 'clients') && (
          <main className="p-4 sm:p-8 space-y-8 flex-1">
            {/* 4 KPI SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: Total Clients (Blue) */}
              <div
                onClick={() => setStatusFilter('All')}
                className="bg-white p-6 rounded-3xl border border-blue-100 shadow-xs hover:shadow-md transition cursor-pointer"
              >
                <div className="text-center">
                  <span className="text-4xl sm:text-5xl font-black text-[#2563eb] block tracking-tight">
                    {totalClientsCount}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-600 mt-2 block">
                    Total Clients
                  </span>
                </div>
              </div>

              {/* Card 2: Completed (Green) */}
              <div
                onClick={() => setStatusFilter('Completed')}
                className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs hover:shadow-md transition cursor-pointer"
              >
                <div className="text-center">
                  <span className="text-4xl sm:text-5xl font-black text-[#10b981] block tracking-tight">
                    {completedCount}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-600 mt-2 block">
                    Completed Works
                  </span>
                </div>
              </div>

              {/* Card 3: In Progress (Orange) */}
              <div
                onClick={() => setStatusFilter('In Progress')}
                className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs hover:shadow-md transition cursor-pointer"
              >
                <div className="text-center">
                  <span className="text-4xl sm:text-5xl font-black text-[#f59e0b] block tracking-tight">
                    {inProgressCount}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-600 mt-2 block">
                    In Progress
                  </span>
                </div>
              </div>

              {/* Card 4: Payment Pending (Red/Pink) */}
              <div
                onClick={() => setStatusFilter('Payment Pending')}
                className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs hover:shadow-md transition cursor-pointer"
              >
                <div className="text-center">
                  <span className="text-4xl sm:text-5xl font-black text-[#ef4444] block tracking-tight">
                    {pendingCount}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-600 mt-2 block">
                    Payment Pending
                  </span>
                </div>
              </div>
            </div>

            {/* ================= RECENT CLIENTS TABLE ================= */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
              {/* Table Header & Controls */}
              <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-black text-gray-900">
                    {activeTab === 'clients' ? 'Client Directory' : 'Recent Client Projects'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Click View for complete project files, Chat for live conversation, or Invoice to bill
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Status Filter Tabs */}
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                    {['All', 'Completed', 'In Progress', 'Payment Pending'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                          statusFilter === st
                            ? 'bg-white text-gray-950 shadow-xs'
                            : 'text-gray-600 hover:text-gray-950'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {/* Search Box */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      id="dashboard-search-input"
                      type="text"
                      placeholder="Search clients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44"
                    />
                  </div>

                  {/* Add Client Button */}
                  <button
                    onClick={() => setIsAddClientOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Client</span>
                  </button>
                </div>
              </div>

              {/* Table Body */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50/80 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="py-3.5 px-6">Client No.</th>
                      <th className="py-3.5 px-4">Client Name</th>
                      <th className="py-3.5 px-4">Business</th>
                      <th className="py-3.5 px-4">Work Delivered</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedClients.map((client) => {
                      const statusStyles =
                        client.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : client.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200';

                      return (
                        <tr
                          key={client.id}
                          className="hover:bg-gray-50/70 transition group"
                        >
                          <td className="py-4 px-6 font-mono font-bold text-gray-900">
                            #{client.clientNo}
                          </td>

                          <td className="py-4 px-4 font-bold text-gray-900">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-black text-gray-700 shrink-0">
                                {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <span>{client.name}</span>
                            </div>
                          </td>

                          <td className="py-4 px-4 font-medium text-gray-800">
                            {client.business}
                          </td>

                          <td className="py-4 px-4 text-gray-600 max-w-xs truncate">
                            {client.work}
                          </td>

                          <td className="py-4 px-4 font-mono font-black text-gray-900 whitespace-nowrap">
                            ₹{client.amount?.toLocaleString('en-IN')}
                          </td>

                          <td className="py-4 px-4">
                            <button
                              onClick={() => {
                                const nextStatus: ClientStatus =
                                  client.status === 'Completed'
                                    ? 'In Progress'
                                    : client.status === 'In Progress'
                                    ? 'Payment Pending'
                                    : 'Completed';
                                handleStatusChange(client, nextStatus);
                              }}
                              title="Click to toggle status"
                              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border transition hover:opacity-80 cursor-pointer ${statusStyles}`}
                            >
                              {client.status}
                            </button>
                          </td>

                          <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                            {client.date}
                          </td>

                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Blue View button */}
                              <Link
                                href={`/dashboard/client/${client.id}`}
                                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs transition inline-flex items-center gap-1"
                              >
                                <span>View</span>
                              </Link>

                              {/* Quick Chat icon button - opens chats tab directly with this client */}
                              <button
                                onClick={() => handleOpenChatForClient(client.id)}
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition cursor-pointer"
                                title="Open in Client Chats"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>

                              {/* Quick Auto-Gen / View Invoice button */}
                              <button
                                onClick={() => handleOpenClientInvoice(client)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold transition cursor-pointer"
                                title="Auto-Generate & Save Official Tax Invoice for this Client"
                              >
                                <Lightning className="w-3 h-3 text-amber-600" />
                                <span>Invoice</span>
                              </button>

                              {/* Share Invoice Link button */}
                              <button
                                onClick={() => handleOpenShareModal(client)}
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition cursor-pointer"
                                title="Share Invoice Link on WhatsApp for this Client"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Client button */}
                              <button
                                onClick={() => setClientToDelete(client)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-900 rounded-lg transition cursor-pointer"
                                title={`Delete Client #${client.clientNo} (${client.name})`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredClients.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                    <p className="text-sm">No clients found matching the query.</p>
                  </div>
                )}
              </div>

              {/* Table Footer with Pagination */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-3">
                <div className="flex flex-wrap items-center gap-4">
                  <span>
                    Showing{' '}
                    <strong className="text-gray-900">
                      {filteredClients.length > 0 ? (clientPage - 1) * clientsPerPage + 1 : 0}
                    </strong>
                    {' '}to{' '}
                    <strong className="text-gray-900">
                      {Math.min(clientPage * clientsPerPage, filteredClients.length)}
                    </strong>
                    {' '}of{' '}
                    <strong className="text-gray-900">{filteredClients.length}</strong> client projects
                  </span>

                  <div className="flex items-center gap-1.5 text-gray-500">
                    <span>Show:</span>
                    {[25, 50, 100].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setClientsPerPage(num);
                          setClientPage(1);
                        }}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition ${
                          clientsPerPage === num
                            ? 'bg-emerald-800 text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setClientsPerPage(-1);
                        setClientPage(1);
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition ${
                        clientsPerPage === -1
                          ? 'bg-emerald-800 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={clientPage <= 1 || clientsPerPage === -1}
                    onClick={() => setClientPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <span className="px-3 py-1.5 font-bold text-gray-900 bg-white rounded-lg border border-gray-200">
                    Page {clientPage} of {totalClientPages}
                  </span>

                  <button
                    disabled={clientPage >= totalClientPages || clientsPerPage === -1}
                    onClick={() => setClientPage((p) => Math.min(totalClientPages, p + 1))}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition cursor-pointer flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* ================= MODALS ================= */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        client={selectedClientForInvoice}
        existingInvoice={selectedInvoice}
        onInvoiceSaved={() => {
          setClients(getStoredClients());
          setInvoices(getStoredInvoices());
        }}
      />

      <AddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onClientAdded={() => {
          setClients(getStoredClients());
          setInvoices(getStoredInvoices());
        }}
      />

      <ShareInvoiceLinkModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        defaultClientName={shareModalProps.clientName}
        defaultPhone={shareModalProps.phone}
        defaultAmount={shareModalProps.amount}
        defaultService={shareModalProps.service}
      />

      {/* ================= DELETE CLIENT CONFIRMATION MODAL ================= */}
      {clientToDelete && (
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
                  Client #{clientToDelete.clientNo} • {clientToDelete.business}
                </p>
              </div>
            </div>

            <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 text-xs text-rose-900 space-y-1.5">
              <p className="font-bold">
                Are you sure you want to delete <span className="underline">{clientToDelete.name}</span>?
              </p>
              <p className="text-[11px] text-rose-700 leading-relaxed">
                This will permanently remove this client from your directory, clear associated tax invoices, and delete their conversation history from the system.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteClient}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Client</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE INVOICE CONFIRMATION MODAL ================= */}
      {invoiceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-black text-gray-900">
                  Delete Tax Invoice?
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {invoiceToDelete.invoiceNumber} • {invoiceToDelete.clientName}
                </p>
              </div>
            </div>

            <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 text-xs text-rose-900 space-y-1.5">
              <p className="font-bold">
                Delete Invoice for {invoiceToDelete.clientName} (₹{invoiceToDelete.totalAmount?.toLocaleString('en-IN')})?
              </p>
              <p className="text-[11px] text-rose-700 leading-relaxed">
                This will remove this tax invoice record from your billing books.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setInvoiceToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteInvoice}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
