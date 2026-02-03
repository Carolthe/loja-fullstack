import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import CardCategoria from "../components/CardCategoria";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Newsletter from "../components/Newsletter";
import CardProduto from "../components/CardProduto";
import Credibilidade from "../components/Credibilidade";
import home from "../imgMobile/home.webp";
import sala from "../imagensCategorias/sala.png";
import quarto from "../imagensCategorias/quarto.png"
import cozinha from "../imagensCategorias/cozinha.png";
import banheiro from "../imagensCategorias/banheiro.png";
import escritorio from "../imagensCategorias/escritorio.png";
import CarrinhoVazio from "../components/CarrinhoVazio";
import homeDesktop from "../imgDesktop/homeDesktop.jpg";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [limite, setLimite] = useState(6); // começa com 6 produtos

  async function carregarProdutos() {
    try {
      const res = await api.get(`/produtos/ordenados?limite=${limite}`);
      setProdutos(res.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, [limite]); // sempre que o limite mudar, recarrega

  function verMais() {
    setLimite(prev => prev + 6);
  }

  return (
    <div className="bg-cor-de-fundo">
      <div className="relative">
        <img src={home} alt="Home" className="block md:hidden" />
        <img src={homeDesktop} alt="Home" className="hidden md:block w-full" />
        <div className="absolute inset-0 mt-[145px] text-center px-4">
          <p className="text-[26px] font-semibold text-[#ffffff]">Loja HomeHaven</p>
          <p className="mt-1 text-[15px] text-gray-200">Não perca a oportunidade de ter conforto e elegancia em cada canto da sua casa</p>
          <Link to="/produtos">
            <button className="mt-[18px] px-[20px] py-[10px] border-[1px] text-[14px] text-white border-white text-whiterounded hover:bg-[#5769a9] hover:text-white transition">Ver Produtos
            </button>
          </Link>
        </div>
      </div>
      <div className="text-center items-center flex flex-col justify-center">
        <h3 className="mt-[px] mb-[5px] text-[22px] font-semibold md:mt-[50px] md:text-[30px] md:font-bold md:mb-[2px]">
          Produtos em Destaque
        </h3>
        <p className="px-4.5 text-zinc-600 mb-[15px] md:w-[900px] md:mb-[50px] md:text-[16px]">
          Compre nossos produtos mais vendidos e tenha certeza de qualidade!
        </p>
      </div>
      {/* 🔹 Produtos ordenados por preço */}
      <div className="mx-[10px] flex justify-center flex-wrap gap-[10px] md:mx-[250px] md:gap-x-[35px]">
        {produtos.length === 0 ? (
          <CarrinhoVazio text="Nenhum Produto Encontrado" />
        ) : (
          produtos.map((produto) => (
            <CardProduto
              key={produto.id_produto}
              id={produto.id_produto}
              imgProduct={produto.imagem}
              descricaoProduto={produto.descricao}
              title={produto.nome}
              price={parseFloat(produto.preco)}
            />
          ))
        )}
      </div>
      <div className="flex justify-center my-[40px]">
        <button className="border-[1px] font-bold bg-amarelo-principal text-white text-sm rounded-full w-[105px] h-[45px]"
          onClick={verMais}> Ver Mais</button>
      </div>

      <p className="mt-[30px] mb-[25px] text-center flex flex-col text-[22px] font-semibold">
        Categorias Disponíveis
      </p>

      <div className="flex overflow-x-auto md:justify-center gap-[25px] mx-[20px]">
        <Link to="/quarto">
          <CardCategoria imgCategory={quarto} tituloCategory="Quarto" />
        </Link>
        <Link to="/sala">
          <CardCategoria imgCategory={sala} tituloCategory="Sala" />
        </Link>
        <Link to="/cozinha">
          <CardCategoria imgCategory={cozinha} tituloCategory="Cozinha" />
        </Link>
        <Link to="/banheiro">
          <CardCategoria imgCategory={banheiro} tituloCategory="Banheiro" />
        </Link>
        <Link to="/escritorio">
          <CardCategoria imgCategory={escritorio} tituloCategory="Escritorio" />
        </Link>
      </div>

      <Credibilidade />
      <Newsletter />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
