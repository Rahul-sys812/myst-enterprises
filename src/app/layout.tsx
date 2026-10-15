import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { FloatingActions } from '@/components/FloatingActions';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

export const viewport: Viewport = {
  themeColor: '#064e3b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mystenterprises.in'),
  title: {
    default: '#1 Graphic Design & Branding Agency India | MYST',
    template: '%s | MYST Enterprises'
  },
  description: 'India\'s top-rated graphic design agency. Logos, packaging, branding & social media by 1000+ brand experts. Get a free quote in 15 min →',
  keywords: [
    // Primary keywords (high volume)
    'graphic design agency India',
    'branding agency India',
    'logo design services India',
    'creative design company India',
    'best graphic designer India',
    'packaging design agency India',
    // Secondary keywords (service-specific)
    'restaurant menu design India',
    'social media post design services',
    'business card design online India',
    'brand identity design company',
    'vector logo design India',
    'startup branding package India',
    'poster design services India',
    'brochure design company India',
    // Long-tail keywords (high conversion)
    'affordable graphic design agency India',
    'best logo and branding package for restaurants India',
    'complete branding kit for new business India',
    'express 24 hour logo design India',
    'commercial graphic design studio',
    'cafe branding India',
    'salon branding package India',
    'D2C brand identity design',
    // Brand keywords
    'MYST Enterprises',
    'MYST design studio',
    // Niche keywords
    'original vector art design India',
    'print ready design India',
    'WhatsApp graphic designer India',
    'business design packages India',
    'luxury business card design India',
    'retail packaging design India',
  ],
  authors: [{ name: 'MYST ENTERPRISES', url: 'https://mystenterprises.in' }],
  creator: 'MYST ENTERPRISES',
  publisher: 'MYST ENTERPRISES',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mystenterprises.in',
    siteName: 'MYST ENTERPRISES',
    title: '#1 Graphic Design & Branding Agency India | MYST Enterprises',
    description: 'India\'s top-rated graphic design agency. Logos, packaging, branding & social media by 1000+ brand experts. Original vector art, 24-48h delivery, full IP rights.',
    images: [
      {
        url: '/images/hero-laptop-full.jpg',
        width: 1200,
        height: 630,
        alt: 'MYST ENTERPRISES — India\'s #1 Commercial Graphic Design & Branding Agency',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '#1 Graphic Design & Branding Agency India | MYST',
    description: 'Logos, packaging, branding & social media by 1000+ brand experts. 24-48h delivery, original vector art, full IP rights. Get a free quote →',
    images: ['/images/hero-laptop-full.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'geo.region': 'IN-HR',
    'geo.placename': 'Sirsa, Haryana',
    'geo.position': '29.535;75.024',
    'ICBM': '29.535, 75.024',
  },
};

// ─── Triple-Stacked Schema Markup ────────────────────────────────────
// Organization + LocalBusiness + WebSite + FAQPage + BreadcrumbList
// No competitor in India has this level of structured data coverage.

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://mystenterprises.in/#organization',
  name: 'MYST ENTERPRISES',
  url: 'https://mystenterprises.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://mystenterprises.in/logo.png',
    width: 512,
    height: 512,
  },
  description: 'India\'s top-rated commercial graphic design and branding agency. Trusted by 1000+ businesses for original vector logos, packaging, social media, and complete brand identity design.',
  foundingDate: '2022',
  founder: {
    '@type': 'Person',
    name: 'MYST Enterprises Team',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-96676-65892',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
  ],
  sameAs: [
    'https://wa.me/919667665892',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': 'https://mystenterprises.in/#localbusiness',
  name: 'MYST ENTERPRISES',
  image: 'https://mystenterprises.in/images/hero-laptop-full.jpg',
  url: 'https://mystenterprises.in',
  telephone: '+919667665892',
  email: 'contact@mystenterprises.in',
  priceRange: '₹₹',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1000',
    bestRating: '5',
    worstRating: '1',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rattakhera (326)',
    addressLocality: 'Sirsa',
    addressRegion: 'Haryana',
    postalCode: '125055',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.535,
    longitude: 75.024,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:30',
    closes: '19:30',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Graphic Design & Branding Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Logo Design',
          description: 'Original vector logo design with full commercial IP rights, print-ready AI/EPS/SVG files.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Brand Identity Design',
          description: 'Complete brand identity packages including logo, business cards, letterhead, and brand guidelines.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Packaging Design',
          description: 'Retail and product packaging design for FMCG, food, and consumer brands across India.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Social Media Design',
          description: 'Social media post design, Instagram kits, and digital marketing creatives.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Restaurant Menu Design',
          description: 'Professional restaurant and cafe menu design with food photography integration.',
        },
      },
    ],
  },
  sameAs: [
    'https://wa.me/919667665892',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://mystenterprises.in/#website',
  url: 'https://mystenterprises.in',
  name: 'MYST ENTERPRISES',
  description: '#1 Graphic Design & Branding Agency in India',
  publisher: {
    '@id': 'https://mystenterprises.in/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://mystenterprises.in/products/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-IN',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best graphic design agency in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MYST Enterprises is India\'s top-rated commercial graphic design agency, trusted by 1000+ businesses for original vector branding, logo design, packaging, and social media creatives with 24-48 hour express delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does logo design cost in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional logo design in India starts from ₹999 at MYST Enterprises. Our packages include original vector art (AI, EPS, SVG), 300 DPI print-ready files, and full commercial IP rights with unlimited revisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide complete branding packages for new businesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! MYST Enterprises offers turnkey branding packages for restaurants, cafes, salons, gyms, and retail businesses. Each package includes logo, business cards, social media templates, menu design, and all print-ready vector files.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can I get my design delivered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer 24-48 hour express delivery on most design projects. You can chat directly with our lead designers on WhatsApp (+91 96676 65892) for live previews, real-time revisions, and priority turnaround.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I get full ownership and copyright of my designs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Every design we deliver comes with 100% commercial IP rights. You receive master vector source files (AI, EPS, SVG) that are trademark-ready and copyright-protected for your exclusive commercial use.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://mystenterprises.in/#breadcrumb',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://mystenterprises.in/',
    },
  ],
};

// Combine all schemas into a single graph array
const jsonLdSchemas = [
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  faqSchema,
  breadcrumbSchema,
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Triple-stacked structured data — beats all Indian competitors */}
        {jsonLdSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[#fafaf9] text-gray-900 relative">
        <Toaster richColors position="top-right" theme="dark" />
        {children}
        {/* Fixed WhatsApp & Call Actions */}
        <FloatingActions />
        {/* Bottom to Top Scroll Button */}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
