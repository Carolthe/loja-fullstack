import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";
import api from "../services/api";
import { SlArrowLeft } from "react-icons/sl";

export default function CriarConta() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmaSenha, setConfirmaSenha] = useState("")
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()

    if (senha !== confirmaSenha) {
      alert("As senhas não coicidem")
      return
    }
    try {
      await api.post("/users/register", { nome, email, senha })
      alert("Cadastro realizado com sucesso!")
      navigate("/login")
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao registrar")
    }
  }

  return (
    <div>
      <div>
        <div className="relative bg-[#5769a9] h-[160px] flex flex-col text-center text-white">
          <div className="absolute bottom-0 left-0 w-full h-[45px] bg-white rounded-t-[120px]"></div>
            <Link to="/login" className="pt-[20px] pl-[30px]  text-2xl hover:text-gray-400">
            <SlArrowLeft className="text-[20px]"/>
            </Link>
            <p className="mt-[15px]">Crie sua Conta</p>
        </div>
        <form className="flex flex-col items-center pt-[20px] pb-6 space-y-5"
          onSubmit={handleRegister}>
          <div>
            <label className="font-medium">Nome Inteiro</label>
            <Input value={nome} placeholder="nome" onChange={(e) => setNome(e.target.value)} />
          </div>
          <div>
            <label className="font-medium">E-mail</label>
            <Input value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="font-medium">Senha</label>
            <Input type="password" placeholder="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>
          <div>
            <label className="font-medium">Confirmar a Senha</label>
            <Input type="password" placeholder="senha" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />
          </div>
          <button type="submit" className="w-[300px] py-3 bg-amarelo-principal font-semibold text-white rounded-xl hover:bg-orange-400 transition">Inscrever-se</button>
        </form>
        <p className="text-center text-sm text-gray-600 pb-6">Eu já tenho uma conta?{" "}
          <Link to="/login" className="text-azul-principal font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}