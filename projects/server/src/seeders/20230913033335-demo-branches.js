'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Branches', [
      {
        name: 'Cabang 1',
        longitude: 106.8257, // Jakarta's longitude
        latitude: -6.1751,   // Jakarta's latitude
        branchAddress: 'Jl. Sudirman No. 123',
        branchCity: 'Jakarta Pusat',
        branchProvince: 'DKI Jakarta',
        id_admin: 1, // Replace with the actual admin ID you want to associate with this branch
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cabang 2',
        longitude: 112.7510, // Surabaya's longitude
        latitude: -7.2575,   // Surabaya's latitude
        branchAddress: 'Jl. Panglima Sudirman No. 456',
        branchCity: 'Surabaya',
        branchProvince: 'Jawa Timur',
        id_admin: 2, // Replace with the actual admin ID you want to associate with this branch
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cabang 3',
        longitude: 110.3666, // Yogyakarta's longitude
        latitude: -7.7975,   // Yogyakarta's latitude
        branchAddress: 'Jl. Malioboro No. 789',
        branchCity: 'Yogyakarta',
        branchProvince: 'DI Yogyakarta',
        id_admin: 3, // Replace with the actual admin ID you want to associate with this branch
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Branches', null, {});
  }
};
