import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ProductCard({ id, imgProduct, title, price }) {
  const navigate = useNavigate();

  // ❤️ Favoritar produto (ainda sem autenticação)
  async function handleFavoritar() {
    alert(`${title} foi adicionado aos favoritos!`);
    // Quando tiver autenticação:
    // await api.post('/favoritos', { id_usuario, id_produto: id });
  }

  // 🛒 Adicionar produto ao carrinho e redirecionar
  async function adicionarCarrinho() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
      alert("Você precisa estar logado para adicionar produtos ao carrinho!");
      return navigate("/login");
    }

    try {
      await api.post("/carrinho", {
        id_usuario: usuario.id_usuario,
        id_produto: id,
        quantidade: 1
      });

      // ✅ Mensagem + redirecionamento
      alert(`"${title}" foi adicionado ao carrinho!`);
      navigate("/cart");
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      alert("Erro ao adicionar produto ao carrinho.");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 w-[180px] md:w-[280px] mb-5">
      <div className="relative">
        <Link to={`/productsDetails/${id}`}>
          <img
            className="w-full h-[180px] object-cover rounded-t-2xl md:h-[280px]"
            src={imgProduct}
            alt={title}
          />
        </Link>
        <button
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
          onClick={handleFavoritar}
        >
          <CiHeart className="text-red-500 text-xl" />
        </button>
      </div>
      <div className="pt-[5px] flex flex-col md:pt-[10px]">
        <h2 className="pl-[5px] text-lg font-semibold text-gray-800">{title}</h2>
        <p className="pl-[5px] text-fontGray text-sm">Breve descrição do produto</p>

        <div className="flex justify-between items-center px-[5px] md:py-[8px]">
          <p className="text-lg font-bold text-gray-900">
            R$ {price.toFixed(2).replace(".", ",")}
          </p>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <p className="text-sm text-fontGray">4.8</p>
          </div>
        </div>
        <button
          className="mt-[5px] w-full bg-greenMain text-white py-2 rounded-lg transition hover:bg-green-600"
          onClick={adicionarCarrinho}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
