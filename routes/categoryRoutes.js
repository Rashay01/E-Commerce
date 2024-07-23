const express = require('express');
const router = express.Router();
const { getCategoryList } = require('../controllers/categoryController');

router.get('/', getCategoryList);

module.exports = router;
