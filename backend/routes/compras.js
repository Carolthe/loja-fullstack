const express = require('express');
const router = express.Router();
const ligacao = require('../models/db');

// FINALIZAR COMPRA
router.post('/finalizar', async (req, res) => {
  const { id_usuario } = req.body;

  try {
    // 1. Buscar itens do carrinho
    const [carrinho] = await ligacao.query(
      `SELECT c.*, p.preco
       FROM carrinho c
       JOIN produtos p ON c.id_produto = p.id_produto
       WHERE id_usuario = ?`,
      [id_usuario]
    );

    if (carrinho.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    // 2. Calcular total
    const total = carrinho.reduce(
      (acumulador, item) => acumulador + item.preco * item.quantidade,
      0
    );

    // 3. Criar pedido
    const [pedido] = await ligacao.query(
      `INSERT INTO pedidos (id_usuario, total)
       VALUES (?, ?)`,
      [id_usuario, total]
    );

    const id_pedido = pedido.insertId;

    // 4. Inserir itens do pedido
    for (const item of carrinho) {
      await ligacao.query(
        `INSERT INTO pedido_itens
          (id_pedido, id_produto, quantidade, preco_unitario)
         VALUES (?, ?, ?, ?)`,
        [id_pedido, item.id_produto, item.quantidade, item.preco]
      );
    }

    // 5. Limpar o carrinho
    await ligacao.query(`DELETE FROM carrinho WHERE id_usuario = ?`, [id_usuario]);

    res.json({ message: "Compra finalizada com sucesso!", id_pedido });

  } catch (error) {
    console.error("Erro ao finalizar compra:", error);
    res.status(500).json({ error: "Erro ao finalizar compra" });
  }
});
 
module.exports = router;
