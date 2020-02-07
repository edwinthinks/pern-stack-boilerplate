'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Jake',
      lastName: 'The Dog',
      email: 'jake@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Finn',
      lastName: 'The Human',
      email: 'finn@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
