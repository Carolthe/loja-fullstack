import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import api from '../services/api';
import CardProduto from "../components/CardProduto";
import Credibilidade from "../components/Credibilidade";

export default function TodosProdutos() {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const res = await api.get("/produtos")
        setProdutos(res.data)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      }
    }
    carregarProdutos()
  }, []);

  return (
    <div>
      <div className="bg-greenMain w-full h-[75px] flex justify-center items-center">
        <div className="flex items-center justify-between px-[10px] w-[300px]  h-[42px] rounded-[20px] bg-white">
          <input className="w-full border-none text-sm " placeholder="O que você está procurando?" />
          <FiSearch className="text-greenMain" />
        </div>
      </div>
      <div className="mb-[15px] ">
        <button className="w-[50%] h-10 border border-gray-300 text-gray-400  hover:bg-gray-100 transition">
          Filtro
        </button>
        <button className="w-[50%] h-10 border border-gray-300 text-gray-500 text-sm ">
          para casa <span className="text-gray-400">| 40 Produtos</span>
        </button>
      </div>
      <p className="text-fontGray ml-[10px]">Bem-vindo / Todos os Produtos </p>
      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="mt-[20px] mx-[10px] flex justify-center flex-wrap gap-[10px]">
          {produtos.map((produto) => (
            <CardProduto
              key={produto.id_produto}
              id={produto.id_produto} 
              imgProduct={produto.imagem}
              title={produto.nome} 
              price={parseFloat(produto.preco)}/>
          ))}
        </div>
      )}
      <Credibilidade />
      <ScrollToTop />
      <Footer />
    </div>
  )
}