import CardProduto from "../components/CardProduto.jsx";
import Credibilidade from "../components/Credibilidade.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import VerProdutos from "../components/VerProdutos.jsx";
import api from "../services/api.js";
import { useState, useEffect } from "react";
import CarrinhoVazio from "../components/CarrinhoVazio.jsx";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    async function carregarFavoritos() {
      if (!usuario) return;
      try {
        const res = await api.get(`/favoritos/${usuario.id_usuario}`);
        setFavoritos(res.data);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    }
    carregarFavoritos();
  }, [usuario]);

  return (
    <div className="mt-[30px]">
      <VerProdutos />
      <div className="mt-[25px]">
        <p className="text-center font-semibold text-[22px]">
          Seus produtos favoritos
        </p>
        <p className="text-center mx-[20px] text-font-cinza">
          Aqui estão os produtos que você marcou como favoritos.
        </p>
        {favoritos.length === 0 ? (
          // <p className="text-center mt-[20px] text-font-cinza">Nenhum favorito ainda.</p>
         <CarrinhoVazio text="Favoritos Vazio" />
        ) : (
          <div className="mt-[20px] mx-[10px] flex justify-center flex-wrap gap-[10px]">
            {favoritos.map((produto) => (
              <CardProduto
                key={produto.id_produto}
                id={produto.id_produto}
                imgProduct={produto.imagem}
                title={produto.nome}
                descricaoProduto={produto.descricao}
                price={parseFloat(produto.preco)}
              />
            ))}
          </div>
        )}
      </div>
      <Credibilidade />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
