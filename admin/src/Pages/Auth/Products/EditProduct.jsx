// @ts-check

import { TextInput } from "flowbite-react";
import Form from "../../../Components/Form";
import Search from "../../../Components/Layout/Search";
import { useEffect, useState } from "react";
import { Produtos } from "../../../backend/Produtos";
import useSidebar from "../../../Hooks/useSidebar";
import UploadImage from "../../../Components/UploadImage";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [imagem, setImagem] = useState("");
  const [estoque, setEstoque] = useState(0);
  const { setSidebar } = useSidebar();
  const { id } = useParams();

  const validateForm = () => {
    const isNomeValid = nome.trim().length > 0;

    return isNomeValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const produto = new Produtos();
      if (!id) {
        return;
      }
      const created = await produto.update(
        {
          nome,
          descricao,
          preco: parseFloat(String(preco)),
          imagem,
          estoque: parseInt(String(estoque)),
        },
        id,
      );
      if (created) {
        window.location.href = "/produtos";
        return;
      }
      alert("Erro ao atualizar o produto. Tente novamente.");
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  useEffect(() => {
    const produtos = new Produtos();
    if (!id) {
      return;
    }
    produtos.getById(id).then(
      /**
       * @param {{nome: string, descricao: string, preco: number, imagem: string, estoque: number}|null} data
       */
      (data) => {
        if (data) {
          setNome(data.nome);
          setDescricao(data.descricao);
          setPreco(data.preco);
          setImagem(data.imagem);
          setEstoque(data.estoque);
        }
      },
    );
    // @ts-ignore
    setSidebar("produtos");
  }, []);

  if (!id) {
    return <div>Produto não encontrado.</div>;
  }

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
        <Form onSubmit={handleSubmit} type="enabled">
          {/* nome, descricao, preco, imagem, estoque */}
          <TextInput
            id="nome"
            type="text"
            placeholder="Nome do Produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextInput
            id="descricao"
            type="text"
            placeholder="Descrição do Produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <TextInput
            id="preco"
            type="number"
            placeholder="Preço do Produto"
            value={preco}
            onChange={(e) => setPreco(parseFloat(e.target.value))}
            required
          />
          <UploadImage onUploaded={setImagem} imagemUrl={imagem} />
          <TextInput
            id="estoque"
            type="number"
            placeholder="Estoque do Produto"
            value={estoque}
            onChange={(e) => setEstoque(parseInt(e.target.value))}
            required
          />
        </Form>
      </div>
    </div>
  );
}
