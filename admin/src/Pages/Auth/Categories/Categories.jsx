// @ts-check

import TableList from "../../../Components/TableList";
import Search from "../../../Components/Layout/Search";
import { Categorias } from "../../../backend/Categorias";
import { useEffect, useState } from "react";
import useSidebar from "../../../Hooks/useSidebar";
import useToast from "../../../Hooks/useToast";

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const { setSidebar } = useSidebar();
  const { setMessage, setToast } = useToast();
  /**
   * @type {import("../../../backend/Categorias").Categoria[]}
   */
  const categoriasValores = [];
  const [categorias, setCategorias] = useState(categoriasValores);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10,
  });

  useEffect(() => {
    const categories = new Categorias();
    categories.getAll().then((data) => {
      setCategorias(data.data);
      setMeta({
        currentPage: data.meta.current_page ?? 1,
        perPage: data.meta.per_page ?? 10,
        totalItems: data.meta.total_items ?? 0,
        totalPages: data.meta.total_pages > 0 ? data.meta.total_pages : 1,
      });
      setIsLoading(false);
    });
    // @ts-ignore
    setSidebar("categorias");
  }, []);

  const deleteCategory = async (id) => {
    const categoria = new Categorias();
    const deleted = await categoria.delete(id);
    if (deleted) {
      // @ts-ignore
      setToast("success");
      // @ts-ignore
      setMessage("Categoria deletada com sucesso.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      // @ts-ignore
      setToast("danger");
      // @ts-ignore
      setMessage("Erro ao deletar a categoria.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleSearch = ({ page = 1, search = "" }) => {
    const categories = new Categorias();
    categories.getAll({ search: search, page: page }).then((data) => {
      setCategorias(data.data);
      setMeta({
        currentPage: data.meta.current_page ?? 1,
        perPage: data.meta.per_page ?? 10,
        totalItems: data.meta.total_items ?? 0,
        totalPages: data.meta.total_pages > 0 ? data.meta.total_pages : 1,
      });
    });
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Categorias</h1>
        <div className="flex items-center gap-4">
          <Search handleSearch={handleSearch} />
          <a
            href="/categorias/novo"
            className="bg-primary-600 hover:bg-primary-500 rounded-md px-4 py-2 font-medium text-white"
          >
            Nova Categoria
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
          permissions={{ canView: true, canEdit: true, canDelete: true }}
          routeName="categorias"
          deleteAction={deleteCategory}
          paginationOptions={{
            currentPage: meta.currentPage,
            totalPages: meta.totalPages,
            onPageChange: (page) => handleSearch({ page }),
          }}
        />
      </div>
    </div>
  );
}
/**
 * @type {import("../../../backend/Categorias").Meta}
 */
