'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: 'id_user' });
      Cart.belongsToMany(models.Stock, { through: 'Cart_Stock', foreignKey: 'id_cart' });
    }
  }
  Cart.init({
    id_user: DataTypes.INTEGER,
    totPrice: DataTypes.INTEGER,
    totQty: DataTypes.INTEGER,
    totWeight: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};