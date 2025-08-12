// src/controllers/file.controller.js
const path = require('path');
const models = require('../models');

async function uploadFile(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { projectId } = req.body;
    if (!projectId) return res.status(400).json({ message: 'projectId required' });

    const fileUrl = `/uploads/${req.file.filename}`; // serve static uploads folder in app.js
    const file = await models.File.create({
      projectId,
      uploadedById: req.user.id,
      fileName: req.file.originalname,
      fileUrl,
      fileType: req.file.mimetype
    });

    res.status(201).json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload file' });
  }
}

module.exports = { uploadFile };
