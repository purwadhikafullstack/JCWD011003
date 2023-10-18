'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Carts', [
      {
        id_user: 1, // Replace with the actual user ID you want to associate with this cart
        totPrice: 0, // Replace with the total price for this cart
        totQty: 0, // Replace with the total quantity of items in this cart
        totWeight: 0, // Replace with the total weight of items in this cart
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_user: 2, // Replace with the actual user ID you want to associate with this cart
        totPrice: 0, // Replace with the total price for this cart
        totQty: 0, // Replace with the total quantity of items in this cart
        totWeight: 0, // Replace with the total weight of items in this cart
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {});
  }
};
