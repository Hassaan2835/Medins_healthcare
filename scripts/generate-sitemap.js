import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from '../src/data/productsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://medinshealthcare.com';

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/products', changefreq: 'daily', priority: 0.9 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
];

const generateSitemap = () => {
  const staticItems = routes.map(route => {
    return `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n');

  const dynamicItems = products.map(product => {
    const imageUrl = product.image ? `${BASE_URL}${product.image}` : '';
    // Clean strings for XML compliance
    const safeName = product.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeDesc = product.description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    const imageXml = imageUrl ? `\n    <image:image>
      <image:loc>${encodeURI(imageUrl)}</image:loc>
      <image:title>${safeName}</image:title>
      <image:caption>${safeDesc}</image:caption>
    </image:image>` : '';

    return `  <url>
    <loc>${BASE_URL}/product/${product.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${imageXml}
  </url>`;
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticItems}
${dynamicItems}
</urlset>
`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXml, 'utf8');
  console.log(`✅ sitemap.xml successfully generated at: ${outputPath}`);
};

generateSitemap();
