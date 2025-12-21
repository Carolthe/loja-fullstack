// @ts-check

import TableList from "../../../Components/TableList";
import Search from "../../../Components/Layout/Search";
import { Usuarios } from "../../../backend/Usuarios";
import { useEffect, useState } from "react";
import useSidebar from "../../../Hooks/useSidebar";
import { useParams } from "react-router-dom";
import Form from "../../../Components/Form";
import { TextInput } from "flowbite-react";

export default function ViewUser() {
  const { setSidebar } = useSidebar();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const users = new Usuarios();
    if (!id) {
      return;
    }
    users.getById(id).then((data) => {
      if (data) {
        setNome(data.nome);
        setEmail(data.email);
        setSenha(data.senha);
      }
    });
    // @ts-ignore
    setSidebar("usuarios");
  }, []);

  if (!id) {
    return <div>Usuario não encontrado.</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-gray-100">Usuarios</h1>
        <div className="flex items-center gap-4">
          <a
            href="/usuarios"
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
            placeholder="Nome do Usuario"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={true}
            required
          />

          {/* email */}
          <TextInput
            id="email"
            type="email"
            placeholder="Email do Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true}
            required
          />

          {/* senha */}
          <TextInput
            id="senha"
            type="password"
            placeholder="Senha do Usuario"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={true}
            required
          />
        </Form>
      </div>
    </div>
  );
}
