import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Design Portfolio | 100+ Commercial Brand Case Studies',
  description:
    'Explore our showcase of 1,000+ client projects: vector logos, luxury restaurant menus, product packaging boxes, social media posts, and retail branding in India.',
  keywords: [
    'graphic design portfolio India',
    'logo design samples India',
    'product packaging design showcase',
    'restaurant menu design portfolio',
    'creative agency case studies India',
    'social media post designs portfolio',
    'brand identity case studies'
  ],
  alternates: {
    canonical: 'https://mystenterprises.in/designs/',
  },
  openGraph: {
    title: 'Design Portfolio & Commercial Work | MYST Enterprises India',
    description:
      'Inspect 100+ verified commercial brand identity case studies crafted by India\'s top graphic design studio.',
    url: 'https://mystenterprises.in/designs/',
    siteName: 'MYST Enterprises',
    images: [
      {
        url: 'https://mystenterprises.in/images/heroes/designs-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'MYST Enterprises Graphic Design Portfolio',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Portfolio | MYST Enterprises India',
    description:
      'Original vector logos, 3D retail packaging, luxury menus and advertising creatives across India.',
    images: ['https://mystenterprises.in/images/heroes/designs-hero.jpg'],
  },
};

const portfolioJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://mystenterprises.in/designs/#webpage',
  url: 'https://mystenterprises.in/designs/',
  name: 'Graphic Design Portfolio & Creative Showcase | MYST Enterprises',
  description:
    'Curated gallery of vector logo designs, restaurant menu designs, packaging dielines, and marketing collateral produced for Indian businesses.',
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
        name: 'Designs Portfolio',
        item: 'https://mystenterprises.in/designs/',
      },
    ],
  },
};

export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
      {children}
    </>
  );
}
