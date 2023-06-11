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
    return queryInterface.bulkInsert('User', [
      {
        id: 1,
        fullname: "Manuel González", 
        email: "manuel@manuel.com",
        password: encryptedPassword, 
        role: "dentist", 
        nif: "18645413Y", 
        direction: "C/ playa 25", 
        age:"35",
        phone: "676343883", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 2,
        fullname: "Rominda Gúzman", 
        email: "rominda@rominda.com",
        password: encryptedPassword, 
        role: "dentist", 
        nif: "21645613Z", 
        direction: "C/ inventada 45", 
        age:"38",
        phone: "696657384", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 3,
        fullname: "Patricia Roman", 
        email: "roma@roma.com",
        password: encryptedPassword, 
        role: "3", 
        nif: "24645143Y", 
        direction: "C/ server 26", 
        age:"28",
        phone: "666573883", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 4,
        fullname: "José Roman", 
        email: "jose@jose.com",
        password: encryptedPassword, 
        role: "3", 
        nif: "26644513Y", 
        direction: "C/ server 26", 
        age:"28",
        phone: "636573883", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 5,
        fullname: "Lorena García", 
        email: "lore@lore.com",
        password: encryptedPassword, 
        role: "3", 
        nif: "27364513X", 
        direction: "C/ inventada 100", 
        age:"30",
        phone: "676657388", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 6,
        fullname: "Alberto Ramón", 
        email: "alberto@alberto.com",
        password: encryptedPassword, 
        role: "3", 
        nif: "27368852X", 
        direction: "C/ inventada 150", 
        age:"40",
        phone: "676388858", 
        updatedAt: new Date(),
        createdAt: new Date()
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
