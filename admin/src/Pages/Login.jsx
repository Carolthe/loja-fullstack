// @ts-check

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Auth } from "../backend/Auth";
import { useState } from "react";
import useAuth from "../Hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { setLogged } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = new Auth();
    const isValid = auth.validateLogin(email, senha);
    if (isValid) {
      auth.login(senha, email).then((response) => {
        if (response?.status === 200) {
          setLogged(true);
        } else {
          setLogged(false);
        }
      });
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-700">
      <form
        className="flex max-w-md flex-col gap-4 rounded-lg bg-gray-950 p-6 lg:w-150"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold text-white">
          Home Haven - Administração
        </h1>
        <p className="text-center text-gray-50">
          Faça login na sua conta para acessar o painel de administração.
        </p>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Seu Email</Label>
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Sua senha</Label>
          </div>
          <TextInput
            id="password1"
            type="password"
            autoComplete="current-password"
            required
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" className="cursor-pointer" />
          <Label htmlFor="remember" className="cursor-pointer">
            Lembre-se de mim
          </Label>
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
}
