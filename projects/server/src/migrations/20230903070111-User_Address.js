'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Address', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userAddress: {
        type: Sequelize.STRING,
      },
      userCity: {
        type: Sequelize.STRING,
      },
      userProvince: {
        type: Sequelize.STRING,
      },
      longitude: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.STRING,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id', 
        },
      },
      isMain: {
        type: Sequelize.BOOLEAN
      },
      isSelected: {
        type: Sequelize.BOOLEAN
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Address');
  },
};
