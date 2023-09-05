'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      idproduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      productImg: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      id_category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Product_Categories', 
          key: 'id',
        },
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  },
};
