import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Home from './pags/Home'
import Products from './pags/Products'
import Cart from './pags/Cart'
import Favorites from './pags/Favorites'
import Orders from './pags/Orders'
import Contact from './pags/Contact'
import Payment from './pags/Payment'
import ProductsDetails from './pags/ProductsDetails'
import Login from './pags/Login'
import CreateAccount from './pags/CreateAccount'
import RoomCategory from './pags/RoomCategory'
import LivingRoomCategory from './pags/LivingRoomCategory'
import KitchenCategory from './pags/KitchenCategory'
import BathroomCategory from './pags/BathroomCategory'
import OfficeCategory from './pags/OfficeCategory'

function App() {
  return (
    <Router>
      <Header />
      <div className="pt-[50px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/contato" element={<Contact />} />
          <Route path='/pagamento' element={<Payment/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createAccount' element={<CreateAccount/>}/>
          <Route path='/roomCategory' element={<RoomCategory/>}/> 
          <Route path='/livingRoomCategory' element={<LivingRoomCategory/>}/>
          <Route path='/kitchenCategory' element={<KitchenCategory/>}/>
          <Route path='/bathroomCategory' element={<BathroomCategory/>}/>
          <Route path='/officeCategory' element={<OfficeCategory/>}/>
          <Route path='/productsDetails' element={<ProductsDetails/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
