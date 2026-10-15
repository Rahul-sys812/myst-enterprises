import type { Metadata } from 'next';
import ProductDetailView from './ProductDetailView';
import { PRODUCTS_DATA } from '@/data/mockData';

export function generateStaticParams() {
  const baseSlugs = PRODUCTS_DATA.map(p => ({ slug: p.id }));
  const customSubpages = [
    { slug: 'logo-design' },
    { slug: 'packaging-design' },
    { slug: 'menu-design' },
    { slug: 'social-media-posts' },
    { slug: 'banners-posters' },
    { slug: 'business-cards' },
    { slug: 'website-graphics' },
    { slug: 'brochure-catalogue' },
    { slug: 't-shirt-design' },
    { slug: 'visiting-cards' },
    { slug: 'stationery-kit' },
    { slug: 'letterhead-envelopes' },
    { slug: 'hangtags-stickers' },
    { slug: 'canopy-tent-design' },
    { slug: 'standee-rollup' },
    { slug: 'restaurant-menu' },
    { slug: 'social-media' },
    { slug: 'stationery' },
    { slug: 'marketing-collateral' },
  ];

  const allSlugs = [...baseSlugs, ...customSubpages];
  const unique = Array.from(new Set(allSlugs.map(s => s.slug))).map(slug => ({ slug }));
  return unique;
}

function resolveProduct(slug: string) {
  return (
    PRODUCTS_DATA.find(p => p.id === slug) ||
    PRODUCTS_DATA.find(p => p.id.includes(slug) || slug.includes(p.id)) ||
    PRODUCTS_DATA[0]
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = resolveProduct(slug);

  const customTitles: Record<string, string> = {
    'logo-design': 'Logo Design Services India | 100% Vector Branding Kit',
    'packaging-design': 'Packaging Design Agency India | 3D Box & Label Dielines',
    'menu-design': 'Restaurant Menu Design India | Luxury Food & Cafe Menus',
    'restaurant-menu': 'Restaurant Menu Design India | Luxury Food & Cafe Menus',
    'social-media-posts': 'Social Media Post Design Services India | Ad Creatives',
    'social-media': 'Social Media Post Design Services India | Ad Creatives',
    'banners-posters': 'Banner & Poster Design Services India | Standees & Flex',
    'business-cards': 'Luxury Business Card Design India | Gold Foil & Embossed',
    'visiting-cards': 'Executive Visiting Card Design India | Minimal & Textured',
    'website-graphics': 'Website Graphics & UI Banner Design | Next.js & Shopify',
    'brochure-catalogue': 'Brochure & Catalogue Design India | Corporate Profiles',
    't-shirt-design': 'Custom T-Shirt & Merch Design India | Vector Apparel Art',
    letterhead: 'Corporate Letterhead & Stationery Design India | Print Ready',
    'sticker-label': 'Custom Sticker & Product Label Design India | Die-Cut Print',
  };

  const title = customTitles[slug] || `${product.title} Services India | MYST Enterprises`;
  const description = `Order professional ${product.title.toLowerCase()} starting at ${product.price}. Includes 100% original vector copyright, 24-48h express turnaround, and unlimited revisions.`;
  const canonicalUrl = `https://mystenterprises.in/products/${slug}/`;
  const imageUrl = `https://mystenterprises.in${product.image}`;

  return {
    title,
    description,
    keywords: [
      `${product.title.toLowerCase()} India`,
      `best ${product.title.toLowerCase()} services`,
      `hire ${product.title.toLowerCase()} designer`,
      `commercial ${product.title.toLowerCase()}`,
      'graphic design agency India',
      'MYST Enterprises design',
      `${product.category.toLowerCase()} design services India`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | MYST Enterprises`,
      description,
      url: canonicalUrl,
      siteName: 'MYST Enterprises',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${product.title} by MYST Enterprises India`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | MYST Enterprises`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = resolveProduct(slug);
  const priceNum = parseInt(product.price.replace(/[^0-9]/g, ''), 10) || 1500;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://mystenterprises.in/products/${slug}/#product`,
    name: `${product.title} - Professional Graphic Design Services`,
    image: `https://mystenterprises.in${product.image}`,
    description: product.description,
    sku: `MYST-${product.id.toUpperCase()}`,
    mpn: `MYST-${product.id.toUpperCase()}-2026`,
    brand: {
      '@type': 'Brand',
      name: 'MYST Enterprises',
    },
    offers: {
      '@type': 'Offer',
      url: `https://mystenterprises.in/products/${slug}/`,
      priceCurrency: 'INR',
      price: priceNum.toString(),
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'MYST Enterprises',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '185',
      bestRating: '5',
      worstRating: '1',
    },
    provider: {
      '@type': 'ProfessionalService',
      name: 'MYST Enterprises',
      telephone: '+919667665892',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New Delhi',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView />
    </>
  );
}
