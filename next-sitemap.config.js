/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://world-flags-quiz.ediloaz.com',
  generateRobotsTxt: false, // Ya tenemos robots.txt manual
  generateIndexSitemap: false,
  exclude: ['/game', '/api/*', '/results'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/game', '/api/'],
      },
    ],
    additionalSitemaps: [],
  },
};

