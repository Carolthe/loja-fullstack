import CartCard from "../components/CartCard";
import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ViewProducts from "../components/ViewProducts";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";


export default function Cart() {
  const [carrinho, setCarrinho] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  async function carregarCarrinho() {
    if (!usuario) return
    try {
      const res = await api.get(`/carrinho/${usuario.id_usuario}`)
      setCarrinho(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    carregarCarrinho()
  }, [usuario])

const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

async function limparCarrinho() {
  if (!usuario) return alert("Faça login para limpar o carrinho");

  try {
    await api.delete(`/carrinho/${usuario.id_usuario}`); // Crie uma rota DELETE no backend para limpar todos
    setCarrinho([]);
    alert("Carrinho limpo com sucesso!");
  } catch (error) {
    console.error(error);
    alert("Erro ao limpar carrinho");
  }
}


  return (
    <div className="mt-[30px] ">
      <ViewProducts />
      <p className="text-[23px] text-center font-semibold">Your Products</p>
      <div className="flex justify-between mx-[20px] my-[15px] text-sm text-fontGray">
        <p>PRODUCTS <span>(1)</span> </p>
        <p>TOTAL <span>(25.0)</span> </p>
      </div>
      <hr />
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        carrinho.map((product => (
          <CartCard
            key={product.id_produto}
            product={product}
            atualizarCarrinho={carregarCarrinho}
          />
        ))
        ))}
      <hr />
      <div className="flex flex-col items-center mt-[30px]">
        <p className="mb-[20px] font-semibold">Total:<span className="text-fontGray ml-[20px]">{total} $</span></p>
        <Link to="/dadosLocalizacao" >
          <button className="w-[310px] h-[50px] text-white bg-highlightGreen">Complete Checkout</button>
        </Link>
        <button className="w-[310px] h-[50px] text-white bg-highlightGreen"
          onClick={limparCarrinho}>Limpar o Carrinho</button>
      </div>
      <Credibility />
      <ScrollToTop />
      <Footer />
    </div>
  )
}