import { useState } from "react"
import api from "../services/api"

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
            console.error(error)
            alert(error.response?.data?.error || "Erro ao cadastrar na newsletter")
        }
    }

    return (
        <div className="flex flex-col items-center text-center py-[40px]  w-[100vw] bg-gray-200  ">
            <h4 className="font-semibold text-fontGray ">SUBSCRIBE TO OUR NEWSLETTER</h4>
            <p className="w-[280px] text-fontGray pb-[15px] ">Don't lose your inspiration and stay up to date with all the latest news!</p>
            <form onSubmit={handleSubmit} className="grid gap-3 ">
                <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="pl-[8px] w-[300px] p-[7px] " placeholder="Name" />
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="pl-[8px] w-[300px] p-[7px] " placeholder="E-mail" />
                <button type="submit" className="p-[10px] bg-greenMain text-white ">SUBSCREVER</button>
            </form>
        </div>
    )
}