import {
  LiaShippingFastSolid,
  LiaLockSolid,
  LiaHeadsetSolid,
  LiaMedalSolid
} from "react-icons/lia";

export default function Credibilidade() {
  const items = [
    {
      icon: <LiaShippingFastSolid className="text-[25px]" />,
      title: "Entrega Rápida",
      desc: "Entrega rápida em todo o país",
    },
    {
      icon: <LiaLockSolid className="text-[25px]" />,
      title: "Pagamento Seguro",
      desc: "100% transações seguras",
    },
    {
      icon: <LiaHeadsetSolid className="text-[25px]" />,
      title: "24/7 suporte",
      desc: "Atendimento ao cliente sempre disponível",
    },
    {
      icon: <LiaMedalSolid className="text-[25px]" />,
      title: "Qualidade garantida",
      desc: "Produtos de qualidade",
    },
  ];

  return (
    <section className="block md:hidden w-full mt-[30px] mb-[40px]">
      <div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-[7.5vw] scroll-px-[7.5vw]">
        {items.map((item, index) => (
          <div key={index}
            className="flex flex-col items-center justify-center text-center flex-shrink-0 w-[85vw] snap-center text-[#363E7A]">
            {item.icon}
            
            <p className="mt-2 font-semibold">{item.title}</p>
            <p className="mt-1 leading-tight">{item.desc}</p>

            <div className="flex gap-[8px] mt-[20px]">
              {items.map((_, indexCirculo) => (
                <span key={indexCirculo}
                  className={`w-[5px] h-[5px] rounded-full ${
                    indexCirculo === index ? "bg-slate-400" : "bg-slate-200"}`}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )}