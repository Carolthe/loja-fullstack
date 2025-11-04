const express = require('express')
const router = express.Router()
const pool = require("../models/db")

router.get('/', async(req, res) =>{
    try{
        const [rows] = await pool.query('SELECT * FROM categorias')
        res.json(rows)
    }catch (error){
        console.error(error)
        res.status(500).json({error: 'Erro ao buscar categorias'})
    }
})

//Busca produtos por categoria (ex: /api/categorias/1/produtos)
router.get('/:id_categoria/produtos', async (req, res) => {
    const {id_categoria} = req.params

    try{
        const [rows] = await pool.query(
            `SELECT p.id_produto, p.nome, p.preco, p.imagem
            FROM produtos p JOIN produtos_categorias pc ON p.id_produto = pc.id_produto
            WHERE pc.id_categoria = ?`,
            [id_categoria]
        )
        res.json(rows)
    } catch (error){
        console.error(error)
        res.status(500).json({error: 'Erro ao buscar produtos por categoria'})
    }
})

module.exports = router;