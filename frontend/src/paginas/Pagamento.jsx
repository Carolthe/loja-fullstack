import { useState, useEffect } from "react";
import axios from "axios";

import Credibilidade from "../components/Credibilidade";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import ScrollToTop from "../components/ScrollToTop";

export default function Pagamento() {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Criar pagamento automaticamente ao abrir a página
    async function criarPagamento() {
      try {
        const payload = {
          amount: 59.90, // aqui você pode pegar o total do carrinho
          metodo: "multibanco",
        };

        const response = await axios.post(
          "http://localhost:3000/api/pagamento/create",
          payload
        );

        setPaymentData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao criar pagamento:", error.response?.data || error.message);
        alert("Erro ao criar pagamento. Veja o console para detalhes.");
        setLoading(false);
      }
    }

    criarPagamento();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-[20px]">
        <p className="font-semibold text-center mt-[25px]">
          Pagamento Multibanco
        </p>
        <p className="text-font-cinza mx-[10px] mt-[5px] mb-[10px] text-center">
          Utilize os dados abaixo para efetuar o pagamento no seu homebanking ou numa caixa Multibanco.
        </p>

        {loading ? (
          <p className="mt-4">Gerando referência...</p>
        ) : paymentData ? (
          <div className="mt-4 border p-4 rounded shadow-md w-80 text-center">
            <p>
              <strong>Entidade:</strong> {paymentData.entity}
            </p>
            <p>
              <strong>Referência:</strong> {paymentData.reference}
            </p>
            <p>
              <strong>Montante:</strong> {Number(paymentData.amount).toFixed(2)}€
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Pague este montante no seu homebanking ou numa caixa Multibanco usando a entidade e referência acima.
            </p>
          </div>
        ) : (
          <p className="mt-4 text-red-600">Não foi possível gerar a referência.</p>
        )}
      </div>

      <Credibilidade />
      <Newsletter />
      <ScrollToTop />
      <Footer />
    </>
  );
}
