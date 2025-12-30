import { useNavigate } from "react-router-dom"

export default function Perfil() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem("usuario"))

  function handleLogout() {
    localStorage.removeItem("usuario")
    navigate("/")
    window.location.reload() // força Navbar/Header atualizar
  }

  return (
    <div className="bg-[#EDEEF7] flex pt-[180px] justify-center px-4">
      <div className="w-full max-w-md py-[40px] px-[18px] bg-white rounded-2xl shadow-md">

        {/* HEADER */}
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="w-14 h-14 rounded-full bg-azulEscuro text-white flex items-center justify-center text-xl font-semibold">
            {usuario?.nome?.charAt(0)}
          </div>

          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              {usuario?.nome}
            </h1>
            <p className="text-sm text-gray-500">
              Perfil do usuário
            </p>
          </div>
        </div>

        {/* INFORMAÇÕES */}
        <div className="mt-6 space-y-[10px] text-sm text-gray-700">
          <div className="">
            <span className="text-gray-500 pr-[15px]">Nome</span>
            <span className="font-medium">{usuario?.nome}</span>
          </div>

          {usuario?.email && (
            <div className="flex ">
              <span className="text-gray-500 pr-[15px]">Email</span>
              <span className="font-medium">{usuario.email}</span>
            </div>
          )}
        </div>

        {/* AÇÕES */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="
              w-full
              bg-amareloPrincipal 
          
              text-white
              py-2
              rounded-lg
              font-semibold
              transition-colors
            "
          >
            Terminar sessão
          </button>
        </div>

      </div>
    </div>
  )
}
