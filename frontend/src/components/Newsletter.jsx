import { useState } from "react"
import api from "../services/api"
import Input from "./Input"

export default function Newsletter() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        if (!nome || !email) {
            alert("Preencha todos os campos")
            return
        }

        try {
            const res = await api.post("/newsletter", { nome, email })
            alert(res.data.message)
            setNome("")
            setEmail("")
        } catch (error) {
            alert(error.response?.data?.error || "Erro ao cadastrar na newsletter")
        }
    }

    return (
        <section className="w-full py-16">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">

                <h4 className="text-xl font-semibold text-[#5769a9] mb-2">
                    Inscreva-se na nossa Newsletter
                </h4>

                <p className="text-gray-500 text-sm mb-6">
                    Receba inspirações, novidades e ofertas exclusivas diretamente no seu e-mail.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        type="text"
                        placeholder="Seu nome"
                    />

                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Seu e-mail"
                    />

                    <button
                        type="submit"
                        className="
                            mt-2
                            h-[50px]
                            rounded-md
                            bg-[#5769a9]
                            text-white
                            font-semibold
                            hover:bg-[#46589a]
                            transition
                            duration-200
                        "
                    >
                        Inscrever-se
                    </button>
                </form>

                <p className="text-xs text-gray-400 mt-4">
                    Prometemos não enviar spam. Caso queira cancelar, mande uma resposta escrito (Cancelar).
                </p>
            </div>
        </section>
    )
}
