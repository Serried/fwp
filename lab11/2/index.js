const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(session({
  secret: "restaurant-secret",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {

  const API = "http://webdev.it.kmitl.ac.th:4000/restaurant";
  const response = await fetch(API);
  const data = await response.json();

  res.render("index", { data });

});

app.get("/add/:id", (req, res) => {

  const id = req.params.id;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  req.session.cart.push(id);

  res.redirect("/cart");

});

app.get("/cart", async (req, res) => {

  const cart = req.session.cart || [];

  let foods = [];
  let total = 0;

  for (let id of cart) {

    const response = await fetch(`http://webdev.it.kmitl.ac.th:4000/detail/${id}`);
    const data = await response.json();

    foods.push(data);
    total += data.price;
  }

  res.render("cart", { foods, total });

});

app.post("/checkout", (req, res) => {

  req.session.cart = [];

  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});