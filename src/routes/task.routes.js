// src/routes/task.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/task.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, ctrl.createTask);
router.get('/project/:projectId', auth, ctrl.getTasksByProject);
router.put('/:id', auth, ctrl.updateTask);
router.delete('/:id', auth, ctrl.deleteTask);

module.exports = router;
