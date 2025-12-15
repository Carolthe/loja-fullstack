// @ts-check

import TableList from "../../../Components/TableList";
import Search from "../../../Components/Layout/Search";
import { Categorias } from "../../../backend/Categorias";
import { useEffect, useState } from "react";

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  /**
   * @type {import("../../../backend/Categorias").Categoria[]}
   */
  const valores = [];
  const [categorias, setCategorias] = useState(valores);

  useEffect(() => {
    const categories = new Categorias();
    categories.getAllCategories().then((data) => {
      setCategorias(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Categorias</h1>
        <div className="flex items-center gap-4">
          <Search />
          <a
            href="/categorias"
            className="bg-primary-600 hover:bg-primary-500 rounded-md px-4 py-2 font-medium text-white"
          >
            Novo Categoria
          </a>
        </div>
      </div>
      <div className="mt-4 w-full">
        <TableList
          actionsSize="w-1/3"
          columns={[
            {
              name: "Id",
              label: "id_categoria",
              width: "w-1/3",
            },
            {
              name: "Nome",
              label: "nome",
              width: "w-1/3",
            },
          ]}
          items={categorias}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
