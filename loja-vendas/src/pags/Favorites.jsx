import ProductCard from "../components/ProductCard.jsx";
import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ViewProducts from "../components/ViewProducts";
import api from '../services/api.js'
import { useState } from "react";
import { useEffect } from "react";

export default function Favorites() {
  const [favoritos, setFavoritos] = useState([])
  const id_usuario = 1

  useEffect(() => {
    async function carregarFavoritos() {
      try {
        const res = await api.get(`/favoritos/${id_usuario}`)
        setFavoritos(res.data)
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error)
      }
    }
    carregarFavoritos()
  }, [])

  return (
    <div className="mt-[30px]">
      <ViewProducts />
      <div className="mt-[25px]">
        <p className="text-center font-semibold text-[22px]">Your list of favourites</p>
        <p className="text-center mx-[20px] text-fontGray" >Your time is valuable! Satisfy your desires and feel fulfilled </p>
        {favoritos.length === 0 ? (
          <p>Nenum favorito ainda.</p>
        ) : (
          <div className="mt-[20px] mx-[10px] flex justify-center flex-wrap gap-[10px]">
            {favoritos.map((produto) => (
              <ProductCard
              key={produto.id_produto}
              id_produto={produto.id_produto}
              nome={produto.nome}
              preco={produto.preco}
              imagem={produto.imagem}
              id_usuario={id_usuario}
               />
            ))}
          </div>
        )}
      </div>
      <Credibility />
      <ScrollToTop />
      <Footer />
    </div>
  )
}