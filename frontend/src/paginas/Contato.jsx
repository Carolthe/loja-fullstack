import { useState } from "react";
import Footer from "../components/Footer";
import Input from "../components/Input";
import ScrollToTop from "../components/ScrollToTop";
import api from "../services/api";
import Credibilidade from "../components/Credibilidade";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    setStatus("Por favor, preencha todos os campos obrigatórios!");
    return;
  }

  try {
    await api.post("/contact", formData);

    setStatus("Mensagem enviada com sucesso!");
    setFormData({ name: "", email: "", subject: "", message: "" });

  } catch (error) {
    console.error(error);
    setStatus(error.response?.data?.error || "Falha ao enviar a mensagem. Tente novamente.")
  }
}


  return (
    <div className="mt-[30px]">
      <p className="text-center font-semibold text-[23px] mt-[30px]">Entre em contato</p>
      <p className="text-center mx-[40px] text-[15px] mb-[20px] text-font-cinza">Faça perguntas e nos ajude a melhorar nossos serviços.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[15px]">
        <div>
          <label className="font-semibold">Nome</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Abc"
          />
        </div>
        <div>
          <label className="font-semibold">Email</label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"/>
        </div>
        <div>
          <label className="font-semibold">Assunto</label>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Sobre o que gostaria de falar?"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Mensagem</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escreva sua mensagem aqui"
            rows="6"
            className="w-[350px] px-3 border border-gray-300 rounded-md
                    text-gray-800
                    placeholder-gray-400
                    focus:outline-none
                    focus:border-[#5769a9]
                    focus:ring-2
                    focus:ring-[#5769a9]/30
                    transition
                    duration-200"
          />
        </div>
        <button className="w-[350px] h-[50px] rounded-[15px] font-semibold text-white bg-amarelo-principal">Enviar</button>
      </form>
      {status && <p className="text-center mt-2">{status}</p>}

      <Credibilidade />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
