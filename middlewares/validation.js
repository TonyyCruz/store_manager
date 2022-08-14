const productVerify = require('../validations/productVerify');
const { salesProductVerify } = require('../validations/salesProductVerify');

const productName = (req, res, next) => {
  const { name } = req.body;
  const { status, message } = productVerify.productName(name);
  if (status) return res.status(status).json(message);
  next();
};

const productExists = async (req, res, next) => {
  const { id } = req.params;
  const { status, message } = await productVerify.productExists(id);
  if (status) return res.status(status).json(message);
  next();
};

const saleProducts = async (req, res, next) => {
  const { status, message } = await salesProductVerify(req.body);
  if (status) return res.status(status).json(message);
  next();
};

module.exports = {
  productName,
  saleProducts,
  productExists,
};