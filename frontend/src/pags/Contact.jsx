import { useState } from "react";
import Credibility from "../components/Crediblility";
import Footer from "../components/Footer";
import Input from "../components/Input";
import ScrollToTop from "../components/ScrollToTop";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Falha ao enviar a mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Falha ao enviar a mensagem. Tente novamente.");
    }
  };

  return (
    <div className="mt-[30px]">
      <p className="text-center font-semibold text-[23px] mt-[40px]">
        Entre em contato
      </p>
      <p className="text-center mx-[40px] mb-[20px] text-fontGray">
        Faça perguntas e nos ajude a melhorar nossos serviços.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[15px]">
        <div>
          <label className="font-semibold">Seu nome*</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Abc"
          />
        </div>

        <div>
          <label className="font-semibold">Email*</label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
          />
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
          <label className="font-semibold">Mensagem*</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escreva sua mensagem aqui"
            rows="6"
            className="border-[1px] pl-[10px] pt-[5px] mt-[5px] rounded-[5px] w-[300px]"
          />
        </div>

        <button className="w-[310px] h-[50px] text-white bg-highlightGreen">
          Enviar
        </button>
      </form>

      {status && <p className="text-center mt-2">{status}</p>}

      <Credibility />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
