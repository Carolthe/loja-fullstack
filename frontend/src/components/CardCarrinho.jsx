import { FiTrash2 } from "react-icons/fi";
import api from "../services/api";

export default function CardCarrinho({ product, atualizarCarrinho }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  async function aumentarQuantidade() {
    try {
      await api.put(`/carrinho/${usuario.id_usuario}/${product.id_produto}/add`);
      atualizarCarrinho();
    } catch (error) {
      console.error("Erro ao aumentar quantidade:", error);
    }
  }
  async function diminuirQuantidade() {
    try {
      await api.put(`/carrinho/${usuario.id_usuario}/${product.id_produto}/remove`);
      atualizarCarrinho();
    } catch (error) {
      console.error("Erro ao diminuir quantidade:", error);
    }
  }
  async function removerDoCarrinho() {
    if (!window.confirm(`Remover ${product.nome}?`)) return;

    try {
      await api.delete(`/carrinho/${usuario.id_usuario}/${product.id_produto}`);
      atualizarCarrinho();
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    }
  }

  return (
    <div className="flex mx-[15px]  my-[25px]">
      <img className="w-[120px]" src={product.imagem} alt={product.nome} />
      <div className="ml-[10px] w-full">
        <div className="flex justify-between">
          <p className="font-semibold">{product.nome}</p>
          <p className="text-sm">R$ {Number(product.preco).toFixed(2).replace(".", ",")}</p>
        </div>
        <p className="text-font-cinza mt-[5px]">Breve descrição</p>
        <div className="flex justify-between mt-[10px]">
          <div className="flex items-center gap-[10px]">
            <button
              className="flex items-center justify-center border-[1px] border-[#5769a9] w-[20px] h-[20px] text-black "
              onClick={diminuirQuantidade}> - </button>
            <p>{product.quantidade}</p>
            <button className="flex items-center justify-center  border-[1px] border-[#5769a9] w-[20px] h-[20px] text-black"
              onClick={aumentarQuantidade}> + </button>
          </div>
          <FiTrash2
            className="text-[20px] text-red-600 cursor-pointer"
            onClick={removerDoCarrinho}/>
        </div>
      </div>
    </div>
  );
}
