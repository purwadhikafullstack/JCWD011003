'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Branches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      longitude: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.STRING,
      },
      branchAddress: {
        type: Sequelize.STRING,
      },
      branchCity: {
        type: Sequelize.STRING,
      },
      branchProvince: {
        type: Sequelize.STRING,
      },
      id_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Admins', 
          key: 'id', 
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true, 
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Branches');
  },
};
