const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();


// Connect to SQLite database
let db = new sqlite3.Database('orders.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path
app.get('/', (req, res) => {
    
    const q = 
    `
    SELECT * FROM orders
    `
    db.all(q, (e, rows) => {
        if (e) {
            console.error(e)
        }   
        res.render('index', {data: rows})
        console.table(rows);

    })
    
})

app.post('/add', (req, res) => {

    const {
        customer,
        product,
        address,
        contact
    } = req.body;

    const q = `
    INSERT INTO orders (customer, product, address, contact)
    VALUES (?, ?, ?, ?)
    `;

    db.run(q, [customer, product, address, contact], (e) => {
        if (e) {
            console.log(e)
        }
        res.redirect('/');
    });
});

app.post('/update', (req, res) => {
    let {
        status,
        orderID
    } = req.body;

    const q = 
    `
    UPDATE orders
    SET status = ?
    WHERE orderID = ?
    `

    db.run(q, [status, orderID], (e) => {
        if (e) {
            console.error(e.message);
        }
        res.redirect('/');
    })
})

// Starting the server
app.listen(port, () => {
   console.log("Server started.");
 });