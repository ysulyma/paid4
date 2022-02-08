'use strict';
const fs = require("fs");

const localIds = {
  "N00004614": 1787, // Cramer
  "N00005282": 1825, // Moran
  "N00001489": 1855, // Toomey
  "N00026823": 1811, // Kennedy
  "N00046489": 1859, // Warnock
  "N00033492": 1860, // Warren
  "N00027605": 1852, // Tester
  "N00031782": 1845, // Scott
  "N00045369": 1799, // Hagerty
};

const {Person} = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    /* oh no */
    const people = await Person.findAll({
      where: {openSecrets: Object.keys(localIds)}
    });
    const oldToNew = {};
    for (const key in localIds) {
      const person = people.find(_ => _.openSecrets === key);
      oldToNew[localIds[key]] = person.id
    }
    const data = JSON.parse(fs.readFileSync(`${__dirname}/../../annotated.json`, "utf8"));

    for (const item of data) {
      if (item.speaker === null)
        continue;
      
      item.speaker = oldToNew[item.speaker];
    }

    await queryInterface.bulkInsert("Hearings", [{
      url: "https://www.banking.senate.gov/hearings/01/25/2022/nomination-hearing",
      data: JSON.stringify(data)
    }]);
  },

  async down(queryInterface, Sequelize) {
  }
};
