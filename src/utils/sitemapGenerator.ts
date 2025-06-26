
import { getAllLocations } from '../data/locations';

export const generateSitemap = () => {
  const baseUrl = 'https://sacramentoelderlycare.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: 'about', priority: '0.8', changefreq: 'monthly' },
    { url: 'locations', priority: '0.9', changefreq: 'weekly' },
    { url: 'assisted-living', priority: '0.8', changefreq: 'monthly' },
    { url: 'memory-care', priority: '0.8', changefreq: 'monthly' },
    { url: 'contact', priority: '0.7', changefreq: 'monthly' }
  ];
  
  // Dynamic location pages
  const locations = getAllLocations();
  const locationPages = locations.map(location => ({
    url: location.id,
    priority: '0.7',
    changefreq: 'monthly'
  }));
  
  // Combine all pages
  const allPages = [...staticPages, ...locationPages];
  
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
