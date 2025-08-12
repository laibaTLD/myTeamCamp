// src/controllers/task.controller.js
const models = require('../models');

async function createTask(req, res) {
  try {
    const { title, description, projectId, assignedToId, priority, dueDate } = req.body;
    if (!title || !projectId) return res.status(400).json({ message: 'title and projectId required' });

    const project = await models.Project.findByPk(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = await models.Task.create({
      title, description, projectId, assignedToId: assignedToId || null, priority, dueDate
    });

    // Optional: create notification for assigned user
    if (assignedToId) {
      await models.Notification.create({
        userId: assignedToId,
        type: 'taskAssigned',
        message: `You were assigned to task: ${title}`
      });
    }

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create task' });
  }
}

async function getTasksByProject(req, res) {
  try {
    const { projectId } = req.params;
    const tasks = await models.Task.findAll({ where: { projectId }, order: [['createdAt','DESC']] });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
}

async function updateTask(req, res) {
  try {
    const task = await models.Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update task' });
  }
}

async function deleteTask(req, res) {
  try {
    const task = await models.Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
}

module.exports = { createTask, getTasksByProject, updateTask, deleteTask };
