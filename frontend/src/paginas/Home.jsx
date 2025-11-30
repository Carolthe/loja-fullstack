import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import CardCategoria from "../components/CardCategoria";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Newsletter from "../components/Newsletter";
import homeMobile from "../imgMobile/homeMobile.png";
import categoryLivingRoom from "../imgCategory/categoryLivingRoom.png";
import livingRoomCategory from "../imgCategory/livingRoomCategory.png";
import kitchenCategory from "../imgCategory/kitchenCategory.png";
import bathroomCategory from "../imgCategory/bathroomCategory.png";
import officeCategory from "../imgCategory/officeCategory.png";
import CardProduto from "../components/CardProduto";
import Credibilidade from "../components/Credibilidade";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  

  useEffect(() => {
    async function carregarProdutos() {
      try {
    //receber os produtos via requisição axios
        const res = await api.get("/produtos/ordenados")
    //salvar no state, somente os dados, através da data
        setProdutos(res.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }
    carregarProdutos();
  }, []);

  return (
    <div>
      <img src={homeMobile} className="md:hidden" />
      <div className="flex flex-col text-center items-center">
        <h3 className="mt-[30px] mb-[5px] text-[22px] font-semibold md:mt-[50px] md:text-[35px] md:font-bold md:mb-[2px]">
          Produtos em Destaque
        </h3>
        <p className="w-[310px] text-zinc-600 mb-[15px] md:w-[900px] md:mb-[50px] md:text-[18px]">
         Compre nossos produtos mais vendidos e tenha certeza de qualidade!
        </p>
      </div>

      {/* 🔹 Produtos ordenados por preço */}
      <div className="mx-[10px] flex justify-center flex-wrap gap-[10px] md:gap-[35px]">
        {produtos.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          produtos.map((produto) => (
            <CardProduto
              key={produto.id_produto}
              id={produto.id_produto}
              imgProduct={produto.imagem}
              title={produto.nome}
              price={parseFloat(produto.preco)}
            />
          ))
        )}
      </div>

      <div className="flex justify-center my-[40px]">
        <button className="border-[1px] font-medium bg-orangeMain text-white rounded-[10px] w-[110px] h-[45px]">
          Ver Mais
        </button>
      </div>
      <p className="mt-[30px] mb-[25px] text-center flex flex-col text-[22px] font-semibold">
        Categorias Disponíveis
      </p>
      <div className="flex overflow-x-auto gap-[25px] mx-[20px]">
        <Link to="/quarto">
          <CardCategoria imgCategory={categoryLivingRoom} tituloCategory="Quarto" />
        </Link>
        <Link to="/sala">
          <CardCategoria imgCategory={livingRoomCategory} tituloCategory="Sala" />
        </Link>
        <Link to="/cozinha">
          <CardCategoria imgCategory={kitchenCategory} tituloCategory="Cozinha" />
        </Link>
        <Link to="/banheiro">
          <CardCategoria imgCategory={bathroomCategory} tituloCategory="Banheiro" />
        </Link>
        <Link to="/escritorio">
          <CardCategoria imgCategory={officeCategory} tituloCategory="Escritorio" />
        </Link>
      </div>
      <Credibilidade />
      <Newsletter />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
