// src/models/project.model.js
const { DataTypes, Model } = require('sequelize');

class Project extends Model {
  static initModel(sequelize) {
    Project.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('active','archived'), defaultValue: 'active' }
    }, {
      sequelize,
      modelName: 'Project',
      tableName: 'projects',
      timestamps: true
    });
    return Project;
  }
}

module.exports = Project;
