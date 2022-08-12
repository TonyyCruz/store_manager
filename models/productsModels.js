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

const addToDb = async (product) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUE (?)';
  const [{ insertId }] = await connection.query(query, [product]);
  console.log({ insertId });
  return insertId;
};

module.exports = {
  getAll,
  getById,
  addToDb,
};