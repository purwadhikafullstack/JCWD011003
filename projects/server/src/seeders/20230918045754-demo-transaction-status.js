'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the statuses in English
    const statuses = [
      { status: 'Waiting for Payment' },
      { status: 'Waiting for Payment Confirmation' },
      { status: 'Processing' },
      { status: 'Shipped' },
      { status: 'Order Confirmed' },
      { status: 'Canceled' },
    ];

    // Seed the Transaction_Status table
    await queryInterface.bulkInsert('Transaction_Statuses', statuses, {});

    // Add timestamps for createdAt and updatedAt
    await queryInterface.bulkUpdate(
      'Transaction_Statuses',
      { createdAt: new Date(), updatedAt: new Date() },
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Transaction_Statuses', null, {});
  },
};
