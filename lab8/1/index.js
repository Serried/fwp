// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const conn = require('./database');

// static resource
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');
// For parsing form data
app.use(express.urlencoded({ extended: true }));

// routing

app.get('/', (req, res) => {
    res.send('<link rel="stylesheet" href="styles.css">\
        <a href="/create">Create Table</a><br>\
        <a href="/form">Form</a><br>\
        <a href="/showdata">Show Data</a>\
        ');
});

app.get('/create', (req, res) => {
    const sql = `
    CREATE TABLE IF NOT EXISTS Users 
    (
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    age int NOT NULL,
    address varchar(255) NOT NULL,
    phone varchar(20) NOT NULL,
    PRIMARY KEY (username)
    );
    `;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send(`
        <link rel="stylesheet" href="/styles.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&family=Noto+Sans+Thai:wght@100..900&family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
            Table created or already exists <br>
            <a href="/">Back</a>
          `);
          
    });
});

app.get('/showdata', (req, res) => {
    const sql = 'SELECT * FROM Users;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        res.render('show', { data: result });
    });
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/form.html'));
});

app.get('/formget', (req, res) => {
    const { username, password, email, firstname, lastname, age, address, phone } = req.query;
    const ageNum = age !== undefined && age !== '' ? parseInt(age, 10) : 0;
    const insertSql = `
        INSERT INTO Users (username, password, email, firstname, lastname, age, address, phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    conn.query(insertSql, [username, password, email, firstname, lastname, ageNum, address, phone], (err, result) => {
        if (err) throw err;
        console.log("Data inserted");
        res.send(`
        <link rel="stylesheet" href="/styles.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&family=Noto+Sans+Thai:wght@100..900&family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
            Data inserted
            <a href="/">Back</a>
            <a href="/showdata">Show Data</a>
            `
        );
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
