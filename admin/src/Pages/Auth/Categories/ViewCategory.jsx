// @ts-check

import { TextInput } from "flowbite-react";
import Form from "../../../Components/Form";
import Search from "../../../Components/Layout/Search";
import { useEffect, useState } from "react";
import { Categorias } from "../../../backend/Categorias";
import { useParams } from "react-router-dom";
import useSidebar from "../../../Hooks/useSidebar";

export default function ViewCategory() {
  const [nome, setNome] = useState("");
  const { id } = useParams();
  const { setSidebar } = useSidebar();

  useEffect(() => {
    const categorias = new Categorias();
    if (!id) {
      return;
    }
    categorias.getById(id).then(
      /**
       * @param {{nome: string}|null} data
       */
      (data) => {
        if (data) {
          setNome(data.nome);
        }
      },
    );
    // @ts-ignore
    setSidebar("categorias");
  }, []);

  if (!id) {
    return <div>Categoria não encontrada.</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Novo Categoria</h1>
        <div className="flex items-center gap-4">
          <Search />
          <a
            href="/categorias"
            className="bg-primary-600 hover:bg-primary-500 rounded-md px-4 py-2 font-medium text-white"
          >
            Voltar
          </a>
        </div>
      </div>
      <div className="mt-4 w-full">
        <Form type="disabled">
          {/* nome */}
          <TextInput
            id="nome"
            type="text"
            placeholder="Nome do Categoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={true}
            required
          />
        </Form>
      </div>
    </div>
  );
}
