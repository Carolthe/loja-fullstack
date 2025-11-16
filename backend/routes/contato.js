const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validação
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Nome, email e mensagem são obrigatórios' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: subject || 'Nova mensagem de contato',
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    });

    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Falha ao enviar a mensagem. Tente novamente.' });
  }
});

module.exports = router;
