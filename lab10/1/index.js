const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
    
    const API = "http://webdev.it.kmitl.ac.th:4000/restaurant";
    
    try {
        const response = await fetch(API);
        const data = await response.json();
        console.table(data);
        res.render("index", {data: data});
  } catch(e) {
    console.error(e);
  }
});

app.get('/detail/:id', async(req, res) => {
    const API = `http://webdev.it.kmitl.ac.th:4000/detail/${req.params.id}`;

    try {
        const response = await fetch(API);
        const data = await response.json();
        console.table(data);
        res.render('detail', {data: data});
    } catch (e) {
        console.error(e);
    }
})



app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});