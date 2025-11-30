import Credibilidade from "../components/Credibilidade";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Newsletter from "../components/Newsletter";
import ScrollToTop from "../components/ScrollToTop";
import { Link } from "react-router-dom";

export default function Localizacao() {
    return (
        < div className="mt-[0px]">
            <div className=" flex flex-col items-center">
                <p className="font-semibold text-greenMain text-center mt-[30px] mb-[10px]">Local de Entrega</p>
                <form className="flex flex-col items-center gap-[30px]">
                    <div>
                        <label className="font-semibold ">País / Região </label>
                        <Input placeholder="Pais" />
                    </div>
                    <div>
                        <label className="font-semibold">Endereço da Rua </label>
                        <Input placeholder="Rua" />
                    </div>
                    <div>
                        <label className="font-semibold">Cidade </label>
                        <Input placeholder="Cidade" />
                    </div>
                    <div>
                        <label className="font-semibold">Código Postal </label>
                        <Input placeholder="Cep" />
                    </div>
                    <div>
                        <label className="font-semibold">Informação Adicional </label>
                        <Input placeholder="Informação adicional" />
                    </div>
                    <Link to="/pagamento">
                    <button className="bg-highlightGreen px-[40px] py-[15px] text-white">Ir Para Pagamento</button>
                    </Link>
                </form>
               
            </div>
            <Credibilidade />
            <Newsletter />
            <ScrollToTop />
            <Footer />
        </div>
    )
}