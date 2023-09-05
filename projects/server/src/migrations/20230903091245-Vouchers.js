'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vouchers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(45),
      },
      details: {
        type: Sequelize.STRING(45),
      },
      discountPercent: {
        type: Sequelize.INTEGER,
      },
      timeValid: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vouchers');
  },
};
