// @ts-check

import { TextInput } from "flowbite-react";
import Form from "../../../Components/Form";
import Search from "../../../Components/Layout/Search";

export default function NewProduct() {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Novo Produto</h1>
        <div className="flex items-center gap-4">
          <Search />
          <a
            href="/produtos"
            className="bg-primary-600 hover:bg-primary-500 rounded-md px-4 py-2 font-medium text-white"
          >
            Voltar
          </a>
        </div>
      </div>
      <div className="mt-4 w-full">
        <Form>
          {/* nome, descricao, preco, imagem, estoque */}
          <TextInput
            id="nome"
            type="text"
            placeholder="Nome do Produto"
            required
          />
          <TextInput
            id="descricao"
            type="text"
            placeholder="Descrição do Produto"
            required
          />
          <TextInput
            id="preco"
            type="number"
            placeholder="Preço do Produto"
            required
          />
          <TextInput
            id="imagem"
            type="text"
            placeholder="URL da Imagem do Produto"
            required
          />
          <TextInput
            id="estoque"
            type="number"
            placeholder="Estoque do Produto"
            required
          />
        </Form>
      </div>
    </div>
  );
}
