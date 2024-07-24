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

const getProductById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM product WHERE categoryId = ?';
    
    req.pool.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(results);
        }
    });
};

const getCurrProductById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM product WHERE id = ?';
    
    req.pool.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(results[0]);
        }
    });
};

module.exports = { getProductList, getProductById, getCurrProductById };
