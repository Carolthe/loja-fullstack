import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { LiaHomeSolid } from "react-icons/lia";
import { RiHome2Line } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <div className="bg-orangeMain text-white leading-[30px]">
                <div className="flex flex-col items-center pt-[30px]">
                    <div className="flex items-center gap-[3px]">
                        <LiaHomeSolid className="text-[18px] " />
                        <p className="text-[15px] md:text-[22px]">HOMEHAVEN</p>
                    </div>
                    <p className=" font-semibold md:text-[17px]">Entre em contato:</p>
                    <p className="flex items-center md:text-[15px]"><BsTelephone className="mr-[4px] text-[17px]" />+351 937 628 516</p>
                    <p className="flex items-center md:text-[15px]"><AiOutlineMail className="mr-[4px] text-[17px]" />homehaven1998@gmail.com</p>
                </div>
                <div className="flex justify-center gap-[20px] mt-[18px] md:text-[17px] md:justify-center md:gap-[10%] md:my-[70px]">
                    <a href="#">Home</a>
                    <a href="#">Produtos</a>
                    <a href="#">Carrinho</a>
                    <a href="#">Favoritos</a>
                </div>
                <div className="flex items-center pl-[10px] bg-highlightGreen w-[190px] h-[50px] rounded-[8px] mt-[20px] ml-[20px] ">
                    <FaWhatsapp className="text-[20px] " />
                    <p className="p-[10px]">Fale conosco</p>
                </div>
                <div className="pl-[20px] flex flex-col ">
                    <p className="mt-[20px] font-semibold ">NOSSA POLÍTICA</p>
                    <p>Política de Privacidade</p>
                    <p>Polítiva de Tempo de Envio</p>
                    <p className="pb-[10px] ">Termos de Uso</p>
                    <p className="font-semibold my-[5px]" >REDE SOCIAL</p>
                    <div className="flex  gap-[3px] text-black ">
                        <a className="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-l " href=""> <FaWhatsapp />  </a>
                        <a className="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-[2px] " target="blank" href="https://www.instagram.com/homehavenliving/?next=%2F"> <FaInstagram />  </a>
                        <a className="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-r " target="blank" href="https://www.facebook.com/profile.php?id=61580030390813"><FaFacebook />   </a>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center pt-[20px]">
                    <p >Métodos de Pagamento</p>
                    <div className="flex gap-[10px] mt-[8px] mb-[30px]">
                        {/* <img className="bg-white h-[23px] w-[32px]" src={visa} />
                        <img className="bg-white h-[23px] w-[32px]" src={masterCard} /> */}
                    </div>
                </div>
            </div>
            <div>
                <p className="flex items-center  justify-center text-[14px] my-[10px] ml-[5%] md:text-[16px] md:mb-[2%] ">&copy; 2025 <RiHome2Line className="ml-[4px]" /> Homehaven. Todos os direitos reservados.</p>
            </div>
        </>
    )
} 