'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Product 1',
        price: '50.00',
        productImg: 'product1.jpg',
        description: 'This is the first product.',
        weight: 500, // in grams
        isActive: true,
        id_category: 1, // Replace with the actual category ID you want to associate with this product
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Product 2',
        price: '30.00',
        productImg: 'product2.jpg',
        description: 'This is the second product.',
        weight: 700, // in grams
        isActive: true,
        id_category: 2, // Replace with the actual category ID you want to associate with this product
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Product 3',
        price: '25.00',
        productImg: 'product3.jpg',
        description: 'This is the third product.',
        weight: 600, // in grams
        isActive: true,
        id_category: 3, // Replace with the actual category ID you want to associate with this product
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
