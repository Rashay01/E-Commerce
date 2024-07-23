const express = require('express');
const router = express.Router();
const { getProductList } = require('../controllers/productController');

router.get('/', getProductList);

module.exports = router;
