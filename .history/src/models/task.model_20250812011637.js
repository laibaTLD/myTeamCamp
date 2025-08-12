// src/models/task.model.js
const { DataTypes, Model } = require('sequelize');

class Task extends Model {
  static initModel(sequelize) {
    Task.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('todo','in-progress','done'), defaultValue: 'todo' },
      priority: { type: DataTypes.ENUM('low','medium','high'), defaultValue: 'medium' },
      dueDate: { type: DataTypes.DATE, allowNull: true }
    }, {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: true
    });
    return Task;
  }
}

module.exports = Task;
