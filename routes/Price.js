const express = require('express');
const { fetchPrices, createPrice } = require('../controller/Price');

const router = express.Router();
router.get('/', fetchPrices).post('/',createPrice)

exports.router = router;

