// @ts-check
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "../Components/Layout/Header";
import Sidebar from "../Components/Layout/Sidebar";
import Categories from "../Pages/Auth/Categories/Categories";
import EditCategory from "../Pages/Auth/Categories/EditCategory";
import NewCategory from "../Pages/Auth/Categories/NewCategory";
import ViewCategory from "../Pages/Auth/Categories/ViewCategory";
import Dashboard from "../Pages/Auth/Dashboard";
import Newsletters from "../Pages/Auth/Newsletters/Newsletters";
import ViewNewsletter from "../Pages/Auth/Newsletters/ViewNewsletter";
import EditProduct from "../Pages/Auth/Products/EditProduct";
import NewProduct from "../Pages/Auth/Products/NewProduct";
import Products from "../Pages/Auth/Products/Products";
import ViewProduct from "../Pages/Auth/Products/ViewProduct";
import Users from "../Pages/Auth/Users/Users";
import ViewUser from "../Pages/Auth/Users/ViewUser";

export default function AuthLayout() {
  return (
    <div>
      <Header />
      <div className="flex min-h-[calc(100vh-56px)] min-w-screen bg-gray-800">
        <div className="mx-25 mt-25 flex w-full gap-10">
          <Sidebar />
          <div className="w-full">
            <main className="mb-4 flex items-center justify-between">
              <Router>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* Listar, Criar, Ver, Editar */}
                  <Route path="/categorias" element={<Categories />} />
                  <Route path="/categorias/novo" element={<NewCategory />} />
                  <Route
                    path="/categorias/visualizar/:id"
                    element={<ViewCategory />}
                  />
                  <Route
                    path="/categorias/editar/:id"
                    element={<EditCategory />}
                  />
                  {/* Listar, Criar, Ver, Editar */}
                  <Route path="/produtos" element={<Products />} />
                  <Route path="/produtos/novo" element={<NewProduct />} />
                  <Route
                    path="/produtos/visualizar/:id"
                    element={<ViewProduct />}
                  />
                  <Route
                    path="/produtos/editar/:id"
                    element={<EditProduct />}
                  />
                  {/* Listar, Ver */}
                  <Route path="/newsletters" element={<Newsletters />} />
                  <Route
                    path="/newsletters/visualizar/:id"
                    element={<ViewNewsletter />}
                  />
                  {/* Listar, Ver */}
                  <Route path="/usuarios" element={<Users />} />
                  <Route
                    path="/usuarios/visualizar/:id"
                    element={<ViewUser />}
                  />
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
