// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database'); 

// static resourse
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');
// For parsing form data
app.use(express.urlencoded({ extended: true })); 

// routing 


app.get('/', (req, res) => {
    res.send('<a href="/create">Create Table</a><br>\
        <a href="/insert">Insert Table</a><br>\
        <a href="/showdata">Show Data</a><br>\
        <a href="/form">Form</a>\
        ')
})

app.get('/create',  (req, res) => {
    // Create table in MySQL database
    const sql = `CREATE TABLE instructor (
    ID varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    dept_name varchar(255) NOT NULL,
    salary float,
    PRIMARY KEY (ID)
    );`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });
    // then, Insert data into the table    

});

app.get('/insert',  (req, res) => {
    // Create table in MySQL database
    const sql = `INSERT INTO instructor
    VALUES 
    (10101, "Srinivasan", "Comp. Sci.", 65000),
    (12121, "Wu", "Finance", 90000),
    (15151, "Mozart", "Music", 40000),
    (22222, "Einstein", "Physics", 95000),
    (32343, "El Said", "History", 60000);
    `
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });


    // res.redirect('/');
    // then, Insert data into the table    
});

app.get('/showdata', (req, res) => {
    const sql = 'SELECT * FROM instructor;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        res.render('show', { data: result });
    });
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', async (req, res) => {
    const {id, name, dept_name, salary} = req.query;
    const insertSql = `
        INSERT INTO instructor (ID, name, dept_name, salary)
        VALUES (?, ?, ?, ?);
    `;
    conn.query(insertSql,[id, name, dept_name, salary], (err, result) =>{
        if (err) throw err;
        console.log("Data inserted");
        res.send("Data inserted");
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 