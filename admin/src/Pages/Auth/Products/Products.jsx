// @ts-check

import TableList from "../../../Components/TableList";
import Search from "../../../Components/Layout/Search";
import { Produtos } from "../../../backend/Produtos";
import { useEffect, useState } from "react";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  /**
   * @type {import("../../../backend/Produtos").Produto[]}
   */
  const valores = [];
  const [produtos, setProdutos] = useState(valores);

  useEffect(() => {
    const products = new Produtos();
    products.getAllProducts().then((data) => {
      setProdutos(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Produtos</h1>
        <div className="flex items-center gap-4">
          <Search />
          <a
            href="/produtos/novo"
            className="bg-primary-600 hover:bg-primary-500 rounded-md px-4 py-2 font-medium text-white"
          >
            Novo Produto
          </a>
        </div>
      </div>
      <div className="mt-4 w-full">
        <TableList
          actionsSize="w-1/5"
          columns={[
            {
              name: "Id",
              label: "id_produto",
              width: "w-1/5",
            },
            {
              name: "Nome",
              label: "nome",
              width: "w-1/5",
            },
            {
              name: "Preço",
              label: "preco",
              width: "w-1/5",
            },
            {
              name: "Estoque",
              label: "estoque",
              width: "w-1/5",
            },
          ]}
          items={produtos}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
