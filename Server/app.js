const express = require('express');
const app = express();
const path = require('path');
const port = 5400;

app.use(express.static('../Web/page'));
app.use(express.static('../Web/css'));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../Web/page/index2.html');
    res.sendFile(filePath);
});

app.get('/showtexts', (req, res) => {
    const filePath = path.join(__dirname, '../Web/page/show_texts.html');
    res.sendFile(filePath);
});

app.listen(port, '0.0.0.0', () => {
    console.log("server is open");
});
