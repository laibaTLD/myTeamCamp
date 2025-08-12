// src/models/file.model.js
const { DataTypes, Model } = require('sequelize');

class File extends Model {
  static initModel(sequelize) {
    File.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      fileName: { type: DataTypes.STRING, allowNull: false },
      fileUrl: { type: DataTypes.STRING, allowNull: false },
      fileType: { type: DataTypes.STRING, allowNull: true }
    }, {
      sequelize,
      modelName: 'File',
      tableName: 'files',
      timestamps: true
    });
    return File;
  }
}

module.exports = File;
