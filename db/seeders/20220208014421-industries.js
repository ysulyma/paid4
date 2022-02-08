'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Industries", [
      {name: "Oil & Gas", keywords: JSON.stringify(["energy", "gas", "oil"])}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Industries", null, {});
  }
};
