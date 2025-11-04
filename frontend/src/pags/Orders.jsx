import CardOrders from "../components/CardOrders";
import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ViewProducts from "../components/ViewProducts";


export default function Orders() {
  return (
    <div className="mt-[30px]">
      <ViewProducts />
      <p className="text-center font-semibold text-[22px] mt-[30px]">My Purchases</p>
      <CardOrders />
      <CardOrders />
      <Credibility />
      <ScrollToTop />
      <Footer />
    </div>
  )
}