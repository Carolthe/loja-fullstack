// database.js
const mysql = require("mysql2/promise");
const { URL } = require("url");

// Verifica se a variável de ambiente está definida
if (!process.env.MYSQL_PUBLIC_URL) {
  throw new Error("MYSQL_PUBLIC_URL não está definida!");
}

// Lê a URL do Railway
const dbUrl = new URL(process.env.MYSQL_PUBLIC_URL);


// Cria pool de conexões
const pool = mysql.createPool({
  host: dbUrl.hostname,           // host do banco
  user: dbUrl.username,           // usuário
  password: dbUrl.password,       // senha
  database: dbUrl.pathname.slice(1), // nome do banco (remove / inicial)
  port: dbUrl.port || 3306,       // porta do MySQL
  waitForConnections: true,
  connectionLimit: 10
});

console.log("Conexão com MySQL da Railway criada!!!");

module.exports = pool;
