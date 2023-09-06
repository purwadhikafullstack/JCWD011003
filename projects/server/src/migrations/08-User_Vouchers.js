'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Vouchers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_voucher: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vouchers', 
          key: 'id',
        },
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id', 
        },
      },
      isUsed: {
        type: Sequelize.BOOLEAN,
      },
      id_product: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products', 
          key: 'id', 
        },
      },
      validUntil: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Vouchers');
  },
};
