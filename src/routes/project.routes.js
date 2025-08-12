// src/routes/project.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/project.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, ctrl.createProject);
router.get('/', auth, ctrl.getProjects);
router.get('/:id', auth, ctrl.getProjectById);
router.put('/:id', auth, ctrl.updateProject);
router.delete('/:id', auth, ctrl.deleteProject);

router.post('/:id/members', auth, ctrl.addMember);
router.delete('/:id/members', auth, ctrl.removeMember);

module.exports = router;
