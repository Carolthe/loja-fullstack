// @ts-check

import TableList from "../../../Components/TableList";
import Search from "../../../Components/Layout/Search";
import { Produtos } from "../../../backend/Produtos";
import { useEffect, useState } from "react";
import useSidebar from "../../../Hooks/useSidebar";
import useToast from "../../../Hooks/useToast";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const { setSidebar } = useSidebar();
  const { setMessage, setToast } = useToast();
  /**
   * @type {import("../../../backend/Produtos").Produto[]}
   */
  const produtosValores = [];
  const [produtos, setProdutos] = useState(produtosValores);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10,
  });

  useEffect(() => {
    const categories = new Produtos();
    categories.getAll().then((data) => {
      setProdutos(data.data);
      setMeta({
        currentPage: data.meta.current_page ?? 1,
        perPage: data.meta.per_page ?? 10,
        totalItems: data.meta.total_items ?? 0,
        totalPages: data.meta.total_pages > 0 ? data.meta.total_pages : 1,
      });
      setIsLoading(false);
    });
    // @ts-ignore
    setSidebar("produtos");
  }, []);

  const deleteProduto = async (id) => {
    const produto = new Produtos();
    const deleted = await produto.delete(id);
    if (deleted) {
      // @ts-ignore
      setToast("success");
      // @ts-ignore
      setMessage("Produto deletada com sucesso.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      // @ts-ignore
      setToast("danger");
      // @ts-ignore
      setMessage("Erro ao deletar a produto.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleSearch = ({ page = 1, search = "" }) => {
    const categories = new Produtos();
    categories.getAll({ search: search, page: page }).then((data) => {
      setProdutos(data.data);
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
        <h1 className="text-2xl font-bold text-gray-100">Produtos</h1>
        <div className="flex items-center gap-4">
          <Search handleSearch={handleSearch} />
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
          permissions={{ canView: true, canEdit: true, canDelete: true }}
          routeName="produtos"
          deleteAction={deleteProduto}
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
