const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// Connect to SQLite database
let db = new sqlite3.Database('employees (3).db', (err) => {
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
app.get('/', function (req, res) {
    res.render("home")
})

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', function (req, res) {

    let formdata = {
        id: req.query.id,
        fname: req.query.fname,
        lname: req.query.lname,
        title: req.query.title,
        phone: req.query.phone,
        email: req.query.email
    };

    console.log(formdata);

    let sql = `
        INSERT INTO employees 
        (EmployeeId, LastName, FirstName, Title, Phone, Email)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [
        formdata.id,
        formdata.lname,
        formdata.fname,
        formdata.title,
        formdata.phone,
        formdata.email
    ], function (err) {

        if (err) {
            console.error('Error inserting data:', err.message);
            return res.send("Insert Error");
        }

        console.log('Data inserted successful');

        res.redirect('/show');
    });

});


app.get('/delete/:id', function (req, res) {
    // Deleting Data
    // รับค่า id จาก request ใช้ req.params.id
    let sql = `
    DELETE FROM employees
    WHERE EmployeeId = ${req.params.id}; 
    `;
    // delete a row based on id
    db.run(sql, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been deleted.`);
        res.redirect('/show')
    });
})

app.get('/show', function (req, res) {
    const query = 'SELECT * FROM employees ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        // console.log(rows);
        res.render('show', { data: rows });
    });
});
app.get('/create', function (req, res) {
    // create table 
    const sql = ` CREATE TABLE employees (
    EmployeeId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    LastName NVARCHAR(20)  NOT NULL,
    FirstName NVARCHAR(20)  NOT NULL,
    Title NVARCHAR(30),
    Phone NVARCHAR(24),
    Email NVARCHAR(60) ); `;

    db.run(sql, (err) => {
        if (err) {
            return console.error('Error creating table:', err.message);
        }
        console.log('Table created successful');
    });

    res.redirect("/show")
    // insert data into table 
    // ...       
})


// Starting the server
app.listen(port, () => {
    console.log("Server started.");
});