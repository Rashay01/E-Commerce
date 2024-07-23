const getProductList = (req, res) => {
    const pool = req.pool;
    pool.query('SELECT * FROM product', (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
};

module.exports = { getProductList };
