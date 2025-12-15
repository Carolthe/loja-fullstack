// @ts-check

import TableList from "../../../Components/TableList";
import Search from "../../../Components/Layout/Search";
import { Usuarios } from "../../../backend/Usuarios";
import { useEffect, useState } from "react";
import useSidebar from "../../../Hooks/useSidebar";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const { setSidebar } = useSidebar();
  /**
   * @type {import("../../../backend/Usuarios").Usuario[]}
   */
  const valores = [];
  const [usuarios, setUsuarios] = useState(valores);

  useEffect(() => {
    const users = new Usuarios();
    users.getAllUsers().then((data) => {
      setUsuarios(data);
      setIsLoading(false);
    });
    // @ts-ignore
    setSidebar("usuarios");
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Usuarios</h1>
        <div className="flex items-center gap-4">
          <Search />
        </div>
      </div>
      <div className="mt-4 w-full">
        <TableList
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
        />
      </div>
    </div>
  );
}
