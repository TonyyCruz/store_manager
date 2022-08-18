const express = require('express');
const validation = require('../middlewares/validation');
const salesControllers = require('../controllers/salesControllers');

const salesRouters = express.Router();

salesRouters.get('/', salesControllers.getAllSales);

salesRouters.get('/:id', salesControllers.getSaleById);

salesRouters.post('/', validation.saleProducts, salesControllers.registerSale);

salesRouters.delete('/:id', validation.saleExists, salesControllers.deleteSale);

salesRouters.put('/:id', validation.saleExists, validation.saleProducts,
  salesControllers.editSale);

module.exports = salesRouters;