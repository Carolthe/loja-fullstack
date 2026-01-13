// módulos importados
const express = require('express');
const router = express.Router();
const ligacao = require('../models/db');

// Adicionar produto ao carrinho
router.post('/', async (req, res) => {
  const { id_usuario, id_produto, quantidade } = req.body;

  try {
    // Verifica se o produto já está no carrinho
    const [rows] = await ligacao.query(
      'SELECT * FROM carrinho WHERE id_usuario = ? AND id_produto = ?',
      [id_usuario, id_produto]
    );

    if (rows.length > 0) {
      // Atualiza quantidade se já existir
      await ligacao.query(
        'UPDATE carrinho SET quantidade = quantidade + ? WHERE id_usuario = ? AND id_produto = ?',
        [quantidade || 1, id_usuario, id_produto]
      );
    } else {
      // Insere novo produto
      await ligacao.query(
        'INSERT INTO carrinho (id_usuario, id_produto, quantidade) VALUES (?, ?, ?)',
        [id_usuario, id_produto, quantidade || 1]
      );
    }

    res.json({ message: 'Produto adicionado ao carrinho!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar produto ao carrinho' });
  }
});

// Busca todos os produtos do carrinho de um usuário
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const [rows] = await ligacao.query(
      `SELECT p.*, c.quantidade
       FROM carrinho c
       JOIN produtos p ON c.id_produto = p.id_produto
       WHERE c.id_usuario = ?`,
      [id_usuario]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar carrinho' });
  }
});

// Aumentar quantidade
router.put('/:id_usuario/:id_produto/add', async (req, res) => {
  const { id_usuario, id_produto } = req.params;

  try {
    await ligacao.query(
      'UPDATE carrinho SET quantidade = quantidade + 1 WHERE id_usuario = ? AND id_produto = ?',
      [id_usuario, id_produto]
    );

    res.json({ message: 'Quantidade aumentada!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao aumentar quantidade' });
  }
});

// Diminuir quantidade
router.put('/:id_usuario/:id_produto/remove', async (req, res) => {
  const { id_usuario, id_produto } = req.params;

  try {
    // Verifica quantidade atual
    const [rows] = await ligacao.query(
      'SELECT quantidade FROM carrinho WHERE id_usuario = ? AND id_produto = ?',
      [id_usuario, id_produto]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produto não está no carrinho' });
    }

    if (rows[0].quantidade <= 1) {
      await ligacao.query(
        'DELETE FROM carrinho WHERE id_usuario = ? AND id_produto = ?',
        [id_usuario, id_produto]
      );
      return res.json({ message: 'Produto removido do carrinho' });
    }

    await ligacao.query(
      'UPDATE carrinho SET quantidade = quantidade - 1 WHERE id_usuario = ? AND id_produto = ?',
      [id_usuario, id_produto]
    );

    res.json({ message: 'Quantidade reduzida!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao diminuir quantidade' });
  }
});

// Remover produto do carrinho
router.delete('/:id_usuario/:id_produto', async (req, res) => {
  const { id_usuario, id_produto } = req.params;

  try {
    const [result] = await ligacao.query(
      'DELETE FROM carrinho WHERE id_usuario = ? AND id_produto = ?',
      [id_usuario, id_produto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado no carrinho' });
    }

    res.json({ message: 'Produto removido do carrinho com sucesso' });
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    res.status(500).json({ error: 'Erro ao remover produto do carrinho' });
  }
});

// Limpar carrinho inteiro
router.delete('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;

  try {
    await ligacao.query('DELETE FROM carrinho WHERE id_usuario = ?', [id_usuario]);
    res.json({ message: 'Carrinho limpo com sucesso!' });
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
    res.status(500).json({ error: 'Erro ao limpar carrinho' });
  }
});

module.exports = router;
