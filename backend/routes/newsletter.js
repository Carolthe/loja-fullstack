const express = require('express')
const router = express.Router()
const pool = require('../models/db')

// Rota para cadastrar na newsletter
router.post('/', async (req, res) => {
    const {nome, email} = req.body

    if (!nome || !email) {
        return res.status(400).json({error: 'Nome e email são obrigatórios'})
    }

    try{
//Verifica se o email já está cadastrado

        const emailLower = email.toLowerCase()

        const [existing] = await pool.query(
            'SELECT * FROM newsletter WHERE email = ?',
            [emailLower]
        )
        if (existing.length > 0) {
            return res.status(400).json({error: 'Email já inscrito na newsletter'})
        }
//Insere na base de dados
        await pool.query(
            'INSERT INTO newsletter (nome, email) VALUES (?, ?)',
            [nome, emailLower]
        )
        res.status(201).json({ message: 'Inscrição realizada com sucesso!'})
    } catch (error){
        console.error('Erro ao cadastrar newsletter:', error)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
})

module.exports = router;