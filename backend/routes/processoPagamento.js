const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

// Config Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN 
});

// Rota que recebe o pagamento do front
router.post('/process_payment', async (req, res) => {
  try {
    const { token, transaction_amount, description, installments, payment_method_id, payer } = req.body;

    const response = await mercadopago.payment.create({
      transaction_amount,
      token,
      description,
      installments,
      payment_method_id,
      payer
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
