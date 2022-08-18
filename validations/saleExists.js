const salesModels = require('../models/salesModels');

const findSale = async (id) => salesModels.getById(id);

const saleExists = async (id) => {
  const saleVerify = await findSale(id);
  if (saleVerify.length === 0) return { status: 404, message: { message: 'Sale not found' } }; 
  return {};
};

module.exports = { saleExists };