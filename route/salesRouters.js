const express = require('express');
const validation = require('../middlewares/validation');
const salesControllers = require('../controllers/salesControllers');

const salesRouters = express.Router();

salesRouters.get('/', salesControllers.getAllSales);

salesRouters.get('/:id', salesControllers.getSaleById);

salesRouters.post('/', validation.saleProducts, salesControllers.registerSale);

module.exports = salesRouters;