// @ts-check
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Components/Layout/Header";
import Sidebar from "../Components/Layout/Sidebar";
import Dashboard from "../Pages/Auth/Dashboard";
import Products from "../Pages/Auth/Products/Products";
import Users from "../Pages/Auth/Users/Users";
import Newsletters from "../Pages/Auth/Newsletters/Newsletters";
import Categories from "../Pages/Auth/Categories/Categories";
import NewProduct from "../Pages/Auth/Products/NewProduct";

export default function AuthLayout() {
  return (
    <div>
      <Header />
      <div className="flex min-h-[calc(100vh-56px)] min-w-screen bg-gray-800">
        <div className="mx-25 mt-25 flex w-full gap-10">
          <Sidebar activeRoute="dashboard" />
          <div className="w-full">
            <main className="mb-4 flex items-center justify-between">
              <Router>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/categorias" element={<Categories />} />
                  <Route path="/produtos" element={<Products />} />
                  <Route path="/newsletters" element={<Newsletters />} />
                  <Route path="/usuarios" element={<Users />} />
                  <Route path="/produtos/novo" element={<NewProduct />} />
                </Routes>
              </Router>
            </main>
            <div className="mt-4 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
