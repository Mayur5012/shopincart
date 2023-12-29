const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder,fetchAllOrders, cancelOrder } = require('../controller/Order');

const router = express.Router();
//  /orders is already added in base path
router.post('/', createOrder)
      .get('/own/', fetchOrdersByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
      .get('/',fetchAllOrders)
      .patch('/cancel/:id', cancelOrder); 
      
      
      
exports.router = router;
      
      // {/* handles cancel order  */}