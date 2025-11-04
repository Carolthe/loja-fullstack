import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
//import { useCart } from "../context/CartProvider"

export default function ProductCart({ imgProduct, title, price }) {

  //const {addToCart} = useCart();

  async function handleFavoritar() {
    try {
      await api.post('/favoritos', {
        id_usuario, id_produto
      })
      alert(`${nome} foi adicionado aos favoritos!`)
    } catch (error) {
      console.error('Erro ao favoritar:', error)
      alert('Erro ao adicionar aos favoritos.')
    }
  }

  async function adicionarCarrinho() {
    if (!usuario) {
      alert("Faça login para adicionar produtos ao carrinho")
      return
    }

    try {
      await api.post("/carrinho", {
        id_usuario: usuario.id_usuario,
        id_produto,
        quantidade: 1
      })
      alert("Produto adicionado ao carrinho!")
    } catch (error) {
      console.error(error)
      alert("Erro ao adicionar produto ao carrinho")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 w-[180px] md:w-[280px] mb-5">
      <div className="relative">
        <Link to="/productsDetails">
          <img
            className="w-full h-[180px] object-cover rounded-t-2xl md:h-[280px]"
            src={imgProduct}
            alt={title}
          />
        </Link>
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
          onClick={handleFavoritar}>
          <CiHeart className="text-red-500 text-xl" />
        </button>
      </div>
      <div className="pt-[5px] flex flex-col md:pt-[10px]">
        <h2 className="pl-[5px] text-lg font-semibold text-gray-800">{title}</h2>
        <p className="pl-[5px] text-fontGray text-sm">Breve descrição do produto</p>
        <div className="flex justify-between items-center px-[5px] md:py-[8px]">
          <p className="text-lg font-bold text-gray-900">{price}</p>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <p className="text-sm text-fontGray">{evaluation}</p>
          </div>
        </div>
        <button className="mt-[5px] w-full bg-greenMain text-white py-2 rounded-lg transition"
          onClick={adicionarCarrinho} >
          Add to cart
        </button>
      </div>
    </div>
  );
}
