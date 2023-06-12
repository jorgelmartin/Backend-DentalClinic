'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('UserRoles', [
      {
        id: 1,
        user_id: '1',
        role_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id: '2',
        role_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id: '3',
        role_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id: '4',
        role_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        user_id: '5',
        role_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        user_id: '6',
        role_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
