'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id', 
        },
      },
      id_user_address: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User_Address', 
          key: 'id', 
        },
      },
      totPrice: {
        type: Sequelize.FLOAT,
      },
      totQty: {
        type: Sequelize.INTEGER,
      },
      totWeight: {
        type: Sequelize.FLOAT,
      },
      id_status: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Transaction_Status', 
          key: 'id', 
        },
      },
      shipper: {
        type: Sequelize.STRING,
      },
      shippingMethod: {
        type: Sequelize.STRING,
      },
      shippingCost: {
        type: Sequelize.INTEGER,
      },
      arrivalEstEarly: {
        type: Sequelize.DATE,
      },
      arrivalEstLate: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  },
};
