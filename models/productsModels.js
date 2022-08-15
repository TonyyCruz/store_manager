const connection = require('../database/connection');

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
  return insertId;
};

const update = async (id, name) => {
  const query = `UPDATE  StoreManager.products SET name=?
    WHERE id=?`;
  const [{ affectedRows }] = await connection.query(query, [name, id]);
  return affectedRows;
};

const exclude = async (id) => {
  const query = `DELETE FROM StoreManager.products
    WHERE id=?`;
  const [{ affectedRows }] = await connection.query(query, [id]);
  return affectedRows;
};

module.exports = {
  getAll,
  getById,
  addToDb,
  update,
  exclude,
};