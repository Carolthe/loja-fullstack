// @ts-check

import TableList from "../../../Components/TableList";
import Search from "../../../Components/Layout/Search";
import { Newsletters as BackendNewsletters } from "../../../backend/Newsletters";
import { useEffect, useState } from "react";
import useSidebar from "../../../Hooks/useSidebar";
import Form from "../../../Components/Form";
import { TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";

export default function ViewNewsletter() {
  const { setSidebar } = useSidebar();
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const products = new BackendNewsletters();
    if (!id) {
      return;
    }
    products.getById(id).then((data) => {
      if (data) {
        setNome(data.nome);
        setEmail(data.email);
      }
    });
    // @ts-ignore
    setSidebar("newsletters");
  }, []);

  if (!id) {
    return <div>Newsletter não encontrada.</div>;
  }

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
            Voltar
          </a>
        </div>
      </div>
      <div className="mt-4 w-full">
        {/* id, nome, email */}
        <Form type="disabled">
          {/* nome */}
          <TextInput
            id="nome"
            type="text"
            placeholder="Nome do Newsletter"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={true}
            required
          />

          {/* email */}
          <TextInput
            id="email"
            type="email"
            placeholder="Email do Newsletter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true}
            required
          />
        </Form>
      </div>
    </div>
  );
}
