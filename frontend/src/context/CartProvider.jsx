//######Para testes#######

import { createContext, useState, useContext } from "react"

const CartContext = createContext()

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    //Adicionar produtos ao carrinho
    const addToCart = (product) => {
        setCartItems((valorAtual) => {
            const existing = valorAtual.find((item) => item.id === product.id)
            if (existing) {
                //Se já existe, aumenta a quantidade
                return valorAtual.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            // Se não existe, adiciona
            return [...valorAtual, { ...product, quantity: 1 }]
        })
    };
    const removeFromCart = (id) => {
        setCartItems((valorAtual)=> valorAtual.filter((item) => item.id !== id))
    };

    //Limpa carrinho
    const clearCart = () => setCartItems ([]);

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
};

export function useCart(){
    return useContext(CartContext)
};