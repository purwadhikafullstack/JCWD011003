'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: 'id_user' });
      Transaction.belongsTo(models.User_Address, { foreignKey: 'id_user_address' });
      Transaction.belongsTo(models.Transaction_Status, { foreignKey: 'id_status' });
      Transaction.belongsToMany(models.Stock, { through: 'Transaction_Stock', foreignKey: 'id_transaction' });
      Transaction.hasMany(models.Transaction_Voucher, { foreignKey: 'id_transaction' });
    }
  }

  Transaction.init(
    {
      id_user: DataTypes.INTEGER,
      id_user_address: DataTypes.INTEGER,
      totPrice: DataTypes.FLOAT,
      totQty: DataTypes.INTEGER,
      totWeight: DataTypes.FLOAT,
      id_status: {
        type: DataTypes.INTEGER,
        defaultValue: 1, 
      },
      shipper: DataTypes.STRING,
      shippingMethod: DataTypes.STRING,
      shippingCost: DataTypes.INTEGER,
      arrivalEstEarly: DataTypes.DATE,
      arrivalEstLate: DataTypes.DATE,
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'Transaction',
    }
  );

  return Transaction;
};
