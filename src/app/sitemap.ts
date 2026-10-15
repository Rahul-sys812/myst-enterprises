import type { MetadataRoute } from 'next';
import { PRODUCTS_DATA } from '@/data/mockData';

export const dynamic = 'force-static';

const BASE_URL = 'https://mystenterprises.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── Core Pages ──────────────────────────────────────────────────
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/designs/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/products/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/new-business/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  // ─── High-Converting Commercial Subpage Slugs ───────────────────
  const subpageSlugs = [
    'logo-design',
    'packaging-design',
    'menu-design',
    'restaurant-menu',
    'social-media-posts',
    'social-media',
    'banners-posters',
    'business-cards',
    'visiting-cards',
    'website-graphics',
    'brochure-catalogue',
    't-shirt-design',
    'letterhead',
    'letterhead-envelopes',
    'sticker-label',
    'hangtags-stickers',
    'stationery-kit',
    'stationery',
    'standee-rollup',
    'canopy-tent-design',
    'marketing-collateral',
  ];

  const productBaseSlugs = PRODUCTS_DATA.map((p) => p.id);
  const allSlugs = Array.from(new Set([...productBaseSlugs, ...subpageSlugs]));

  const productPages: MetadataRoute.Sitemap = allSlugs.map((slug) => {
    const isTopTier = ['logo-design', 'packaging-design', 'menu-design'].includes(slug);
    return {
      url: `${BASE_URL}/products/${slug}/`,
      lastModified: now,
      changeFrequency: isTopTier ? ('weekly' as const) : ('monthly' as const),
      priority: isTopTier ? 0.9 : 0.8,
    };
  });

  return [...corePages, ...productPages];
}
