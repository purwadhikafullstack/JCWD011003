'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cart_Stock', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_cart: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Carts', 
          key: 'id', 
        },
      },
      id_stock: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stocks', 
          key: 'id', 
        },
      },
      price: {
        type: Sequelize.INTEGER,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cart_Stock');
  },
};
