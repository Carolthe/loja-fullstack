//Conexão com MySQL usando mysql2/promise
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'loja_online',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('conexões MySQL criada!!!');

module.exports = pool;