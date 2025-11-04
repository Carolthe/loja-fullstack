import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Newsletter from "../components/Newsletter";
import ScrollToTop from "../components/ScrollToTop";

export default function Payment() {
    return (
        < div className="mt-[0px]">
            <div className=" flex flex-col items-center">
                <h4 className="text-center font-semibold text-[23px] mt-[20px]">Finalising the Purchase</h4>
                <p className="font-semibold text-greenMain mt-[20px] text-center">Your Contact</p>
                <form className=" gap-[30px] mt-[10px]">
                    <div>
                        <label className="font-semibold">Your Full Name</label>
                        <Input placeholder="Abc" />
                    </div>
                    <div>
                        <label className="font-semibold">Email Address </label>
                        <Input placeholder="Abc@gmail.com" />
                    </div>
                </form>
                <p className="font-semibold text-greenMain text-center mt-[20px] mb-[10px]">Delivery Place</p>
                <form className="flex flex-col items-center gap-[30px]">
                    <div>
                        <label className="font-semibold ">Country / Region </label>
                        <Input placeholder="Abc@gmail.com" />
                    </div>
                    <div>
                        <label className="font-semibold">Street Address </label>
                        <Input placeholder="Abc@gmail.com" />
                    </div>
                    <div>
                        <label className="font-semibold">Town / City </label>
                        <Input placeholder="Abc@gmail.com" />
                    </div>
                    <div>
                        <label className="font-semibold">Province </label>
                        <Input placeholder="Abc@gmail.com" />
                    </div>
                    <div>
                        <label className="font-semibold">ZIP code </label>
                        <Input placeholder="Abc@gmail.com" />
                    </div>
                    <div>
                        <label className="font-semibold">Additional information </label>
                        <Input placeholder="Abc@gmail.com" />
                    </div>
                </form>
                <p className="font-semibold text-greenMain text-center mt-[25px]  ">Payment Method</p>
                <p className="text-fontGray">All transformations are secure and encrypted.</p>
                <div className="bg-slate-200 h-[500px] w-[340px] mt-[20px]">
                    <p>teste</p>
                </div>
            </div>
            <Credibility />
            <Newsletter />
            <ScrollToTop />
            <Footer />
        </div>
    )
}