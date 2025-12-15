// @ts-check

import { TextInput } from "flowbite-react";
import Form from "../../../Components/Form";
import Search from "../../../Components/Layout/Search";
import { useEffect, useState } from "react";
import { Categorias } from "../../../backend/Categorias";
import { useParams } from "react-router-dom";
import useSidebar from "../../../Hooks/useSidebar";

export default function EditCategory() {
  const [nome, setNome] = useState("Categoria 01");
  const { id } = useParams();
  const { setSidebar } = useSidebar();

  const validateForm = () => {
    const isNomeValid = nome.trim().length > 0;

    return isNomeValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const categoria = new Categorias();
      if (!id) {
        return;
      }
      const created = await categoria.update(
        {
          nome,
        },
        id,
      );
      if (created) {
        alert("Categoria criada com sucesso!");
        window.location.href = "/categorias";
        return;
      }
      alert("Erro ao criar a categoria. Tente novamente.");
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

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
        <Form onSubmit={handleSubmit} type="enabled">
          {/* nome */}
          <TextInput
            id="nome"
            type="text"
            placeholder="Nome do Categoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form>
      </div>
    </div>
  );
}
