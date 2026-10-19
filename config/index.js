const parseIntOrDefault = (v, fallback) => {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? fallback : n;
};

module.exports = {
  port: parseIntOrDefault(process.env.PORT, 3000),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  maxArticles: parseIntOrDefault(process.env.MAX_ARTICLES, 50),

  // session auth config
  cookieSecret: process.env.COOKIE_SECRET || 'dev-cookie-secret-change-in-production',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  cookieMaxAge: parseIntOrDefault(process.env.COOKIE_MAX_AGE, 60 * 60 * 1000),
};
