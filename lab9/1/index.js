const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('userdata.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static(path.join(__dirname, 'public')));
// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// routing path
app.use('/bootstrap', express.static(
    path.join(__dirname, 'node_modules/bootstrap/dist')
));

app.get('/', (req, res) => {
    const q = "SELECT * from users";
    db.all(q, (e, rows) => {
        if (e) {
            console.log(e.message)
        }
        res.render('home', {data: rows})
    })
})

app.get('/detail/:id', (req, res) => {
    let q = `
    SELECT * FROM users
    WHERE id = ${req.params.id}
    `
    db.get(q, (e, rows) => {
        if (e) {
            return console.log(e.message)
        }
        res.render('detail', {data: rows})
    })
})

// Starting the server
app.listen(port, () => {
    console.log("Server started.");
 });
 