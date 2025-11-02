import { FiTrash2 } from "react-icons/fi";


export default function CartCard({product, removeFromCart}) {
    return (
        <div className="flex mx-[15px] my-[25px] ">
            <img className="w-[120px]" src={product.imgProduct} alt="{product.title}" />
            <div className="ml-[10px] w-full">
                <div className="flex justify-between ">
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm">{product.price} $ </p>
                </div>
                <p className="text-fontGray mt-[5px]">Breve descrição</p>
                <div className="flex justify-between mt-[10px]">
                <div className="flex items-center gap-[10px]">
                    <button className="flex items-center justify-center bg-greenMain w-[22px] h-[14px] text-white ">-</button>
                    <button className="flex items-center justify-center bg-greenMain w-[22px] h-[14px] text-white " >+</button>
                </div>
                <FiTrash2 className="text-[20px] text-red-600"
                onClick={() => removeFromCart(product.id)}/>
                </div>

            </div>
        </div>
    )
}