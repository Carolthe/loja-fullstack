import { useState } from "react"
import api from "../services/api"
import Input from "./Input"

export default function Newsletter() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        console.log("Handle submit chamado!", { nome, email });

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
            console.error(error)
            alert(error.response?.data?.error || "Erro ao cadastrar na newsletter")
        }
    }

    return (
        <div className="flex flex-col items-center text-center py-[40px]  w-[100vw] bg-[#f8f9ff]  ">
            <h4 className="font-semibold text-azulEscuro ">INSCREVA-SE NA NOSSA NEWSLETTER</h4>
            <p className="w-[300px] text-gray-400 pb-[10px] ">Não perca a inspiração e matenha-se atualizado com todas as novidades!</p>
            <form onSubmit={handleSubmit} className="grid gap-3 ">
                <Input value={nome} onChange={(e) => setNome(e.target.value)} type="text" placeholder="Nome" />
                <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="E-mail" />
                <button type="submit" className="p-[10px] rounded-[15px] bg-amareloPrincipal font-semibold text-white ">INSCREVA-SE</button>
            </form>
        </div>
    )
}