const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM produtos ativo = 1')
        res.json(rows)
    } catch (error){
        res.status(500).json({ error: 'Erro ao buscar produtos'})
    }
})

module.exports = router;