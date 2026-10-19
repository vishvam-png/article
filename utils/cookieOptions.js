const config = require('../config');

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.cookieSecure,
    signed: true,
    path: '/',
    maxAge: config.cookieMaxAge,
  };
}

function getClearCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.cookieSecure,
    signed: true,
    path: '/',
  };
}

module.exports = { getCookieOptions, getClearCookieOptions };
