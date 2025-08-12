// src/models/notification.model.js
const { DataTypes, Model } = require('sequelize');

class Notification extends Model {
  static initModel(sequelize) {
    Notification.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      type: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: true },
      isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
      sequelize,
      modelName: 'Notification',
      tableName: 'notifications',
      timestamps: true
    });
    return Notification;
  }
}

module.exports = Notification;
