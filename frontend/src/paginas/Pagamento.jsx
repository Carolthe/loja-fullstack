import { useState, useEffect } from "react";
import axios from "axios";
import { CreditCard, Lock } from "lucide-react";
import Credibilidade from "../components/Credibilidade";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import ScrollToTop from "../components/ScrollToTop";
import { useCart } from "../context/CartProvider.jsx";

export default function Pagamento() {
  const { total } = useCart(); // <-- pega o total do carrinho
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function criarPagamento() {
      if (total <= 0) {
        alert("Seu carrinho está vazio.");
        setLoading(false);
        return;
      }

      try {
        const payload = {
          amount: total, 
          metodo: "multibanco",
        };

        const response = await axios.post(
          "http://localhost:3000/api/pagamento/create",
          payload
        );

        setPaymentData(response.data.data);
      } catch (error) {
        console.error(
          "Erro ao criar pagamento:",
          error.response?.data || error.message
        );
        alert("Pagamento em produção.");
      } finally {
        setLoading(false);
      }
    }

    criarPagamento();
  }, [total]); //refaz se o total mudar

  return (
    <>
      <div className="mt-[40px] bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

          <div className="flex flex-col items-center mb-6">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <CreditCard className="text-green-600" size={28} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Pagamento Multibanco</h1>
            <p className="text-sm text-gray-500 text-center mt-1">Utilize os dados abaixo para concluir o pagamento</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-10">
              <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mb-4" />
              <p className="text-gray-600 text-sm"> Gerando referência de pagamento...</p>
            </div>
          ) : paymentData ? (
            <div className="border border-gray-200 rounded-xl p-5 space-y-4">
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Entidade</span>
                <span className="font-semibold text-gray-800">
                  {paymentData.entity}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Referência</span>
                <span className="font-mono font-semibold text-gray-800">
                  {paymentData.reference}
                </span>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-gray-500">Total a pagar</span>
                <span className="text-2xl font-bold text-green-600">
                  {Number(paymentData.amount).toFixed(2)}€
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                Efetue o pagamento no seu aplicativo bancário ou em um caixa Multibanco utilizando a entidade e referência acima.
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2"><Lock size={14} />Pagamento seguro e protegido</div>
            </div>
          ) : (
            <p className="text-red-600 text-center text-sm">Não foi possível gerar a referência de pagamento.</p>
          )}
        </div>
      </div>
      <Credibilidade />
      <Newsletter />
      <ScrollToTop />
      <Footer />
    </>
  );
}
