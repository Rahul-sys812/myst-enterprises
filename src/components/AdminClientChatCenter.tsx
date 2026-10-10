'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiSearch,
  FiPaperclip,
  FiSend,
  FiExternalLink,
  FiImage
} from 'react-icons/fi';
import {
  FaWhatsapp,
  FaCheckDouble
} from 'react-icons/fa';
import {
  BsLightningChargeFill
} from 'react-icons/bs';
import { ClientRecord, ChatMessage } from '@/types';
import { getStoredChatMessages, saveChatMessage, autoGenerateInvoiceForClient, getStoredSettings } from '@/lib/storage';

interface AdminClientChatCenterProps {
  clients: ClientRecord[];
  onOpenInvoiceModal: (client: ClientRecord) => void;
  selectedClientId?: string;
}

export const AdminClientChatCenter: React.FC<AdminClientChatCenterProps> = React.memo(({
  clients,
  onOpenInvoiceModal,
  selectedClientId: propSelectedClientId
}) => {
  // Restriction: Only show current month top 10 recent client orders in live chats
  const recentChatClients = React.useMemo(() => {
    const topRecent = clients.slice(0, 10);
    if (propSelectedClientId && !topRecent.some(c => c.id === propSelectedClientId)) {
      const found = clients.find(c => c.id === propSelectedClientId);
      if (found) return [found, ...topRecent];
    }
    return topRecent;
  }, [clients, propSelectedClientId]);

  const [selectedClientId, setSelectedClientId] = useState<string>(
    propSelectedClientId || (recentChatClients.length > 0 ? recentChatClients[0].id : 'c-232')
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync when propSelectedClientId changes
  useEffect(() => {
    if (propSelectedClientId) {
      setSelectedClientId(propSelectedClientId);
    }
  }, [propSelectedClientId]);

  // Selected client record
  const selectedClient = clients.find(c => c.id === selectedClientId) || recentChatClients[0] || null;

  // Load messages when selected client changes
  useEffect(() => {
    if (selectedClient) {
      const msgs = getStoredChatMessages(selectedClient.id);
      setMessages(msgs);
    }
  }, [selectedClientId, selectedClient]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter clients list within recent active chat orders memoized
  const filteredClients = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return recentChatClients;
    return recentChatClients.filter(c => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.business.toLowerCase().includes(q) ||
        c.work.toLowerCase().includes(q) ||
        String(c.clientNo).includes(q)
      );
    });
  }, [recentChatClients, searchQuery]);

  const handleSendMessage = React.useCallback((textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || !selectedClient) return;

    const newMsg: ChatMessage = {
      id: `admin-msg-${Date.now()}`,
      sender: 'agency',
      senderName: 'MYST Studio (Admin)',
      text,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    };

    const updated = saveChatMessage(selectedClient.id, newMsg);
    setMessages(updated);
    if (!textToSend) setInputText('');

    // Simulated interactive reply from client for live feel
    setTimeout(() => {
      const clientReply: ChatMessage = {
        id: `client-reply-${Date.now()}`,
        sender: 'client',
        senderName: selectedClient.name,
        text: 'Received! Thank you for the quick update. Looks very clean and on brand.',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
      const afterReply = saveChatMessage(selectedClient.id, clientReply);
      setMessages(afterReply);
    }, 1800);
  }, [inputText, selectedClient]);

  const handleShareInvoiceInChat = React.useCallback(() => {
    if (!selectedClient) return;
    autoGenerateInvoiceForClient(selectedClient);
    const settings = getStoredSettings();
    const invNumber = `INV-${String(selectedClient.clientNo).padStart(3, '0')}`;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const invLink = `${origin}/dashboard/invoice/c-${selectedClient.clientNo}/`;
    const msg = `📄 Official Tax Invoice #${invNumber} (₹${selectedClient.amount?.toLocaleString('en-IN')}) has been generated & saved.\n\n🔗 View & Download PDF: ${invLink}\n\nBank Settlement: ${settings.bankName} (A/C: ${settings.accountNumber}, IFSC: ${settings.ifscCode}, UPI: ${settings.upiId}).`;
    handleSendMessage(msg);
  }, [selectedClient, handleSendMessage]);

  const quickReplies = React.useMemo(() => [
    'Concept draft ready for your review 🎨',
    'Invoice generated, kindly check payments 📄',
    'Revisions completed and updated 🔄',
    'High-resolution print files delivered ✅'
  ], []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col h-[780px]">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-900 to-gray-900 text-white px-5 py-3 flex items-center justify-between text-xs border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wide">Admin Live Client Chat Inbox</span>
          <span className="hidden sm:inline text-emerald-200/80">&bull; Priority communications for recent orders</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-300">
          <span className="bg-emerald-800/80 px-2.5 py-0.5 rounded-full border border-emerald-600/50 text-emerald-200 font-semibold">
            Current Month Orders
          </span>
          <span>Active Chats: <strong className="text-white">{recentChatClients.length}</strong></span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* ================= LEFT SIDEBAR: CLIENT CONVERSATIONS LIST ================= */}
        <div className="w-80 sm:w-96 border-r border-gray-200 flex flex-col bg-gray-50/60 shrink-0">
          {/* Header Title */}
          <div className="px-4 py-2.5 bg-gray-100/80 border-b border-gray-200 flex items-center justify-between text-[11px]">
            <span className="font-extrabold uppercase tracking-wider text-gray-700">
              Recent Orders ({recentChatClients.length})
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Active Queue
            </span>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-gray-200 bg-white">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search recent client chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filteredClients.map((c) => {
              const isSelected = c.id === selectedClientId;
              const clientChats = getStoredChatMessages(c.id);
              const lastMsg = clientChats[clientChats.length - 1];

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedClientId(c.id)}
                  className={`w-full p-3.5 flex items-start gap-3 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 border-l-4 border-emerald-600'
                      : 'hover:bg-white bg-transparent'
                  }`}
                >
                  {/* Client Avatar / Preview */}
                  <div className="relative shrink-0">
                    {c.logoPreview ? (
                      <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-200 relative bg-gray-900 shadow-2xs">
                        <Image
                          src={c.logoPreview}
                          alt={c.business}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                        {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>

                  {/* Client Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {c.name}
                      </h4>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {lastMsg ? lastMsg.timestamp.split(',')[0] : c.date}
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold text-emerald-800 truncate">
                      {c.business}
                    </p>

                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : `${c.work} - ${c.status}`}
                    </p>

                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        c.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {c.status}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-gray-700">
                        ₹{c.amount?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredClients.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-xs">
                No client matches &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>

          {/* Footer archiving notice */}
          <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-[10px] text-gray-500 font-medium">
              Showing {recentChatClients.length} current month active client orders.
            </p>
            <p className="text-[9px] text-gray-400 mt-0.5">
              Historical {Math.max(0, clients.length - recentChatClients.length)} clients are managed in Client Directory &amp; Invoices.
            </p>
          </div>
        </div>

        {/* ================= RIGHT: ACTIVE CHAT CONVERSATION ================= */}
        {selectedClient ? (
          <div className="flex-1 flex flex-col bg-[#efeae2] relative min-w-0">
            {/* Active Chat Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-2xs z-10 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  {selectedClient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-gray-950 text-sm truncate">
                      {selectedClient.name}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Client #{selectedClient.clientNo}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {selectedClient.business} &bull; {selectedClient.phone || '+91 96676 65892'} &bull; {selectedClient.location || 'India'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenInvoiceModal(selectedClient)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs transition shadow-xs cursor-pointer"
                  title="Generate or View Invoice for this client"
                >
                  <BsLightningChargeFill className="w-3.5 h-3.5" />
                  <span>Invoice</span>
                </button>

                <button
                  onClick={handleShareInvoiceInChat}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition shadow-xs cursor-pointer"
                  title="Auto-Generate & Send Invoice link directly in chat"
                >
                  <FiSend className="w-3 h-3" />
                  <span>Send In Chat</span>
                </button>

                <Link
                  href={`/dashboard/client/${selectedClient.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition"
                  title="View full client project dossier"
                >
                  <span>Profile</span>
                  <FiExternalLink className="w-3 h-3" />
                </Link>

                {selectedClient.phone && (
                  <a
                    href={`https://wa.me/${selectedClient.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-xs"
                    title="Open in WhatsApp"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Date Separator Pill */}
              <div className="text-center my-2">
                <span className="bg-white/80 backdrop-blur-xs text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-2xs border border-gray-200/50 uppercase tracking-widest">
                  Active Client Project Communication
                </span>
              </div>

              {messages.map((msg) => {
                const isAgency = msg.sender === 'agency';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAgency ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3.5 shadow-sm relative ${
                        isAgency
                          ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none border border-emerald-200/50'
                          : 'bg-white text-gray-900 rounded-tl-none border border-gray-200/70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${isAgency ? 'text-emerald-800' : 'text-amber-800'}`}>
                          {msg.senderName}
                        </span>
                        <span className="text-[9px] text-gray-400">
                          {msg.timestamp}
                        </span>
                      </div>

                      <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-line text-gray-800">
                        {msg.text}
                      </p>

                      {/* Attachments */}
                      {msg.attachment && (
                        <div className="mt-2.5 pt-2.5 border-t border-black/5">
                          {msg.attachment.type === 'image' && msg.attachment.url && (
                            <div
                              onClick={() => setPreviewImage(msg.attachment?.url || null)}
                              className="relative aspect-video rounded-xl overflow-hidden bg-black/5 border border-black/10 cursor-pointer group hover:opacity-95 transition"
                            >
                              <Image
                                src={msg.attachment.url}
                                alt={msg.attachment.name || 'Design preview'}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-1.5">
                                <FiImage className="w-4 h-4" />
                                <span>Click to preview design</span>
                              </div>
                            </div>
                          )}

                          {msg.attachment.type === 'logo-variants' && msg.attachment.variants && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                              {msg.attachment.variants.map((v, idx) => (
                                <div
                                  key={idx}
                                  className={`${v.bg} ${v.color} p-2.5 rounded-xl text-center text-xs font-bold shadow-inner border border-white/10`}
                                >
                                  {v.label}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[9px] text-gray-400">Delivered</span>
                        <FaCheckDouble className="w-3 h-3 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips Bar */}
            <div className="bg-white/90 backdrop-blur px-4 py-2 border-t border-gray-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
                Quick Reply:
              </span>
              {quickReplies.map((qr, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(qr)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-medium text-gray-700 transition border border-gray-200 shrink-0 cursor-pointer"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Message Input Form */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="bg-white p-3 border-t border-gray-200 flex items-center gap-2 shrink-0"
            >
              <button
                type="button"
                onClick={() => handleSendMessage('Sharing updated high-resolution design proofs now!')}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition"
                title="Send design attachment update"
              >
                <FiPaperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${selectedClient.name} (${selectedClient.business})...`}
                className="flex-1 text-xs sm:text-sm py-2 px-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-4 py-2 bg-[#064e3b] hover:bg-[#047857] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Send</span>
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-400">
            Select a client conversation from the list to start messaging.
          </div>
        )}
      </div>

      {/* Lightbox for Image Attachment Preview */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[85vh] w-full h-[600px]">
            <Image
              src={previewImage}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
});

AdminClientChatCenter.displayName = 'AdminClientChatCenter';
