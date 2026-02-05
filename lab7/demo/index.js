const express = require('express')
const app = express()
const port = 3000

const path = require('path');
app.use(express.static('public'));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/about', function(req, res){
  res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.get('/form', function(req, res){
  res.sendFile(path.join(__dirname, '/public/form.html'));
});

// Route handling query parameters
app.get('/submitform', (req, res) => {
  // Access query parameters using req.query
  const { fname, lname } = req.query;
  res.send(`First name: ${fname}, Last name: ${lname}`);
});

// ทำให้เครื่องเป็น web server
app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
});