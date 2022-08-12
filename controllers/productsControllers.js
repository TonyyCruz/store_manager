const express = require('express');
const productsServices = require('../services/productsServices');
const validation = require('../middlewares/validation');

const productsControllers = express.Router();

const response = {
  notFound: { message: 'Product not found' },
  addFail: { message: 'Addition fail' },
};

productsControllers.get('/', async (_req, res, next) => {
  try {
    const products = await productsServices.getAllProducts();
    if (!products || products.length === 0) return res.status(404).json(response.notFound);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

productsControllers.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productsServices.getProduct(id);
    if (!product || product.length === 0) return res.status(404).json(response.notFound);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

productsControllers.post('/', validation.productName, async (req, res, next) => {
  const { name } = req.body;
  try {
    const id = await productsServices.addProduct(name);
    if (!id) return res.status(404).json(response.addFail);
    res.status(201).json({ id, name });
  } catch (err) {
    next(err);
  }
});

module.exports = productsControllers;