'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stock_Promos', [
      {
        promoName: 'Promo 1',
        buyQty: 1,
        getQty: 1,
        promoDescription: 'This is the first promo.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promoName: 'Promo 2',
        buyQty: 2,
        getQty: 1,
        promoDescription: 'This is the second promo.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promoName: 'Promo 3',
        buyQty: 3,
        getQty: 2,
        promoDescription: 'This is the third promo.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stock_Promos', null, {});
  }
};
