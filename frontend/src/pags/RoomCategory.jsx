import ProductCard from "../components/ProductCard.jsx"
import Credibility from "../components/Crediblility.jsx"
import Footer from "../components/Footer.jsx"
import ScrollToTop from "../components/ScrollToTop.jsx"
import { useState, useEffect } from "react";
import api from "../services/api";
import CategoryDescription from "../components/CategoryDescription.jsx";
import roomLogo from "../logoCategory/roomLogo.jpeg"

export default function RoomCategory() {
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
        <div className="">
            <CategoryDescription img={roomLogo} />

               {produtos.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                <div className="mx-[10px] mt-[15px] flex justify-center flex-wrap gap-[10px] md:gap-[35px]" >
                    {produtos.map((produto) => (
                        <ProductCard 
                            key={produto.id_produto}
                            id={produto.id_produto}
                            title={produto.nome}
                            price={parseFloat(produto.preco)}
                            imgProduct={produto.imagem}
                        />
                    ))}
                </div>
            )}
            <Credibility />
            <ScrollToTop />
            <Footer />
        </div>
    )
}