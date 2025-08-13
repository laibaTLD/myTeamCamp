// src/models/user.model.js
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class User extends Model {
  static initModel(sequelize) {
    User.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      name: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      email: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false,
        set(value) {
          this.setDataValue('email', value.toLowerCase());
        }
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      role: {
        type: DataTypes.ENUM('admin', 'team-lead', 'employee', 'member'),
        defaultValue: 'member',
      },
      avatarUrl: { 
        type: DataTypes.STRING, 
        allowNull: true 
      },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        }
      }
    });
    return User;
  }

  // Associations
  static associate(models) {
    // define associations here if needed
  }

  // Compare entered password with hashed password
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;
