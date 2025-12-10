//modulos importados
const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Pega os produtos da base de dados e envia para o front-end
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar produtos' });                             
  }
});

// Lista produtos ordenados por preço do menor para o maior
router.get('/ordenados', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos ORDER BY preco ASC');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos ordenados:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos ordenados' });
  }
});

module.exports = router;