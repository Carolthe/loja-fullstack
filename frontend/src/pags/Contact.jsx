import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import Input from "../components/Input";
import ScrollToTop from "../components/ScrollToTop";

export default function Contact() {
  return (
    <div className="mt-[30px]">
      <p className="text-center font-semibold text-[23px] mt-[40px] ">Please contact us</p>
      <p className="text-center mx-[40px] mb-[20px] text-fontGray">Ask questions and help us improve our services.</p>
    <form className="flex flex-col items-center gap-[15px]">
     <div>
      <label className="font-semibold">Your name</label>
      <Input placeholder="Abc"/>
      </div>
      <div>
      <label className="font-semibold">Email adderss</label>
      <Input placeholder="Abc@gmail.com"/>
      </div>
      <div>
      <label className="font-semibold">Subject</label>
      <Input placeholder="This is optional"/>
      </div>
      <div className="flex flex-col">
         <label className="font-semibold">Mensage</label>
         <textarea placeholder="Hi! i'd like to ask about" rows="6" className="border-[1px] pl-[10px] pt-[5px] mt-[5px] rounded-[5px] w-[300px]"/>
      </div>
       <button className="w-[310px] h-[50px] text-white bg-highlightGreen">Submit</button>
    </form>
    <Credibility/>
    <ScrollToTop/>
    <Footer/>
    </div>
  )
}
