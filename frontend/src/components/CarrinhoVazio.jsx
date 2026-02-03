import carrinhoVazio from "../imgMobile/carrinhoVazio.png"
//import nenhumProduto from "../imgMobile/nenhumProduto.png"

export default function CarrinhoVazio(props) {
    return (
        <div className="flex flex-col my-[15px] items-center justify-center md:mb-[100px] md:mt-[70px]">
            <img className="w-[300px]" src={carrinhoVazio} />
            <p className="font-semibold text-[18px]">{props.text}</p>
        </div>
    )
}