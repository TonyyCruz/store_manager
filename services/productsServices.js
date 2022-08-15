const productsModels = require('../models/productsModels');

const response = {
  notFound: { message: 'Product not found' },
  addFail: { message: 'Addition fail' },
  severeError: { message: 'lines were affected, Severe error' },
  deleteFail: { message: 'Delete dail' },
};

const getAllProducts = async () => {
  const products = await productsModels.getAll();
  if (!products) return { status: 404, message: response.notFound };
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

const productUpdate = async (productId, name) => {
  const affectedRows = await productsModels.update(productId, name);
  if (!affectedRows) return { status: 404, message: response.notFound };
  if (affectedRows > 1) return { status: 500, message: `${affectedRows} ${response.severeError}` };
  return { status: 200, data: { id: productId, name } };
};

const productDelete = async (productId) => {
  const affectedRows = await productsModels.exclude(productId);
  if (!affectedRows) return { status: 404, message: response.deleteFail };
  if (affectedRows > 1) return { status: 500, message: `${affectedRows} ${response.severeError}` };
  return { status: 204 };
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  productUpdate,
  productDelete,
};