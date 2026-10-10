export type ClientStatus = 'Completed' | 'In Progress' | 'Payment Pending';

export interface ClientWorkItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface ClientRecord {
  id: string;
  clientNo: number;
  name: string;
  business: string;
  work: string;
  amount: number;
  paidAmount?: number;
  balance?: number;
  status: ClientStatus;
  date: string;
  phone?: string;
  email?: string;
  location?: string;
  address?: string;
  addedOn?: string;
  workCompletedDate?: string;
  logoPreview?: string;
  workItems?: string[];
  gstin?: string;
  transactionId?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'agency';
  senderName: string;
  text: string;
  timestamp: string;
  attachment?: {
    type: 'image' | 'file' | 'logo-variants';
    name?: string;
    size?: string;
    url?: string;
    variants?: { name: string; bg: string; color: string; label: string }[];
  };
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientNo: number;
  clientName: string;
  clientBusiness: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  clientGstin?: string;
  location?: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  gstRate: number;
  gstAmount: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  paymentMethod?: string;
  transactionId?: string;
  notes?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: 'Branding' | 'Print' | 'Digital' | 'Merch';
  shortDesc: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  features: string[];
  formats: string[];
  turnaround: string;
}

export interface DesignProject {
  id: string;
  title: string;
  category: 'Logo' | 'Social Media' | 'Menu' | 'Poster' | 'Packaging' | 'Website' | 'Merch';
  subtitle: string;
  industry: string;
  bgGradient: string;
  accentColor: string;
  textColor: string;
  description: string;
  tags: string[];
  colorPalette: { name: string; hex: string }[];
  deliverables: string[];
  clientReview?: { quote: string; clientName: string; role: string };
  logoType?: 'the-brew-house' | 'blush-beauty' | 'fresh-bites' | 'fit-zone' | 'urban-boutique' | 'carewell' | 'travel-with-us' | 'kasumi-fruits' | 'velvet-scent' | 'apex-tech' | 'saffron-soul' | 'lumina-arch' | 'sharma-cafe' | 'custom' | string;
  image?: string;
}

export interface BusinessPackage {
  id: string;
  title: string;
  category: 'Food & Beverage' | 'Retail' | 'Services' | 'Education' | 'Healthcare' | 'Real Estate';
  startingPrice: number;
  image: string;
  description: string;
  turnaround: string;
  deliverables: string[];
  popularBadge?: boolean;
}
