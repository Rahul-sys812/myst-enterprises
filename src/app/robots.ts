import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/login/',
          '/cart/',
          '/checkout/',
          '/get-invoice/',
          '/api/',
          '/_next/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/login/',
          '/cart/',
          '/checkout/',
          '/get-invoice/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://mystenterprises.in/sitemap.xml',
    host: 'https://mystenterprises.in',
  };
}
