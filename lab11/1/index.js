const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

let db = new sqlite3.Database('customers.db');

app.get("/", (req, res) => {

  let randomized = Math.floor(Math.random() * 21)

  const q = `
  SELECT * FROM customers
  WHERE CustomerId = ?
  `

  db.get(q, [randomized], (e, row) => {

    if (e) {
      console.error(e.message)
    }

    res.render("index", { data: row })

  })

})

app.get("/clear-form",(req,res)=>{
  res.render("index",{data:{}})
})

app.post("/show-data", (req, res) => {
    const cookies = req.cookies.customer
    if (!cookies) {
      return res.render('index', {data: {}})
    }
  res.render('index', {data: cookies});
})

app.post("/set-cookie", (req, res) => {

  const { id, first, last, address, email, phone } = req.body

  const customer = {
    CustomerId: id,
    FirstName: first,
    LastName: last,
    Address: address,
    Email: email,
    Phone: phone
  }

  res.cookie("customer", customer, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  })

  res.redirect("/clear-form")

})

app.post("/clear-cookie", (req, res) => {
  res.clearCookie('customer', {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict'
  })
  res.render('index', {data: {}})
})

app.listen(port, () => {
  console.log(`Starting server at port ${port}`)
})