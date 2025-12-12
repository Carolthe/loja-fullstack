// routes/pagamento.js
const express = require("express");
const axios = require("axios");
const eupago = require("@api/eupago")

const router = express.Router();

/**
 * Criar pagamento no Eupago
 * Aceita Multibanco e MB WAY
 */
router.post("/create", async (req, res) => {
    
   const response = await eupago.multibanco({
    chave: "demo-b290-6d99-6cf0-931",
    valor: "23.4",
    per_dup: "0"
   }).then(data => console.log(data))
   res.status(201).send(response)


});

// /**
//  * CALLBACK (WEBHOOK) DO EUPAGO
//  * Quando o pagamento for confirmado, o Eupago envia uma notificação aqui
//  */
// router.post("/callback", (req, res) => {
//   const dados = req.body;

//   console.log("📌 Pagamento confirmado no Eupago:", dados);

//   // Aqui você deve:
//   // - atualizar tabela de compras no banco
//   // - marcar pedido como pago
//   // - enviar email ou notificação para o cliente, etc.

//   res.status(200).send("OK"); // obrigatório para o Eupago aceitar o callback
// });

module.exports = router;

/**
 * Criar pagamento no Eupago
 * Aceita Multibanco e MB WAY
 */
// router.post("/create", async (req, res) => {
//   try {
//     const { amount, cliente, metodo, phone } = req.body;

//     // 🔹 Validação mínima
//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: "Amount inválido" });
//     }

//     if (!cliente || typeof cliente !== "string") {
//       return res.status(400).json({ error: "Cliente inválido" });
//     }

//     if (!["mbway", "multibanco"].includes(metodo)) {
//       return res.status(400).json({ error: "Método inválido" });
//     }

//     let payload = {
//       amount,
//       description: `Compra de ${cliente}`,
//       entity: process.env.EUPAGO_ENTIDADE,
//     };

//     // 🔹 Se for MB WAY
//     if (metodo === "mbway") {
//       if (!phone) {
//         return res.status(400).json({ error: "Telefone obrigatório para MB WAY" });
//       }
//       payload.method = "mbway";
//       payload.phone = phone; // número do cliente
//     }

//     // 🔹 Se for MULTIBANCO
//     if (metodo === "multibanco") {
//       payload.method = "multibanco";
//       payload.reference = null; // Eupago gera referência automaticamente
//     }

//     // 🔹 Chamada à API Eupago
//     const response = await axios.post(
//       "https://sandbox.eupago.pt/checkout/api/v1/payments",
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EUPAGO_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // 🔹 Resposta formatada para frontend
//     res.json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     console.error("Erro ao criar pagamento Eupago:", error.response?.data || error.message);
//     res.status(500).json({ error: "Erro ao criar pagamento Eupago" });
//   }
// });

// /**
//  * CALLBACK (WEBHOOK) DO EUPAGO
//  * Quando o pagamento for confirmado, o Eupago envia uma notificação aqui
//  */
// router.post("/callback", (req, res) => {
//   const dados = req.body;

//   console.log("📌 Pagamento confirmado no Eupago:", dados);

//   // Aqui você deve:
//   // - atualizar tabela de compras no banco
//   // - marcar pedido como pago
//   // - enviar email ou notificação para o cliente, etc.

//   res.status(200).send("OK"); // obrigatório para o Eupago aceitar o callback
// });
