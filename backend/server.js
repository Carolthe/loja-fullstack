const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./models/db'); // Importa o banco

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste do banco de dados
app.get('/api/testdb', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS data_atual');
    res.json({
      status: 'Conectado ao banco de dados com sucesso!',
      data_atual: rows[0].data_atual
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    res.status(500).json({
      erro: 'Erro ao conectar ao banco de dados',
      detalhes: error.message
    });
  }
});

const produtosRoutes = require('./routes/produtos')
const favoritosRoutes = require('./routes/favoritos')
const userRoutes = require('./routes/users')
const carrinhoRoutes = require('./routes/carrinho');

app.use('/api/produtos', produtosRoutes)
app.use('/api/favoritos', favoritosRoutes)
app.use('/api/users', userRoutes)
app.use('/api/carrinho', carrinhoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
