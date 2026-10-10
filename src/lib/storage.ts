import { ClientRecord, Invoice, ChatMessage } from '@/types';
import { INITIAL_CLIENTS, INITIAL_INVOICES, ALL_CLIENT_CHATS, SHARMA_CAFE_CHAT_MESSAGES } from '@/data/mockData';

const CLIENTS_KEY = 'myst_clients_data';
const INVOICES_KEY = 'myst_invoices_data';
const CHATS_KEY = 'myst_chats_data';
const AUTH_KEY = 'myst_auth_session';

export interface StudioSettings {
  studioName: string;
  tagline: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  gstin: string;
  upiId: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

const SETTINGS_KEY = 'myst_studio_settings';

export const DEFAULT_SETTINGS: StudioSettings = {
  studioName: 'MYST ENTERPRISES',
  tagline: 'Creative Design Solutions For Every Business',
  ownerName: 'Jasdeep Singh',
  email: 'contact@mystenterprises.in',
  phone: '+91 96676 65892',
  address: 'Rattakhera (326) Sirsa , Haryana ,India',
  gstin: '',
  upiId: 'yespay.bizsbiz266901@yesbankltd',
  bankName: 'YES BANK',
  accountNumber: '118020700000360',
  ifscCode: 'YESB0001180'
};

const DATA_VERSION_KEY = 'myst_data_version_v6_organic_payments';
const CURRENT_VERSION = 'v6_organic_payments';

export const getStoredSettings = (): StudioSettings => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  const version = localStorage.getItem(DATA_VERSION_KEY);
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored || version !== CURRENT_VERSION) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  try {
    const parsed = JSON.parse(stored);
    if (!parsed.ownerName || parsed.ownerName === 'Amit Sharma' || !parsed.bankName || parsed.bankName === 'HDFC Bank Ltd' || parsed.accountNumber === '50200088992211' || !parsed.address.includes('Sirsa')) {
      const merged = { ...parsed, ...DEFAULT_SETTINGS, ownerName: 'Jasdeep Singh' };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveStoredSettings = (settings: StudioSettings): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const resetToDefault232Data = (): { clients: ClientRecord[]; invoices: Invoice[] } => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(INITIAL_CLIENTS));
    localStorage.setItem(INVOICES_KEY, JSON.stringify(INITIAL_INVOICES));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
  }
  return { clients: INITIAL_CLIENTS, invoices: INITIAL_INVOICES };
};

export const getStoredClients = (): ClientRecord[] => {
  if (typeof window === 'undefined') return INITIAL_CLIENTS;
  const version = localStorage.getItem(DATA_VERSION_KEY);
  const stored = localStorage.getItem(CLIENTS_KEY);

  // If no data or older version or data has less than 232 clients, force update to full 232 clients
  if (!stored || version !== CURRENT_VERSION) {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(INITIAL_CLIENTS));
    localStorage.setItem(INVOICES_KEY, JSON.stringify(INITIAL_INVOICES));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
    return INITIAL_CLIENTS;
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(INITIAL_CLIENTS));
      localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
      return INITIAL_CLIENTS;
    }
    return parsed;
  } catch {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(INITIAL_CLIENTS));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
    return INITIAL_CLIENTS;
  }
};

