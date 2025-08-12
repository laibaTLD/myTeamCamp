// src/controllers/user.controller.js
const bcrypt = require('bcrypt');
const models = require('../models');
const { sign } = require('../utils/jwt');
const config = require('../config/config');

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password required' });
    }
    const existing = await models.User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, config.bcryptSaltRounds);
    const user = await models.User.create({ name, email, password: hashed, role });
    const token = sign({ id: user.id });
    const { password: pw, ...userData } = user.toJSON();
    res.status(201).json({ user: userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email & password required' });
    const user = await models.User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = sign({ id: user.id });
    const { password: pw, ...userData } = user.toJSON();
    res.json({ user: userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
}

async function getProfile(req, res) {
  const user = req.user;
  const { password, ...userData } = user.toJSON();
  res.json({ user: userData });
}

async function listUsers(req, res) {
  try {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}

module.exports = { register, login, getProfile, listUsers };
