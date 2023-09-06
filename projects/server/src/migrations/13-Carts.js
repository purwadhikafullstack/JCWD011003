'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Users', 
          key: 'id', 
        },
      },
      totPrice: {
        type: Sequelize.INTEGER,
      },
      totQty: {
        type: Sequelize.INTEGER,
      },
      totWeight: {
        type: Sequelize.FLOAT,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Carts');
  },
};