export const saveClients = (clients: ClientRecord[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
};

export const addClientRecord = (client: Omit<ClientRecord, 'id' | 'clientNo'>, autoCreateInvoice: boolean = true): ClientRecord => {
  const current = getStoredClients();
  const maxNo = current.reduce((max, c) => Math.max(max, c.clientNo), 232);
  const newClientNo = maxNo + 1;
  const newClient: ClientRecord = {
    ...client,
    id: `c-${newClientNo}`,
    clientNo: newClientNo,
    date: client.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  };
  const updated = [newClient, ...current];
  saveClients(updated);

  if (autoCreateInvoice) {
    autoGenerateInvoiceForClient(newClient);
  }

  return newClient;
};

export const updateClientRecord = (id: string, updates: Partial<ClientRecord>): ClientRecord[] => {
  const current = getStoredClients();
  const updated = current.map(c => c.id === id ? { ...c, ...updates } : c);
  saveClients(updated);



  // Synchronize matching invoice in storage if client amount, status, or details changed
  try {
    const target = updated.find(c => c.id === id);
    if (target && typeof window !== 'undefined') {
      const invoices = getStoredInvoices();
      const invIndex = invoices.findIndex(
        i => i.clientNo === target.clientNo || i.id === `inv-${target.clientNo}` || i.id === `inv-${String(target.clientNo).padStart(3, '0')}`
      );
      if (invIndex >= 0) {
        const inv = invoices[invIndex];
        const isCompleted = target.status === 'Completed';
        const updatedInvoice: Invoice = {
          ...inv,
          clientName: target.name,
          clientBusiness: target.business,
          totalAmount: target.amount,
          paidAmount: isCompleted ? target.amount : (target.paidAmount ?? inv.paidAmount),
          balance: isCompleted ? 0 : (target.balance ?? Math.max(0, target.amount - (target.paidAmount || 0))),
          status: isCompleted ? 'Paid' : target.status === 'In Progress' ? 'Partial' : 'Pending'
        };
        saveInvoice(updatedInvoice);
      }
    }
  } catch (err) {
    console.error('Failed to sync invoice on client update:', err);
  }

  return updated;
};

export const deleteClientRecord = (id: string): ClientRecord[] => {
  const current = getStoredClients();
  const target = current.find(c => c.id === id || String(c.clientNo) === id);
  const updated = current.filter(c => c.id !== id && String(c.clientNo) !== id);
  saveClients(updated);



  // Synchronously clean up corresponding invoice if exists
  if (target && typeof window !== 'undefined') {
    try {
      const invoices = getStoredInvoices();
      const updatedInvoices = invoices.filter(
        i =>
          i.clientNo !== target.clientNo &&
          i.id !== `inv-${target.clientNo}` &&
          i.id !== `inv-${String(target.clientNo).padStart(3, '0')}` &&
          i.clientName.toLowerCase() !== target.name.toLowerCase()
      );
      localStorage.setItem(INVOICES_KEY, JSON.stringify(updatedInvoices));

      // Clean up chats if any
      const storedChats = localStorage.getItem(CHATS_KEY);
      if (storedChats) {
        const chatsObj = JSON.parse(storedChats);
        delete chatsObj[target.id];
        delete chatsObj[`c-${target.clientNo}`];
        delete chatsObj[String(target.clientNo)];
        localStorage.setItem(CHATS_KEY, JSON.stringify(chatsObj));
      }
    } catch (err) {
      console.error('Failed to clean up client records on delete:', err);
    }
  }

  return updated;
};

export const deleteStoredInvoice = (invoiceId: string): Invoice[] => {
  const current = getStoredInvoices();
  const updated = current.filter(i => i.id !== invoiceId && i.invoiceNumber !== invoiceId);
  if (typeof window !== 'undefined') {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(updated));
  }
  return updated;
};

export const getStoredInvoices = (): Invoice[] => {
  if (typeof window === 'undefined') return INITIAL_INVOICES;
  const version = localStorage.getItem(DATA_VERSION_KEY);
  const stored = localStorage.getItem(INVOICES_KEY);

  if (!stored || version !== CURRENT_VERSION) {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(INITIAL_INVOICES));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
    return INITIAL_INVOICES;
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(INVOICES_KEY, JSON.stringify(INITIAL_INVOICES));
      localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
      return INITIAL_INVOICES;
    }
    return parsed;
  } catch {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(INITIAL_INVOICES));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
    return INITIAL_INVOICES;
  }
};

export const saveInvoice = (invoice: Invoice): Invoice[] => {
  if (typeof window === 'undefined') return [];
  const current = getStoredInvoices();
  const exists = current.findIndex(i =>
    i.id === invoice.id ||
    i.invoiceNumber.toLowerCase() === invoice.invoiceNumber.toLowerCase() ||
    (i.clientNo !== undefined && invoice.clientNo !== undefined && i.clientNo === invoice.clientNo)
  );
  let updated: Invoice[];
  if (exists >= 0) {
    updated = current.map((i, idx) => idx === exists ? invoice : i);
  } else {
    updated = [invoice, ...current];
  }
  localStorage.setItem(INVOICES_KEY, JSON.stringify(updated));

  return updated;
};

