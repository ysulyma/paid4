import {DataTypes, Sequelize} from "sequelize";

export const sqlz = new Sequelize(process.env.DATABASE_URL, {dialect: "postgres", logging: false });

export const Donation = require("./donation")(sqlz, DataTypes);
export const Hearing = require("./hearing")(sqlz, DataTypes);
export const Industry = require("./industry")(sqlz, DataTypes);
export const Person = require("./person")(sqlz, DataTypes);
