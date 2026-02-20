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
app.get("/", (req, res) => {
    res.send(`
       <link rel="stylesheet" href="/styles.css">
       <a href="/form">To form</a>
    `);
});

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "form.html"));
});

app.get("/validation", (req, res) => {
    const { username, password } = req.query;
    const q = `
    SELECT *
    FROM Users
    WHERE username = ? OR email = ?;
    `;

    conn.query(q, [username, username], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.send(`
        <link rel="stylesheet" href="/styles.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&family=Noto+Sans+Thai:wght@100..900&family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
                    <p>ไม่พบบัญชีผู้ใช้</p><br>
            <a href="/form">Back to form</a>
            `);
            return;
        }
        const user = result[0];
        if (user.password !== password) {
            res.send(`
        <link rel="stylesheet" href="/styles.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&family=Noto+Sans+Thai:wght@100..900&family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
                    <p>รหัสผ่านไม่ถูกต้อง</p><br>
            <a href="/form">Back to form</a>
            `);
            return;
        }
        res.send(`
        <link rel="stylesheet" href="/styles.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&family=Noto+Sans+Thai:wght@100..900&family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
        
        <h3>ข้อมูลของคุณ:</h3>
        <p>Username: ${user.username} <br>
        Email: ${user.email} <br>
        ชื่อจริง: ${user.firstname} <br>
        นามสกุล: ${user.lastname} <br>
        อายุ: ${user.age} <br>
        ที่อยู่: ${user.address} <br>
        เบอร์โทร: ${user.phone} <br></p>
        <a href="/form">Back to form</a>
        <a href="/">Back to home</a>
        `);
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 