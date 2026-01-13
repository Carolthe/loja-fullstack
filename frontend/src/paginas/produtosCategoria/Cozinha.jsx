import Footer from "../../components/Footer.jsx"
import ScrollToTop from "../../components/ScrollToTop.jsx"
import { useState, useEffect } from "react";
import api from "../../services/api.js";
import CardProduto from "../../components/CardProduto.jsx";
import Credibilidade from "../../components/Credibilidade.jsx";
//import CategoryDescription from "../components/CategoryDescription.jsx";
//import cozinhaLogo from "../logoCategory/cozinhaLogo.jpeg"
import { Link } from "react-router-dom";
import quarto2 from "../../imagensCategorias/quarto2.png"
import sala2 from "../../imagensCategorias/sala2.png"
import escritorio2 from "../../imagensCategorias/escritorio2.png"
import banheiro2 from "../../imagensCategorias/banheiro2.png"


export default function Cozinha() {
    const [produtos, setProdutos] = useState([])
    const categoriaId = 3; // Cozinha
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
            <div className="my-[30px] flex justify-around mx-[35px] pt-[20px]">
                <Link to="/sala">
                    <img className="w-[30px] h-[30px]" src={sala2} />
                </Link>
                <Link to="/escritorio">
                    <img className="w-[30px] h-[30px]" src={escritorio2} />
                </Link>
                <Link to="/banheiro">
                    <img className="w-[30px] h-[30px]" src={banheiro2} />
                </Link>
                <Link to="/quarto">
                    <img className="w-[30px] h-[30px]" src={quarto2} />
                </Link>
            </div>
            {/* <CategoryDescription img={cozinhaLogo} /> */}

            {produtos.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
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
