import quarto from "../imagensCategorias/quarto.png"

export default function CardBannerCategoria() {
  return (
    <section className="w-full px-[5vw]">
      <div className=" bg-[#f6f7f7] flex justify-between items-center rounded-[15px] w-full h-[150px] px-5">
        <div className="max-w-[70%]">
          <p className="font-semibold text-azul-escuro text-[20px]">Categoria Quarto</p>
          <p className="text-font-cinza text-[15px] leading-tight">Os melhores produtos para o seu quarto</p>
        </div>
        <img src={quarto}
          alt="Categoria Quarto"
          className="w-[50px] h-[50px]"/>
      </div>
    </section>
  )
}
