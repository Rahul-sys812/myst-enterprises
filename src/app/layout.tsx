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
    default: 'MYST ENTERPRISES | Creative Design Solutions For Every Business',
    template: '%s | MYST ENTERPRISES'
  },
  description: 'Logos, Social Media, Branding, Menus, Posters, Packaging, Websites, and Business Design Packages. Trusted by 1000+ businesses across India & worldwide.',
  keywords: [
    'graphic design',
    'logo design',
    'packaging design',
    'restaurant menu design',
    'social media posts',
    'branding agency',
    'MYST Enterprises',
    'commercial graphics India',
    'brand identity studio'
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
    title: 'MYST ENTERPRISES | Creative Design Solutions For Every Business',
    description: 'Logos, Social Media, Branding, Menus, Posters, Packaging, Websites, and Business Design Packages. Trusted by 1000+ businesses across India & worldwide.',
    images: [
      {
        url: '/images/hero-laptop-full.jpg',
        width: 1200,
        height: 630,
        alt: 'MYST ENTERPRISES - Commercial Graphic Design Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MYST ENTERPRISES | Creative Design Solutions For Every Business',
    description: 'Logos, Social Media, Branding, Menus, Posters, Packaging, Websites, and Business Design Packages.',
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MYST ENTERPRISES',
  image: 'https://mystenterprises.in/logo.png',
  url: 'https://mystenterprises.in',
  telephone: '+919667665892',
  email: 'contact@mystenterprises.in',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rattakhera (326)',
    addressLocality: 'Sirsa',
    addressRegion: 'Haryana',
    postalCode: '125055',
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:30',
    closes: '19:30',
  },
  sameAs: [
    'https://wa.me/919667665892',
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
