import { useState } from "react";
import axios from "axios";

import Credibilidade from "../components/Credibilidade";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import ScrollToTop from "../components/ScrollToTop";

export default function Pagamento() {
  const [paymentData, setPaymentData] = useState(null);
  const [metodo, setMetodo] = useState("multibanco"); // "multibanco" ou "mbway"
  const [phone, setPhone] = useState(""); // só para MB WAY
  const [loading, setLoading] = useState(false);
  const [paymentReference, setPaymentReference] = useState(null);
  const [status, setStatus] = useState(null);


  const handleCheckout = async () => {
    setLoading(true);
    try {
      const payload = {
        amount: 59.90,
        metodo,
      };

      if (metodo === "mbway") {
        payload.phone = phone; // telefone obrigatório para MB WAY
      }

      const response = await axios.post(
        "http://localhost:3000/api/pagamento/create",
        payload
      );

      setPaymentData(response.data.data); // atualiza estado com dados do pagamento

      setPaymentData(response.data.data);
      if (metodo === "mbway") {
        setPaymentReference(response.data.data.reference);
        setStatus("pending"); // status inicial
      }


      console.log("Pagamento criado:", response.data);
    } catch (error) {
      console.error("Erro ao criar pagamento:", error.response?.data || error.message);
      alert("Erro ao criar pagamento. Veja o console para detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-[20px] ">
        <p className="font-semibold text-center mt-[25px]">
          Métodos de Pagamento
        </p>
        <p className="text-font-cinza mx-[10px] text-center">
          Todas as transações são seguras e criptografadas.
        </p>

        {/* Seleção de método */}
        <div className="mt-4 flex gap-4">
          <button
            className={metodo === "multibanco" ? "bg-verde text-white px-4 py-2" : "px-4 py-2"}
            onClick={() => setMetodo("multibanco")}
          >
            Multibanco
          </button>
          <button
            className={metodo === "mbway" ? "bg-verde text-white px-4 py-2" : "px-4 py-2"}
            onClick={() => setMetodo("mbway")}
          >
            MB WAY
          </button>
        </div>

        {/* Input telefone para MB WAY */}
        {metodo === "mbway" && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Número de telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
        )}

        {/* Botão de pagamento */}
        <div className="mt-4">
          <button
            onClick={handleCheckout}
            className="bg-blue-600 text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Processando..." : "Pagar"}
          </button>
        </div>

        {/* Exibição dos dados do pagamento */}
        {paymentData && (
          <div className="mt-4 border p-4 rounded shadow-md w-80">
            <p>
              <strong>Entidade:</strong> {paymentData.entity}
            </p>
            <p>
              <strong>Referência:</strong> {paymentData.reference}
            </p>
            <p>
              <strong>Montante:</strong> {Number(paymentData.amount).toFixed(2)}€
            </p>

            {metodo === "multibanco" && (
              <p className="mt-2 text-sm text-gray-700">
                Pague este montante no seu homebanking ou numa caixa Multibanco usando a entidade e referência acima.
              </p>
            )}

            {metodo === "mbway" && paymentData.checkout_url && (
              <p className="mt-2 text-sm text-gray-700">
                Siga o link enviado para concluir o pagamento via MB WAY:{" "}
                <a
                  href={paymentData.checkout_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Pagar com MB WAY
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      <Credibilidade />
      <Newsletter />
      <ScrollToTop />
      <Footer />
    </>
  );
}
