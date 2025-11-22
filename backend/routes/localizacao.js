//modulos importados
const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Adiciona a localização do cliente a base de dados 
router.post('/:id_usuario', async (req, res) => {
    const userId = req.params.id_usuario;
    const { pais, cidade, rua, cep, info_adicional } = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM localizacao WHERE id_usuario = ?',
            [userId]
        );

        if (rows.length > 0) {
            return res.status(400).json({ error: "Localização já existe. Use PUT para atualizar." });
        }

        await pool.query(
            `INSERT INTO localizacao (id_usuario, pais, cidade, rua, cep, info_adicional)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, pais, cidade, rua, cep, info_adicional]
        );

        res.json({ message: "Localização criada com sucesso!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao salvar localização" });
    }
});

// Atualiza a localização do cliente
router.put('/:id_usuario', async (req, res) => {
    const userId = req.params.id_usuario;
    const { pais, cidade, rua, cep, info_adicional } = req.body;

    try {
        const sql = `
            UPDATE localizacao
            SET pais = ?, cidade = ?, rua = ?, cep = ?, info_adicional = ?
            WHERE id_usuario = ?
        `;

        const [result] = await pool.query(sql, [pais, cidade, rua, cep, info_adicional, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Localização não encontrada." });
        }

        res.json({ message: "Localização atualizada com sucesso!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar localização" });
    }
});

// Dados da localização para o front-end receber
router.get('/:id_usuario', async (req, res) => {
    const userId = req.params.id_usuario;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM localizacao WHERE id_usuario = ?',
            [userId]
        );

        if (rows.length === 0) {
            return res.json({ localizacao: null });
        }

        res.json({ localizacao: rows[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao carregar localização" });
    }
});

module.exports = router;
