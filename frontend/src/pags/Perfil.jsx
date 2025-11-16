import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

export default function Perfil() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  function handleLogout() {
    localStorage.removeItem("usuario");
    navigate("/"); 
    window.location.reload(); // força Navbar/Header atualizar
  }

  return (
    <div className="p-4">
      <h1 className="text-xl">Olá, {usuario?.nome}</h1>
     <h2>Atualizar localização</h2>
      <button 
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Terminar Sessão
      </button>
    </div>
  );
}
