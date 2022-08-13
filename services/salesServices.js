const salesModels = require('../models/salesModels');

const registerSales = async (itemsSold) => {
  const id = await salesModels.addSalesProducts(itemsSold);
  return {
    id,
    itemsSold,
    status: 201,
  };
};

module.exports = {
  registerSales,
};