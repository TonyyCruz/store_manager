const models = require('../models/productsModels');

const response = {
  nameRequired: { message: '"name" is required' },
  lengthError: { message: '"name" length must be at least 5 characters long' },
  notFound: { message: 'Product not found' },
};

const productName = (name) => {
  if (!name || name === undefined) return { status: 400, message: response.nameRequired };
  if (name.length < 5) return { status: 422, message: response.lengthError };
  return {};
};

const productExists = async (id) => {
  const product = await models.getById(id);
  if (!product) return { status: 404, message: response.notFound };
  return {};
};

module.exports = {
  productName,
  productExists,
};