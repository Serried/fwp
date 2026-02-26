const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('smartphone.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("<h1>Welcome to smartphone API</h1> <a href='/smartphones'>View Smartphones</a>");

});


// --- Section 2 - Creating the Web Services
app.get('/smartphones', (req, res) => {
    const query = 'SELECT * FROM smartphone ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));        
    });
});

app.get('/smartphones/:id', (req, res) => {
    // req.params.id
    const query = `SELECT * FROM smartphone WHERE id =${req.params.id}; `;
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));       
    });
});

// --- Section 3 - Using the Web Services
app.get("/employees", (req, res) => {

    //  ทุกรายการ  http://webdev.it.kmitl.ac.th:4000/employees';
    //  รายละเอียด http://webdev.it.kmitl.ac.th:4000/employee/id ';
    
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/employees';    
    fetch(endpoint)
        .then(response => response.json())
        .then(emp => {
            console.log(emp);
            res.render('employee', {data: emp})
                        
        })
        .catch(error => {
            console.log(error);
        });

});



app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});