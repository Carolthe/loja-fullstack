import CartCard from "../components/CartCard";
import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ViewProducts from "../components/ViewProducts";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";


export default function Cart() {
  
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1), 0
  )

    return (
    <div className="mt-[30px] ">
      <ViewProducts />
      <p className="text-[23px] text-center font-semibold">Your Products</p>
      <div className="flex justify-between mx-[20px] my-[15px] text-sm text-fontGray">
        <p>PRODUCTS <span>(1)</span> </p>
        <p>TOTAL <span>(25.0)</span> </p>
      </div>
      <hr />
      {cartItems.map(product => (
        <CartCard key={product.id} product={product} removeFromCart={removeFromCart} />
      ))}
      <hr />
      <div className="flex flex-col items-center mt-[30px]">
        <p className="mb-[20px] font-semibold">Total:<span className="text-fontGray ml-[20px]">{total} $</span></p>
        <Link to="/pagamento" >
          <button className="w-[310px] h-[50px] text-white bg-highlightGreen">Complete Checkout</button>
        </Link>
        <button className="w-[310px] h-[50px] text-white bg-highlightGreen"
        onClick={clearCart}>Limpar o Carrinho</button>
      </div>
      <Credibility />
      <ScrollToTop />
      <Footer />
    </div>
  )
}