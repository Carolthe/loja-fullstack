import Input from "../components/Input";
import logotipo from "../imgMobile/logotipo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api"
import { toast} from "react-toastify";


export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const res = await api.post("/users/login", { email, senha })
            toast.info("Login realizado com sucesso")

            localStorage.setItem("usuario", JSON.stringify(res.data.usuario))

            setTimeout(() => {
        navigate("/");
      }, 2400);

      return
        } catch (error) {
            toast.info(error.response?.data?.error || "Erro ao fazer login")
        }
    }

    return (
        <div className="h-[100vh]">
            <div>
                <div className="relative bg-[#5769a9] h-[190px] flex flex-col items-center justify-center text-center">
                    <div className="absolute bottom-0 left-0 w-full h-[50px] bg-white rounded-t-[100px]"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <img className="w-[170px] mb-[60px]" src={logotipo} alt="logo" />
                    </div>
                </div>
                <form className="flex flex-col items-center pb-6"
                    onSubmit={handleLogin}>
                    <div className="mt-[35px]">
                        <label className="font-semibold">Seu E-mail</label>
                        <Input value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mt-[20px]">
                        <label className="font-semibold">Sua Senha</label>
                        <Input placeholder="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <button className="w-75 h-[55px] mt-[25px] bg-amarelo-principal font-bold text-white text-[21px] rounded-[15px]">Login</button>
                    <Link to="/password-recovery">
                        <p className="mt-3.75 text-azul-principal">Recuperar a Senha</p>
                    </Link>
                    <div className="mt-37.5 mb-6">
                        <Link to="/createAccount">
                            <p>Não tenho uma conta?{" "}<span className="text-azul-principal font-semibold">Inscreva-se</span></p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}