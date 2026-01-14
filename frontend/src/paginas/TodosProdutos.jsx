import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import api from '../services/api';
import CardProduto from "../components/CardProduto";
import Credibilidade from "../components/Credibilidade";
import CarrinhoVazio from "../components/CarrinhoVazio";


export default function TodosProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [precoMax, setPrecoMax] = useState(900);
  const [showFiltro, setShowFiltro] = useState(false);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const res = await api.get("/produtos");
        setProdutos(res.data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }
    carregarProdutos();
  }, []);

const produtosFiltrados = produtos.filter(produto => {
  
  const nomeMatch = produto.nome.toLowerCase().includes(busca.toLowerCase());
  
  const preco = parseFloat(produto.preco);

  if (!showFiltro) {
    return nomeMatch;
  }

  const precoMatch = preco >= precoMax - 10 && preco <= precoMax;

  return nomeMatch && precoMatch;
});

  return (
    <div>
      <div className="bg-[#5769a9] pt-[8px] w-full h-[75px] flex justify-center items-center shadow-md">
  <div className="relative w-[90%] max-w-[320px]">
    <input
      type="text"
      placeholder="O que você está procurando?"
      value={busca}
      onChange={(e) => setBusca(e.target.value)}
      className="w-full h-[45px] pl-12 rounded-full border border-gray-300 text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
    />
    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-azul-principal text-lg" />
  </div>
</div>

      <div className="mb-[10px] flex">
        <button className="w-[50%] h-10 border border-gray-300 text-gray-400 hover:bg-gray-100 transition"
          onClick={() => setShowFiltro(!showFiltro)}>Filtro </button>
        <button className="w-[50%] h-10 border border-gray-300 text-gray-500 text-sm"> para casa <span className="text-gray-400">| {produtosFiltrados.length} Produtos</span></button>
      </div>

      {showFiltro && (
        <div className="flex flex-col mx-3 mb-4 gap-1">
          <label className="text-sm text-gray-600">Preço Máximo: R$ {precoMax}</label>
          <input
            type="range"
            min="5"
            max="400"
            value={precoMax}
            onChange={(e) => setPrecoMax(Number(e.target.value))}
            className="w-[150px] h-1 bg-gray-300 rounded-lg accent-slate-600"
          />
        </div>
      )}

      <p className="text-font-cinza ml-[10px]">Bem-vindo / Todos os Produtos </p>

      {produtosFiltrados.length === 0 ? (
         <CarrinhoVazio text="Nenhum Produto Encontrado" />
      ) : (
        <div className="mt-[10px] mx-[10px] flex justify-center flex-wrap gap-[10px]">
          {produtosFiltrados.map((produto) => (
            <CardProduto key={produto.id_produto}
              id={produto.id_produto} 
              imgProduct={produto.imagem}
              title={produto.nome} 
              descricaoProduto={produto.descricao}
              price={parseFloat(produto.preco)} />
          ))}
        </div>
      )}
      <Credibilidade />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
