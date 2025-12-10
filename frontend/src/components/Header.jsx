import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LiaUserSolid, LiaHeart, LiaShoppingBagSolid, LiaHomeSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Carrega quantidade do carrinho
  useEffect(() => {
    async function carregarCarrinho() {
      if (!usuario) return setCartCount(0);

      try {
        const res = await api.get(`/carrinho/${usuario.id_usuario}`);
        setCartCount(res.data.length);
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      }
    }
    carregarCarrinho();
  }, [usuario]);

  // Carrega quantidade de favoritos
  useEffect(() => {
    async function carregarFavoritos() {
      if (!usuario) return setFavCount(0);

      try {
        const res = await api.get(`/favoritos/${usuario.id_usuario}`);
        setFavCount(res.data.length);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    }
    carregarFavoritos();
  }, [usuario]);

  return (
    <div className="fixed z-50 flex items-center justify-between px-[20px] bg-[#5769a9] w-[100vw] md:w-[100%] h-[65px] text-white md:px-[60px] md:h-[75px]">
      <Navbar />
      <Link to="/" className="flex items-center">
        <LiaHomeSolid className="text-[18px] md:text-[40px]" />
        <p className="text-[14px] md:text-[25px]">HOMEHAVEN</p>
      </Link>
      <div className="md:flex md:gap-[30px] hidden">
        <p>Todos os Produtos</p>
        <p>Minhas Encomendas</p>
        <p>Contactar</p>
      </div>
      <div className="flex items-center text-[22px]">
        {usuario ? (
          <Link to="/perfil">
            <LiaUserSolid />
          </Link>
        ) : (
          <Link to="/login">
            <LiaUserSolid />
          </Link>
        )}
        <Link to="/favoritos" className="relative">
          <LiaHeart className="mr-[5px]" />
          {favCount > 0 && (
            <span className="absolute -top-2 -right-[3px] bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {favCount}
            </span>
          )}
        </Link>
        <Link to="/carrinho" className="relative">
          <LiaShoppingBagSolid />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-[9px] bg-orangeMain text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
