import CardCarrinho from "../components/CardCarrinho";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Credibilidade from "../components/Credibilidade";
import VerProdutos from "../components/VerProdutos";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  // Impede acesso sem login
  useEffect(() => {
    if (!usuario) {
      alert("Você precisa estar logado para acessar o carrinho.");
      navigate("/login");
    }
  }, []);

  async function carregarCarrinho() {
    if (!usuario) return;

    try {
      const res = await api.get(`/carrinho/${usuario.id_usuario}`);
      setCarrinho(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    carregarCarrinho();
  }, [usuario]);

  const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0)
  const total = carrinho.reduce(
    (sum, item) => sum + item.preco * item.quantidade,
    0
  );

  async function limparCarrinho() {
    if (!usuario) return alert("Faça login para limpar o carrinho");

    try {
      await api.delete(`/carrinho/${usuario.id_usuario}`);
      setCarrinho([]);
      alert("Carrinho limpo com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao limpar carrinho");
    }
  }

  return (
    <div className="mt-[30px] ">
      <VerProdutos />
      <p className="text-[23px] text-center font-semibold">Seus Produtos</p>
      <div className="flex justify-between mx-[20px] my-[15px] text-sm text-font-cinza">
        <p>PRODUTOS <span>({totalItens})</span></p>
        <p>TOTAL <span>({total.toFixed(2).replace(".", ",")})</span></p>
      </div>
  <hr className="border-t border-gray-400/20" />
      {carrinho.length === 0 ? (
        <p className="text-center my-[20px]">Seu carrinho está vazio</p>
      ) : (
        carrinho.map((product) => (
          <CardCarrinho
            key={product.id_produto}
            product={product}
            atualizarCarrinho={carregarCarrinho}
          />
        ))
      )}
    <hr className="border-t border-gray-400/20" />
      {carrinho.length > 0 && (
        <div className="flex flex-col items-center mt-[30px]">
          <p className="mb-[20px] font-semibold">Total:<span className="text-font-cinza ml-[20px]">
          {total.toFixed(2).replace(".", ",")} $</span></p>
          
          {/* Só deixa finalizar compra se estiver logado */}
          <Link to="/dadosLocalizacao">
            <button className="w-[310px] h-[50px] text-white bg-amarelo-principal font-semibold rounded-[15px]">Finalizar Compra</button>
          </Link>
          <button
            className=" text-azul-escuro mt-[30px] text-[15px] underline"
            onClick={limparCarrinho}> Limpar o Carrinho </button>
        </div>
      )}
      <Credibilidade />
      <ScrollToTop />
      <Footer />
    </div>
  )
}
