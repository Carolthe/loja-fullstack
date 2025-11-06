const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./models/db'); // Importa o banco
const app = express();

app.use(cors());
app.use(express.json());

const produtosRoutes = require('./routes/produtos')
const favoritosRoutes = require('./routes/favoritos')
const userRoutes = require('./routes/users')
const carrinhoRoutes = require('./routes/carrinho');
const newsletterRoutes = require('./routes/newsletter')
const categoriasRoutes = require('./routes/categorias')

app.use('/api/produtos', produtosRoutes)
app.use('/api/favoritos', favoritosRoutes)
app.use('/api/users', userRoutes)
app.use('/api/carrinho', carrinhoRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/categorias', categoriasRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
