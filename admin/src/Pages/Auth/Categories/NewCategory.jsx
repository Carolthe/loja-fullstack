// @ts-check

import { TextInput } from "flowbite-react";
import Form from "../../../Components/Form";
import { useEffect, useState } from "react";
import { Categorias } from "../../../backend/Categorias";
import useSidebar from "../../../Hooks/useSidebar";
import useToast from "../../../Hooks/useToast";

export default function NewCategory() {
  const [nome, setNome] = useState("");
  const { setSidebar } = useSidebar();
  const { setMessage, setToast } = useToast();

  const validateForm = () => {
    const isNomeValid = nome.trim().length > 0;

    return isNomeValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const categoria = new Categorias();
      const created = await categoria.create({
        nome,
      });
      if (created) {
        // @ts-ignore
        setToast("success");
        // @ts-ignore
        setMessage("Categoria criada com sucesso.");
        setTimeout(() => {
          window.location.href = "/categorias";
        }, 500);
        return;
      }
      // @ts-ignore
      setToast("danger");
      // @ts-ignore
      setMessage("Erro ao criar a categoria.");
    } else {
      // @ts-ignore
      setToast("danger");
      // @ts-ignore
      setMessage("Por favor, preencha todos os campos corretamente.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    setSidebar("categorias");
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Novo Categoria</h1>
        <div className="flex items-center gap-4">
          <a
            href="/categorias"
            className="bg-primary-600 hover:bg-primary-500 rounded-md px-4 py-2 font-medium text-white"
          >
            Voltar
          </a>
        </div>
      </div>
      <div className="mt-4 w-full">
        <Form onSubmit={handleSubmit} type="enabled" linkReturn="/categorias">
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
