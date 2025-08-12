// src/models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/db'); // your Sequelize instance setup file

// Import all models
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

// Setup associations
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

// Export models and sequelize connection
module.exports = {
  ...models,
  sequelize,
  Sequelize,
};
