const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// -----------------------------
// Registro de usuário
// -----------------------------
router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length > 0) return res.status(400).json({ error: 'Email já cadastrado' });

        const senhaHash = await bcrypt.hash(senha, 10);
        await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senhaHash]);

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});

// -----------------------------
// Login de usuário
// -----------------------------
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: 'Email não encontrado' });

        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta' });

        // Gerar token JWT
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, nome: usuario.nome, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            message: 'Login realizado com sucesso!',
            usuario: { id_usuario: usuario.id_usuario, nome: usuario.nome, email: usuario.email },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// -----------------------------
// Solicitar link de recuperação de senha
// -----------------------------
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(200).json({ message: 'Se o e-mail existir, um link foi enviado.' });

        const token = crypto.randomBytes(32).toString('hex');
        const expiry = new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' ');

        await pool.query('UPDATE usuarios SET reset_token = ?, reset_expires = ? WHERE email = ?', [token, expiry, email]);

        const resetLink = `${process.env.FRONTEND_URL}/password-recovery?token=${token}&email=${encodeURIComponent(email)}`;
        console.log("Link de reset (dev):", resetLink);

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Recuperação de senha - Loja Online',
            html: `<p>Olá,</p>
                   <p>Para redefinir sua senha, clique no link abaixo:</p>
                   <a href="${resetLink}" target="_blank">${resetLink}</a>
                   <p>O link expira em 1 hora.</p>`
        });

        res.json({ message: 'Se o e-mail existir, um link foi enviado.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar solicitação' });
    }
});

// -----------------------------
// Resetar senha com token
// -----------------------------
router.post('/reset-password', async (req, res) => {
    const { email, token, senha } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ? AND reset_token = ?', [email, token]);
        if (rows.length === 0) return res.status(400).json({ error: 'Token inválido' });

        const usuario = rows[0];
        if (!usuario.reset_expires || new Date(usuario.reset_expires) < new Date()) {
            return res.status(400).json({ error: 'Token expirado' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        await pool.query('UPDATE usuarios SET senha = ?, reset_token = NULL, reset_expires = NULL WHERE email = ?', [senhaHash, email]);

        res.json({ message: 'Senha alterada com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao resetar senha' });
    }
});

module.exports = router;