export const autoGenerateInvoiceForClient = (client: ClientRecord): Invoice => {
  const settings = getStoredSettings();
  const invNumber = `INV-${String(client.clientNo).padStart(3, '0')}`;
  const invId = `inv-${String(client.clientNo).padStart(3, '0')}`;
  const paidAmount = client.paidAmount ?? (client.status === 'Completed' ? client.amount : 0);
  const balance = client.balance ?? (client.amount - paidAmount);

  let items = [];
  const rawParts = client.workItems && client.workItems.length > 0
    ? client.workItems
    : client.work
      ? client.work.split(/\s*\+\s*|\s*,\s*|\s*&\s*/).filter(Boolean)
      : [];

  if (rawParts.length > 1) {
    const splitRate = Math.round((client.amount || 0) / rawParts.length);
    items = rawParts.map((part, idx) => {
      const isLast = idx === rawParts.length - 1;
      const lineAmt = isLast ? (client.amount || 0) - splitRate * (rawParts.length - 1) : splitRate;
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
    });
  } else if (client.amount && client.amount > 0) {
    const part1Rate = Math.round(client.amount * 0.65);
    const part2Rate = client.amount - part1Rate;
    items = [
      {
        id: '1',
        description: client.work ? `${client.work} - Conceptualization & Creative Layout` : 'Brand Identity & Vector Design Deliverables',
        quantity: 1,
        rate: part1Rate,
        amount: part1Rate
      },
      {
        id: '2',
        description: 'Commercial Production Master Files & High-Res Vector Deliverables',
        quantity: 1,
        rate: part2Rate,
        amount: part2Rate
      }
    ];
  } else {
    items = [
      {
        id: '1',
        description: client.work || 'Commercial Design Deliverable',
        quantity: 1,
        rate: client.amount || 0,
        amount: client.amount || 0
      }
    ];
  }

  const newInvoice: Invoice = {
    id: invId,
    invoiceNumber: invNumber,
    clientNo: client.clientNo,
    clientName: client.name,
    clientBusiness: client.business,
    clientPhone: client.phone || '+91 98765 00000',
    clientEmail: client.email || `${client.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
    clientAddress: client.address || client.location || 'India',
    clientGstin: client.gstin || undefined,
    location: client.location || 'India',
    date: client.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    dueDate: client.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    items,
    subtotal: client.amount || 0,
    gstRate: 0,
    gstAmount: 0,
    discount: 0,
    totalAmount: client.amount || 0,
    paidAmount,
    balance,
    status: client.status === 'Completed' ? 'Paid' : client.status === 'In Progress' ? 'Partial' : 'Pending',
    paymentMethod: 'YES BANK / UPI',
    transactionId: client.transactionId,
    notes: `• Official Commercial Tax Invoice issued by ${settings.studioName}.\n• All copyrights & original vector files transferred upon settlement.\n• Settlement via ${settings.bankName} (A/C: ${settings.accountNumber}, IFSC: ${settings.ifscCode}, UPI: ${settings.upiId}).\n• Thank you for working with ${settings.studioName}!`
  };

  saveInvoice(newInvoice);
  return newInvoice;
};

export const autoGenerateMissingInvoices = (): number => {
  if (typeof window === 'undefined') return 0;
  const clients = getStoredClients();
  const invoices = getStoredInvoices();
  let generatedCount = 0;

  clients.forEach(client => {
    const exists = invoices.some(
      inv => inv.clientNo === client.clientNo || inv.id === `inv-${client.clientNo}` || inv.id === `inv-${String(client.clientNo).padStart(3, '0')}`
    );
    if (!exists) {
      autoGenerateInvoiceForClient(client);
      generatedCount++;
    }
  });

  return generatedCount;
};

export interface AuthSession {
  isLoggedIn: boolean;
  phoneOrEmail: string;
  name: string;
  role: 'Admin' | 'Client';
  loginTime: string;
}

export const getAuthSession = (): AuthSession | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    const session = JSON.parse(stored);
    if (!session || !session.isLoggedIn) return null;
    // Strict privacy validation: only authorized admin is allowed
    const emailOrPhone = (session.phoneOrEmail || '').trim().toLowerCase();
    const cleanPhone = emailOrPhone.replace(/\D/g, '');
    const isEmailAdmin = emailOrPhone === 'contact@mystenterprises.in';
    const isPhoneAdmin = ['9667665892'].includes(cleanPhone);
    if (session.role === 'Admin' && !isEmailAdmin && !isPhoneAdmin) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
};

export const setAuthSession = (session: AuthSession): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  if (session.isLoggedIn && session.role === 'Admin') {
    document.cookie = `myst_admin_session=${encodeURIComponent(session.phoneOrEmail)}; path=/; max-age=604800; SameSite=Lax`;
  }
};

export const clearAuthSession = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
  document.cookie = 'myst_admin_session=; path=/; max-age=0; SameSite=Lax';
};

export const getStoredClientChatsMap = (): Record<string, ChatMessage[]> => {
  if (typeof window === 'undefined') return ALL_CLIENT_CHATS;
  const stored = localStorage.getItem(CHATS_KEY);
  if (!stored) {
    localStorage.setItem(CHATS_KEY, JSON.stringify(ALL_CLIENT_CHATS));
    return ALL_CLIENT_CHATS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return ALL_CLIENT_CHATS;
  }
};

export const getStoredChatMessages = (clientId: string): ChatMessage[] => {
  const allChats = getStoredClientChatsMap();
  if (allChats[clientId]) return allChats[clientId];

  // Try matching numeric id or client record prefix
  const numericId = clientId.replace('c-', '');
  if (allChats[numericId]) return allChats[numericId];
  if (allChats[`c-${numericId}`]) return allChats[`c-${numericId}`];

  // Fallback default message sequence
  return SHARMA_CAFE_CHAT_MESSAGES;
};

export const saveChatMessage = (clientId: string, msg: ChatMessage): ChatMessage[] => {
  if (typeof window === 'undefined') return [];
  const allChats = getStoredClientChatsMap();
  const current = allChats[clientId] || [];
  const updated = [...current, msg];
  allChats[clientId] = updated;

  const numericId = clientId.replace('c-', '');
  allChats[numericId] = updated;
  allChats[`c-${numericId}`] = updated;

  localStorage.setItem(CHATS_KEY, JSON.stringify(allChats));
  return updated;
};
