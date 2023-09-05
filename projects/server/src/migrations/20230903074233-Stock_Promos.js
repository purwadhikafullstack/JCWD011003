'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stock_Promos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      promoName: {
        type: Sequelize.STRING,
      },
      buyQty: {
        type: Sequelize.INTEGER,
      },
      getQty: {
        type: Sequelize.INTEGER,
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stock_Promos');
  },
};
