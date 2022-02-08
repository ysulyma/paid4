import {promises as fsp} from "fs";
import {Donation, Hearing, Industry, Person} from "./db/models";
import {Op} from "sequelize";

const timestamps = ["createdAt", "updatedAt"];

export async function watch(req, res, next) {
  res.render("watch", {req});
}

export async function player(req, res, next) {
  const industries = await Industry.findAll({attributes: {exclude: timestamps}});
  const senators = await Person.findAll({
    attributes: {exclude: timestamps},
    where: {
      body: "senate",
      lastName: ["Hagerty", "Kennedy", "Scott", "Tester", "Toomey", "Warnock", "Warren", "Cramer", "Moran"],
      firstName: {[Op.not]: "Rick"}
    }
  });
  const donations = await Donation.findAll({
    attributes: {exclude: timestamps},
    where: {
      personId: senators.map(_ => _.id)
    }
  });
  
  const hearing = await Hearing.findOne({
    attributes: {exclude: timestamps}
  });
  
  const times = hearing.data;

  res.render("player", {data: {donations, industries, times, senators}});
}