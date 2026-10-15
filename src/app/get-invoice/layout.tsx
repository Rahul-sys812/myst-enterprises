import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Invoice Portal | MYST Enterprises',
  description: 'View and download official GST invoices and billing statements from MYST Enterprises.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function GetInvoiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
