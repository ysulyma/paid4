'use strict';
const  { Industry, Person} = require("../models");

/*
  Donations from members of Senate Banking Committee for demo
  
  Taken from OpenSecrets for demo purposes. To make this a real app you'd need to get API permission from them.
*/

module.exports = {
  async up (queryInterface, Sequelize) {
    const OG = await Industry.findOne({where: {name: "Oil & Gas"}});

    const Toomey = await Person.findOne({where: {lastName: "Toomey"}}); // N00001489
    const Kennedy = await Person.findOne({where: {lastName: "Kennedy", firstName: "John"}}); // N00026823
    const Warnock = await Person.findOne({where: {lastName: "Warnock"}}); // N00046489
    const Warren = await Person.findOne({where: {lastName: "Warren", firstName: "Elizabeth"}}); // N00033492
    const Tester = await Person.findOne({where: {lastName: "Tester", firstName: "Jon"}}); // N00027605
    const Scott = await Person.findOne({where: {lastName: "Scott", firstName: "Tim"}}); // N00031782
    const Hagerty = await Person.findOne({where: {lastName: "Hagerty", firstName: "Bill"}}); // N00045369

    await queryInterface.bulkInsert("Donations", [
      {personId: Toomey.id, amount: 82974, industryId: OG.id},
      {personId: Kennedy.id, amount: 356769, industryId: OG.id},
      {personId: Warnock.id, amount: 30059, industryId: OG.id},
      {personId: Warren.id, amount: 44178, industryId: OG.id},
      {personId: Tester.id, amount: 69021, industryId: OG.id},
      {personId: Scott.id, amount: 169145, industryId: OG.id},
      {personId: Hagerty.id, amount: 156996, industryId: OG.id}
    ]);
  },

  async down (queryInterface, Sequelize) {
  }
};
