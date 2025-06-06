const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://jayvicsanantonio.dev';
const STATIC_PAGES = ['/', '/blog', '/projects', '/work', '/lab'];
const BLOG_POST_SLUGS = [
  'building-my-developer-playground',
  'css-has-explained',
  'css-user-valid-user-invalid-explained',
  'from-ember-to-next',
  'goodbye-twitter-x-hello-bluesky',
  'html-autofocus-explained',
  'my-coding-christmas-four-advent-calendars',
  'own-your-bluesky-identity',
  'popover-api-explained',
  'the-typescript-tightrope',
];

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemapUrls = [
  ...STATIC_PAGES.map(page => `${BASE_URL}${page}`),
  ...BLOG_POST_SLUGS.map(slug => `${BASE_URL}/blog/${slug}`),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}
</urlset>`;

const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml);
console.log(`Sitemap created at ${sitemapPath}`);

const robotsPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let robotsContent = fs.readFileSync(robotsPath, 'utf8');
  // Updated regex to remove the specific placeholder lines
  robotsContent = robotsContent.replace(/# Sitemap will be added later:\s*?\n# Sitemap: \[URL_TO_SITEMAP\.XML\]\s*?\n?/, '');
  robotsContent = robotsContent.trim(); // Remove any leading/trailing whitespace after replacement
  if (robotsContent) {
    robotsContent += '\n'; // Ensure there's a newline before adding the new sitemap line, if content exists
  }
  robotsContent += `Sitemap: ${BASE_URL}/sitemap.xml`;

  fs.writeFileSync(robotsPath, robotsContent);
  console.log(`robots.txt updated at ${robotsPath}`);
} else {
  // If robots.txt doesn't exist, create it with the correct content
  const newRobotsContent = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml`;
  fs.writeFileSync(robotsPath, newRobotsContent);
  console.log(`robots.txt created at ${robotsPath}`);
}
