import produto2 from "../imgProducts/produto2.jpg"

export default function CardCompras() {
  return (
    <div className="mx-5 my-4 rounded-[2px] shadow-md bg-white p-4 flex flex-col gap-3 md:w-[400px]">
      <p className="text-sm text-gray-500">Encomendado em 17/01/2026</p>
      <p className="font-semibold text-verde text-base">Pedido em Andamento</p>
      <div className="flex items-center gap-4">
        <img
          className="w-24 h-24 object-cover rounded-xl border border-gray-200"
          src={produto2}
          alt="Produto" />
        <p className="text-gray-700 font-medium">Sofa Azul</p>
      </div>
    </div>
  )
}