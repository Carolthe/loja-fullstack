import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-700">
      <form className="flex max-w-md flex-col gap-4 rounded-lg bg-gray-950 p-6 lg:w-150">
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
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Sua senha</Label>
          </div>
          <TextInput id="password1" type="password" required />
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
