const express = require('express')
const router = express.Router()
const pool = require('../models/db')

router.post('/', async (req, res) => {
    const { id_usuario, id_produto } = req.body

    try{
        await pool.query(
            'INSERT INTO favoritos (id_usuario, id_produto) VALUES (?, ?)',
            [id_usuario, id_produto]
        )
        res.json({ message: ' Produto adicionado aos favoritos!'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao adicionar aos favoritos' })
    }
})

//Buscar favoritos de um usuário
router.get('/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params

    try{
        const [rows] = await pool.query(
            `SELECT p.* FROM produtos p JOIN favoritos f ON p.id_produto = f.id_produto
            WHERE f.id_usuario = ?`,
            [id_usuario]
        )
        res,json(rows)
    } catch (error){
        console.error(error)
        res.status(500).json({ error: 'Erro ao buscar favoritos'})
    }
})

module.exports = router
