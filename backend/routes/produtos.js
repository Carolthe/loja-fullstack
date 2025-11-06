const express = require('express');
const router = express.Router();
const pool = require('../models/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Rota 2 - Listar produtos ordenados por preço (crescente)
router.get('/ordenados', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos ORDER BY preco ASC');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar produtos ordenados:', err);
    res.status(500).json({ error: 'Erro ao buscar produtos ordenados' });
  }
});

module.exports = router;