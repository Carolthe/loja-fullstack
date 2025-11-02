import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LiaUserSolid, LiaHeart, LiaShoppingBagSolid, LiaHomeSolid } from "react-icons/lia";

export default function Header() {
  const cartCount = 0;
  return (
    <div className="fixed z-50 flex items-center justify-between px-[20px] bg-greenMain w-[100vw] md:w-[100%] h-[65px] text-white md:px-[60px] md:h-[75px]">
      <Navbar className="" />
      <Link to="/" className="flex items-center ">
        <LiaHomeSolid className="text-[25px] md:text-[40px]" />
        <p className="text-[18px] md:text-[25px]">Homehaven</p>
      </Link>
      <div className="md:flex md:gap-[30px] hidden">
        <p>Todos os Produtos</p>
        <p>Minhas Encomendas</p>
        <p>Contactar</p>
      </div>
      <div className="flex items-center md:gap-[10px] text-[23px]">
        <Link to="/login">
          <LiaUserSolid />
        </Link>
        <Link to="/favoritos">
          <LiaHeart />
        </Link>
        <Link to="/carrinho" className="relative">
          <LiaShoppingBagSolid />
          {cartCount >= 0 && (
            <p className="absolute -top-2 -right-2 bg-orangeMain text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </p>
          )}
        </Link>
      </div>
    </div>
  );
}
