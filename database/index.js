const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'tony',
  password: process.env.MYSQL_PASSWORD || 'Anthony02',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;