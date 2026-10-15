import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Client Portal Login | MYST Enterprises',
  description: 'Log in to your MYST Enterprises client account to manage projects, review drafts and access invoices.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
