// src/routes/file.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/file.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../utils/fileUpload');

router.post('/upload', auth, upload.single('file'), ctrl.uploadFile);

module.exports = router;
