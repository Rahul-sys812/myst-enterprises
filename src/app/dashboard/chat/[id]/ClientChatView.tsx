'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  FiArrowLeft as ArrowLeft,
  FiSearch as Search,
  FiMoreVertical as MoreVertical,
  FiPaperclip as Paperclip,
  FiLock as Lock,
  FiEye as Eye
} from 'react-icons/fi';
import { FaPhoneAlt as Phone, FaPaperPlane as Send, FaCoffee as Coffee } from 'react-icons/fa';
import { BsEmojiSmile as Smile, BsCheckAll as CheckCheck } from 'react-icons/bs';
import { SHARMA_CAFE_CHAT_MESSAGES } from '@/data/mockData';
import { ChatMessage } from '@/types';
import { getStoredClients, getAuthSession } from '@/lib/storage';

export default function ClientChatView() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;

  const [messages, setMessages] = useState<ChatMessage[]>(SHARMA_CAFE_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [clientName, setClientName] = useState('Rahul Sharma');
  const [businessName, setBusinessName] = useState('Sharma Cafe');

  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    const found = clients.find(c => c.id === clientId || String(c.clientNo) === clientId);
    if (found) {
      setClientName(found.name);
      setBusinessName(found.business);
    }
  }, [clientId, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'agency',
      senderName: 'MYST Enterprises',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'client',
        senderName: clientName,
        text: 'Thanks! Checked the latest update. Looks super sleek and ready for final export.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 2000);
  };

  return (
    <div className="h-screen bg-[#e5ddd5] flex flex-col justify-between overflow-hidden">
      {/* CHAT HEADER */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-2xs z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/client/${clientId}`}
            className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
            title="Back to Client Details"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="w-10 h-10 rounded-full bg-[#4a3427] text-white flex items-center justify-center font-bold text-sm shadow-inner shrink-0">
            {clientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>

          <div>
            <h2 className="font-serif font-bold text-gray-900 text-sm sm:text-base leading-tight">
              {clientName}
            </h2>
            <p className="text-xs text-gray-500">
              {businessName} &bull; <span className="text-emerald-700 font-semibold">Online</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`/dashboard/invoice/${clientId}`}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#b45309] hover:bg-[#92400e] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs transition"
          >
            <Lock className="w-3 h-3" />
            <span>Invoice</span>
          </Link>

          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <Search className="w-4 h-4" />
          </button>
          <a
            href="tel:+919667665892"
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* CHAT THREAD */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#f0f2f5]/90">
        <div className="text-center my-2">
          <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[11px] font-semibold text-gray-500 shadow-2xs">
            12 Apr 2025 &bull; Project Kickoff
          </span>
        </div>

        {messages.map((msg) => {
          const isAgency = msg.sender === 'agency';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAgency ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl shadow-xs text-xs sm:text-sm ${
                  isAgency
                    ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-xs'
                    : 'bg-white text-gray-900 rounded-tl-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className={`text-[11px] font-bold ${isAgency ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {msg.senderName}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {msg.timestamp}
                  </span>
                </div>

                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {msg.attachment?.type === 'logo-variants' && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {msg.attachment.variants?.map((v, i) => (
                      <div
                        key={i}
                        className={`${v.bg} p-2.5 rounded-xl text-center border border-black/10 flex flex-col items-center justify-center min-h-[70px] shadow-sm`}
                      >
                        <Coffee className={`w-5 h-5 ${v.color} mb-1`} />
                        <span className={`text-[10px] font-serif font-bold ${v.color} leading-tight`}>
                          {v.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {msg.attachment?.type === 'image' && (
                  <div className="mt-2.5 bg-black/5 p-2 rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                        <Image
                          src={msg.attachment.url || '/images/sharma-cafe-logo.jpg'}
                          alt={msg.attachment.name || 'Attachment'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-semibold text-xs text-gray-800 truncate">
                          {msg.attachment.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {msg.attachment.size} &bull; Image File
                        </p>
                      </div>
                    </div>

                    <a
                      href={msg.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-lg shadow-2xs hover:bg-gray-100 text-gray-700"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {isAgency && (
                  <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-emerald-700">
                    <CheckCheck className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>

      {/* CHAT INPUT BAR */}
      <footer className="bg-white border-t border-gray-200 p-3 flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <Smile className="w-5 h-5" />
        </button>

        <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />

          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center shadow transition shrink-0"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </footer>
    </div>
  );
}
