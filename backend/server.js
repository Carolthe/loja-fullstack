const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./models/db'); 
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Rotas 
const produtosRoutes = require('./routes/produtos');
const favoritosRoutes = require('./routes/favoritos');
const userRoutes = require('./routes/users');
const carrinhoRoutes = require('./routes/carrinho');
const newsletterRoutes = require('./routes/newsletter');
const categoriasRoutes = require('./routes/categorias');
const contatoRoutes = require('./routes/contato');
const localizacaoRoutes = require('./routes/localizacao');

app.use('/api/produtos', produtosRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/contact', contatoRoutes); 
app.use('/localizacao', localizacaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
