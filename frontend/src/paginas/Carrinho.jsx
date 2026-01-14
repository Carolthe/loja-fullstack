import CardCarrinho from "../components/CardCarrinho";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Link } from "react-router-dom";
//import { useEffect } from "react";
import api from "../services/api";
import Credibilidade from "../components/Credibilidade";
import VerProdutos from "../components/VerProdutos";
import CarrinhoVazio from "../components/CarrinhoVazio";
import { toast } from "react-toastify";
import { useCart } from "../context/CartProvider.jsx"

export default function Carrinho() {
  const {
    carrinho,
    setCarrinho,
    carregarCarrinho,
    total,
    totalItens,
  } = useCart();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  async function limparCarrinho() {
    if (!usuario) {
      return toast.error("Faça login para limpar o carrinho");
    }

    try {
      await api.delete(`/carrinho/${usuario.id_usuario}`);
      setCarrinho([]);
      toast.success("Carrinho limpo com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao limpar carrinho");
    }
  }

  return (
    <div className="mt-[30px]">
      <VerProdutos />
      <p className="text-[23px] text-center font-semibold">Seus Produtos</p>
      <div className="flex justify-between mx-[20px] my-[15px] text-sm text-font-cinza">
        <p>PRODUTOS <span>({totalItens})</span></p>
        <p>TOTAL <span>({total.toFixed(2).replace(".", ",")})</span></p>
      </div>
      <hr className="border-t border-gray-400/20" />
      
      {carrinho.length === 0 ? (
        <CarrinhoVazio text="Carrinho Vazio" />
      ) : (
        carrinho.map((produto) => (
          <CardCarrinho
            key={produto.id_produto}
            product={produto}
            descricaoProduto={produto.descricao}
            atualizarCarrinho={carregarCarrinho}
          />
        ))
      )}

      <hr className="border-t border-gray-400/20" />

      {carrinho.length > 0 && (
        <div className="flex flex-col items-center mt-[30px]">
          <p className="mb-[20px] font-semibold">Total:<span className="text-font-cinza ml-[20px]">
            {total.toFixed(2).replace(".", ",")} $</span></p>
          <Link to="/dadosLocalizacao">
            <button className="w-[310px] h-[50px] text-white bg-amarelo-principal font-bold rounded-[15px]">
              Finalizar Compra
            </button>
          </Link>
          <button className="text-azul-escuro mt-[30px] text-[15px] underline"
            onClick={limparCarrinho}>Limpar o Carrinho</button>
        </div>
      )}
      <Credibilidade />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
