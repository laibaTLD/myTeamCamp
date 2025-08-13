// src/middleware/auth.middleware.js
const { verify } = require('../utils/jwt');
const models = require('../models');

// Main authentication middleware
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verify(token);
    const user = await models.User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // Attach user object to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Role-based authorization middleware
authMiddleware.checkRole = function (allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = authMiddleware;
