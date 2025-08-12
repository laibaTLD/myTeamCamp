// src/models/task.model.js
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Task extends Model {
  static initModel(sequelize) {
    Task.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('todo', 'in-progress', 'done'),
        defaultValue: 'todo',
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium',
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'Task',
      tableName: 'Tasks',
      timestamps: true,
    });
    return Task;
  }

  static associate(models) {
    // Task belongs to Project
    Task.belongsTo(models.Project, { foreignKey: 'projectId' });

    // Task belongs to User as assignedTo
    Task.belongsTo(models.User, { foreignKey: 'assignedToId', as: 'assignedTo' });
  }
}

module.exports = Task;


module.exports = Task;
