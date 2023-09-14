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
        description: 'En nuestra clínica dental, la primera consulta es gratuita. Nuestro equipo profesional altamente capacitado te ofrecerá una evaluación de tu salud oral y responderá a tus preguntas. Estamos aquí para brindarte un servicio excepcional desde el primer momento.',
        image: "https://laravel-akdemyproject-production.up.railway.app/images/consulta.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Limpieza dental',
        price: '40',
        duration: '30min',
        description: 'La limpieza dental es esencial para la salud bucal, implica la eliminación de placa y sarro, el pulido dental y la orientación sobre la higiene oral. Se recomienda cada seis meses para prevenir caries y enfermedades de las encías, y mantener una sonrisa saludable.',
        image: "https://laravel-akdemyproject-production.up.railway.app/images/cleaning.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Blanqueamiento dental',
        price: '100',
        duration: '45min',
        description: 'Nuestro tratamiento de blanqueamiento dental ofrece una emocionante oportunidad para transformar tu sonrisa. Disfrutarás de una sonrisa más brillante y radiante. Nuestro procedimiento es seguro y no invasivo. Logra una sonrisa renovada y llena de confianza con nuestro tratamiento de blanqueamiento dental.',
        image: "https://laravel-akdemyproject-production.up.railway.app/images/blanqueamiento.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Extracción de diente',
        price: '49',
        duration: '50min',
        description: 'Realizamos extracciones dentales con precisión y cuidado. Nuestro equipo altamente capacitado utiliza técnicas avanzadas y equipos modernos para garantizar comodidad y seguridad. Ya sea un diente dañado, de leche o una muela del juicio, estamos comprometidos con tu salud bucal y comodidad.',
        image: "https://laravel-akdemyproject-production.up.railway.app/images/extraccion.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'Implantes dentales',
        price: '120',
        duration: '60min',
        description: 'En nuestra clínica dental, ofrecemos implantes dentales para restaurar tu sonrisa de manera segura y efectiva. Nuestro equipo de especialistas utilizan tecnología avanzada y materiales de alta calidad para resultados duraderos y naturales. Nos preocupamos por tu salud bucal, brindando atención personalizada en todo el proceso.',
        image: "https://laravel-akdemyproject-production.up.railway.app/images/implantes.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: 'Prótesis dentales',
        price: '79',
        duration: '50min',
        description: 'Nuestras prótesis dentales son la solución perfecta para restaurar la funcionalidad y estética de tu sonrisa. Contamos con un equipo de expertos en prótesis dentales que se dedica a proporcionar soluciones personalizadas y de alta calidad. Te guiaremos en todo el proceso de adaptación y cuidado de tus prótesis dentales.',
        image: "https://laravel-akdemyproject-production.up.railway.app/images/protesis.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: 'Tratamiento de conducto',
        price: '50',
        duration: '60min',
        description: 'Nuestro tratamiento de conducto, también conocido como endodoncia, es una solución efectiva para salvar dientes dañados. Contamos con especialistas altamente capacitados que utilizan tecnología de vanguardia para realizar procedimientos de endodoncia de manera precisa y cómoda.',
        image: "https://laravel-akdemyproject-production.up.railway.app/images/conducto.png",
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
