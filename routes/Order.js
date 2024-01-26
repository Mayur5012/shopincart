const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder,fetchAllOrders, cancelOrder } = require('../controller/Order');

const router = express.Router();
//  /orders is already added in base path
router.post('/', createOrder)
      .get('/own/', fetchOrdersByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
      .get('/',fetchAllOrders)
      .patch('/:id', cancelOrder); 
      
      
      
      exports.router = router;
      
      // .patch('/cancel/:id', cancelOrder); 
      // {/* handles cancel order  */}