const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const salesControllers = require('../controllers/salesControllers');

const routers = express.Router();

routers.use('/products', productsControllers);
routers.use('/sales', salesControllers);

module.exports = routers;