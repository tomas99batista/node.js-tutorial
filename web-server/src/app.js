const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// paths for config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setups
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

// index
app.get("/", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "tomas batista",
  });
});

// about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "tomas batista",
  });
});

// help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "tomas batista",
    helpMessage: "switch on and off pls",
  });
});

// weather
app.get("/weather", (req, res) => {
  res.send({
    forecast: "rain",
    location: "viseu",
  });
});

// port
app.listen(3000, () => {
  console.log("server is up on port 3000.");
});
