const productsModels = require('../models/productsModels');

const response = {
  idRequired: { message: '"productId" is required' },
  quantityRequired: { message: '"quantity" is required' },
  quantityWrong: { message: '"quantity" must be greater than or equal to 1' },
  productNotExists: { message: 'Product not found' },
};

const testProductId = async (sales) => {
  const idNotExist = sales.some(({ productId }) => !productId);
  if (idNotExist) return { status: 400, message: response.idRequired };

  const bdProducts = await productsModels.getAll();
  const productExists = sales.every(({ productId }) => (
    bdProducts.some(({ id }) => id === productId)));
  if (!productExists) return { status: 404, message: response.productNotExists };

  return {};
};

const testQuantity = (sales) => {
  const notExist = sales.some(({ quantity }) => !quantity);
  console.log('test of quantity', notExist);
  if (notExist) return { status: 400, message: response.quantityRequired };

  const wrongValue = sales.some(({ quantity }) => quantity < 1);
  if (wrongValue) return { status: 422, message: response.quantityWrong };

  return {};
};

const salesValidation = async (sales) => {
  const idTest = await testProductId(sales);
  if (idTest.status) return { message: idTest.message, status: idTest.status };

  const qTest = testQuantity(sales);
  if (qTest.status) return { message: qTest.message, status: qTest.status };

  return {};
};

const postSalesProduct = async (sales) => {
  const { status, message } = await salesValidation(sales);
  console.log('response of validation', status, message);
  if (status) return { status, message };
  return {};
};

module.exports = { postSalesProduct };