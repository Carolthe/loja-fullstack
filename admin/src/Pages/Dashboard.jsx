import Sidebar from "../Layouts/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] min-w-screen bg-gray-700">
      <div className="mt-25 flex gap-10">
        <Sidebar activeRoute="dashboard" />
        <div>
          <h1 className="text-2xl font-bold text-white">Painel de Controle</h1>
          <div className="mt-4">
            <div>
              <p className="text-white">Bem-vindo ao painel de controle do HomeHaven Admin!</p>
              <p className="text-white">Aqui você pode gerenciar suas configurações e visualizar estatísticas.</p>
              <p className="text-white">Navegue pelo menu à esquerda para acessar as diferentes seções.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
