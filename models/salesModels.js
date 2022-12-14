const connection = require('../database/connection');

const salesModels = {
  //  == FOI COLOCADA AQUI PARA SER USADA EM UM TESTE ==  //
  addSales: async () => {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const [{ insertId }] = await connection.query(query);
    return insertId;
  },

  addSalesProducts: async ({ itemsSold, id }) => {
    let salesId = id;
    if (!id) { salesId = await salesModels.addSales(); }

    const query = `INSERT INTO StoreManager.sales_products (
      sale_id, product_id, quantity) VALUES (?, ?, ?)`;

    const products = itemsSold.map((item) => [salesId, item.productId, item.quantity]);
    Promise.all(products.map((pro) => connection.query(query, pro)));

    return salesId;
  },

  getAll: async () => {
    const query = `SELECT
      sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id`;
    
    const [data] = await connection.query(query);
    return data;
  },

  getById: async (id) => {
    const query = `SELECT
      s.date, sp.product_id AS productId, sp.quantity 
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
      WHERE sp.sale_id=?`;

    const [data] = await connection.query(query, [id]);
    return data;
  },

  deleteSale: async (id) => {
    const query = `DELETE FROM StoreManager.sales_products
      WHERE sale_id=?`;

    const [{ affectedRows }] = await connection.query(query, [id]);
    return affectedRows;
  },
};

module.exports = salesModels;
