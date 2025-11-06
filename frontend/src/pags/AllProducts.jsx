import ProductCard from "../components/ProductCard";
import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import api from '../services/api';

export default function AllProducts() {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const res = await api.get("http://localhost:3000/api/produtos")
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
          <input className="w-full border-none text-sm " placeholder="What are you looking for?" />
          <FiSearch className="text-greenMain" />
        </div>
      </div>
      <div className="mb-[15px] ">
        <button className="w-[50%] h-10 border border-gray-300 text-gray-400  hover:bg-gray-100 transition">
          Filtro
        </button>
        <button className="w-[50%] h-10 border border-gray-300 text-gray-500 text-sm ">
          athome <span className="text-gray-400">| 40 Products</span>
        </button>
      </div>
      <p className="text-fontGray ml-[10px]">Welcome / All Products </p>
      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="mt-[20px] mx-[10px] flex justify-center flex-wrap gap-[10px]">
          {produtos.map((produto) => (
            <ProductCard
              key={produto.id_produto}
              id={produto.id_produto} 
              imgProduct={produto.imagem}
              title={produto.nome} 
              price={parseFloat(produto.preco)}/>
          ))}
        </div>
      )}
      <Credibility />
      <ScrollToTop />
      <Footer />
    </div>
  )
}