const db = require('../models/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registro de usuário
const register = (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', 
    [username, password], 
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: 'Usuário cadastrado!' });
    });
};

// Login de usuário
const login = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', 
    [username, password], 
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) return res.status(401).json({ msg: 'Usuário ou senha inválidos' });

      const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
};

module.exports = { register, login };
