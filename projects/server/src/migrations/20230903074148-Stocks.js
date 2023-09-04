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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_branch: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Branches', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      discount_percent: {
        type: Sequelize.INTEGER,
        defaultValue: '0', 
      },
      id_stock_promo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stock_Promos', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stocks');
  },
};
