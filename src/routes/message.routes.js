// src/routes/message.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/message.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, ctrl.postMessage);
router.get('/project/:projectId', auth, ctrl.getMessagesByProject);

module.exports = router;
