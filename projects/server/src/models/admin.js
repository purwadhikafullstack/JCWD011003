'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // define association here
      Admin.hasMany(models.Branch, { foreignKey: 'id_admin' });
      // Admin.belongsTo(models.Branch, { foreignKey: 'id_admin' });
    }
  };
  Admin.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    adminSuper: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};
