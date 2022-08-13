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

module.exports = {
  addSalesProducts,
};

// addProductIds.every((pId) => bdProductsIds.some((bdId) => pId === bdId));