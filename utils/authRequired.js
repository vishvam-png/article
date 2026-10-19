const createError = require('http-errors');
const sessionStore = require('./sessionStore');
const usersService = require('../services/usersService');
const { getClearCookieOptions } = require('./cookieOptions');

async function authRequired(req, res, next) {
  try {
    const sid = req.signedCookies && req.signedCookies.sid;

    if (!sid) {
      return next(createError(401, 'AUTH_REQUIRED'));
    }

    const session = sessionStore.get(sid);
    if (!session) {
      return next(createError(401, 'AUTH_REQUIRED'));
    }

    const user = await usersService.findPublicById(session.userId);
    if (!user) {
      sessionStore.destroy(sid);
      res.clearCookie('sid', getClearCookieOptions());
      return next(createError(401, 'AUTH_REQUIRED'));
    }

    req.user = user;
    return next();
  } catch (err) {
    return next(createError(401, 'AUTH_REQUIRED'));
  }
}

module.exports = authRequired;
