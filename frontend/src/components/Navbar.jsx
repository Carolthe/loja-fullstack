import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { LiaBarsSolid } from "react-icons/lia"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [openCategorias, setOpenCategorias] = useState(false)

  const closeMenu = () => {
    setOpen(false)
    setOpenCategorias(false)
  }

  return (
    <nav className="text-white lg:hidden">
      <button onClick={() => setOpen(!open)} className="md:hidden">
        {open ? <X size={28} /> : <LiaBarsSolid size={28} />}
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* MENU */}
      <ul
        className={`
          fixed top-0 left-0 h-full w-64 bg-white text-gray-900
          flex flex-col gap-6 p-6 shadow-lg
          transform transition-transform duration-300 ease-in-out z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <li>
          <Link to="/" onClick={closeMenu} className="hover:text-greenMain">
            Home
          </Link>
        </li>

        <li>
          <Link to="/produtos" onClick={closeMenu} className="hover:text-greenMain">
            All Products
          </Link>
        </li>

        {/* DROPDOWN CATEGORIAS */}
        <li>
          <button
            onClick={() => setOpenCategorias(!openCategorias)}
            className="flex items-center justify-between w-full hover:text-greenMain"
          >
            Categorias
            <ChevronDown
              size={18}
              className={`transition-transform ${
                openCategorias ? "rotate-180" : ""
              }`}
            />
          </button>

          {openCategorias && (
            <ul className="mt-3 ml-3 flex flex-col gap-3 text-sm text-gray-700">
              <li>
                <Link to="/quarto" onClick={closeMenu}>
                  Quarto
                </Link>
              </li>
              <li>
                <Link to="/sala" onClick={closeMenu}>
                  Sala
                </Link>
              </li>
              <li>
                <Link to="/cozinha" onClick={closeMenu}>
                  Cozinha
                </Link>
              </li>
              <li>
                <Link to="/banheiro" onClick={closeMenu}>
                  Banheiro
                </Link>
              </li>
              <li>
                <Link to="/escritorio" onClick={closeMenu}>
                  Escritório
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/carrinho" onClick={closeMenu} className="hover:text-greenMain">
            Cart
          </Link>
        </li>

        <li>
          <Link to="/favoritos" onClick={closeMenu} className="hover:text-greenMain">
            Favourites
          </Link>
        </li>

        <li>
          <Link to="/pedidos" onClick={closeMenu} className="hover:text-greenMain">
            My Orders
          </Link>
        </li>

        <li>
          <Link to="/contato" onClick={closeMenu} className="hover:text-greenMain">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
