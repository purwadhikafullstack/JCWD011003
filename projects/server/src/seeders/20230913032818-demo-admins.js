'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash('Admin1!', 10); // Replace 'your_password_here' with the actual password

    return queryInterface.bulkInsert('Admins', [
      {
        email: 'admin1@example.com',
        password: hashedPassword,
        adminSuper: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin2@example.com',
        password: hashedPassword,
        adminSuper: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin3@example.com',
        password: hashedPassword,
        adminSuper: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
