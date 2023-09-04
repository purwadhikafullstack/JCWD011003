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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_user_address: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User_Address', 
          key: 'id', 
        },
      },
      tot_price: {
        type: Sequelize.FLOAT,
      },
      tot_qty: {
        type: Sequelize.INTEGER,
      },
      id_status: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Transaction_Status', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      shipping: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  },
};
