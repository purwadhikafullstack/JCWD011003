'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stocks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_product: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id', 
        },
      },
      id_branch: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Branches', 
          key: 'id', 
        },
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      discountPercent: {
        type: Sequelize.INTEGER,
        defaultValue: '0', 
      },
      id_stock_promo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stock_Promos', 
          key: 'id', 
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stocks');
  },
};
