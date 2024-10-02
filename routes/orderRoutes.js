const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/authenticate');
const router = express.Router();

router.post('/create', authenticateToken, createOrder);
router.get('/user-orders', authenticateToken, getUserOrders);

module.exports = router;
