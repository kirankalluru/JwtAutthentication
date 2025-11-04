// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { seed, findByEmail } = require('./users');
const { authenticateToken } = require('./middleWare/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

seed().then(() => console.log('Seeded user (kiran@gmail.com / 1234)'));

app.get('/', (req, res) => res.json({ message: 'JWT Auth Backend running' }));

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const user = findByEmail(email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = { userId: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });

  res.json({ token });
});

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello user ${req.user.email}, you accessed a protected route!` });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
