import TableList from "../Components/TableList";
import SidebarComponent from "../Layouts/Sidebar";

export default function Products() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] min-w-screen bg-gray-700">
      <div className="mt-25 flex gap-10 w-full">
        <SidebarComponent activeRoute="produtos" />
        <div className="w-full mr-25">
          <h1 className="text-2xl font-bold text-white">Produtos</h1>
          <div className="mt-4 w-full">
            <TableList />
          </div>
        </div>
      </div>
    </div>
  );
}
