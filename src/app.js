const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geocoding = require("./utils/geocoding");
const forecast = require("./utils/forecast");
const app = express();
const publicDirPath = path.join(__dirname, "../public");

const partialPath = path.join(__dirname, "../templates/partials");

const viewPath = path.join(__dirname, "../templates/views");
hbs.registerPartials(viewPath);
app.set("view engine", "hbs");
app.set("views", viewPath);

app.use(express.static(publicDirPath));
// app.get("", (req, res) => {
//   res.send("<h1>HELLO POOJA</h1>");
// });

app.get("/", (req, res) => {
  res.render("index", {
    title: "hey how are you",
    name: "Ayush",
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/help", (req, res) => {
  res.render("help");
});
app.get("/help/*", (req, res) => {
  res.send("help 404 page");
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({ products: [] });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  geocoding(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      //longi,latitude
      if (error) {
        return res.send({ error });
      }
      res.send({
        place: place,
        forecastData: forecastData,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("my 404 page");
});
app.listen(3000, () => {
  console.log("Running");
});
