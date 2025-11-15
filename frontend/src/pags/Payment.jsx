import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Newsletter from "../components/Newsletter";
import ScrollToTop from "../components/ScrollToTop";
import { Link } from "react-router-dom";

export default function Payment() {
    return (
        < div className="mt-[0px]">
            <div className=" flex flex-col items-center">
                <h4 className="text-center font-semibold text-[23px] mt-[20px]">Finalising the Purchase</h4>
                <p className="font-semibold text-greenMain text-center mt-[20px] mb-[10px]">Delivery Place</p>
                <form className="flex flex-col items-center gap-[30px]">
                    <div>
                        <label className="font-semibold ">Country / Region </label>
                        <Input placeholder="Pais" />
                    </div>
                    <div>
                        <label className="font-semibold">Street Address </label>
                        <Input placeholder="Cidade" />
                    </div>
                    <div>
                        <label className="font-semibold">Town / City </label>
                        <Input placeholder="Rua" />
                    </div>
                    <div>
                        <label className="font-semibold">Province </label>
                        <Input placeholder="Cep" />
                    </div>
                    <div>
                        <label className="font-semibold">Additional information </label>
                        <Input placeholder="Informação adicional" />
                    </div>
                    <Link to="/pagamento">
                    <button className="bg-highlightGreen px-[40px] py-[15px] text-white">Ir Para Pagamento</button>
                    </Link>
                </form>
               
            </div>
            <Credibility />
            <Newsletter />
            <ScrollToTop />
            <Footer />
        </div>
    )
}