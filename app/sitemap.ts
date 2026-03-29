import type { MetadataRoute } from 'next';

const locales = ['uz', 'ru', 'en'];
const pages = ['', '/about', '/customers', '/partners', '/pricing', '/hire-us', '/websites', '/faq', '/contact'];
const baseUrl = 'https://ithink.uz';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page}`])
        ),
      },
    }))
  );
}
