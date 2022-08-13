const salesModels = require('../models/salesModels');

const response = {
  saleNotFount: { message: 'Sale not found' },
};

const registerSales = async (itemsSold) => {
  const id = await salesModels.addSalesProducts(itemsSold);
  return {
    id,
    itemsSold,
    status: 201,
  };
};

const getAllSales = async () => {
  const data = await salesModels.getAll();
  return { status: 200, data };
};

const getSalesById = async (id) => {
  const data = await salesModels.getById(id);

  if (data === undefined || data.length === 0) {
    return { status: 404, message: response.saleNotFount };
  }
  return { status: 200, data };
};

module.exports = {
  registerSales,
  getAllSales,
  getSalesById,
};