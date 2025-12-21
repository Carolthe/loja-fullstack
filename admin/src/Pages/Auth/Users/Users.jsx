// @ts-check

import TableList from "../../../Components/TableList";
import Search from "../../../Components/Layout/Search";
import { Usuarios } from "../../../backend/Usuarios";
import { useEffect, useState } from "react";
import useSidebar from "../../../Hooks/useSidebar";
import useToast from "../../../Hooks/useToast";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const { setSidebar } = useSidebar();
  const { setMessage, setToast } = useToast();
  /**
   * @type {import("../../../backend/Usuarios").Usuario[]}
   */
  const usuariosValores = [];
  const [usuarios, setUsuarios] = useState(usuariosValores);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10,
  });

  useEffect(() => {
    const categories = new Usuarios();
    categories.getAll().then((data) => {
      setUsuarios(data.data);
      setMeta({
        currentPage: data.meta.current_page ?? 1,
        perPage: data.meta.per_page ?? 10,
        totalItems: data.meta.total_items ?? 0,
        totalPages: data.meta.total_pages > 0 ? data.meta.total_pages : 1,
      });
      setIsLoading(false);
    });
    // @ts-ignore
    setSidebar("usuarios");
  }, []);

  const deleteUsuario = async (id) => {
    const usuario = new Usuarios();
    const deleted = await usuario.delete(id);
    if (deleted) {
      // @ts-ignore
      setToast("success");
      // @ts-ignore
      setMessage("Usuario deletada com sucesso.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      // @ts-ignore
      setToast("danger");
      // @ts-ignore
      setMessage("Erro ao deletar a usuario.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleSearch = ({ page = 1, search = "" }) => {
    const categories = new Usuarios();
    categories.getAll({ search: search, page: page }).then((data) => {
      setUsuarios(data.data);
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
        <h1 className="text-2xl font-bold text-gray-100">Usuarios</h1>
        <div className="flex items-center gap-4">
          <Search handleSearch={handleSearch} />
        </div>
      </div>
      <div className="mt-4 w-full">
        <TableList
          deleteAction={deleteUsuario}
          actionsSize="w-1/6"
          columns={[
            {
              name: "Id",
              label: "id_usuario",
              width: "w-1/6",
            },
            {
              name: "Nome",
              label: "nome",
              width: "w-1/6",
            },
            {
              name: "Email",
              label: "email",
              width: "w-1/6",
            },
            {
              name: "Senha",
              label: "senha",
              width: "w-1/6",
            },
            {
              name: "Data de Criação",
              label: "data_criacao",
              width: "w-1/6",
            },
          ]}
          items={usuarios}
          isLoading={isLoading}
          permissions={{ canView: true, canEdit: false, canDelete: true }}
          routeName="usuarios"
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
