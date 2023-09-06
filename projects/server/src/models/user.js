'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
    referral: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    referred_by: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize, // Pass the Sequelize instance here
    modelName: 'User',
    timestamps: true, // This enables the createdAt and updatedAt columns
  });

  return User;
};
