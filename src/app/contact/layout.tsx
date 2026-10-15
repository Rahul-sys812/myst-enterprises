import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | Hire Top Graphic Designers in India',
  description:
    'Get an express design quote in 15 minutes. Contact MYST Enterprises for vector logos, custom packaging, menus & brand suites. WhatsApp +91 96676 65892.',
  keywords: [
    'contact graphic designer India',
    'hire branding agency India',
    'graphic design agency contact Delhi NCR',
    'design project quote WhatsApp',
    'logo design price quote India',
    'commercial design inquiry',
    'hire logo designer online India'
  ],
  alternates: {
    canonical: 'https://mystenterprises.in/contact/',
  },
  openGraph: {
    title: 'Contact MYST Enterprises | Hire India\'s Top Graphic Designers',
    description:
      'Fast 15-minute response time. Discuss your custom branding, packaging or logo project with our lead creative directors.',
    url: 'https://mystenterprises.in/contact/',
    siteName: 'MYST Enterprises',
    images: [
      {
        url: 'https://mystenterprises.in/images/heroes/contact-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact MYST Enterprises Graphic Design Team',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact MYST Enterprises | Graphic Design & Branding Studio India',
    description:
      'Need premium graphic design in India? Contact MYST Enterprises for 24-48h turnaround on logos, packaging, and marketing collateral.',
    images: ['https://mystenterprises.in/images/heroes/contact-hero.jpg'],
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://mystenterprises.in/contact/#webpage',
  url: 'https://mystenterprises.in/contact/',
  name: 'Contact MYST Enterprises | Graphic Design Studio India',
  description:
    'Reach out to MYST Enterprises for logo design, brand kits, commercial packaging, menus, and marketing creatives across India.',
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
        name: 'Contact Us',
        item: 'https://mystenterprises.in/contact/',
      },
    ],
  },
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'MYST Enterprises - Graphic Design & Branding Agency',
    telephone: '+919667665892',
    email: 'mystenterprises@gmail.com',
    url: 'https://mystenterprises.in',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6139',
      longitude: '77.2090',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+919667665892',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+919667665892',
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
