const getCategoryList = (req, res) => {
    const pool = req.pool;
    pool.query('SELECT * FROM category', (error, results) => {
        if (error) {
            console.error('Error fetching categories:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
};

module.exports = { getCategoryList };
