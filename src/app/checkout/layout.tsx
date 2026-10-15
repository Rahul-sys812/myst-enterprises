import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Order Checkout | MYST Enterprises',
  description: 'Complete your graphic design order via WhatsApp with MYST Enterprises.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
