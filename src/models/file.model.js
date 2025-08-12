// src/models/file.model.js
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class File extends Model {
  static initModel(sequelize) {
    File.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // foreign keys will be added as associations below, so not defined here explicitly
    }, {
      sequelize,
      modelName: 'File',
      tableName: 'Files',
      timestamps: true, // createdAt, updatedAt
    });
    return File;
  }

  static associate(models) {
    // File belongsTo Project
    File.belongsTo(models.Project, { foreignKey: 'projectId' });
    // File belongsTo User as uploadedBy
    File.belongsTo(models.User, { foreignKey: 'uploadedById', as: 'uploadedBy' });
  }
}

module.exports = File;
