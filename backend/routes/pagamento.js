const express = require("express");
const axios = require("axios");
const router = express.Router();

/**
 * CRIAR PAGAMENTO (MULTIBANCO OU MB WAY)
 */
router.post("/create", async (req, res) => {
  try {
    const { amount, metodo, phone } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: "Valor inválido" });
    }

    // =========================
    // MULTIBANCO
    // =========================
    if (metodo === "multibanco") {
      const response = await axios.post(
        "https://sandbox.eupago.pt/clientes/rest_api/multibanco/create",
        {
          chave: process.env.EUPAGO_API_KEY,
          valor: Number(amount).toFixed(2), // string numérica
          per_dup: 0,
        },
        {
          headers: { "Content-Type": "application/json", Accept: "application/json" },
        }
      );

      const data = response.data;

      if (!data.entidade || !data.referencia) {
        return res.status(500).json({
          error: "Resposta inválida da Eupago (Multibanco)",
          debug: data,
        });
      }

      return res.json({
        success: true,
        data: {
          entity: data.entidade,
          reference: data.referencia,
          amount: data.valor,
        },
      });
    }

    // =========================
    // MB WAY
    // =========================
    if (metodo === "mbway") {
      if (!phone) {
        return res.status(400).json({ error: "Telefone obrigatório" });
      }

      const apiKey = `ApiKey ${process.env.EUPAGO_API_KEY}`;

      const response = await axios.post(
        "https://sandbox.eupago.pt/api/v1.02/mbway/create",
        {
          payment: {
            amount: { currency: "EUR", value: Number(amount).toFixed(2) },
            identifier: `Pagamento-${Date.now()}`,
            successUrl: "https://sua-loja.com/success",
            failUrl: "https://sua-loja.com/fail",
            backUrl: "https://sua-loja.com/back",
            lang: "PT",
            customerPhone: phone,
            countryCode: "+351",
          },
          customer: {
            notify: true,
            email: "cliente@email.com",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: apiKey,
          },
        }
      );

      const data = response.data;

      if (!data.referencia) {
        return res.status(500).json({
          error: "Resposta inválida da Eupago (MB WAY)",
          debug: data,
        });
      }

      return res.json({
        success: true,
        data: {
          reference: data.referencia,
          checkout_url: data.url || null,
        },
      });
    }

    return res.status(400).json({ error: "Método inválido" });
  } catch (err) {
    console.error("Erro ao criar pagamento Eupago:", err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

/**
 * CONSULTAR STATUS DO PAGAMENTO
 */
router.get("/status/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    if (!reference) return res.status(400).json({ error: "Referência obrigatória" });

    const response = await axios.post(
      "https://sandbox.eupago.pt/clientes/rest_api/status",
      {
        chave: process.env.EUPAGO_API_KEY,
        referencia: reference,
      },
      {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      }
    );

    const status = response.data;

    return res.json({ success: true, status });
  } catch (err) {
    console.error("Erro ao consultar status Eupago:", err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao consultar status do pagamento" });
  }
});

/**
 * CALLBACK EUPAGO (obrigatório)
 */
router.post("/callback", async (req, res) => {
  try {
    const { referencia, estado, metodo, valor } = req.body;

    console.log("📌 CALLBACK EUPAGO recebido:", req.body);

    // Aqui você pode atualizar o status no seu banco de dados
    // await db.pagamentos.update({ referencia }, { status: estado });

    res.status(200).send("OK");
  } catch (err) {
    console.error("Erro no callback Eupago:", err);
    res.status(500).send("Erro no callback");
  }
});

module.exports = router;
