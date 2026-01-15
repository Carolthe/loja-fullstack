export default function CardCategoria({ tituloCategory, imgCategory }) {
    return (
        <div className="w-[90px] ">
            <div className="w-[80px] h-[80px] bg-[#d8e2ef] rounded-full flex items-center  justify-center">
                <img className="" src={imgCategory} />
            </div>
            <p className="text-center text-font-cinza flex flex-col mt-[10px]">{tituloCategory}</p>
        </div>
    )
}