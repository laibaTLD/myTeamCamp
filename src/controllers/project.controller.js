// src/controllers/project.controller.js
const models = require('../models');

async function createProject(req, res) {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Project name required' });

    const project = await models.Project.create({ name, description, ownerId: req.user.id });
    // add owner as member as well
    await project.addMember(req.user.id);

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create project' });
  }
}

async function getProjects(req, res) {
  try {
    // return projects where user is owner or member
    const user = req.user;
    const projects = await models.Project.findAll({
      include: [
        { model: models.User, as: 'owner', attributes: ['id','name','email'] },
        { model: models.User, as: 'members', attributes: ['id','name','email'], through: { attributes: [] } }
      ],
      order: [['createdAt','DESC']]
    });

    // optional: filter to projects where user is member/owner
    const filtered = projects.filter(p => {
      if (p.ownerId === user.id) return true;
      const members = p.members || [];
      return members.some(m => m.id === user.id);
    });

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching projects' });
  }
}

async function getProjectById(req, res) {
  try {
    const project = await models.Project.findByPk(req.params.id, {
      include: [
        { model: models.User, as: 'owner', attributes: ['id','name','email'] },
        { model: models.User, as: 'members', attributes: ['id','name','email'], through: { attributes: [] } },
        { model: models.Task },
        { model: models.Message }
      ]
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching project' });
  }
}

async function updateProject(req, res) {
  try {
    const project = await models.Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await project.update(req.body);
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update project' });
  }
}

async function deleteProject(req, res) {
  try {
    const project = await models.Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await project.destroy();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete project' });
  }
}

async function addMember(req, res) {
  try {
    const project = await models.Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const { userId } = req.body;
    const user = await models.User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await project.addMember(user);
    res.json({ message: 'Member added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add member' });
  }
}

async function removeMember(req, res) {
  try {
    const project = await models.Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const { userId } = req.body;
    const user = await models.User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await project.removeMember(user);
    res.json({ message: 'Member removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove member' });
  }
}

module.exports = {
  createProject, getProjects, getProjectById, updateProject, deleteProject, addMember, removeMember
};
