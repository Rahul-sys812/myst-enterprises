import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Shopping Cart | MYST Enterprises',
  description: 'Review your selected graphic design services and finalize your order with MYST Enterprises.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
