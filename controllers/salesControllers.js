const express = require('express');
const salesServices = require('../services/salesServices');
const validation = require('../middlewares/validation');

const salesControllers = express.Router();

salesControllers.post('/', validation.saleProducts, async (req, res, next) => {
  try {
    const { id, itemsSold, status } = await salesServices.registerSales(req.body);
    res.status(status).json({ id, itemsSold });
  } catch (err) {
    next(err);
  }
});

module.exports = salesControllers;