import Footer from "../../components/Footer.jsx"
import ScrollToTop from "../../components/ScrollToTop.jsx"
import { useState, useEffect } from "react";
import api from "../../services/api.js";
import CardProduto from "../../components/CardProduto.jsx";
import Credibilidade from "../../components/Credibilidade.jsx";
import CardBannerCategoria from "../../components/CardBannerCategoria.jsx";
import sala from "../../imagensCategorias/sala.png"
import banheiro from "../../imagensCategorias/banheiro.png"
import escritorio from "../../imagensCategorias/escritorio.png"
import cozinha from "../../imagensCategorias/cozinha.png"


export default function Quarto() {
    const [produtos, setProdutos] = useState([])
    const categoriaId = 1;
    useEffect(() => {
        let isMounted = true;

        async function carregarProdutos() {
            try {
                const res = await api.get(`/categorias/${categoriaId}/produtos`)
                if (isMounted) setProdutos(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        carregarProdutos()

        return () => { isMounted = false }
    }, [categoriaId])


    return (
        <div >
           <div className="my-[30px] flex justify-around mx-[35px] pt-[20px]">
          <img className="w-[30px] h-[30px]" src={sala} />
          <img className="w-[30px] h-[30px]" src={escritorio} />
          <img className="w-[30px] h-[30px]" src={banheiro} />
          <img className="w-[30px] h-[30px]" src={cozinha} />
        </div>
          {/* <CardBannerCategoria /> */}
     
               {produtos.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                <div className="mx-[10px] mt-[20px] flex justify-center flex-wrap gap-[10px] md:gap-[35px]" >
                    {produtos.map((produto) => (
                        <CardProduto
                            key={produto.id_produto}
                            id={produto.id_produto}
                            title={produto.nome}
                            price={parseFloat(produto.preco)}
                            imgProduct={produto.imagem}
                        />
                    ))}
                </div>
            )}
            <Credibilidade />
            <ScrollToTop />
            <Footer />
        </div>
    )
}