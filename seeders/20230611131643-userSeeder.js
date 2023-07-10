'use strict';

const bcrypt = require('bcrypt');

const password = "123456";
const newPassword = bcrypt.hashSync(password,8);

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
   const bcrypt = require ('bcrypt');
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: "Manuel", 
        lastname: "González",
        email: "usuario@gmail.com",
        password: bcrypt.hashSync(newPassword, 8), 
        role_id: 2, 
        dni: "18645413Y", 
        address: "C/ playa 25", 
        age:"35",
        phone: "676343883", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Rominda", 
        lastname: "Gúzman",
        email: "rominda@rominda.com",
        password: newPassword, 
        role_id: 2, 
        dni: "21645613Z", 
        address: "C/ inventada 45", 
        age:"38",
        phone: "696657384", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 3,
        name: "Patricia", 
        lastname: "Roman",
        email: "roma@roma.com",
        password: newPassword, 
        role_id: 3, 
        dni: "24645143Y", 
        address: "C/ server 26", 
        age:"28",
        phone: "666573883", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 4,
        name: "José", 
        lastname: "Roman",
        email: "jose@jose.com",
        password: newPassword, 
        role_id: 3, 
        dni: "26644513Y", 
        address: "C/ server 26", 
        age:"28",
        phone: "636573883", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 5,
        name: "Lorena", 
        lastname: "García",
        email: "lore@lore.com",
        password: newPassword, 
        role_id: "3", 
        dni: "27364513X", 
        address: "C/ inventada 100", 
        age:"30",
        phone: "676657388", 
        updatedAt: new Date(), 
        createdAt: new Date(),
      },
      {
        id: 6,
        name: "Alberto", 
        lastname: "Ramón",
        email: "alberto@alberto.com",
        password: newPassword, 
        role_id: "3", 
        dni: "27368852X", 
        address: "C/ inventada 150", 
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
