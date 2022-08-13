const productsModels = require('../models/productsModels');

const response = {
  notFound: { message: 'Product not found' },
  addFail: { message: 'Addition fail' },
};

const getAllProducts = async () => {
  const products = await productsModels.getAll();
  if (!products || products.length === 0) return { status: 404, message: response.notFound };
  return { status: 200, data: products };
};

const getProduct = async (id) => {
  const product = await productsModels.getById(id);
  if (!product || product.length === 0) return { status: 404, message: response.notFound };
  return { status: 200, data: product };  
};

const addProduct = async (productId) => {
const id = await productsModels.addToDb(productId);
  if (!id) return { status: 404, message: response.addFail };
  return { status: 201, id };
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
};