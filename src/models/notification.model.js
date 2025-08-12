// src/models/notification.model.js
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Notification extends Model {
  static initModel(sequelize) {
    Notification.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
      modelName: 'Notification',
      tableName: 'Notifications',
      timestamps: true,
    });
    return Notification;
  }

  static associate(models) {
    // Notification belongs to User
    Notification.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

module.exports = Notification;
