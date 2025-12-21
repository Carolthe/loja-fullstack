// @ts-check

import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Produtos } from "../../../backend/Produtos";
import Form from "../../../Components/Form";
import Search from "../../../Components/Layout/Search";
import UploadImage from "../../../Components/UploadImage";
import useSidebar from "../../../Hooks/useSidebar";
import useToast from "../../../Hooks/useToast";

export default function NewProduct() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [imagem, setImagem] = useState("");
  const [estoque, setEstoque] = useState(0);
  const { setSidebar } = useSidebar();
  const { setMessage, setToast } = useToast();

  const validateForm = () => {
    console.log(imagem);
    const isNomeValid = nome.trim().length > 0;
    const isDescricaoValid = descricao.trim().length > 0;
    const isPrecoValid = preco > 0;
    const isImagemValid = imagem.trim().length > 0;
    const isEstoqueValid = estoque >= 0;

    return (
      isNomeValid &&
      isDescricaoValid &&
      isPrecoValid &&
      isImagemValid &&
      isEstoqueValid
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const produto = new Produtos();
      const created = await produto.create({
        nome,
        descricao,
        preco,
        imagem,
        estoque,
      });
      if (created) {
        // @ts-ignore
        setToast("success");
        // @ts-ignore
        setMessage("Produto criado com sucesso!");
        setTimeout(() => {
          window.location.href = "/produtos";
        }, 500);
        return;
      }
      // @ts-ignore
      setToast("danger");
      // @ts-ignore
      setMessage("Erro ao criar o produto.");
    } else {
      // @ts-ignore
      setToast("danger");
      // @ts-ignore
      setMessage("Por favor, preencha todos os campos corretamente.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    setSidebar("produtos");
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Novo Produto</h1>
        <div className="flex items-center gap-4">
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
          <UploadImage onUploaded={setImagem} />
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
