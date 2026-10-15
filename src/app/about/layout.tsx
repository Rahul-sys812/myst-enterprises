import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us | Top Graphic Design & Branding Agency India',
  description:
    'Discover MYST Enterprises — India\'s premier creative branding studio. 1,000+ visual identities, logos & packaging crafted for startups, cafes & retail brands with 24-48h turnaround.',
  keywords: [
    'about MYST enterprises',
    'graphic design agency India',
    'branding agency India',
    'creative design studio India',
    'top logo designers India',
    'commercial design studio Delhi NCR',
    'vector graphic design company',
    'branding experts India'
  ],
  alternates: {
    canonical: 'https://mystenterprises.in/about/',
  },
  openGraph: {
    title: 'About MYST Enterprises | India\'s Leading Creative Design Studio',
    description:
      'Partner with India\'s top graphic design and branding studio. 1,000+ brands launched with 100% original vector art and 24-48h turnaround.',
    url: 'https://mystenterprises.in/about/',
    siteName: 'MYST Enterprises',
    images: [
      {
        url: 'https://mystenterprises.in/images/heroes/about-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'About MYST Enterprises Design Studio India',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About MYST Enterprises | Top Graphic Design & Branding Agency India',
    description:
      'Learn how MYST Enterprises helps businesses across India scale with bespoke logo design, packaging, and brand identities.',
    images: ['https://mystenterprises.in/images/heroes/about-hero.jpg'],
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://mystenterprises.in/about/#webpage',
  url: 'https://mystenterprises.in/about/',
  name: 'About MYST Enterprises | Graphic Design & Branding Studio India',
  description:
    'MYST Enterprises is a premier Indian creative studio specializing in commercial graphic design, logo creation, packaging boxes, and 360-degree brand launch kits.',
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://mystenterprises.in/#website',
    name: 'MYST Enterprises',
    url: 'https://mystenterprises.in',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mystenterprises.in/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About Us',
        item: 'https://mystenterprises.in/about/',
      },
    ],
  },
  mainEntity: {
    '@type': 'Organization',
    name: 'MYST Enterprises',
    url: 'https://mystenterprises.in',
    logo: 'https://mystenterprises.in/logo.png',
    founder: {
      '@type': 'Person',
      name: 'MYST Creative Director',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
    knowsAbout: [
      'Graphic Design',
      'Brand Identity',
      'Vector Logo Design',
      'Food & Retail Packaging Design',
      'Social Media Marketing Creatives',
      'Corporate Stationery Printing'
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {children}
    </>
  );
}
