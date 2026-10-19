# article
Refactor demonstration: add validators, utils, and central config (supporting layers)


## Session auth added (feature/session-auth)

This branch adds a small session-based authentication demo suitable for the learning assignment. It uses an in-memory session store and a seeded in-memory user for local testing.

### Files added/changed
- config/index.js — added cookie configuration values
- app.js — mounts cookie-parser and /auth routes
- utils/sessionStore.js — in-memory session store (not for production)
- utils/cookieOptions.js — centralized cookie options
- utils/authRequired.js — authentication middleware example (not currently wired)
- routes/auth.js — POST /auth/login, GET /auth/me, POST /auth/logout
- services/usersService.js — small seeded user store for testing
- .env.example — environment variables for session cookies

### Local verification (curl)

Start the server:

```bash
COOKIE_SECRET=devsecret COOKIE_SECURE=false npm start
```

Login (stores cookie to cookies.txt):

```bash
curl -i -c cookies.txt -X POST -H "Content-Type: application/json" \
  -d '{"email":"sam@example.com","password":"correct horse battery staple"}' \
  http://localhost:3000/auth/login
```

Check Set-Cookie header: should include `sid`, `HttpOnly`, and `SameSite=Lax`.

Get current user:

```bash
curl -i -b cookies.txt http://localhost:3000/auth/me
```

Logout:

```bash
curl -i -b cookies.txt -c cookies.txt -X POST http://localhost:3000/auth/logout
```

After logout, the same cookie should no longer authenticate `/auth/me`.

### Notes
- This is an educational implementation. For production, use a shared store like Redis and set `COOKIE_SECURE=true` behind HTTPS.
- Keep `COOKIE_SECRET` and other secrets out of source control.
