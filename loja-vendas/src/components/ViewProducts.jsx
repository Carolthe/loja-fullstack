import { Link } from "react-router-dom";

export default function ViewProducts (){
    return(
        <div>
            <Link to="/produtos" >
            <p className="text-fontGray ml-[10px] underline decoration-[1px] mb-[10px]">See more products</p>
            </Link>
         </div>
    )
}