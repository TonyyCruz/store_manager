const connection = require('../database');

const addSales = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.query(query);
  return insertId;
};

const addSalesProducts = async (sales) => {
  const salesId = await addSales();
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;

  const products = sales.map((item) => [salesId, item.productId, item.quantity]);
  Promise.all(products.map((pro) => connection.query(query, pro)));

  return salesId;
};

const getAll = async () => {
  const query = `SELECT
  sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id`;
  
  const [data] = await connection.query(query);
  return data;
};

const getById = async (id) => {
  const query = `SELECT
  s.date, sp.product_id AS productId, sp.quantity 
  FROM StoreManager.sales AS s WHERE s.id=?
  INNER JOIN StoreManager.sales_products AS sp ON sp.sale_id = s.id
  GROUP BY s.id`;

  const [data] = await connection.query(query, [id]);
  console.log('test', data);
};

module.exports = {
  addSalesProducts,
  getAll,
  getById,
};

// addProductIds.every((pId) => bdProductsIds.some((bdId) => pId === bdId));