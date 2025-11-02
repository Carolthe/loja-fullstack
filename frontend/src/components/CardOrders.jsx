import produto2 from "../imgProducts/produto2.jpg"

export default function CardOrders (){
    return(
      <div className="mx-5 my-4 rounded-[2px] shadow-md bg-white p-4 flex flex-col gap-3">
  {/* Data da encomenda */}
  <p className="text-sm text-gray-500">Ordered on 17/08/2025</p>

  {/* Status */}
  <p className="font-semibold text-green-600 text-base">Order in Progress</p>

  {/* Produto */}
  <div className="flex items-center gap-4">
    <img
      className="w-24 h-24 object-cover rounded-xl border border-gray-200"
      src={produto2}
      alt="Produto"
    />
    <p className="text-gray-700 font-medium">Abajur Florecente</p>
  </div>
</div>
    )
}