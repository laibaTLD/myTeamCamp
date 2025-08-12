// src/models/project.model.js
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Project extends Model {
  static initModel(sequelize) {
    Project.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'archived'),
        defaultValue: 'active',
      },
    }, {
      sequelize,
      modelName: 'Project',
      tableName: 'Projects',
      timestamps: true,
    });
    return Project;
  }

  static associate(models) {
    // Project belongs to User (owner)
    Project.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });

    // Many-to-many: Project <-> User (members)
    const ProjectMembers = sequelize.define('ProjectMembers', {}, { timestamps: false });
    Project.belongsToMany(models.User, { through: ProjectMembers, as: 'members', foreignKey: 'projectId' });
    models.User.belongsToMany(Project, { through: ProjectMembers, as: 'projects', foreignKey: 'userId' });
  }
}

module.exports = Project;
