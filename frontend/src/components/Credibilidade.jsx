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
    <section className="w-full mt-[50px] mb-[40px]">
      {/* NÃO use overflow-hidden aqui */}
      <div
        className="
          flex gap-6
          overflow-x-auto
          snap-x snap-mandatory
          scroll-smooth
          px-[7.5vw]
          scroll-px-[7.5vw]
        "
      >
        {items.map((it, idx) => (
          <div
            key={idx}
            className="
              flex flex-col items-center justify-center text-center
              flex-shrink-0
              w-[85vw]
              snap-center
              text-[#363E7A]
            "
          >
            {it.icon}

            <p className="mt-2 font-semibold">{it.title}</p>
            <p className="mt-1 leading-tight">{it.desc}</p>

            {/* indicadores */}
            <div className="flex gap-[8px] mt-[20px]">
              {items.map((_, j) => (
                <span
                  key={j}
                  className={`w-[5px] h-[5px] rounded-full ${
                    j === idx ? "bg-slate-400" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
