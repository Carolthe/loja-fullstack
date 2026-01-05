import { LiaHomeSolid } from "react-icons/lia";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

export default function Footer() {
    return (
        <footer className="bg-[#5769a9] text-white">
            {/* Conteúdo principal */}
            <div className="max-w-6xl mx-auto px-6 py-[28px] grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

                {/* Logo e contato */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <div className="flex items-center gap-2 text-xl font-semibold">
                        <LiaHomeSolid className="text-2xl" />
                        <span>HOMEHAVEN</span>
                    </div>

                    <p className="text-sm opacity-80">Entre em contato</p>

                    <p className="flex items-center gap-2 text-sm">
                        <FaWhatsapp />
                        +351 937 628 516
                    </p>

                    <p className="flex items-center gap-2 text-sm">
                        <AiOutlineMail />
                        homehaven1998@gmail.com
                    </p>
                </div>

                {/* Políticas e redes sociais */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wide mb-2">
                            Nossa Política
                        </h3>
                        <p className="text-sm opacity-90">Política de Privacidade</p>
                        <p className="text-sm opacity-90">Política de Envio</p>
                        <p className="text-sm opacity-90">Termos de Uso</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wide mb-2">
                            Redes Sociais
                        </h3>

                        <div className="flex mt-[15px] justify-center gap-3">
                            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-[#5769a9] rounded-full hover:scale-105 transition"><FaWhatsapp /></a>
                            <a href="https://www.instagram.com/homehavenliving/?next=%2F"
                                target="blank" className="w-9 h-9 flex items-center justify-center bg-white text-[#5769a9] rounded-full hover:scale-105 transition"><FaInstagram /></a>
                            <a href="https://www.facebook.com/profile.php?id=61580030390813"
                                target="blank" className="w-9 h-9 flex items-center justify-center bg-white text-[#5769a9] rounded-full hover:scale-105 transition"><FaFacebook /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-white/20" />

            {/* Copyright */}
            <div className="py-4 text-center text-sm opacity-80">
                © 2025 Homehaven. Todos os direitos reservados.
            </div>
        </footer>
    );
}
