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

salesControllers.get('/', async (_req, res, next) => {
  try {
    const { status, data } = await salesServices.getAllSales();
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
});

salesControllers.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const { status, data, message } = await salesServices.getSalesById(id);
    res.status(status).json(data || message);
  } catch (err) {
    next(err);
  }
});

module.exports = salesControllers;