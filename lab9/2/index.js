const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('questions.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path
app.get('/', (req, res) => {
    
    const q = `
    SELECT * FROM questions
    `
    
    db.all(q, (e, rows) => {
        if (e) {
            console.log(e.message)
        }
        res.render('index', {data: rows})
        
    })
})

// Starting the server
app.listen(port, () => {
   console.log("Server started.");
 });