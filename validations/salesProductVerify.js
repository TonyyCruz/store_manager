const productsModels = require('../models/productsModels');

const response = {
  idRequired: { message: '"productId" is required' },
  quantityRequired: { message: '"quantity" is required' },
  quantityWrong: { message: '"quantity" must be greater than or equal to 1' },
  productNotExists: { message: 'Product not found' },
};

const testProductId = async (sales) => {
  const idNotExist = sales.some(({ productId }) => productId === undefined);
  if (idNotExist) return { status: 400, message: response.idRequired };

  const bdProducts = await productsModels.getAll();
  const productExists = sales.every(({ productId }) => (
    bdProducts.some(({ id }) => id === productId)));
  if (!productExists) return { status: 404, message: response.productNotExists };

  return {};
};

const testQuantity = (sales) => {
  const notExist = sales.some(({ quantity }) => quantity === undefined);
  if (notExist) return { status: 400, message: response.quantityRequired };

  const wrongValue = sales.some(({ quantity }) => quantity < 1);
  if (wrongValue) return { status: 422, message: response.quantityWrong };

  return {};
};

const salesValidation = async (sales) => {
  const idTest = await testProductId(sales);
  if (idTest.status) return { message: idTest.message, status: idTest.status };

  const quantityTest = testQuantity(sales);
  if (quantityTest.status) return { message: quantityTest.message, status: quantityTest.status };

  return {};
};

const salesProductVerify = async (sales) => {
  const { status, message } = await salesValidation(sales);
  if (status) return { status, message };
  return {};
};

module.exports = { salesProductVerify };