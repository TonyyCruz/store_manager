const express = require('express');
const productsRouters = require('./productsRouters');
const salesRouters = require('./salesRouters');

const routers = express.Router();

routers.use('/products', productsRouters);
routers.use('/sales', salesRouters);

module.exports = routers;