'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Address extends Model {
    static associate(models) {
      // define association here
      User_Address.belongsTo(models.User, { foreignKey: 'id_user' });
    }
  };

  User_Address.init({
    userName: DataTypes.STRING,
    userAddress: DataTypes.STRING,
    userCity: DataTypes.STRING,
    userProvince: DataTypes.STRING,
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    id_user: DataTypes.INTEGER,
    isMain: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
    isSelected: {
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
    modelName: 'User_Address',
  });
  return User_Address;
};
