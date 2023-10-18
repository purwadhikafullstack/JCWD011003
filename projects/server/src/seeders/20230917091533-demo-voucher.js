'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample voucher data
    const vouchers = [
      {
        name: '10% Off',
        details: 'Get 10% off on your purchase',
        discountPercent: 10,
        timeValid: 30, // Valid for 30 days
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '20% Off',
        details: 'Enjoy a 20% discount on selected items',
        discountPercent: 20,
        timeValid: 45, // Valid for 45 days
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more voucher data as needed
    ];

    // Insert the voucher data into the 'Vouchers' table
    await queryInterface.bulkInsert('Vouchers', vouchers, {});

    // You can add additional seed data or logic here if needed

    return true;
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data if needed
    await queryInterface.bulkDelete('Vouchers', null, {});
    return true;
  },
};
