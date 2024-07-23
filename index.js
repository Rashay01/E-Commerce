const express = require('express');
const bodyParser = require('body-parser');
const path = require('node:path');
const mysql = require('mysql2');
const cartRoutes = require('./routes/cartRoutes');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
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

app.use('/api/cart', cartRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})