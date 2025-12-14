import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import NewProduct from "./Pages/NewProduct";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/novo" element={<NewProduct />} />
          <Route path="/produtos/editar/:id" element={<Products />} />
          {/* <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<TodosProdutos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/pedidos" element={<Compras />} />
          <Route path="/contato" element={<Contato />} />
          <Route path='/dadosLocalizacao' element={<Localizacao />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createAccount' element={<CriarConta />} />
          <Route path='/quarto' element={<Quarto/> } />
          <Route path='/sala' element={<Sala />} />
          <Route path='/cozinha' element={<Cozinha />} />
          <Route path='/banheiro' element={<Banheiro />} />
          <Route path='/escritorio' element={<Escritorio />} />
          <Route path='/productsDetails' element={<DetalheProdutos />} />
          <Route path='/password-recovery' element={<RecuperacaoSenha/>} />
          <Route path='/perfil' element={<Perfil/>} />
          <Route path='/pagamento' element={<Pagamento/>} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
