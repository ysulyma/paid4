'use strict';
const {JSDOM} = require("jsdom");
const SENATOR_LIST = "https://www.senate.gov/general/contact_information/senators_cfm.xml";
const REP_LIST = "https://www.house.gov/representatives"

const openSecretsIds = {
  Cramer: "N00004614",
  Moran: "N00005282",
  Toomey: "N00001489",
  Kennedy: "N00026823",
  Warnock: "N00046489",
  Warren: "N00033492",
  Tester: "N00027605",
  Scott: "N00031782",
  Hagerty: "N00045369"
};

module.exports = {
  async up (queryInterface, Sequelize) {
    const people = [];
    const reps = await getReps();
    const senators = await getSenators();
    await queryInterface.bulkInsert("People", [...reps, ...senators]);
  },

  async down (queryInterface, Sequelize) {
  }
};

async function getReps() {
  const {default: fetch} = await import("node-fetch");
  const people = [];
  const html = await fetch(REP_LIST).then(res => res.text());
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const members = Array.from(document.querySelectorAll("table[id^='housegov_reps_by_state'] tbody > tr"));
  for (const member of members) {
    const [lastName, firstName] = member.querySelector("td:nth-child(2) > a").textContent.trim().split(",");
    const party = member.querySelector("td:nth-child(3)").textContent.trim();
    const state = member.parentElement.parentElement.querySelector("caption").textContent.trim();

    people.push({firstName, lastName, party, state, body: "house"});
  }

  return people;
}

async function getSenators() {
  const {default: fetch} = await import("node-fetch");
  const people = [];
  const xml = await fetch(SENATOR_LIST).then(res => res.text());
  const dom = new JSDOM(xml);
  const document = dom.window.document;

  const members = Array.from(document.querySelectorAll("member"));
  for (const member of members) {
    const firstName = member.querySelector("first_name").textContent;
    const lastName = member.querySelector("last_name").textContent;
    const party = member.querySelector("party").textContent;
    const state = member.querySelector("state").textContent;

    const person = {firstName, lastName, party, state, body: "senate"};
    // lmao
    if (person.lastName in openSecretsIds && person.firstName !== "Rick") {
      person.openSecrets = openSecretsIds[person.lastName];
    }

    people.push(person);
  }
  return people;
}