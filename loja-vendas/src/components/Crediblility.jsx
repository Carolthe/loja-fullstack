import { LiaShippingFastSolid } from "react-icons/lia";
import { LiaLockSolid, LiaHeadsetSolid, LiaMedalSolid } from "react-icons/lia";

export default function Credibility() {
  const items = [
    { 
      icon: <LiaShippingFastSolid className="text-[25px]" />, 
      title: "Fast Delivery", 
      desc: "Fast delivery throughout the continent" 
    },
    { 
      icon: <LiaLockSolid className="text-[25px]" />, 
      title: "Pagamento Seguro", 
      desc: "100% secure transactions" 
    },
    { 
      icon: <LiaHeadsetSolid className="text-[25px]" />, 
      title: "24/7 support", 
      desc: "Customer service always available" 
    },
    { 
      icon: <LiaMedalSolid className="text-[25px]" />, 
      title: "Guaranteed quality", 
      desc: "Quality products" 
    },
  ];

  return (
    <section className="w-full my-[50px]">
      <div className="">
        {/* trilho do carrossel */}
        <div
          className="
            flex gap-6 overflow-x-auto 
            snap-x snap-mandatory
            scroll-smooth
            [scrollbar-width:auto] [-ms-overflow-style:auto]
          "
        >
          {/* espaçadores para centralizar primeiro/último card */}
          <div
            className=" "
          />
          
          {items.map((it, idx) => (
            <div
              key={idx}
              className="
                flex flex-col items-center justify-center text-center
                flex-shrink-0
                w-[320px] snap-center
                text-[#1b7488]
              "
            >
              {it.icon}
              <p className="mt-2 font-semibold">{it.title}</p>
              <p className="mt-1 leading-tight">{it.desc}</p>

              {/* bolinhas */}
              <div className="flex gap-[8px] mt-[20px]">
                {items.map((_, j) => (
                  <span
                    key={j}
                    className={`rounded-full w-[5px] h-[5px] ${
                      j === idx ? "bg-slate-400" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}

          <div
            className="shrink-0 w-[calc((100vw-320px)/2)] md:w-[calc((100vw-360px)/2)] lg:w-[calc((100vw-380px)/2)]"
            aria-hidden
          />
        </div>
      </div>
    </section>

  );
}

