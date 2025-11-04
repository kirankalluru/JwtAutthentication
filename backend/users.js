// users.js
const bcrypt = require('bcrypt');

const users = [];

async function seed() {
  const hashed = await bcrypt.hash('1234', 10);
  users.push({ id: 1, email: 'kiran@gmail.com', passwordHash: hashed });
}

function findByEmail(email) {
  return users.find(u => u.email === email);
}

function findById(id) {
  return users.find(u => u.id === id);
}

module.exports = { users, seed, findByEmail, findById };
