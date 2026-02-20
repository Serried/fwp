// index.js

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const conn = require('./database');

// static resource
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const createTableSQL = `
CREATE TABLE IF NOT EXISTS albums (
    song VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255) NOT NULL,
    \`year\` INT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    album_cover VARCHAR(255) NOT NULL
);
`;

// routing
app.get('/', (req, res) => {
    conn.query(createTableSQL, (err) => {
        if (err) {
            console.error("Create table:", err.message);
            return res.status(500).send("Could not create table: " + err.message + ". <br><a href='/albums'>Albums</a>");
        }
        console.log("Table created or already exists");
        let rows = [];
        try {
            const csvPath = path.join(__dirname, 'albums.csv');
            const csv = fs.readFileSync(csvPath, 'utf-8');
            const lines = csv.trim().split('\n');
            for (let i = 1; i < lines.length; i++) {
                const values = parseCSV(lines[i]);
                if (values) rows.push(values);
            }
        } catch (e) {
            console.error("Read CSV:", e.message);
            res.redirect('/albums');
            return;
        }
        if (rows.length === 0) {
            console.log("No rows to insert");
            res.redirect('/albums');
            return;
        }
        const insertQ = `INSERT INTO albums (song, artist, album, \`year\`, genre, album_cover) VALUES (?, ?, ?, ?, ?, ?)`;
        let index = 0;
        function insertNext() {
            if (index >= rows.length) {
                console.log("Insert done:", rows.length, "rows");
                res.redirect('/albums');
                return;
            }
            const row = rows[index];
            const [song, artist, album, year, genre, album_cover] = row;
            const yearNum = parseInt(year, 10) || 0;
            const params = [song, artist, album, yearNum, genre, album_cover];
            conn.query(insertQ, params, (err3) => {
                if (err3) {
                    console.error("Insert error at row", index + 1, ":", err3.message);
                    console.error("Full error:", err3);
                    console.error("Params:", params);
                } else {
                    console.log("Inserted", index + 1, "/", rows.length, song, "-", artist);
                }
                index++;
                insertNext();
            });
        }
        insertNext();
    });
});

function parseCSV(line) {
    const parts = line.split(',');
    if (parts.length < 6) return null;
    const song = parts[0].trim();
    const artist = parts[1].trim();
    const album_cover = parts[parts.length - 1].trim();
    const genre = parts[parts.length - 2].trim();
    const year = parts[parts.length - 3].trim();
    const album = parts.slice(2, parts.length - 3).join(',').trim();
    return [song, artist, album, year, genre, album_cover];
}

app.get('/seed', (req, res) => {
    const createQ = `
    CREATE TABLE IF NOT EXISTS albums (
        song VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        album VARCHAR(255) NOT NULL,
        \`year\` INT NOT NULL,
        genre VARCHAR(100) NOT NULL,
        album_cover VARCHAR(255) NOT NULL
    );
    `;
    conn.query(createQ, (err) => {
        if (err) return res.send('Error: ' + err.message);
        let rows = [];
        try {
            const csv = fs.readFileSync(path.join(__dirname, 'albums.csv'), 'utf-8');
            const lines = csv.trim().split('\n');
            for (let i = 1; i < lines.length; i++) {
                const values = parseCSV(lines[i]);
                if (values) rows.push(values);
            }
        } catch (e) {
            return res.send('CSV error: ' + e.message);
        }
        if (rows.length === 0) return res.redirect('/albums');
        const insertQ = `INSERT INTO albums (song, artist, album, \`year\`, genre, album_cover) VALUES (?, ?, ?, ?, ?, ?)`;
        let done = 0;
        const go = () => {
            done++;
            if (done >= rows.length) res.redirect('/albums');
        };
        rows.forEach(([song, artist, album, year, genre, album_cover]) => {
            conn.query(insertQ, [song, artist, album, parseInt(year, 10) || 0, genre, album_cover], (err2) => {
                if (err2) console.error(err2.message);
                go();
            });
        });
    });
});

app.get('/insert', (req, res) => {
    const csvPath = path.join(__dirname, 'albums.csv');
    const csv = fs.readFileSync(csvPath, 'utf-8');
    const lines = csv.trim().split('\n');
    const insertQ = `INSERT INTO albums (song, artist, album, \`year\`, genre, album_cover) VALUES (?, ?, ?, ?, ?, ?)`;
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSV(lines[i]);
        if (values) {
            const [song, artist, album, year, genre, album_cover] = values;
            conn.query(insertQ, [song, artist, album, parseInt(year, 10) || 0, genre, album_cover], (err) => {
                if (err) console.error(err);
            });
        }
    }
    res.send('<a href="/albums">View albums</a>');
});

function seedFromCSV(callback) {
    let rows = [];
    try {
        const csv = fs.readFileSync(path.join(__dirname, 'albums.csv'), 'utf-8');
        const lines = csv.trim().split('\n');
        for (let i = 1; i < lines.length; i++) {
            const values = parseCSV(lines[i]);
            if (values) rows.push(values);
        }
    } catch (e) {
        console.error("Seed CSV error:", e.message);
        return callback([]);
    }
    if (rows.length === 0) return callback([]);
    const insertQ = `INSERT INTO albums (song, artist, album, \`year\`, genre, album_cover) VALUES (?, ?, ?, ?, ?, ?)`;
    let index = 0;
    function insertNext() {
        if (index >= rows.length) {
            console.log("Seed done:", rows.length, "rows");
            return callback(rows.length);
        }
        const [song, artist, album, year, genre, album_cover] = rows[index];
        conn.query(insertQ, [song, artist, album, parseInt(year, 10) || 0, genre, album_cover], (err) => {
            if (err) console.error("Seed insert error:", err.message);
            index++;
            insertNext();
        });
    }
    insertNext();
}

app.get('/albums', (req, res) => {
    conn.query(createTableSQL, (err) => {
        if (err) {
            console.error("Create table:", err.message);
            return res.status(500).send("Could not create table: " + err.message + ". <br><a href='/'>Home</a>");
        }
        conn.query('SELECT * FROM albums', (err2, result) => {
            if (err2) {
                console.error(err2);
                return res.render('albums', { data: [] });
            }
            const data = Array.isArray(result) ? result : [];
            console.log('Albums count:', data.length);
            console.table(result);
            if (data.length === 0) {
                console.log("Table empty, seeding from CSV...");
                seedFromCSV(() => {
                    res.redirect('/albums');
                });
                return;
            }
            res.render('albums', { data });
        });
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 