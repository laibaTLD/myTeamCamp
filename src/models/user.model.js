// src/models/user.model.js
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class User extends Model {
  static initModel(sequelize) {
    User.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM('admin', 'member', 'guest'),
        defaultValue: 'member',
      },
      avatarUrl: { type: DataTypes.STRING, allowNull: true },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
    });
    return User;
  }

  static associate(models) {
    // define associations here if needed
  }
}

module.exports = User;
