
import { getAllLocations } from '../data/locations';
import { CITIES, cityNameToSlug } from '../data/cities';
import { SITE_URL } from '../lib/constants';

export const generateSitemap = () => {
  const baseUrl = SITE_URL;
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: 'about', priority: '0.8', changefreq: 'monthly' },
    { url: 'locations', priority: '0.9', changefreq: 'weekly' },
    { url: 'assisted-living', priority: '0.8', changefreq: 'monthly' },
    { url: 'memory-care', priority: '0.8', changefreq: 'monthly' },
    { url: 'contact', priority: '0.7', changefreq: 'monthly' },
  ];

  // Dynamic location pages
  const locations = getAllLocations();
  const locationPages = locations.map(location => ({
    url: location.id,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  // City × care-type pages. Every Tier-1 city gets an assisted-living and a
  // senior-living page; cities with at least one community get higher
  // priority because they have unique indexable inventory. Cities with no
  // listings still render (graceful empty state) and get a lower priority
  // so they don't outrank populated pages.
  const slugsWithData = new Set(locations.map(f => cityNameToSlug(f.city)));
  const cityCareTypePages = CITIES.flatMap(city => {
    const populated = slugsWithData.has(city.slug);
    const priority = populated ? '0.85' : '0.5';
    return [
      { url: `assisted-living/${city.slug}`, priority, changefreq: 'weekly' },
      { url: `senior-living/${city.slug}`, priority, changefreq: 'weekly' },
    ];
  });

  // Combine all pages
  const allPages = [...staticPages, ...cityCareTypePages, ...locationPages];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};
