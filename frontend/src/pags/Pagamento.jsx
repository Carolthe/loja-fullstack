import { FaCcVisa, FaCcPaypal } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import Input from "../components/Input";
import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import ScrollToTop from "../components/ScrollToTop";

export default function () {
    return (
        <>
            <div className="flex flex-col items-center mt-[20px]">
                <p className="font-semibold text-greenMain text-center mt-[25px] ">Payment Method</p>
                <p className="text-fontGray">All transformations are secure and encrypted.</p>
                <form className="bg-white w-[340px] mt-[20px] rounded-xl shadow-lg p-5 border border-gray-200">
                    <div className="flex justify-center gap-4 mb-5">
                        <div className="bg-white px-[20px] py-[8px] rounded-xl border border-gray-300 shadow-sm 
                            flex items-center justify-center hover:shadow-md cursor-pointer transition-all duration-200">
                            <FaCcVisa className="text-[38px] text-blue-600" />
                        </div>
                        <div className="bg-white px-[20px] py-[8px] rounded-xl border border-gray-300 shadow-sm 
                            flex items-center justify-center hover:shadow-md cursor-pointer transition-all duration-200">
                            <RiMastercardFill className="text-[38px] text-orange-500" />
                        </div>
                        <div className="bg-white px-[20px] py-[8px] rounded-xl border border-gray-300 shadow-sm 
                            flex items-center justify-center hover:shadow-md cursor-pointer transition-all duration-200">
                            <FaCcPaypal className="text-[36px] text-blue-500" />
                        </div>
                    </div>
                    <label className="text-sm font-medium text-gray-700">Nome no cartão</label>
                    <Input />
                    <label className="text-sm font-medium text-gray-700">Número do cartão</label>
                    <Input />

                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Data de expiração</label>
                            <input
                                type="text"
                                placeholder="MM/AA"
                                className="mt-1 w-[120px] h-[38px] px-2 rounded-lg border border-gray-300 
                           shadow-sm focus:ring-2 focus:ring-greenMain outline-none transition"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">CCV</label>
                            <input
                                type="text"
                                placeholder="000"
                                maxLength={3}
                                className="mt-1 w-[100px] h-[38px] px-2 rounded-lg border border-gray-300 
                           shadow-sm focus:ring-2 focus:ring-greenMain outline-none transition"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full h-[50px] mt-6 bg-greenMain text-white font-semibold rounded-lg 
                       shadow-md hover:brightness-110 transition-all duration-200"
                    >
                        Finalizar Pagamento
                    </button>
                </form>
            </div>
            <Credibility />
            <Newsletter />
            <ScrollToTop />
            <Footer />
        </>
    )
}