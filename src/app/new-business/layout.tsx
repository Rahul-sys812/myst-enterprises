import type { Metadata } from 'next';
import React from 'react';
import { BUSINESS_PACKAGES } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Startup & Business Branding Packages India | All-in-One Kits',
  description:
    'Launch your business with turnkey branding packages for cafes, restaurants, gyms, salons, retail & D2C brands in India. Vector logo, menu, packaging & social media in one kit.',
  keywords: [
    'startup branding packages India',
    'cafe branding kit India',
    'restaurant branding package',
    'gym branding kit India',
    'salon branding package India',
    'retail business branding kit',
    'all in one graphic design package India',
    'new business branding price'
  ],
  alternates: {
    canonical: 'https://mystenterprises.in/new-business/',
  },
  openGraph: {
    title: 'New Business Branding Packages & Launch Kits | MYST Enterprises India',
    description:
      'Turnkey commercial design packages tailored for Indian food, retail, healthcare, real estate and service startups.',
    url: 'https://mystenterprises.in/new-business/',
    siteName: 'MYST Enterprises',
    images: [
      {
        url: 'https://mystenterprises.in/images/heroes/packages-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'MYST Enterprises New Business Branding Packages',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Branding Packages India | MYST Enterprises',
    description:
      'Complete launch suites for cafes, restaurants, gyms & retail with logos, menus, uniforms, packaging and digital assets.',
    images: ['https://mystenterprises.in/images/heroes/packages-hero.jpg'],
  },
};

const packagesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://mystenterprises.in/new-business/#packages',
  name: 'New Business Launch & Branding Packages | MYST Enterprises',
  description:
    'Tailored brand identity and collateral packages for Indian startups across hospitality, retail, real estate, fitness and healthcare.',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: BUSINESS_PACKAGES.length,
  itemListElement: BUSINESS_PACKAGES.map((pkg, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: pkg.title,
    description: pkg.description,
    image: `https://mystenterprises.in${pkg.image}`,
  })),
};

export default function NewBusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesJsonLd) }}
      />
      {children}
    </>
  );
}
