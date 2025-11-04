import CategoryCard from "../components/CategoryCard"
import ProductCard from "../components/ProductCard"
import Credibility from "../components/Crediblility"
import homeMobile from "../imgMobile/homeMobile.png"
import Footer from "../components/Footer"
import categoryLivingRoom from "../imgCategory/categoryLivingRoom.png"
import livingRoomCategory from "../imgCategory/livingRoomCategory.png"
import kitchenCategory from "../imgCategory/kitchenCategory.png"
import bathroomCategory from "../imgCategory/bathroomCategory.png"
import officeCategory from "../imgCategory/officeCategory.png"
import ScrollToTop from "../components/ScrollToTop"
import Newsletter from "../components/Newsletter"
import { Link } from "react-router-dom";
import products from "../data/products";

export default function Home() {
    return (
        <div>
            <img src={homeMobile} className=" md:hidden" />
            <div className="flex flex-col text-center items-center ">
                <h3 className="mt-[30px] mb-[5px] text-[22px] font-semibold md:mt-[50px] md:text-[35px] md:font-bold md:mb-[2px]">Featured Products</h3>
                <p className=" w-[310px] text-zinc-600 mb-[15px] md:w-[900px] md:mb-[50px] md:text-[18px]">Buy our best-selling products and be assured of qualuty!</p>
            </div>
            {/* <div className="mx-[10px] flex justify-center flex-wrap gap-[10px] md:gap-[35px]">
                {products.map(product => (
                    <ProductCard 
                    key={product.id} 
                    id={product.id} 
                    imgProduct={product.imgProduct}
                    title={product.title} 
                    price={product.price} />
                ))}
            </div> */}
            <div className="flex justify-center my-[40px]">
                <button className="border-[1px] font-medium bg-orangeMain text-white rounded-[10px] w-[110px] h-[45px]">Show More</button>
            </div>
            <p className="mt-[30px] mb-[25px] text-center flex flex-col text-[22px] font-semibold">Available Categories</p>
            <div className="flex overflow-x-auto gap-[25px] mx-[20px]">
                <Link to="/roomCategory">
                    <CategoryCard imgCategory={categoryLivingRoom} tituloCategory="Room" />
                </Link>
                <Link to="/livingRoomCategory">
                    <CategoryCard imgCategory={livingRoomCategory} tituloCategory="Living Room" />
                </Link>
                <Link to="/kitchenCategory">
                    <CategoryCard imgCategory={kitchenCategory} tituloCategory="Kitchen" />
                </Link>
                <Link to="/bathroomCategory">
                    <CategoryCard imgCategory={bathroomCategory} tituloCategory="Bathoom" />
                </Link>
                <Link to="/officeCategory">
                    <CategoryCard imgCategory={officeCategory} tituloCategory="Office" />
                </Link>
            </div>
            <Credibility />
            <Newsletter />
            <ScrollToTop />
            <Footer />
        </div>
    )
}