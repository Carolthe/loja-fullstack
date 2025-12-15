// @ts-check

import TableList from "../../../Components/TableList";
import Search from "../../../Components/Layout/Search";
import { Newsletters as BackendNewsletters } from "../../../backend/Newsletters";
import { useEffect, useState } from "react";

export default function Newsletters() {
  const [isLoading, setIsLoading] = useState(true);
  /**
   * @type {import("../../../backend/Newsletters").Newsletter[]}
   */
  const valores = [];
  const [newsletters, setNewsletters] = useState(valores);

  useEffect(() => {
    const products = new BackendNewsletters();
    products.getAllNewsletters().then((data) => {
      setNewsletters(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Newsletters</h1>
        <div className="flex items-center gap-4">
          <Search />
          <a
            href="/newsletters"
            className="bg-primary-600 hover:bg-primary-500 rounded-md px-4 py-2 font-medium text-white"
          >
            Novo Newsletter
          </a>
        </div>
      </div>
      <div className="mt-4 w-full">
        <TableList
          columns={[
            {
              name: "Id",
              label: "id_newsletter",
              width: "w-1/4",
            },
            {
              name: "Nome",
              label: "nome",
              width: "w-1/4",
            },
            {
              name: "Email",
              label: "email",
              width: "w-1/4",
            },
          ]}
          actionsSize="w-1/4"
          items={newsletters}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
