import Footer from "../components/Footer"
import product7 from "../imgProducts/product7.jpg"
import Credibilidade from "../components/Credibilidade"
import { useLocation } from "react-router-dom";

export default function DetalheProdutos() {

    const location = useLocation();
    const produto = location.state; // recebe { id, imgProduct, title, price }
     if (!produto) {
      return <p>Produto não encontrado.</p>; // fallback caso acessem a URL direto
     }
    return (
        <>
            <div className="mt-[15 px] mx-[15px]" >
                <img className="w-[100%] h-[400px]" src={produto.imgProduct} />
                <p className="text-[22px] font-semibold mt-[15px]">{produto.title}</p>
                <p className="text-[22px]">Descrição competa sobre o produto</p>
                <p className="text-[20px]"><span className="line-through text-[16px] ">52,00 €</span> {produto.price.toFixed(2).replace(".", ",")}€ </p>
                <p className="text-verde my-[5px]">Envio Gratuito para este artigo</p>
                <p className="font-semibold mb-[3px]">Opção:</p>
                <div className="flex gap-[5px]">
                    <div className="bg-blue-800 rounded-full w-[20px] h-[20px]" ></div>
                    <div className="bg-slate-600 rounded-full w-[20px] h-[20px]" ></div>
                    <div className="bg-orange-300 rounded-full w-[20px] h-[20px]" ></div>
                </div>
                <div className="flex items-center my-[18px]">
                    <p className="flex  items-center justify-center rounded-[15px] text-[15px] bg-[#5769a9] text-white w-[180px] h-[40px]  ">Adicionar ao carrinho</p>
                    <button className="w-[40px] h-[40px] ml-[50px] border-[1px] border-[#5769a9]" >-</button>
                    <p className="mx-[15px]">1</p>
                    <button className="w-[40px] h-[40px] border-[1px] border-[#5769a9] ">+</button>
                </div>
                <p className="flex items-center pl-[10px] bg-[#ffaf85] rounded-[15px] h-[50px] mb-[5px]" ><span className="font-semibold pr-[5px]">Envio:</span> Gratuito</p>
                <p className="flex items-center pl-[10px] bg-[#ffaf85] rounded-[15px] h-[50px] mb-[5px] ">Pagamento seguro </p>
                <p className="flex items-center pl-[10px] bg-[#ffaf85] rounded-[15px] h-[50px] "><span className="font-semibold">Estimativa de entrega:</span> 10-30 dias úteis</p>
                <hr className="mt-[40px]" />
                <p className="font-semibold text-[22px] mt-[20px] mb-[8px]">Dimensões</p>
                <p><span className="font-semibold mr-[40px] ">Largura: </span> 47 cm</p>
                <p><span className="font-semibold mr-[50px]">Altura:</span> 57 cm</p>
                <p><span className="font-semibold mr-[40px] ">Largura: </span> 47 cm</p>
                <p><span className="font-semibold mr-[50px]">Altura:</span> 57 cm</p>
                <hr className="mt-[20px]" />
                <img src={product7} />
            </div>
            <Credibilidade />
            <Footer />
        </>
    )
}