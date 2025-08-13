// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/me', auth, userCtrl.getProfile);
router.get('/', auth, userCtrl.listUsers);
router.post('/register', userCtrl.register);

module.exports = router;
