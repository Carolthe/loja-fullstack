import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast} from "react-toastify";

export default function CardProduto({ id, imgProduct, title, descricaoProduto, price }) {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Verifica se o produto já está nos favoritos
  useEffect(() => {
    async function checkFavorito() {
      if (!usuario) return;
      try {
        const res = await api.get(`/favoritos/${usuario.id_usuario}`);
        const jaFavoritado = res.data.some(
          (produto) => produto.id_produto === id
        );
        setIsFavorited(jaFavoritado);
      } catch (error) {
        console.error("Erro ao verificar favoritos:", error);
      }
    }
    checkFavorito();
  }, [usuario, id]);

  // Alterna o estado do favorito
  async function handleFavoritar() {
    if (!usuario) {
      toast.error("Você precisa estar logado para favoritar produtos");
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return
    }

    try {
      if (isFavorited) {
        // Remover dos favoritos
        await api.delete(`/favoritos/${usuario.id_usuario}/${id}`);
        setIsFavorited(false);
        toast.error("Produto removido dos favoritos")
        

      } else {
        // Adicionar aos favoritos
        await api.post("/favoritos", {
          id_usuario: usuario.id_usuario,
          id_produto: id,
        });
        setIsFavorited(true);
        toast.success("Produto adicionado aos favoritos")
        

      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  }

  // Adicionar ao carrinho
  async function adicionarCarrinho() {
    if (!usuario) {
      toast.error("Você precisa estar logado para adicionar produtos ao carrinho")
      setTimeout(() => {
        navigate("/login");
      }, 2100);

      return
    }

    try {
      await api.post("/carrinho", {
        id_usuario: usuario.id_usuario,
        id_produto: id,
        quantidade: 1,
      });

      toast.success(`${title} foi adicionado ao carrinho`);

    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      toast.error(error.response?.data?.error || "Erro ao adicionar produto ao carrinho.");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 w-[160px] md:w-[240px] mb-5">
      <div className="relative">
        <Link to="/productsDetails"
          state={{ id, imgProduct, title, price, descricaoProduto }}>
          <img className="w-full h-[180px] object-cover rounded-t-2xl md:h-[280px]"
            src={imgProduct}
            alt={title} />
        </Link>
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
          onClick={handleFavoritar}>
          {isFavorited ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <CiHeart className="text-red-500 text-xl" />
          )}
        </button>
      </div>
      <div className="pt-[5px] flex flex-col md:pt-[10px]">
        <h2 className="pl-[5px] text-lg font-semibold text-gray-800">{title}</h2>
        <p className="pl-[5px] text-font-cinza text-sm">{descricaoProduto}</p>
        <div className="flex justify-between items-center px-[5px] md:py-[8px]">
          <p className="text-lg font-bold text-gray-900">
            € {price.toFixed(2).replace(".", ",")}
          </p>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <p className="text-sm text-font-cinza">4.8</p>
          </div>
        </div>
        <button className="mt-[5px] w-full  bg-amarelo-principal font-semibold text-white py-2 rounded-[15px] transition hover:bg-yellow-600 "
          onClick={adicionarCarrinho}>Add ao Carrinho
        </button>
      </div>
    </div>
  );
}
