const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '4thIndu5tryR3v',
    database: 'ecommerce'
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.use((req, res, next) => {
    req.pool = pool;
    next();
});

app.use('/api/cart', cartRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
