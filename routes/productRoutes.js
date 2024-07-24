const express = require('express');
const router = express.Router();
const { getProductList, getProductById, getCurrProductById } = require('../controllers/productController');

router.get('/', getProductList);
router.get('/:id', getProductById);
router.get('/test/:id', getCurrProductById);

module.exports = router;
