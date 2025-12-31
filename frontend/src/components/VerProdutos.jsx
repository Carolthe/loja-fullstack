import { Link } from "react-router-dom";

export default function VerProdutos() {
    return (
        <div>
            <Link to="/produtos" >
                <p className="text-font-cinza ml-[10px] underline decoration-[1px] mb-[10px]">Ver mais produtos</p>
            </Link>
        </div>
    )
}