import ProductCard from "../components/ProductCard.jsx";
import Credibility from "../components/Crediblility.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import ViewProducts from "../components/ViewProducts.jsx";
import api from "../services/api.js";
import { useState, useEffect } from "react";

export default function Favorites() {
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
      <ViewProducts />
      <div className="mt-[25px]">
        <p className="text-center font-semibold text-[22px]">
          Seus produtos favoritos ❤️
        </p>
        <p className="text-center mx-[20px] text-fontGray">
          Aqui estão os produtos que você marcou como favoritos.
        </p>
        {favoritos.length === 0 ? (
          <p className="text-center mt-[20px] text-fontGray">
            Nenhum favorito ainda.
          </p>
        ) : (
          <div className="mt-[20px] mx-[10px] flex justify-center flex-wrap gap-[10px]">
            {favoritos.map((produto) => (
              <ProductCard
                key={produto.id_produto}
                id={produto.id_produto}
                imgProduct={produto.imagem}
                title={produto.nome}
                price={parseFloat(produto.preco)}
              />
            ))}
          </div>
        )}
      </div>
      <Credibility />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
