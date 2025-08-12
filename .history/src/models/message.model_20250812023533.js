// src/models/message.model.js
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Message extends Model {
  static initModel(sequelize) {
    Message.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      attachments: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'Message',
      tableName: 'Messages',
      timestamps: true,
    });
    return Message;
  }

  static associate(models) {
    // Message belongsTo Project
    Message.belongsTo(models.Project, { foreignKey: 'projectId' });
    // Message belongsTo User as author
    Message.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
  }
}

module.exports = Message;


module.exports = Message;
