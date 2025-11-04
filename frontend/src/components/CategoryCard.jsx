export default function CardCategory({ tituloCategory, imgCategory }) {
    return (
        <div className="w-[90px]">
            <div className="w-[90px] h-[90px] bg-orangeMain rounded-[10px]">
                <img className="" src={imgCategory} />
            </div>
            <p className="text-center text-fontGray flex flex-col mt-[10px]">{tituloCategory}</p>
        </div>
    )
}