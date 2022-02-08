/**
 * @file Entry point for application.
 */
import express from "express";
import * as http from "http";
import * as path from "path";
// const reload = require("require-nocache")(module);

const app = express();
if (app.get("env") === "production" && process.env.HEROKU) {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else
      next();
  });
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

process.env.ROOT = __dirname;

app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));

const dev = require("./dev");
app.use("/player", dev.player);
app.use(dev.watch);

/* bind to port */
app.set("port", process.env.PORT);
app.listen(app.get("port"));

if ("development" === app.get("env")) {
  console.log(`Server listening on port ${app.get("port")}`);
}
