// src/models/index.js
const sequelize = require('../config/db');
const User = require('./user.model');
const Project = require('./project.model');
const Task = require('./task.model');
const Message = require('./message.model');
const File = require('./file.model');
const Notification = require('./notification.model');

// Initialize models
const models = {
  User: User.initModel(sequelize),
  Project: Project.initModel(sequelize),
  Task: Task.initModel(sequelize),
  Message: Message.initModel(sequelize),
  File: File.initModel(sequelize),
  Notification: Notification.initModel(sequelize),
};

// Associations

// User <-> Project (owner)
models.Project.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' });
models.User.hasMany(models.Project, { as: 'ownedProjects', foreignKey: 'ownerId' });

// Project <-> Members (many-to-many via ProjectMembers)
models.Project.belongsToMany(models.User, { through: 'ProjectMembers', as: 'members' });
models.User.belongsToMany(models.Project, { through: 'ProjectMembers', as: 'memberProjects' });

// Project <-> Task
models.Task.belongsTo(models.Project, { foreignKey: 'projectId' });
models.Project.hasMany(models.Task, { foreignKey: 'projectId' });

// Task <-> assignedTo (User)
models.Task.belongsTo(models.User, { as: 'assignedTo', foreignKey: 'assignedToId' });
models.User.hasMany(models.Task, { as: 'assignedTasks', foreignKey: 'assignedToId' });

// Message -> Project & Author
models.Message.belongsTo(models.Project, { foreignKey: 'projectId' });
models.Project.hasMany(models.Message, { foreignKey: 'projectId' });
models.Message.belongsTo(models.User, { as: 'author', foreignKey: 'authorId' });

// File -> Project & uploadedBy
models.File.belongsTo(models.Project, { foreignKey: 'projectId' });
models.Project.hasMany(models.File, { foreignKey: 'projectId' });
models.File.belongsTo(models.User, { as: 'uploadedBy', foreignKey: 'uploadedById' });

// Notification -> User
models.Notification.belongsTo(models.User, { foreignKey: 'userId' });
models.User.hasMany(models.Notification, { foreignKey: 'userId' });

models.sequelize = sequelize;
models.Sequelize = require('sequelize');

module.exports = models;
