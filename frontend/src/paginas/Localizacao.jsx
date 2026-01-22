import Credibilidade from "../components/Credibilidade";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Newsletter from "../components/Newsletter";
import ScrollToTop from "../components/ScrollToTop";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast} from "react-toastify";

export default function Localizacao() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const userId = usuario?.id_usuario;

  const [pais, setPais] = useState("");
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [infoAdicional, setInfoAdicional] = useState("");

  const [jaExiste, setJaExiste] = useState(false);

  // Carregar localização existente
  useEffect(() => {
    if (!userId) {
      toast.info("Você precisa estar logado.");
      setTimeout(() => {
        navigate("/login");
      }, 2400);
    
      return;
    }

    async function carregarLocalizacao() {
      try {
        const res = await api.get(`/localizacao/${userId}`);
        const data = res.data;

        if (data.localizacao  ) {
          setJaExiste(true);
          setPais(data.localizacao.pais);
          setRua(data.localizacao.rua);
          setCidade(data.localizacao.cidade);
          setCep(data.localizacao.cep);
          setInfoAdicional(data.localizacao.info_adicional);
        }
      } catch (err) {
        console.error("Erro ao carregar localização:", err);
      }
    }

    carregarLocalizacao();
  }, [userId, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!pais || !rua || !cidade || !cep) {
      toast.error("Preencha todos os campos obrigatórios");
      
      return;
    }

    try {
      const metodo = jaExiste ? "put" : "post";

      const res = await api[metodo](`/localizacao/${userId}`, {
        pais,
        rua,
        cidade,
        cep,
        info_adicional: infoAdicional,
      });

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      toast.info(res.data.message);
      setTimeout(() => {
        navigate("/pagamento");
      }, 2400);


    } catch (err) {
      console.error("Erro ao salvar localização:", err);

      toast.error("Erro ao salvar localização");
    }
  }

  return (
    <div className="mt-[10px]">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-azul-escuro text-[20px] text-center mt-[40px] mb-[20px]">
          Local de Entrega</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[30px]">
          <div>
            <label className="font-semibold">País / Região</label>
            <Input placeholder="País"
              value={pais}
              onChange={(e) => setPais(e.target.value)}/>
          </div>
          <div>
            <label className="font-semibold">Endereço da Rua</label>
            <Input placeholder="Rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}/>
          </div>
          <div>
            <label className="font-semibold">Cidade</label>
            <Input placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}/>
          </div>
          <div>
            <label className="font-semibold">Código Postal</label>
            <Input placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}/>
          </div>
          <div>
            <label className="font-semibold">Informação Adicional</label>
            <Input placeholder="Informação adicional"
              value={infoAdicional}
              onChange={(e) => setInfoAdicional(e.target.value)}/>
          </div>
          <button type="submit"
            className="w-[330px] bg-amarelo-principal font-bold rounded-[15px] px-[40px] py-[15px] text-white">Ir Para Pagamento
          </button>
        </form>
      </div>
      <Credibilidade />
      <Newsletter />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
