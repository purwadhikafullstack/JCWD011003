'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stock', [
      {
        id_product: 1,
        id_branch: 1,
        qty: 10,
        discountPercent: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_product: 2,
        id_branch: 1,
        qty: 15,
        discountPercent: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_product: 2,
        id_branch: 2,
        qty: 20,
        discountPercent: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_product: 3,
        id_branch: 2,
        qty: 12,
        discountPercent: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_product: 1,
        id_branch: 3,
        qty: 18,
        discountPercent: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_product: 3,
        id_branch: 3,
        qty: 22,
        discountPercent: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stock', null, {});
  }
};
