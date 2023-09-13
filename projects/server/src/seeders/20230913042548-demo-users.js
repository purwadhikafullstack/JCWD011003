'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash('User1!', 10); // Replace 'your_password_here' with the actual password

    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        gender: true, // Male
        avatar: 'avatar1.jpg', // Replace with the actual avatar filename
        referral: 'ABCD123', // Replace with the actual referral code
        password: hashedPassword, // Use the hashed password here
        birthday: new Date('1990-01-15'), // Replace with the actual birthday
        isVerified: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        gender: false, // Female
        avatar: 'avatar2.jpg', // Replace with the actual avatar filename
        referral: 'EFGH456', // Replace with the actual referral code
        password: hashedPassword, // Use the hashed password here
        birthday: new Date('1985-05-20'), // Replace with the actual birthday
        isVerified: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
