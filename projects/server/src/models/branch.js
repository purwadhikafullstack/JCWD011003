'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) {
      // define association here
      Branch.belongsTo(models.Admin, { foreignKey: 'id_admin' });
      Branch.hasMany(models.Stock, { foreignKey: 'id_branch' });
    }
  };
  Branch.init({
    name: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    branchAddress: DataTypes.STRING,
    branchCity: DataTypes.STRING,
    branchProvince: DataTypes.STRING,
    id_admin: DataTypes.INTEGER,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Branch',
  });
  return Branch;
};