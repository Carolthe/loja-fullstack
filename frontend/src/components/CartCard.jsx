import { FiTrash2 } from "react-icons/fi";
import api from "../services/api"

export default function CartCard({product, atualizarCarrinho}) {
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    
    async function removerDoCarrinho() {
        if (!usuario) return alert("Faça login para gerenciar o carrinho")

        if (!window.confirm(`Remover ${nome} do carrinho?`)) return
        
        try {
            await api.delete(`/carrinho/${usuario.id_usuario}/${id_produto}`)
            alert(`${nome} removido do carrinho`)
            atualizarCarrinho()
        } catch (error) {
            console.error(error)
            alert("Erro ao remover produto")
        }
    }

    return (
        <div className="flex mx-[15px] my-[25px] ">
            <img className="w-[120px]" src={product.imgProduct} alt="{product.title}" />
            <div className="ml-[10px] w-full">
                <div className="flex justify-between ">
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm">{product.price} $ </p>
                </div>
                <p className="text-fontGray mt-[5px]">Breve descrição</p>
                <div className="flex justify-between mt-[10px]">
                <div className="flex items-center gap-[10px]">
                    <button className="flex items-center justify-center bg-greenMain w-[22px] h-[14px] text-white ">-</button>
                    <button className="flex items-center justify-center bg-greenMain w-[22px] h-[14px] text-white " >+</button>
                </div>
                <FiTrash2 className="text-[20px] text-red-600"
                onClick={removerDoCarrinho}/>
                </div>
            </div>
        </div>
    )
}