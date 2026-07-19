module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Comma-separated origins, e.g. https://your-site.vercel.app,http://localhost:3000
      origin: (process.env.CORS_ORIGIN || 'http://localhost:3000')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
