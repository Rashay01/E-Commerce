exports.getCartData = (req, res) => {
    const pool = req.pool;
    const sql = 'SELECT * FROM cart';
    pool.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting all data' });
        return;
      }
      console.log(req.body);
      res.json({
        status: 'success',
        data: [ ...results ],
      });
    });
};

exports.getCartProductData = (req, res) => {
    const pool = req.pool;
    const sql = 'SELECT cart.id AS cart_id, cart.productId, cart.quantity, cart.totalPerProduct, product.description AS product_description, product.img FROM cart JOIN product ON cart.productId = product.id';
    pool.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting all data' });
        return;
      }
      console.log(req.body);
      res.json({
        status: 'success',
        data: [ ...results ],
      });
    });
};

exports.deleteCartData = (req, res) => {
    const { id } = req.params;
    const pool = req.pool;
    const sql = 'DELETE FROM cart WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting cart data' });
        return;
      }
      res.json({
        status: 'success',
        message: 'Cart Data deleted successfully',
      });
    });
};

exports.updateCartData = (req, res) => {
    const { id } = req.params;
    const { productId, quantity, totalPerProduct} = req.body;
    const pool = req.pool;
    const sql =
      'UPDATE cart SET productId = ?, quantity = ?, totalPerProduct = ?  WHERE id = ?';
    pool.query(sql, [productId, quantity, totalPerProduct, id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating cart data' });
        return;
      }
      res.json({
        status: 'success',
        message: 'Data updated successfully',
        data: { ...req.body },
      });
    });
  };


  exports.saveCartData = (req, res) => {
    const { productId, quantity, totalPerProduct } = req.body;
    const pool = req.pool;

    // SQL query for inserting or updating the cart item
    const sql = `
        INSERT INTO cart (productId, quantity, totalPerProduct)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
            quantity = quantity + VALUES(quantity),
            totalPerProduct = VALUES(totalPerProduct);
    `;

    pool.query(sql, [productId, quantity, totalPerProduct], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error saving cart data' });
            return;
        }
        res.json({
            status: 'success',
            data: { ...req.body },
        });
    });
};
