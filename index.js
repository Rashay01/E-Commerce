const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3000;

app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'ecommerce'
});

app.use((req, res, next) => {
    req.pool = pool;
    next();
});

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
