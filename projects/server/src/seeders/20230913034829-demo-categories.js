'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        category: 'Electronics',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'Clothing',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'Books',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
