import Footer from "../../components/Footer.jsx"
import ScrollToTop from "../../components/ScrollToTop.jsx"
import { useState, useEffect } from "react";
import api from "../../services/api.js";
import CardProduto from "../../components/CardProduto.jsx";
import Credibilidade from "../../components/Credibilidade.jsx";
import { Link } from "react-router-dom";
import quarto2 from "../../imagensCategorias/quarto2.png"
import sala2 from "../../imagensCategorias/sala2.png"
import escritorio2 from "../../imagensCategorias/escritorio2.png"
import cozinha2 from "../../imagensCategorias/cozinha2.png"
import CarrinhoVazio from "../../components/CarrinhoVazio.jsx";


export default function Banheiro() {
    const [produtos, setProdutos] = useState([])
    const categoriaId = 4; // Banheiro

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
        <div>
             <h1 className="mt-[40px] text-center font-semibold text-[20px]">Produtos para Banheiro</h1>
            <div className="mb-[30px] flex justify-around mx-[35px] pt-[20px]">
                <Link to="/quarto">
                    <img className="w-[30px] h-[30px]" src={quarto2} />
                </Link>
                <Link to="/escritorio">
                    <img className="w-[30px] h-[30px]" src={escritorio2} />
                </Link>
                <Link to="/sala">
                    <img className="w-[30px] h-[30px]" src={sala2} />
                </Link>
                <Link to="/cozinha">
                    <img className="w-[30px] h-[30px]" src={cozinha2} />
                </Link>
            </div>
            {produtos.length === 0 ? (
                <CarrinhoVazio text="Nenhum Produto Encontrado" />
            ) : (
                <div className="mx-[10px] mt-[15px] flex justify-center flex-wrap gap-[10px] md:gap-[35px]" >
                    {produtos.map((produto) => (
                        <CardProduto
                            key={produto.id_produto}
                            id={produto.id_produto}
                            title={produto.nome}
                            descricaoProduto={produto.descricao}
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
