// src/models/message.model.js
const { DataTypes, Model } = require('sequelize');

class Message extends Model {
  static initModel(sequelize) {
    Message.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      content: { type: DataTypes.TEXT, allowNull: false },
      attachments: { 
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Message',
      tableName: 'messages',
      timestamps: true
    });
    return Message;
  }
}

module.exports = Message;
