const express = require('express');
const router = express.Router();
const { getProductList, getProductById } = require('../controllers/productController');

router.get('/', getProductList);
router.get('/:id', getProductById);

module.exports = router;
