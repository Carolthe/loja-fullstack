import CardCompras from "../components/CardCompras";
import Credibilidade from "../components/Credibilidade";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import VerProdutos from "../components/VerProdutos";

export default function Compras() {
  return (
    <div className="mt-[30px] ">
      <VerProdutos />
      <p className="text-center font-semibold text-[22px] mt-[30px]">Minhas Compras</p>
     <div className="md:flex md:mt-[20px] md:mb-[50px] md:mx-[50px]">
      <CardCompras />
      <CardCompras />
      </div>
      <Credibilidade />
      <ScrollToTop />
      <Footer />
    </div>
  )
}