'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
      name: "Pecel lele",
      description: "pecel lele description",
      categoryId: 1,
      price: 25000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
     },
      {
      name: "Pecel lontong",
      description: "pecel lontong description",
      categoryId: 1,
      price: 12000,
      stock: 15,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
