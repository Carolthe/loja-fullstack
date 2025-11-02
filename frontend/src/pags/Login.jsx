import Input from "../components/Input";
import logotipo from "../imgMobile/logotipo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api"

export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const res = await api.post("/users/login", { email, senha })
            alert("Login realizado com sucesso")

            //Guarda o usuário logado temporariamente
            localStorage.setItem("usuario", JSON.stringify(res.data.usuario))

            navigate("/")
        } catch (error) {
            alert(error.response?.data?.error || "Erro ao fazer login")
        }
    }

    return (
        <div className="h-[100vh]">
            <div>
                <div className="relative bg-greenMain h-[200px] flex flex-col items-center justify-center text-center">
                    <div className="absolute bottom-0 left-0 w-full h-[50px] bg-white rounded-tl-[120px]"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <img className="w-[200px] mb-[45px]" src={logotipo} alt="logo" />
                    </div>
                </div>
                <form className="flex flex-col items-center pb-6"
                    onSubmit={handleLogin}>
                    <div className="mt-[35px]">
                        <label className="font-semibold">Your E-mail</label>
                        <Input />
                    </div>
                    <div className="mt-[20px]">
                        <label className="font-semibold">Your Password</label>
                        <Input />
                    </div>
                    <button className="w-[300px] h-[45px] mt-[25px] bg-orangeMain text-white text-[19px] rounded-md">Login</button>
                    <p className="mt-[15px] text-fontGray">Recover the Password</p>
                    <div className="mt-[150px] mb-6">
                        <Link to="/createAccount">
                            <p>Don't have an account?{" "}<span className="text-greenMain font-semibold">Sign up</span></p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}