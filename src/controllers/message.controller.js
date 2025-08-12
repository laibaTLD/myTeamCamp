// src/controllers/message.controller.js
const models = require('../models');

async function postMessage(req, res) {
  try {
    const { projectId, content, attachments } = req.body;
    if (!projectId || !content) return res.status(400).json({ message: 'projectId and content required' });

    const message = await models.Message.create({
      projectId,
      content,
      authorId: req.user.id,
      attachments: attachments || null
    });

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to post message' });
  }
}

async function getMessagesByProject(req, res) {
  try {
    const { projectId } = req.params;
    const messages = await models.Message.findAll({
      where: { projectId },
      include: [{ model: models.User, as: 'author', attributes: ['id','name','email'] }],
      order: [['createdAt', 'ASC']]
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
}

module.exports = { postMessage, getMessagesByProject };
