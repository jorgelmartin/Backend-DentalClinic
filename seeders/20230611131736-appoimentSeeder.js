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
    return queryInterface.bulkInsert('Appointments', [
      // {
      //   id: 1,
      //   patient_id: '3',
      //   dentist_id: '1',
      //   service_id:'1',
      //   date: '2023-06-11',
      //   hour:'14:30:00',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 2,
      //   patient_id: '4',
      //   dentist_id: '1',
      //   service_id:'3',
      //   date: '2023-02-13',
      //   hour:'10:30:00',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 3,
      //   patient_id: '5',
      //   dentist_id: '2',
      //   service_id:'2',
      //   date: '2022-11-04',
      //   hour:'12:00:00',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 4,
      //   patient_id: '6',
      //   dentist_id: '2',
      //   service_id:'4',
      //   date: '2022-09-15',
      //   hour:'09:00:00',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
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
