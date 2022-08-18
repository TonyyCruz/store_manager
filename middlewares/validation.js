const productVerify = require('../validations/productVerify');
const { salesProductVerify } = require('../validations/salesProductVerify');
const saleValidate = require('../validations/saleExists');

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

//  verifica se todos os produtos da venda existem e se estão cadastrados no banco
const saleProducts = async (req, res, next) => {
  const { status, message } = await salesProductVerify(req.body);
  if (status) return res.status(status).json(message);
  next();
};

const saleExists = async (req, res, next) => {
  const { id } = req.params;
  const { status, message } = await saleValidate.saleExists(id);
  if (status) return res.status(status).json(message);
  next();
};

module.exports = {
  productName,
  saleProducts,
  productExists,
  saleExists,
};