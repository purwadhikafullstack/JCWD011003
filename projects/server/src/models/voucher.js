'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    static associate(models) {
      // define associations here
      Voucher.hasMany(models.User_Voucher, { foreignKey: 'id_voucher' });
    }
  }

  Voucher.init(
    {
      name: DataTypes.STRING,
      details: DataTypes.STRING,
      discountPercent: DataTypes.INTEGER,
      timeValid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Voucher',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      timestamps: true,
    }
  );

  return Voucher;
};
