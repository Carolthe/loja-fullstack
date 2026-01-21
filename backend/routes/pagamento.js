const express = require("express");
const axios = require("axios");
const router = express.Router();

//Cria pagamento Multibanco




router.post("/create", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: "Valor inválido" });
    }

    const response = await axios.post(
      "https://sandbox.eupago.pt/clientes/rest_api/multibanco/create",
      {
        chave: process.env.EUPAGO_API_KEY,
        valor: Number(amount).toFixed(2),
        per_dup: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = response.data;

    if (!data.entidade || !data.referencia) {
      return res.status(500).json({
        error: "Resposta inválida da Eupago",
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
  } catch (err) {
    console.error("Erro ao criar pagamento Multibanco:", err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

// Consulta status do pagamento
router.get("/status/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({ error: "Referência obrigatória" });
    }

    const response = await axios.post(
      "https://sandbox.eupago.pt/clientes/rest_api/status",
      {
        chave: process.env.EUPAGO_API_KEY,
        referencia: reference,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.json({
      success: true,
      status: response.data,
    });
  } catch (err) {
    console.error("Erro ao consultar status Eupago:", err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao consultar status do pagamento" });
  }
});

/**
 * CALLBACK EUPAGO
 */
router.post("/callback", async (req, res) => {
  try {
    console.log("CALLBACK EUPAGO *pagamento recebido*:", req.body);

    const { referencia, estado, valor } = req.body;

    // Exemplo:
    // await db.pagamentos.update({ referencia }, { status: estado });

    res.status(200).send("OK");
  } catch (err) {
    console.error("Erro no callback Eupago:", err);
    res.status(500).send("Erro no callback");
  }
});

module.exports = router;
