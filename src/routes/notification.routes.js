// src/routes/notification.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/notification.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, ctrl.listNotifications);
router.put('/:id/read', auth, ctrl.markAsRead);

module.exports = router;
