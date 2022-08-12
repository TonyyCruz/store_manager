const productsModels = require('../models/productsModels');

const getAllProducts = () => productsModels.getAll();

const getProduct = (id) => productsModels.getById(id);

const addProduct = (id) => productsModels.addToDb(id);

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
};