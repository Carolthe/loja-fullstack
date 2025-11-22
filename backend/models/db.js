//modulo importado para conexão com o mysql com promise
const mysql = require('mysql2/promise');
//variavel de ambiente para guardar os dados de conexão com a base de dados
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('conexões MySQL criada!!!');

module.exports = pool;