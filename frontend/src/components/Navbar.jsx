import { useState } from "react";
import { X } from "lucide-react";
import { LiaBarsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="text-white lg:hidden">
      <button onClick={() => setOpen(!open)} className="md:hidden">
        {open ? <X size={28} /> : <LiaBarsSolid size={28} />}
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}
      <ul
        className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-900 flex flex-col gap-6 p-6 shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${open ? "translate-x-0" : "-translate-x-full"} 
       `}
      >
        <li><Link to="/" onClick={closeMenu} className="hover:text-greenMain">Home</Link></li>
        <li><Link to="/produtos" onClick={closeMenu} className="hover:text-greenMain">All Products</Link></li>
        <li><Link to="/carrinho" onClick={closeMenu} className="hover:text-greenMain">Cart</Link></li>
        <li><Link to="/favoritos" onClick={closeMenu} className="hover:text-greenMain">Favourites</Link></li>
        <li><Link to="/pedidos" onClick={closeMenu} className="hover:text-greenMain">My Orders</Link></li>
        <li><Link to="/contato" onClick={closeMenu} className="hover:text-greenMain">Contact</Link></li>
      </ul>
    </nav>
  );
}
