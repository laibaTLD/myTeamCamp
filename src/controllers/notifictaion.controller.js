// src/controllers/notification.controller.js
const models = require('../models');

async function listNotifications(req, res) {
  try {
    const userId = req.user.id;
    const notifs = await models.Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(notifs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
}

async function markAsRead(req, res) {
  try {
    const notif = await models.Notification.findByPk(req.params.id);
    if (!notif) return res.status(404).json({ message: 'Notification not found' });
    if (notif.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await notif.update({ isRead: true });
    res.json(notif);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to mark notification' });
  }
}

module.exports = { listNotifications, markAsRead };
