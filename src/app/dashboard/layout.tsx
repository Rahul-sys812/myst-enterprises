import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Client Dashboard | MYST Enterprises',
  description: 'Manage design deliverables, active design queues, and client requests.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
