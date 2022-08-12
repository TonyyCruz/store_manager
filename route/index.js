const express = require('express');
const productsControllers = require('../controllers/productsControllers');

const routers = express.Router();

routers.use('/products', productsControllers);

module.exports = routers;