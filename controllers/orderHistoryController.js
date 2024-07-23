exports.getOrderHistoryData = (req, res) => {
    const pool = req.pool;
    const sql = 'SELECT * FROM orderHistory';
    pool.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting all order History data' });
        return;
      }
      console.log(req.body);
      res.json({
        status: 'success',
        data: [ ...results ],
      });
    });
};

exports.getOrderHistoryDataOrderNumber = (req, res) => {
    const { id } = req.params;
    const pool = req.pool;
    const sql = 'SELECT * FROM orderHistory where orderNumber = ?';
    pool.query(sql,[id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting all order History data' });
        return;
      }
      console.log(req.body);
      res.json({
        status: 'success',
        data: [ ...results ],
      });
    });
};

exports.getOrderHistoryGroupedData = (req, res) => {
    const pool = req.pool;
    const sql = "SELECT orderNumber, GROUP_CONCAT(CONCAT('Product ID: ', productId, ', Quantity: ', quantity, ', Total: ', totalPerProduct, ', Status: ', orderStatus) SEPARATOR '; ') AS orderDetails FROM orderHistory GROUP BY orderNumber";
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

exports.deleteOrderNumberData = (req, res) => {
    const { id } = req.params;
    const pool = req.pool;
    const sql = 'DELETE FROM orderNumber WHERE id = ?';
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

exports.updateOrderHistoryData = (req, res) => {
    const { id } = req.params;
    const { productId, quantity, totalPerProduct, orderStatus, orderNumber } = req.body;
    const pool = req.pool;

    const sql = `
        UPDATE orderHistory 
        SET productId = ?, quantity = ?, totalPerProduct = ?, orderStatus = ?, orderNumber = ? 
        WHERE id = ?
    `;

    pool.query(sql, [productId, quantity, totalPerProduct, orderStatus, orderNumber, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error updating order history data' });
            return;
        }
        res.json({
            status: 'success',
            message: 'Data updated successfully',
            data: { ...req.body },
        });
    });
};


  exports.updateOrderNumberStatus = (req, res) => {
    const { id } = req.params;
    const { productId, quantity, totalPerProduct} = req.body;
    const pool = req.pool;
    const sql =
      'UPDATE orderNumber SET orderStatus = ? WHERE orderNumber = ?';
    pool.query(sql, [productId, quantity, totalPerProduct, id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating cart status' });
        return;
      }
      res.json({
        status: 'success',
        message: 'Data updated successfully',
        data: { ...req.body },
      });
    });
  };


  exports.saveOrderNumberData = (req, res) => {
    const { productId, quantity, totalPerProduct, orderNumber} = req.body;
    const pool = req.pool;
    const sql = `INSERT INTO orderNumber (dateTime, productId, quantity, totalPerProduct, orderStatus, orderNumber) VALUES (?, ?, ?, ?, ?,?)`;
    req.pool.query(sql, [Now(), productId, quantity, totalPerProduct, "Pending", orderNumber], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error saving book data' });
        return;
      }
      res.json({
        status: 'success',
        data: { ...req.body },
      });
    });
  };

  exports.saveBulkOrderHistoryData = (req, res) => {
    const { Data } = req.body;
    const pool = req.pool;
    
    const sql = `INSERT INTO orderHistory (dateTime, productId, quantity, totalPerProduct, orderStatus, orderNumber) VALUES (NOW(), ?, ?, ?, ?, ?)`;
    
    const values = Data.map(item => [
        item[1], // productId
        item[2], // quantity
        item[3], // totalPerProduct
        item[4], // orderStatus
        item[5]  // orderNumber
    ]);

    // Use bulk insert with multiple rows of data
    const placeholders = values.map(() => '(NOW(), ?, ?, ?, ?, ?)').join(', ');

    pool.query(`INSERT INTO orderHistory (dateTime, productId, quantity, totalPerProduct, orderStatus, orderNumber) VALUES ${placeholders}`, values.flat(), (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error saving order history data' });
            return;
        }
        res.json({
            status: 'success',
            data: { ...req.body },
        });
    });
};