import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  async function carregarCarrinho() {
    if (!usuario) return;

    try {
      const res = await api.get(`/carrinho/${usuario.id_usuario}`);
      setCarrinho(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    carregarCarrinho();
  }, [usuario]);

  const totalItens = carrinho.reduce(
    (sum, item) => sum + item.quantidade,
    0
  );

  const total = carrinho.reduce(
    (sum, item) => sum + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrinho,
        setCarrinho,
        carregarCarrinho,
        total,
        totalItens,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
