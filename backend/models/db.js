// backend/models/db.js
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

console.log('✅ Pool de conexões MySQL criado com sucesso!');

module.exports = pool;
