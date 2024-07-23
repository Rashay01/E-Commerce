const express = require('express');
const {
    getCartData, deleteCartData, updateCartData, saveCartData,getCartProductData
} = require('../controllers/cartController');
const router = express.Router();

router.get('/', getCartData);
router.get('/productInfo', getCartProductData);
router.post('/', saveCartData);
router.delete('/:id', deleteCartData);
router.put('/:id', updateCartData);

module.exports = router;