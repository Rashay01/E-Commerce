const express = require('express');
const { saveBulkOrderHistoryData, getOrderHistoryData, getOrderHistoryGroupedData, deleteOrderNumberData, updateOrderHistoryData, updateOrderNumberStatus, saveOrderNumberData, getOrderHistoryDataOrderNumber
} = require('../controllers/orderHistoryController');
const router = express.Router();

router.get('/', getOrderHistoryData);
router.get('/grouped', getOrderHistoryGroupedData);
router.get('/:id', getOrderHistoryDataOrderNumber);
router.post('/', saveBulkOrderHistoryData);
router.post('/single', saveOrderNumberData);
router.delete('/:id', deleteOrderNumberData);
router.put('/:id', updateOrderHistoryData);
router.put('/status/:id', updateOrderNumberStatus);

module.exports = router;