import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";
import api from "../services/api";
import { SlArrowLeft } from "react-icons/sl";

export default function CreateAccount() {
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
        <div className="relative bg-greenMain h-[160px] flex flex-col text-center text-white">
          <div className="absolute bottom-0 left-0 w-full h-[45px] bg-white rounded-t-[120px]"></div>
          <div className="relative z-10">
            <Link to="/login" className="absolute mt-[15px] left-4 text-2xl hover:text-gray-400">
            <SlArrowLeft className="text-[20px]"/>
            </Link>
            <p className="mt-[60px]">Crie sua Conta</p>
            <div className="flex justify-center ">
            </div>
          </div>
        </div>
        <form className="flex flex-col items-center pt-[20px] pb-6 space-y-5"
          onSubmit={handleRegister}>
          <div>
            <label className="font-medium">Full Name</label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>
          <div>
            <label className="font-medium">Confirm Password</label>
            <Input type="password" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />
          </div>
          <button type="submit" className="w-[300px] py-3 bg-orangeMain text-white rounded-xl hover:bg-orange-400 transition">Sign Up</button>
        </form>
        <p className="text-center text-sm text-gray-600 pb-6">Already have an account?{" "}
          <Link to="/login" className="text-greenMain font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}