import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function RecuperacaoSenha() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const step = token && email ? 2 : 1;
  const [emailInput, setEmailInput] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  async function solicitarLink() {
    try {
      await api.post('/users/forgot-password', { email: emailInput });
      toast.info("Se o e-mail existir, você receberá instruções para recuperar a senha.");
    } catch {
      toast.info("Erro ao solicitar link.");
    }
  }

  async function resetarSenha() {
    if (senha !== confSenha) return toast.error("Senhas não são iguais");
    try {
      await api.post("/users/reset-password", { email, token, senha });
      toast.info("Senha alterada com sucesso");
      window.location.href = "/login";
    } catch {
      toast.info("Erro ao resetar senha.");
    }
  }

  return (
    <div className=" flex justify-center mt-[250px] bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg w-[350px] p-6 sm:w-[400px]">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {step === 1 ? "Recuperar senha" : "Nova senha"}</h2>
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <input type="email"
              placeholder="Seu email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-greenMain" />
            <button onClick={solicitarLink}
              className="w-full py-3 bg-amarelo-principal text-[19px] text-white font-bold rounded-[15px] hover:bg-yellow-400 transition">Enviar link</button>
            <Link to="/login" className="text-sm text-gray-500 text-center hover:underline mt-2"> Voltar para o login </Link>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <input type="password"
              placeholder="Nova senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-greenMain" />
            <input type="password"
              placeholder="Confirmar senha"
              value={confSenha}
              onChange={(e) => setConfSenha(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-greenMain focus:border-greenMain" />
            <button onClick={resetarSenha}
              className="w-full py-3 bg-verde text-white font-semibold rounded-lg hover:bg-green-600 transition"> Alterar senha </button>
            <Link to="/login"
              className="text-sm text-gray-500 text-center hover:underline mt-2" > Voltar para o login</Link></div>
        )}
      </div>
    </div>
  );
}
