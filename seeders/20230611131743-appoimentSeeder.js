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
    return queryInterface.bulkInsert('appointment', [
      {
        id: 1,
        patient_id: '3',
        dentist_id: '1',
        service_id:'1',
        date: '24/06/2023',
        hour:'14:30',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        patient_id: '4',
        dentist_id: '1',
        service_id:'3',
        date: '25/02/2023',
        hour:'10:30',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        patient_id: '5',
        dentist_id: '2',
        service_id:'2',
        date: '17/01/2023',
        hour:'12:00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        patient_id: '6',
        dentist_id: '2',
        service_id:'4',
        date: '13/06/2023',
        hour:'13:00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
