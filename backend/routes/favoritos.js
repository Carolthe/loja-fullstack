const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// ➕ Adicionar produto aos favoritos
router.post('/', async (req, res) => {
  const { id_usuario, id_produto } = req.body;

  try {
    const [existing] = await pool.query(
      'SELECT * FROM favoritos WHERE id_usuario = ? AND id_produto = ?',
      [id_usuario, id_produto]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Produto já está nos favoritos!' });
    }

    await pool.query(
      'INSERT INTO favoritos (id_usuario, id_produto) VALUES (?, ?)',
      [id_usuario, id_produto]
    );

    res.json({ message: 'Produto adicionado aos favoritos!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar aos favoritos.' });
  }
});

// 📋 Buscar favoritos de um usuário
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT p.* FROM produtos p
       JOIN favoritos f ON p.id_produto = f.id_produto
       WHERE f.id_usuario = ?`,
      [id_usuario]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar favoritos.' });
  }
});

// ❌ Remover produto dos favoritos via URL
router.delete('/:id_usuario/:id_produto', async (req, res) => {
  const { id_usuario, id_produto } = req.params;

  try {
    await pool.query(
      'DELETE FROM favoritos WHERE id_usuario = ? AND id_produto = ?',
      [id_usuario, id_produto]
    );

    res.json({ message: 'Produto removido dos favoritos!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover dos favoritos.' });
  }
});

module.exports = router;
