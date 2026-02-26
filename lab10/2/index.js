const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('to-do.db', (err) => {    
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

app.get("/", async (req, res) => {
    const API = "http://localhost:3000/show-all";
    const response = await fetch(API)
    const data = await response.json();
    console.table(data);
    res.render("index", {data: data});
});

app.post("/to-do/add", (req, res) => {
    try {
        const {
            title,
            description,
            deadline
        } = req.body

        const q = 
        `
        INSERT INTO ToDo (title, description, deadline)
        VALUES (?, ?, ?);
        `
        db.run(q, [title, description, deadline], (e) => {
            if (e) {
                console.error(e.message);
            }
            res.redirect("/");
        })
    } catch (e) {
        console.error(e);
    }
})

app.get('/show-all', (req, res) => {
    try {
        const q = `SELECT * FROM ToDo`;

        db.all(q, (e, rows) => {
            if (e) {
                console.error(e.message);
            }
            if (!rows) {
                res.json([]);
            }
            res.json(rows);
        })
    } catch (e) {
        console.error(e);
    }
})

app.post('/to-do/status/:id', (req, res) => {
    const id = req.params.id;

    try {
        const q = 
        `
        UPDATE ToDo
        SET Status = 1
        WHERE id = ?;
        `
        db.run(q, [id], (e) => {
            if (e) {
                console.error(e.message);
            }
            res.redirect("/");
        })
    } catch (e) {
        console.error(e);
    }
})

app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});