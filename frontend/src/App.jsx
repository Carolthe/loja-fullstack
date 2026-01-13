import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Home from './paginas/Home'
import TodosProdutos from './paginas/TodosProdutos'
import Carrinho from './paginas/Carrinho'
import Favoritos from './paginas/Favoritos'
import Compras from './paginas/Compras'
import Contato from './paginas/Contato'
import Login from './paginas/Login'
import CriarConta from './paginas/CriarConta'
import Perfil from './paginas/Perfil'
import Pagamento from './paginas/Pagamento'
import Localizacao from './paginas/Localizacao'
import DetalheProdutos from './paginas/DetalheProdutos'
import Sala from './paginas/produtosCategoria/Sala'
import Cozinha from './paginas/produtosCategoria/Cozinha'
import Banheiro from './paginas/produtosCategoria/Banheiro'
import Escritorio from './paginas/produtosCategoria/Escritorio'
import RecuperacaoSenha from './paginas/RecuperacaoSenha'
import Quarto from './paginas/produtosCategoria/Quarto'
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="pt-[50px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<TodosProdutos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/pedidos" element={<Compras />} />
          <Route path="/contato" element={<Contato />} />
          <Route path='/dadosLocalizacao' element={<Localizacao />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createAccount' element={<CriarConta />} />
          <Route path='/quarto' element={<Quarto />} />
          <Route path='/sala' element={<Sala />} />
          <Route path='/cozinha' element={<Cozinha />} />
          <Route path='/banheiro' element={<Banheiro />} />
          <Route path='/escritorio' element={<Escritorio />} />
          <Route path='/productsDetails' element={<DetalheProdutos />} />
          <Route path='/password-recovery' element={<RecuperacaoSenha />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/pagamento' element={<Pagamento />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
