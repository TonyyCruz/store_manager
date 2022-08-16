const express = require('express');
const validation = require('../middlewares/validation');
const productsControllers = require('../controllers/productsControllers');

const productsRouter = express.Router();

productsRouter.get('/', productsControllers.getAll);

productsRouter.get('/:id', productsControllers.getById);

productsRouter.post('/', validation.productName, productsControllers.addAProduct);

productsRouter.put('/:id', validation.productName, validation.productExists,
  productsControllers.updateAProduct);

productsRouter.delete('/:id', validation.productExists, productsControllers.deleteAProduct);

module.exports = productsRouter;