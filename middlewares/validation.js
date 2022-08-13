const { getProductName } = require('../validations/getProductName');
const { postSalesProduct } = require('../validations/postSalesProduct');

const productName = (req, res, next) => {
  const { name } = req.body;
  const { status, message } = getProductName(name);
  if (status) return res.status(status).json(message);
  next();
};

const saleProducts = (req, res, next) => {
  const { status, message } = postSalesProduct(req.body);
  if (status) return res.status(status).json(message);
  next();
};

module.exports = {
  productName,
  saleProducts,
};