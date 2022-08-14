const express = require('express');
const productsServices = require('../services/productsServices');
const validation = require('../middlewares/validation');

const productsControllers = express.Router();

productsControllers.get('/', async (_req, res, next) => {
  try {
    const { message, status, data } = await productsServices.getAllProducts();
    res.status(status).json(data || message);
  } catch (err) {
    next(err);
  }
});

productsControllers.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const { status, message, data } = await productsServices.getProduct(id);
    res.status(status).json(data || message);
  } catch (err) {
    next(err);
  }
});

productsControllers.post('/', validation.productName, async (req, res, next) => {
  const { name } = req.body;
  try {
    const { status, message, id } = await productsServices.addProduct(name);
    res.status(status).json({ id, name } || message);
  } catch (err) {
    next(err);
  }
});

productsControllers.put('/:id', validation.productName, validation.productExists,
  async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const { status, message, data } = await productsServices.productUpdate(id, name);
    res.status(status).json(data || message);
  } catch (err) {
    next(err);
  }
});

module.exports = productsControllers;