'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transaction_Vouchers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user_voucher: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User_Vouchers', 
          key: 'id', 
        },
      },
      id_transaction: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Transaction', 
          key: 'id', 
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transaction_Vouchers');
  },
};
