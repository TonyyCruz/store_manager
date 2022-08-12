const connection = require('../database');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [data] = await connection.query(query);
  return data;
};

const getById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?';
  const [data] = await connection.query(query, [productId]);
  return data[0];
};

module.exports = {
  getAll,
  getById,
};