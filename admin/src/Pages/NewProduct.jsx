import TableList from "../Components/TableList";
import Search from "../Layouts/Search";
import SidebarComponent from "../Layouts/Sidebar";

export default function NewProduct() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] min-w-screen bg-gray-700">
      <div className="mx-25 mt-25 flex w-full gap-10">
        <SidebarComponent activeRoute="produtos" />
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Produtos</h1>
            <div>
              <Search />
              <a
                href="/produtos"
                className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 font-medium text-white"
              >
                Voltar
              </a>
            </div>
          </div>
          <div className="mt-4 w-full">
            <TableList />
          </div>
        </div>
      </div>
    </div>
  );
}
