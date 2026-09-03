// The only file in the project that reads process.env.
// All other files should import configuration from here.

const parseIntOrDefault = (v, fallback) => {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? fallback : n;
};

module.exports = {
  port: parseIntOrDefault(process.env.PORT, 3000),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  maxArticles: parseIntOrDefault(process.env.MAX_ARTICLES, 50),
};
