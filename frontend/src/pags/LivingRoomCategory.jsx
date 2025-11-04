import ProductCard from "../components/ProductCard.jsx"
import Credibility from "../components/Crediblility.jsx"
import Footer from "../components/Footer.jsx"
import ScrollToTop from "../components/ScrollToTop.jsx"

export default function LivingRoomCategory() {
    return (
        <div className="mt-[50px]">
            <img src="" />
            <div className="mx-[10px] flex justify-center flex-wrap gap-[10px] md:gap-[35px]" >
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <Credibility />
            <ScrollToTop />
            <Footer />
        </div>
    )
}