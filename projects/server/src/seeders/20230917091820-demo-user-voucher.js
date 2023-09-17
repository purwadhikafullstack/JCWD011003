'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample user voucher data
    const userVouchers = [
      {
        id_voucher: 1, // Voucher ID (adjust according to your actual voucher data)
        id_user: 1,    // User ID for the first user
        isUsed: false, // Voucher not used
        validUntil: new Date('2023-12-31'), // Valid until December 31, 2023
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_voucher: 2, // Voucher ID (adjust according to your actual voucher data)
        id_user: 1,    // User ID for the first user
        isUsed: false, // Voucher not used

        validUntil: new Date('2023-12-31'), // Valid until December 31, 2023
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_voucher: 1, // Voucher ID (adjust according to your actual voucher data)
        id_user: 2,    // User ID for the second user
        isUsed: false,  // Voucher used
        id_product: 2, // Product ID (adjust according to your actual product data)
        validUntil: new Date('2023-11-15'), // Valid until November 15, 2023
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_voucher: 2, // Voucher ID (adjust according to your actual voucher data)
        id_user: 2,    // User ID for the second user
        isUsed: false,  // Voucher used
        id_product: 2, // Product ID (adjust according to your actual product data)
        validUntil: new Date('2023-11-15'), // Valid until November 15, 2023
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // You can add more user voucher data as needed
    ];

    // Insert the user voucher data into the 'User_Vouchers' table
    await queryInterface.bulkInsert('User_Vouchers', userVouchers, {});

    // You can add additional seed data or logic here if needed

    return true;
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data if needed
    await queryInterface.bulkDelete('User_Vouchers', null, {});
    return true;
  },
};
