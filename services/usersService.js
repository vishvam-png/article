const bcrypt = require('bcrypt');

// Simple in-memory user for demo & local testing.
// The password for the seeded user is: "correct horse battery staple"
// We generate the password hash at startup so bcrypt.compare works.

const seededPassword = 'correct horse battery staple';
const seededHash = bcrypt.hashSync(seededPassword, 10);

const users = [
  {
    id: 1,
    email: 'sam@example.com',
    name: 'Sam Example',
    passwordHash: seededHash,
  },
];

async function findUserByEmail(email) {
  if (!email) return null;
  const normalized = String(email).trim().toLowerCase();
  return users.find((u) => u.email === normalized) || null;
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name || null,
  };
}

async function findPublicById(id) {
  if (!id) return null;
  const user = users.find((u) => u.id === id) || null;
  return publicUser(user);
}

module.exports = { findUserByEmail, findPublicById, publicUser };
