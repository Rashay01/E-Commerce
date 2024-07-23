const express = require('express');
const bodyParser = require('body-parser');
const path = require('node:path');
const mysql = require('mysql2');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false})); // to parse the form data
app.use(bodyParser.json()); // Always Always keep it on top of middleware
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'ecommerce'
})

app.use((req, res, next) => {
    req.pool = pool;
    next();
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})