// src/utils/jwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function sign(payload, expiresIn = '7d') {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
}

function verify(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = { sign, verify };
