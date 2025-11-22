//modulos importados
const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Adicionar produto ao carrinho
router.post('/', async (req, res) => {
  const { id_usuario, id_produto, quantidade } = req.body;

  try {
// Verifica se o produto já está no carrinho
    const [rows] = await pool.query(
      'SELECT * FROM carrinho WHERE id_usuario = ? AND id_produto = ?',
      [id_usuario, id_produto]
    );

    if (rows.length > 0) {
// Atualiza quantidade se já existir
      await pool.query(
        'UPDATE carrinho SET quantidade = quantidade + ? WHERE id_usuario = ? AND id_produto = ?',
        [quantidade || 1, id_usuario, id_produto]
      );
    } else {
// Insere novo produto
      await pool.query(
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
    const [rows] = await pool.query(
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

//Remove produto do carrinho
router.delete('/:id_usuario/:id_produto', async(req, res)=> {
  const {id_usuario, id_produto} = req.params

  try{
    const [result] = await pool.query(
      'DELETE FROM carrinho WHERE id_usuario = ? AND id_produto = ?',
      [id_usuario, id_produto]
    )

  if (result.affectedRows === 0){
    return res.status(404).json({error: 'Produto não encontrado no carrinho'})
  }
  res.json({message: 'Produto removido do carrinho com sucesso'})
    } catch (error){
      console.error('Erro ao remover produto:', error)
      res.status(500).json({error: 'Erro ao remover produto do carrinho'})
    }
})

module.exports = router;