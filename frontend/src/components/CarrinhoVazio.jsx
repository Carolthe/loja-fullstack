import carrinhoVazio from "../imgMobile/carrinhoVazio.png"

export default function CarrinhoVazio(props) {
    return (
        <div className="flex flex-col items-center justify-center">
            <img className="w-[300px]" src={carrinhoVazio} />
            <p className="font-semibold text-[18px]">{props.text}</p>
        </div>
    )
}