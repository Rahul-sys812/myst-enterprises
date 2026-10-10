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
    { slug: 'marketing-collateral' }
  ];

  // Merge unique slugs
  const allSlugs = [...baseSlugs, ...customSubpages];
  const unique = Array.from(new Set(allSlugs.map(s => s.slug))).map(slug => ({ slug }));
  return unique;
}

export default function Page() {
  return <ProductDetailView />;
}
