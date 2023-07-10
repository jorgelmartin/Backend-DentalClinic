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
    return queryInterface.bulkInsert('Services', [
      {
        id: 1,
        name: 'Consulta',
        price: null,
        duration: '15min',
        image: "http://localhost:4000/img/consulta.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Dental cleaning',
        price: '40',
        duration: '30min',
        image: "http://localhost:4000/img/cleaning.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Teeth whitening',
        price: '100',
        duration: '45min',
        image: "http://localhost:4000/img/blanqueamiento.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Tooth extraction',
        price: '49',
        duration: '30min',
        image: "http://localhost:4000/img/extraccion.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'Dental implants',
        price: '120',
        duration: '60min',
        image: "http://localhost:4000/img/implantes.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: 'Dental prosthetics',
        price: '79',
        duration: '50min',
        image: "http://localhost:4000/img/protesis.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: 'Root canal treatment',
        price: '50',
        duration: '60min',
        image: "http://localhost:4000/img/conducto.png",
        createdAt: new Date(),
        updatedAt: new Date(),
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
