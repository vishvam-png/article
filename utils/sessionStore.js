const crypto = require('crypto');

class InMemorySessionStore {
  constructor({ maxAge = 60 * 60 * 1000 } = {}) {
    this.store = new Map();
    this.maxAge = Number(maxAge);
  }

  create(userId) {
    const sid = crypto.randomUUID();
    const expiresAt = Date.now() + this.maxAge;
    this.store.set(sid, { userId, expiresAt });
    return { id: sid, userId, expiresAt };
  }

  get(sid) {
    const entry = this.store.get(sid);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(sid);
      return null;
    }
    return { id: sid, ...entry };
  }

  destroy(sid) {
    this.store.delete(sid);
  }

  cleanup() {
    const now = Date.now();
    for (const [sid, entry] of this.store.entries()) {
      if (entry.expiresAt <= now) this.store.delete(sid);
    }
  }
}

module.exports = new InMemorySessionStore({ maxAge: 60 * 60 * 1000 });
