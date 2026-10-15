import type { Metadata } from 'next';
import React from 'react';
import { PRODUCTS_DATA } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Design Services & Pricing | Logo, Packaging & Branding India',
  description:
    'Browse commercial graphic design services by MYST Enterprises: vector logos, luxury business cards, menus, packaging & print collateral. Transparent Indian pricing.',
  keywords: [
    'graphic design services India',
    'logo design price India',
    'restaurant menu design price',
    'packaging design cost India',
    'social media post design packages',
    'corporate stationery design India',
    'visiting card design price',
    'commercial design studio rates'
  ],
  alternates: {
    canonical: 'https://mystenterprises.in/products/',
  },
  openGraph: {
    title: 'Commercial Graphic Design Services & Rates | MYST Enterprises India',
    description:
      'Transparent pricing on vector logos, 3D packaging, food menus and marketing collateral for Indian businesses.',
    url: 'https://mystenterprises.in/products/',
    siteName: 'MYST Enterprises',
    images: [
      {
        url: 'https://mystenterprises.in/images/heroes/products-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'MYST Enterprises Graphic Design Services Catalog',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphic Design Services & Transparent Pricing | MYST Enterprises',
    description:
      'Explore all design services from logo kits to packaging with 24-48h delivery and unlimited revisions.',
    images: ['https://mystenterprises.in/images/heroes/products-hero.jpg'],
  },
};

const productsListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://mystenterprises.in/products/#itemlist',
  name: 'Graphic Design Services Catalog | MYST Enterprises India',
  description:
    'Comprehensive catalog of commercial graphic design services, branding packages, and marketing collateral.',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: PRODUCTS_DATA.length,
  itemListElement: PRODUCTS_DATA.map((product, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: product.title,
    url: `https://mystenterprises.in/products/${product.id}/`,
    image: `https://mystenterprises.in${product.image}`,
    description: product.description,
  })),
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsListJsonLd) }}
      />
      {children}
    </>
  );
}
