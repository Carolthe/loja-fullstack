const express = require("express");
const eupago = require("@api/eupago");
const router = express.Router();

/**
 * CRIAR PAGAMENTO (MULTIBANCO OU MB WAY)
 */
router.post("/create", async (req, res) => {
   try {
      const { amount, metodo, phone } = req.body;

      if (!amount || amount <= 0) {
         return res.status(400).json({ error: "Valor inválido" });
      }

      let result;

      //     if (metodo === "multibanco") {
      //   // Criar pagamento Multibanco
      //   result = await eupago.multibanco({
      //     chave: process.env.EUPAGO_API_KEY,
      //     valor: amount.toFixed(2).toString(), // importante: enviar como string
      //     per_dup: "0",
      //   });

      //   console.log("Result Multibanco:", result);

      // Ajuste importante: acessar result.data
    //  const mbResult = result.data;

   //    return res.json({
   //       success: true,
   //       data: {
   //          entity: mbResult.entidade,
   //          reference: mbResult.referencia,
   //          amount: mbResult.valor,
   //       },
   //    });
   // }

if (metodo === "mbway") {
      if (!phone) {
         return res.status(400).json({ error: "Telefone obrigatório" });
      }

      result = await eupago.mbway({
         chave: process.env.EUPAGO_API_KEY,
         valor: amount.toFixed(2).toString(),
         telemovel: phone,
         descricao: "Pagamento loja",
      });

      const mbwayResult = result.data;

      return res.json({
         success: true,
         data: {
            checkout_url: mbwayResult.url,
            reference: mbwayResult.reference, // importante para status/polling
         },
      });
   }


   return res.status(400).json({ error: "Método inválido" });

} catch (err) {
   console.error("Erro ao criar pagamento Eupago:", err);
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

      const status = await eupago.status({
         chave: process.env.EUPAGO_API_KEY,
         referencia: reference,
      });

      // status pode ser: 'paid', 'pending', 'canceled', etc
      res.json({ success: true, status });
   } catch (err) {
      console.error("Erro ao consultar status Eupago:", err);
      res.status(500).json({ error: "Erro ao consultar status do pagamento" });
   }
});

/**
 * CALLBACK EUPAGO (obrigatório)
 * Recebe notificações de pagamento e deve atualizar o status no DB
 */
router.post("/callback", async (req, res) => {
   try {
      const { referencia, estado, metodo, valor } = req.body;

      console.log("📌 CALLBACK EUPAGO recebido:", req.body);

      // Aqui você pode atualizar o status no seu banco de dados
      // Exemplo fictício:
      // await db.pagamentos.update({ referencia }, { status: estado });

      res.status(200).send("OK");
   } catch (err) {
      console.error("Erro no callback Eupago:", err);
      res.status(500).send("Erro no callback");
   }
});

module.exports = router;
