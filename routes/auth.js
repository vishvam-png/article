const express = require('express');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const sessionStore = require('../utils/sessionStore');
const usersService = require('../services/usersService');
const { getCookieOptions, getClearCookieOptions } = require('../utils/cookieOptions');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return next(createError(401, 'AUTH_REQUIRED'));
    }

    const user = await usersService.findUserByEmail(email);
    if (!user) {
      return next(createError(401, 'AUTH_REQUIRED'));
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return next(createError(401, 'AUTH_REQUIRED'));
    }

    const session = sessionStore.create(user.id);
    res.cookie('sid', session.id, getCookieOptions());

    return res.status(200).json({ data: usersService.publicUser(user) });
  } catch (err) {
    return next(createError(401, 'AUTH_REQUIRED'));
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const sid = req.signedCookies && req.signedCookies.sid;
    if (!sid) return next(createError(401, 'AUTH_REQUIRED'));

    const session = sessionStore.get(sid);
    if (!session) return next(createError(401, 'AUTH_REQUIRED'));

    const user = await usersService.findPublicById(session.userId);
    if (!user) {
      sessionStore.destroy(sid);
      res.clearCookie('sid', getClearCookieOptions());
      return next(createError(401, 'AUTH_REQUIRED'));
    }

    return res.status(200).json({ data: user });
  } catch (err) {
    return next(createError(401, 'AUTH_REQUIRED'));
  }
});

router.post('/logout', (req, res) => {
  const sid = req.signedCookies && req.signedCookies.sid;
  if (sid) sessionStore.destroy(sid);
  res.clearCookie('sid', getClearCookieOptions());
  return res.status(204).send();
});

module.exports = router;
