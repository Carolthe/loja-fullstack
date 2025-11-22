//modulos esportados
const express = require('express');
const cors = require('cors');
const app = express();
//variavel de ambiente
require('dotenv').config();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
 
//ligação com os arquivos separados na pasta routes
const produtosRoutes = require('./routes/produtos');
const favoritosRoutes = require('./routes/favoritos');
const userRoutes = require('./routes/users');
const carrinhoRoutes = require('./routes/carrinho');
const newsletterRoutes = require('./routes/newsletter');
const categoriasRoutes = require('./routes/categorias');
const contatoRoutes = require('./routes/contato');
const localizacaoRoutes = require('./routes/localizacao');
const processoPagamentoRoutes = require('./routes/processoPagamento')

//rotas de acasso a api
app.use('/api/produtos', produtosRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/contact', contatoRoutes); 
app.use('/localizacao', localizacaoRoutes);
app.use('/api/processoPagamento', processoPagamentoRoutes);

//porta do servidor guardada na variavel de ambiente .env
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
