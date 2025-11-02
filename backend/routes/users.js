const express = require('express');
const router = express.Router();
const pool = require('../models/db')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        //Verifição se o email já está cadastrado
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
        if (rows.length > 0) {
            return res.status(400).json({ error: 'Email não encontrado' })
        }

        //Criptografa a senha
        const senhaHash = await bcrypt.hash(senha, 10)

        //Insere no banco
        await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senhaHash]
        )

        res.status(201).json({ message: 'Usuário registrado com sucesso!' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao registrar usuário' })
    }
})

//Login do usuario
router.post('/login', async (req, res) => {
    const { email, senha } = req.body

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
        if (rows, this.length === 0) {
            return res.status(401).json({ error: 'Email não encontrado' })
        }
        const usuario = rows[0]

        //Compara a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha incorreta' })
        }

        //Opcional: Gerar token JWT futuramente
        res.json({
            message: 'Login realizado com sucesso!',
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao fazer login' })
    }
})

module.exports = router;