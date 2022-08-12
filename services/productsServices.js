const productsModels = require('../models/productsModels');

const getAllProducts = () => productsModels.getAll();

const getProduct = (id) => productsModels.getById(id);

module.exports = {
  getAllProducts,
  getProduct,
};