import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Credibilidade from "../components/Credibilidade";
import product7 from "../imgProducts/product7.jpg";
import api from "../services/api";
import { toast } from "react-toastify";

export default function DetalheProdutos() {
  const location = useLocation();
  const navigate = useNavigate();
  const produto = location.state;

  const [quantidade, setQuantidade] = useState(1);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!produto) {
    return <p>Produto não encontrado.</p>;
  }

  function aumentarQuantidade() {
    setQuantidade((prev) => prev + 1);
  }

  function diminuirQuantidade() {
    if (quantidade > 1) {
      setQuantidade((prev) => prev - 1);
    }
  }

  async function adicionarCarrinho() {
    if (!usuario) {
      toast.error("Você precisa estar logado para adicionar produtos ao carrinho!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return
    }

    try {
      await api.post("/carrinho", {
        id_usuario: usuario.id_usuario,
        id_produto: produto.id,
        quantidade,
      });

      toast.info(`"${produto.title}" foi adicionado ao carrinho!`);

    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      toast.error(error.response?.data?.error || "Erro ao adicionar produto ao carrinho.");
    }
  }

  return (
    <>
      <div className="mt-[15px] mx-[15px]">
        <img className="w-full h-[400px] object-cover"
          src={produto.imgProduct}
          alt={produto.title} />
          
        <p className="text-[22px] font-semibold mt-[15px]">{produto.title}</p>
        <p className="text-[22px]">Produto de alta qualidade</p>
        <p className="text-[20px]">€ {produto.price.toFixed(2).replace(".", ",")}</p>
        <p className="text-verde my-[5px]"> Envio Gratuito para este artigo </p>

        <div className="flex items-center my-[18px]">
          <button onClick={adicionarCarrinho} className="flex items-center justify-center rounded-[15px] text-[15px] bg-[#5769a9] text-white w-[180px] h-[40px]"> Adicionar ao carrinho </button>
          <button onClick={diminuirQuantidade} className="w-[40px] h-[40px] ml-[50px] border-[1px] border-[#5769a9]"> - </button>
          <p className="mx-[15px] font-semibold">{quantidade}</p>
          <button onClick={aumentarQuantidade} className="w-[40px] h-[40px] border-[1px] border-[#5769a9]" > + </button>
        </div>
        <p className="flex items-center pl-[10px] bg-yellow-200 rounded-[15px] h-[50px] mb-[5px]">
          <span className="font-semibold pr-[5px]">Envio:</span> Gratuito</p>
        <p className="flex items-center pl-[10px] bg-yellow-200 rounded-[15px] h-[50px] mb-[5px]">Pagamento seguro</p>
        <p className="flex items-center pl-[10px] bg-yellow-200 rounded-[15px] h-[50px]">
          <span className="font-semibold pr-[5px]"> Estimativa de entrega:</span>10–30 dias úteis</p>
        <hr className="mt-[40px]" />
        <p className="font-semibold text-[22px] mt-[20px] mb-[8px]">Dimensões</p>
        <p><span className="font-semibold mr-[40px]">Largura:</span> 47 cm</p>
        <p><span className="font-semibold mr-[50px]">Altura:</span> 57 cm</p>
        <hr className="mt-[20px]" />
        <img src={product7} alt="Detalhes do produto" />
      </div>
      <Credibilidade />
      <Footer />
    </>
  );
}
